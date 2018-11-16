title: 线程安全问题小总结。
author: Leesin.Dong
tags:
  - 多线程
  - interview
categories:
  - 基础亦是进阶
  - 多线程
date: 2018-11-08 14:11:00
---
版权声明：本文为作者原创，转载请注明出处，联系qq：32248827 https://blog.csdn.net/dataiyangu/article/details/82253749

线程安全问题：

线程安全出现的根本原因：

    1.存在两个或者两个以上的线程对象共享同一个资源；

    2.多线程操作共享资源代码有多个语句。

线程安全问题的解决方案（2个）：

方式一：同步代码块

    格式：synchronize（锁对象）{

                      需要被同步的代码

               }

    同步代码块需要注意的事项：

        1.锁对象可以是任意的一个对象；

        2.一个线程在同步代码块中sleep了，并不会释放锁对象；

        3.如果不存在线程安全问题，千万不要使用同步代码块；

        4.锁对象必须是多线程共享的一个资源，否则锁不住。

    例子：三个窗口售票

> 1.  `class SaleTicket extends Thread{`
>     
> 2.  `static int num = 50;//票数 非静态的成员变量,非静态的成员变量数据是在每个对象中都会维护一份数据的。`
>     
> 3.  `public SaleTicket(String name) {`
>     
> 4.  `super(name);`
>     
> 5.  `}`
>     
> 
> 7.  `@Override`
>     
> 8.  `public void run() {`
>     
> 9.  `while(true){`
>     
> 10.  `//同步代码块`
>     
> 11.  `synchronized ("锁") {`
>     
> 12.  `if(num>0){`
>     
> 13.  `System.out.println(Thread.currentThread().getName()+"售出了第"+num+"号票");`
>     
> 14.  `try {`
>     
> 15.  `Thread.sleep(100);`
>     
> 16.  `} catch (InterruptedException e) {`
>     
> 17.  `e.printStackTrace();`
>     
> 18.  `}`
>     
> 19.  `num--;`
>     
> 20.  `}else{`
>     
> 21.  `System.out.println("售罄了..");`
>     
> 22.  `break;`
>     
> 23.  `}`
>     
> 24.  `}`
>     
> 25.  `}`
>     
> 26.  `}`
>     
> 27.  `}`
>     
> 28.  `public class Demo4 {`
>     
> 29.  `public static void main(String[] args) {`
>     
> 30.  `//创建三个线程对象，模拟三个窗口`
>     
> 31.  `SaleTicket thread1 = new SaleTicket("窗口1");`
>     
> 32.  `SaleTicket thread2 = new SaleTicket("窗口2");`
>     
> 33.  `SaleTicket thread3 = new SaleTicket("窗口3");`
>     
> 34.  `//开启线程售票`
>     
> 35.  `thread1.start();`
>     
> 36.  `thread2.start();`
>     
> 37.  `thread3.start();`
>     
> 38.  `}`
>     
> 39.  `}`
>     

方式二：同步函数（同步函数就是使用synchronized修饰一个函数）

    同步函数注意事项：

        1.如果函数是一个非静态的同步函数，那么锁对象是this对象；

        2.如果函数是静态的同步函数，那么锁对象是当前函数所属的类的字节码文件（class对象）；

        3.同步函数的锁对象是固定的，不能由自己指定。

    例子：两夫妻取钱

> 1.  `class BankThread extends Thread{`
>     
> 2.  `static int count = 5000;`
>     
> 3.  `public BankThread(String name){`
>     
> 4.  `super(name);`
>     
> 5.  `}`
>     
> 
> 7.  `@Override //`
>     
> 8.  `public synchronized void run() {`
>     
> 9.  `while(true){`
>     
> 10.  `synchronized ("锁") {`
>     
> 11.  `if(count>0){`
>     
> 12.  `System.out.println(Thread.currentThread().getName()+"取走了1000块,还剩余"+(count-1000)+"元");`
>     
> 13.  `count= count - 1000;`
>     
> 14.  `}else{`
>     
> 15.  `System.out.println("取光了...");`
>     
> 16.  `break;`
>     
> 17.  `}`
>     
> 18.  `}`
>     
> 19.  `}`
>     
> 20.  `}`
>     
> 
> 22.  `public class Demo1 {`
>     
> 
> 24.  `public static void main(String[] args) {`
>     
> 25.  `//创建两个线程对象`
>     
> 26.  `BankThread thread1 = new BankThread("老公");`
>     
> 27.  `BankThread thread2 = new BankThread("老婆");`
>     
> 28.  `//调用start方法开启线程取钱`
>     
> 29.  `thread1.start();`
>     
> 30.  `thread2.start();`
>     
> 31.  `}`
>     
> 
> 33.  `}`
>     

推荐使用：同步代码块

    原因：

        1.同步代码块的锁对象可以由我们自由指定，方便控制；

        2.同步代码块可以方便的控制需要被同步代码的范围，同步函数必须同步函数的所有代码。

方式三：lock

**一、为什么出现lock**
---------------

　　synchronized修饰的代码块，当一个线程获取了对应的锁，并执行该代码块时，其他线程便只能一直等待，等待获取锁的线程释放锁，如果没有释放则需要无限的等待下去。获取锁的线程释放锁只会有两种情况：

　　1、获取锁的线程执行完了该代码块，然后线程释放对锁的占有。

　　2、线程执行发生异常，此时JVM会让线程自动释放锁。

Lock与synchronized对比：

　　1、Lock不是Java语言内置的，synchronized是Java语言的关键字，因此是内置特性。Lock是一个类，通过这个类可以实现同步访问。

