title: mac 无法安装jdk1.7解决方案
author: Leesin.Dong
tags:
  - 捣蛋鬼
  - jdk
  - ''
  - ''
categories:
  - 捣蛋鬼
  - 系统
date: 2018-11-09 13:44:00
---
<article>
		<div id="article_content" class="article_content clearfix csdn-tracking-statistics" data-pid="blog" data-mod="popu_307" data-dsm="post">
								            <link rel="stylesheet" href="https://csdnimg.cn/release/phoenix/template/css/ck_htmledit_views-f76675cdea.css">
						<div class="htmledit_views">
                <h1 id="简介"><a name="t0"></a>简介</h1>

<p>mac重新装系统，目前版本是os版本<code>10.11.6</code>，安装jdk1.7时会弹出报错，说版本不兼容我去，恶心死我了。</p>

<h3 id="错误"><a name="t1"></a><a name="t1" target="_blank"></a>错误</h3>

<p><img alt="" class="has" src="https://leanote.com/api/file/getImage?fileId=5689cefcab64415a2600091a"></p>

<h2 id="解决方案"><a name="t2"></a><a name="t2" target="_blank"></a>解决方案</h2>

<ol><li>
	<p>双击安装包，使安装包挂在到机器上，即在Finder里可以看到一个名字为JDK 7 Update 60的Device。</p>

	<p>在terminal下输入以下命令，命令中的路径可能不同</p>
	</li>
</ol><pre class="prettyprint" name="code"><code class="language-shell">$ pkgutil --expand /Volumes/JDK\ 7\ Update\ 60/JDK\ 7\ Update\ 60.pkg /tmp/jdk.unpkg  
$ cd /tmp/jdk.unpkg  
$ vim Distribution  </code></pre>

<ul><li>1</li>
	<li>2</li>
	<li>3</li>
</ul><ol><li>将打开的文件内容替换,找到<code>pm_install_check</code>方法，修改为以下就行。</li>
</ol><pre class="prettyprint" name="code"><code class="language-shell">function pm_install_check() {
  return true;
}
</code></pre>

<ul><li>1</li>
	<li>2</li>
	<li>3</li>
	<li>4</li>
</ul><ol><li>重新打包</li>
</ol><pre class="prettyprint" name="code"><code class="language-shell">$ pkgutil --flatten /tmp/jdk.unpkg /tmp/jdk.pkg </code></pre>

<ul><li>1</li>
</ul><ol><li>开始重新安装包(新的包)</li>
</ol><pre class="prettyprint" name="code"><code class="language-shell">$ open /tmp/jdk.pkg  </code></pre>

<ul><li>1</li>
</ul><blockquote>
<p>注意：原始挂在到机器上的安装包，一定得先关了才可以。</p>
</blockquote>

<p>安装提供mac jdk 提供在百度云</p>

<p>链接:<a href="https://pan.baidu.com/s/1bYwCfO" rel="nofollow" target="_blank">https://pan.baidu.com/s/1bYwCfO</a>&nbsp;密码:m27o</p>            </div>
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