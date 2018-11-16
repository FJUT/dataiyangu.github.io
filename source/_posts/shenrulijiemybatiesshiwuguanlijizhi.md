title: 深入理解mybatis事务管理机制
author: Leesin.Dong
tags:
  - mybatis
  - interview
categories:
  - java
  - mybatis
date: 2018-11-08 23:23:00
---
[《深入理解mybatis原理》 MyBatis事务管理机制](http://www.cnblogs.com/yixiu868/p/8143039.html)

MyBatis作为Java语言的数据库框架，对数据库的事务管理是其非常重要的一个方面。本文将讲述MyBatis的事务管理的实现机制。首先介绍MyBatis的事务Transaction的接口设计以及其不同实现**JdbcTransaction **和 **ManagedTransaction**；接着，从MyBatis的XML配置文件入手，讲解MyBatis事务工厂的创建和维护，进而阐述了MyBatis事务的创建和使用；最后分析**JdbcTransaction**和**ManagedTransaction**的实现和二者的不同特点。

以下是本文的组织结构：

> ![](https://img-blog.csdn.net/20140720221842576)

一、概述
----

>     对数据库的事务而言，应该具有以下几点：创建（create）、提交（commit）、回滚（rollback）、关闭（close）。对应地，MyBatis将事务抽象成了Transaction接口：其接口定义如下：
> 
> ![](https://img-blog.csdn.net/20140720144531073)

> **MyBatis的事务管理分为两种形式：**
> 
> > **一、使用JDBC的事务管理机制**：即利用java.sql.Connection对象完成对事务的提交（commit()）、回滚（rollback()）、关闭（close()）等
> > 
> > **二、使用MANAGED的事务管理机制：**这种机制MyBatis自身不会去实现事务管理，而是让程序的容器如（JBOSS，Weblogic）来实现对事务的管理
> 
> 这两者的类图如下所示：
> 
> ![](https://img-blog.csdn.net/20140720145258263)

二、事务的配置、创建和使用
-------------

> ### 1\. 事务的配置
> 
> 我们在使用MyBatis时，一般会在MyBatisXML配置文件中定义类似如下的信息：
> 
> ![](https://img-blog.csdn.net/20140720150704081)
> 
> <**environment**>节点定义了连接某个数据库的信息，其子节点<**transactionManager**\> 的type 会决定我们用什么类型的事务管理机制。
> 
> ### 2.事务工厂的创建
> 
>     MyBatis事务的创建是交给TransactionFactory 事务工厂来创建的，如果我们将<transactionManager>的type 配置为"JDBC",那么，在MyBatis初始化解析<environment>节点时，会根据type="JDBC"创建一个JdbcTransactionFactory工厂，其源码如下：
> 
> ![](https://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif) View Code
> 
>     如上述代码所示，如果type = "JDBC",则MyBatis会创建一个JdbcTransactionFactory.class 实例；如果type="MANAGED"，则MyBatis会创建一个MangedTransactionFactory.class实例。
> 
>  MyBatis对<**transactionManager**>节点的解析会生成 TransactionFactory实例；而对<**dataSource**>解析会生成datasouce实例(关于dataSource的解析和原理，读者可以参照我的另一篇博文：[《深入理解mybatis原理》 Mybatis数据源与连接池 ](http://blog.csdn.net/luanlouis/article/details/37671851)    
> )，作为<**environment**>节点，会根据TransactionFactory和DataSource实例创建一个Environment对象，代码如下所示：
> 
> ![](https://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif) View Code
> 
>     **Environment**表示着一个数据库的连接，生成后的Environment对象会被设置到Configuration实例中，以供后续的使用。
> 
> ![](https://img-blog.csdn.net/20140720205521925)
> 
>     上述一直在讲事务工厂TransactionFactory来创建的Transaction，现在让我们看一下MyBatis中的TransactionFactory的定义吧。
> 
> ### 3\. 事务工厂TransactionFactory
> 
>     事务工厂Transaction定义了创建Transaction的两个方法：一个是通过指定的Connection对象创建Transaction，另外是通过数据源DataSource来创建Transaction。与JDBC 和MANAGED两种Transaction相对应，TransactionFactory有两个对应的实现的子类：如下所示：
> 
> ![](https://img-blog.csdn.net/20140720210149296)
> 
> ### 4\. 事务Transaction的创建
> 
>           通过事务工厂TransactionFactory很容易获取到Transaction对象实例。我们以JdbcTransaction为例，看一下JdbcTransactionFactory是怎样生成JdbcTransaction的，代码如下：
> 
> ![](https://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif) View Code
> 
>     如上说是，JdbcTransactionFactory会创建JDBC类型的Transaction，即JdbcTransaction。类似地，ManagedTransactionFactory也会创建ManagedTransaction。下面我们会分别深入JdbcTranaction 和ManagedTransaction，看它们到底是怎样实现事务管理的。
> 
> ### 5\. JdbcTransaction
> 
>     JdbcTransaction直接使用JDBC的提交和回滚事务管理机制 。它依赖与从dataSource中取得的连接connection 来管理transaction 的作用域，connection对象的获取被延迟到调用getConnection()方法。如果autocommit设置为on，开启状态的话，它会忽略commit和rollback。
> 
>     直观地讲，就是JdbcTransaction是使用的java.sql.Connection 上的commit和rollback功能，JdbcTransaction只是相当于对java.sql.Connection事务处理进行了一次包装（wrapper），Transaction的事务管理都是通过java.sql.Connection实现的。JdbcTransaction的代码实现如下：
> 
> ![](https://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif) View Code
> 
> ### 6\. ManagedTransaction
> 
>     ManagedTransaction让容器来管理事务Transaction的整个生命周期，意思就是说，使用ManagedTransaction的commit和rollback功能不会对事务有任何的影响，它什么都不会做，它将事务管理的权利移交给了容器来实现。看如下Managed的实现代码大家就会一目了然：
> 
> ![](https://images.cnblogs.com/OutliningIndicators/ContractedBlock.gif) View Code
> 
> 注意：如果我们使用MyBatis构建本地程序，即不是WEB程序，若将type设置成"MANAGED"，那么，我们执行的任何update操作，即使我们最后执行了commit操作，数据也不会保留，不会对数据库造成任何影响。因为我们将MyBatis配置成了“MANAGED”，即MyBatis自己不管理事务，而我们又是运行的本地程序，没有事务管理功能，所以对数据库的update操作都是无效的。

转自：http://blog.csdn.net/luanlouis/article/details/37992171

分类: [Mybatis](http://www.cnblogs.com/yixiu868/category/944649.html)

阅读更多

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()