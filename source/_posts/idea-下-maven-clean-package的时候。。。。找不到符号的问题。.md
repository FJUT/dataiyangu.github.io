title: idea 下 maven clean package的时候。。。。找不到符号的问题。
author: Leesin.Dong
tags:
  - maven
  - idea
categories:
  - 编码辅助工具
  - maven
date: 2018-11-11 23:30:00
---
版权声明：本文为作者原创，转载请注明出处，联系qq：32248827 https://blog.csdn.net/dataiyangu/article/details/82854004

idea将外部的jar包打入到里面的时候，只需要在module中配置即可。所以我的jar包究竟到了哪里，我没有深入去研究这个东西，我只知道jar包在maven打包的时候，并没有一起打进去，导致找不到符号之类的错误。

解决：

1.在任意目录下面创建lib（其他的名字也可以）文件夹。**注意：文件夹设置成原始格式，不要设置成resource之类的。**

2.在pom.xml中

<plugin>
    <artifactId>maven-compiler-plugin</artifactId>
    <configuration>
        <source>1.7</source>
        <target>1.7</target>
        <encoding>UTF-8</encoding>
        <compilerArguments>
            <extdirs>${project.basedir}/src/main/lib</extdirs>
        </compilerArguments>
    </configuration>
</plugin>

3.如果要放到linux系统中，为了避免没有包，直接将这些jar包scp到$JAVA_HOME/jre/lib/ext

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()