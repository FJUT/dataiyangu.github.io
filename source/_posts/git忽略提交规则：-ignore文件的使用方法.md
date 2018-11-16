title: git忽略提交规则： .ignore文件的使用方法
author: Leesin.Dong
tags:
  - git
categories:
  - 编码辅助工具
  - git
date: 2018-11-11 23:25:00
---
版权声明：本文为作者原创，转载请注明出处，联系qq：32248827 https://blog.csdn.net/dataiyangu/article/details/82781155

**.gitignore文件的使用方法**  
首先，在你的工作区新建一个名称为.gitignore的文件。  
然后，把要忽略的文件名填进去，Git就会自动忽略这些文件。  
不需要从头写.gitignore文件，GitHub已经为我们准备了各种配置文件，只需要组合一下就可以使用了。

有时对于git项目下的某些文件，我们不需要纳入版本控制，比如日志文件或者IDE的配置文件，此时可以在项目的根目录下建立一个隐藏文件 .gitignore（linux下以.开头的文件都是隐藏文件），然后在.gitignore中写入需要忽略的文件。

1

2

3

4

`[root@kevin ~]``# cat .gitignore`

`*.xml`

`*.log`

`*.apk`

.gitignore注释用'#', *表示匹配0个或多个任意字符，所以上面的模式就是要忽略所有的xml文件,log文件和apk文件。

.gitignore配置文件用于配置不需要加入版本管理的文件，配置好该文件可以为版本管理带来很大的便利。

**.gitignore忽略规则的优先级**  
在 .gitingore 文件中，每一行指定一个忽略规则，Git检查忽略规则的时候有多个来源，它的优先级如下（由高到低）：  
1）从命令行中读取可用的忽略规则  
2）当前目录定义的规则  
3）父级目录定义的规则，依次递推  
4）$GIT_DIR/info/exclude 文件中定义的规则  
5）core.excludesfile中定义的全局规则

**.gitignore忽略规则的匹配语法**  
在 .gitignore 文件中，每一行的忽略规则的语法如下：  
1）**空格**不匹配任意文件，可作为分隔符，可用反斜杠转义  
2）以“**＃**”开头的行都会被 Git 忽略。即#开头的文件标识注释，可以使用反斜杠进行转义。  
3）可以使用标准的**glob**模式匹配。所谓的glob模式是指shell所使用的简化了的正则表达式。  
4）以斜杠"**/**"开头表示目录；"/"结束的模式只匹配文件夹以及在该文件夹路径下的内容，但是不匹配该文件；"/"开始的模式匹配项目跟目录；如果一个模式不包含斜杠，则它匹配相对于当前 .gitignore 文件路径的内容，如果该模式不在 .gitignore 文件中，则相对于项目根目录。  
5）以星号"*****"通配多个字符，即匹配多个任意字符；使用两个星号"******" 表示匹配任意中间目录，比如\`a/**/z\`可以匹配 a/z, a/b/z 或 a/b/c/z等。  
6）以问号"**?**"通配单个字符，即匹配一个任意字符；  
7）以方括号"**\[\]**"包含单个字符的匹配列表，即匹配任何一个列在方括号中的字符。比如\[abc\]表示要么匹配一个a，要么匹配一个b，要么匹配一个c；如果在方括号中使用短划线分隔两个字符，表示所有在这两个字符范围内的都可以匹配。比如\[0-9\]表示匹配所有0到9的数字，\[a-z\]表示匹配任意的小写字母）。  
8）以叹号"**!**"表示不忽略(跟踪)匹配到的文件或目录，即要忽略指定模式以外的文件或目录，可以在模式前加上惊叹号（!）取反。需要特别注意的是：**如果文件的父目录已经被前面的规则排除掉了，那么对这个文件用"!"规则是不起作用的**。也就是说"!"开头的模式表示否定，该文件将会再次被包含，如果排除了该文件的父级目录，则使用"!"也不会再次被包含。可以使用反斜杠进行转义。

需要谨记：git对于.ignore配置文件是按行从上到下进行规则匹配的，意味着如果前面的规则匹配的范围更大，则后面的规则将不会生效。

**Git忽略规则(.gitignore配置）不生效原因和解决**

1

2

3

4

5

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

**在使用.gitignore文件后如何删除远程仓库中以前上传的此类文件而保留本地文件**  
在使用git和github的时候，之前没有写.gitignore文件，就上传了一些没有必要的文件，在添加了.gitignore文件后，就想删除远程仓库中的文件却想保存本地的文件。这时候**不可以直接使用"git rm directory"**，这样会删除本地仓库的文件。可以使用"**git rm -r –cached directory**"来删除缓冲，然后进行"**commit**"和"**push**"，这样会发现远程仓库中的不必要文件就被删除了，以后可以直接使用"**git add -A**"来添加修改的内容，上传的文件就会受到.gitignore文件的内容约束。

额外说明：**git库所在的文件夹中的文件大致有4种状态**

1

2

3

4

5

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

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()