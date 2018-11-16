title: jsp九大内置对象和四大作用域
author: Leesin.Dong
tags:
  - servlet
  - interview
  - 前端
categories:
  - java
  - servlet
date: 2018-11-09 13:16:00
---
九大内置对象

 

[plain] view plain copy

内置对象名          类型  
request        HttpServletRequest  
response       HttpServletResponse  
config         ServletConfig  
application    ServletContext  
session        HttpSession  
exception      Throwable  
page           Object(this)  
out            JspWriter  
pageContext    PageContext   
四大作用域

 

[plain] view plain copy

ServletContext     context域  
HttpServletRequet  request域  
HttpSession        session域     --前三种在学习Servlet时就能接触到  
PageContext        page域     --jsp学习的  