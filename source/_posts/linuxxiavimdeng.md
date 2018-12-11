title: linux下 vim /etc/profile 修改jdk版本后不生效
author: Leesin.Dong
tags:
  - linux
categories:
  - linux
  - linux命令
date: 2018-11-05 13:27:00
---
<article>
		<div id="article_content" class="article_content clearfix csdn-tracking-statistics" data-pid="blog" data-mod="popu_307" data-dsm="post">
								<div class="article-copyright">
					版权声明：本文为作者原创，转载请注明出处，联系qq：32248827					https://blog.csdn.net/dataiyangu/article/details/83376969				</div>
								            <link rel="stylesheet" href="https://csdnimg.cn/release/phoenix/template/css/ck_htmledit_views-f76675cdea.css">
						<div class="htmledit_views">

当然不是因为没有 source /etc/profile

而是因为我用item2同时操作一个主机（两个窗口），在其中一个窗口修改了版本之后，并且已经生效，另外一个窗口还是旧的jdk版本，解决：在另一个窗口再进行source /etc/profile。具体的原因可能是因为类似于配置了某些东西之后要重启窗口之类的原因把，不去深究，没有意义～
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