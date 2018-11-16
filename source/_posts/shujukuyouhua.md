title: 数据库优化
author: Leesin.Dong
tags:
  - interview
  - 数据库
categories:
  - 基础亦是进阶
  - 数据库基础知识
date: 2018-11-09 00:06:00
---
[优化1——数据库优化面试题](http://blog.csdn.net/u010796790/article/details/52194850)
=========================================================================

1.**实践中如何优化[MySQL](http://lib.csdn.net/base/mysql)**

1) SQL语句及索引的优化

2) [数据库](http://lib.csdn.net/base/mysql)表结构的优化

3) 系统配置的优化

4) 硬件优化

2.**索引的底层实现原理和优化**

在 DB2 数据库中索引采用的是 B+ 树的结构，索引的叶子节点上包含索引键的值和一个指向数据地址的指针。DB2 先查询索引，然后通过索引里记录的指针，直接访问表的数据页。

B+树。B+树是应数据库所需而出现的一种B树的变形树。

B+树的特点：

（1）所有叶节点包含全部关键字及指向相应记录的指针，而且叶节点中将关键字按大小顺序排列，并且相邻叶节点按大小顺序相互链接起来。

（2）所有分支节点（可看做索引的索引）中仅包含它的各个子节点（即下一级的索引块）中关键字的最大值即指向其子节点的指针。

（3）B+树中，叶节点包含信息，所有非叶结点仅起到索引作用，非叶节点中的每个索引项只含有对应子树的最大关键字和指向该子树的指针，不含有该关键字对应记录的存储地址。

（4）叶节点包含了所有的关键字，即在非叶节点出现的关键字也会出现在叶子节点中。

B+树有两个头指针，一个指向根节点，另一个指向关键字最小的叶节点。B+树进行两种查找运算：从最小关键字开始的顺序查找，另一种从根节点开始的多路查找。

**原理：叶子节点是按关键字大小顺序排列，且增加了指向下一个叶子节点的指针。**

**优化：InnoDB建议大部分表使用默认的自增的主键作为索引**

**MsSql、DB2使用的是B+Tree，[Oracle](http://lib.csdn.net/base/oracle)及Sysbase使用的是B-Tree**

SQL语句的优化
========

1) **尽量避免耗时操作。**

带有DISTINCT,UNION,MINUS,INTERSECT,ORDER BY的SQL语句会启动SQL引 执行，耗费资源的排序(SORT)功能。DISTINCT需要一次排序操作, 而其他的至少需要执行两次排序

2) **如果无需排除重复值或是操作集无重复则用UNION ALL， UNION更费事（因为要比较）**

UNION因为会将各查询子集的记录做比较，故比起UNION ALL ，通常速度都会慢上许多。一般来说，如果使用UNION ALL能满足要求的话， 务必使用UNION ALL。还有一种情况大家可能会忽略掉，就是虽然要求几个子集的并集需要过滤掉重复记录，但由于脚本的特殊性，不可能存在重复记录，这时便应该使用UNION ALL，如xx模块的某个查询程序就曾经存在这种情况，见，由于语句的特殊性，在这个脚本中几个子集的记录绝对不可能重复，故可以改用UNION ALL）连接操作

3) **避免在WHERE子句中使用in，not  in，or 或者having。**  
可以使用 exist 和not exist代替 in和not in。  
可以使用表链接代替 exist。  
Having可以用where代替，如果无法代替可以分两步处理。  
例子

**\[java\]** [view plain](http://blog.csdn.net/u010796790/article/details/52194850#) [copy](http://blog.csdn.net/u010796790/article/details/52194850#) [![在CODE上查看代码片](https://code.csdn.net/assets/CODE_ico.png)](https://code.csdn.net/snippets/1826644)[![派生到我的代码片](https://code.csdn.net/assets/ico_fork.svg)](https://code.csdn.net/snippets/1826644/fork)

1.  SELECT * FROM ORDERS WHERE CUSTOMER_NAME NOT IN  
2.  (SELECT CUSTOMER_NAME FROM CUSTOMER)  

优化

**\[java\]** [view plain](http://blog.csdn.net/u010796790/article/details/52194850#) [copy](http://blog.csdn.net/u010796790/article/details/52194850#) [![在CODE上查看代码片](https://code.csdn.net/assets/CODE_ico.png)](https://code.csdn.net/snippets/1826644)[![派生到我的代码片](https://code.csdn.net/assets/ico_fork.svg)](https://code.csdn.net/snippets/1826644/fork)

1.  SELECT * FROM ORDERS WHERE CUSTOMER_NAME not exist  
2.  (SELECT CUSTOMER_NAME FROM CUSTOMER)  

4) **不要在建立的索引的数据列上进行下列操作:**  
（1）避免对索引字段进行计算操作

（2）避免在索引字段上使用not，<>，!=

（3）避免在索引列上使用IS NULL和IS NOT NULL

（4）避免在索引列上出现数据类型转换

（5）**避免在索引字段上使用函数**

例如：where trunc(create_date)=trunc(:date1)  
虽然已对create_date 字段建了索引，但由于加了TRUNC，使得索引无法用上。此处正确的写法应该是  
where create\_date>=trunc(:date1) and create\_date

（6）避免建立索引的列中使用空值。

5) **查询的模糊匹配**

