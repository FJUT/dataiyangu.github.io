title: ognl和值栈
author: Leesin.Dong
tags:
  - struts
  - interview
categories:
  - java
  - struts2
date: 2018-11-08 23:26:00
---
原文地址： https://blog.csdn.net/yerenyuan_pku/article/details/67709693

OGNL的概述
=======

什么是OGNL
-------

据度娘所说：

> OGNL是Object-Graph Navigation Language的缩写，它是一种功能强大的表达式语言，通过它简单一致的表达式语法，可以存取对象的任意属性，调用对象的方法，遍历整个对象的结构图，实现字段类型转化功能。它使用相同的表达式去存取对象的属性。

OGNL的全称是对象图导航语言(Object-Graph Navigation Language)，它是一种功能强大的开源表达式语言，使用这种表达式语言，可以通过某种表达式语法，存取Java对象的任意属性，调用Java对象的方法，同时能够自动实现必要的类型转换。如果把表达式看作是一个带有语义的字符串，那么OGNL无疑成为了这个语义字符串与Java对象之间沟通的桥梁。

OGNL的作用
-------

Struts2默认的表达式语言就是OGNL，它具有以下特点：

*   支持对象方法调用。例如：objName.methodName()
*   支持类静态方法调用和值访问，表达式的格式为`@[类全名(包括类路径)]@[方法名 | 值名]`，例如：@java.lang.String@format(‘foo %s’, ‘bar’)
*   支持赋值操作和表达式串联，例如：price=100, discount=0.8, calculatePrice()，在方法中进行乘法计算会返回80
*   访问OGNL上下文(OGNL context)和ActionContext
*   操作集合对象

OGNL的要素
-------

了解什么是OGNL及其特点后，接下来，分析一下OGNL的结构。OGNL的操作实际上就是围绕着OGNL结构的三个要素而进行的，分别是表达式(Expression)、根对象(Root Object)、上下文环境(Context)，下面分别讲解这三个要素，具体如下：

1.  表达式  
    表达式是整个OGNL的核心，OGNL会根据表达式去对象中取值。所有OGNL操作都是针对表达式解析后进行的。它表明了此次OGNL操作要”做什么”。表达式就是一个带有语法含义的字符串，这个字符串规定了操作的类型和操作的内容。OGNL支持大量的表达式语法，不仅支持这种”链式”对象访问路径，还支持在表达式中进行简单的计算。
2.  根对象(Root)  
    Root对象可以理解为OGNL的操作对象，表达式规定了”做什么”，而Root对象则规定了”对谁操作”。OGNL称为对象导航语言，所谓对象图，即以任意一个对象为根，通过OGNL可以访问与这个对象关联的其他对象。
3.  Context对象  
    实际上OGNL的取值还需要一个上下文环境。设置了Root对象，OGNL可以对Root对象进行取值或写值等操作，Root对象所在环境就是OGNL的上下文环境(Context)。上下文环境规定了OGNL的操作”在哪里进行”。上下文环境Context是一个Map类型的对象，在表达式中访问Context中的对象，需要使用”#”号加上对象名称，即”#对象名称”的形式。

