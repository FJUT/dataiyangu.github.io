title: 接口和抽象类可以被 new吗
author: Leesin.Dong
tags:
  - interview
  - java基础
categories:
  - java
  - java基础
date: 2018-11-08 14:17:00
---
背景：
===

    最近有同事跟我说了他面试时遇到的问题，考官问：“接口和抽象类可以被new嘛？”。这可能不是考官的原话，但是据他表达考官大概就是这个意思了。听到这个问题，我的第一反应是肯定不行啊，直接对接口和抽象类调用new，编译器都过不去。但是他说，考官说可以，用匿名内部类实现。听见这个回到，我感觉那个考官太…………![惊讶](http://static.blog.csdn.net/xheditor/xheditor_emot/default/ohmy.gif)，有点无语。我们可以仔细分析下这个问题。

直接new接口和抽象类
===========

   首先先明确一点，直接new接口和抽象类，这肯定行不通，编译器会提示Cannot instantiate the type XX的错误。这个实验就不做了，没意思。

使用匿名内部类
=======

     下面的代码是一个匿名内部类的Demo，也就是考官说的可以new。

1.  `package com.saillen.test;`
    

3.  `interface A {`
    
4.  `void f();`
    
5.  `}`
    

7.  `public class T {`
    

9.  `public T(A a) {`
    
10.  `a.f();`
    
11.  `}`
    

13.  `public static void main(String[] args) {`
    
14.  `T t = new T(new A() {`
    
15.  `public void f() {`
    
16.  `System.out.println("我是匿名内部类");`
    
17.  `System.out.println("Class对象是:" + this.getClass());`
    
18.  `System.out.println("类名字是:" + this.getClass().getSimpleName());`
    
19.  `}`
    
20.  `});`
    
21.  `}`
    

23.  `}`
    

   上面的程序很简单，我们使用匿名内部类，然后“new”一个接口A的对象，输出它的类名了Class对象，输出如下：

1.  `我是匿名内部类`
    
2.  `Class对象是:class com.saillen.test.T$1`
    
3.  `类名字是:`
    

   通过输出可以看到，内部类的类名是“”也就是一个空字符串，但是它确确实实是有类型的。而且查看编译后的class文件，会发现，会多一个T$1.class，这个class就是匿名内部类的原型，

![](https://img-blog.csdn.net/20150804204617677?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

  用javap反编译这个文件，可以看到这个类的源码样式如下：

![](https://img-blog.csdn.net/20150804204636918?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

   通过反编译后的文件可以证明，我们的“匿名内部类”的类名是Test$1。所以new针对的还是普通的class（虽然内部类和普通类有很大不一样），只不过这个class的写法稍有不同，它是编译器帮我们从匿名内部类中提取的。

结论：
===

 通过上面的实验，我仍然坚持，接口和抽象类不可以被new！匿名内部类只是一种写法上的迷惑而已。这个考官的答案很不靠谱，不能说他的想法就是绝对的错，但是绝对不应该这么问这个问题，这不是一个能不能就回答的。或者说不能从字面上就证明可以对interface或者abstract class使用new。

内部类总结
=====

    Java编程思想第十章专门介绍了内部类，内部类确实神奇而且复杂。但是内部类在编程中被应用的场景很少，这主要是看设计者的设计思想，不过它的语法和特性却有很多。对于内部类来说要记住**可以继承内部类但是不能覆盖**。

普通内部类：
------

    普通的内部类，就是在class里面普通的定义一个类，eg：

1.  `public class A{`
    
2.  `public class B{`
    

4.  `}`
    

6.  `}`
    

普通内部类，或者说平凡的内部类，有如下特性：（总结自《Java编程思想》）  
   （1）这个类在外部类的外面不能被直接访问，需要通过OuterClassName.InnerClassName方式访问。比如Map的Map.Entry就是一个内部接口，只能通过Map.Entry方式来使用它。

   （2）内部类对象在创建后会秘密的链接到外部类对象上，隐含的有一个指向外部类对象的引用，所以没有外部类对象，是无法实例化内部类对象的。也就是我们无法独立于外部类创建一个内部类对象。（**这里不包括声明为static的内部类，那不是平凡的内部类**）

    （3）因为内部类隐含的有一个指向外部类的指针，所以内部类可以访问外围类的成员，而且是外围类的所有成员，包括private的成员。

    （4）在内部类中使用OuterClassName.this可以访问外围类对象。

    （4）如果想要在外部类外面实例化内部类对象，那么可以同.new语法，也就是outerObject.new InnerClass()的方式，eg:

1.  `package com.saillen.test;`
    

3.  `public class A {`
    

5.  `public void f() {`
    
6.  `A.B b = this.new B();`
    
7.  `B b2 = new B();`
    
8.  `}`
    

10.  `public class B {`
    
11.  `void g(){`
    
12.  `System.out.println(A.this);`
    
13.  `}`
    
14.  `}`
    

16.  `public static void main(String[] args) {`
    
17.  `A a = new A();`
    
18.  `A.B b = a.new B();`
    
19.  `}`
    

21.  `}`
    

  
  （5）内部类最大的用途是：它可以实现接口或者继承某个类，这样使用内部类时，用基类引用内部类对象，可以屏蔽内部类的细节。这样的好处是，可以实现伪“多重继承”等。

  （6）普通的内部类不能有static字段和static数据，也不能包含嵌套类。

在方法和作用域内的内部类：
-------------

   如果内部类出现在了方法和作用域内，那么它就不是“平凡”的内部类了，而且**这个内部类的作用域就是在这个方法的作用域内，方法外面是无法访问到的！**但是它仍然具有“平凡”的内部类特性。

**匿名内部类：**
----------

   匿名内部类，在内部类的基础上减少了对class的定义，直接用new 后面跟一个接口或者基类，然后类体里面实现方法即可，这样JVM会调用编译器生成的构造器来生成这个内部类对象，并且编译器帮忙生成这个内部类的类结构。匿名内部类好处是语法简单，但是不方便阅读，在Android编程中，对Button的监听经常会用匿名内部类。匿名内部类有一些限制：**匿名内部既可以扩展类，也可以实现接口，但是不能两者兼备，而且只能实现一个接口。**

嵌套类：
----

   嵌套类就是在内部类的基础上加上static声明，也就是静态的内部类。嵌套类跟普通的内部类特性有很大不同，特点：

   （1）在构造时，不需要外围类的对象，但是同样，它只能访问外围类中的static字段；

   （2）嵌套类可以有static数据和字段；

   （3）嵌套类可以作为接口的一部分，这样在接口中就可以用公用代码出现；

   （4）嵌套类是可以多重嵌套的，嵌套多少层不重要，它都可以访问它所有外围类成员。

**内部类标识符：**
-----------

    部类必须生成一个class文件以包含它的Class对象信息，这些类文件有严格的命名规则：外围类的名字，加上“$”，再加上内部类的名字。

为什么需要内部类：
---------

   《Java编程思想》中很明确指出：    

  **_ 每个内部类都能独立的继承自一个（接口的）实现，所以无论外围类是否已经继承了某个实现，对于内部类都没有影响。_**

   **利用内部类可以实现多重继承等好处，****使用内部类还可以实现java版的闭包和回调，而且比指针更灵活、更安全。**

阅读更多

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()