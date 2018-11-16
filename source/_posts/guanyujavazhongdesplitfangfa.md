title: 关于java中的split方法，以及引申出来的对java正则表达式\\\\等的自我理解。
author: Leesin.Dong
tags:
  - java基础
  - interview
categories:
  - java
  - java基础
date: 2018-11-07 22:18:00
---
版权声明：本文为作者原创，转载请注明出处，联系qq：32248827 https://blog.csdn.net/dataiyangu/article/details/83109312

首先是java的split方法，其参数是一个正则表达式，所以，某些字符需要转移，

> 特殊情况有 \* ^ : | . \

比如.-----------\> split（“\\\.”）

这里面涉及到转义，为什么是\\\.而不是\\.    ？？？

还记得以前写过前台，或者java中sysm输出字符串换行之类的   \\"        \\t        \\n

这其中一直都是一个\ 啊，可是到了这里是为什么呢？

经过我的上网查阅和自己理解总结了三点：

1.  首先字符串中的\\\被编译器解释为\\，然后作为正则表达式，\\.又被正则表达式引擎解释为.  
      
    如果在字符串里只写\\.的话，第一步就被直接解释为.，之后作为正则表达式被解释时就变成匹配任意字符了
2.  正则表达式匹配一个反斜杠，需要四个反斜杠"\\\\\\"  
                //在字符串中，两个反斜杠被解释为一个反斜杠，  
                //然后在作为正则表达式， \\\ 则被正则表达式引擎解释为 \\，所以在正则表达式中需要使用四个反斜杠。   
                //也就是说，前两个反斜杠在字符串中被解释为一个反斜杠，后两个也被解释为一个反斜杠，  
                //这时解释完毕后变成两个反斜杠，再由正则表达式解释两个反斜杠，就又解释成了一个反斜杠，/所以，在正则表达               式中要匹配一个反斜杠时，需要四个反斜杠。
    
3.  综合上面亮点，可以看出，编译器会对字符串进行一次编译，也会对正则表达式进行一次编译，也就是编译了两次，所以需要双重转义，而我们这里面的split的方法参数是将正则表达式放在了了字符串中，所以需要双重转义，向平常的输出 \\"        \\t        \\n  ,仅仅是输出，并没有涉及到正则表达式，所以不需要双重转义，（\\仅仅是一个转义字符，和正则并没有关系。）
    
4.  以后在写正则表达式的时候，若需要一个\\----------->就写成两个\。（比如\\------------>\\\\\\）

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()