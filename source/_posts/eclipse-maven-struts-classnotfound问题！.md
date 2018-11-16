title: eclipse+maven+struts classnotfound问题！
author: Leesin.Dong
tags:
  - eclipse
  - maven
  - struts
categories:
  - 编码辅助工具
  - eclipse
date: 2018-11-11 23:18:00
---
 关于昨天写的一个博客的后续：

关于maven的一个很大的坑-------maven配置struts2filter-class 总是报错classnotfound

      最近两天困扰了我很久的一个问题，在昨天的博客中也写到了，就是在maven的环境下配置简单的struts的问题，一开始反反复复的报错，classnotfound。。。。。。。。。烦了我很久什么办法也试了，反反复复的写了无数次的demo，还是不行，昨天的博客中写到准备一个一个导包到lib，但我毕竟不是勤快的人，今天上午到现在终于捣弄成功了！！！！！！！！！！！！！！！无比的开心！！！！！！！！！！！！！！！

    记录下来，以防以后犯错，减少不必要的时间！

    简单说一下，自己还是对tomcat了解的不够深刻：首先在mac中tomcat部署到libarary下解压版的直接解压就行。在eclipse中配置的时候，删掉原来的，重新配置server的时候会报错：cant save 之类的，去原来的workspace中删掉server文件（每次会新建一个server文件），至此，还是不行，startup但是localhost：8080不能访问，双击server如下界面



![upload successful](/images/my_blog_206.png)
 

serverlocation

选择第二个

他们仨个的不同

 

1. Use workspace metadata (does not modify Tomcat installation);

    2. Use Tomcat installation (take control of Tomcat Installation);

    3. Use Custom location (does not modify Tomcat installation);

    第一个选项表示使用当前workspace的metadata路径，它一般会将输出

第二个人后在deploy path中改为webapps   原来默认是wtswebapps什么的

这样就能够运行了！

重新部署了tomcat发现能够运行了，并不是我昨天说的，没有到lib目录下，启动tomcat后在部署的文件里的lib下缺失有相应的jar包只不过可能少了两个 junit和servlet-api 。

综上所述，我是因为tomcat出了问题，重新部署才解决，具体什么原因，现在也没有想到

 

对了有时候检查lib下并没有jar包的话：

点击项目进入properties 

 
![upload successful](/images/my_blog_207.png)

添加如图即可
