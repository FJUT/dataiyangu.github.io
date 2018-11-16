title: hibernate bean映射到数据库
author: Leesin.Dong
tags:
  - interview
  - hibernate
categories:
  - java
  - hibernate
date: 2018-11-09 13:13:00
---
 上回说到， Hibernate是一个开放源代码的对象关系映射框架，其核心应该也就是映射了，所以，今天我们了解一下Hibernate是如何将实体和数据库映射的。--即Hibernate根据实体自动建立表和字段。

    为了让大家更明了，小编写了一个小demo。实现了将实体映射到数据库表。希望通过这个小程序，让大家有所收获。

    先宏观看一下目录结构：

![](https://img-blog.csdn.net/20161230112734891?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvb25seWJ5bXlzZWxm/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

    首先是Hibernate的核心配置文件：hibernate.cfg.xml

**\[java\]** [view plain](https://blog.csdn.net/onlybymyself/article/details/53940840#) [copy](https://blog.csdn.net/onlybymyself/article/details/53940840#)

1.  <!DOCTYPE hibernate-configuration PUBLIC  
2.      "-//Hibernate/Hibernate Configuration DTD 3.0//EN"  
3.      "http://hibernate.sourceforge.net/hibernate-configuration-3.0.dtd">  

5.  <hibernate-configuration>  
6.      <session-factory >  
7.      <!-- 连接数据库信息 -->  
8.          <property name="hibernate.connection.driver_class">com.mysql.jdbc.Driver</property>  
9.          <property name="hibernate.connection.url">jdbc:mysql://localhost:3306/hibernate_first</property>  
10.          <property name="hibernate.connection.username">root</property>  
11.          <property name="hibernate.connection.password">root</property>  
12.          <property name="hibernate.dialect">org.hibernate.dialect.MySQLDialect</property>  
13.      </session-factory>  
14.  </hibernate-configuration>  

    这是一个连接MySQL的示例，若想换数据库，直接更改此配置文件即可，代码无需改动，这也是Hibernate的优点之一。  
    然后，开始建立实体类，其包括5个属性：

**\[java\]** [view plain](https://blog.csdn.net/onlybymyself/article/details/53940840#) [copy](https://blog.csdn.net/onlybymyself/article/details/53940840#)

1.  **package** com.bjpowernode.hibernate;  

3.  **import** java.util.Date;  

5.  **public** **class** User {  
6.      **private** String id;  
7.      **private** String name;  
8.      **private** String password;  
9.      **private** Date createTime;  
10.      **private** Date expireTime;  
11.      **public** String getId() {  
12.          **return** id;  
13.      }  
14.      **public** **void** setId(String id) {  
15.          **this**.id = id;  
16.      }  
17.      **public** String getName() {  
18.          **return** name;  
19.      }  
20.      **public** **void** setName(String name) {  
21.          **this**.name = name;  
22.      }  
23.      **public** String getPassword() {  
24.          **return** password;  
25.      }  
26.      **public** **void** setPassword(String password) {  
27.          **this**.password = password;  
28.      }  
29.      **public** Date getCreateTime() {  
30.          **return** createTime;  
31.      }  
32.      **public** **void** setCreateTime(Date createTime) {  
33.          **this**.createTime = createTime;  
34.      }  
35.      **public** Date getExpireTime() {  
36.          **return** expireTime;  
37.      }  
38.      **public** **void** setExpireTime(Date expireTime) {  
39.          **this**.expireTime = expireTime;  
40.      }  

42.  }  

    随后，建立 User.hbm.xml,完成实体类的映射。（其中的注释信息可以帮你更好的理解）

**\[java\]** [view plain](https://blog.csdn.net/onlybymyself/article/details/53940840#) [copy](https://blog.csdn.net/onlybymyself/article/details/53940840#)

1.  <?xml version="1.0"?>  
2.  <!DOCTYPE hibernate-mapping PUBLIC   
3.      "-//Hibernate/Hibernate Mapping DTD 3.0//EN"  
4.      "http://hibernate.sourceforge.net/hibernate-mapping-3.0.dtd">  
5.  <hibernate-mapping>  
6.      <**class** name="com.bjpowernode.hibernate.User"> <!-- 实体类完整路径，会在关系模型中创建一张表，  
7.  叫User,也可以用table重命名，如 table="t_user" -->  
8.          <id name="id"><!--标识主键,会在表里建主键id，也可以重命名 column="user_id"  -->  
9.              <generator **class**="uuid"/><!--主键生成策略，generator为生成器，uuid为生成  
10.  不重复的32位字符串  -->  
11.          </id>  
12.          <property name="name"/><!--其它属性，对应字段  -->  
13.          <property name="password"/>  
14.          <property name="createTime"/>  
15.          <property name="expireTime"/>  
16.      </**class**>  

18.  </hibernate-mapping>  

    最后，将User.hbm.xml添加到核心配置文件hibernate.cfg.xml中。

**\[java\]** [view plain](https://blog.csdn.net/onlybymyself/article/details/53940840#) [copy](https://blog.csdn.net/onlybymyself/article/details/53940840#)

1.  <!DOCTYPE hibernate-configuration PUBLIC  
2.      "-//Hibernate/Hibernate Configuration DTD 3.0//EN"  
3.      "http://hibernate.sourceforge.net/hibernate-configuration-3.0.dtd">  

5.  <hibernate-configuration>  
6.      <session-factory >  
7.      <!-- 连接数据库信息 -->  
8.          <property name="hibernate.connection.driver_class">com.mysql.jdbc.Driver</property>  
9.          <property name="hibernate.connection.url">jdbc:mysql://localhost:3306/hibernate_first</property>  
10.          <property name="hibernate.connection.username">root</property>  
11.          <property name="hibernate.connection.password">root</property>  
12.          <property name="hibernate.dialect">org.hibernate.dialect.MySQLDialect</property>  

14.          <mapping resource="com/bjpowernode/hibernate/User.hbm.xml"/>  
15.      </session-factory>  
16.  </hibernate-configuration>  

     这样就完成了，通过这样的关联映射，Hibernate将会在数据库中建立相应的表和字段。

    为了更好的看到效果，小编建立了ExportDB.java，手动完成

**\[java\]** [view plain](https://blog.csdn.net/onlybymyself/article/details/53940840#) [copy](https://blog.csdn.net/onlybymyself/article/details/53940840#)

1.  **package** com.bjpowernode.hibernate;  

3.  **import** org.hibernate.cfg.Configuration;  
4.  **import** org.hibernate.tool.hbm2ddl.SchemaExport;  

6.  /** 
7.   * 将hbm生成ddl 
8.   * @author han 
9.   * 
10.   */  
11.  **public** **class** ExportDB {  
12.      **public** **static** **void** main(String\[\] args){  
13.          //默认读取hibernate.cfg.xml文件  
14.          Configuration cfg=**new** Configuration().configure();//读配置文件  
15.          SchemaExport export=**new** SchemaExport(cfg);//通过此生成ddl  
16.          export.create(**true**, **true**);//打印到控制台，输出脚本到数据库  
17.      }  
18.  }  

    原库：

![](https://img-blog.csdn.net/20161230122107477?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvb25seWJ5bXlzZWxm/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

    执行后（插入表、字段）：

![](https://img-blog.csdn.net/20161230122323965?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvb25seWJ5bXlzZWxm/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)![](https://img-blog.csdn.net/20161230122226182?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvb25seWJ5bXlzZWxm/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

    建立Client.java,看插入数据效果

**\[java\]** [view plain](https://blog.csdn.net/onlybymyself/article/details/53940840#) [copy](https://blog.csdn.net/onlybymyself/article/details/53940840#)

1.  **package** com.bjpowernode.hibernate;  

3.  **import** java.util.Date;  

5.  **import** javax.lang.model.type.NullType;  

7.  **import** org.hibernate.Session;  
8.  **import** org.hibernate.SessionFactory;  
9.  **import** org.hibernate.cfg.Configuration;  

11.  **public** **class** Client {  

13.      **public** **static** **void** main(String\[\] args){  
14.          //默认读取hibernate.cfg.xml文件  
15.          Configuration cfg=**new** Configuration().configure();  
16.          //建立SessionFactory,镜像  
17.          SessionFactory factory=cfg.buildSessionFactory();  

19.          //取得session  
20.          Session session=**null**;  
21.          **try** {  
22.              session=factory.openSession();  
23.              //开启事务  
24.              session.beginTransaction();  
25.              //创建对象，保存到数据库  
26.              User user=**new** User();  
27.              user.setName("张三");  
28.              user.setPassword("123");  
29.              user.setCreateTime(**new** Date());  
30.              user.setExpireTime(**new** Date());  

32.              //保存User对象  
33.              session.save(user);  
34.              //提交事务  
35.              session.getTransaction().commit();  

37.          } **catch** (Exception e) {  
38.              e.printStackTrace();  
39.              //回滚  
40.              session.getTransaction().rollback();  

42.          }**finally**{  
43.              **if**(session!=**null**)  
44.                  **if** (session.isOpen()) {  
45.                      //关闭session  
46.                      session.close();  
47.                  }  
48.          }  

51.      }  
52.  }  

![](https://img-blog.csdn.net/20161230122345293?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvb25seWJ5bXlzZWxm/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

    通过这个例子，我们看到，Hibernate可以将实体类映射到数据库。从实体类到建表，设计字段到插入数据，我们没有写任何的SQL语句，因为Hibernate对底层做了很大程度的封装，省去了我们写SQL的这些过程。当然，这有利也有弊。弊就是由于封装的太严密，丧失了某些灵活性......

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()