　　2、synchronized不需要手动释放锁，当synchronized方法或者synchronized代码块执行完之后，系统会自动让线程释放对锁的占用；而Lock则必须要用户去手动释放锁，如果没有主动释放锁，就有可能导致出现死锁现象。

二、java.util.concurrent.locks包中常用的类和接口。
--------------------------------------

> public interface Lock {
>     //用来获取锁。如果锁已被其他线程获取，则进行等待。
>     void lock();
>    // 当通过这个方法去获取锁时，如果线程正在等待获取锁，则这个线程能够响应中断，即中断线程的等待状态
>     void lockInterruptibly() throws InterruptedException;
>     //它表示用来尝试获取锁，如果获取成功，则返回true，如果获取失败（即锁已被其他线程获取），则返回false
>     boolean tryLock();
>     //与tryLock()方法是类似的，只不过区别在于这个方法在拿不到锁时会等待一定的时间，在时间期限之内如果还拿不到锁，就返回false。如果如果一开始拿到锁或者在等待期间内拿到了锁，则返回true。
>     boolean tryLock(long time, TimeUnit unit) throws InterruptedException;
>     //释放锁
>     void unlock();
>     Condition newCondition();
> }

![复制代码](https://common.cnblogs.com/images/copycode.gif)

**1、Lock与unlock**  
　　Lock用于获取锁，但它不会主动释放锁所以需要与unlock()配合使用。一般在使用Lock时必须在try{}catch{}块中进行，并且将释放锁的操作放在finally块中进行，以保证锁一定被被释放，防止死锁的发生。

![复制代码](https://common.cnblogs.com/images/copycode.gif)

> package com.jalja.base.threadTest;
> import java.util.concurrent.locks.ReentrantLock;
> public class LockTest implements Runnable{
>     public static ReentrantLock lock=new ReentrantLock();
>     public static int c=0;
>     public void run() {
>         for(int i=0;i<1000;i++){
>             lock.lock();//获取锁
>             try {
>                 System.out.println(Thread.currentThread().getName()+"获得锁");
>                 System.out.println(Thread.currentThread().getName()+"====>"+c);
>                 c++;
>             } catch (Exception e) {
>                 e.printStackTrace();
>             }finally{
>                 System.out.println(Thread.currentThread().getName()+"释放锁");
>                 lock.unlock();//释放锁
>             }
>         }
>     }
>     public static void main(String\[\] args) {
>         LockTest lt=new LockTest();
>         Thread thread1=new Thread(lt);
>         Thread thread2=new Thread(lt);
>         thread1.start();
>         thread2.start();
>         try {
>             thread1.join();
>             thread2.join();
>         } catch (InterruptedException e) {
>             e.printStackTrace();
>         }
>         System.out.println(c);
>     }
> }

注意：同一个线程可以连续获得同一把锁，但也必须释放相同次数的锁。允许下面的写法

>     　　　　  lock.lock();//获取锁
>             lock.lock();
>             lock.lock();
>             try {
>                 System.out.println(Thread.currentThread().getName()+"获得锁");
>                 System.out.println(Thread.currentThread().getName()+"====>"+c);
>                 c++;
>             } catch (Exception e) {
>                 e.printStackTrace();
>             }finally{
>                 System.out.println(Thread.currentThread().getName()+"释放锁");
>                 lock.unlock();//释放锁
>                 lock.unlock();//释放锁
>                 lock.unlock();//释放锁
>             }

**2、获取锁等待时间tryLock(long time, TimeUnit unit)**  
　　如果你约朋友打篮球，约定时间到了你朋友还没有出现，你等1小时后还是没到，我想你肯定会扫兴的离去。对于线程来说也应该时这样的，因为通常我们是无法判断一个线程为什么会无法获得锁，但我们可以给该线程一个获取锁的时间限制，如果到时间还没有获取到锁，则放弃获取锁。

> package com.jalja.base.threadTest;
> 
> import java.util.concurrent.TimeUnit;
> import java.util.concurrent.locks.ReentrantLock;
> 
> public class TryLockTest implements Runnable{
>     public static ReentrantLock lock=new ReentrantLock();
>     private static int m=0;
>     public void run() {
>         try {
>             if(lock.tryLock(1, TimeUnit.SECONDS)){//设置获取锁的等待时长1秒
>                 System.out.println(Thread.currentThread().getName()+"获得锁");
>                 m++;
>                 //Thread.sleep(2000);//设置休眠2秒
>             }else{
>                 System.out.println(Thread.currentThread().getName()+"未获得锁");
>             }
>         } catch (Exception e) {
>             e.printStackTrace();
>         }finally{
>             if(lock.isHeldByCurrentThread()){
>                 lock.unlock();
>             }
>         }
>     }
>     public static void main(String\[\] args) {
>         TryLockTest thread1=new TryLockTest();
>         TryLockTest thread2=new TryLockTest();
>         Thread th1=new Thread(thread1);
>         Thread th2=new Thread(thread2);
>         th1.start();
>         th2.start();
>         try {
>             //让main线程等待th1、th2线程执行完毕后，再继续执行
>             th1.join();
>             th2.join();
>         } catch (InterruptedException e) {
>             e.printStackTrace();
>         }
>         System.out.println(m);
>     }
> }

执行结果：

Thread-0获得锁
Thread-1获得锁
2

　　该代码就是让线程在锁请求中，最多等待1秒，如果超过一秒没有获得锁就返回false，如果获得了锁就返回true，根据执行结果可以看出Thread-1线程在1秒内获得了锁。

我们开启注释 //Thread.sleep(2000);就会发现Thread-1或Thread-0一定会有一个是未获得锁，这是因为占用锁的线程时间是2秒，而等待锁的线程等待时间是1秒，所以在1秒后的瞬间它就放弃了请求锁操作。

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()