总结来说：OGNL是一种表达式语言，之前我们学过el表达式，el表达式用于在JSP页面中获取域对象里面的值，但OGNL表达式比el表达式功能更加强大，我们使用OGNL表达式主要做的事情是在Struts2里面获取值栈中的数据(OGNL在Struts2里面经常和Struts2标签一起使用)。这就是我们接下来要重点讲解的内容，即在Struts2里面如何获取值栈ZH数据。  
我们还需要注意一点：OGNL本身不是Struts2框架的一部分，而是一个单独的项目，只不过它经常和Struts2框架一起使用而已。要使用OGNL表达式，首先要导入Jar包，在Struts2框架里面提供了OGNL表达式的Jar包：  
![这里写图片描述](https://img-blog.csdn.net/20170328233914549?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQveWVyZW55dWFuX3BrdQ==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

OGNL的入门
-------

前面已经提到过OGNL支持对象方法调用，比如访问对象方法和访问静态方法，这里结合一些案例来演示OGNL是如何调用方法的。  
案例，使用Struts2的标签+OGNL表达式来计算字符串”hello”的长度，即演示如何调用对象的方法。  
在Eclipse中创建一个名为struts2_day03的Web项目，之后快速搭建好Struts2框架的开发环境。接着在WebContent目录下新建一个JSP页面——ognl.jsp，内容如下：

    <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
    <%@ taglib uri="/struts-tags" prefix="s" %>
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
    </head>
    <body>
        <!-- 使用OGNL计算字符串的长度 -->
        <!-- 1.Strust2标签，在页面中引入Strust2的标签库，
            使用标签，在标签里面有一个value属性，value属性值写的是OGNL表达式
        -->
        <s:property value="'hello'.length()" />
    </body>
    </html>

然后在浏览器地址栏中输入URL地址`http://localhost:8080/struts2_day03/ognl.jsp`，可以看到最终的输出结果为5。  
通过这个案例可得出两点：

1.  OGNL表达式要和Struts2标签(`<s:property>`)一起使用。
2.  在该Struts2标签里面有一个value属性，在value属性值里面要写上OGNL表达式。

值栈的概述
=====

什么是值栈
-----

ValueStack是Struts2的一个接口，字面意义为值栈，OgnlValueStack是ValueStack的实现类，客户端发起一个请求，Struts2框架会创建一个Action实例，同时创建一个OgnlValueStack值栈实例，OgnlValueStack贯穿整个Action的生命周期，Struts2中使用OGNL将请求Action的参数封装为对象存储到值栈中，并通过OGNL表达式读取值栈中的对象属性值。  
我们之前学习过，比如说在Servlet中要把数据传递到页面中显示，就要在Servlet里面把数据放到域对象里面，然后在JSP页面中使用el表达式获取域对象里面的值。而在Struts2框架里面提供了一个东西——值栈，它类似于域对象，值栈应用在Struts2的Action类里面，我们在值栈中可以存值和取值。  
接下来我就来讲讲值栈的存储位置，在讲这个知识点之前，我们得清楚Servlet和Action之间的区别：

*   Servlet默认在第一次访问的时候创建，而且只会创建一次，可以理解为它是单实例对象。
*   Action在访问的时候创建，每次访问Action的时候都会创建一个Action对象，可以理解为它是多实例对象。

我们知道了每次访问Action的时候，都会创建一个Action对象之后，就来讲值栈的存储位置，即在每个Action对象里面都会存在一个值栈对象。那么值栈的使用范围呢？值栈是使用在Action范围的。

获取值栈对象
------

值栈存在于每个Action对象里面。那到底如何获取值栈对象呢？步骤为：

1.  使用ActionContext类，得到ActionContext对象。
2.  使用ActionContext对象里面的方法得到值栈对象。

    // 1.获取ActionContext对象
    ActionContext context = ActionContext.getContext();
    // 2.调用ActionContext对象的方法获取到值栈对象
    ValueStack stack1 = context.getValueStack();

注意：在一个Action对象里面只有一个值栈对象。下面就来举例说明这点。  
在src目录下创建一个cn.itcast.action包，并在该包下新建一个Action类——UserAction.java。

    public class UserAction extends ActionSupport {
    
        @Override
        public String execute() throws Exception {
            // 1.获取ActionContext对象
            ActionContext context = ActionContext.getContext();
            // 2.调用ActionContext对象的方法获取到值栈对象
            ValueStack stack1 = context.getValueStack();
    
            ValueStack stack2 = context.getValueStack();
    
            System.out.println(stack1 == stack2); // true
    
            return NONE;
        }
    }

然后在struts.xml核心配置文件中配置好该Action。

    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE struts PUBLIC
        "-//Apache Software Foundation//DTD Struts Configuration 2.3//EN"
        "http://struts.apache.org/dtds/struts-2.3.dtd">
    <struts>
        <package name="demo1" extends="struts-default" namespace="/">
            <action name="user" class="cn.itcast.action.UserAction"></action>
        </package>
    </struts>

最后在浏览器地址栏中输入URL地址`http://localhost:8080/struts2_day03/user.action`，可以看到Eclipse控制台输出结果为true。这也就说明了在一个Action对象里面只有一个值栈对象。

值栈的内部结构
-------

通过查看OgnlValueStack类的源码，可发现在OgnlValueStack类中包含两部分，值栈和map(即OGNL上下文)  

![upload successful](/images/my_blog_81.png)

*   Context：即OgnlContext上下文，它是一个Map结构，上下文中存储了一些引用，parameters、request、session、application等，上下文的Root为CompoundRoot。  
    OgnlContext中的一些引用：
    
    *   parameters：该Map中包含当前请求的请求参数
    *   request：该Map中包含当前request对象中的所有属性
    *   session：该Map中包含当前session对象中的所有属性
    *   application：该Map中包含当前application对象中的所有属性
    *   attr：该Map按如下顺序来检索某个属性：request、session、application。
*   CompoundRoot：存储了action实例，它作为OgnlContext的Root对象。  
    CompoundRoot继承ArrayList实现压栈和出栈的功能，拥有栈的特点，先进后出，后进先出，最后压进栈的数据在栈顶。我们把它称为对象栈。
    

Struts2对原OGNL作出的改进就是Root使用CompoundRoot(自定义栈)，使用OgnlValueStack的findValue方法可以在CompoundRoot中从栈顶向栈底找查找的对象的属性值。CompoundRoot作为OgnlContext的Root对象，并且在CompoundRoot中action实例位于栈顶，当读取action的属性值时会先从栈顶对象中找对应的属性，如果找不到则继续找栈中的其他对象，如果找到则停止查找。

现在通过一个案例来分析一下值栈的内部结构。在UserAction类代码的如下位置加上一个断点：

    ValueStack stack1 = context.getValueStack();

然后以断点模式来启动tomcat，Watch一下stack1值，可得到如下结果：  


![upload successful](/images/my_blog_85.png)

其实，在Struts2的标签里面有一个标签可以看到值栈的内部结构，这个标签就是`<s:debug>`。现在我们就来举例演示。  
在src目录下新建一个cn.itcast.valuestack包，并在该包下创建一个Action类——ValueStackDemo1.java。

    public class ValueStackDemo1 extends ActionSupport {
        @Override
        public String execute() throws Exception {
            return "demo1";
        }
    }

接着在struts.xml核心配置文件中配置好该Action类，如下：

    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE struts PUBLIC
        "-//Apache Software Foundation//DTD Struts Configuration 2.3//EN"
        "http://struts.apache.org/dtds/struts-2.3.dtd">
    <struts>
        <package name="demo1" extends="struts-default" namespace="/">
            <action name="user" class="cn.itcast.action.UserAction"></action>
            <action name="stackdemo1" class="cn.itcast.valuestack.ValueStackDemo1">
                <result name="demo1">/demo1.jsp</result>
            </action>
        </package>
    </struts>

紧接着在WebContent目录下新建一个JSP页面——demo1.jsp。

    <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
    <%@ taglib uri="/struts-tags" prefix="s" %>
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
    </head>
    <body>
        <!-- 使用这个标签可以看到值栈内部结构 -->
        <s:debug></s:debug>
    </body>
    </html>

最后在浏览器地址栏中输入URL地址`http://localhost:8080/struts2_day03/stackdemo1.action`，可以看到如下界面：  

![upload successful](/images/my_blog_87.png)

点击这个超链接即可看到值栈结构，如下：  
最后在浏览器地址栏中输入URL地址`http://localhost:8080/struts2_day03/stackdemo1.action`，可以看到如下界面：  

![upload successful](/images/my_blog_88.png)
注意：`<s:debug>`这个标签只是在调试时候使用。

向值栈中放入数据
========

向值栈中放入数据有三种方式，分别是：

1.  第一种方式： 获取值栈对象，调用值栈对象里面的set方法。
2.  第二种方式：获取值栈对象，调用值栈对象里面的push方法。
3.  第三种方式：在action成员变量位置定义变量，生成这个变量的get方法。

不过在实际开发中，我们一般都使用的是第三种方式。所有这种方式，我们应该重点掌握。

向值栈中放入字符串
---------

下面我们分别用三种方式来演示如何向值栈中放入字符串。

### 第一种方式： 获取值栈对象，调用值栈对象里面的set方法

在src目录下新建一个cn.itcast.valuestack包，并在该包下创建一个Action类——ValueStackDemo1.java。

    public class ValueStackDemo1 extends ActionSupport {
    
        @Override
        public String execute() throws Exception {
    
            // 第一种方式
            // 1.获取值栈对象
            ActionContext context = ActionContext.getContext();
            ValueStack stack = context.getValueStack();
            // 2.调用值栈对象里面的set方法
            stack.set("username", "liayun");
    
            return "demo1";
        }
    
    }

然后在struts.xml核心配置文件中配置好该Action类。

    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE struts PUBLIC
        "-//Apache Software Foundation//DTD Struts Configuration 2.3//EN"
        "http://struts.apache.org/dtds/struts-2.3.dtd">
    <struts>
        <package name="demo1" extends="struts-default" namespace="/">
            <action name="user" class="cn.itcast.action.UserAction"></action>
            <action name="stackdemo1" class="cn.itcast.valuestack.ValueStackDemo1">
                <result name="demo1">/demo1.jsp</result>
            </action>
        </package>
    </struts>

demo1.jsp页面内容不必修改，最后在浏览器地址栏中输入URL地址`http://localhost:8080/struts2_day03/stackdemo1.action`，点击超链接即可看到值栈结构，如下：  



![upload successful](/images/my_blog_89.png)

### 第二种方式：获取值栈对象，调用值栈对象里面的push方法

修改Action类——ValueStackDemo1.java的代码为：

    public class ValueStackDemo1 extends ActionSupport {
    
        @Override
        public String execute() throws Exception {
            // 向变量里面设置值
            // username = "叶十一少";
    
            // 第一种方式
            // 1.获取值栈对象
            ActionContext context = ActionContext.getContext();
            ValueStack stack = context.getValueStack();
            // 2.调用值栈对象里面的set方法
            stack.set("username", "liayun");
    
            // 调用push方法
            stack.push("caonima");
    
            return "demo1";
        }
    
    }

struts.xml核心配置文件和demo1.jsp页面内容都不必修改，然后在浏览器地址栏中输入URL地址`http://localhost:8080/struts2_day03/stackdemo1.action`，点击超链接即可看到值栈结构，如下：  

![upload successful](/images/my_blog_90.png)
### 第三种方式：在action成员变量位置定义变量，生成这个变量的get方法

修改Action类——ValueStackDemo1.java的代码为：

    public class ValueStackDemo1 extends ActionSupport {
    
        private String username;
    
        public String getUsername() {
            return username;
        }
    
        @Override
        public String execute() throws Exception {
            // 向变量里面设置值
            username = "叶十一少";
    
            return "demo1";
        }
    }

struts.xml核心配置文件和demo1.jsp页面内容也都不必修改，然后在浏览器地址栏中输入URL地址`http://localhost:8080/struts2_day03/stackdemo1.action`，点击超链接即可看到值栈结构，如下：  

![upload successful](/images/my_blog_91.png)
向值栈中放入对象
--------

我举例来演示如何向值栈中放入对象。  
首先在cn.itcast.valuestack包中创建一个JavaBean——User.java。

    public class User {
    
        private String username;
        private String address;
        public String getUsername() {
            return username;
        }
        public void setUsername(String username) {
            this.username = username;
        }
        public String getAddress() {
            return address;
        }
        public void setAddress(String address) {
            this.address = address;
        }
    
    }

然后再在该包下编写一个Action类——ObjectValueStack.java。

    public class ObjectValueStack extends ActionSupport {
    
        // 1.声明对象的变量
        private User user = new User();
    
        // 2.生成b变量的get方法
        public User getUser() {
            return user;
        }
    
        public String execute() throws Exception {
            // 3.向值栈的对象里面设置值(即向user变量里面设置值)
            user.setUsername("凤姐");
            user.setAddress("美国");
    
            return "objectValue";
        }
    
    }

接着在struts.xml核心配置文件中配置好该Action类。

    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE struts PUBLIC
        "-//Apache Software Foundation//DTD Struts Configuration 2.3//EN"
        "http://struts.apache.org/dtds/struts-2.3.dtd">
    <struts>
        <package name="demo1" extends="struts-default" namespace="/">
            <action name="user" class="cn.itcast.action.UserAction"></action>
            <action name="stackdemo1" class="cn.itcast.valuestack.ValueStackDemo1">
                <result name="demo1">/demo1.jsp</result>
            </action>
            <action name="objectstack" class="cn.itcast.valuestack.ObjectValueStack">
                <result name="objectValue">/demo1.jsp</result>
            </action>
        </package>
    </struts>

demo1.jsp页面的内容不必修改，最后在浏览器地址栏中输入URL地址`http://localhost:8080/struts2_day03/objectstack.action`，点击超链接即可看到值栈结构，如下：  

![upload successful](/images/my_blog_92.png)

向值栈中放入List集合
------------

我举例来演示如何向值栈中放入List集合。  
首先在cn.itcast.valuestack包中创建一个Action类——ListValueStack.java。

    public class ListValueStack extends ActionSupport {
    
        // 1.声明list集合的变量
        private List<User> list = new ArrayList<User>();
    
        // 2.生成get方法
        public List<User> getList() {
            return list;
        }
    
        @Override
        public String execute() throws Exception {
            // 3.向值栈的list里面设置值
            User u1 = new User();
            u1.setUsername("如花");
            u1.setAddress("越南");
    
            User u2 = new User();
            u2.setUsername("小金");
            u2.setAddress("朝鲜");
    
            list.add(u1);
            list.add(u2);
            return "list";
        }
    
    }

接着在struts.xml核心配置文件中配置好该Action类。

    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE struts PUBLIC
        "-//Apache Software Foundation//DTD Struts Configuration 2.3//EN"
        "http://struts.apache.org/dtds/struts-2.3.dtd">
    <struts>
        <package name="demo1" extends="struts-default" namespace="/">
            <action name="user" class="cn.itcast.action.UserAction"></action>
            <action name="stackdemo1" class="cn.itcast.valuestack.ValueStackDemo1">
                <result name="demo1">/demo1.jsp</result>
            </action>
            <action name="objectstack" class="cn.itcast.valuestack.ObjectValueStack">
                <result name="objectValue">/demo1.jsp</result>
            </action>
            <action name="liststack" class="cn.itcast.valuestack.ListValueStack">
                <result name="list">/demo1.jsp</result>
            </action>
        </package>
    </struts>

demo1.jsp页面的内容不必修改，最后在浏览器地址栏中输入URL地址`http://localhost:8080/struts2_day03/liststack.action`，点击超链接即可看到值栈结构，如下：  

![upload successful](/images/my_blog_93.png)
从值栈中获取数据
========

在jsp页面中，可使用Struts2标签+OGNL表达式获取到值栈中的数据。类似于：

    <s:property value="ognl表达式" />

获取字符串
-----

上面我们已把字符串放到值栈里面，如：

    public class ValueStackDemo1 extends ActionSupport {
    
        private String username;
    
        public String getUsername() {
            return username;
        }
    
        @Override
        public String execute() throws Exception {
            // 向变量里面设置值
            username = "叶十一少";
    
            return "demo1";
        }
    }

那么我们可以在jsp页面中获取值栈里面的字符串的值，如下：

    <!-- 获取值栈里面的字符串的值 -->
    <s:property value="username" />

获取对象
----

上面我们已把对象放到值栈里面了，如：

    public class ObjectValueStack extends ActionSupport {
    
        // 1.声明对象的变量
        private User user = new User();
    
        // 2.生成b变量的get方法
        public User getUser() {
            return user;
        }
    
        public String execute() throws Exception {
            // 3.向值栈的对象里面设置值(即向user变量里面设置值)
            user.setUsername("凤姐");
            user.setAddress("美国");
    
            return "objectValue";
        }
    
    }

那么我们可以在jsp页面中获取值栈里面的对象的值，如下：

    <!-- 获取值栈的对象的值 -->
    <s:property value="user" /><br/> <!-- 得到是一个User对象 -->
    <s:property value="user.username" /><br/>
    <s:property value="user.address" />

获取List集合
--------

上面我们已把List集合放到值栈里面了，如：

    public class ListValueStack extends ActionSupport {
    
        // 1.声明list集合的变量
        private List<User> list = new ArrayList<User>();
    
        // 2.生成get方法
        public List<User> getList() {
            return list;
        }
    
        @Override
        public String execute() throws Exception {
            // 3.向值栈的list里面设置值
            User u1 = new User();
            u1.setUsername("如花");
            u1.setAddress("越南");
    
            User u2 = new User();
            u2.setUsername("小金");
            u2.setAddress("朝鲜");
    
            list.add(u1);
            list.add(u2);
            return "list";
        }
    
    }

那么在jsp页面中我们如何获取值栈里面的List集合的数据呢？共有三种方式，下面我们分别来加以说明。  
第一种方式比较傻逼，根本就不会使用到。

    <!-- 获取值栈里面的List集合的数据 -->
    <!-- 第一种方式 -->
    <s:property value="list[0].username" />
    <s:property value="list[0].address" /><br/>
    <s:property value="list[1].username" />
    <s:property value="list[1].address" /><br/>

第二种方式——在Struts2标签里面有一个可以进行遍历操作的标签，类似于JSTL标签库中的foreach标签，第二种方式就要使用到它。

    <!-- 第二种方式 -->
    <s:iterator value="list">
        <!-- 遍历得到list集合里面的每个User对象 -->
        <s:property value="username" />
        ------
        <s:property value="address" />
        <br/>
    </s:iterator>

第三种方式：

    <!-- 第三种方式 -->
    <s:iterator value="list" var="user">
        <!-- 遍历得到list集合里面的每个User对象 -->
        <s:property value="#user.username" />
        ======
        <s:property value="#user.address" />
        <br/>
    </s:iterator>

因为我们现在操作的数据都是在值栈的root里面，如果你使用Struts2里面的iterator标签的时候，在标签里面写了var，它会把list集合中每次遍历出来的User对象放到context里面。而在**获取context里面的值，写OGNL表达式时，要求在OGNL表达式之前添加#号！**

获取值栈数据的其他操作
-----------

之前，我们已学会了使用值栈对象的set方法把数据放到值栈里面，也学会了使用值栈对象里面的push方法把数据放到值栈里面。如：

    public class ValueStackDemo1 extends ActionSupport {
    
        @Override
        public String execute() throws Exception {
            // 向变量里面设置值
            // username = "叶十一少";
    
            // 第一种方式
            // 1.获取值栈对象
            ActionContext context = ActionContext.getContext();
            ValueStack stack = context.getValueStack();
            // 2.调用值栈对象里面的set方法
            stack.set("username", "liayun");
    
            // 调用push方法
            stack.push("caonima");
    
            return "demo1";
        }
    
    }

那么我们可以在jsp页面中获取值栈里面使用set方法和push方法设置的值 ，如下：

    <!-- 获取使用set方法设置的值 -->
    <s:property value="username" />
    <!-- 
        获取使用push方法设置的值
        把你放的这些值会存到默认的一个数组里面去，数组的名称是top
    -->
    <s:property value="[0].top" /> <!-- 得到栈顶的数据 -->

这种方式只要求理解即可，不必深究，因为没什么屌用！

EL表达式为什么能获取值栈数据？
----------------

当然了，我们使用EL表达式是能够访问值栈的，但我们应该明确一点，EL表达式是用于在jsp中获取域对象里面的数据的，其实EL表达式不能直接获取值栈数据。然而我们也说了，EL表达式是能获取值栈数据的，这里面的底层原因我们肯定是要知道的，归根结底就是要阅读源码：  
Struts2底层对Request对象的getAttribute()方法进行了增强，可通过查看StrutsRequestWrapper类的源码得知：

    public class StrutsRequestWrapper extends HttpServletRequestWrapper {
    
        private static final String REQUEST_WRAPPER_GET_ATTRIBUTE = "__requestWrapper.getAttribute";
        private final boolean disableRequestAttributeValueStackLookup;
    
        /**
         * The constructor
         * @param req The request
         */
        public StrutsRequestWrapper(HttpServletRequest req) {
            this(req, false);
        }
    
        /**
         * The constructor
         * @param req The request
         * @param disableRequestAttributeValueStackLookup flag for disabling request attribute value stack lookup (JSTL accessibility)
         */
        public StrutsRequestWrapper(HttpServletRequest req, boolean disableRequestAttributeValueStackLookup) {
            super(req);
            this.disableRequestAttributeValueStackLookup = disableRequestAttributeValueStackLookup;
        }
    
        /**
         * Gets the object, looking in the value stack if not found
         *
         * @param key The attribute key
         */
        public Object getAttribute(String key) {
            if (key == null) {
                throw new NullPointerException("You must specify a key value");
            }
    
            if (disableRequestAttributeValueStackLookup || key.startsWith("javax.servlet")) {
                // don't bother with the standard javax.servlet attributes, we can short-circuit this
                // see WW-953 and the forums post linked in that issue for more info
                return super.getAttribute(key);
            }
    
            ActionContext ctx = ActionContext.getContext();
            Object attribute = super.getAttribute(key);
    
            if (ctx != null && attribute == null) {
                boolean alreadyIn = isTrue((Boolean) ctx.get(REQUEST_WRAPPER_GET_ATTRIBUTE));
    
                // note: we don't let # come through or else a request for
                // #attr.foo or #request.foo could cause an endless loop
                if (!alreadyIn && !key.contains("#")) {
                    try {
                        // If not found, then try the ValueStack
                        ctx.put(REQUEST_WRAPPER_GET_ATTRIBUTE, Boolean.TRUE);
                        ValueStack stack = ctx.getValueStack();
                        if (stack != null) {
                            attribute = stack.findValue(key);
                        }
                    } finally {
                        ctx.put(REQUEST_WRAPPER_GET_ATTRIBUTE, Boolean.FALSE);
                    }
                }
            }
            return attribute;
        }
    }

getAttribute()是用于获取域对象里面的值的方法。它的一个大致上的执行流程是：

1.  首先到request里面找是否有值，如果request域里面有值，直接返回。
2.  如果域对象里面没有值，则得到值栈对象，从值栈对象里面把值获取到，最后放到域对象里面去。

EL的特殊字符的使用
==========

`#`号的使用
-------

之前已说过`#`号是用于获取context里面的数据的。context是一个key-value键值对的Map集合，里面有request对象的引用。现在我就来举例说明`#`号的使用。  
首先在cn.itcast.valuestack包中编写一个Action类——ContextValueAction.java。

    public class ContextValueAction extends ActionSupport {
        @Override
        public String execute() throws Exception {
            // 向request域里面放值
            HttpServletRequest request = ServletActionContext.getRequest();
            request.setAttribute("username", "requestValue");
    
            return "contextvalue";
        }
    }

并在struts.xml核心配置文件中配置好该Action类。

    <action name="context" class="cn.itcast.valuestack.ContextValueAction">
        <result name="contextvalue">/contextvalue.jsp</result>
    </action>

最后在WebContent目录下新建一个jsp页面——contextvalue.jsp。

    <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
    <%@ taglib uri="/struts-tags" prefix="s" %>
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
    </head>
    <body>  
        <!-- 获取context里面的数据 -->
        <s:property value="#request.username" />
    </body>
    </html>

这样即可获取到request域里面的数据。

`%`的使用
------

`%`要和Struts2的表单标签一起使用，至于Struts2的表单标签，后面我会介绍到。  
这儿是紧接着上面的案例来讲的，我使用Struts2的表单标签，并使用OGNL表达式来显示值，如下；

    <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
    <%@ taglib uri="/struts-tags" prefix="s" %>
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
    </head>
    <body>  
        <s:textfield value="#request.username"></s:textfield>
    </body>
    </html>

在浏览器地址栏中输入URL地址`http://localhost:8080/struts2_day03/context.action`，可看到如下界面：  

![upload successful](/images/my_blog_94.png)
发现OGNL表达式作为字符串显示出来了，而没有作为OGNL表达式来执行。要解决这个问题，就要使用`%`来强制解析OGNL表达式(即使用`%`让表单标签里面的值作为OGNL表达式执行)

    <%@ page language="java" contentType="text/html; charset=UTF-8"
        pageEncoding="UTF-8"%>
    <%@ taglib uri="/struts-tags" prefix="s" %>
    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Insert title here</title>
    </head>
    <body>  
        <s:textfield value="%{#request.username}"></s:textfield>
    </body>
    </html>

这时，才可看到正确的值。

`$`的使用
------

我们可在配置文件中使用OGNL表达式，即可在Struts2的配置文件中使用.xml文件或者是属性文件。关于 `$`符号的使用，后面会简单介绍到。

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()