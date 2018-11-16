title: java内存分配全面解析
author: Leesin.Dong
tags:
  - interview
  - java基础
  - ''
categories:
  - java
  - java基础
date: 2018-11-08 14:19:00
---
### [Java堆.栈和常量池 笔记](http://www.iteye.com/topic/634530)

（http://www.iteye.com/topic/634530）

今天复习了一下这些知识，顺便做了下笔记.  
**1.寄存器：最快的存储区, 由编译器根据需求进行分配,我们在程序中无法控制.  
2\. 栈：存放基本类型的变量数据和对象的引用，但对象本身不存放在栈中，而是存放在堆（new 出来的对象）或者常量池中（字符串常量对象存放在常量池中。）  
3\. 堆：存放所有new出来的对象。  
4\. 静态域：存放静态成员（static定义的）  
5\. 常量池：存放字符串常量和基本类型常量（public static final）。  
6\. 非RAM存储：硬盘等永久存储空间**  
  
这里我们主要关心栈，堆和常量池，对于栈和常量池中的对象可以共享，对于堆中的对象不可以共享。栈中的数据大小和生命周期是可以确定的，当没有引用指向数据时，这个数据就会消失。堆中的对象的由垃圾回收器负责回收，因此大小和生命周期不需要确定，具有很大的灵活性。  
对于字符串：其对象的引用都是存储在栈中的，如果是编译期已经创建好(直接用双引号定义的)的就存储在常量池中，如果是运行期（new出来的）才能确定的就存储在堆中。对于equals相等的字符串，在常量池中永远只有一份，在堆中有多份。  
如以下代码：

