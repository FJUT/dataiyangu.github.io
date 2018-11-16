title: linux 终端 shell快捷键
author: Leesin.Dong
tags:
  - 终端
  - linux
categories:
  - 编码辅助工具
  - 终端
date: 2018-11-11 22:30:00
---
删除  
ctrl + d      删除光标所在位置上的字符相当于VIM里x或者dl  
ctrl + h      删除光标所在位置前的字符相当于VIM里hx或者dh  
ctrl + k      删除光标后面所有字符相当于VIM里d shift+$  
ctrl + u      删除光标前面所有字符相当于VIM里d shift+^  
ctrl + w      删除光标前一个单词相当于VIM里db  
ctrl + y      恢复ctrl+u上次执行时删除的字符  
ctrl + ?      撤消前一次输入  
alt  + r      撤消前一次动作  
alt  + d     删除光标所在位置的后单词  
  
移动  
ctrl + a      将光标移动到命令行开头相当于VIM里shift+^  
ctrl + e      将光标移动到命令行结尾处相当于VIM里shift+$  
ctrl + f      光标向后移动一个字符相当于VIM里l  
ctrl + b      光标向前移动一个字符相当于VIM里h  
ctrl + 方向键左键    光标移动到前一个单词开头  
ctrl + 方向键右键    光标移动到后一个单词结尾  
ctrl + x       在上次光标所在字符和当前光标所在字符之间跳转  
alt  + f      跳到光标所在位置单词尾部  
  
  
替换  
ctrl + t       将光标当前字符与前面一个字符替换  
alt  + t     交换两个光标当前所处位置单词和光标前一个单词  
alt  + u     把光标当前位置单词变为大写  
alt  + l      把光标当前位置单词变为小写  
alt  + c      把光标当前位置单词头一个字母变为大写  
^oldstr^newstr    替换前一次命令中字符串     
  
历史命令编辑  
ctrl + p   返回上一次输入命令字符  
ctrl + r       输入单词搜索历史命令  
alt  + p     输入字符查找与字符相接近的历史命令  
alt  + >     返回上一次执行命令  
  
其它  
ctrl + s      锁住终端  
ctrl + q      解锁终端  
ctrl + l        清屏相当于命令clear  
ctrl + c       另起一行  
ctrl + i       类似TAB健补全功能  
ctrl + o      重复执行命令  
alt  + 数字键  操作的次数

实际操作:

#c+l  清屏先  
minuit@suse:~>str1 str2 str3  #输入三个单词发现第一单词需要大写好按c+a跳到开头按a+c  
  
minuit@suse:~> Str1 str2 str3  #好现在单词就变成了现在这个样子,又发现第二个单词要全大写(这样的命令真是玩死人:( )好吧如果你当前光标在第二个单词,那直接a+u把这个单词改变,如果不在的话那按住c+a接着c+f跳到第二个单词那再a+u就OK了结果像下面所示。  
  
minuit@suse:~> Str1 STR2 str3   #我想换过来怎么办我的位置已经在最后一个单词这个好办按住a+2+b哈哈跳到了第二个单词再来一下a+l这下第二个单词全小写了  
  
minuit@suse:~> welcome to chinaunix!   #不就是变个大小写吗? 按住c+a接着a+3+c看看效果  
minuit@suse:~> Welcome To Chinaunix!  #GOOD很简单  
我们再来试试替换  
minuit@suse:~> Welcome To Chinaunix!  #还是这三单词c+a跳到开头再接着跳到第二个单词那(因为a+t只能跟前一个单词做替换所以不能在第一个单词按a+t)按住a+t  
minuit@suse:~> To Welcome Chinaunix!  #现在成这样子的了如果我用再按a+2+t那又变了一个样  
minuit@suse:~> Chinaunix!  Welcome To   #好了来一点比较常用的  
minuit@suse:~>ls /tmp/               #看看下面有些什么  
file1 file2 file3 ..... ..   
minuit@suse:~>^ls^cd         #现在再又想进入目录很简单的健入替换命令就行了在命令很长时用这个替换可以省掉很多按a+b或a+f的时间  
cd /tmp/  
minuit@suse:/tmp>   #进入了tmp目录了  
跳转的命令就不试了大家自己体会试也看不见^_^     
  
\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-  
**Ctrl + a 可以快速切换到命令行开始处  
Ctrl + e 切换到命令行末尾  
Ctrl + r 在历史命令中查找  
Ctrl + u 删除光标所在位置之前的所有字符  
Ctrl + k 删除光标所在位置之后的所有字符  
ctrl + w 删除光标之前的一个单词  
Ctrl + d 结束当前输入、退出shell  
ctrl + s 可用来停留在当前屏 ctrl + q 恢复刷屏  
ctrl + l 清屏  
  
CTRL 键相关的快捷键:  
  
Ctrl + a - Jump to the start of the line  
Ctrl + b - Move back a char  
Ctrl + c - Terminate the command  //用的最多了吧?  
Ctrl + d - Delete from under the cursor  
Ctrl + e - Jump to the end of the line  
Ctrl + f - Move forward a char  
Ctrl + k - Delete to EOL  
Ctrl + l - Clear the screen  //清屏，类似 clear 命令  
Ctrl + r - Search the history backwards  //查找历史命令  
Ctrl + R - Search the history backwards with multi occurrence  
Ctrl + u - Delete backward from cursor // 密码输入错误的时候比较有用  
Ctrl + xx - Move between EOL and current cursor position  
Ctrl + x @ - Show possible hostname completions   
Ctrl + z - Suspend/ Stop the command  
补充:  
Ctrl + h - 删除当前字符  
Ctrl + w - 删除最后输入的单词   
  
