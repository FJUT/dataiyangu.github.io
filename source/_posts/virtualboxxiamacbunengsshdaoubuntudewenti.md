title: virtualbox下mac不能ssh到ubuntu问题
author: Leesin.Dong
tags:
  - 捣蛋鬼
  - mac
  - linux
categories:
  - 捣蛋鬼
  - mac
date: 2018-11-09 23:05:00
---
<article>
		<div id="article_content" class="article_content clearfix csdn-tracking-statistics" data-pid="blog" data-mod="popu_307" data-dsm="post">
								<div class="article-copyright">
					版权声明：本文为作者原创，转载请注明出处，联系qq：32248827					https://blog.csdn.net/dataiyangu/article/details/80857220				</div>
								            <link rel="stylesheet" href="https://csdnimg.cn/release/phoe版权声明：本文为作者原创，转载请注明出处，联系qq：32248827 https://blog.csdn.net/dataiyangu/article/details/80857220

首先检查下ping，发现ubuntu能够ping通mac，但是mac  ping不通ubuntu，反反复复上网查资料折腾了好几天，最后在同事的帮助下，是vbox设置的网络不对，全局工具新建一个网卡  输入自定义私网地址 像10.0.0.*  或者192.168.** 等，dhcp服务器是ubuntu的ip，（网卡的ip和服务器的ip需要在一个网段）在ubuntu的网络设置中添加两个网卡一个net模式的一个host—only模式，host-only模式网卡是刚才设置的全局网卡。


![upload successful](/images/my_blog_134.png)

![upload successful](/images/my_blog_135.png)

![upload successful](/images/my_blog_135.png)
![upload successful](/images/my_blog_136.png)
然后重启ubuntu，查看ifconfig会出现两个 inet  一个用来上网，一个用来本地连接。之后的操作和之前的一样，mac能够ping通ubuntu，ssh也可以了。

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()nix/template/css/ck_htmledit_views-f76675cdea.css">
						<div class="htmledit_views">
                <p>首先检查下ping，发现ubuntu能够ping通mac，但是mac&nbsp; ping不通ubuntu，反反复复上网查资料折腾了好几天，最后在同事的帮助下，是vbox设置的网络不对，全局工具新建一个网卡&nbsp; 输入自定义私网地址 像10.0.0.*&nbsp; 或者192.168.** 等，dhcp服务器是ubuntu的ip，（网卡的ip和服务器的ip需要在一个网段）在ubuntu的网络设置中添加两个网卡一个net模式的一个host—only模式，host-only模式网卡是刚才设置的全局网卡。</p>

<p><img alt="" class="has" src="https://img-blog.csdn.net/20180629151834827?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RhdGFpeWFuZ3U=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"></p>

<p><img alt="" class="has" src="https://img-blog.csdn.net/20180629151746219?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RhdGFpeWFuZ3U=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"></p>

<p><img alt="" class="has" src="https://img-blog.csdn.net/20180629151804287?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RhdGFpeWFuZ3U=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"></p>

<p>然后重启ubuntu，查看ifconfig会出现两个 inet&nbsp; 一个用来上网，一个用来本地连接。之后的操作和之前的一样，mac能够ping通ubuntu，ssh也可以了。</p>            </div>
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