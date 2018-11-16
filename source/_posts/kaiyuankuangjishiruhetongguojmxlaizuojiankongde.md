title: 开源框架是如何通过JMX来做监控的(一) - JMX简介和Standard MBean
author: Leesin.Dong
tags:
  - java基础
categories:
  - java
  - java基础
date: 2018-11-11 10:32:00
---
原文链接：[https://www.cnblogs.com/trust-freedom/p/6842332.html#autoid-0-0-0](https://www.cnblogs.com/trust-freedom/p/6842332.html#autoid-0-0-0)

相信很多做Java开发的同学都使用过JDK自带的 jconsole 或者 jvisualvm 监控过JVM的运行情况，但不知道有没有留意过它们会有一个MBean的功能/标签，通过MBean可以看到在JVM中运行的组件的一些属性和操作

    例如，可以看到Tomcat 8080端口Connector的请求连接池信息，Druid数据库连接池的activeCount连接数以及连接池配置信息，这些开源框架或中间件都是通过JMX的方式将自己的一些管理和监控信息暴露给我们

    JMX的全称为Java Management Extensions. 顾名思义，是管理Java的一种扩展。这种机制可以方便的管理正在运行中的Java程序。常用于管理线程，内存，日志Level，服务重启，系统环境等。

    下面简单介绍一下JMX和其最简单的Standard MBean，以及常用实例，之后的文章中会分析Druid数据库连接池等开源框架是如何通过JMX做监控的，没准在我们的程序中也可以用到。

    **以下是本文的目录大纲：**

    [一、JMX架构及基本概念](https://www.cnblogs.com/trust-freedom/p/6842332.html#jmx_framework)

    [二、Standard MBean](https://www.cnblogs.com/trust-freedom/p/6842332.html#standard_mbean)

    [三、通过RMI方式连接JMX Server](https://www.cnblogs.com/trust-freedom/p/6842332.html#jmx_rmi)

    [四、通过VisualVM连接JMX Server](https://www.cnblogs.com/trust-freedom/p/6842332.html#jmx_visualvm)

    若有不正之处请多多谅解，欢迎批评指正、互相讨论。

    请尊重作者劳动成果，转载请标明原文链接：

    [http://www.cnblogs.com/trust-freedom/p/6842332.html](http://www.cnblogs.com/trust-freedom/p/6842332.html)

一、JMX架构及基本概念
============


![upload successful](/images/my_blog_142.png)

从上面的架构图可以看到JMX主要分三层，分别是：

**1、设备层（Instrumentation Level）**

主要定义了信息模型。在JMX中，各种管理对象以管理构件的形式存在，需要管理时，向MBean服务器进行注册。该层还定义了通知机制以及一些辅助元数据类。

设备层其实就是和被管设备通信的模块，对于上层的管理者来说，Instrumentation 就是设备，具体设备如何通信，是采用SNMP,还是采用ICMP，是MBean的事情。

该层定义了如何实现JMX管理资源的规范。一个JMX管理资源可以是一个Java应用、一个服务或一个设备，它们可以用Java开发，或者至少能用Java进行包装，并且能被置入JMX框架中，从而成为JMX的一个管理构件(Managed Bean)，简称MBean。管理构件可以是标准的，也可以是动态的，标准的管理构件遵从JavaBeans构件的设计模式；动态的管理构件遵从特定的接口，提供了更大的灵活性。

在JMX规范中，管理构件定义如下：它是一个能代表管理资源的Java对象，遵从一定的设计模式，还需实现该规范定义的特定的接口。该定义了保证了所有的管理构件以一种标准的方式来表示被管理资源。

管理接口就是被管理资源暴露出的一些信息，通过对这些信息的修改就能控制被管理资源。一个管理构件的管理接口包括：

    1) 能被接触的属性值

    2) 能够执行的操作

    3) 能发出的通知事件

    4) 管理构件的构建器

本文着重介绍最基本也是用的最多的**Standard Mbean**，至于其它的如Dynamic MBean、Model MBean暂时不介绍，请参考本文最后资料中的文章。

Standard MBean是最简单的MBean，它管理的资源必须定义在接口中，然后MBean必须实现这个接口。它的命名也必须遵循一定的规范，例如我们的MBean为Hello，则接口必须为HelloMBean。

**2、代理层（Agent Level）**

Agent层 用来管理相应的资源，并且为远端用户提供访问的接口。Agent层构建在设备层之上，并且使用并管理设备层内部描述的组件。Agent层主要定义了各种服务以及通信模型。该层的核心是 **MBeanServer，**所有的MBean都要向它注册，才能被管理。注册在MBeanServer上的MBean并不直接和远程应用程序进行通信，他们通过 **协议适配器（Adapter） **和 **连接器（Connector）** 进行通信。通常Agent由一个MBeanServer和多个系统服务组成。JMX Agent并不关心它所管理的资源是什么。

**3、分布服务层（Distributed Service Level）**

分布服务层关心Agent如何被远端用户访问的细节。它定义了一系列用来访问Agent的接口和组件，包括Adapter和Connector的描述。

二、Standard MBean
================

Standard MBean的设计和实现是最简单的，它们的管理接口通过方法名来描述。Standard MBean的实现依靠一组命名规则。这些命名规则定义了属性和操作。

一个只读属性在MBean中只有get方法，既有get又有set方法表示是一个可读写的属性。

为了实现Standard MBean，必须遵循一套继承规范。必须为每一个MBean定义一个接口，而且这个接口的名字必须是其被管理的资源的对象类的名称后面加上”MBean”，之后把它们注册到MBeanServer中就可以了

MBean接口：

1

2

3

4

5

6

`public` `interface` `HelloMBean {`

`public` `String getName();`

`public` `void` `setName(String name);`

`public` `String printHello();`

`public` `String printHello(String whoName);`

`}`

接下来是真正的资源对象，因为命名规范的限制，因此对象名称必须为Hello

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

19

20

21

22

23

`public` `class` `Hello` `implements` `HelloMBean {`

`private` `String name;`

`@Override`

`public` `String getName() {`

`return` `name;`

`}`

`@Override`

`public` `void` `setName(String name) {`

`this``.name = name;`

`}`

`@Override`

`public` `String printHello() {`

`return` `"Hello "``+ name;`

`}`

`@Override`

`public` `String printHello(String whoName) {`

`return` `"Hello  "` `+ whoName;`

`}`

`}`

接下来创建一个HelloMBean，并将其注册到MBeanServer：

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

`public` `class` `HelloAgent {`

`public` `static` `void` `main(String[] args)` `throws` `Exception {`

`// 首先建立一个MBeanServer，MBeanServer用来管理我们的MBean，通常是通过MBeanServer来获取我们MBean的信息`

`MBeanServer server = ManagementFactory.getPlatformMBeanServer(); `

`String domainName =` `"MyMBean"``;`

`// 为MBean（下面的new Hello()）创建ObjectName实例`

`ObjectName helloName =` `new` `ObjectName(domainName+``":name=HelloWorld"``);`

`// 将new Hello()这个对象注册到MBeanServer上去`

`server.registerMBean(``new` `Hello(),helloName);`

`}`

`}`

三、通过RMI方式连接JMX Server
=====================

继续上面的HelloMBean、HelloAgent，我们可以通过RMI的方式注册URL来提供客户端连接，这样就可以通过 jvisualvm 或者 自己写的Java程序作为JMX的客户端来管理MBean

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

19

20

21

22

23

24

25

26

27

28

29

30

31

32

33

34

35

36

`import` `java.lang.management.ManagementFactory;`

`import` `java.rmi.registry.LocateRegistry;`

`import` `java.rmi.registry.Registry;`

`import` `javax.management.MBeanServer;`

`import` `javax.management.ObjectName;`

`import` `javax.management.remote.JMXConnectorServer;`

`import` `javax.management.remote.JMXConnectorServerFactory;`

`import` `javax.management.remote.JMXServiceURL;`

`public` `class` `HelloAgent {`

`public` `static` `void` `main(String[] args)` `throws` `Exception {`

`//create mbean server`

`MBeanServer server = ManagementFactory.getPlatformMBeanServer();`

`//create object name`

`ObjectName objectName =` `new` `ObjectName(``"jmxBean:name=hello"``);`

`//create mbean and register mbean`

`server.registerMBean(``new` `Hello(), objectName);`

`/**`

`* JMXConnectorServer service`

`*/`

`//这句话非常重要，不能缺少！注册一个端口，绑定url后，客户端就可以使用rmi通过url方式来连接JMXConnectorServer`

`Registry registry = LocateRegistry.createRegistry(``1099``);`

`//构造JMXServiceURL`

`JMXServiceURL jmxServiceURL =` `new` `JMXServiceURL(``"service:jmx:rmi:///jndi/rmi://localhost:1099/jmxrmi"``);`

`//创建JMXConnectorServer`

`JMXConnectorServer cs = JMXConnectorServerFactory.newJMXConnectorServer(jmxServiceURL,` `null``, server); `

`//启动`

`cs.start();`

`}`

`}`

在创建JMXConnectorServer时创建的JMXServiceURL比较复杂，但其实其完整版为：

**service:jmx:rmi://localhost:0/jndi/rmi://localhost:1099/jmxrmi**

蓝色部分可以省略掉

**service:jmx:**    这个是JMX URL的标准前缀，所有的JMX URL都必须以该字符串开头，否则会抛MalformedURLException

**rmi:**    这个是jmx connector server的传输协议，在这个url中是使用rmi来进行传输的

**localhost:0**    这个是jmx connector server的IP和端口，也就是真正提供服务的host和端口，可以忽略，那么会在运行期间随意绑定一个端口提供服务

**jndi/rmi://localhost:1099/jmxrmi**    这个是jmx connector server的路径，具体含义取决于前面的传输协议。比如该URL中这串字符串就代表着该jmx connector server的stub是使用 jndi api 绑定在 rmi://localhost:1099/jmxrmi 这个地址

**如果在服务器端，我们用该URL创建一个jmx connector server，则大概流程如下：**

1、将jmx connect server内部的server对象的rmi stub export到本地的一个随机端口（也可以自己指定），接收外部连接

2、通过jndi api将该stub绑定在rmi://localhost:6000/jmxrmi这个地址上，这需要在本地的1099端口上运行着一个rmiregistry，如果不存在则会抛出异常

**如果在客户端，我们通过该URL创建一个connector，则大概流程如下：**

1、访问1099端口，通过jndi api到rmi://localhost:1099/jmxrmi这个地址取回stub

2、stub中已经包含了真实服务器的IP和端口，所以可以直接根据该stub连接到真实的服务器

下面具体展示一段客户端代码，可以获取jmx connector，并展示HelloMBean的一些信息，属性，及调用其方法

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

19

20

21

22

23

24

25

26

27

28

29

30

31

32

33

34

35

36

37

38

39

40

41

42

43

44

45

46

47

48

49

50

51

52

53

54

55

56

57

58

59

60

61

62

63

64

65

66

67

68

69

70

71

`import` `java.util.Iterator;`

`import` `java.util.Set;`

`import` `javax.management.Attribute;`

`import` `javax.management.MBeanInfo;`

`import` `javax.management.MBeanServerConnection;`

`import` `javax.management.MBeanServerInvocationHandler;`

`import` `javax.management.ObjectInstance;`

`import` `javax.management.ObjectName;`

`import` `javax.management.remote.JMXConnector;`

`import` `javax.management.remote.JMXConnectorFactory;`

`import` `javax.management.remote.JMXServiceURL;`

`public` `class` `JMXClient {`

`public` `static` `void` `main(String[] args)` `throws` `Exception { `

`//connect JMX `

`JMXServiceURL url =` `new` `JMXServiceURL(``"service:jmx:rmi:///jndi/rmi://localhost:1099/jmxrmi"``); `

`JMXConnector jmxc = JMXConnectorFactory.connect(url,``null``); `

`MBeanServerConnection mbsc = jmxc.getMBeanServerConnection();      `

`ObjectName mbeanName =` `new` `ObjectName(``"jmxBean:name=hello"``);    `

`//print domains `

`System.out.println(``"Domains:---------------"``); `

`String domains[] = mbsc.getDomains(); `

`for` `(``int` `i =` `0``; i < domains.length; i++) {        `

`System.out.println(``"Domain["` `+ i +``"] = "` `+ domains[i]);     `

`}    `

`System.out.println();`

`//MBean count `

`System.out.println(``"MBean count:---------------"``); `

`System.out.println(``"MBean count = "` `+ mbsc.getMBeanCount());`

`System.out.println();`

`//process attribute `

`System.out.println(``"process attribute:---------------"``);`

`mbsc.setAttribute(mbeanName,` `new` `Attribute(``"Name"``,` `"newName"``));` `//set value `

`System.out.println(``"Name = "` `+ mbsc.getAttribute(mbeanName,` `"Name"``));` `//get value `

`System.out.println();`

`//invoke via proxy `

`System.out.println(``"invoke via proxy:---------------"``);`

`HelloMBean proxy = (HelloMBean) MBeanServerInvocationHandler.newProxyInstance(mbsc, mbeanName, HelloMBean.``class``,` `false``);         `

`System.out.println(proxy.printHello()); `

`System.out.println(proxy.printHello(``"zhangsan"``));`

`System.out.println();`

`//invoke via rmi `

`System.out.println(``"invoke via rmi:---------------"``);`

`System.out.println(mbsc.invoke(mbeanName,` `"printHello"``,` `null``,` `null``));          `

`System.out.println(mbsc.invoke(mbeanName,` `"printHello"``,` `new` `Object[] {` `"lisi"` `},` `new` `String[] { String.``class``.getName() }));    `

`System.out.println();`

`//get mbean information `

`System.out.println(``"get mbean information:---------------"``);`

`MBeanInfo info = mbsc.getMBeanInfo(mbeanName);          `

`System.out.println(``"Hello Class:"` `+ info.getClassName());       `

`System.out.println(``"Hello Attribute:"` `+ info.getAttributes()[``0``].getName());      `

`System.out.println(``"Hello Operation:"` `+ info.getOperations()[``0``].getName());    `

`System.out.println();`

`//ObjectName of MBean `

`System.out.println(``"ObjectName of MBean:---------------"``);        `

`Set set = mbsc.queryMBeans(``null``,` `null``); `

`for` `(Iterator it = set.iterator(); it.hasNext();) { `

`ObjectInstance oi = (ObjectInstance)it.next();         `

`System.out.println(oi.getObjectName());         `

`} `

`jmxc.close();      `

`}   `

`}`

例子中我们可以get/set HelloMBean的Name属性，可以通过先获取代理和直接RMI的方式调用HelloMbean的printHello()方法等。

这样我们就有了一个完整的JMX server、client的例子，很多开源框架（如一些数据库连接池DBCP2、Druid）都实现了JMX来达到对其自身的监控，虽然这不是唯一的方法，也可以通过其它方式提供监控查询接口，但由于JMX是sun提出的通用标准，故大家纷纷响应实现。所以当我们使用这些开源框架并希望对其运行状况做一些管理监控时，可以采用JMX的方式获取其暴露出的MBean相关属性和方法。之后会分析一些Druid是如何通过JMX的方式做管理监控的。

四、通过VisualVM连接JMX Server
========================

打开JDK自带的VisualVM，由于本例是本地localhost的JMX server，那么在左侧栏“本地”上右键，创建JMX连接


![upload successful](/images/my_blog_143.png)

点击后只需填写本地的RMIRegistry注册的端口1099即可，当然也可以填写完整的URL：service:jmx:rmi:///jndi/rmi://localhost:1099/jmxrmi


![upload successful](/images/my_blog_144.png)

连接成功后，就可以看到HelloMBean以及其提供的属性和操作，还可以调用printHello()方法


![upload successful](/images/my_blog_145.png)

**参考资料：**

    [从零开始玩转JMX(一)——简介和Standard MBean](http://blog.csdn.net/u013256816/article/details/52800742)

    [JMX超详细解读](http://www.cnblogs.com/dongguacai/p/5900507.html)

    [JMX架构的简单介绍](http://blog.csdn.net/drykilllogic/article/details/38379623)

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()