title: linux 下的vi vim快捷键，命令总结。
author: Leesin.Dong
tags:
  - linux
  - vim
  - ''
categories:
  - linux
  - linux命令
date: 2018-11-11 22:35:00
---
版权声明：本文为作者原创，转载请注明出处，联系qq：32248827 https://blog.csdn.net/dataiyangu/article/details/82743939

首先是vim三种命令的切换。

> 命令模式——>:——>末行模式
> 
> 命令模式——>i——>编辑模式
> 
> 编辑模式——>esc（一次或者多次）——>命令模式

命令模式：
-----

> 代码格式化：gg=G（即连续按2个g，再按=，再按G）

光标的移动:

> 到行首：shift+6
> 
> 到行末：shift+4（推荐）或者shift+0，shift+4前面可加数字，1+shift+4是当前行末，2+shift+4是下一行末
> 
> 进入编辑行首：I
> 
> 进入编辑行末：A
> 
> 文件开头：gg
> 
> 文件末尾：G
> 
> 到某航开头:n+G
> 
> 到某行末尾:n+$
> 
> 向下n行：n+回车
> 
> 到指定的行：1.ngg/nG      2.：n        vim    +n    filename(必须输入加号)
> 
> 向前跳一个单词：b
> 
> 向后挑一个单词：e

撤销操作

> 撤销：u
> 
> 反撤销：control+r

删除操作

> 删除光标后面的字符：x
> 
> 删除光标前面的字符：X
> 
> 删除一个单词：dw（注意保证光标在单词的最前面，不然只能删除光标后面的部分）
> 
> dw            删除到下一个单词开头
> de            删除到本单词末尾
> dE            删除到本单词末尾包括标点在内
> db            删除到前一个单词
> dB            删除到前一个单词包括标点在内
> 
> 很明显，d是delete的缩写，而上面的x则是老式的清除意思
> 
> 这里e表示往前删除一个单词，b表示往后删除一个单词，第一节中移动写的很清楚
> 
> 要注意的是e b会忽略标点，如don't，它们会把这当做三个单词don、‘ 和 t 来删除
> 
> 而大写的E B则不会
> 
> 删除当前行光标前面部分：d0
> 
> 删除当前行光标后面部分：D或者d$
> 
> 删除当前行（整行）：dd
> 
> 删除多行：ndd（如10dd，即从当前位置起，往下删除10行（包括当前行））
> 
> 删除当前位置后面的所有内容：dG（包括当前行）
> 
> 删除当前位置前面的所有内容：dgg（包括当前行）
> 
> 温馨提示：vim中的删除其实是剪切操作，删除的内容可以用p命令粘贴

复制操作

> 选中：v       复制：y
> 
> 同一文件内copy：yy （当前行）      nyy （向下n行）     p
> 
> 不同文件内copy：+yy （当前行）   +nyy （向下n行）      +p     +号粘贴板是系统的粘贴板，可以实现不同文件的复制粘贴
> 
> 不同文件copy方法二：1.vim  文件一， 末行模式“：sp” （横向），“：vsp”（纵向）切分一个窗口（sp和vsp都不括引号）也是文件一
> 
>                                     2.通过control+w+w切换上下窗口，在其中的一个窗口“：e     文件二名”，进行编辑文件二
> 
>                                     3.相当于在一个vim中进行编辑，可通过 yy    nyy    p的方式进行copy

查找操作

> ：/字符串
> 
> 如：/helloword
> 
> 取消高亮
> 
> ：noh

翻页操作

> 整页翻页 ctrl-f ctrl-b  
> f就是forword b就是backward
> 
> 翻半页  
> ctrl-d ctlr-u  
> d=down u=up
> 
> 滚一行  
> ctrl-e ctrl-y
> 
> zz 让光标所杂的行居屏幕中央  
> zt 让光标所杂的行居屏幕最上一行 t=top  
> zb 让光标所杂的行居屏幕最下一行 b=bottom

全选操作

> ggVG   
> 解释：  
> gg 让光标移到首行，在**vim**才有效，vi中无效   
> V   是进入Visual(可视）模式   
> G  光标移到最后一行 

末行模式：
-----

> 退出保存：ZZ    w     wq        q!

### 批量注释：

用v进入virtual模式

用上下键选中需要注释的行数

按Control+v（win下面ctrl+q）进入列模式

按大些“I”进入插入模式，输入注释符“#”或者是"//"，然后立刻按下ESC（两下

### **取消批量注释：**

Ctrl + v 进入块选择模式，选中你要删除的行首的注释符号，注意// 要选中两个，选好之后按d即可删除注释

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()