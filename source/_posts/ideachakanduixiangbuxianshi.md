title: idea debug模式查看对象的值不显示
author: Leesin.Dong
tags:
  - 工作_cloudwise
  - idea
categories:
  - 编码辅助工具
  - idea
date: 2018-11-05 14:07:00
---
<article>
		<div id="article_content" class="article_content clearfix csdn-tracking-statistics" data-pid="blog" data-mod="popu_307" data-dsm="post">
								<div class="article-copyright">
					版权声明：本文为作者原创，转载请注明出处，联系qq：32248827					https://blog.csdn.net/dataiyangu/article/details/83039842				</div>
								            <link rel="stylesheet" href="https://csdnimg.cn/release/phoenix/template/css/ck_htmledit_views-f76675cdea.css">
						<div class="htmledit_views">

debug下大部分情况是这样的：


![upload successful](/images/my_blog_64.png)

但是下面这个对象只显示了这样：


![upload successful](/images/my_blog_65.png)


但有的时候不显示，因为是auto模式的，找到自己认为是的对象右击-----------&gt;

![](https://img-blog.csdn.net/2018101316313296?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RhdGFpeWFuZ3U=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

就可以完全显示了。
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