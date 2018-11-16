title: springmvc前台得不到modleAndView的传来的参数
author: Leesin.Dong
tags:
  - springmvc
categories:
  - java
  - springmvc
date: 2018-11-11 22:13:00
---
技术在线工具登录 开放注册
在线工具
搜索其实很简单
运行代码时间戳icon
55
2019
排行榜
所有
开发类
站长类
极客类
其它
HR
码农文库
奇淫巧技
软件推荐
网址导航
反馈

版权声明：本文为作者原创，转载请注明出处，联系qq：32248827 https://blog.csdn.net/dataiyangu/article/details/80395992

又到了一天中写坑的时候了，写一个Springmvc的小的demo用的maven 好多坑，比如：

springmvc前台得不到modleAndView的传来的参数

解决：网上有的说是maven自动创建的web.xml是有问题的2.3不支持

应该改成：

web.xml v2.5

![复制代码](http://common.cnblogs.com/images/copycode.gif)

     1 <?xml version="1.0" encoding="UTF-8"?>   2     3 <web-app xmlns="http://java.sun.com/xml/ns/javaee"   4     5 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"   6     7 xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd"   8     9 version="2.5">  10    11 </web-app>

![复制代码](http://common.cnblogs.com/images/copycode.gif)

或 web.xml v3.0

![复制代码](http://common.cnblogs.com/images/copycode.gif)

    1 <?xml version="1.0" encoding="UTF-8"?>  2    3 <web-app  4         version="3.0"  5         xmlns="http://java.sun.com/xml/ns/javaee"  6         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  7         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd">  8    9 </web-app>

![复制代码](http://common.cnblogs.com/images/copycode.gif)

  
 不同的头信息，代表不同的servlet版本和tomcat版本

Servlet Spec

JSP Spec

EL Spec

WebSocket Spec

JASPIC Spec

Apache Tomcat version

Actual release revision

Supported Java Versions

4.0

TBD (2.4?)

TBD (3.1?)

TBD (1.2?)

1.1

9.0.x

9.0.0.M9 (alpha)

8 and later

3.1

2.3

3.0

1.1

1.1

8.5.x

8.5.4

7 and later

3.1

2.3

3.0

1.1

N/A

8.0.x (superseded)

8.0.35 (superseded)

7 and later

3.0

2.2

2.2

1.1

N/A

7.0.x

7.0.70

6 and later  
(7 and later for WebSocket)

2.5

2.1

2.1

N/A

N/A

6.0.x

6.0.45

5 and later

2.4

2.0

N/A

N/A

N/A

5.5.x (archived)

5.5.36 (archived)

1.4 and later

2.3

1.2

N/A

N/A

N/A

4.1.x (archived)

4.1.40 (archived)

1.3 and later

2.2

1.1

N/A

N/A

N/A

3.3.x (archived)

3.3.2 (archived)

1.1 and later

。

可是我犯的错误不是这个，我的是因为jsp没有引入jstl，最后早pom.xml中引入jar包就行了。

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()
×

😉 阿里云幸运券，戳我领取！



https://tool.lu/markdown/
  
据说喜欢分享的,后来都成了大神

251个赞
xiaozi  
码农文库
阿里云双11拼团
阿里云幸运券
七牛云
vultr
码农文库
阿里云双11拼团
两个人在一起多久并不重要，重要的是你有没有在这个人心里待过。有些人哪怕在一起一天，却在心里待了一辈子；有些人即使在一起一辈子，却没有在心里待过一天。
联系我们 - 工具首页 - 关于我们 
Copyright © 2011-2018 iteam. All Rights Reserved. Current version is 2.44.6. 
浙ICP备14020137号 $访客城市分布$

