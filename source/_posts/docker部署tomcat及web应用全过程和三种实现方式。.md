title: docker部署tomcat及web应用全过程和三种实现方式。
author: Leesin.Dong
tags:
  - docker
categories:
  - 基础亦是进阶
  - docker
  - ''
  - ''
date: 2018-11-12 00:05:00
---
没耐心的直接看8.3，官方推荐的方式。

一、在线下载docker
============

> yum install -y epel-release yum install docker-io # 安装
> 
> docker chkconfig docker on # 加入开机启动
> 
> service docker start # 启动docker服务

二、docker安装Tomcat容器
------------------

2.1.查找服务器的tomcat信息
------------------

> \# docker search tomcat

https://img-blog.csdn.net/20171130101159290?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMzIzNTEyMjc=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast
![upload successful](/images/my_blog_225.png) 

2.2下载下来官方的镜像Starts最高的那个
-----------------------

> docker pull docker.io/tomcat

2.3 查看docker所有的镜像
-----------------

> docker images

https://img-blog.csdn.net/20171130101234033?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMzIzNTEyMjc=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast
![upload successful](/images/my_blog_228.png)

2.4启动tomcat
-----------

> docker run -p 8081:8080 docker.io/tomcat # 若端口被占用，可以指定容器和主机的映射端口 前者是外围访问端口：后者是容器内部端口

https://img-blog.csdn.net/20171130101247308?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMzIzNTEyMjc=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast
![upload successful](/images/my_blog_226.png)

2.5启动后即可访问 192.168.138.132:8080
-------------------------------

https://img-blog.csdn.net/20171130101311092?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMzIzNTEyMjc=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast
![upload successful](/images/my_blog_227.png)

三、部署自己的web引用
============

> docker ps # 使用以下命令来查看正在运行的容器

https://img-blog.csdn.net/20171130101339835?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMzIzNTEyMjc=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast
![upload successful](/images/my_blog_229.png)

3.1.将自己的war包 上传到主机
------------------

https://img-blog.csdn.net/20171130101415028?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMzIzNTEyMjc=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast
![upload successful](/images/my_blog_230.png)
3.2.执行 查看容器comcat中的地址
---------------------

> docker exec -it 3cb492a27475 /bin/bash #中间那个是容器id（CONTAINER_ID）

exec是进入之前已经在运行的容器

https://img-blog.csdn.net/20171130101449086?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMzIzNTEyMjc=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast
![upload successful](/images/my_blog_231.png)

3.3把war包丢到宿主机 在丢到container里面丢到tomcat/webapps
--------------------------------------------

> docker cp NginxDemo.war 3cb492a27475 :/usr/local/tomcat/webapps

3.4.启动tomcat 或者重启 docker restart 【容器id】
---------------------------------------

> docker run -p 8081:8080 docker.io/tomcat

3.5查看已经启动镜像
-----------

> docker ps

https://img-blog.csdn.net/20171130101526716?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMzIzNTEyMjc=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast
![upload successful](/images/my_blog_232.png)
3.6执行 查看容器comcat中的项目
--------------------

> docker exec -it 3cb492a27475 /bin/bash #中间那个是容器id（CONTAINER_ID）
> 
> cd /webapps ls # 即可查看到我们的项目了

### 貌似这种copy方式，只能从容器中向主机copy，反过来是不行的

3.7 上述执行有个弊端就是 容器重启后项目就会不再了，下面是方式2启动 以挂载的方式启动
---------------------------------------------

> docker run -d -v /usr/docker_file/NginxDemo.war:/usr/local/tomcat/webapps/NginxDemo.war -p 8080:8080 docker.io/tomcat

3.8前两种方式建议在测试环境使用，毕竟要经常修改代码 ，方式3可以放到生产上使用。也是官网建议的方式
---------------------------------------------------

vi Dockerfile

### 注意：copy最好将主机的文件放在dockerfile的同级目录下面，放在其他地方可能找不到。

> ### from docker.io/tomcat:latest #你的 tomcat的镜像
> 
> MAINTAINER XXX@qq.com #作者
> 
> COPY NginxDemo.war /usr/local/tomcat/webapps #放置到tomcat的webapps目录下
> 
> ### 注意：copy  的第二个参数是docker的目标路径，如果/结尾就是当作目录，如果不是一这个结尾默认当作文件处理

https://img-blog.csdn.net/20171130101633222?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMzIzNTEyMjc=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast
![upload successful](/images/my_blog_233.png)
3.8.1生成新的镜像：
------------

> docker build -t nginx-demo:v1 .

https://img-blog.csdn.net/20171130101621713?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMzIzNTEyMjc=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast
![upload successful](/images/my_blog_234.png)
3.8.2 启动新的镜像
------------

> docker run -p 8080:8080 nginx-demo:v1

https://img-blog.csdn.net/20171130103522038?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMzIzNTEyMjc=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast
![upload successful](/images/my_blog_235.png)
其他
--

    # 基本信息查看 docker version # 查看docker的版本号，包括客户端、服务端、依赖的Go等 docker info  # 查看系统(docker)层面信息，包括管理的images, containers数等

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()