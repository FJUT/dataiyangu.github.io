title: http8种请求方法详解
author: Leesin.Dong
tags:
  - interview
  - 网络
categories:
  - java
  - servlet
date: 2018-11-07 22:31:00
---
本文为转载，请大家尊重版权，

原文：[https://www.cnblogs.com/foodoir/p/5911099.html](https://www.cnblogs.com/foodoir/p/5911099.html)

[https://blog.csdn.net/resilient/article/details/52585724](https://blog.csdn.net/resilient/article/details/52585724)

请求方法：指定了客户端想对指定的资源/服务器作何种操作  
 下面我们介绍HTTP/1.1中可用的请求方法：

  
**【GET：获取资源】**  
     GET方法用来请求已被URI识别的资源。指定的资源经服务器端解析后返回响应内容（也就是说，如果请求的资源是文本，那就保持原样返回；如果是CGI\[通用网关接口\]那样的程序，则返回经过执行后的输出结果）。  
     最常用于向服务器查询某些信息。必要时，可以将查询字符串参数追加到URL末尾，以便将信息发送给服务器。  
     使用GET请求时经常会发生的一个错误，就是查询字符串的格式有问题。查询字符串中每个参数的名称和值都必须使用encodeURLComponent()进行编码，然后才能放到URL的末尾；而且所有的名-值对都必须由（&）分离，如下面的例子：  
         xhr.open("get","01.php?name=foodoir&age=21",true);  
     下面这个函数可以辅助现有URL的末尾添加查询字符串参数：

         function addURLParam(url,name,value){        url += (url.indexOf("?") == -1 ? "?" : "&");        url += encodeURIComponent(name) + "=" + encodeURIComponent(value);        return url;    }

    这个addURLParam函数接受三个参数：要添加参数的URL、参数的名称和参数的值。  
    下面是使用这个函数来构建URL的示例

![复制代码](https://common.cnblogs.com/images/copycode.gif)

        var url = "example.php";    //添加参数    url = addURLParam(url,"name","foodoir");    url = addURLParam(url,"age","21");    //初始化请求    xhr.open("get",url,false);

![复制代码](https://common.cnblogs.com/images/copycode.gif)

      
**【POST：传输实体文本】**  
    POST方法用来传输实体的主体。  
    虽然用GET方法也可以传输实体的主体，但一般不用GET方法进行传输，而是用POST方法；虽然GET方法和POST方法很相似，但是POST的主要目的并不是获取响应的主体内容。  
    POST请求的主体可以包含非常多的数据，而且格式不限。下面举一个例子：  
         xhr.open("post","01.php",true);  
    发送POST请求的第二步就是向send方法中传入某些数据，由于XHR最初的设计是为了处理XML，因此也可以在此处理XML DOM文档，传入的文档经过序列化之后将作为请求主体被提交到服务器。  
    默认情况下，服务器对于POST请求和提交WEB表单的请求并不会一视同仁，我们来看下面一段代码：

![复制代码](https://common.cnblogs.com/images/copycode.gif)

    function(){    var xhr = CreateXHR();    xhr.onreadystatechange = function(){        if(xhr.readyState == 4){//检测XHR的readyState属性            if((xhr.status >= 200 && xhr.status <= 300) || xhr.status == 304){                alert(xhr.responseText);            }else{                alert("Request was unsuccessful:" + xhr.status);            }        }    };        xhr.open("post","post.php",true);    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");    var form = document.getElementById("ID");    xhr.send(serialize(form));}

![复制代码](https://common.cnblogs.com/images/copycode.gif)

    我们可以模仿XHR表单提交：首先将Content-Type头部信息设置为application/x-www-form-urlencoded，也就是表单提交时的类型，其次是以适当的格式创建一个字符串（POST数据格式与查询字符串的格式相同），如果需要将页面中表单的数据进行序列化，然后再通过XHR函数发送到服务器，那么可以使用序列化函数serialize()，（表单序列化，这里不作具体介绍）  
  
**在这里我们来比较GET方法和POST方法本质上的区别：**

　　1、GET方法用于信息获取，它是安全的（安全：指非修改信息，如数据库方面的信息），而POST方法是用于修改服务器上资源的请求；

　　2、GET请求的数据会附在URL之后，而POST方法提交的数据则放置在HTTP报文实体的主体里，所以POST方法的安全性比GET方法要高；

　　3、GET方法传输的数据量一般限制在2KB，其原因在于：GET是通过URL提交数据，而URL本身对于数据没有限制，但是不同的浏览器对于URL是有限制的，比如IE浏览器对于URL的限制为2KB，而Chrome，FireFox浏览器理论上对于URL是没有限制的，它真正的限制取决于操作系统本身；POST方法对于数据大小是无限制的，真正影响到数据大小的是服务器处理程序的能力。  
      
**【HEAD：获得报文首部】**  
    HEAD方法和GET方法一样，知识不返回豹纹的主体部分，用于确认URI的有效性及资源更新的日期时间等。  
    具体来说：1、判断类型； 2、查看响应中的状态码，看对象是否存在（响应：请求执行成功了，但无数据返回）； 3、测试资源是否被修改过  
    HEAD方法和GET方法的区别： GET方法有实体，HEAD方法无实体。  
  
**【PUT：传输文件】**  
    PUT方法用来传输文件，就像FTP协议的文件上传一样，要求在请求报文的主体中包含文件内容，然后保存在请求URI指定的位置。但是HTTP/1.1的PUT方法自身不带验证机制，任何人都可以上传文件，存在安全问题，故一般不用。  
  
**【DELETE：删除文件】**  
    指明客户端想让服务器删除某个资源，与PUT方法相反，按URI删除指定资源  
      
**【OPTIONS：询问支持的方法】**  
    OPTIONS方法用来查询针对请求URI指定资源支持的方法（客户端询问服务器可以提交哪些请求方法）  
      
**【TRACE：追踪路径】**  
    客户端可以对请求消息的传输路径进行追踪，TRACE方法是让Web服务器端将之前的请求通信还给客户端的方法

*   TRACE方法被用于激发一个远程的，应用层的请求消息回路（译注：TRACE方法让客户端测试到服务器的网络通路，回路的意思如发送一个请返回一个响应，  
*   这就是一个请求响应回路）。  

*   最后的接收者也许是源服务器，也许是接收到包含Max-Forwards头域值为0请求的代理或网关。TRACE请求不能包含一个实体。TRACE方法允许客户端去了  
*   解数据被请求链的另一端接收的情况，并且利用那些数据信息去测试或诊断。Via头域值有特殊的用途，因为它可以作为请求链的跟踪信息。  
*   利用Max-Forwards头域允许客户端限制请求链的长度，这是非常有用的，因为可以利用此去测试代理链在无限循环里转发消息。如果请求是有效的，响应应  
*   该在实体主体里包含整个请求消息，并且响应应该包含一个Content-Type头域值为”message/http”的头域。此方法的响应不能被缓存。 

      
**【CONNECT：要求用隧道协议连接代理】**  
    CONNECT方法要求在与代理服务器通信时建立隧道，实现用隧道协议进行TCP通信。主要使用SSL（安全套接层）和TLS（传输层安全）协议把通信内容加密后经网络隧道传输。

1.  把请求连接转换到透明的TCP/IP通道。  

一般来说，提交表单数据都用POST方法。从如下列表中可以看到GET和POST的区别：

![](https://img-blog.csdn.net/20140123141936250?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaXJvbnJhYmJpdA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()