title: 关于ssh命令和scp命令需要指定端口时候的一些不同
author: Leesin.Dong
tags:
  - linux
categories:
  - linux
  - linux命令
  - aaa
date: 2018-11-11 23:45:00
---
scp -P 333 root@10.0.**:~/**

ssh root@10.0.** -p333

scp的p是大写 ssh的p是小写