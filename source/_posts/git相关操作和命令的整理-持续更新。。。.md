title: 'git相关操作和命令的整理,持续更新。。。'
author: Leesin.Dong
tags:
  - git
categories:
  - 编码辅助工具
  - git
date: 2018-11-11 23:27:00
---
版权声明：本文为作者原创，转载请注明出处，联系qq：32248827 https://blog.csdn.net/dataiyangu/article/details/81082735

之前只会用图形端的GIT中，命令行的比较陌生，整理下，供自己以后参考

关键的名词：

*   工作区：工作区
*   Index / Stage：暂存区
*   仓库：仓库区（或本地仓库）
*   远程控制：远程仓库


![upload successful](/images/my_blog_214.png)

![upload successful](/images/my_blog_215.png)

![upload successful](/images/my_blog_216.png)

1：到项目目录下

> git init

在文件夹中生成.git文件，后续的git add和git commit操作会将相关的文件存在.git文件中

2。

> git pull

在工作目录中获取并合并远端仓库的改动。

3。

> git remote rm origin
> 
> git remote add origin ssh：// xxxxxxxxxxxx

添加远程仓库，显写rm是因为可能会报错**：远程原点已经存在。**

4。

> git clone“”

下载文件到本地

5。

> 1\. git branch | 2git branch -r / -a | 3git branch xxx | 4git branch -d xxx | 5git checkout xxx | 6git checkout -b xxx | 7git branch -u origin / xxx或者git branch `--set-upstream-to` origin / xxx | 8git branch -vv

1.查看本地分支| 2查看远程/所有分支| 3创建分支| 4删除本地分支| 5切换分支| 6切换分支没有就创建| 7将本地分支与远程分支关联| 8查看本地分支详细信息查看与远程分支的追踪关系

6。

> git add。git add xxx

添加全部修改的代码，或添加部分修改的代码，添加到暂存区索引/阶段

整理：

>   git add -A提交所有变化
> 
>   git add -u提交被修改（已修改）和被删除（已删除）文件，不包括新文件（新）
> 
>   git add。提交新文件（新）和被修改（修改）文件，不包括被删除（删除）文件

7。

> git commit -m“”

提交代码到本地仓库库

>  git commit --amend

新的-m commit描述并不能更新，运行此命令可以有机会重新编辑-m的描述

8。

> git push origin xxx（本地）：xxx（远程）

推到远程仓库远程

> git push origin xxx 

省略远程分支，默认上传到与本地分支对应的仓库，没有会创建

> git push origin：xxx

省略本地分支，相当于删除远程分支，因为给了空值

> git push origin 

本地分支与远程分支有对应关系，都可以省略

> git push 

本地分支只有一个对应的远程分支，则都可以省略

**骚操作：追踪远程分支的其他方法**

*   ①进入当前项目根目录的'.git'文件夹（请自行设置显示隐藏文件）。打开配置文件（注意不要用window记事本打开）。
*   ② `[remote "origin"]`这一项的英文修改对应远程GIT中仓库地址。
*   ③ `[branch "master"]`这一项的英文修改本地分支'主'的远程追踪关系分支，修改直接`merge = refs/heads/master`为`merge = refs/heads/dev`
*   ④再次通过命令行查看状态就可以发现你的远程分支已经改掉。
*   ⑤可能出现的问题补充： 
    *   没有`[branch "master"]`这一怎么办？   
        如果是新项目，没有git pull或git clone，就不会与远程分支建立关系，或者也可以自己添加这一项，但不建议。

**注意：有时候git pull报如下的错误**：

> 自动合并失败：修复冲突然后提交结果

> 是因为git pul = git fetch + git merge

在git merge的过程中存在合并冲突，合并冲突包括：

1.多个代码更改发生在同一行

2.一个提交删除了问价，另一个提交准备编辑该文件

解决：通过git status中的

>    两者都修改过：XXX可以看到发生冲突合并的文件。

> <<<<<<<<<< HEAD
> 
> 提交一的代码
> 
> ============
> 
> 提交二的代码
> 
> >>>>>>>>>>分支-a

自己手动修改是要保留提交一还是保留提交二，还是两者都保留或者删除。

