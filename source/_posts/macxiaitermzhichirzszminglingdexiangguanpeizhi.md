title: mac下iterm2支持rz sz命令的相关配置
author: Leesin.Dong
tags:
  - 捣蛋鬼
  - mac
  - linux
  - item
  - 终端
categories:
  - 捣蛋鬼
  - mac
date: 2018-11-09 22:57:00
---
1.安装lrzsz，使用brew命令：


 
brew install lrzsz
    
![upload successful](/images/my_blog_131.png)

如果找不到lrzsz，使用以下命令更新brew库：


 
brew update
 

2.下载zmoden脚本

在https://github.com/mmastrac/iterm2-zmodem上将iterm2-send-zmodem.sh 和 iterm2-recv-zmodem.sh脚本下载下来并放到/usr/local/bin/目录下，注意赋予脚本执行的权限

3.配置iterm2 Trigger

打开iterm2 ------  同时按 command和,键 -----》 Profiles ------》  Default -----》 Advanced -----》 Triggers的Edit按钮，在弹出的界面配置以下参数



    Regular expression:\*\*B0100
    Action: Run Silent Coprocess
    Parameters: /usr/local/bin/iterm2-send-zmodem.sh

    Regular expression:\*\*B00000000000000
    Action: Run Silent Coprocess
    Parameters: /usr/local/bin/iterm2-recv-zmodem.sh
如图：


![upload successful](/images/my_blog_132.png)

然后就可以使用sz和rz命令了

参考：https://github.com/mmastrac/iterm2-zmodem中的readme