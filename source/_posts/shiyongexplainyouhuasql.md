title: 使用explain优化sql
author: Leesin.Dong
tags:
  - interview
  - 数据库
categories:
  - 数据库
  - 数据库基础知识
date: 2018-11-08 23:57:00
---
*   720

       对于复杂、效率低的sql语句，我们通常是使用explain sql 来分析sql语句，这个语句可以打印出，语句的执行过程。这样方便我们分析，进行优化。   
![sql语句查询](https://img-blog.csdn.net/20170710145638168?  
![upload successful](/images/my_blog_95.png)
![upload successful](/images/my_blog_96.png)
       首先，说一下，explain查询出来的数据如何分析。   
**table** ：这一列是查询设计的表。   
**type** ：很重要的一列，显示了查询使用了那种类型，是否使用的索引，能反映出语句的质量。一般这个指标从好到坏依次是：system>const>eq\_ref>ref(最好能达到)>fulltext>ref\_or\_null>index\_merge>unique\_subquery>index\_subquery>range>index>ALL   
为了保证查询至少达到range级别。最好达到ref，否则的话，只能说明这条语句性能有待提高。

*   ref 表示所有具有匹配的索引的行都被用到
*   range索引范围内查找
*   index全索引树扫描
*   all全表扫描

possible_keys：指出mysql在试用了哪个索引在该表中查找行。如果没有使用任何索引，就显示的NULL，可以用于对优化时的索引调整。   
**key**：显示使用的索引，如果没有使用，则显示NULL   
**key_len**：显示的是所使用的索引长度，如果没使用，则是NULL。当然，在使用索引的情况下，索引长度越小。效果越明显。   
**ref**：显示使用那个列或常数雨key一起从表中选择行。   
**rows**：执行查询的行数，如果行数越小，说明查询次数越少，效率越高。   
**extra**：包含查询mysql解决查询的详细信息。

       在上面的查询解释表中，type为ALL所以，这个查询是全表扫描，并没有使用索引。所以，我们要分析这条语句中，哪个查询条件，适合添加索引。这个要根据具体问题具体分析了。   
接下来，我对role表中的priority_level添加索引，添加后执行结果如下：   

![upload successful](/images/my_blog_97.png)

![upload successful](/images/my_blog_98.png)
       查询次数变少了。而且也用到了刚才加的pl_idx索引。查询效率提高了。当然这只是优化了一小步。也只是初步认识了一下explain。还需要多加练习。

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()