---
title: hexo中next主题添加live2d看板娘（会说话，会换装）
date: 2018-11-02 10:44:21
top: 9999998
tags:
  - hexo
  - blog
categories:
  - 自建博客
  - hexo

---
![](images/blog_header26.gif)
>一开始看到别人的博客又一个可爱的会说话的看板娘，萌翻了，于是乎大概花了有一周的时间找教程，（因为博主上班了，不再是时间大把的学生啦～），终于搞定，于是乎本篇文章记录了我实现看板娘的完整步骤，想直接实现的请看我的"终极进化"～

<!--more-->
版权声明：本文为作者原创，转载请注明出处，联系qq：32248827 https://blog.csdn.net/dataiyangu/article/details/83021854

所有的hexo本人的教程：[https://blog.csdn.net/dataiyangu/article/details/82827956](https://blog.csdn.net/dataiyangu/article/details/82827956)

本人博客的效果：mmmmmm.me

没耐心的请直接看最下面----------->>>>>>终极进化～～～～～～～～本文旨在记录本人的安装过程。

### 最初的体验：

首先，hexo的官方是支持看板娘的，已经封装好了插件，但是只是模型，不能说话，换衣服什么的更别说了，而且任务较少。

官方地址更详细：[https://github.com/EYHN/hexo-helper-live2d/blob/master/README.zh-CN.md](https://github.com/EYHN/hexo-helper-live2d/blob/master/README.zh-CN.md)v

安装模块:

> npm install --save hexo-helper-live2d

请向Hexo的 `_config.yml` 文件或主题的 `_config.yml` 文件中添加配置.

示例:

>     live2d:  enable: true  scriptFrom: local  pluginRootPath: live2dw/  pluginJsPath: lib/  pluginModelPath: assets/  tagMode: false  debug: false  model:    use: live2d-widget-model-wanko  display:    position: right    width: 150    height: 300  mobile:    show: true

### 发现新大陆：

上面的模型太少了。随后发现了下面讲的更多优质的模型。

后来看到了这个仁兄的博客：[https://yleao.coding.me/2018/0805/hexo%E4%B8%8A%E7%9A%84live2d%E5%BA%94%E7%94%A8.html](https://yleao.coding.me/2018/0805/hexo%E4%B8%8A%E7%9A%84live2d%E5%BA%94%E7%94%A8.html)（一定要看到最下面，最下面有资源）

嫌麻烦的，我这把资源贴出来：[https://github.com/summerscar/live2dDemo](https://github.com/summerscar/live2dDemo)（github地址，讲的很详细，将assets中的模型克隆到自己建的）具体：打包下载下来，解压后在`/live2dDemo-master/assets/`中找到喜欢的模型，直接把模型所在的文件夹拖入到博客根目录中的`live2d_models（自己新建的）`里，再修改`_config.yml` 里的 `model.use`即可（改为`live2d_models中的模型名字就行`）。

### 终极进化：

看到别人博客的看板娘能说话，能换衣服的，自己有强迫症找了好久，才找到资源。（以后没有的资源可以去github搜搜，很多东西百度是搜索不到的。）

文章地址：[https://zhangshuqiao.org/2018-07/%E5%9C%A8%E7%BD%91%E9%A1%B5%E4%B8%AD%E6%B7%BB%E5%8A%A0Live2D%E7%9C%8B%E6%9D%BF%E5%A8%98/](https://zhangshuqiao.org/2018-07/%E5%9C%A8%E7%BD%91%E9%A1%B5%E4%B8%AD%E6%B7%BB%E5%8A%A0Live2D%E7%9C%8B%E6%9D%BF%E5%A8%98/)    （在博客中添加看板娘），文章中已经给出了github地址：[https://github.com/stevenjoezhang/live2d-widget](https://github.com/stevenjoezhang/live2d-widget)

做法：写得很清楚了，改变autoload.js中的路径，autoload.js中的注释写得很清楚，但是关于路径问题并没有写清除，这里的绝对地址指的是将资源打包放到hexo/theme/next/source中，这里的hexo/theme/next/source也就是根目录（/），修改路径的时候假如把css，js，等文件放在了source 中的live目录下，那么修改路径就是/live/xxx.js，autoload.js的最后一个函数initWidget("/live/", "https://api.fghrsh.net/live2d");中的第二个参数不要变，就是人家的一个api，万一哪天挂了呢？如果想成为自己的要拷贝到自己的服务器中，并搭建php环境，api  github地址：[https://github.com/fghrsh/live2d_api](https://github.com/fghrsh/live2d_api)（本人还没有尝试，正在尝试中。已完成看我的另一个博客：[https://blog.csdn.net/dataiyangu/article/details/83042299](https://blog.csdn.net/dataiyangu/article/details/83042299)）

    <script src="/path/to/autolload.js"></script>

上面这句script放在/themes/next/layout/_layout.swing中，autoload.js路径同上修改。

注意：如果先玩过上面两个，第三个可能不显示，把上面——config.yml中的配置改为

> live2d:
> 
>     enable: true

也可能是缓存的问题。

最后，不知道是我的网速还是为什么，或者是缓存？hexo -g -d 后等一段时间才会把自己的改变同步到网页上。

最后的最后，已经将api部署到了自己的服务器上，玩意那天服务器到期了，或者等很多种可能，我还有前两种方法，但是：

这给以后的自己一个线索（以后估计都不感兴趣了，到时候再说）

通过阅读了github上坐着的源码，以及自己的总结，waifu-tips.js中的

loadlive2d("live2d", apiURL + "/get/?id=" + modelId + "-" + modelTexturesId, console.log("live2d", "模型 " + modelId + "-" + modelTexturesId + " 加载完成"));

第二个参数，也就是autoload.js中的足后一个配置的第二个参数，自己以后可以自行修改，就是可以换成本地的一个model.json

,但是可能会牵扯到其他的js的改动，以后估计就不感兴趣了。