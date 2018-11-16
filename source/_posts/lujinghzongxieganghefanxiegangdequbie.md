title: 路径中 斜杠/和反斜杠\ 的区别【转】
author: Leesin.Dong
tags:
  - 捣蛋鬼
  - 系统
  - java基础
  - ''
categories:
  - 捣蛋鬼
  - 系统
date: 2018-11-09 13:36:00
---
<article>
		<div id="article_content" class="article_content clearfix csdn-tracking-statistics" data-pid="blog" data-mod="popu_307" data-dsm="post">
								            <link rel="stylesheet" href="https://csdnimg.cn/release/phoenix/template/css/ck_htmledit_views-f76675cdea.css">
						<div class="htmledit_views">
                <p>原文地址：https://blog.csdn.net/zlwzlwzlw/article/details/7768313。</p>

<p>最近在项目中遇到了一个小问题，纠结了半天。</p>

<p>路径中使用斜杠/和反斜杠\的区别到底是什么。查阅了一些资料后可知。</p>

<p>Unix使用斜杆/ 作为路径分隔符，而web应用最新使用在Unix系统上面，所以目前所有的网络地址都采用 斜杆/ 作为分隔符。</p>

<p>Windows由于使用 斜杆/ 作为DOS命令提示符的参数标志了，为了不混淆，所以采用 反斜杠\ 作为路径分隔符。所以目前windows系统上的文件浏览器都是用 反斜杠\ 作为路径分隔符。随着发展，DOS系统已经被淘汰了，命令提示符也用的很少，斜杆和反斜杠在大多数情况下可以互换，没有影响。</p>

<p>知道这个背景后，可以总结一下结论：</p>

<p>（1）浏览器地址栏网址使用 斜杆/ ;</p>

<p>（2）windows文件浏览器上使用 反斜杠\ ;</p>

<p>（3）出现在html url() 属性中的路径，指定的路径是网络路径，所以必须用 斜杆/ ;</p>

<p>&lt;div style="background-image:url(/Image/Control/title.jpg); background-repeat:repeat-x; padding:10px 10px 10px 10px"&gt;&lt;/div&gt;<br>
// 如果url后面用反斜杠，就不会显示任何背景<br>
（4）出现在普通字符串中的路径，如果代表的是windows文件路径，则使用 斜杆/ 和 反斜杠\ 是一样的；如果代表的是网络文件路径，则必须使用 斜杆/ ;</p>

<p>&lt;img src=".\Image/Control/ding.jpg" /&gt; // 本地文件路径，/ 和 \ 是等效的<br>
&lt;img src="./Image\Control\cai.jpg" /&gt;<br>
&lt;img src="http://hiphotos.baidu.com/yuhua522/pic/item/01a949c67e1023549c163df2.jpg" /&gt; // 网络文件路径，一定要使用 斜杆/<br>
&nbsp;</p>

<p>斜杆/ 和 反斜杠\ 的区别基本上就是这些了，下面再讨论一下相对路径和绝对路径。</p>

<p>./SRC/&nbsp;&nbsp;这样写表示，当前目录中的SRC文件夹；</p>

<p>&nbsp;../SRC/&nbsp;&nbsp;这样写表示，当前目录的上一层目录中SRC文件夹；</p>

<p>/SRC/ &nbsp;&nbsp;这样写表示，项目根目录（可以只磁盘根目录，也可以指项目根目录，具体根据实际情况而定）</p>

<p><span style="color:#f33b45;"><strong>综上所属，再加上点自己的总结，基本上全部用/，但凡是根windows挂钩的可以稍微考虑一下\</strong></span><br>
&nbsp;</p>            </div>
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