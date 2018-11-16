title: 得到inputstream和outputstream的字节数。关键字：available，toByteArray
author: Leesin.Dong
tags:
  - 工作_cloudwise
  - java基础
  - io
  - ''
categories:
  - 工作_cloudwise
  - 工作中匮乏的细节
date: 2018-11-08 09:45:00
---
要一次读取多个字节时，经常用到InputStream.available()方法，这个方法可以在读写操作前先得知数据流里有多少个字节可以读取。需要注意的是，如果这个方法用在从本地文件读取数据时，一般不会遇到问题，但如果是用于网络操作，就经常会遇到一些麻烦。比如，Socket通讯时，对方明明发来了1000个字节，但是自己的程序调用available()方法却只得到900，或者100，甚至是0，感觉有点莫名其妙，怎么也找不到原因。其实，这是因为网络通讯往往是间断性的，一串字节往往分几批进行发送。本地程序调用available()方法有时得到0，这可能是对方还没有响应，也可能是对方已经响应了，但是数据还没有送达本地。对方发送了1000个字节给你，也许分成3批到达，这你就要调用3次available()方法才能将数据总数全部得到。

能否使用取决于实现了InputStream这个抽象类的具体子类中有没有实现available这个方法。如果实现了那么就可以取得大小，如果没有实现那么就获取不到。例如FileInputStream就实现了available方法，那么就可以用new byte\[in.available()\];这种方式。但是，网络编程的时候Socket中取到的InputStream，就没有实现这个方法，那么就不可以使用这种方式创建数组。      如果这样写代码： 

> int count = in.available();  
>   byte\[\] b = new byte\[count\];  
>   in.read(b);

在进行网络操作时往往出错，因为你调用available()方法时，对发发送的数据可能还没有到达，你得到的count是0。   
  需要改成这样： 

> int count = 0;  
>   while (count == 0) {  
>    count = in.available();  
>   }  
>   byte\[\] b = new byte\[count\];  
>   in.read(b);

使用outputStream时需要输出至指定硬盘区域，有时候需要使用byte时，就需要使用到ByteArrayOutputStream 

ByteArrayOutputStream可以直接toByteArray来获取byte数组  可以避免定义数据缓冲区

也可以调用toString()进行输出。

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()