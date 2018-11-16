title: servlet中的response在每次请求之前都会进行重置，一篇和工作相关的文章（tomcat 底层invoke方法的执行顺序和位置）
author: Leesin.Dong
date: 2018-11-05 22:01:06
tags:
  - 工作_cloudwise
  - servlet
categories:
  - 工作_cloudwise
  - 工作中匮乏的细节
---
<article>
		<div id="article_content" class="article_content clearfix csdn-tracking-statistics" data-pid="blog" data-mod="popu_307" data-dsm="post">
								<div class="article-copyright">
					版权声明：本文为作者原创，转载请注明出处，联系qq：32248827					https://blog.csdn.net/dataiyangu/article/details/82627422				</div>
								            <link rel="stylesheet" href="https://csdnimg.cn/release/phoenix/template/css/ck_htmledit_views-f76675cdea.css">
						<div class="htmledit_views">

&nbsp; &nbsp;最近在做javaagent的过程中，遇到了一些困难。想要抓去http的request和response的header中的content-type和content-length

request还好，可是在response中遇到了困难，在这里记录下解决方法和收获。

&nbsp; &nbsp; 解决方法：invoke方法抓取的response还没有被我赋值给content-type和content-length

<pre class="has" name="code" onclick="hljs.copyCode(event)">`

1.  <div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="1"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-function">servlet1</span></div></div>
2.  <div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="2"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"> </div></div>
3.  <div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="3"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"> <span class="hljs-keyword">protected</span> <span class="hljs-keyword">void</span> <span class="hljs-title">doGet</span><span class="hljs-params">(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response)</span> <span class="hljs-keyword">throws</span> javax.servlet.ServletException, IOException {</div></div>
4.  <div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="4"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">      </div></div>
5.  <div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="5"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">        response.setContentType(<span class="hljs-string">"text/html;charset=utf-8"</span>);</div></div>
6.  <div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="6"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">        response.setContentLength(<span class="hljs-number">10</span>);</div></div>
7.  <div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="7"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">        request.getRequestDispatcher(<span class="hljs-string">"/sss"</span>).forward(request,response);</div></div>
8.  <div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="8"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">        </div></div>
9.  <div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="9"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    }</div></div>`<div class="hljs-button" data-title="复制"></div></pre>

<pre class="has" name="code" onclick="hljs.copyCode(event)">`

1.  <div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="1"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-function">servlet2</span></div></div>
2.  <div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="2"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"> </div></div>
3.  <div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="3"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">protected</span> <span class="hljs-keyword">void</span> <span class="hljs-title">doGet</span><span class="hljs-params">(HttpServletRequest request, HttpServletResponse response)</span> <span class="hljs-keyword">throws</span> ServletException, IOException {</div></div>
4.  <div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="4"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">        String contentType = response.getContentType();</div></div>
5.  <div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="5"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">        response.getWriter().print(contentType);</div></div>
6.  <div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="6"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">        response.getWriter().print(<span class="hljs-string">"楼上到底有没有啊好烦啊"</span>);</div></div>
7.  <div class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="7"></div></div><div class="hljs-ln-code"><div class="hljs-ln-line">    }</div></div>`<div class="hljs-button" data-title="复制"></div></pre>

&nbsp;

所以我在代码中执行完业务之后再对response进行抓取。

收获：

1.<span style="color:#f33b45;">tomcat的入口方法invoke（request，response）是在执行业务之前开始的，所以如果在刚进入invoke方法的时候就进行抓取是抓不到的，应该在invoke 结束之后在进行抓取（这里指的是response，request在刚进入的时候肯定是能够抓到的。）</span>

<span style="color:#f33b45;">
![upload successful](/images/my_blog_71.png) </span>

2.如上面的两个代码，其实我已经意识到了invoke的执行位置问题，所以我采用了如上的方法，希望检测我的抓取的方法是否正确，（这里我说的抓取方法是指的对字节码的操作，即对过滤的方法的选取上看是否正确），如上，我采用的是转发的方式，将request和response通过forward转发过去，这样记事在invoke刚进入的时候也是可以抓到的，可是事实上，还是null，经过上网查阅资料发现，<span style="color:#f33b45;">response在每次请求服务器之前都会被重置，</span>所以里面固然没有content-type和content-length，所以我这里只能在invoke结束的时候在进行住区response。

&nbsp;

模拟：同一个用户请求服务器：

步骤1：客户端[第一次](https://www.baidu.com/s?wd=%E7%AC%AC%E4%B8%80%E6%AC%A1&amp;tn=SE_PcZhidaonwhc_ngpagmjz&amp;rsv_dl=gh_pc_zhidao)请求服务器：response被重置。

步骤2：servlert 清空response 并再次设置数据以便下面的请求使用。

步骤3：客户端第二次请求服务器：response被重置。

步骤4：servlert 清空response 并再次设置数据以便下面的请求使用。

一下重复N遍步骤1、2.。。。。。。。。

<span style="color:#f33b45;">servlet 在整体结构设计时认为保留客户端的每次请求信息太浪费内容，所以每个客户每次请求只给分配一个response用完扔掉。response 就像个int 每次用时赋值用完扔掉，用户不能找历史记录。</span>
            </div>
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