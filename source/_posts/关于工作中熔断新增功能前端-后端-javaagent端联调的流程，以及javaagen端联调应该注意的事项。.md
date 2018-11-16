title: 关于工作中熔断新增功能前端+后端+javaagent端联调的流程，以及javaagen端联调应该注意的事项。
author: Leesin.Dong
tags:
  - 工作_cloudwise
categories:
  - 工作_cloudwise
  - 工作中涉及的业务与技术
date: 2018-11-12 17:45:00
---
本片文章只针对本人工作中的笔记，误点的同学还请绕行~

1.前端传入javaagent端所需要的参数，传给后端。
2.后端将收到的参数存入数据库。并暴露一个可以给外部访问的提供前端传进来的出局的接口。
3.javaagent端去请求后端暴露的接口，得到相应的参数，然后继续做自己的工作。
javaagent端进行联调的注意事项：

1.客户端用开发版的，从开发版客户端配置licence。不需要从开发版下载sendproxy和javaagent，只需要配置licence。
2.配置了通过接口访问的参数，默认不经过sendproxy，启动报错Licence invalid,env not matched无关紧要，继续测试。
3.熔断的相关配置在开发版的管理》采集组建》状态通知》设置
4.新的开发版客户端地址要加-c   portal-local-c.touxxxxxxxx