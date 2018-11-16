title: 关于java中BufferedReader的read()及readLine()方法的使用心得
author: Leesin.Dong
tags:
  - Java基础
categories:
  - java
  - java基础
date: 2018-11-12 11:31:00
---
原文地址：[https://www.cnblogs.com/dongrilaoxiao/p/6688107.html](https://www.cnblogs.com/dongrilaoxiao/p/6688107.html)

BufferedReader的readLine()方法是阻塞式的, 如果到达流末尾, 就返回null, 但如果client的socket末经关闭就销毁, 则会产生IO异常. 正常的方法就是使用socket.close()关闭不需要的socket.

从一个有若干行的文件中依次读取各行，处理后输出，如果用以下方法，则会出现除第一行外行首字符丢失现象

String str  = null;  
br=new BufferedReader(new FileReader(fileName));  
do{  
  str = buf.readLine());   
}while(br.read()!=-1);  
以下用法会使每行都少首字符  
while(br.read() != -1){  
       str = br.readLine();       
 }  
原因就在于br.read() != -1 这判断条件上。 因为在执行这个条件的时候其实它已经读取了一个字符了，然而在这里并没有对读取出来的这个字符做处理，所以会出现少一个字符,如果你这里写的是while(br.readLine()！=null)会出现隔一行少一行!  
  
建议使用以下方法  
String str = null;  
      while((str = br.readLine()) != null){  
      //System.out.println(str);//此时str就保存了一行字符串  
}

这样应该就可以无字符丢失地得到一行了

虽然写IO方面的程序不多，但BufferedReader/BufferedInputStream倒是用过好几次的，原因是：

*   它有一个很特别的方法：readLine()，使用起来特别方便，每次读回来的都是一行，省了很多手动拼接buffer的琐碎；
*   它比较高效，相对于一个字符/字节地读取、转换、返回来说，它有一个缓冲区，读满缓冲区才返回；一般情况下，都建议使用它们把其它Reader/InputStream包起来，使得读取数据更高效。
*   对于文件来说，经常遇到一行一行的，特别相符情景。

这次是在蓝牙开发时，使用两个蓝牙互相传数据(即一个发一个收)，bluecove这个开源组件已经把数据读取都封装成InputStream了，也就相当于平时的IO读取了，很自然就使用起readLine()来了。

发数据：

**\[java\]** view plaincopy

1.  BufferedWriter output = new BufferedWriter(new OutputStreamWriter(conn.openOutputStream()));   
2.  int i = 1;  
3.  String message = "message " + i;  
4.  while(isRunning) {  
5.      output.write(message+"/n");   
6.      i++;  
7.  }  

读数据：

**\[java\]** [view plain](http://blog.csdn.net/swingline/article/details/5357581#)[copy](http://blog.csdn.net/swingline/article/details/5357581#)

1.  BufferedReader input = new BufferedReader(new  InputStreamReader(m_conn.openInputStream()));  
2.  String message = "";  
3.  String line = null;  
4.  while((line = m_input.readLine()) != null) {  
5.      message += line;  
6.  }  
7.  System.out.println(message);  

上面是代码的节选，使用这段代码会发现写数据时每次都成功，而读数据侧却一直没有数据输出(除非把流关掉)。经过折腾，原来这里面有几个大问题需要理解：

*   误以为readLine()是读取到没有数据时就返回null(因为其它read方法当读到没有数据时返回-1)，而实际上readLine()是一个阻塞函数，当没有数据读取时，就一直会阻塞在那，而不是返回null；因为readLine()阻塞后，System.out.println(message)这句根本就不会执行到，所以在接收端就不会有东西输出。要想执行到System.out.println(message)，一个办法是发送完数据后就关掉流，这样readLine()结束阻塞状态，而能够得到正确的结果，但显然不能传一行就关一次数据流；另外一个办法是把System.out.println(message)放到while循环体内就可以。
*   readLine()只有在数据流发生异常或者另一端被close()掉时，才会返回null值。
*   如果不指定buffer大小，则readLine()使用的buffer有8192个字符。在达到buffer大小之前，只有遇到"/r"、"/n"、"/r/n"才会返回。

readLine()的实质(下面是从JDK源码摘出来的)：

**\[java\]** view plaincopy

1.  String readLine(boolean ignoreLF) throws IOException {  
2.      StringBuffer s = null;  
3.      int startChar;  
4.          synchronized (lock) {  
5.              ensureOpen();  
6.          boolean omitLF = ignoreLF || skipLF;  
7.          bufferLoop:  
8.          for (;;) {  
9.          if (nextChar >= nChars)  
10.              fill(); //在此读数据  
11.          if (nextChar >= nChars) { /* EOF */  
12.              if (s != null && s.length() > 0)  
13.              return s.toString();  
14.              else  
15.              return null;  
16.          }  
17.        ......//其它  
18.  }  

20.  private void fill() throws IOException {  
21.      ..../其它  
22.      int n;  
23.      do {  
24.          n = in.read(cb, dst, cb.length - dst); //实质  
25.      } while (n == 0);  
26.      if (n > 0) {  
27.          nChars = dst + n;  
28.          nextChar = dst;  
29.      }  
30.      }  

从上面看出，readLine()是调用了read(char\[\] cbuf, int off, int len) 来读取数据，后面再根据"/r"或"/n"来进行数据处理。

在Java[ ](http://lib.csdn.net/base/java)I/O书上也说了：

public String readLine() throws IOException  
This method returns a string that contains a line of text from a text file. /r, /n, and /r/n are assumed to be line breaks and are not included in the returned string. This method is often used when reading user input from System.in, since most platforms only send the user's input to the running program after the user has typed a full line (that is, hit the Return key).  
readLine() has the same problem with line ends that DataInputStream's readLine() method has; that is, **the potential to hang on a lone carriage return that ends the stream** . This problem is especially acute on networked connections, where readLine() should never be used.

小结，使用readLine()一定要注意：

1.  读入的数据要注意有/r或/n或/r/n
2.  没有数据时会阻塞，在数据流异常或断开时才会返回null
3.  使用socket之类的数据流时，要避免使用readLine()，以免为了等待一个换行/回车符而一直阻塞

以前学习的时候也没有太在意，在项目中使用到了才发现呵呵

1.读取一个txt文件,方法很多种我使用了字符流来读取（为了方便）

  FileReader fr = new FileReader("f:\\\TestJava.Java");  
   BufferedReader bf = new BufferedReader(fr);

//这里进行读取

int b;  
   while((b=bf.read())!=-1){  
    System.out.println(bf.readLine());  
   }

发现每行的第一个字符都没有显示出来，原因呢：b=bf.read())!=-1  每次都会先读取一个字节出来，所以后面的bf.readLine());  
读取的就是每行少一个字节

所以，应该使用

String valueString = null;  
   while ((valueString=bf.readLine())!=null){  
      
      
    System.out.println(valueString);  
   }

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()