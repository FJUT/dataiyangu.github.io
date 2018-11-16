title: 简单理解三次握手和四次挥手
author: Leesin.Dong
tags:
  - interview
  - 网络
categories:
  - 基础亦是进阶
  - 网络
date: 2018-11-09 00:18:00
---
注：三次握手和四次挥手本身并不复杂，但却可以从很多角度理解这两个过程，本文仅取一个视点解读，如有其它看法欢迎留言交流。

三次握手与四次挥手分别对应TCP连接建立过程与断开过程，先上TCP报文格式：


![upload successful](/images/my_blog_107.png)

三次握手过程：


![upload successful](/images/my_blog_108.png)
问题1： 为什么要三次握手？

答：三次握手的目的是建立可靠的通信信道，说到通讯，简单来说就是数据的发送与接收，而三次握手最主要的目的就是双方确认自己与对方的发送与接收机能正常。

        第一次握手：Client什么都不能确认；Server确认了对方发送正常

        第二次握手：Client确认了：自己发送、接收正常，对方发送、接收正常；Server确认了：自己接收正常，对方发送正常

        第三次握手：Client确认了：自己发送、接收正常，对方发送、接收正常；Server确认了：自己发送、接收正常，对方发送接收正常

所以三次握手就能确认双发收发功能都正常，缺一不可。

问题2：为什么要发送特定的数据包，随便发不行吗？

答：三次握手的另外一个目的就是确认双方都支持TCP，告知对方用TCP传输。

        第一次握手：Server 猜测Client可能要建立TCP请求，但不确定，因为也可能是Client乱发了一个数据包给自己

        第二次握手：通过ack=J+1，Client知道Server是支持TCP的，且理解了自己要建立TCP连接的意图

        第三次握手：通过ack=K+1，Server知道Client是支持TCP的，且确实是要建立TCP连接

问题3：上图中的SYN和ACK是什么？

答：SYN是标志位，SYN=1表示请求连接；

        ACK其实就是ack后面加上的那个数，真正发送的时候不单独发ACK，只发ack，下面四次挥手的图同理

四次挥手：


![upload successful](/images/my_blog_109.png)

问题1： 为什么要四次挥手？

答：根本原因是，一方发送FIN只表示自己发完了所有要发的数据，但还允许对方继续把没发完的数据发过来。

        举个例子：A和B打电话，通话即将结束后，A说“我没啥要说的了”，B回答“我知道了”，但是B可能还会有要说的话，A不能要求B跟着自己的节奏结束通话，于是B可能又巴拉巴拉说了一通，最后B说“我说完了”，A回答“知道了”，这样通话才算结束。

问题2：为什么双方要发送这样的数据包？

答：和握手的情况类似，只是为了让对方知晓自己理解了对方的意图。

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()