Java代码  ![收藏代码](http://www.iteye.com/images/icon_star.png)

1.  String s1 = "china";  
2.  String s2 = "china";  
3.  String s3 = "china";  
4.  String ss1 = new String("china");  
5.  String ss2 = new String("china");  
6.  String ss3 = new String("china");  

  
![](http://dl.iteye.com/upload/attachment/331454/3588b3c6-f37b-3d63-a48f-59134ea691d2.png)  
 

这里解释一下黄色这3个箭头，对于通过new产生一个字符串（假设为”china”）时，会先去常量池中查找是否已经有了”china”对象，如果没有则在常量池中创建一个此字符串对象，然后堆中再创建一个常量池中此”china”对象的拷贝对象。这也就是有道面试题：String s = new String(“xyz”);产生几个对象？一个或两个，如果常量池中原来没有”xyz”,就是两个。

  
  
对于基础类型的变量和常量：变量和引用存储在栈中，常量存储在常量池中。  
如以下代码：

Java代码  ![收藏代码](http://www.iteye.com/images/icon_star.png)

1.  int i1 = 9;  
2.  int i2 = 9;  
3.  int i3 = 9;   
4.  public static final int INT1 = 9;  
5.  public static final int INT2 = 9;  
6.  public static final int INT3 = 9;  

  
  
![](http://dl.iteye.com/upload/attachment/229942/3968b51b-0a56-3ad6-a54e-b2b19e671526.png)  
对于成员变量和局部变量：成员变量就是方法外部，类的内部定义的变量；局部变量就是方法或语句块内部定义的变量。局部变量必须初始化。  
形式参数是局部变量，局部变量的数据存在于栈内存中。**栈内存中的局部变量随着方法的消失而消失**。  
成员变量存储在堆中的对象里面，由垃圾回收器负责回收。  
如以下代码：

Java代码  ![收藏代码](http://www.iteye.com/images/icon_star.png)

1.  class BirthDate {  
2.      private int day;  
3.      private int month;  
4.      private int year;      
5.      public BirthDate(int d, int m, int y) {  
6.          day = d;   
7.          month = m;   
8.          year = y;  
9.      }  
10.      省略get,set方法………  
11.  }  

13.  public class Test{  
14.      public static void main(String args\[\]){  
15.  int date = 9;  
16.          Test test = new Test();        
17.             test.change(date);   
18.          BirthDate d1= new BirthDate(7,7,1970);         
19.      }    

21.      public void change1(int i){  
22.          i = 1234;  
23.      }  

  
  
}  
  
![](http://dl.iteye.com/upload/attachment/229944/5d8dee1f-ceb9-3705-8924-161dd7599f73.png)  
对于以上这段代码，date为局部变量，i,d,m,y都是形参为局部变量，day，month，year为成员变量。下面分析一下代码执行时候的变化：  
1\. main方法开始执行：int date = 9;  
date局部变量，**基础类型，引用和值都存在栈中。**  
2\. Test test = new Test();  
test为对象引用，存在栈中，对象(new Test())存在堆中。  
3\. test.change(date);  
i为局部变量，引用和值存在栈中。当方法change执行完成后，i就会从栈中消失。  
4\. BirthDate d1= new BirthDate(7,7,1970);    
d1为对象引用，存在栈中，对象(new BirthDate())存在堆中，其中d，m，y为局部变量存储在栈中，且它们的类型为基础类型，因此它们的数据也存储在栈中。day,month,year为成员变量，它们存储在堆中(new BirthDate()里面)。当BirthDate构造方法执行完之后，d,m,y将从栈中消失。  
5.main方法执行完之后，date变量，test，d1引用将从栈中消失，new Test(),new BirthDate()将等待垃圾回收。

### [Java内存分配全面浅析](http://blog.csdn.net/yangyuankp/article/details/7651251)

(http://blog.csdn.net/yangyuankp/article/details/7651251)

本文将由浅入深详细介绍[Java](http://lib.csdn.net/base/javase)内存分配的原理，以帮助新手更轻松的学习Java。这类文章网上有很多，但大多比较零碎。本文从认知过程角度出发，将带给读者一个系统的介绍。

         进入正题前首先要知道的是Java程序运行在JVM(Java  Virtual Machine，Java虚拟机)上，可以把JVM理解成Java程序和[操作系统](http://lib.csdn.net/base/operatingsystem)之间的桥梁，JVM实现了Java的平台无关性，由此可见JVM的重要性。所以在学习Java内存分配原理的时候一定要牢记这一切都是在JVM中进行的，JVM是内存分配原理的基础与前提。

**         简单通俗的讲，一个完整的Java程序运行过程会涉及以下内存区域：**

         l  **寄存器：**JVM内部虚拟寄存器，存取速度非常快，程序不可控制。

         l  **栈：**保存局部变量的值，包括：1.用来保存基本数据类型的值；2.保存类的**实例**，即堆区**对象**的引用(指针)。也可以用来保存加载方法时的帧。

         l  **堆：**用来存放动态产生的数据，比如new出来的**对象**。注意创建出来的对象只包含属于各自的成员变量，并不包括成员方法。因为同一个类的对象拥有各自的成员变量，存储在各自的堆中，但是他们共享该类的方法，并不是每创建一个对象就把成员方法复制一次。

         l  **常量池：**JVM为每个已加载的类型维护一个常量池，常量池就是这个类型用到的常量的一个有序集合。包括直接常量(基本类型，String)和对其他类型、方法、字段的**符号引用(1)**。池中的数据和数组一样通过索引访问。由于常量池包含了一个类型所有的对其他类型、方法、字段的符号引用，所以常量池在Java的动态链接中起了核心作用。**常量池存在于堆中**。

         l  **代码段：**用来存放从硬盘上读取的源程序代码。

         l  **数据段：**用来存放static定义的静态成员。

**下面是内存表示图：**

**![](http://my.csdn.net/uploads/201206/11/1339378152_2914.jpg)**

         上图中大致描述了Java内存分配，接下来通过实例详细讲解Java程序是如何在内存中运行的（注：以下图片引用自尚学堂马士兵老师的J2SE课件，图右侧是程序代码，左侧是内存分配示意图，我会一一加上注释）。

**预备知识：**

**         1.**一个Java文件，只要有main入口方法，我们就认为这是一个Java程序，可以单独编译运行。

**         2.**无论是普通类型的变量还是引用类型的变量(俗称实例)，都可以作为局部变量，他们都可以出现在栈中。只不过普通类型的变量在栈中直接保存它所对应的值，而引用类型的变量保存的是一个指向堆区的指针，通过这个指针，就可以找到这个实例在堆区对应的对象。因此，普通类型变量只在栈区占用一块内存，而引用类型变量要在栈区和堆区各占一块内存。

**示例：**

**![](http://my.csdn.net/uploads/201206/11/1339378314_1846.jpg)**

**1.**JVM自动寻找main方法，执行第一句代码，创建一个Test类的实例，在栈中分配一块内存，存放一个指向堆区对象的指针110925。

**2.**创建一个int型的变量date，由于是基本类型，直接在栈中存放date对应的值9。

**3.**创建两个BirthDate类的实例d1、d2，在栈中分别存放了对应的指针指向各自的对象。他们在实例化时调用了有参数的构造方法，因此对象中有自定义初始值。

![](http://my.csdn.net/uploads/201206/11/1339378409_9491.jpg)

调用test对象的change1方法，并且以date为参数。JVM读到这段代码时，检测到i是局部变量，因此会把i放在栈中，并且把date的值赋给i。

![](http://my.csdn.net/uploads/201206/11/1339378462_9012.jpg)

把1234赋给i。很简单的一步。

![](http://my.csdn.net/uploads/201206/11/1339378502_6545.jpg)

change1方法执行完毕，立即释放局部变量i所占用的栈空间。

![](http://my.csdn.net/uploads/201206/11/1339378627_1360.jpg)

调用test对象的change2方法，以实例d1为参数。JVM检测到change2方法中的b参数为局部变量，立即加入到栈中，由于是引用类型的变量，所以b中保存的是d1中的指针，此时b和d1指向同一个堆中的对象。在b和d1之间传递是指针。

![](http://my.csdn.net/uploads/201206/11/1339378675_6765.jpg)

change2方法中又实例化了一个BirthDate对象，并且赋给b。在内部执行过程是：在堆区new了一个对象，并且把该对象的指针保存在栈中的b对应空间，此时实例b不再指向实例d1所指向的对象，但是实例d1所指向的对象并无变化，这样无法对d1造成任何影响。

![](http://my.csdn.net/uploads/201206/11/1339378718_6002.jpg)

change2方法执行完毕，立即释放局部引用变量b所占的栈空间，注意只是释放了栈空间，堆空间要等待自动回收。

![](http://my.csdn.net/uploads/201206/11/1339378841_8802.jpg)

调用test实例的change3方法，以实例d2为参数。同理，JVM会在栈中为局部引用变量b分配空间，并且把d2中的指针存放在b中，此时d2和b指向同一个对象。再调用实例b的setDay方法，其实就是调用d2指向的对象的setDay方法。

![](http://my.csdn.net/uploads/201206/11/1339378904_1300.jpg)

调用实例b的setDay方法会影响d2，因为二者指向的是同一个对象。

![](http://my.csdn.net/uploads/201206/11/1339378953_4690.jpg)

         change3方法执行完毕，立即释放局部引用变量b。

         以上就是Java程序运行时内存分配的大致情况。其实也没什么，掌握了思想就很简单了。无非就是两种类型的变量：基本类型和引用类型。二者作为局部变量，都放在栈中，基本类型直接在栈中保存值，引用类型只保存一个指向堆区的指针，真正的对象在堆里。作为参数时基本类型就直接传值，引用类型传指针。

**小结：**

         **1.**分清什么是实例什么是对象。Class a= new Class();此时a叫实例，而不能说a是对象。实例在栈中，对象在堆中，操作实例实际上是通过实例的指针间接操作对象。多个实例可以指向同一个对象。

         **2.**栈中的数据和堆中的数据销毁并不是同步的。方法一旦结束，栈中的局部变量立即销毁，但是堆中对象不一定销毁。因为可能有其他变量也指向了这个对象，直到栈中没有变量指向堆中的对象时，它才销毁，而且还不是马上销毁，要等垃圾回收扫描时才可以被销毁。

         **3.**以上的栈、堆、代码段、数据段等等都是相对于应用程序而言的。每一个应用程序都对应唯一的一个JVM实例，每一个JVM实例都有自己的内存区域，互不影响。并且这些内存区域是所有线程共享的。这里提到的栈和堆都是整体上的概念，这些堆栈还可以细分。

         **4.**类的成员变量在不同对象中各不相同，都有自己的存储空间(成员变量在堆中的对象中)。而类的方法却是该类的所有对象共享的，只有一套，对象使用方法的时候方法才被压入栈，方法不使用则不占用内存。

         以上分析只涉及了栈和堆，还有一个非常重要的内存区域：常量池，这个地方往往出现一些莫名其妙的问题。常量池是干嘛的上边已经说明了，也没必要理解多么深刻，只要记住它维护了一个已加载类的常量就可以了。接下来结合一些例子说明常量池的特性。

**预备知识：**

         基本类型和基本类型的包装类。基本类型有：byte、short、char、int、long、boolean。基本类型的包装类分别是：Byte、Short、Character、Integer、Long、Boolean。注意区分大小写。二者的区别是：基本类型体现在程序中是普通变量，基本类型的包装类是类，体现在程序中是引用变量。因此二者在内存中的存储位置不同：基本类型存储在栈中，而基本类型包装类存储在堆中。上边提到的这些包装类都实现了常量池技术，另外两种浮点数类型的包装类则没有实现。另外，String类型也实现了常量池技术。

**实例：**

**\[java\]** [view plain](http://blog.csdn.net/yangyuankp/article/details/7651251#) [copy](http://blog.csdn.net/yangyuankp/article/details/7651251#)

1.  public class test {  
2.      public static void main(String\[\] args) {      
3.          objPoolTest();  
4.      }  

6.      public static void objPoolTest() {  
7.          int i = 40;  
8.          int i0 = 40;  
9.          Integer i1 = 40;  
10.          Integer i2 = 40;  
11.          Integer i3 = 0;  
12.          Integer i4 = new Integer(40);  
13.          Integer i5 = new Integer(40);  
14.          Integer i6 = new Integer(0);  
15.          Double d1=1.0;  
16.          Double d2=1.0;  

18.          System.out.println("i=i0\\t" + (i == i0));  
19.          System.out.println("i1=i2\\t" + (i1 == i2));  
20.          System.out.println("i1=i2+i3\\t" + (i1 == i2 + i3));  
21.          System.out.println("i4=i5\\t" + (i4 == i5));  
22.          System.out.println("i4=i5+i6\\t" + (i4 == i5 + i6));      
23.          System.out.println("d1=d2\\t" + (d1==d2));   

25.          System.out.println();          
26.      }  
27.  }  

**结果：**

**\[plain\]** [view plain](http://blog.csdn.net/yangyuankp/article/details/7651251#) [copy](http://blog.csdn.net/yangyuankp/article/details/7651251#)

1.  i=i0    true  
2.  i1=i2   true  
3.  i1=i2+i3        true  
4.  i4=i5   false  
5.  i4=i5+i6        true  
6.  d1=d2   false  

**结果**分析**：**

**         1.**i和i0均是普通类型(int)的变量，所以数据直接存储在栈中，而栈有一个很重要的特性：**栈中的数据可以共享**。当我们定义了int i = 40;，再定义int i0 = 40;这时候会自动检查栈中是否有40这个数据，如果有，i0会直接指向i的40，不会再添加一个新的40。

**         2.**i1和i2均是引用类型，在栈中存储指针，因为Integer是包装类。由于Integer 包装类实现了常量池技术，因此i1、i2的40均是从常量池中获取的，均指向同一个地址，因此i1=12。

**         3.**很明显这是一个加法运算，**Java的数学运算都是在栈中进行的**，**Java会自动对i1、i2进行拆箱操作转化成整型**，因此i1在数值上等于i2+i3。

**         4.i**4和i5 均是引用类型，在栈中存储指针，因为Integer是包装类。但是由于他们各自都是new出来的，因此不再从常量池寻找数据，而是从堆中各自new一个对象，然后各自保存指向对象的指针，所以i4和i5不相等，因为他们所存指针不同，所指向对象不同。

**         5.**这也是一个加法运算，和3同理。

**         6.**d1和d2均是引用类型，在栈中存储指针，因为Double是包装类。但Double包装类没有实现常量池技术，因此Doubled1=1.0;相当于Double d1=new Double(1.0);，是从堆new一个对象，d2同理。因此d1和d2存放的指针不同，指向的对象不同，所以不相等。

**小结：**

**         1.**以上提到的几种基本类型包装类均实现了常量池技术，但他们维护的常量仅仅是【-128至127】这个范围内的常量，如果常量值超过这个范围，就会从堆中创建对象，不再从常量池中取。比如，把上边例子改成Integer i1 = 400; Integer i2 = 400;，很明显超过了127，无法从常量池获取常量，就要从堆中new新的Integer对象，这时i1和i2就不相等了。

**         2.**String类型也实现了常量池技术，但是稍微有点不同。String型是先检测常量池中有没有对应字符串，如果有，则取出来；如果没有，则把当前的添加进去。

         凡是涉及内存原理，一般都是博大精深的领域，切勿听信一家之言，多读些文章。我在这只是浅析，里边还有很多猫腻，就留给读者探索思考了。希望本文能对大家有所帮助！

**脚注：**

**         (1)** 符号引用，顾名思义，就是一个符号，符号引用被使用的时候，才会解析这个符号。如果熟悉[Linux](http://lib.csdn.net/base/linux)或unix系统的，可以把这个符号引用看作一个文件的软链接，当使用这个软连接的时候，才会真正解析它，展开它找到实际的文件

对于符号引用，在类加载层面上讨论比较多，源码级别只是一个形式上的讨论。

当一个类被加载时，该类所用到的别的类的符号引用都会保存在常量池，实际代码执行的时候，首次遇到某个别的类时，JVM会对常量池的该类的符号引用展开，转为直接引用，这样下次再遇到同样的类型时，JVM就不再解析，而直接使用这个已经被解析过的直接引用。

除了上述的类加载过程的符号引用说法，对于源码级别来说，就是依照引用的解析过程来区别代码中某些数据属于符号引用还是直接引用，如，System.out.println("test" +"abc");//这里发生的效果相当于直接引用，而假设某个Strings = "abc"; System.out.println("test" + s);//这里的发生的效果相当于符号引用，即把s展开解析，也就相当于s是"abc"的一个符号链接，也就是说在编译的时候，class文件并没有直接展看s，而把这个s看作一个符号，在实际的代码执行时，才会展开这个。

**参考文章：**

java内存分配研究：[http://www.blogjava](http://www.blogjava.net/Jack2007/archive/2008/05/21/202018.html)[.NET](http://lib.csdn.net/base/dotnet)/Jack2007/archive/2008/05/21/202018.html

Java常量池详解之一道比较蛋疼的面试题：[http://www.cnblogs.com/DreamSea/archive/2011/11/20/2256396.html](http://www.cnblogs.com/DreamSea/archive/2011/11/20/2256396.html)

jvm常量池：[http://www.cnblogs.com/wenfeng762/archive/2011/08/14/2137820.html](http://www.cnblogs.com/wenfeng762/archive/2011/08/14/2137820.html)

深入Java核心 Java内存分配原理精讲：[http://developer.51cto.com/art/201009/225071.htm](http://developer.51cto.com/art/201009/225071.htm)

### JAVA 继承 父类子类 内存分配

（http://blog.csdn.net/smithdoudou88/article/details/12756187）

![](http://img.my.csdn.net/uploads/201305/04/1367634235_1597.jpg)

继承的基本概念：

（1）Java不支持多继承，也就是说子类至多只能有一个父类。

（2）子类继承了其父类中不是私有的成员变量和成员方法，作为自己的成员变量和方法。

（3）子类中定义的成员变量和父类中定义的成员变量相同时，则父类中的成员变量不能被继承。

（4）子类中定义的成员方法，并且这个方法的名字返回类型，以及参数个数和类型与父类的某个成员方法完全相同，则父类的成员方法不能被继承。

分析以上程序示例，主要疑惑点是“子类继承父类的成员变量，父类对象是否会实例化？私有成员变量是否会被继承？被继承的成员变量在哪里分配空间？”

1：虚拟机加载ExtendsDemo类，提取类型信息到方法区。

2：通过保存在方法区的字节码，虚拟机开始执行main方法，main方法入栈。

3：执行main方法的第一条指令，new Student(); 这句话就是给Student实例对象分配堆空间。因为Student继承Person父类，所以，虚拟机首先加载Person类到方法区，并在堆中为父类成员变量在子类空间中初始化。然后加载Student类到方法区，为Student类的成员变量分配空间并初始化默认值。将Student类的实例对象地址赋值给引用变量s。

4：接下来两条语句为成员变量赋值，由于name跟age是从父类继承而来，会被保存在子类父对象中(见图中堆中在子类实例对象中为父类成员变量分配了空间并保存了父类的引用，并没有实例化父类。)，所以就根据引用变量s持有的引用找到堆中的对象(子类对象)，然后给name跟age赋值。

4：调用say()方法，通过引用变量s持有的引用找到堆中的实例对象，通过实例对象持有的本类在方法区的引用，找到本类的类型信息，定位到say()方法。say()方法入栈。开始执行say()方法中的字节码。

5：say()方法执行完毕，say方法出栈，程序回到main方法，main方法执行完毕出栈，主线程消亡，虚拟机实例消亡，程序结束。

总结：相同的方法会被重写，变量没有重写之说，如果子类声明了跟父类一样的变量，那意味着子类将有两个相同名称的变量。一个存放在子类实例对象中，一个存放在父类子对象中。父类的private变量，也会被继承并且初始化在子类父对象中，只不过对外不可见。

super关键字在java中的作用是使被屏蔽的成员变量或者成员方法变为可见，或者说用来引用被屏蔽的成员变量或成员方法，super只是记录在对象内部的父类特征(属性和方法)的一个引用。啥叫被屏蔽的成员变量或成员方法？就是被子类重写了的方法和定义了跟父类相同的成员变量，由于不能被继承，所以就称作被屏蔽。

说到这里，上面提出的疑惑也就解开了。

### Java继承中的转型及其内存分配

（http://www.cnblogs.com/jycboy/archive/2016/04/10/5373690.html）

看书的时候被一段代码能凌乱啦，代码是这样的：

![复制代码](http://common.cnblogs.com/images/copycode.gif)

    package 继承; abstract class People    {        public String tag = "疯狂Java讲义";         //①        public String name = "Parent";        String getName(){            return name;        }            }    class Student extends People    {        //定义一个私有的tag实例变量来隐藏父类的tag实例变量        String tag = "轻量级Java EE企业应用实战";         //②        public String name = "Student";    }    public class HideTest2    {        public static void main(String[] args)        {            Student d = new Student();            //将d变量显式地向上转型为Parent后，即可访问tag实例变量            //程序将输出：“疯狂Java讲义”            System.out.println(((People)d).tag);         //④            System.out.println(d.getName());  //parent        }    }

![复制代码](http://common.cnblogs.com/images/copycode.gif)

运行结果：

疯狂Java讲义  
Parent

在这个代码中，抽象父类People定义了两个变量和一个getName()方法，子类student也定义了两个和父类同名的变量，把父类的隐藏。

关于这段代码的两个困惑：1.子类实例化时必须首先实例化父类对象，而父类是抽象类，不能有对象。那到底子类实例化时产不产生父类对象？？？

                                  2.d.getName();//返回的是parent，而不是student.不应该把父类的隐藏么？？

书中是这么解释的：

  Student对象会保存两份实例变量，一份是people中定义的实例变量，一份是Student中定义的实例变量，d变量引用一个Student对象，内存示意图如下：

  ![](http://images2015.cnblogs.com/blog/747969/201604/747969-20160410113325140-2013660135.png)

将d向上转型为Parent对象，在通过它访问name变量是允许的，也就是输出“parent”。

![](https://img-blog.csdn.net/20150317194512097?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdTAxMzkwNTc0NA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

java基本数据类型存放在哪？

基本类型的变量存在栈里或者堆里不是由"大小可知，生存期可知"就能确定了。关键是上下文。

比如

void func(){

int a = 3;

}

这自然是存在栈里的。局部方法嘛。

而

class Test{

int a = 3;

}

这就肯定是随对象放到堆里的。

因此，不要孤立的看到基本类型就说放到栈里，看到引用类型就说放到堆里。从更深层次去理解它们会更好，例如为什么是在基本类型的实例变量在堆上创建，局部变量在栈上创建，这样做有什么好处

思考:

如果你熟悉java的内存结构的话就会知道，堆 是所有线程共享的内存区域，栈 是每个线程独享的，如果你将一个实例变量放在栈内，那么就不存在多个线程访问同一个对象资源了，这显然是不对的，所以实例变量要在堆上创建，也不是线程安全的。

但是对于局部变量，是在栈上创建的，每一次方法调用创建一个帧，独享一份内存区域，其他的线程是不会访问到该线程的资源，在 栈上创建也会减轻GC的压力，随着该方法的结束，帧出栈，相对应的内存消除，这种局部变量占用的内存自然就消失了，因此局部变量是线程安全的。

（转自：http://blog.csdn.net/u013905744/article/details/44346717）

【**其实不是子类的的show()方法把父亲覆盖了；应该是 子类的父亲的show()指针被修改为指向子类的show()方法了, 通过指针的解释更合适点**】

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()