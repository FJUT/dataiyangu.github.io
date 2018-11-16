title: 关于servlet的response的Content-Length大小的详细分析
author: Leesin.Dong
tags:
  - 工作_cloudwise
  - servlet
  - http
categories:
  - java
  - servlet
date: 2018-11-05 14:10:00
---
<article>
		<div id="article_content" class="article_content clearfix csdn-tracking-statistics" data-pid="blog" data-mod="popu_307" data-dsm="post" style="height: 2463px; overflow: hidden;">
								<div class="article-copyright">
					版权声明：本文为作者原创，转载请注明出处，联系qq：32248827					https://blog.csdn.net/dataiyangu/article/details/83017785				</div>
								            <link rel="stylesheet" href="https://csdnimg.cn/release/phoenix/template/css/ck_htmledit_views-f76675cdea.css">
						<div class="htmledit_views">

问题：

情景1：

<pre class="has" name="code" onclick="hljs.copyCode(event)">`

1.  <div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="1"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">response.setContentLength(<span class="hljs-number">3</span>);</div></div>
2.  <div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="2"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">        response.getWriter().write(<span class="hljs-string">"acb"</span>);</div></div>
3.  <div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="3"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">        request.getRequestDispatcher(<span class="hljs-string">"/ss1"</span>).forward(request, response);</div></div>`<div class="hljs-button" data-title="复制"></div></pre>

情景2:

<pre class="has" name="code" onclick="hljs.copyCode(event)">`

1.  <div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="1"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">response.setContentLength(<span class="hljs-number">1</span>);</div></div>
2.  <div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="2"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">        response.getWriter().write(<span class="hljs-string">"acb"</span>);</div></div>
3.  <div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="3"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">        request.getRequestDispatcher(<span class="hljs-string">"/ss1"</span>).forward(request, response);</div></div>`<div class="hljs-button" data-title="复制"></div></pre>

情景3:&nbsp;&nbsp;

<pre class="has" name="code" onclick="hljs.copyCode(event)">`

1.  <div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="1"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-built_in">response</span>.setContentLength(<span class="hljs-number">100</span>);</div></div>
2.  <div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="2"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">        <span class="hljs-built_in">response</span>.getWriter().write(<span class="hljs-string">"acb"</span>);</div></div>
3.  <div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="3"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">        <span class="hljs-built_in">request</span>.getRequestDispatcher(<span class="hljs-string">"/ss1"</span>).forward(<span class="hljs-built_in">request</span>, <span class="hljs-built_in">response</span>);</div></div>`<div class="hljs-button" data-title="复制"></div></pre>

情景4:

<pre class="has" name="code" onclick="hljs.copyCode(event)">`

1.  <div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="1"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">response.getWriter().write(<span class="hljs-string">"acb"</span>);</div></div>
2.  <div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="2"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">        request.getRequestDispatcher(<span class="hljs-string">"/ss1"</span>).forward(request, response);</div></div>`<div class="hljs-button" data-title="复制"></div></pre>

描述：

情景1:正常显示，不能转发


![upload successful](/images/my_blog_66.png)

&nbsp;

情景2:显示字母a，不能转发


![upload successful](/images/my_blog_67.png)
情景3:如果数小的话直接不能连接，如果数大的话会请求一段时间然后不能连接


![upload successful](/images/my_blog_68.png)

情景4:不设置大小，显示成功，转发成功。


![upload successful](/images/my_blog_69.png)
原因：

1.一般情况下客户端会在接受完Content-Length长度的数据之后才会开始解析。而在Tomcat上，页面处理过程中会将需要out.print的数据都放在缓存中，然后一次性的返回给客户端。

2.java.lang.IllegalStateException: Cannot forward after response has been committed

1.  不可以又向respose里输东西，然后又要要求跳转。
2.  同一次请求处理执行多次跳转。

3.经过实际测试，contentlength太大会等待，太小会截断。

&nbsp;

总结：

&nbsp; &nbsp;经过以上三点，展开分析，

1.这里的response中的contentlength就是write的内容，

2.如果在代码中规定了contentlength，那么执行的时候经过了这个contentlength，到了指定的地方就会告诉浏览器开始解析吧，这个时候紧接着因为是将数据放在response缓冲区里面的，这时候又要往response缓冲区里面输入东西，又要跳转就会报错java.lang.IllegalStateException: Cannot forward after response has been committed，所以跳转不成功。所以情景123跳转不成功。

3.如果代码中并没有规定contentlength，那么在执行的时候也不知道到底到了contentlegth没有，也不会要求往response里面输入东西，而是等转发完了之后才知道结束了，才会产生contentlength，所以情景4能够正常的转发。

4.因为上面的第三点，所以会出现情景123中的等待或者截断。

结语：

以上全为个人推理，希望不要误导赶路人。

感谢：

[https://www.jianshu.com/p/d606732f2ebc](https://www.jianshu.com/p/d606732f2ebc)

[https://www.cnblogs.com/daxin/p/3759102.html](https://www.cnblogs.com/daxin/p/3759102.html)

[https://blog.csdn.net/cuiyaoqiang/article/details/51141424](https://blog.csdn.net/cuiyaoqiang/article/details/51141424)

[https://blog.csdn.net/u013894607/article/details/53327560](https://blog.csdn.net/u013894607/article/details/53327560)

&nbsp;
            </div>
                </div>
									<div class="hide-article-box text-center">
						<a class="btn" id="btn-readmore" data-track-view="{&quot;mod&quot;:&quot;popu_376&quot;,&quot;con&quot;:&quot;,https://blog.csdn.net/dataiyangu/article/details/83017785,&quot;}" data-track-click="{&quot;mod&quot;:&quot;popu_376&quot;,&quot;con&quot;:&quot;,https://blog.csdn.net/dataiyangu/article/details/83017785,&quot;}">阅读更多</a>
					</div>
					<script>
						(function(){
							function setArticleH(btnReadmore,posi){
								var winH = $(window).height();
								var articleBox = $("div.article_content");
								var artH = articleBox.height();
								if(artH > winH*posi){
									articleBox.css({
										'height':winH*posi+'px',
										'overflow':'hidden'
									})
									btnReadmore.click(function(){
										articleBox.removeAttr("style");
										$(this).parent().remove();
									})
								}else{
									btnReadmore.parent().remove();
								}
							}
							var btnReadmore = $("#btn-readmore");
							if(btnReadmore.length>0){
								if(currentUserName){
									setArticleH(btnReadmore,3);
								}else{
									setArticleH(btnReadmore,1.2);
								}
							}
						})()
					</script>
					</article>