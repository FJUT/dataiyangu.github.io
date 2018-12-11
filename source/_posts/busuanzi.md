title: 不蒜子域名更改，导致博客访问人数失效。
author: Leesin.Dong
top: 9999996
tags:
  - hexo
  - blog
categories:
  - 自建博客
  - hexo
date: 2018-11-02 11:25:05
---
![](/images/15440658156542.jpg)

>接下来这段话是我从不蒜子的官网上面拷贝过来的，旨在告诉大家，不蒜子原来的域名过期了，并不是不能用了，修改域名即可，传播下去，告诉更多的人吧，最后感谢不蒜子。

<!--more-->
版权声明：本文为作者原创，转载请注明出处，联系qq：32248827 https://blog.csdn.net/dataiyangu/article/details/82967966

       接下来这段话是我从不蒜子的官网上面拷贝过来的，旨在告诉大家，不蒜子原来的域名过期了，并不是不能用了，修改域名即可，传播下去，告诉更多的人吧，最后感谢不蒜子。
=====================================================================================

因为hexo 的next主题中想集成不蒜子的话有两种方法，一种是按照官方的方法，一种是next主题已经集成了，只需要改配置文件中为true即可，第一种可以按照下面官方的信息做修改，第二种可以全局查找改字段

> grep dn-lbstatics.qbox.me  ./ -r

next主题在这里themes\\next\\layout\\_third-party\\analytics\\busuanzi-counter.swig~

总之两种方法集成的不蒜子都可以进行修改。

不蒜子
===


![upload successful](/images/my_blog_60.png)

    ！！！！2018年9月 - 重要提示 ！！！！大家好，因七牛强制过期原有的『dn-lbstatics.qbox.me』域名（预计2018年10月初），与客服沟通数次无果，即使我提出为此付费也不行，只能更换域名到『busuanzi.ibruce.info』！因我是最早的一批七牛用户，为七牛至少带来了数百个邀请用户，很痛心，很无奈！各位继续使用不蒜子提供的服务，只需把原有的：<script async src="//dn-lbstatics.qbox.me/busuanzi/2.3/busuanzi.pure.mini.js"></script>域名改一下即可：<script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>只需要修改该js域名，其他均未改变。若有疑问，可以加入不蒜子交流QQ群：`419260983`，对您带来的不便，非常抱歉！！！还是那句话，不蒜子不会中断服务！！！！

