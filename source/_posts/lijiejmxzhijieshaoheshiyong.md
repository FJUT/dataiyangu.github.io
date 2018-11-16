title: 理解JMX之介绍和简单使用
author: Leesin.Dong
tags:
  - java基础
categories:
  - java
  - java基础
date: 2018-11-11 10:29:00
---
原文链接：https://blog.csdn.net/lmy86263/article/details/71037316 

近期在项目上需要添加一些功能，想把一个开源工程整合进来，虽说是整合，但是觉得跟开发有查不了多少，要让这个开源工程的编码风格和设计方式与我们的工程保持一致，其中涉及到应用程序的监控和管理，不可避免的要使用JMX，之前简单的了解过JMX，但是没有动力深入去了解其中的原理和编码，由于项目需要，这次针对JMX要深入总结一下，关于监控的内容，之前写过一篇系统监控之SNMP协议理解，纯属是科普文章，也没有编程实现过。但是其实监控对于一个软件或者应用来说是很重要的，在InfoQ上有专门一系列文章来介绍监控系统的构建，聊聊监控（一）：什么值得监控以及监控指标的取舍，如果想深入了解可以看一下。

重回JMX，在写本文之前，在网上找了很多的相关文章，读的我一头雾水，所以在本文中，我想把自己的理解用大白话说一下。

JMX的简介
所谓JMX，是Java Management Extensions的缩写，从官方的文档上来看，他就是一个框架，和JPA、JMS是一样的，和我们平时使用的Spring、Hibernate也没有什么区别。就是通过将监控和管理涉及到的各个方面的问题和解决办法放到一起，统一设计，以便向外提供服务，以供使用者调用，它的API在一下两个地方：

java.lang.management：
javax.management.*：包括javax.management.loading、javax.management.modelmbean等；
资源管理
既然JMX涉及到的是监控和管理，那么这它们都包括什么？核心是针对资源的一系列操作，什么是资源？在我理解，只要是能帮助是你的活动和系统正常运转的都算资源，那么对于一个应用来说，资源可以是：

硬件设备
计算机网络
操作系统
运行服务器
可以称之为资源的远远不止这些，比如运行这些的人员和开发者，也就是人力资源等。我们要做的就是对它们进行监控和管理，监控是为了及时发现问题，以便能够及时提出正确的解决方案，避免损失；管理是为了预防问题的发生，同时也是为了使资源能够得到有效的利用，使利益最大化。在监控和管理的时候要考虑的方面如下：

监控硬件和平台的运行情况：包括服务器和操作系统等；
合理配置资源：比如内存的配置是否合理，CPU是否足够强大；
收集应用运行的情况：比如说访问量多大，响应时间是否够快，哪个地区的访问人数最多；
在应用发生异常时能够及时定位问题所在：这是监控的核心之一；
在没有JMX之前，这些问题是如何解决的？我们可以想一下，每个资源吗，对应的厂家都有自己的监控和管理组件，那么如果想要全局更改一个配置，可能会设计到很多的监控组件，想想都让人头疼！我们的目标是集中管理和监控，显然之前那种环境是做不到这一点，但是通过JMX是可以的，这也是为什么提出标准的人是最有发言权的人！关于上面所有的方面，JMX都能很好的支持。

JMX的术语
每个框架下都有自己的专业术语，这些专业术语可以在一定程度上展现这个框架的设计思想，比如Spring的bean，JPA的Entity等等。从JMX中涉及到术语也可以看出JMX的整个架构情况：

管理资源（Manageable resource）：像我在上面说的，只要是能帮助是你的活动和系统正常运转的都算资源，可以是硬件、也可以是应用，只要能够被Java的类描述即可；

管理组件（MBean，managed bean）：从资源的角度来看，它是一个对抽象的资源的一个描述，比如说如果资源是数据库，管理组件中可以提供数据库的一些描述信息，比如数据库服务器的运行地址、端口，类型以及最大连接数等等，但是这个类必须满足JMX规范中的提出的要求，比如命名规则和实现标准，类似于JavaBean。由于管理组件是资源的抽象，所以管理应用是直接面向MBean，也就说MBean会被暴露给管理应用来操作和访问，通过MBean中提供的属性和方法，MBean也有几种类型，为了不添堵，如果没有特殊说明，本文指的都是Standard MBean，关于它的具体使用在下面的编码部分说明；

管理组件服务器（MBean Server）：简单的来看，它是一个容器，用来盛装和管理一组MBeans，它是整个JMX管理环境的核心，由于其中有很多的MBean，所以它必须提供一种机制来区分各个MBean，这就是注册机制，每个添加到MBean Server的MBean在注册的时候都要提供一个ObjectName来区分彼此，MBean Server 通过这个ObjectName来查找每个MBean，在JMX中是通过ObjectName类来为每个MBean提供唯一的一个标识，它包括两部分：

域名：这个域名通常是和想要注册到的MBean Server的名称标识相同，以便根据功能模块区分不同MBean Server中的MBean；
键值对列表：被用来唯一的标识MBean，也提供了关于该MBean的信息，形式如下：HelloAgent:name=helloWorld；其中的属性不一定是真实的MBean的属性，仅仅要求当和其他的MBean比较的时候能够唯一标识，每个ObjectName中都要至少有一个属性；
当ObjectName重复的时候，注册的时候会抛出javax.management.InstanceAlreadyExistsException，在后面的编码阶段会着重说明这一点；

