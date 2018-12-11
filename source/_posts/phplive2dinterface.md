title: 将github的php接口，放到服务器上供访问。（为了我的看板娘功能）
author: Leesin.Dong
top: 9999995
tags:
  - hexo
  - blog
categories:
  - 自建博客
  - hexo
date: 2018-11-02 11:30:00
---
![](/images/15440657994566.jpg)

>本文是为了完善我的看板娘功能，因为这里涉及到自己服务器的接口引用问题，所以单独拿出来作为一篇文章～

<!--more-->
版权声明：本文为作者原创，转载请注明出处，联系qq：32248827 https://blog.csdn.net/dataiyangu/article/details/83042299

看板娘的博客：[https://blog.csdn.net/dataiyangu/article/details/83021854](https://blog.csdn.net/dataiyangu/article/details/83021854)

所有的hexo本人的教程：[https://blog.csdn.net/dataiyangu/article/details/82827956](https://blog.csdn.net/dataiyangu/article/details/82827956)

本人博客的效果：mmmmmm.me

背景：从网上找到一个看板娘js的接口，在github上有源码，怕有一天服务关闭了，不是很悲催，想自己搭建api环境，里面有看板娘的模版，只能通过爆漏接口的方式访问。

方法：

1.安装网址（一键安装）：[https://blog.csdn.net/u014472643/article/details/79150781](https://blog.csdn.net/u014472643/article/details/79150781)

在服务器上安装php+nginx/Apache      

配置网站的信息（nginx），指定自己服务器的ip地址（如果域名已经用过了，配置二级域名）

2.进入网站的目录   （在上面配置nginx中自己详细配置），git clone   或者scp 到这里。

3.修改代码中的api接口的地址为自己的地址，进行访问。

4.发现不行：

> (index):1 Failed to load http://www.mmmmmm.me/live2d_api/get/?id=1-53: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://mmmmmm.me' is therefore not allowed access.

是因为跨域问题

解决：

进入nginx,

> vim /usr/local/nginx/conf/enable-php.conf（只适用于php服务，静态文件不属于php服务，还可能加载不出来，我这里有很多静态图片需要加载，所以推荐下面这种）

或者

> vim /usr/local/nginx/conf/vhost/你的网址.conf（推荐）

加入：

> add_header Access-Control-Allow-Origin '*' ;（加载server中的外面，并不是在location中） .  最终方法

例如

    server{ add ...... location /{       (这种是错误的)add ......} }

关键点：

1.上面的add  网上很多说加载location中，但是我这里是在php服务中，php中还有一个location，这就关乎到php的locatino访问顺序和覆盖的问题：所以就会出现如果在php location中匹配的话，会覆盖掉server中的，所以即使在server 中配置了location还是不会成功，但是如果在php中的location中匹配的话还是不行的，静态文件不会加载，我这里有很多图片需要加载，**所以只能在server的外面加**。其他的可以在location中加，因为我这里涉及到php，所以特殊。

具体网址：[https://www.cnblogs.com/lidabo/p/4169396.html](https://www.cnblogs.com/lidabo/p/4169396.html)

1、 location 的匹配顺序是“先匹配正则，再匹配普通”。

矫正： location 的匹配顺序其实是“先匹配普通，再匹配正则”。我这么说，大家一定会反驳我，因为按“先匹配普通，再匹配正则”解释不了大家平时习惯的按“先匹配正则，再匹配普通”的实践经验。这里我只能暂时解释下，造成这种误解的原因是：正则匹配会覆盖普通匹配（实际的规则，比这复杂，后面会详细解释）。

2、 location 的执行逻辑跟 location 的编辑顺序无关。

矫正：这句话不全对，“普通 location ”的匹配规则是“最大前缀”，因此“普通 location ”的确与 location 编辑顺序无关；但是“正则 location ”的匹配规则是“顺序匹配，且只要匹配到第一个就停止后面的匹配”；“普通location ”与“正则 location ”之间的匹配顺序是？先匹配普通 location ，再“考虑”匹配正则 location 。注意这里的“考虑”是“可能”的意思，也就是说匹配完“普通 location ”后，有的时候需要继续匹配“正则 location ”，有的时候则不需要继续匹配“正则 location ”。两种情况下，不需要继续匹配正则 location ：（ 1 ）当普通 location 前面指定了“ ^~ ”，特别告诉 Nginx 本条普通 location 一旦匹配上，则不需要继续正则匹配；（ 2 ）当普通location 恰好严格匹配上，不是最大前缀匹配，则不再继续匹配正则。

总结一句话：  “正则 location 匹配让步普通 location 的严格精确匹配结果；但覆盖普通 location 的最大前缀匹配结果”

2.不能在nginx.conf中修改，因为nginx.conf会有个默认的server，他并不是我们配置的网站的php       server