ALT 键相关的快捷键:  
  
平时很少用。有些和远程登陆工具冲突。  
  
Alt + < - Move to the first line in the history  
Alt + > - Move to the last line in the history  
Alt + ? - Show current completion list  
Alt + * - Insert all possible completions  
Alt + / - Attempt to complete filename  
Alt + . - Yank last argument to previous command  
Alt + b - Move backward  
Alt + c - Capitalize the word  
Alt + d - Delete word  
Alt + f - Move forward  
Alt + l - Make word lowercase  
Alt + n - Search the history forwards non-incremental  
Alt + p - Search the history backwards non-incremental  
Alt + r - Recall command  
Alt + t - Move words around  
Alt + u - Make word uppercase  
Alt + back-space - Delete backward from cursor   
// SecureCRT 如果没有配置好，这个就很管用了。  
  
其他特定的键绑定:  
  
输入 bind -P 可以查看所有的键盘绑定。这一系列我觉得更为实用。  
  
Here "2T" means Press TAB twice  
$ 2T - All available commands(common) //命令行补全，我认为是 Bash 最好用的一点   
$ (string)2T - All available commands starting with (string)  
$ /2T - Entire directory structure including Hidden one  
$ ./2T - Only Sub Dirs inside including Hidden one  
$ *2T - Only Sub Dirs inside without Hidden one  
$ ~2T - All Present Users on system from "/etc/passwd" //第一次见到，很好用  
$ $2T - All Sys variables //写Shell脚本的时候很实用  
$ @2T - Entries from "/etc/hosts"  //第一次见到  
$ =2T - Output like ls or dir //好像还不如 ls 快捷  
补充:  
Esc + T - 交换光标前面的两个单词**

表2-1                                                         浏览命令行的击键

击键

全名

含义

Ctrl+F

字符向前

向前移动一个字符

Ctrl+B

字符向后

向后移动一个字符

Alt+F

单词向前

向前移动一个单词

Alt+B

单词向后

向后移动一个单词

Ctrl+A

行头

到当前行的开始

Ctrl+E

行尾

到行的末尾

Ctrl+L

清屏

清除屏幕，并在屏幕顶端留下一行

表2-2中的击键可以用来编辑命令行。

表2-2                                                         编辑命令行的击键

击键

全名

含义

Ctrl+D

删除当前内容

删除当前字符

Backspace或Rubout

删除以前内容

删除前一个字符

Ctrl+T

调换字符

交换当前字符和前一个字符的位置

Alt+T

调换单词

交换当前单词和前一个单词的位置

Alt+U

大写单词

将当前单词变为大写

Alt+L

小写单词

将当前单词变为小写

Alt+C

首字母大写

将当前单词的首字母变为大写

Ctrl+V

插入特殊字符

添加特殊字符。例如，按Ctrl+V+Tab可添加一个Tab字符

使用表2-3中的击键可在命令行上剪切和粘贴文本。

表2-3                                           在命令行上剪切和粘贴文本的击键

击键

全名

含义

Ctrl+K

剪切行尾

剪切文本到该行末尾

Ctrl+U

剪切行头

剪切文到该行开头

Ctrl+W

剪切前个单词

剪切光标前的一个单词

Alt+D

剪切下个单词

剪切光标后的一个单词

Ctrl+Y

粘贴最近的文本

粘贴最近剪切的文本

Alt+Y

粘贴早期的文本

轮回到先前剪切的文本并粘贴它

Ctrl+C

删除整行

删除一整行

表2-4                                                     用于文本补全的组合键

组合键

用于

Alt+～

用用户名补全文本

Alt+$

用变量补全文本

Alt+@

用主机名补全文本

Alt+!

用命令名（以别名、保留字、**shell**函数、**shell**内置命令和文件名的顺序依次检查）补全文本。换句话说，用以前运行过的命令补全这个按键序列

Ctrl+X+/

列出可能的补全用户名文本

Ctrl+X+$

列出可能的补全环境变量

Ctrl+X+@

列出可能的补全主机名

Ctrl+X+！

列出可能的补全命令名

表2-5                                                       使用命令历史的击键

键

功  能  名

描    述

方向键  
（↑或↓）

步进

按上和下箭头可步进浏览历史列表中的每个命令行，直到所需的位置（Ctrl+P和Ctrl+N分别有同样的功能）

Ctrl+R

反向渐进搜索

按下这些键后，输入一个搜索字符串进行反向搜索。输入此字符串后，匹配的命令行即会出现，可以运行或编辑它

Ctrl+S

前向渐进搜索

与前一个功能相似，只不过是前向搜索

**Alt+P**

反向搜索

按下这些键后，输入一个字符串进行反向搜索。输入一个字符串并且按Enter键可看到包含该字符串的最近已用命令

Alt+N

前向搜索

与前一个功能类似，只不过是前向搜索

Alt+<

历史列表的开头

到历史列表的第一项

Alt+>

历史列表的末尾

到历史列表的最后一项

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()