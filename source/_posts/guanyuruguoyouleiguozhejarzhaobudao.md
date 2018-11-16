title: 关于，如果有类或者jar包找不到，不能深入点进去查看具体的字段，可以循环打印出来。
author: Leesin.Dong
date: 2018-11-05 22:04:11
tags:
  - 工作_cloudwise
categories:
  - 工作_cloudwise
  - 工作中匮乏的细节
---
<article>
		<div id="article_content" class="article_content clearfix csdn-tracking-statistics" data-pid="blog" data-mod="popu_307" data-dsm="post">
								<div class="article-copyright">
					版权声明：本文为作者原创，转载请注明出处，联系qq：32248827					https://blog.csdn.net/dataiyangu/article/details/82594788				</div>
								            <link rel="stylesheet" href="https://csdnimg.cn/release/phoenix/template/css/ck_htmledit_views-f76675cdea.css">
						<div class="htmledit_views">

<span style="color:#f33b45;">注意：以下为本人工作中的问题，和小技巧，误点进来的小伙伴请忽略。</span>

具体问题：

通过response的getheader方法获取不到response-contenttype和response-contentlength的具体的值

想要获取response的header中的字段属性，想通过看源码定义的方式查看，但是被封装起来了，找不到具体的jar包，也可能封装的比较混乱，无法通过查看获取。

解决方案：

1.通过getheaders循环列出header中具体的属性的值即可。

2.还有就是可能这两个字段根本就不在getheader中，看看response本身是否就包括这两个东西。

<span style="color:#f33b45;">总结：其实在编码过程中，可能是我们的路在开始已经走错了，所以无论怎么也走不出去，需要返回到分叉路口，选择更适合的那条路走。</span>
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