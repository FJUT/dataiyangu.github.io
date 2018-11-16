title: java如何调用接口方式一
author: Leesin.Dong
tags:
  - interview
  - java
  - ''
categories:
  - java
  - java基础
date: 2018-11-12 11:32:00
---
原文地址：[http://www.cnblogs.com/angusbao/p/7677621.html](http://www.cnblogs.com/angusbao/p/7677621.html)

　　其实对于java调用接口进行获取对方服务器的数据在开发中特别常见，然而一些常用的基础的知识总是掌握不牢，让人容易忘记，写下来闲的时候看看，比回想总会好一些。

　　总体而言，一些东西知识点一直复制粘贴容易依赖，重要的是会忘记为什么这么写，只有理解到位，或者八九不离十才可以对于随时变化的情况进行分析，如果到家，还可以对别人或自己的进行优化。  
　　如果你在这篇没有找到你想要的，请点击：**[java如何调用接口方式二](http://www.cnblogs.com/angusbao/p/7727649.html)**

　　而对于一些知识点呢，对其进行整理和归纳，这样容易进行对比加深记忆,对下面代码和总结进行对比着看。

1.  首先URL restURL = new URL(url);这其中的url就是需要调的目标接口地址,URL类是java.net.*下的类，这个不陌生。
2.  setRequestMethod("POST");请求方式是有两个值进行选择，一个是GET,一个是POST，选择对应的请求方式
3.  setDoOutput(true);setDoInput(true);  
    setDoInput()  :  // 设置是否向httpUrlConnection输出，因为这个是post请求，参数要放在http正文内，因此需要设为true, 默认是false;     
    setDoOutput():   // 设置是否从httpUrlConnection读入，默认情况下是true; 
4.  setAllowUserInteraction();allowUserInteraction 如果为 true，则在允许用户交互（例如弹出一个验证对话框）的上下文中对此 URL 进行检查。
5.  下面代码的query是以  **属性=值**  传输的，若是多个则是 **属性=值&属性=值 **这种形式传递的，传递给服务器，让服务器自己去处理。  
    如何去生成这种形式的呢？最简单最快的方式在这里 **[Java将Map拼接成“参数=值&参数=值”](http://www.cnblogs.com/angusbao/p/7728513.html)**
6.  close();创建流进行写入或读取返回值，创建用完后记得关闭流。
7.  有事需要生成时间戳，可以参考**[java时间类各种方法及用法](http://www.cnblogs.com/angusbao/p/7568938.html)**，这个里面介绍了各种时间方法获取想要的时间戳

　　java如何调用呢？

![复制代码](http://common.cnblogs.com/images/copycode.gif)

package com.c;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class RestUtil {

    public String load(String url,String query) throws Exception
    {
        URL restURL = new URL(url);
        /\*
         \* 此处的urlConnection对象实际上是根据URL的请求协议(此处是http)生成的URLConnection类 的子类HttpURLConnection
         */
        HttpURLConnection conn = (HttpURLConnection) restURL.openConnection();
        //请求方式
        conn.setRequestMethod("POST");
        //设置是否从httpUrlConnection读入，默认情况下是true; httpUrlConnection.setDoInput(true);
        conn.setDoOutput(true);
        //allowUserInteraction 如果为 true，则在允许用户交互（例如弹出一个验证对话框）的上下文中对此 URL 进行检查。
        conn.setAllowUserInteraction(false);

        PrintStream ps = new PrintStream(conn.getOutputStream());
        ps.print(query);

        ps.close();

        BufferedReader bReader = new BufferedReader(new InputStreamReader(conn.getInputStream()));

        String line,resultStr="";

        while(null != (line=bReader.readLine()))
        {
        resultStr +=line;
        }
        System.out.println("3412412---"+resultStr);
        bReader.close();

        return resultStr;

    }
     
    public static void main(String \[\]args) {try {

            RestUtil restUtil = new RestUtil();

            String resultString = restUtil.load(
                    "http://192.168.10.89:8080/eoffice-restful/resources/sys/oaholiday",
                    "floor=first&year=2017&month=9&isLeader=N");

            } catch (Exception e) {

            // TODO: handle exception

            System.out.print(e.getMessage());

            }

        }
}

![复制代码](http://common.cnblogs.com/images/copycode.gif)

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()