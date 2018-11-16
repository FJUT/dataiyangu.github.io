title: 记录一次博客从无到有再到精致的完整过程
author: Blues.Dong
top: 9999999
tags:
  - hexo
  - blog
categories:
  - 自建博客
  - hexo
date: 2018-10-25 21:30:00
---
![](/images/github.png)
>本文是本人的博客从无到有再到精致的所有内容，包括所有细节（我涉及到的），希望能够帮到读到这篇博文的读者。

<!--more-->
>
> * **敲黑板了：关于本博文，有任何技术上的错误或者语句不流畅而影响阅读的情况，请您联系我。**
>
> * **感谢：[https](https://www.jianshu.com/p/1f8107a8778c)：//www.jianshu.com/p/1f8107a8778c
 [cherry's blog](https://cherryblog.site/)**
>
> * **声明：因为本文只是为了给自己做笔记用的，有疏漏的地方还请谅解。**
> * **再次声明：本人将本此博客搭建的源码放在了github上，没有什么技术含量仅供参考～**
> * **再再次声明：如果你vim的水平不是很高的话，建议通过idea来进行编辑项目，如果hexo s启动的话，能够实时进行编辑查看效果**
> * **再再再次声明：如果博文有图片建议通过hexo-admin来进行编辑，直接通过qq截图，或者通过copy，然后command（control）+v都会自动复制到本地的文件夹，就不建议npm某些插件，复制到某些文件夹然后引用了，太麻烦～**
> * **再再再再次声明：本博客的看板娘有详细的教程，请往下看**
> * **再再再再再次声明：本文的动态背景摘自我上面写的博主，为了方便起见，我也将源码放在我的github上把～**
### 安装git

> git -version查看git的版本以及本地时候安装了gi


win可以安装git bash，具体的安装不介绍作为程序员来说在这里默认都安装了。


### 下载node.jsp

[https://nodejs.org/en/](https://nodejs.org/en/)

无论windows还是MAC，傻瓜安装。

查看是否成功：

> node -v
> 
> npm -v

### 安装HEXO

随便建一个文件夹，随便命名，用来装我们本地的博客文件，然后：

> npm i -g hexo


![upload successful](/images/my_blog_0.png) 

这个错误就不要去百度了，是没有访问权限，前面加个sudo

安装完成：


![upload successful](/images/my_blog_1.png) 

将HEXO相关的文件加载到我们新建的文件中：

> hexo init

初始化完成：


![upload successful](/images/my_blog_2.png)

### hexo+next主题目录结构
#### 默认目录结构


![upload successful](/images/my_blog_3.png)
deploy：执行hexo deploy命令部署到GitHub上的内容目录
public：执行hexo generate命令，输出的静态网页内容目录
scaffolds：layout模板文件目录，其中的md文件可以添加编辑
scripts：扩展脚本目录，这里可以自定义一些javascript脚本
source：文章源码目录，该目录下的markdown和html文件均会被hexo处理。该页面对应repo的根目录，404文件、favicon.ico文件，CNAME文件等都应该放这里，该目录下可新建页面目录。 
drafts：草稿文章
posts：发布文章
themes：主题文件目录
_config.yml：全局配置文件，大多数的设置都在这里
package.json：应用程序数据，指明hexo的版本等信息，类似于一般软件中的关于按钮
#### next主题目录

![upload successful](/images/my_blog_4.png)

### 建立城堡：

默认都有的GitHub上的上的上的账号。


![upload successful](/images/my_blog_5.png)

respositor name格式：你的名字+ github.io这里的你的名字必须与前面的Owner1致！

继续在终端操作（貌似要在上面的文件夹中，未证实）：

> git config --global user.name ""
> 
> git config --global user.email ""

生成SSH

> ssh-keygen -t rsa -C "youremail@example.com"

把〜/ .ssh / id_rsa.pub文件中记录了我们的SSH


![upload successful](/images/my_blog_6.png)

接着选择ssh和GPG键 - >新的ssh键 - > tittle随意，键填我们的.ssh / id_rsa.pub文件中的内容。

验证是否配置成功：

> 终端输入：ssh -T git@github.com

出现：

> 警告：永久性地将IP地址为“192.30.253.112”的RSA主机密钥添加到已知主机列表中。
> 
> 主题文件问题，在本地配置一下就好了  
> 
![upload successful](/images/my_blog_7.png)
> 
> 上面这句说明成功了。

### 测试一波

进入博客目录中，vim _config.yml

末行加入

> deploy： **每个配置后面要加一个英文空格**
> 
> type：git
> 
> repository: HTTPS：//github.com/YourgithubName/YourgithubName.github.io.git
> 
> branch：master


回到博客目录

> hexo clean hexo生成hexo服务器

### 上传至的GitHub上

将文章上传至GitHub上

> npm install hexo-deployer-git --save 这句话貌似下载deploy工具

> hexo clean 建议每次执行下面任意一个命令前限制性这个命令
> 
> hexo generate 生成html界面
> 
> hexo deploy  发布到git

> hexo 快捷命令
> hexo server ->hexo s
>hexo clean -> hexo clean 
>hexo generate ->hexo g 
>hexo deploy-> hexo d
>可以简化成hexo g -d

> 浏览器：HTTP：//XXX.github.io   
> 
> 一开始我怎么也打不开，后来切到我自己搭的外网就没问题了，后来关掉外网也能访问了，具体原因，不了解，后期我会试试国内的码云.\- ----------经过后来没有外网的小伙伴的测试，他们都能访问，再加上我的推理分析，可能是配置完了之后还要再缓冲（不知道怎么表达，就是等一会的意思），一会吧。

### 绑定域名

说到绑定要先买，我用的是GoDadday（外国的），支持中文，支持支付宝。

首先说一下原因，也咨询了很多比我厉害的人儿。国内的XXX，等都需要备案的，备案需要很久。

再就是买国内和国外的域名，域名是放在DNS服务器上的，这个服务器肯定不会被墙所以，肯定是没问题的。被墙不被墙那和你的空间主机在国内和国外有关系，而且不是所有的外网都会被墙，只要不要发布不合法的之类的东西，一般也没事。

敲黑板了：CN域名指的是中国的域名，必须要备案的，而且时不时的可能给你停了。

主流的是玉米，搜索友好貌似。

非主流的也不错，XYZ，IO，IM，我我用的就是我，因为我就是为了自己写博客做笔记，想尝试搭建博客的过程，不需要太多的访客。


![upload successful](/images/my_blog_8.png)

剩下的就是购买的操作，在中文的环境下，经常逛淘宝的同学应该看一眼就会了，没事上网搜索优惠码也能省不少钱。

绑定：

在我们本地的文件夹中加入CNAME文件，并添加在根目录下的源文件夹中，文件中加入

> xxxxxxx.com前面没有HTTP也没有WWW

然后进入DNSpod


![upload successful](/images/my_blog_9.png)

主机记录有

> @是游客可以没有前缀的访问我们的博客 
> 
> WWW是游客用有WWW前缀的访问我们的博客   
> 
> A是用来陪我们的github ip地址的。通过ping xxx.github.io得到

建议通过@和WWW配置因为IP地址是会变的。

重新回到GoDaddy的的的的的的的

点击你的账户，管理我的域名 \- >管理DNS - >将域名服务器更改如下


![upload successful](/images/my_blog_10.png)


### **修改主题：**

> 下一步的官方网址为：[http](http://theme-next.iissnan.com/)：[//theme-next.iissnan.com/](http://theme-next.iissnan.com/)
> 
> 下一步的GitHub地址为：[https](https://github.com/iissnan/hexo-theme-next)：[//github.com/iissnan/hexo-theme-next](https://github.com/iissnan/hexo-theme-next)

修改站点配置文件`_config.yml`

    # Extensions## Plugins: https://hexo.io/plugins/## Themes: https://hexo.io/themes/theme: next

进入主题文件中的_config.yml文件

四种主题：

> *   Muse - 默认 Scheme，这是 NexT 最初的版本，黑白主调，大量留白
>
> *   Mist - Muse 的紧凑版本，整洁有序的单栏外观
>     
> *   Pisces - 双栏 Scheme，小家碧玉似的清新
>     
> *   Gemini - 左侧网站信息及目录，块+片段结构布局 
>     

cheme 的切换通过更改 主题配置文件，搜索 scheme 关键字。 你会看到有四行 scheme 的配置，将你需用启用的 scheme 前面注释 # 去除即可。
喜欢的留下，不喜欢的注释掉

### **修改语言：**

>  language: zh-Hans  

之前我试了很多次，哪哪都试了什么hexo clean啊之类的，还要确保语言文件夹下的名字对不对之类的，最后通过google发现：

> **这个配置是在根目录，也就是我们博客的跟文件下而不是主题的_config文件夹下改的**


修改背景：

主题下的_config文件夹修改

> *   Canvas-nest
>     
> *   three_waves
>     
> *   canvas_lines
>     
> *   canvas_sphere
>     

需要的拿出来不需要的注释掉。

### **添加RSS：**

1.首先安装插件

>  npm install --save hexo-generator-feed

2.修改根目录下的配置文件

>feed: # RSS订阅插件
>
>  type: atom
>
>  path: atom.xml
>
>  limit: 0
>
>plugins: hexo-generate-feed

3.修改主题配置文件

> ＃Set rss to false to disable feed link.
> 
> ＃Leave rss as empty to use site's feed link.
> 
> ＃Set rss to specific value if you have burned your feed already. 
> 
> RSS：/atom.xml

### 添加标签，分类页面

主题配置文件


![upload successful](/images/my_blog_11.png)

根目录执行命令，新建页面

> $ hexo new page tags

类别标签需要修改配置进入`站点根目录\source\tags`，`站点根目录\source\categories`


![upload successful](/images/my_blog_12.png)

这里先将评论值设置为假，后面作评论的时候会用到。

### 设置网站图标icon
>注：后期博主尝试托管到码云，但是博客的icon不显示，github和coding好好的，所以放弃了，有成功的同学欢迎联系我，联系方式在关于我～
之前在网上找了许多教程，反反复复很多次没成功，这里对自己最后搞出来的方法做个总结。

注意点：

1.下载图标尺寸32 * 32网站：[https](https://www.easyicon.net/)：//www.easyicon.net/最好用这个，我自己抠图制作的并没有成功，用这个便成功了，文件名必须是favicon.ico。

2.将图标放在下一个/源极/图像文件夹目录下面。

3.配置主题目录中的配置文件（敲黑板，重点）

之前网上查到的方法如下:(并没有成功）


![upload successful](/images/my_blog_13.png)

我的方法：


![upload successful](/images/my_blog_14.png)

根据我的理解：首先下一主题下面的来源就是主目录，而我们的文件放在了图像文件夹下面，所以目录肯定不是/favicon.ico，而是我这里的/images/favicon.ico，然后就是这里有很多配置项，图中我能认识的也就Safari浏览器浏览器浏览器浏览器浏览器的浏览器，安卓，应用程序什么的，应该是对应不同的浏览器，自己取舍。

以上就是设置ICO的注意点（本人的注意点，希望不要误导读者）。

### 右侧的社交图标：

在主题配置文件中


![upload successful](/images/my_blog_15.png)

如上图1中，左面是链接，右面是图标（必须写不然图标不变），图标的名称的英文在[图标库](http://fontawesome.io/icons/)中，只需要在图标库中找到名称即可，不需要下载下来。

如图2，将启用改为真图二中不需要在此设置图标，本人之前看网上的教程，说图二也需要设置图标，导致很久没成功

### 下一主题默认顶部有一条黑边，黑线，去掉：

进入下一个主题的源/ css / _custom / custom.styl（亲测有效）（如果本地已经没有黑边了，但是提交到github还是有黑边，那么你可以尝试下清除浏览器的缓存0.0)

加入如下配置：

.headband {display：none; }

### 右边添加友情链接：

主题配置文件


![upload successful](/images/my_blog_16.png)

### 底部显示建站时间和图标修改：

主题配置文件：


![upload successful](/images/my_blog_17.png)

效果


![upload successful](/images/my_blog_18.png)
下面的文章我会把雪花变成跳动的红心
### 打赏效果：


![upload successful](/images/my_blog_19.png)

设置完了，主页中的文章可能不显示，进入归档或者分类随便进入一个文章底部会出现打赏。

### 关闭网站动画效果：

为了追求更快的响应速度我们可以把网站的大部分动画关掉，修改这里**主题配置文件**的一行代码即可：

> ＃Motion
> 
> use_motion：\[false / true\]

好吧我承认关闭动画是我拷贝过来的，因为我感觉未来动画挺好的，所以我没有亲自测试，路过的游客，呵呵斯密达...

### 实现评论功能：

展示进入展示展示展示展示展示展示 [来必力](https://link.jianshu.com/?t=https%3A%2F%2Flivere.com%2F)（韩国）进行注册（之前很多的已经不能用了，包括网易跟贴，这个还比较稳定）。


![upload successful](/images/my_blog_20.png)

选择city版本，因为是免费的（首先注册登录）


![upload successful](/images/my_blog_21.png)

图中红圈是我们的ID

主题的配置文件：

>#Support for LiveRe comments system. 
 >
>#You can get your uid from  https://livere.com/insight/myCode (General web site) 
 >
livere_uid: {你的来必力id}
>

还可以对登录网址等进行管理


![upload successful](/images/my_blog_22.png)

本评论系统支持QQ，微信等登录，所以访客绝对可以对我们的文章进行正常评论。

### 统计访客量以及文章阅读量：

高能预警：不蒜子的域名过期了，所以通过以下方式集成不蒜子的同学可能会揣性能问题（不蒜子有两种集成的方法），转博客：[不蒜子域名更改，导致访客人数失败](https://blog.csdn.net/dataiyangu/article/details/82967966)

总的来说把配置文件中的域名修改为新的域名即可

接下来的主题在这里的主题\\下一步\\布局\ _third方\\分析\ busuanzi，counter.swig~

不蒜子官方网站：[不蒜子](http://busuanzi.ibruce.info/?yyue=a21bo.50862.201879)

下一主题集成了不蒜子统计功能：

    # Show PV/UV of the website/page with busuanzi.# Get more information on http://ibruce.info/2015/04/04/busuanzi/# 不蒜子统计功能busuanzi_count:  # count values only if the other configs are false  enable: false  # custom uv span for the whole site  site_uv: false  site_uv_header: <i class="fa fa-user"></i>  site_uv_footer:  # custom pv span for the whole site  site_pv: false  site_pv_header: <i class="fa fa-eye"></i>  site_pv_footer:  # custom pv span for one page only  page_pv: false  page_pv_header: <i class="fa fa-file-o"></i>  page_pv_footer:

当`enable: true`时，代表开启全局开关。若`site_uv`，`site_pv`，`page_pv`的值均为`false`时，不蒜子仅作记录而不会在页面上显示。  
当`site_uv: true`时，代表在页面底部显示站点的UV值。  
当`site_pv: true`时，代表在页面底部显示站点的PV值。  
当`page_pv: true`时，代表在文章页面的标题下显示该页面的PV值（阅读数）。  
`site_uv_header`状语从句：`site_uv_footer`这几个为自定义样式配置，相关的值留空时将不显示，可以使用（带特效的）字体真棒。  
示例：

    enable: true# 效果：本站访客数12345人次site_uv: truesite_uv_header: 本站访客数site_uv_footer: 人次# 效果：本站总访问量12345次（一般不开启这个）site_pv: truesite_pv_header: 本站总访问量site_pv_footer: 次# 效果：本文总阅读量12345次page_pv: truepage_pv_header: 本文总阅读量page_pv_footer: 次

### 统计字数：

先下载插件：

    npm install hexo-wordcount --save

主题配置：

    # Post wordcount display settings# Dependencies: https://github.com/willin/hexo-wordcountpost_wordcount:  item_text: true  min2read: true  wordcount: true  separated_meta: true

打开`\themes\next\layout\_macro\post.swig`文件，在`leancloud-visitors-count`后面位置添加一个分割符：


![upload successful](/images/my_blog_23.png)

在数字后面加字：

进入：xxx\_blog /主题/下一首/布局/ \_macro / post.swig

    <span title="{{ __('post.wordcount') }}">    {{ wordcount(post.content) }}</span>

添加“字”到{{单词计数（post.content）}}后面，修改后为：

    <span title="{{ __('post.wordcount') }}">    {{ wordcount(post.content) }} 字</span>

同理，我们修改【阅读时长】，修改后如下：

    <span title="{{ __('post.min2read') }}">    {{ min2read(post.content) }} 分钟</span>

### 增加版权信息

我曾经尝试过换各种样式什么的没成功，也尝试过像简书，CSDN一样复制粘贴后自动加上版权的小尾巴，但是我建这个博客的初衷就是因为某些博客粘贴复制的的Linux命令会总是加上小尾巴，所以我如果这样做岂不是画蛇添足，于是下面的方法知识实现在文章末尾加版权。

修改主题配置文件：


![upload successful](/images/my_blog_24.png)

改完之后链接地址可能不对，作如下修改即可。

修改根目录配置文件


![upload successful](/images/my_blog_25.png)

### 添加分享功能：

这个我用了好久的时间，看下面的内容前，我先说一下避免犯错，我按照网上的教程反反复复好久没成功，一样的代码，操作也简单，这样过了两天，偶然的机会通过手机上我的博客，发现有分享按钮，可知不是我的问题，接着用于在MAC出了问题，准备卸载，因为赶火车，还没有测试，应该没问题。

有强迫着的我喜欢刨根问底，终于发现并不是谷歌浏览器的问题：

因为我登录的谷歌账号中，安装了一个过滤广告的小插件，本来是用来防止CSDN的广告的，没想到把我自己的博客的前页添加的访问功能给我屏蔽了。


![upload successful](/images/my_blog_26.png)
至此关于前页添加分享功能彻底完工，所有的疑点全部解决。（百度分享和其他的分享貌似不支持HTTPS，配置文件的注释中有介绍）

进入[AddThis](https://link.jianshu.com/?t=https%3A%2F%2Fwww.addthis.com%2F)，注册登录


![upload successful](/images/my_blog_27.png)
在**主题配置文件**中搜索`add_this_id`，去掉前面的注释，添加publicid。

    # Share  分享#jiathis: true# Warning: JiaThis does not support https. 博主实测支持httpsadd_this_id: {your AddThis ID}

对分享按钮进行管理，可以设置多个分享按钮。


![upload successful](/images/my_blog_28.png)

效果：


![upload successful](/images/my_blog_30.png)

有时候addthis不显示是因为，我的google开启了广告过滤的插件!
![upload successful](/images/my_blog_31.png)关掉就行了。

### 添加评分功能：

网址[widgetpack](https://link.jianshu.com/?t=https%3A%2F%2Fwidgetpack.com%2F)，[进去](https://link.jianshu.com/?t=https%3A%2F%2Fwidgetpack.com%2F)注册登录

首先注册账号，添加新站点，填入网站名称和域名地址，点击添加：


![upload successful](/images/my_blog_32.png)

获取ID：


![upload successful](/images/my_blog_33.png)

  
这里9384就是我的ID，下来复制到**主题配置文件**中搜索`widgetpack`添加即可：


![upload successful](/images/my_blog_35.png)
这里建议设置为按IP地址记录评分，比较方便：


![upload successful](/images/my_blog_36.png)


![upload successful](/images/my_blog_37.png)

### 文章排序优先级设置

修改`hero-generator-index`插件，文件把`node_modules/hexo-generator-index/lib/generator.js`内的代码替换为：

    'use strict';var pagination = require('hexo-pagination');module.exports = function(locals){  var config = this.config;  var posts = locals.posts;    posts.data = posts.data.sort(function(a, b) {        if(a.top && b.top) { // 两篇文章top都有定义            if(a.top == b.top) return b.date - a.date; // 若top值一样则按照文章日期降序排            else return b.top - a.top; // 否则按照top值降序排        }        else if(a.top && !b.top) { // 以下是只有一篇文章top有定义，那么将有top的排在前面（这里用异或操作居然不行233）            return -1;        }        else if(!a.top && b.top) {            return 1;        }        else return b.date - a.date; // 都没定义按照文章日期降序排    });  var paginationDir = config.pagination_dir || 'page';  return pagination('', posts, {    perPage: config.index_generator.per_page,    layout: ['index', 'archive'],    format: paginationDir + '/%d/',    data: {      __index: true    }  });};

在`\scaffolds\post.md`头部`---`中添加以下代码：

    top:  
    

新建以后就文章可以给文章的`top`赋值，数值越大优先级越高。

> 已经写好的文章在对应的MD头部文件添加`top：{number}`即可

### 添加站内搜索功能

这里使用[Algolia](https://link.jianshu.com?t=https%3A%2F%2Fwww.algolia.com%2F)，其他的都不太靠谱。  
前往Algolia注册页面，注册一个新账户。可以使用GitHub或者Google账户直接登录，注册后的14天内拥有所有功能（包括收费类别的）。之后若未续费会自动降级为免费账户，免费账户总共有万条记录，每月有10万的可以操作数。注册完成后，创建一个新的指数，这个指数将在后面使用。


![upload successful](/images/my_blog_38.png)

  
索引创建完成后，此时这个指数里未包含任何数据接下来需要安装。`Hexo Algolia`扩展，这个扩展的功能是搜集站点的内容并通过API发送给Algolia前往站点根目录，执行命令安装：

    $ npm install --save hexo-algolia
    

找到新建的指数对应的按键，下面复制的`App ID`状语从句：`API Key`，同时修改权限：


![upload successful](/images/my_blog_39.png)


![upload successful](/images/my_blog_40.png)

在**站点配置文件**（注意是站点配置文件）末尾，新增配置代码：

    #添加搜索algolia:  applicationID: '{your appID}'  apiKey: 'your API Key'  indexName: 'your Index name'  chunkSize: 5000

在站点根目录执行以下代码，更新索引（每次更新文章都需要执行一次），即上传站点内容到algolia：

    $ export HEXO_ALGOLIA_INDEXING_KEY={your API Key}$ hexo algolia

更改**主题配置文件**，搜索`algolia_search`：

    # Algolia Searchalgolia_search:  enable: true  hits:    per_page: 10  labels:    input_placeholder: Search for Posts    hits_empty: "We didn't find any results for the search: ${query}"    hits_stats: "${hits} results found in ${time} ms"

将`enable`对划线`true`即可，需要根据你可以调整`labels`中的字幕下载下载下载下载下载下载。

### DaoVoice在线联系

实现效果：


![upload successful](/images/my_blog_41.png)


![upload successful](/images/my_blog_42.png)

  
去首先[注册](https://link.jianshu.com?t=http%3A%2F%2Fdashboard.daovoice.io%2F)，需要这里[邀请码](https://link.jianshu.com?t=http%3A%2F%2Fdashboard.daovoice.io%2Fget-started%3Finvite_code%3D5ea4435c)，贴一个`5ea4435c`，或者直接点击邀请码的链接注册后就可以查看你的。`app_id`：


![upload successful](/images/my_blog_43.png)

  
复制`app_id`，打开`/themes/next/layout/_partials/head.swig`，写下如下代码：

    `{% if theme.daovoice % }  
    <script>  
    (function(i,s,o,g,r,a,m){i["DaoVoiceObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;a.charset="utf-8";m.parentNode.insertBefore(a,m)})(window,document,"script",('https:' == document.location.protocol ? 'https:' : 'http:') + "//widget.daovoice.io/widget/0f81ff2f.js","daovoice")  daovoice('init', {      app_id: "{{theme.daovoice_app_id}}"    });  daovoice('update');  
    </script>
    { % endif % }`

打开接着**主题配置文件**，在最后写下如下代码：

    # Online contactdaovoice: truedaovoice_app_id: {your app_id}

具体样式设计可以在应用设置 \- >聊天设置后边改。


![upload successful](/images/my_blog_44.png)

### 自动更换背景图片：

修改背景样式

修改主题\\下一个\\来源\ css \ _custom \ custom.styl文件，这个是下一个故意留给用户自己个性化定制一些样式的文件，添加以下代码：

    body {    background:url(https://source.unsplash.com/random/1600x900);    background-repeat: no-repeat;    background-attachment:fixed;    background-position:50% 50%;}

如果自己不喜欢这个网址提供的图片做背景，那么修改URL（）里面的路径即可.repeat，附件的位置就是调整图片的位置，不重复出现，不滚动等等。

完成这一步其实背景就会自动更换了，但是会出现一个问题，因为下一个主题的背景是纯透明的，这样子就造成背景图片的影响看不见文字，这对于博客来说肯定不行。

那么就需要调整背景的不透明度了。同样是修改主题\ next \ source \ css \ _custom \ custom.styl文件。在后面添加如下代码

    .main-inner {     margin-top: 60px;    padding: 60px 60px 60px 60px;    background: #fff;    opacity: 0.8;    min-height: 500px;}

### 点击出现爱心效果：

创建JS文件

在`/themes/next/source/js/src`下新建文件clicklove.js，把接着该[链接](http://7u2ss1.com1.z0.glb.clouddn.com/love.js)下的代码拷贝粘贴到clicklove.js文件中。  
代码如下：

    !function(e,t,a){function n(){c(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"),o(),r()}function r(){for(var e=0;e<d.length;e++)d[e].alpha<=0?(t.body.removeChild(d[e].el),d.splice(e,1)):(d[e].y--,d[e].scale+=.004,d[e].alpha-=.013,d[e].el.style.cssText="left:"+d[e].x+"px;top:"+d[e].y+"px;opacity:"+d[e].alpha+";transform:scale("+d[e].scale+","+d[e].scale+") rotate(45deg);background:"+d[e].color+";z-index:99999");requestAnimationFrame(r)}function o(){var t="function"==typeof e.onclick&&e.onclick;e.onclick=function(e){t&&t(),i(e)}}function i(e){var a=t.createElement("div");a.className="heart",d.push({el:a,x:e.clientX-5,y:e.clientY-5,scale:1,alpha:1,color:s()}),t.body.appendChild(a)}function c(e){var a=t.createElement("style");a.type="text/css";try{a.appendChild(t.createTextNode(e))}catch(t){a.styleSheet.cssText=e}t.getElementsByTagName("head")[0].appendChild(a)}function s(){return"rgb("+~~(255*Math.random())+","+~~(255*Math.random())+","+~~(255*Math.random())+")"}var d=[];e.requestAnimationFrame=function(){return e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(e){setTimeout(e,1e3/60)}}(),n()}(window,document);
    

修改_layout.swig

在`\themes\next\layout\_layout.swig`文件末尾添加：

    <!-- 页面点击小红心 --><script type="text/javascript" src="/js/src/clicklove.js"></script>

### 修改文章内链接文本样式

修改文件`themes\next\source\css\_common\components\post\post.styl`，在末尾添加如下CSS样式：

    // 文章内链接文本样式.post-body p a{  color: #0593d3;  border-bottom: none;  border-bottom: 1px solid #0593d3;  &:hover {    color: #fc6423;    border-bottom: none;    border-bottom: 1px solid #fc6423;  }}

* * *

### 修改文章底部标签样式

修改`/themes/next/layout/_macro/post.swig`，搜索`rel="tag">#`，将`#`换成`<i class="fa fa-tag"></i>`


![upload successful](/images/my_blog_46.png)

实现效果：


![upload successful](/images/my_blog_47.png)
* * *

### 文章末尾统一添加“本文结束”标记

路径在`\themes\next\layout\_macro`中新建`passage-end-tag.swig`文件，并添加以下内容：

    <div>    {% if not is_index %}        <div style="text-align:center;color: #555;font-size:14px;">-------------The End-------------</div>    {% endif %}</div>

打开接着`\themes\next\layout\_macro\post.swig`文件，在这个位置添加代码：


![upload successful](/images/my_blog_48.png)

要添加的代码如下：

    <div>  {% if not is_index %}    {% include 'passage-end-tag.swig' %}  {% endif %}</div>

打开然后**主题配置文件**，在末尾添加：

    # 文章末尾添加“本文结束”标记passage_end_tag:  enabled: true

实现效果：


![upload successful](/images/my_blog_49.png)

* * *

### 修改作者头像并旋转

打开**_主题配置文件_**找到`Sidebar Avatar`字段（这个头像最好是正方形的，太长的教育话教育教育教育教育头像教育就变椭圆形了）

    # Sidebar Avataravatar: /images/header.jpg

这是头像的路径，只需把你的头像命名为`header.jpg`（随便命名）放入`themes/next/source/images`中，将`avatar`的路径名改成你的头像就名就OK啦！

打开`\themes\next\source\css\_common\components\sidebar\sidebar-author.styl`，在里面添加如下代码：

    .site-author-image {  display: block;  margin: 0 auto;  padding: $site-author-image-padding;  max-width: $site-author-image-width;  height: $site-author-image-height;  border: $site-author-image-border-width solid $site-author-image-border-color;  /* 头像圆形 */  border-radius: 80px;  -webkit-border-radius: 80px;  -moz-border-radius: 80px;  box-shadow: inset 0 -1px 0 #333sf;  /* 设置循环动画 [animation: (play)动画名称 (2s)动画播放时长单位秒或微秒 (ase-out)动画播放的速度曲线为以低速结束     (1s)等待1秒然后开始动画 (1)动画播放次数(infinite为循环播放) ]*/   /* 鼠标经过头像旋转360度 */  -webkit-transition: -webkit-transform 1.0s ease-out;  -moz-transition: -moz-transform 1.0s ease-out;  transition: transform 1.0s ease-out;}img:hover {  /* 鼠标经过停止头像旋转   -webkit-animation-play-state:paused;  animation-play-state:paused;*/  /* 鼠标经过头像旋转360度 */  -webkit-transform: rotateZ(360deg);  -moz-transform: rotateZ(360deg);  transform: rotateZ(360deg);}/* Z 轴旋转动画 */@-webkit-keyframes play {  0% {    -webkit-transform: rotateZ(0deg);  }  100% {    -webkit-transform: rotateZ(-360deg);  }}@-moz-keyframes play {  0% {    -moz-transform: rotateZ(0deg);  }  100% {    -moz-transform: rotateZ(-360deg);  }}@keyframes play {  0% {    transform: rotateZ(0deg);  }  100% {    transform: rotateZ(-360deg);  }}

### 文章添加阴影效果

打开`\themes\next\source\css\_custom\custom.styl`，向里面加入：

    // 主页文章添加阴影效果 .post {   margin-top: 60px;   margin-bottom: 60px;   padding: 25px;   -webkit-box-shadow: 0 0 5px rgba(202, 203, 203, .5);   -moz-box-shadow: 0 0 5px rgba(202, 203, 204, .5);  }

实现效果：


![upload successful](/images/my_blog_50.png)

* * *

### 修改打赏部分字体动画

接下来打赏部分的动画是鬼畜一般的不停地抖动，看着很难受，所以博主把它改为只循环三遍，打开文件`themes/next/source/css/_common/components/post/post-reward.styl`，把微信和支付宝的改为如下：

    #wechat:hover p{    animation: roll 0.1s 3 linear;    -webkit-animation: roll 0.1s 3 linear;    -moz-animation: roll 0.1s 3 linear;}#alipay:hover p{    animation: roll 0.1s 3 linear;    -webkit-animation: roll 0.1s 3 linear;    -moz-animation: roll 0.1s 3 linear;}

* * *

### 自定义鼠标样式

打开`themes/next/source/css/_custom/custom.styl`，添加代码：

    // 鼠标样式  * {      cursor: url("http://om8u46rmb.bkt.clouddn.com/sword2.ico"),auto!important  }  :active {      cursor: url("http://om8u46rmb.bkt.clouddn.com/sword1.ico"),auto!important  }

其中的URL里面必须是ICO图片，ICO图片可以上传到网上（推荐七牛云图床），然后获取外链，复制到URL里就行了。


### 添加看板娘：
[https://blog.csdn.net/dataiyangu/article/details/83021854](https://blog.csdn.net/dataiyangu/article/details/83021854)
### 添加音乐播放功能：

[https://yleao.coding.me/2018/0902/hexo%E4%B8%8A%E7%9A%84aplayer%E5%BA%94%E7%94%A8.html](https://yleao.coding.me/2018/0902/hexo%E4%B8%8A%E7%9A%84aplayer%E5%BA%94%E7%94%A8.html)

当然还有这个人的博客：写两个差不多的[https://asdfv1929.github.io/2018/05/26/next-add-music/](https://asdfv1929.github.io/2018/05/26/next-add-music/)

超级详细，今天自己弄了半天，可能因为从github上上上上上上上下载东西出了问题，文件不完整。

里面的音乐和歌词外链自己百度，歌词可以复制粘贴成本地的LRC文件引进去。

位置想放在侧边栏的话就将哪四行引入文件的代码放到


![upload successful](/images/my_blog_51.png)

布局是在未来，文件下的。

### 多级分类：

首先

> HEXO新页面类别

修改xxx.md中的配置

    categories:/* 分类，支持多级，比如：- technology- computer- computer-aided-art则为technology/computer/computer-aided-art（不适用于 layout: page）*/

配置完会自动显示，但是可能在页面中没有，则需要修改，blog/source/categories/index.md，查看具体官方介绍[https://github.com/iissnan/hexo-theme-next/wiki/ ％E5％88％9B％E5％BB％BA％E5％88％86％E7％B1％BB％E9％A1％B5％E9％9D％A2](https://github.com/iissnan/hexo-theme-next/wiki/%E5%88%9B%E5%BB%BA%E5%88%86%E7%B1%BB%E9%A1%B5%E9%9D%A2)

     title: 分类 date: 2014-12-22 12:39:04 type: "categories" comments: false

### 更加方便的发布博客，彻底脱离命令行，最方便：

[https://blog.csdn.net/dataiyangu/article/details/83066586](https://blog.csdn.net/dataiyangu/article/details/83066586)

（这种方法可以解决在复制图片的时候不显示的问题，可以在admin里面直接进行复制粘贴，会自动保存到相应的文件夹下面具体功能需要大家自己尝试。）

### **下一个主题下让页脚的心脏图标跳动起来**

* * *

使用NexT主题后，默认的页脚会变成`user`。可以去[Font Awesome](http://www.fontawesome.com.cn/faicons/)自行查找替换。

在`next`文件下的主题配置文件中，找到`footer`，把`icon`后面替换成你在[Font Awesome](http://www.fontawesome.com.cn/faicons/)上找到的图标的名字就ok了（不必带fa-前缀）。

那么如何让页脚的❤icon跳动起来呢？

* * *

首先修改主题配置文件：

    1
    

    文件位置：~/hexo/themes/next/_config.yml
    

    12

    footer:      icon: user修改成heart

然后修改`footer.swig`：

    1
    

    文件位置：~/hexo/themes/next/layout/_partials/footer.swig
    

    1
    

    <span class="with-love">修改成<span class="with-love" id="heart">
    

接着编辑`custom.styl`：

    1
    

    文件位置：~/hexo/themes/next/source/css/_custom/custom.styl
    

在其中加入

    12345678910111213

    // 自定义页脚跳动的心样式@keyframes heartAnimate {    0%,100%{transform:scale(1);}    10%,30%{transform:scale(0.9);}    20%,40%,60%,80%{transform:scale(1.1);}    50%,70%{transform:scale(1.1);}}#heart {    animation: heartAnimate 1.33s ease-in-out infinite;}.with-love {    color: rgb(0, 0, 0);}

其中`color`的值可以改成你自己喜欢的，RGB可以颜色参考[这里](https://blog.yleao.com/2018/0731/%E5%AD%97%E4%BD%93%E3%80%81%E5%AD%97%E5%8F%B7%E4%B8%8E%E9%A2%9C%E8%89%B2%E6%B5%8B%E8%AF%95.html#%E9%A2%9C%E8%89%B2%E5%88%97%E8%A1%A8)。

### HEXO首页不显示全文：

### 第一种方法

用文本编辑器打开themes / next目录下的_config.yml文件，找到这段代码：

＃自动摘录。不推荐。

＃请在帖子中使用<！ \- more - >来准确控制摘录。

auto_excerpt：

enable：false

length：150

把 `enable`的 `false`改成 `true`就行了，然后 `length` 的英文设定文章预览的字幕下载下载下载下载下载：长度。

修改后重启HEXO就ok了。

### 第二种方法

在你写MD文章的时候，可以在内容中加上 `<!--more-->`，首页这样状语从句：列表页展示的文章内容就是 `<!--more-->` 之前的文字，而之后的就不会显示了。

我用的第一种

### 所有对主题的DIY（标题的样式，阅读全文，以及所有想改的样式）：

懂点前端的小伙伴会得心应手一点----------->找到相应的格的类或者ID

next/ layuout / _custom / xxx.swimg（自己加相对应于人家下本来就有的摆动，取一样的名字）

next/source/ CSS / \_custom / xxx.css（就在\_custom.style下面加新的样式就行）

附上网上找的很好的DIY配置文件


// Custom styles.
//首页文章阴影样式
.post {
    margin-top: 60px;
    margin-bottom: 60px;
    padding: 25px;
    -webkit-box-shadow: 0 0 14px rgba(202, 203, 203, .5);
    -moz-box-shadow: 0 0 14px rgba(202, 203, 204, .5);
}
//热评文章
.ds-top-threads li a {
    padding-left: 5px;
    transition: border-width 0.2s linear 0s, color 0.2s linear 0s;
    border-bottom: none;
}
.ds-top-threads li a:hover {
    border-left: 8px solid #4d768c;
}
//首页头部样式
.header {
    background: url("/images/header-bk.jpg");
    height: 20vh;
}
.site-meta {
    float: none;
}
.menu {
    float: none;
}
.logo-line-before,
.logo-line-after {
    display: none;
}
.menu .menu-item a {
    font-size: 14px;
    color: rgb(15, 46, 65);
    border-radius: 4px;
}
.site-meta {
    margin-left: 0px;
    text-align: center;
}
.site-meta .site-title {
    font-size: 28px;
    font-family: 'Comic Sans MS', sans-serif;
    color: #fff;
}
//首页尾部样式
.footer {
    background: none;
    font-size: 16px;
}
.footer-inner {
    font-family: 'Comic Sans MS', sans-serif;
    text-align: center;
    color: #4c618f;
}
//侧边栏信息样式修改
.site-author-name {
    margin: 48px 0 0;
    color: #090909;
    font-family: 'Comic Sans MS', sans-serif;
}
.links-of-blogroll {
    font-size: 14px;
    margin-bottom: 42px;
}
.links-of-author {
    margin-top: 30px;
    margin-bottom: 58px;
}
.sidebar-inner {
    color: #649ab6;
    height: 638px;
}
.site-overview{
    height: 638px;
}

.sidebar a {
    color: #649ab6;
    border-bottom-color: #649ab6;
    border-bottom: none;
}
.sidebar {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 0;
  z-index: 1040;
  box-shadow: inset 0 2px 6px #000;
  background: url("/images/bk.jpg");
  -webkit-transform: translateZ(0);
  background-size: 320px 659px;
  background-position-y: 1vh;
  background-repeat: no-repeat;
  box-shadow: inset 2px 2px 40px #bdb2b2;
}
.sidebar a:hover {
    color: #0c0b0b;
}
.site-state-item {
    display: inline-block;
    padding: 8px 28px;
    border-left: 1px solid #649ab6;
}
.sidebar-nav .sidebar-nav-active {
    color: #649ab6;
    border-bottom-color: #649ab6;
}
.sidebar-nav li:hover {
    color: #0c0b0b;
}

//侧栏按钮样式
.sidebar-toggle {
    background: #649ab6;
}
.back-to-top {
    background: #649ab6;
}
//文章目录样式
.post-toc .nav .active>a {
    color: #4f7e96;
}
.post-toc ol a:hover {
    color: #7784ba;
}
.sidebar-nav .sidebar-nav-active:hover {
    color: #37596c;
}
a {
    border-bottom: none;
}
//首页阅读全文样式
.post-button {
    margin-top: 30px;
    text-align: center;
}
.post-button .btn {
    color: #fff;
    font-size: 15px;
    background: #686868;
    border-radius: 16px;
    line-height: 2;
    margin: 0 4px 8px 4px;
    padding: 0 20px;
}
.post-button a{
  border-bottom: 1px solid #666;
}
.post-button a:hover {
    color: #7784ba;
}



###   改变字体：


 
 `font:
  enable: true
  #Uri of fonts host. E.g. //fonts.googleapis.com (Default)
  host: //fonts.css.network
  #Global font settings used on <body> element.
  global:
    # external: true will load this font family from host.
    external: true
    family: Lato
  #Font settings for Headlines (h1, h2, h3, h4, h5, h6)
  #Fallback to 'global' font settings.
  headings:
    external: true
    family:
  #Font settings for posts
  #Fallback to 'global' font settings.
  posts:
    external: true
    family:
  #Font settings for Logo
  #Fallback to 'global' font settings.
  #The 'size' option use 'px as unit
  logo:
    external: true
    family:
    size:
  #Font settings for <code> and code blocks.
  codes:
    external: true
    family: Iosevka
    size: 12
`

### 首页的文章添加图片描述：



![upload successful](/images/my_blog_54.png)


### 将HEXO博客同时放在码云和github上：

国内的速度你懂的~~

[https://blog.csdn.net/qq_28804275/article/details/80891969](https://blog.csdn.net/qq_28804275/article/details/80891969)

[https://purewhite.io/2017/04/29/hexo-baidu-url-submit/](https://purewhite.io/2017/04/29/hexo-baidu-url-submit/)

在码云注册账号等操作自行百度吧，这其中就涉及到，码云是自带HTTPS的，github上也可以进行设置，可是我的云主机中看板你那个的API是HTTP的所以会报错，解决办法就是将看板娘的API也弄成HTTPS的，具体操作在下节给出，简直完美，以后不准备把博客托管在github上了，发现更新有延迟....

让网站永久拥有HTTPS - 申请免费SSL证书并自动续期

[https://blog.csdn.net/xs18952904/article/details/79262646](https://blog.csdn.net/xs18952904/article/details/79262646)

最后我决定托管到编码上，为什么？因为腾讯和编码合作了，以后你懂的~~~~嘿嘿嘿。

具体的操作流程自己百度吧，很简单~~~~

不过托管到编码上有个很大的坑：申请SSL总是不通过!!!!!!

具体请看我的另一篇文章：[https](https://blog.csdn.net/dataiyangu/article/details/83374438) ：[//blog.csdn.net/dataiyangu/article/details/83374438](https://blog.csdn.net/dataiyangu/article/details/83374438)

### 将HEXO博客推送给百度和谷歌搜索引擎：

推荐阅读：

[https://blog.csdn.net/qq_32454537/article/details/79482914](https://blog.csdn.net/qq_32454537/article/details/79482914)

[https://blog.csdn.net/qq_28804275/article/details/80891969](https://blog.csdn.net/qq_28804275/article/details/80891969)

自动推送只需要将baidu\_push改为真正在THIRD\_PARTY / SEO文件夹下有JS代码，会自动提交。

[https://cherryblog.site/hexo-3.html](https://cherryblog.site/hexo-3.html)

有时候会报下面的错是因为，我的google开启了广告过滤的插件
![upload successful](/images/my_blog_57.png)关掉就行了。屏蔽了百度的js代码：

错误如下：

api.share.baidu.com/s.gif?l=http://localhost:4000/:1 GET http://api.share.baidu.com/s.gif?l=http://localhost:4000/ net::ERR\_EMPTY\_RESPONSE  
Image (async)  
(anonymous) @ push.js:1  
(anonymous) @ push.js:1  
VM2131:48 /x/

特别注意：

以后验证网站所有权，请直接选用下载文件到域名根目录（也就是我们的源目录下面，hexo g -d就完成了），千万别选添加域名解析，你会等到地老天荒的~~~~~ ~~~~

还有我的百度的解析还没成功，听说百度的速度比较慢~~~~

### hexo g -d报错：

fatal: not a git repository (or any of the parent directories): .git  
FATAL Something's wrong. Maybe you can find the solution here: http://hexo.io/docs/troubleshooting.html  
Error: fatal: not a git repository (or any of the parent directories): .git

    at ChildProcess.<anonymous> (/Users/leesin/Desktop/blog/node_modules/hexo-util/lib/spawn.js:37:17)  
    at emitTwo (events.js:126:13)  
    at ChildProcess.emit (events.js:214:7)  
    at maybeClose (internal/child_process.js:915:16)  
    at Process.ChildProcess.\_handle.onexit (internal/child\_process.js:209:5)

原因:mac 更新后缺少xcode插件，无法进行git操作，运行下面的命令进行安装

xcode-select --install
### 修改文章的置顶问题
修改Hexo文件夹下的node_modules/hexo-generator-index/lib/generator.js
 >'use strict';
 >var pagination = require('hexo-pagination');
 >
 >module.exports = function(locals) {
 >  var config = this.config;
 >  var posts = locals.posts.sort(config.index_generator.order_by);
 >
 >  posts.data = posts.data.sort(function(a, b) {
 >      if(a.top && b.top) {
 >          if(a.top == b.top) return b.date - a.date;
 >          else return b.top - a.top;
 >      }
 >      else if(a.top && !b.top) {
 >          return -1;
 >      }
 >      else if(!a.top && b.top) {
 >          return 1;
 >      }
 >      else return b.date - a.date;
 >  });
 >
 >  var paginationDir = config.pagination_dir || 'page';
 >
 >  return pagination('', posts, {
 >    perPage: config.index_generator.per_page,
 >    layout: ['index', 'archive'],
 >    format: paginationDir + '/%d/',
 >    data: {
 >      __index: true
 >    }
 >  });
 >};
 
 每篇文章加top值，值越大越靠前
 或者：
 >$ npm uninstall hexo-generator-index --save
 >$ npm install hexo-generator-index-pin-top --save
 top: true
 
 打开：/blog/themes/next/layout/_macro 目录下的post.swig文件，定位到<div class="post-meta">标签下，插入如下代码：
  
 >{% if post.top %}
 >            <i class="fa fa-thumb-tack"></i>
 >            <font color=7D26CD>置顶</font>
 >            <span class="post-meta-divider">|</span>
 >          {% endif %}

效果图：
![upload successful](/images/my_blog_58.png) 
### seo优化
> * 网站外链的推广度、数量和质量
> 
> * 网站的内链足够强大
> 
> * 网站的原创质量
>  
> * 网站的年龄时间
>  
> * 网站的更新频率（更新次数越多越好）
>  
> * 网站的服务器
>  
> * 网站的流量：流量越高网站的权重越高
> 
> * 网站的关键词排名：关键词排名越靠前，网站的权重越高
>  
> * 网站的收录数量：网站百度收录数量越多，网站百度权重越高
>  
> * 网站的浏览量及深度：用户体验越好，网站的百度权重越高
>

### 增加阅读排行的页面
效果如本网站中的排行，
参考：[https://hoxis.github.io/hexo-next-read-rank.html](https://hoxis.github.io/hexo-next-read-rank.html)
诸葛是基于Leancloud的，请自行上网搜索进行注册等相关操作。[https://blog.csdn.net/weixin_39345384/article/details/80787998](https://blog.csdn.net/weixin_39345384/article/details/80787998)
**注意可能有时候会出现显示不出来的情况，这并不是md中添加的代码有问题，是Leancloud配置的问题
解决：在next主题下的——config.yml中搜索Leancloud
修改：
leancloud_visitors:
  enable: true
  app_id: 你的app_id
  app_key: 你的app_key**
 
