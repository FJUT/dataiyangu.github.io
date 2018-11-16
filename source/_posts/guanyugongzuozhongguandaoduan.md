title: 关于工作中的端到端的问题理解，以及端到端的实现方式。
author: Leesin.Dong
tags:
  - 工作_cloudwise
categories:
  - 工作_cloudwise
  - 工作中涉及的业务与技术
date: 2018-11-05 13:37:00
---
<article>
		<div id="article_content" class="article_content clearfix csdn-tracking-statistics" data-pid="blog" data-mod="popu_307" data-dsm="post">
								<div class="article-copyright">
					版权声明：本文为作者原创，转载请注明出处，联系qq：32248827					https://blog.csdn.net/dataiyangu/article/details/83342004				</div>
								            <link rel="stylesheet" href="https://csdnimg.cn/release/phoenix/template/css/ck_htmledit_views-f76675cdea.css">
						<div class="htmledit_views">

原理：


![upload successful](/images/my_blog_62.png)

代码实现：


![upload successful](/images/my_blog_63.png)


关键问题：

1.  因为Tomcat的的的自动找到并接受，接收端是tomcat的的的。
2.  如何实现端到：1.tomcat根入口放入cloudwiseinfo 2. apiuri（sn，port）
3.  进行端到端的抓取，可以进行强制类型转换，（有的地图没有提供得集方法）自己手松组进去，但是注意类型必须一致，比如是散列映射就必须强转成散列映射，是散列表就必须强转成哈希表。
4.  request_id在server端从header中取出来之后还要和之前的request_id（client端）做一样的处理，如果是入口就往后面加hostid，非入口方法就加rid，最后拼成的格式就是request_id+rid+hostid+rid+hostid+hostid的样式，其实最开始的request_id也是我们javaagent手动拼出来的字符串并不是，人家tomcat等服务器拼出来的，request_id+rid+hostid+rid+hostid+hostid实现这种方式就能多次实现端到端，实现最终的一一对应。
5.  在适配ibmmq的时候，犯的一个很大的错误就是将send和get放在了一个main函数中，里面的gret方法的this对象中试图进行端到端，这是在一个线程中进行，很明显只是表面实现了端到端，实质上并没有实现，应该经这两个方法放到两个线程中。            </div>
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