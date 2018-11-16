title: 非静态内部类真的不能够声明静态的变量吗
author: Leesin.Dong
tags:
  - interview
  - java基础
  - 工作_cloudwise
categories:
  - 工作_cloudwise
  - 工作中匮乏的细节
date: 2018-11-08 09:36:00
---
版权声明：本文为作者原创，转载请注明出处，联系qq：32248827 https://blog.csdn.net/dataiyangu/article/details/83000495

十分感谢[https://www.jianshu.com/p/4dbe68850e1b](https://www.jianshu.com/p/4dbe68850e1b)

以下纯为本人的理解，有出入的地方欢迎提出，共同进步。

场景一：错误

    class outer{class inner{ static int int a = 1;}}

1.  内部类是依赖于外部类的对象的。
2.  静态变量是在类加载的过程中就可以直接引用，简单理解就是“目前还并没有对象”。
3.  a变量依赖于inner类，inner类依赖于outer对象
4.  outer对象————>inner类————>a变量，而a变量又必须在outer对象之前就能引用，自相矛盾。

场景二：正确

    class outer{class inner{ final static int a = 1;}}

根据场景一，场景二本来是错误的，可是加上final关键字，此时的a就变成了编译期常量，何为编译期常量，即常量会在编译阶段确定值，不需要加载类的字节码文件，（根据本人的理解意思就是官比类加载的时候还大，也就是比static修饰的更厉害，在编译的时候就把它变成了常量值），书上称之为编译期常量折叠【编译器在编译阶段通过语法分析计算出常量表达式的具体值】。

场景三：错误

    class outer{class inner{final static String a = new String("a");final static Apple a = new Apple();}}

虽然被fianl修饰了，但是还是一个变量的对象。

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()