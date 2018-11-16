title: 网络七层协议、TCP/IP、UDP、HTTP、Socket 个人理解
author: Leesin.Dong
tags:
  - interview
  - 网络
categories:
  - 基础亦是进阶
  - 网络
date: 2018-11-09 00:21:00
---
### 谈到任何联网的协议，我们就必须要谈到OSI（网络七层协议模型），必须遵循这个协议模型，我们的手机和电脑才可以联网通信，首先来看一下OSI

OSI

OSI是一个[开放性](http://baike.baidu.com/view/1640324.htm)的通信系统互连参考模型，他是一个定义得非常好的协议规范。OSI模型有7层结构，每层都可以有几个子层。

应用层

示例：TELNET，HTTP，FTP，NFS，SMTP等。

表示层

示例：加密，ASCII等。

会话层

示例：RPC，SQL等。

传输层

示例：TCP，UDP，SPX。

网络层

示例：IP，IPX等。

数据链路层

示例：ATM，FDDI等。

物理层

示例：Rj45，802.3等。

**简单了解OSI之后我们来看一下我们手机与电脑通信，所能够使用的两种数据通信，一种是HTTP请求，一种是Socket通信，HTTP是属于短连接，适合新闻，订票信息等客户端发起请求，每一次请求结束，自动断开连接。而Socket是属于长连接，适合游戏，聊天等实时数据。**

**手机能够联网都是需要基于OSI协议模型，同时手机底层实现了TCP/IP协议。下面简单介绍一下TCP/IP协议**

TCP/IP

建立起一个TCP连接需要经过“三次握手”：

第一次握手：客户端发送syn包(syn=j)到服务器，并进入SYN_SEND状态，等待服务器确认；

第二次握手：服务器收到syn包，必须确认客户的SYN（ack=j+1），同时自己也发送一个SYN包（syn=k），即SYN+ACK包，此时服务器进入SYN_RECV状态；

第三次握手：客户端收到服务器的SYN＋ACK包，向服务器发送确认包ACK(ack=k+1)，此包发送完毕，客户端和服务器进入ESTABLISHED状态，完成三次握手。

握 手过程中传送的包里不包含数据，三次握手完毕后，客户端与服务器才正式开始传送数据。理想状态下，TCP连接一旦建立，在通信双方中的任何一方主动关闭连 接之前，TCP 连接都将被一直保持下去。断开连接时服务器和客户端均可以主动发起断开TCP连接的请求，断开过程需要经过“四次握手”（过程就不细写 了，就是服务器和客户端交互，最终确定断开）

**同时Socket可以支持不同的传输层协议（UDP），那我们平时为什么不使用UDP呢，我们现在来看一下UDP与TCP的区别**

TCP UDP

是否连接 面向连接 面向非连接

传输可靠性 可靠 不可靠

应用场合 传输大量数据 少量数据

速度 慢 快

**顺便在片尾纠正一下我对于这些协议的理解。**

1.我一直以为Http和Tcp是两种不同的，但是地位对等的协议，虽然知道TCP是传输层，而http是应用层今天学习了下，知道了 http是要基于TCP连接基础上的，简单的说，TCP就是单纯建立连接，不涉及任何我们需要请求的实际数据，简单的传输。http是用来收发数据，即实际应用上来的。

2.TCP是底层通讯协议，定义的是数据传输和连接方式的规范HTTP是应用层协议，定义的是传输数据的内容的规范HTTP协议中的数据是利用TCP协议传输的，所以支持HTTP也就一定支持TCP

3.HTTP支持的是www服务而TCP/IP是协议它是Internet国际互联网络的基础。TCP/IP是网络中使用的基本的通信协议。TCP/IP实际上是一组协议，它包括上百个各种功能的协议，如：远程登录、文件传输和电子邮件等，而TCP协议和IP协议是保证数据完整传输的两个基本的重要协议。通常说TCP/IP是Internet协议族，而不单单是TCP和IP。

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()