如果是文件的话，根据是否需要添加或者删除该文件

> git add xxx

> git rm xxx   

git commit会将rm的操作提交上去，单纯的rm xxx不会将历史提交，可以通过git commit -a进行提交

之后依然是之前的操作git add。git commit -m“”git pull git push 

Git的忽略提交规则：
===========

**\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-**
====================================================================

相关知识参考资料：
=========

1\. [https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%AE%B0%E5%BD%95%E6%AF% 8F％E6％AC％A1％E6％9B％B4％E6％96％B0％E5％88％B0％E4％BB％93％E5％BA％93](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%AE%B0%E5%BD%95%E6%AF%8F%E6%AC%A1%E6%9B%B4%E6%96%B0%E5%88%B0%E4%BB%93%E5%BA%93)（推荐）

2\. [https://blog.csdn.net/killsamaritan/article/details/53510999](https://blog.csdn.net/killsamaritan/article/details/53510999)

3\. [https://blog.csdn.net/qq_26341621/article/details/54944250](https://blog.csdn.net/qq_26341621/article/details/54944250)

以下怕看着乱的话看另外一个文章，单独列出来了：[git忽略提交规则](https://blog.csdn.net/dataiyangu/article/details/82781155)

### 的.gitignore只会对没有被跟踪的，即没有被添加的文件进行忽略。

**的.gitignore的文件使用方法**  
首先，在你的工作区新建一个名称为的.gitignore的文件。  
然后，把要忽略的文件名填进去，GIT中就会自动忽略这些文件。  
不需要从头写的.gitignore文件，GitHub的已经为我们准备了各种配置文件，只需要组合一下就可以使用了。

有时对于git项目下的某些文件，我们不需要纳入版本控制，比如日志文件或者IDE的配置文件，此时可以在项目的根目录下建立一个隐藏文件.gitignore（linux下以。开头的文件都是隐藏文件），然后在的.gitignore中写入需要忽略的文件。

1

2

3

4

`[root@kevin ~]``# cat .gitignore`

`*.xml`

`*.log`

`*.apk`

.gitignore注释用'＃'，*表示匹配0个或多个任意字符，所以上面的模式就是要忽略所有的xml文件，日志文件和apk文件。

的.gitignore配置文件用于配置不需要加入版本管理的文件，配置好该文件可以为版本管理带来很大的便利。

**的.gitignore规则忽略优先的级**  
在.gitingore文件中，每一行指定一个忽略规则，GIT中检查忽略规则的时候有多个来源，它的优先级如下（由高到低）：  
1）从命令行中读取可用的忽略规则  
2）当前目录定义的规则  
3）父级目录定义的规则，依次递推  
4）$ GIT_DIR / info / exclude文件中定义的规则  
5）core.excludesfile中定义的全局规则

**.gitignore忽略规则的匹配语法**  
在.gitignore文件中，每一行的忽略规则的语法如下：  
1）**空格**不匹配任意文件，可作为分隔符，可用反斜杠转义  
2）以“ **＃** ”开头的行都会被GIT中忽略。即＃开头的文件标识注释，可以使用反斜杠进行转义。  
3）可以使用标准的**水珠**模式匹配。所谓的圆顶封装模式是指壳所使用的简化了的正则表达式。  
4 ）以斜杠“ **/** ” 开头表示目录;“/”结束的模式只匹配文件夹以及在该文件夹路径下的内容，但是不匹配该文件;“/”开始的模式匹配项目跟目录;如果一个模式不包含斜杠，则它匹配相对于当前.gitignore文件路径的内容，如果该模式不在.gitignore文件中，则相对于项目根目录  
.5）以星号“ ***** ”通配多个字符，即匹配多个任意字符;使用两个星号“ ****** ”表示匹配任意中间目录，比如\`a / ** / z\`可以匹配a / z，a / b / z或a / b / c / z等。  
6）以问号“ **？** ”通配单个 符，即匹配一个任意字符;  
7）以方括号” **\[\]**“包含单个字符的匹配列表，即匹配任何一个列在方括号中的字符比如\[ABC\]表示要么匹配一个一个，要么匹配一个B，要么匹配一个C。;如果在方括号中使用短划线分隔两个字符，表示所有在这两个字符范围内的都可以匹配。比如\[0-9\]表示匹配所有0到9的数字，\[az\]表示匹配任意的小写字母）  
.8）以叹号“ **！**“表示不忽略（跟踪）匹配到的文件或目录，即要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号取反需要特别注意的是（！）：**如果文件的父目录已经被前面的规则排除掉了，那么对这个文件用！ “”规则是不起作用的**。也就是说“！”开头的模式表示否定，该文件将会再次被包含，如果排除了该文件的父级目录，则使用“！”也不会再次被包含。可以使用反斜杠进行转义。

需要谨记：混帐对于.IGNORE配置文件是按行从上到下进行规则匹配的，意味着如果前面的规则匹配的范围更大，则后面的规则将不会生效。

**混帐忽略规则（的.gitignore配置）不生效原因和解决**

1

2

3

4

五

6

7

8

9

10

11

12

13

`.gitignore中已经标明忽略的文件目录下的文件，git push的时候还会出现在push的目录中，或者用git status查看状态，想要忽略的文件还是显示被追踪状态。`

`原因是因为在git忽略目录中，新建的文件在git中会有缓存，如果某些文件已经被纳入了版本管理中，就算是在.gitignore中已经声明了忽略路径也是不起作用的，`

`这时候我们就应该先把本地缓存删除，然后再进行git的push，这样就不会出现忽略的文件了。`

`解决方法:git清除本地缓存（改变成未track状态），然后再提交:`

`[root@kevin ~]``# git rm -r --cached .`

`[root@kevin ~]``# git add .`

`[root@kevin ~]``# git commit -m 'update .gitignore'`

`需要特别注意的是：`

`1）.gitignore只能忽略那些原来没有被track的文件，如果某些文件已经被纳入了版本管理中，则修改.gitignore是无效的。`

`2）想要.gitignore起作用，必须要在这些文件不在暂存区中才可以，.gitignore文件只是忽略没有被staged(cached)文件，`

`对于已经被staged文件，加入ignore文件时一定要先从staged移除，才可以忽略。 `

**在使用的.gitignore后文件删除如何远程仓库中以前上传的此类文件而保留本地文件**  
在使用的git和github上的时候，之前没有写的.gitignore文件，就上传了一些没有必要的文件，在添加了的.gitignore文件后，就想删除远程仓库中的文件却想保存本地的文件。这时候**不可以直接使用“git rm directory”**，这样会删除本地仓库的文件。可以使用“ **git rm -r -cached directory** ”来删除缓冲，然后进行“ **commit** ”和“ **push** ”，这样会发现远程仓库中的不必要文件就被删除了，以后可以直接使用“ **git add -A** ”来添加修改的内容，上传的文件就会受到的.gitignore文件的内容约束。

额外说明：**git库所在的文件夹中的文件大致有4种状态**

1

2

3

4

五

6

7

8

9

10

11

12

13

14

15

16

17

18

`Untracked:`

`未跟踪, 此文件在文件夹中, 但并没有加入到git库, 不参与版本控制. 通过git add 状态变为Staged.`

`Unmodify:`

`文件已经入库, 未修改, 即版本库中的文件快照内容与文件夹中完全一致. 这种类型的文件有两种去处, 如果它被修改,`

`而变为Modified. 如果使用git ``rm``移出版本库, 则成为Untracked文件`

`Modified:`

`文件已修改, 仅仅是修改, 并没有进行其他的操作. 这个文件也有两个去处, 通过git add可进入暂存staged状态,`

`使用git checkout 则丢弃修改过, 返回到unmodify状态, 这个git checkout即从库中取出文件, 覆盖当前修改`

`Staged:`

`暂存状态. 执行git commit则将修改同步到库中, 这时库中的文件和本地文件又变为一致, 文件为Unmodify状态.`

`执行git reset HEAD filename取消暂存, 文件状态为Modified`

`Git 状态 untracked 和 not staged的区别`

`1）untrack     表示是新文件，没有被add过，是为跟踪的意思。`

`2）not staged  表示add过的文件，即跟踪文件，再次修改没有add，就是没有暂存的意思`

**\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-**
====================================================================

阅读更多

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()