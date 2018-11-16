title: JMX之ObjectName
author: Leesin.Dong
tags:
  - java基础
categories:
  - java
  - java基础
date: 2018-11-11 10:30:00
---
原文链接：[https://blog.csdn.net/yunlong34574/article/details/46563187](https://blog.csdn.net/yunlong34574/article/details/46563187)

ObjectName 就是存储了一个domain(域)下的一些属性，属性的存储采取key-value的方式来存储，**这个类的一个精华所在就是domian及属性（key或者value）都是支持正则的，比如：*表示匹配所有，？表示匹配一个字符。**

**      一、ObjectName注释翻译**

 ObjectName 表示一个Mbean的对象名称，或者是表示一个能够匹配几个Mbean的正则，ObjectName 的所有实例都是不可变的。

    也就是说， ObjectName 类的实例能够用来表示：一个对象名称，或者一个正则对象，这个对象可以通过正则上下文来查询。

    ObjectName由两部分组成，包括域（domain）和属性（properties）。域是一个不包含冒号的字符串，我们同时也推荐一个domain不应该包含“//”，因为这两个字符是为将来使用而预留的。如果在域中出现了通配符（*号）或者问号（？），那么这个ObjectName对象就是一个正则对象。通配符（*）匹配零个或者多个任意序列，而问号（？）则指匹配一个字符。

     如果域是空的，那么ObjectName对象的域在某些环境中会被替换为Mbean的默认域，这么做的目的就是以便ObjectName能够被Mbean使用。

    ObjectName对象的属性时一个无序的keys和values，一个key对应一个values。每一个key都是不包含逗号、等号、冒号、星号和问号的非空字符串，在同一个ObjectName对象中，不会出现相同的Key。与key关联的value，这个value要么没有引号，要么有引号。一个没有引号的value可能是一个不包含逗号、等号、冒号或者引号的空字符串。如果没有引号的value包含了通配符*号或者问号，那么说明这个ObjectName是一个正则value。通配符*号匹配零个或者多个字符序列，而问号则匹配一个字符。带有引号的value由双引号组成，双引号后边可能是一个空字符串，也可能是另外一个双引号。在这个字符串中，反斜杠有着特殊的意义。反斜杠后边必须紧跟着被下边的字符：

    【1】如果紧跟着的是另一个反斜杠，第二个反斜杠没有特别的意义，所以这两个反斜杠表示一个反斜杠，因为第一个反斜杠是转义字符了。

    【2】如果紧跟着的是一个字符'n'，那么这两个字符表示一个换行符，也就是java中的"/n"的意思

    【3】如果紧跟着的是一个双引号，那么这两个字符表示一个双引号，注意这个双引号并不是表示前一个双引号的终结。一个闭合的双引号必须表示一个合法的双引号值。

    【4】如果紧跟着的是一个问号或者通配符（*），那么这两个字符在这里仅仅表示问号和星号，不再是正则的匹配符号了。

      一个引号只有可能出现在奇数个反斜杠后边，否则在一个引号的值里面不会出现双引号。双引号括起来了带有双引号的value，在这个value中的任何反斜杠都被认为是分割这个value的。

     如果带有双引号的值包含了通配符(*)或者问号，并且这两个符号没有被反斜杠预处理，那么他们则被认为是一个通配符。星号表示匹配零个或者多个字符串序列，而问号则匹配一个字符串。

     一个ObjectName对象可能是一个属性列表匹配。在这种情况下，ObjectName可能没有或者有多个keys和关联的values。这个ObjectName能够匹配一个没有正则的ObjectName对象，没有正则的ObjectName的域与有正则的ObjectName的域匹，并且他们包含相同的keys和关联的values，同样他们可能包含相同的其他keys和values。

    当一个ObjectName对象包含了一个双引号，或者没有引号时包含了上面描述的通配符，那么这个ObjectName就被认为是一个属性列表的模式匹配对象。在这种情况下，这个ObjectName包含了一个或者多个keys和关联的values，至少有一个value包含了通配符。他匹配了一个没有模式匹配的ObjectName对象，因为这两个ObjectName的域能够匹配，并且他们包含了值能够匹配的相同keys；如果这个属性值模式匹配是一个属性列表匹配，那么非模式匹配的Object对象也能够包含其他的keys和values。

    当一个Object对象的Key是一个模式匹配，或者一个value是模式匹配，或者key和value都是模式匹配，那么这个对象则是一个属性模式匹配。

    如果一个ObjectName对象的域包含了通配符，那么这个ObjectName对象就是一个模式匹配。如果一个ObjectName不是一个模式匹配对象，那么它必须至少包含一个key和这个key关联的value。

   ObjectName模式匹配的示例：

   【1】*:type=Foo,name=Bar

          匹配任何域下的一个确定keys的集合。keys为：type=Foo,name=Bar

   【2】d:type=Foo,name=Bar,*

          匹配域“d”下有keys“ type=Foo,name=Bar ”加上零个或者多个其他keys。

   【3】*:type=Foo,name=Bar,*

          匹配任何域下有keys“ type=Foo,name=Bar ”加上零个或者多个其他keys。

   【4】d:type=F?o,name=Bar

          与“d:type=Foo,name=Bar”和“d:type=Fro,name=Bar”匹配一致

   【5】d:type=F*o,name=Bar

         与“d:type=Fo,name=Bar”和“d:type=Frodo,name=Bar”匹配一致

   【6】d:type=Foo,name="B*"

        与 d:type=Foo,name="Bling" 匹配一致，通配符是在引号里面，我们可以使用反斜杠“/”把特殊字符转化为普通字符。

     一个ObjectName可以写成下面的格式：域：key属性列表。一个key属性列表可以写成用逗号分开的字符串。每个用逗号分割的字符串要么是一个通配符，要么是一个确定的key值。一个key属性值由key、等号和关联的value组成。

    大部分key属性列表都是一个通配符，如果这个key属性列表包含了通配符，那么这个ObjectName是一个通配符属性。在一个ObjectName对象中，空格没有特别的意义。如下面的字符串：

     domain: key1 = value1 , key2 = value2

     上面的字符串表示一个Object对象，这个对象有两个key组成。每个key由6个字符组成，每个key都是从空格开始，以空格结尾。除了对上边指出的字符的限制，一个ObjectName中没有任何部分会包含换行符“/n”，包括：域、key、value、引用或者没有引号。但是换行符“/n”可以出现一个双引号序列的里面。无论我们使用哪个构造函数来构造ObjectName对象，上边的对特殊字符的规则都是适用的。

     为了避免不同的人编写的不同的MBean之间的冲突，一个有效的约定就是域的名字采用机构dns的反向写法。例如：Sun Microsystems Inc公司的DNS名为sun.com，那么我可以定义域为com.sun.MyDomain，这个基本上跟java语言的包名字定义的约定是一致的。

**      二、ObjectName的测试**

package org.apache.catalina.manager;  
  
import javax.management.MalformedObjectNameException;  
import javax.management.ObjectName;  
  
/**  
 \* 测试ObjectName对象  
 *   
 \* @author rey  
 *   
 */  
public class MyTest {  
  
    /**  
     \* @param args  
     \* @throws NullPointerException  
     \* @throws MalformedObjectNameException  
     */  
    public static void main(String\[\] args) throws MalformedObjectNameException,  
            NullPointerException {  
        String sAnotherName ="d:type=F*o,name=Bar";  
        ObjectName currObjectName = new ObjectName(sAnotherName);  
        System.out.println(currObjectName.toString());  
    }  
  
}

   输出结果：d:type=F*o,name=Bar

**      三、ObjectName的源码可以从jdk中查看**

包路径为：**javax.management.ObjectName**

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()