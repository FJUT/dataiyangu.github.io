title: Linux中grep命令，用或的关系查询多个字符串，正则表达式基础说明
author: Leesin.Dong
tags:
  - linux
categories:
  - linux
  - linux命令
  - bbb
date: 2018-11-11 10:14:00
---
请尊重版权：原文：https://blog.csdn.net/lkforce/article/details/52862193 

使用 grep 'word1|word2' 文件名  这样的命令是不对的！

  
应该使用如下的命令：

1，grep -E 'word1|word2' 文件名

2，egrep 'word1|word2' 文件名

3，grep 'word1/|word2' 文件名

  
为什么需要加-E，关于grep 和 egrep：

egrep 等同于 grep -E 。它会以扩展的正则表达式的模式来解释模式。下面来自 grep 的帮助页：  
基本的正则表达式元字符 ?、+、 {、 |、 ( 和 ) 已经失去了它们原来的意义，要使用的话用反斜线的版本 /?、/+、/{、/|、/( 和 /) 来代替。 传统的 egrep 并不支持 { 元字符，一些 egrep 的实现是以 /{ 替代的，所以一个可移植的脚本应该避免在 grep -E 使用 { 符号，要匹配字面的 { 应该使用 \[}\]。  
GNU grep -E 试图支持传统的用法，如果 { 出在在无效的间隔规范字符串这前，它就会假定 { 不是特殊字符。  
例如，grep -E ‘{1′ 命令搜索包含 {1 两个字符的串，而不会报出正则表达式语法错误。  
POSIX.2 标准允许这种操作的扩展，但在可移植脚本文件里应该避免这样使用。

关于正则表达式的基本分类：

1、基本的正则表达式（Basic Regular Expression 又叫 Basic RegEx 简称 BREs）   
2、扩展的正则表达式（Extended Regular Expression 又叫 Extended RegEx 简称 EREs）   
3、Perl 的正则表达式（Perl Regular Expression 又叫 Perl RegEx 简称 PREs） 

  
关于基本正则表达式和扩展正则表达式的一些用法：

基本正则表达式

元数据

意义和范例

^word

搜寻以word开头的行。

例如：搜寻以#开头的脚本注释行

grep –n ‘^#’ regular.txt

word$

搜寻以word结束的行

例如，搜寻以‘.’结束的行

grep –n ‘.$’ regular.txt

.

匹配任意一个字符。

例如：grep –n ‘e.e’ regular.txt

匹配e和e之间有任意一个字符，可以匹配eee，eae，eve，但是不匹配ee。

\

转义字符。

例如：搜寻’，’是一个特殊字符，在正则表达式中有特殊含义。必须要先转义。

grep –n ‘\\” regular.txt

*

前面的字符重复0到多次。

例如匹配gle，gogle，google，gooogle等等

grep –n ‘go*gle’ regular.txt

\[list\]

匹配一系列字符中的一个。

例如：匹配gl，gf。

grep –n ‘g\[lf\]’ regular.txt

\[n1-n2\]

匹配一个字符范围中的一个字符。

例如：匹配数字字符

grep –n ‘\[0-9\]’ regular.txt

\[^list\]

匹配字符集以外的字符

例如：grep –n ‘\[^o\]‘ regular.txt

匹配非o字符

\\{n1,n2\\}

前面的字符重复n1，n2次

例如：匹配google，gooogle。

grep –n ‘go\\{2,3\\}gle’ regular.txt

\\<word

单词是的开头。

例如：匹配以g开头的单词

grep –n ‘\\<g’ regular.txt

word\\>

匹配单词结尾

例如：匹配以tion结尾的单词

grep –n ‘tion\\>’ regular.txt

扩展正则表达式

     grep一般情况下支持基本正则表达式，可以通过参数-E支持扩展正则表达式，另外grep单独提供了一个扩展命令叫做egrep用来支持扩展正则表达式，这条命令和grep -E等价。虽然一般情况下，基本正则表达式就够用了。特殊情况下，复杂的扩展表达式，可以简化字符串的匹配。

     扩展正则表达式就是在基本正则表达式的基础上，增加了一些元数据。

元数据

意义和范例

+

重复前面字符1到多次。

例如：匹配god，good，goood等等字符串。

grep –nE go+d’ regular.txt

?

匹配0或1次前面的字符

例如，匹配gd，god

grep –nE ‘go?d’ regular.txt

|

或（or）的方式匹配多个字串    
例如：grep –nE ‘god|good’ regular.txt

匹配god或者good。

()

匹配整个括号内的字符串，原来都是匹配单个字符

例如：搜寻good或者glad

grep –nE ‘g(oo|la)’ regular.txt

()

前面的字符重复0到多次。

例如匹配gle，gogle，google，gooogle等等

grep –nE ‘go*gle’ regular.txt

  
  
 

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()