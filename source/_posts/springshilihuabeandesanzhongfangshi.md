title: spring实例化bean的三种方式
author: Leesin.Dong
tags:
  - spring
  - interview
categories:
  - java
  - spring
date: 2018-11-11 21:54:00
---
### 在spring中有三中实例化bean的方式：

一、使用构造器实例化；

二、使用静态工厂方法实例化；

三、使用实例化工厂方法实例化。

每种实例化所采用的配置是不一样的：

**一、使用构造器实例化；**

这种实例化的方式可能在我们平时的开发中用到的是最多的，因为在xml文件中配置简单并且也不需要额外的工厂类来实现。

Xml代码  ![收藏代码](http://glzaction.iteye.com/images/icon_star.png)

1.  <!--applicationContext.xml配置：-->  

3.  **<****bean** id="personService" class="cn.mytest.service.impl.PersonServiceBean"**>****</****bean****>**  

 id是对象的名称，class是要实例化的类，然后再通过正常的方式进调用实例化的类即可，比如：

Java代码  ![收藏代码](http://glzaction.iteye.com/images/icon_star.png)

1.  **public** **void** instanceSpring(){  
2.                  //加载spring配置文件  
3.          ApplicationContext ac = **new** ClassPathXmlApplicationContext(  
4.                  **new** String\[\]{  
5.                          "/conf/applicationContext.xml"  
6.                  });  
7.          //调用getBean方法取得被实例化的对象。  
8.          PersonServiceBean psb = (PersonServiceBean) ac.getBean("personService");  

10.          psb.save();  
11.  }  

采用这种实例化方式要注意的是：要实例化的类中如果有构造器的话，一定要有一个无参的构造器。

**二、使用静态工厂方法实例化；**

根据这个中实例化方法的名称就可以知道要想通过这种方式进行实例化就要具备两个条件：（一）、要有工厂类及其工厂方法；（二）、工厂方法是静态的。OK，知道这两点就好办了，首先创建工程类及其静态方法：

Java代码  ![收藏代码](http://glzaction.iteye.com/images/icon_star.png)

1.  **package** cn.mytest.service.impl;  

3.  /** 
4.  *创建工厂类 
5.  * 
6.  */  
7.  **public** **class** PersonServiceFactory {  
8.      //创建静态方法  
9.      **public** **static** PersonServiceBean createPersonServiceBean(){  
10.           //返回实例化的类的对象  
11.          **return** **new** PersonServiceBean();  
12.      }  
13.  }  

 然后再去配置spring配置文件，配置的方法和上面有点不同，这里也是关键所在

Xml代码  ![收藏代码](http://glzaction.iteye.com/images/icon_star.png)

1.  <!--applicationContext.xml配置：-->  

3.  **<****bean** id="personService1" class="cn.mytest.service.impl.PersonServiceFactory" factory-method="createPersonServiceBean"**>****</****bean****>**  

 id是实例化的对象的名称，class是工厂类，也就实现实例化类的静态方法所属的类，factory-method是实现实例化类的静态方法。

然后按照正常的调用方法去调用即可：

Java代码  ![收藏代码](http://glzaction.iteye.com/images/icon_star.png)

1.  **public** **void** instanceSpring(){  
2.                  //加载spring配置文件  
3.          ApplicationContext ac = **new** ClassPathXmlApplicationContext(  
4.                  **new** String\[\]{  
5.                          "/conf/applicationContext.xml"  
6.                  });  
7.          //调用getBean方法取得被实例化的对象。  
8.          PersonServiceBean psb = (PersonServiceBean) ac.getBean("personService1");  

10.          psb.save();  
11.  }  

**三、使用实例化工厂方法实例化。**

这个方法和上面的方法不同之处在与使用该实例化方式工厂方法不需要是静态的，但是在spring的配置文件中需要配置更多的内容，，首先创建工厂类及工厂方法：

Java代码  ![收藏代码](http://glzaction.iteye.com/images/icon_star.png)

1.  **package** cn.mytest.service.impl;  

3.  /** 
4.  *创建工厂类 
5.  * 
6.  */  
7.  **public** **class** PersonServiceFactory {  
8.      //创建静态方法  
9.      **public** PersonServiceBean createPersonServiceBean1(){  
10.           //返回实例化的类的对象  
11.          **return** **new** PersonServiceBean();  
12.      }  
13.  }  

  然后再去配置spring配置文件，配置的方法和上面有点不同，这里也是关键所在

Xml代码  ![收藏代码](http://glzaction.iteye.com/images/icon_star.png)

1.  <!--applicationContext.xml配置：-->  

3.  **<****bean** id="personServiceFactory" class="cn.mytest.service.impl.PersonServiceFactory"**>****</****bean****>**  

5.  **<****bean** id="personService2" factory-bean="personServiceFactory" factory-method="createPersonServiceBean1"**>****</****bean****>**  

 这里需要配置两个bean，第一个bean使用的构造器方法实例化工厂类，第二个bean中的id是实例化对象的名称，factory-bean对应的被实例化的工厂类的对象名称，也就是第一个bean的id，factory-method是非静态工厂方法。

然后按照正常的调用方法去调用即可：

Java代码  ![收藏代码](http://glzaction.iteye.com/images/icon_star.png)

1.  **public** **void** instanceSpring(){  
2.                  //加载spring配置文件  
3.          ApplicationContext ac = **new** ClassPathXmlApplicationContext(  
4.                  **new** String\[\]{  
5.                          "/conf/applicationContext.xml"  
6.                  });  
7.          //调用getBean方法取得被实例化的对象。  
8.          PersonServiceBean psb = (PersonServiceBean) ac.getBean("personService2");  

10.          psb.save();  
11.  }  

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()