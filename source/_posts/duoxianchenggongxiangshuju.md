title: 多线程共享数据
author: Leesin.Dong
tags:
  - interview
  - 多线程
categories:
  - 基础亦是进阶
  - 多线程
date: 2018-11-08 14:13:00
---
版权声明：本文为作者原创，转载请注明出处，联系qq：32248827 https://blog.csdn.net/dataiyangu/article/details/82253102

在多线程访问共享对象和数据时候大致可以分为两大类。

1：如果每个线程执行的代码相同，可以使用同一个runnable对象，这个runnable对象中有那个共享对象。如：买票系统。

>  1 public class MulteThreadlShareData {
>  2     public static void main(String\[\] args) {
>  3         ShareData shareData = new ShareData();
>  4         new Thread(shareData).start();
>  5         new Thread(shareData).start();
>  6     }
>  7     
>  8     static class ShareData implements Runnable{
>  9         int count = 100;
> 10         @Override
> 11         public void run() {
> 12             while(count>0){
> 13                 decrease();
> 14             }
> 15         }
> 16         public synchronized void decrease(){
> 17             count--;
> 18             System.out.println(Thread.currentThread().getName()+"this count: "+count);
> 19         }
> 20         
> 21     }
> 22 }

2：如果每个线程执行的代码不相同，就要用不同的runnable对象了。这种方式又有两种来实现这些runnable对象之间的数据共享。

*   　　将共享数据封装在另一个对象中，然后将这个对象逐一传递给各个runnable对象中。每个线程共享数据的操作方法也分配到了这个对象身上去完成，这样容易实现针对该数据进行共享数据的互斥和通信。代码实现如下：
    
    >  1 public class MulteThreadlShareData2 {
    >  2     public static void main(String\[\] args) {
    >  3         final ShareData shareData = new ShareData();
    >  4         new Thread(new Decrease(shareData)).start();
    >  5         new Thread(new Increment(shareData)).start();
    >  6     }
    >  7     
    >  8     static class Decrease implements Runnable{
    >  9         private ShareData shareData;
    > 10         public Decrease(ShareData shareData){
    > 11             this.shareData=shareData;
    > 12         }
    > 13         @Override
    > 14         public void run() {
    > 15             shareData.decrease();
    > 16         }
    > 17         
    > 18     }
    > 19     static class Increment implements Runnable{
    > 20         private ShareData shareData;
    > 21         public Increment(ShareData shareData){
    > 22             this.shareData=shareData;
    > 23         }
    > 24         @Override
    > 25         public void run() {
    > 26             shareData.increment();
    > 27         }
    > 28         
    > 29     }
    > 30     
    > 31     static class ShareData{
    > 32         int count = 100;
    > 33         public synchronized void decrease(){
    > 34             count--;
    > 35             System.out.println(Thread.currentThread().getName()+"decrease this count: "+count);
    > 36         }
    > 37         public synchronized void increment(){
    > 38             count++;
    > 39             System.out.println(Thread.currentThread().getName()+"increment this count: "+count);
    > 40         }
    > 41     }
    > 42 }
    
*   　　将这些runnable对象作为某个类的内部类，共享数据作为这个外部类的成员变量，每个线程对共享数据的操作也分配到外部类，以便实现对共享数据进行的各个操作进行互斥和通信，作为内部类的各个runnable对象调用外部类的这些方法。
    
    >  1 public class MulteThreadlShareData3 {
    >  2     static int count = 100;
    >  3     public static void main(String\[\] args) {
    >  4         new Thread(new Decrease()).start();
    >  5         new Thread(new Increment()).start();
    >  6         
    >  7     }
    >  8     public synchronized static void decrease(){
    >  9         count--;
    > 10         System.out.println(Thread.currentThread().getName()+"decrease this count: "+count);
    > 11     }
    > 12     public synchronized static void increment(){
    > 13         count++;
    > 14         System.out.println(Thread.currentThread().getName()+"increment this count: "+count);
    > 15     }
    > 16     static class Decrease implements Runnable{
    > 17         @Override
    > 18         public void run() {
    > 19             decrease();
    > 20         }
    > 21         
    > 22     }
    > 23     static class Increment implements Runnable{
    > 24         @Override
    > 25         public void run() {
    > 26             increment();
    > 27         }
    > 28         
    > 29     }
    > 30 }
    
*   　　上面两种方式的结合：将共享数据封装到另一个对象中，各个线程对共享数据操作的方法也分配到那个对象上去完成，对象作为外部类的成员变量或方法的局部变量，每个runnable对象作为外部类中的成员内部类或局部内部类。
*   >  1 public class MulteThreadlShareData1 {
    >  2     public static void main(String\[\] args) {
    >  3         final ShareData shareData = new ShareData();
    >  4         new Thread(new Runnable() {
    >  5             @Override
    >  6             public void run() {
    >  7                 while(true){
    >  8                     shareData.decrease();
    >  9                 }    
    > 10             }
    > 11         }).start();
    > 12         new Thread(new Runnable() {
    > 13             @Override
    > 14             public void run() {
    > 15                 while(true){
    > 16                     shareData.increment();
    > 17                 }
    > 18                 
    > 19             }
    > 20         }).start();
    > 21     }
    > 22     
    > 23     static class ShareData{
    > 24         int count = 100;
    > 25         public synchronized void decrease(){
    > 26             count--;
    > 27             System.out.println(Thread.currentThread().getName()+"this count: "+count);
    > 28         }
    > 29         public synchronized void increment(){
    > 30             count++;
    > 31             System.out.println(Thread.currentThread().getName()+"this count: "+count);
    > 32         }
    > 33     }
    > 34 }
    

总之：要同步和互斥的几段代码最好放在几个独立的方法中，这些方法在放在同一个类中，这样容易实现他们之间的同步互斥和通信。

阅读更多

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()