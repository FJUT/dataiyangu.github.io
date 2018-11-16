title: MQ中的ccsid
author: Leesin.Dong
tags:
  - mq
categories:
  - 基础亦是进阶
  - mq
date: 2018-11-12 00:17:00
---
总的来说相当于  utf-8 和iso之类的。只不过不同的操作系统，默认值不一样，可以改。

值为队列管理器的CCSID或与之相匹配的CCSID。
例如Windows上的队列管理器的CCSID为1381，AIX上可设为1386或1208
export MQCCSID=1208


export MQCCSID=1386


--------------------------------------
CCSID是一个字符集的标识。作为unicode标准通过定义一个字符集内每个字符要对应那个数字值的方式定义了一个字符集。这说明CCSID就是一个定义字符集顺序的标识数码罢了。CCSID是IBM用来标识字符序列的标识代码。这个架构定义了SDCS(单字符集)的CCSID值，MBCS(多字符集)的CCSID值和混合单字符多字符集的混合CCSID值。多字符集的CCSID一般用于语言，比如中文，日文，韩文，这些语言的字符量很大，无法用单字节的码值来代表。
CCSID间的转换有多种类型。其中一种转换就是从一种CCSID到另一种CCSID的转换，举例来说从ASCII(CCSID 1252)到EBCDIC(CCSID 37)。另一种是从串数据到另一种数据类型的转换。举例来说转换字符串数据到数值。在所有的这种类型的转换中都必须标识CCSID值来保证转换的正确进行。但是转换是有要求的，第一种转换的前提是转到的CCSID的类型中要包含转换前的CCSID类型中要转换的字符，比如，如果从CCSID1381(S-CHGBPC-DATA)类型的简体中文的PC编码中的一个中文字符"中"字到其他CCSID编码转换到的编码起码要求这个CCSID编码的字符集中包含同样的"中"字。

-----------------------------------------------
WebSphere MQ 无法将 CCSID 1381 中标记的字符串数据转换为 CCSID 5488 中的数据。1381属于简体中文，5488属于GB18030，虽然都是中文，但是在语言集上是两个不相同的语言集，所以不能相互转换。实际上GB18030包含了简体中文，繁体中文以及几种少数民族的语言，后面两种字符都是在简体中文集中找不到对应映射的，所以不能转换。有一种可行的解决办法就是用UTF-8（1208）作为两种语言集的中介。


MQCCSID 到底是什么，在干什么

首先，安装好了MQ Server端并新建了QMGR，可以更改其MQCCSID, 我们环境中所有QMGR的MQCCSID都是1386

再次，在MQ Server上面任何用户在往该MQGR的queue里面放消息时，消息使用的字符编码都是1386与QMGR的设定相同，这里即使在用户的profile里面export MQCCSID等于别的，结果消息也是始终与QMGR的设定保持一样。

最后，export MQCCSID只有在MQ Client端才有用，通过export MQSERVER 连接到MQ Server的MQ Client端可以给用户的profile里面设定MQCCSID, 我们这边的环境AIX 上面如果没有给用户特别设定MQCCSID则default的是819即en_US.ISO8859-1