JMX代理（JMX Agent）：它提供一系列的服务来管理一系列的MBeans，它是MBean Server的容器。JMX代理提供一些服务，包括创建MBean之间的关系，动态加载类，简单监视服务，以及计时器；代理可以有一系列的协议适配器（Protocol adapters ）和连接器（connectors ），协议适配器和连接器也是Java类，通常情况下也是MBeans，这些适配器和连接器是提供转接功能而存在的，以便可以在远程使用不同的协议，通过客户端与这个代理连接，它内部可以映射到一个外部的协议或者暴露代理给远程连接，这就意味着JMX代理可以被一系列不同的管理协议和工具使用，在本质上是插件式架构的一种体现，体现了可插拔的思想；

协议适配器和连接器（Protocol adapters and connectors ）：协议适配器和连接器是JMX Agent中的对象，将代理暴露给不同的管理应用和协议，这个和不同的数据库的驱动程序类似，每个数据库都有自己的一套协议来联系，为了保持进行连接，就需要在JDBC应用和数据库服务器之间通过不同的驱动程序关联。一个JMX Agent可以有任意数量的适配器和连接器；它们也是MBeans；

通知（Notification ）：通知是由MBeans和MBean Server 提出的，其中封装了具体的事件和相应的数据。其他的MBeans或者Java对象可以注册作为监听器来接收这些通知，其实就是观察者设计模式在JMX中的应用；

JMX的架构
JMX的架构是组件式的，被设计为三层：

分布层（Distributed layer）：包含可以使管理应用与JMX Agents交互的组件。一旦通过交互组件与JMX Agents建立连接，用户可以用管理工具来和注册在Agents中的MBeans进行交互；
代理层（Agent layer ）：包含JMX Agent以及它们包含的MBean Servers。Agent layer的主要组件是MBean server，作为JMX Agents的核心，它充当MBeans的注册中心。该层提供了4个Agent 服务来使对MBean的管理更容易：计时器（Timer）、监控（monitoring）、动态加载MBean（dynamic MBean loading ）、关系服务（relationship services ）；
指示层（Instrumentation layer ）：包含代表可管理资源的MBeans。该层是最接近管理资源的，它由注册在Agents中的MBeans组成，这个MBean允许通过JMX Agent来管理。每个MBean都暴露出来针对底层资源的操作和访问；
具体的架构分层如下图：

JMX的简单使用
第一步：建立一个MBean接口，这个接口的名称要以“MBean”结束，这是要暴露给管理应用使用的，但是具体其中是怎么是实现的，管理应用是不会考虑的，MBean接口和相应的实现类如下：

HelloWorldMBean.java：

public interface HelloWorldMBean {
    String getGreeting();
    void setGreeting(String greeting);
    void printGreeting();
}
1
2
3
4
5
实现类HelloWorld.java：

public class HelloWorld implements HelloWorldMBean {
    private String greeting;

    public HelloWorld(String greeting) {
        this.greeting = greeting;
    }
    public HelloWorld() {
        this.greeting = "hello world!";
    }
    public String getGreeting() {
        return greeting;
    }
    public void setGreeting(String greeting) {
        this.greeting = greeting;
    }
    public void printGreeting() {
        System.out.println(greeting);
    }
}

第二步：创建MBeanServer和JMX Agent，MBeanServer是在JMX Agent 中存在的，代码如下：

public class HelloAgent implements NotificationListener {
    private MBeanServer mbs;

    public HelloAgent() {
        this.mbs = MBeanServerFactory.createMBeanServer("HelloAgent");

        HelloWorld hw = new HelloWorld();
        ObjectName helloWorldName = null;
        try{
            helloWorldName = new ObjectName("HelloAgent:name=helloWorld");
            mbs.registerMBean(hw, helloWorldName);
        } catch (Exception e) {
            e.printStackTrace();
        }
        startHtmlAdaptorServer();
    }

    public void startHtmlAdaptorServer(){
        HtmlAdaptorServer htmlAdaptorServer = new HtmlAdaptorServer();
        ObjectName adapterName = null;
        try {
            // 多个属性使用,分隔
            adapterName = new ObjectName("HelloAgent:name=htmladapter,port=9092");
            htmlAdaptorServer.setPort(9092);
            mbs.registerMBean(htmlAdaptorServer, adapterName);
            htmlAdaptorServer.start();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String args[]){
        System.out.println(" hello agent is running");
        HelloAgent agent = new HelloAgent();
    }
}

首先创建MBean Server，并提供一个名称来唯一标识该Server，这里是使用工厂模式来创建该Server
将我们创建的MBean注册到MBean Server中，并提供ObjectName来唯一标识，这就是我们在上面提到的域名+属性列表来唯一标识；
创建一个Adaptor以便我们测试访问，这里使用的是HtmlAdaptorServer，这是sun公司之前提供的，我一直想通过maven导进来，但是并没有发现这个包，无奈用到HtmlAdaptorServer类，需要用到jmxtools.jar, 可以去这里下载，有两个包：jmx-1_2_1-ri.zip； jmx_remote-1_0_1_03-ri.zip。jmx-1_2_1-ri.zip解压后lib中有jmxri.jar和jmxtools.jar,将jmxtool.jar拷贝出来放入classpath中即可（jmxri.jar在JDK5+已经包被包含了）；
从上面可以看到HtmlAdaptorServer 也是一个MBean，也需要被加入到MBean Server中；