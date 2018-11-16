title: hexo 托管到coding，pages申请ssl/tls证书失败
author: Leesin.Dong
top: 9999994
tags:
  - hexo
  - blog
categories:
  - 自建博客
  - hexo
date: 2018-11-02 11:37:00
---
![](images/blog_header4.jpg)
>托管到coding，pages申请ssl/tls证书失败

<!--more-->
版权声明：本文为作者原创，转载请注明出处，联系qq：32248827 https://blog.csdn.net/dataiyangu/article/details/83374438

首先这个证书有效期为三个月，到期了就需要重新申请。

这个证书申请时候有如下错误：

> 错误类型：金塔：极致：错误：未授权
> 
> **1，错误信息：来自[http://exmaple.com/.well-known/acme-challenge/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx的](http://exmaple.com/.well-known/acme-challenge/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx)响应无效  ：xxxxxxxx**

官方文档：

> 错误原因：无法获取正确的  
> 域名验证信息解决方式1：检查DNS的CNAME记录是否设置正确，静态Pages为pages.coding.me，动态Pages为pages.coding.io  
> 解决方式2：检查域名的DNS是否将海外线路解析到Coding Pages的服务器

官方客服：


![upload successful](/images/my_blog_140.png)

解决之后还有问题，因为这个的英文固定值。
![upload successful](/images/my_blog_141.png)

最终成功。