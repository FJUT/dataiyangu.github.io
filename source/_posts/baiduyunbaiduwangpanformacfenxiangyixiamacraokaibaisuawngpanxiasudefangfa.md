title: 百度云百度网盘for mac 破解 分享一个MAC下绕开百度网盘限速下载的方法，三步操作永久生效～～～
author: Leesin.Dong
tags:
  - 捣蛋鬼
  - mac
  - 破解
  - 百度网盘
categories:
  - 捣蛋鬼
  - mac
date: 2018-11-09 23:07:00
---
相信大家都比较困惑，百度网盘客户端限速后一般只有几十K的下载速度，Windows有百度网盘破解版，但MAC的破解版似乎不存在，要提速的话，一般的做法是开超级会员(27元/月)，身为程序员的我们，是不是有更黑科技一点的方法呢？答案是肯定的，接下来我介绍一种正在使用的方法。（此方法不需要百度网盘客户端）

第一步：下载所需工具：（①②步我放在同一个文件夹，可一起下载，链接失效请留言）

 地址 ：https://pan.baidu.com/s/1raicYzM     密码：ve3n

①下载Aria2GUI主程序，完成Aria2GUI的安装

 ②下载chrome插件包，解压后随便放到一个地方(以后勿删除)

第二步：配置Chrome浏览器

①：打开Chrome浏览器，点击偏好设置-扩展程序-勾上”开发者模式“，随后将第一步②中解压后的整个chrome文件夹拖入Chrome浏览器界面，即可完成插件的安装。

第三步：下载你网盘里想下载的内容

①：打开第一步①中安装好的Aria2GUI

②：找到你要下载的东西，分享（无密码分享），然后会获得一个分享链接，复制这个链接，新建浏览器窗口打开，浏览器会提示”初始化完成“，界面中会多了一个”导出下载“选项，鼠标移动到这个选项上，点击ARIA2 RPC选项（请看注意部分）。

注意：（如果提示请先勾选需要下载的文件，勾选后导出下载按钮不见了的话；刷新浏览器，在页面尚未加载完时勾选文件或者文件夹，浏览器加载完以后，文件还会是勾选状态，而导出下载按钮不会消失，此时问题解决，可进行下一步)

③：随后返回第一步①中安装好的Aria2GUI，点击refresh，可发现任务已经在下载，速度取决于你的网速。

以下是我的网速的截图，本人使用的宽带小，所以突破限速也只是700K/s。


![upload successful](/images/my_blog_137.png)

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()