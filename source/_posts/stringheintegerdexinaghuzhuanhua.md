title: String和Integer相互转化
author: Leesin.Dong
tags:
  - interview
  - java基础
categories:
  - java
  - java基础
date: 2018-11-08 14:07:00
---
一、Integer转String
----------------

> 1.  `//方法一:Integer类的静态方法toString()`
>     
> 2.  `Integer a = 2;`
>     
> 
> `String str = Integer.toString(a)`
> 
> 2.  `//方法二:Integer类的成员方法toString()`
>     
> 3.  `Integer a = 2;`
>     
> 4.  `String str = a.toString();`
>     
> 
> 6.  `//方法三:String类的静态方法valueOf()`
>     
> 7.  `Integer a = 2;`
>     
> 8.  `String str = String.valueOf(a);`
>     

1、从Integer类的源码可以看出，Integer的静态方法toString()和成员方法toString()是一样的，成员方法里面仅仅是调用了静态方法而已。如下图所示：   
![这里写图片描述](https://img-blog.csdn.net/20160314164912182)

通过toString()方法，可以把整数（包括0）转化为字符串，但是Integer如果是null的话，就会报空指针异常。

2、String.valueOf(Object obj)可以把整型（包括0）转化为字符串，但是Integer如果是null的话，会转化为”null”。从String.valueOf(Object obj)方法的源码可以看出：

> `public static String valueOf(Object obj) {`
> 
> `return (obj == null) ? "null" : obj.toString();`
> 
> `}`

3、当Integer是null的情况下，我们也希望String是null，上面的方法都没法做到。可以自己写一个方法：

> `public static String toString(Object obj) {`
> 
> `return (obj == null) ? null : obj.toString();`
> 
> `}`

另外，Apache提供的ObjectUtils.identityToString(Object obj)也可以实现。但是ObjectUtils.toString(Object obj)不行，该方法会把null转化为”“。

二、String转Integer
----------------

当我们要把String转化为Integer时，一定要对String进行非空判断，否则很可能报空指针异常。

> `String str = "...";`
> 
> `Integer i = null;`
> 
> `if(str!=null){`
> 
> `i = Integer.valueOf(str);`

\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- 本文来自 a55650892 的CSDN 博客 ，全文地址请点击：https://blog.csdn.net/a5650892/article/details/78764431?utm_source=copy

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()