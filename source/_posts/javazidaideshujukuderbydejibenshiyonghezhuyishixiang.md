title: 'jdk自带的数据库derby的基本使用以及注意事项，持续更新 '
author: Leesin.Dong
tags:
  - 工作_cloudwise
  - derby
  - java基础
categories:
  - 工作_cloudwise
  - 工作中匮乏的细节
date: 2018-11-07 16:41:00
---
版权声明：本文为作者原创，转载请注明出处，联系qq：32248827 https://blog.csdn.net/dataiyangu/article/details/81099067

通过网上查阅资料，自带的derby的位置在   jdk（本机jdk的安装目录）/db下    

**启动**：在db/bin下

> startNetworkServer（网络模式开启）    ** 在任意路径下，之后创建的数据库会在这个任意的路径下出现。**

> NetworkServerControl start -h 192.168.1.130 -p 1527 （能够指定ip，修改localhost）  

在启动过程中可能遇到的错误：

1

> 错误 08001：java.net.ConnectException：连接到端口 1527 上的服务器 10.0.4.120 时出错，消息为 Connection refused。

解决：查看对应的db服务是否开启

2

> 错误 XJ041：DERBY SQL error: SQLCODE: -40001, SQLSTATE: XJ041, SQLERRMC: 无法创建数据库“db”，请参阅下一个异常错误，以了解详细信息。::SQLSTATE: XBM0H

这是本人遇到的错误，是因为mac中jdk的安装路径是在/下的可能没有创建的权限 通过chmod -R  777 xxx   改变权限即可。

**创建数据库：**

**方法一：**

在lib目录下建立ij.properties 文件

ij.driver=org.apache.derby.jdbc.ClientDriver

ij.protocol=jdbc:derby://localhost:1527/

#当COREJAVA数据库不存在，创建一个

ij.database=COREJAVA;create=true

在另一个命令shell中，通过执行下面的命令来运行Derby 的交互式脚本执行工具（称为ij）： java -jar derby/lib/derbyrun.jar ij -p ij.properties 

**方法二：**

在任意的位置运行 ：ij

> ij: connect ‘jdbc:derby://localhost:1527/COREJAVA;create=true;user=root;password=root';  (一定要以分号结尾) 

**eclipse中java与derby连接并操作：**

> package com.cloudwise.leesin_derby;
> 
> import java.io.IOException;
> 
> import java.io.InputStream;
> 
> import java.nio.file.Files;
> 
> import java.nio.file.Paths;
> 
> import java.sql.Connection;
> 
> import java.sql.DriverManager;
> 
> import java.sql.ResultSet;
> 
> import java.sql.SQLException;
> 
> import java.sql.Statement;
> 
> import java.util.Properties;
> 
> /**
> 
>  \* Hello world!
> 
>  *
> 
>  */
> 
> public class Start 
> 
> {
> 
> public static void main(String\[\] args) throws IOException{
> 
>         try{
> 
>             runTest();
> 
>         }catch(SQLException ex){
> 
>             for(Throwable t:ex)
> 
>                 t.printStackTrace();
> 
>         }
> 
>     }
> 
>     /**
> 
>     *Runs a test by creating a table,adding a value,showing the table contents,and removing the table.
> 
>     */
> 
>     public static void runTest() throws SQLException,IOException{
> 
>         try(Connection conn = getConnection())
> 
>         {
> 
>             Statement stat = conn.createStatement();
> 
>             stat.executeUpdate("CREATE TABLE Greetings (Message CHAR(40))");
> 
>             // Using ' not "
> 
>             stat.executeUpdate("INSERT INTO Greetings VALUES('hello')");
> 
>             stat.executeUpdate("INSERT INTO Greetings VALUES('你好，世界')");
> 
>             try(ResultSet result = stat.executeQuery("SELECT * FROM Greetings")){
> 
>                 //将光标移动到下一行，初始在第一行之前
> 
>                 while(result.next()) 
> 
>                     System.out.println(result.getString("Message"));
> 
>             }
> 
>             stat.executeUpdate("DROP TABLE Greetings");
> 
>         }
> 
>     }
> 
>     /**
> 
>     *Gets a connection from the properties specified in the file database.properties.
> 
>     *@return the database connection
> 
>     */
> 
>     public static Connection getConnection() throws SQLException,IOException{
> 
>         Properties props = new Properties();
> 
> //        try(InputStream in = Files.newInputStream(Paths.get("db.txt"))){
> 
> //            props.load(in);
> 
> //        }
> 
>         try(InputStream r = Start.class.getClassLoader().getResourceAsStream("db.txt")){
> 
>             props.load(r);
> 
>         }
> 
>         String drivers = props.getProperty("jdbc.drivers");
> 
>         //为了适应那些不能自动注册的数据库驱动程序
> 
>         if(drivers != null)
> 
>             //这种方式可以提供多个驱动器，使用冒号分割
> 
>             System.setProperty("jdbc.drivers",drivers);
> 
>         try{
> 
>             Class.forName(drivers);
> 
>         }catch(Exception ex){
> 
>             ex.printStackTrace();
> 
>         }
> 
>         String url = props.getProperty("jdbc.url");
> 
>         System.out.println(url);
> 
>         String username = props.getProperty("jdbc.username");
> 
>         System.out.println(username);
> 
>         String password = props.getProperty("jdbc.password");
> 
>         System.out.println(password);
> 
>        // return DriverManager.getConnection("jdbc:derby://127.0.0.1:1527/newdb","root","root");
> 
>         return DriverManager.getConnection(url,username,password);
> 
>     }
> 
> }

在derby中是不存在   drop table if  exists  xxx    的操作的，想判断表格是否存在，如下：

> Connection conn = getConnection()
> 
>             Statement stat = conn.createStatement();
> 
>             DatabaseMetaData meta = conn.getMetaData();
> 
> ResultSet res = meta.getTables(null, null, null, new String\[\]{"TABLE"});
> 
> HashSet<String> set=new HashSet<String>();
> 
> while (res.next()) {
> 
> set.add(res.getString("TABLE_NAME"));
> 
> }
> 
> if(set.contains("Greetings1".toUpperCase())){
> 
> stat.executeUpdate("drop TABLE Greetings1");
> 
> }
> 
> if(set.contains("Greetings2".toUpperCase())){
> 
> stat.executeUpdate("drop TABLE Greetings2");
> 
> }
> 
> if(set.contains("Greetings3".toUpperCase())){
> 
> stat.executeUpdate("drop TABLE Greetings3");
> 
> }

未完待续。。

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()