尽量避免在一个复杂查询里面使用 LIKE '%parm1%'—— 红色标识位置的百分号会导致相关列的索引无法使用，最好不要用。

解决办法:

其实只需要对该脚本略做改进，查询速度便会提高近百倍。改进方法如下：

a、修改前台程序——把查询条件的供应商名称一栏由原来的文本输入改为下拉列表，用户模糊输入供应商名称时，直接在前台就帮忙定位到具体的供应商，这样在调用后台程序时，这列就可以直接用等于来关联了。

b、直接修改后台——根据输入条件，先查出符合条件的供应商，并把相关记录保存在一个临时表里头，然后再用临时表去做复杂关联

6) **避免使用临时表**  
(1)除非却有需要，否则应尽量避免使用临时表，相反，可以使用表变量代替;  
(2)大多数时候(99%)，表变量驻扎在内存中，因此速度比临时表更快，临时表驻扎在TempDb数据库中，因此临时表上的操作需要跨数据库通信，速度自然慢。

**可以使用联合(UNION)来代替手动创建的临时表**

MySQL 从 4.0 的版本开始支持 UNION 查询，它可以把需要使用临时表的两条或更多的 SELECT 查询合并的一个查询中。在客户端的查询会话结束的时候，临时表会被自动删除，从而保证数据库整齐、高效。使用 UNION 来创建查询的时候，我们只需要用UNION作为关键字把多个SELECT语句连接起来就可以了，要注意的是所有 SELECT 语句中的字段数目要想同。下面的例子就演示了一个使用 UNION的查询。

代码如下:

**\[java\]** [view plain](http://blog.csdn.net/u010796790/article/details/52194850#) [copy](http://blog.csdn.net/u010796790/article/details/52194850#) [![在CODE上查看代码片](https://code.csdn.net/assets/CODE_ico.png)](https://code.csdn.net/snippets/1826644)[![派生到我的代码片](https://code.csdn.net/assets/ico_fork.svg)](https://code.csdn.net/snippets/1826644/fork)

1.  SELECT Name, Phone FROM client UNION SELECT Name, BirthDate FROM author  
2.  UNION  
3.  SELECT Name, Supplier FROM product  

7) **尽量少做重复的工作**  
尽量减少无效工作，但是这一点的侧重点在客户端程序，需要注意的如下：  
A、 控制同一语句的多次执行，特别是一些基础数据的多次执行是很多程序员很少注意的  
B、减少多次的数据转换，也许需要数据转换是设计的问题，但是减少次数是程序员可以做到的。  
C、杜绝不必要的子查询和连接表，子查询在执行计划一般解释成外连接，多余的连接表带来额外的开销。  
D、**合并对同一表同一条件的多次UPDATE**，比如  
UPDATE EMPLOYEE SET FNAME='HAIWER' WHERE EMP_ID=' VPA30890F'  
UPDATE EMPLOYEE SET LNAME='YANG' WHERE EMP_ID=' VPA30890F'  
这两个语句应该合并成以下一个语句  
UPDATE EMPLOYEE SET FNAME='HAIWER',LNAME='YANG'  
WHERE EMP_ID=' VPA30890F'  
E、**UPDATE操作不要拆成DELETE操作+INSERT操作的形式，虽然功能相同，但是性能差别是很大的。**  
F、不要写一些没有意义的查询，比如  
SELECT * FROM EMPLOYEE WHERE 1=2

**Where后面的原则**

第一个原则：在where子句中应把最具限制性的条件放在最前面。

第二个原则：where子句中字段的顺序应和索引中字段顺序一致。

select field3,field4 from tb where upper(field2)='RMN'不使用索引。  
如果一个表有两万条记录，建议不使用函数；如果一个表有五万条以上记录，严格禁止使用函数！两万条记录以下没有限制。

3.**什么情况下设置了索引但无法使用，索引无效**

1) 以”%”开头的LIKE语句，模糊匹配：红色标识位置的百分号会导致相关列的索引无法使用

2) Or语句前后没有同时使用索引

3) 数据类型出现隐式转化（如varchar不加单引号的话可能会自动转换为int型，会使索引无效，产生全表扫描。）

4) 在索引列上使用IS NULL 或IS NOT NULL操作。索引是不索引空值的，所以这样的操作不能使用索引，可以用其他的办法处理，例如：数字类型，判断大于0，字符串类型设置一个默认值，判断是否等于默认值即可

5) 在索引字段上使用not，<>，!=，eg<> 操作符（不等于）：不等于操作符是永远不会用到索引的，因此对它的处理只会产生全表扫描。 用其它相同功能的操作运算代替，如 a<>0 改为 a>0 or a<0

6) 对索引字段进行计算操作

7) 在索引字段上使用函数

4.**如何设计一个高并发的系统**

1) 数据库的优化，包括合理的事务隔离级别、SQL语句优化、索引优化

2) 使用缓存、尽量减少数据库IO

3) 分布式数据库、分布式缓存

4) 服务器的负载均衡

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()