静态网站建站现在有很多快速的技术和平台，但静态是优点也有缺点，由于是静态的，一些动态的内容如评论、计数等等模块就需要借助外来平台，评论有[“多说”](http://duoshuo.com/)，计数有[“不蒜”](http://busuanzi.ibruce.info/)！**（多说即将关闭，不蒜子还活着涅，这是程序员对程序员的承诺。）**

> **[“不蒜子”](http://busuanzi.ibruce.info/)与百度统计谷歌分析等有区别：[“不蒜子”](http://busuanzi.ibruce.info/)可直接将访问次数显示在您在网页上（也可不显示）；对于已经上线一段时间的网站，[“不蒜子”](http://busuanzi.ibruce.info/)允许您初始化首次数据。。**

普通用户只需两步走：**一行脚本+一行标签**，搞定一切。追求极致的用户可以进行任意DIY。

一、安装脚本（必选）
==========

* * *

要使用不蒜子必须在页面中引入busuanzi.js，目前最新版如下。

    <script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>

> 不蒜子可以给任何类型的个人站点使用，如果你是用的hexo，打开**themes/你的主题/layout/_partial/footer.ejs**添加上述脚本即可，当然你也可以添加到 header 中。

二、安装标签（可选）
==========

* * *

只需要复制相应的html标签到你的网站要显示访问量的位置即可。您可以随意更改不蒜子标签为自己喜欢的显示效果，内容参考第三部分**扩展开发**。根据你要显示内容的不同，这分几种情况。

1、显示站点总访问量
----------

要显示站点总访问量，复制以下代码添加到你需要显示的位置。有两种算法可选：

算法a：pv的方式，单个用户连续点击n篇文章，记录n次访问量。

    <span id="busuanzi_container_site_pv">    本站总访问量<span id="busuanzi_value_site_pv"></span>次</span>

算法b：uv的方式，单个用户连续点击n篇文章，只记录1次访客数。

    <span id="busuanzi_container_site_uv">  本站访客数<span id="busuanzi_value_site_uv"></span>人次</span>

> 如果你是用的hexo，打开**themes/你的主题/layout/_partial/footer.ejs**添加即可。

**实例效果参考：**

*   [http://liam0205.me](http://liam0205.me/)
*   [http://gameknife.github.io](http://gameknife.github.io/)
*   [http://read.mobi](http://read.mobi/)
*   [http://pgqlife.info](http://pgqlife.info/)
*   [http://sdxy0506.github.io](http://sdxy0506.github.io/)
*   [http://www.gcrimson.com](http://www.gcrimson.com/)
*   [http://libk.net](http://libk.net/)
*   [http://ztyoung.me](http://ztyoung.me/)
*   [http://blog.itmyhome.com](http://blog.itmyhome.com/)

2、显示单页面访问量
----------

要显示每篇文章的访问量，复制以下代码添加到你需要显示的位置。

算法：pv的方式，单个用户点击1篇文章，本篇文章记录1次阅读量。

    <span id="busuanzi_container_page_pv">  本文总阅读量<span id="busuanzi_value_page_pv"></span>次</span>

> 代码中文字是可以修改的，只要保留id正确即可。

**实例效果参考：**

*   [http://dbarobin.com/2015/04/14/operation-and-maintenance-engineer-tips](http://dbarobin.com/2015/04/14/operation-and-maintenance-engineer-tips)
*   [http://blog.jamespan.me/2015/05/06/mvn-incremental-compilation](http://blog.jamespan.me/2015/05/06/mvn-incremental-compilation)
*   [http://cubernet.cn/blog/optimization-3](http://cubernet.cn/blog/optimization-3)

> 注意：不蒜子为保持极简，暂不支持在站点文章摘要列表中（如首页）逐个显示每篇文章的阅读次数，如果您非常需要这一功能，可以留言。根据需要程度再考虑开发相应的功能。

3、显示站点总访问量和单页面访问量
-----------------

你懂的吧，上面两种标签代码都安装。

**实例效果参考：**

*   [http://cubernet.cn/blog/swift-1](http://cubernet.cn/blog/swift-1)
*   [http://lvzejun.cn/2015/03/31/ubuntu-software](http://lvzejun.cn/2015/03/31/ubuntu-software)
*   [http://www.lvzejun.cn/2015/04/13/libvirt1md](http://www.lvzejun.cn/2015/04/13/libvirt1md)

4、只计数不显示
--------

只安装脚本代码，不安装标签代码。

> **至此，不蒜子已经可以正常运行，如果你还要自定义一些内容或有疑问，请继续阅读。**

附录：扩展开发（自定义）
============

* * *

不蒜子之所以称为极客的算子，正是因为不蒜子自身只提供**标签+数字**，至于显示的style和css动画效果，任你发挥。

*   **busuanzi\_value\_site_pv** 的作用是异步回填访问数，这个id一定要正确。
*   **busuanzi\_container\_site_pv**的作用是为防止计数服务访问出错或超时（3秒）的情况下，使整个标签自动隐藏显示，带来更好的体验。这个id可以省略。

因此，你也可以使用极简模式：

    本站总访问量<span id="busuanzi_value_site_pv"></span>次本站访客数<span id="busuanzi_value_site_uv"></span>人次本文总阅读量<span id="busuanzi_value_page_pv"></span>次

或者个性化一下：

    Total <span id="busuanzi_value_site_pv"></span> views.您是xxx的第<span id="busuanzi_value_site_uv"></span>个小伙伴<span id="busuanzi_value_page_pv"></span> Hits

1、我只要统计不显示？  
只引入busuanzi.js，不引入显示标签即可。

2、你的标签太丑了，我想美化一下可以么？  
可以的，您可以用自己站点的css进行控制，只要内层span的id正确以便回填访问次数即可，甚至标签都可以不是span。

3、中文字体太丑了，我的主题不适合？  
您可以将**本站总访问量xxx次**改成**view xxx times**等英文以获得更和谐的显示效果。

4、在访问量数据未取回来之前，我不想让页面显示为诸如“本站总访问量 次”，显得太low，怎么办？  
只需要如下css，不蒜子执行完毕会自动将标签显示出来，其他以此类推：

    <span id="busuanzi_container_site_pv" style='display:none'>    本站总访问量<span id="busuanzi_value_site_pv"></span>次</span>

上面的做法还是很low？！欣赏一下这位小伙伴的做法，请戳看效果：[http://blog.jamespan.me/2015/05/13/the-jump-guide](http://blog.jamespan.me/2015/05/13/the-jump-guide)  
右键看下源码，没加载出来前就显示个菊花转转转:  
首先，你要引入**font-awesome**字体：

    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">或<link rel="stylesheet" href="//cdn.bootcss.com/font-awesome/4.3.0/css/font-awesome.min.css">

其次，修改不蒜子标签：

    <span id="busuanzi_value_page_pv"><i class="fa fa-spinner"></i></span> Hits或（旋转效果）<span id="busuanzi_value_page_pv"><i class="fa fa-spinner fa-spin"></i></span> Hits

和谐多了！

5、我的网站已经运行一段时间了，想初始化访问次数怎么办？  
请先注册登录，自行修改阅读次数。

有任何其他问题或疑问可以留言。

