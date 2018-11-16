title: >-
  关于maven粘贴配置报错的问题。Element 'xxxxxxx' cannot have character [children],because
  the type's content type 2018年10月20日 17:53:07 Leesin Dong 阅读数：33
author: Leesin.Dong
tags:
  - maven
categories:
  - 编码辅助工具
  - maven
date: 2018-11-11 23:29:00
---
版权声明：本文为作者原创，转载请注明出处，联系qq：32248827 https://blog.csdn.net/dataiyangu/article/details/83215414

问题描述：
![upload successful](/images/my_blog_217.png)

> Element 'xxxxxxx' cannot have character \[children\],because the type's content type is element-only

原因：

配置文件中的beans节点下面只能是元素节点，不能有字符或文本存在。

比如多余的标点符号，点，也有可能是空格。

解决：

将配置文件之间的空格删掉，有时候眼睛看着明明没有什么问题，但是删掉就没有问题了。。。。

类似于：

> <plugin> <groupId> org.apache.maven.plugins </ groupId> <artifactId> maven-shade-plugin </ artifactId> <version> 1.2.1 </ version> <executions> <execution> <phase> package < / phase> <goals> <goal> shade </ goal> </ goals> <configuration> <transformers> <transformer implementation =“org.apache.maven.plugins.shade.resource.ManifestResourceTransformer”> <mainClass> com.cloume .project.App </ mainClass> </ transformer> </ transformers> </ configuration> </ execution> </ executions> </ plugin>

最后option+command+L回复格式就行了。

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()