title: Linux下安装IBM MQ
author: Leesin.Dong
tags:
  - mq
categories:
  - 基础亦是进阶
  - mq
date: 2018-11-12 00:18:00
---
**

首先请允许我在您的文章上改个东西，太坑人了： 如果在linux环境中安装的过程中遇到报这个错误，请看到这篇文章的人不要再往下看了，也不要去网上查了，因为这个问题只有在Google中才有有点眉目， > runmqsc: /lib64/libc.so.6: version `GLIBC\_2.14’ not found (required by > /opt/mqm/lib64/libmqmcs\_r.so) 因为mq9.0的版本对linux的版本要求很苛刻，尤其是redhat，当然我的是centos 另外下载相应的mq的tar包的时候，也不要去傻乎乎的注册什么ibm的账号，只能用一次，建议大家先学会ssr去“外面的世界下载下来有很多版本，还有许多很好的说明文档” 解决：最后我下载了8.0的版本，完美解决了问题，在安装操作的过程中几乎没有报一个错误。 以上就是我想说的**
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

一、Windows上安装MQ：

AMQ8101: 发生 IBM MQ 错误（80F）。

配置好后需要重启服务或者电脑才可创建队列管理器

1069错误（由于登录失败而无法启动服务）解决方法

创建本地队列：

二、Linux上安装MQ：  
参考地址：[https://www.ibm.com/developerworks/cn/linux/linux-speed-start/l-ss-mq/#code9](https://www.ibm.com/developerworks/cn/linux/linux-speed-start/l-ss-mq/#code9)

1安装IBM MQ  
下载安装包  
IBM\_MQ\_9.0.0.0\_LINUX\_X86-64_TRIAL.tar.gz

下载地址：

[https://www-01.ibm.com/marketing/iwm/iwm/web/download.do?S_PKG=CRZC5ML&source=ESD-WSMQ-EVAL&transactionid=448604060&pageType=urx](https://www-01.ibm.com/marketing/iwm/iwm/web/download.do?S_PKG=CRZC5ML&source=ESD-WSMQ-EVAL&transactionid=448604060&pageType=urx)

注意：需要注册IBM账号登录后才可下载，可选择https方式下载无需下载插件。另一种方式需要下载插件。

1.2 解压并安装  
1.2.1解压后，解压文件都在MQServer中

tar –xzvf IBM\_MQ\_9.0.0.0\_LINUX\_X86-64_TRIAL.tar.gz

1.2.2进入MQServer文件夹中:

\[root@izwz96vkfmmbo4o9iwca5oz tools\]# cd MQServer/

1.2.3运行 MQ 许可证程序

(由于本人下载的IBM MQ安装包非Linux下包，所以找不到./mqlicense.sh，所以注意不要下载错安装包)

执行\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]#./mqlicense.sh

1.2.4安装 WebSphere MQ for Linux 服务器（Runtime、SDK 和 Server 软件包）：

\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]# rpm -U MQSeriesRuntime-9.0.0-0.x86_64.rpm

\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]# rpm -U MQSeriesSDK-9.0.0-0.x86_64.rpm

\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]# rpm -U MQSeriesServer-9.0.0-0.x86_64.rpm

1.2.5安装 WebSphere MQ for Linux 客户机：

（注：安装服务器时我们已经安装了 Runtime 软件包）：

\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]#rpm -U MQSeriesClient-9.0.0-0.x86_64.rpm

1.2.6安装 WebSphere MQ 样本程序:

（其中包括 amqsput、amqsget、amqsgbr 和 amqsbcg 等）

\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]#rpm -U MQSeriesSamples-9.0.0-0.x86_64.rpm

这个命令把 WebSphere MQ 样本程序安装在 /opt/mqm/samp/bin 中。它还将在 /opt/mqm/samp 中安装这些样本程序的 C 和 CPP 源文件。您可以打开这些样本程序的一些源文件（如 amqsput.c ），以了解如何使用 MQ API（MQI）。

1.2.7 创建组和用户

安装过程创建了一个名为 mqm 的用户和一个同样名为 mqm 的组。此时，新用户是被锁定的，您必须设置一个密码来解锁，这样才能继续本文的第二部分。可用 passwd 命令做到这一点：

\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]# passwd mqm

将提示您输入用于 mqm 的新密码并随后确认它。

提示：如果您已经有 Linux 方面的经验，并且更愿意用一个现有的用户来管理 WebSphere MQ，那么可以通过将该用户添加到 mqm 组来做到这一点

2运行IBM MQ  
在开始这一节之前，请确保象前一节末尾所描述的那样，对 WebSphere MQ 安装程序为您创建的新用户 mqm 设置了密码。

2.1以用户 mqm 的身份登录。  
切换用户：

su mqm

2.2创建队列管理器  
使用 crtmqm 命令来创建一个名为 QM1 的队列管理器。我们把它作为缺省队列，并且将不在创建时指定死信队列。然后使用 strmqm 命令启动队列管理器。

\[mqm@echidna mqm\]$ crtmqm -q QM1

There are 34 days left in the beta test period for this copy of WebSphere MQ.

WebSphere MQ queue manager created.

Creating or replacing default objects for QM1.

Default objects statistics : 31 created. 0 replaced. 0 failed.

Completing setup.

Setup completed.

\[mqm@echidna mqm\]$ strmqm QM1

There are 34 days left in the beta test period for this copy of WebSphere MQ.

Purchased processor allowance not set (use setmqcap).

WebSphere MQ queue manager ‘QM1’ started.

\[mqm@echidna mqm\]$

问题解决：

如果执行crtmqm命令时提示

-bash-3.2$ crtmqm

-bash: crtmqm: command not found

\[root@ izwz96vkfmmbo4o9iwca5oz ~\]# find / -name crtmqm

/opt/mqm/bin/crtmqm

则需要配置mqm用户的环境变量，编辑如下文件，并添加下面的内容，如下：

第一种方法： 相对第二种较安全 仅对 mqm用户有效

1）-bash-3.2$ vi /var/mqm/.bash_profile --有可能会在文件夹下看不到这个文件，通过编辑即可看到

PATH=$PATH:/opt/mqm/samp/bin:/opt/mqm/bin:bin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/X11R6/bin

2）执行“.”命令，使这个文件生效

-bash-3.2$ source .bash_profile

3）再次尝试实行crtmqm或是dspmqm命令，即可发现已经生效。

第二种方法：

1）su root

2）vim /etc/profile

3）在最后面加上：PATH=$PATH:/opt/mqm/samp/bin:/opt/mqm/bin:bin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/bin

4）关闭远程终端重新打开，无需重启服务器

2.3 创建命令文件，并将本地队列输入到这个命令文件

创建名为 ex1input.txt 的 WebSphere MQ 命令文件。将用于创建名为 Q1 的本地队列（最大深度是 10 条消息）的命令输入到这个命令文件中。创建 Q1 的别名，名为 AQ1。然后创建一个名为 Q2 的本地队列，它有和 Q1 相同的属性：

bash-4.2$ touch ex1input.txt (you can also use vi, emacs, pico, or kwrite)

可以使用缩写的命令，如def ql 代表 define qlocal 。将下面几行输入到文件ex1input.txt中：

def ql(Q1) maxdepth(10)

def qalias(AQ1) targq(Q1)

def ql(Q2) like(Q1)

2.4 运行 WebSphere MQ 命令应用程序 runmqsc  
使用 runmqsc 创建队列:

bash-4.2$ runmqsc < ex1input.txt

5724-B41 © Copyright IBM Corp. 1994, 2002. ALL RIGHTS RESERVED.

Starting MQSC for queue manager .

     1 : def ql(Q1) maxdepth(10)
    

AMQ8006: WebSphere MQ queue created.

     2 : def qalias(AQ1) targq(Q1)
    

AMQ8006: WebSphere MQ queue created.

     3 : def ql(Q2) like(Q1)
    

AMQ8006: WebSphere MQ queue created.

3 MQSC commands read.

No commands have a syntax error.

All valid MQSC commands were processed.

bash-4.2$

2.5 启动 WebSphere MQ 命令应用程序 runmqsc 来处理作为标准输入而输入的 WebSphere MQ 命令。Q1 的所有属性显示如下：  
显示 Q1 的详细信息:

\[mqm@echidna mqm\]$ runmqsc

5724-B41 © Copyright IBM Corp. 1994, 2002. ALL RIGHTS RESERVED.

Starting MQSC for queue manager .

dis q(Q1)

     1 : dis q(Q1)
    

AMQ8409: Display Queue details.

DESCR( ) PROCESS( )

BOQNAME( ) INITQ( )

TRIGDATA( ) CLUSTER( )

CLUSNL( ) QUEUE(Q1)

CRDATE(2002-10-31) CRTIME(11.50.04)

ALTDATE(2002-10-31) ALTTIME(11.50.04)

GET(ENABLED) PUT(ENABLED)

DEFPRTY(0) DEFPSIST(NO)

MAXDEPTH(10) MAXMSGL(4194304)

BOTHRESH(0) SHARE

DEFSOPT(SHARED) HARDENBO

MSGDLVSQ(PRIORITY) RETINTVL(999999999)

USAGE(NORMAL) NOTRIGGER

TRIGTYPE(FIRST) TRIGDPTH(1)

TRIGMPRI(0) QDEPTHHI(80)

QDEPTHLO(20) QDPMAXEV(ENABLED)

QDPHIEV(DISABLED) QDPLOEV(DISABLED)

QSVCINT(999999999) QSVCIEV(NONE)

DISTL(NO) DEFTYPE(PREDEFINED)

TYPE(QLOCAL) SCOPE(QMGR)

DEFBIND(OPEN) IPPROCS(0)

OPPROCS(0) CURDEPTH(0)

2.6. 现在显示队列管理器中的所有队列：  
2 : dis q(*)

AMQ8409: Display Queue details.

QUEUE(AQ1) TYPE(QALIAS)

AMQ8409: Display Queue details.

QUEUE(Q1) TYPE(QLOCAL)

AMQ8409: Display Queue details.

QUEUE(Q2) TYPE(QLOCAL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.ADMIN.CHANNEL.EVENT) TYPE(QLOCAL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.ADMIN.COMMAND.QUEUE) TYPE(QLOCAL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.ADMIN.PERFM.EVENT) TYPE(QLOCAL)

…

AMQ8409: Display Queue details.

QUEUE(SYSTEM.DEFAULT.INITIATION.QUEUE)

TYPE(QLOCAL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.DEFAULT.LOCAL.QUEUE) TYPE(QLOCAL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.DEFAULT.MODEL.QUEUE) TYPE(QMODEL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.DEFAULT.REMOTE.QUEUE) TYPE(QREMOTE)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.MQSC.REPLY.QUEUE) TYPE(QMODEL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.PENDING.DATA.QUEUE) TYPE(QLOCAL)

2.7最后，将队列管理器的死信队列更改为 SYSTEM.DEAD.LETTER.QUEUE，然后关闭命令应用程序。  
更改死信队列并关闭命令应用程序:

alter qmgr deadq(SYSTEM.DEAD.LETTER.QUEUE)

     4 : alter qmgr deadq(SYSTEM.DEAD.LETTER.QUEUE)
    

AMQ8005: WebSphere MQ queue manager changed.

end

     5 : end –使用end即可退出runmqsc
    

2.8在接下来的几步中，我们将使用 WebSphere MQ 样本程序在队列上放置、获取和浏览消息通过输入以下命令，将 WebSphere MQ 样本程序目录添加到 PATH：

bash-4.2$ PATH=$PATH:/opt/mqm/samp/bin

2.9使用 amqsput 样本程序，将一个或多个消息放置到 Q1 上。在每个消息后按 Enter。若要终止，则按 Ctrl-d 以在标准输入上发出文件结束符信号：  
在 Q1 上放置消息：

bash-4.2$ amqsput Q1

Sample AMQSPUT0 start

target queue is Q1

Hello Q1

Sample AMQSPUT0 end –使用Ctrl-d自动显示

错误解决：

bash-4.2$ amqsput Q1  
Sample AMQSPUT0 start  
target queue is Q1  
MQOPEN ended with reason code 2085  
unable to open queue for output  
Sample AMQSPUT0 end

若出现以上错误：

需使用 amqsput Q1 QM1 (amqsput 对列名 队列管理器名) amqsget也一样用法amqsget Q1 QM1

这里系统将处于等待用户输入的状态，随便输入一些消息，然后连敲二次回车，完成消息发送

2.10 使用 amqsput 样本程序，浏览 Q1 以查看队列上的消息：  
浏览 Q1 上的消息：

bash-4.2$ amqsgbr Q1

Sample AMQSGBR0 (browse) start

Messages for Q1

no more messages

Sample AMQSGBR0 (browse) end

2.11使用 amqsbcg 样本程序，浏览 Q1 以查看队列上的消息及其消息描述符：  
浏览 Q1 上的消息和描述符：

bash-4.2$ amqsbcg Q1

AMQSBCG0 - starts here

* * *

MQOPEN - ‘Q1’

MQGET of message number 1

****Message descriptor****

StrucId : 'MD ’ Version : 2

Report : 0 MsgType : 8

Expiry : -1 Feedback : 0

Encoding : 546 CodedCharSetId : 923

Format : 'MQSTR ’

Priority : 0 Persistence : 0

MsgId : X’414D5120514D312020202020202020203E81BD3D01030020’

CorrelId : X’000000000000000000000000000000000000000000000000’

BackoutCount : 0

ReplyToQ : ’ ’

ReplyToQMgr : 'QM1 ’

\*\* Identity Context

UserIdentifier : 'mqm ’

AccountingToken :

X’0335303500000000000000000000000000000000000000000000000000000006’

ApplIdentityData : ’ ’

\*\* Origin Context

PutApplType : ‘6’

PutApplName : 'amqsput ’

PutDate : ‘20021031’ PutTime : ‘17053341’

ApplOriginData : ’ ’

GroupId : X’000000000000000000000000000000000000000000000000’

MsgSeqNumber : ‘1’

Offset : ‘0’

MsgFlags : ‘0’

OriginalLength : ‘-1’

\*\*\*\* Message ****

length - 8 bytes

00000000: 4865 6C6C 6F20 5131 'Hello Q1 ’

No more messages

MQCLOSE

MQDISC

2.12使用 amqsget 样本程序清除 Q1 上的消息：  
从 Q1 获取消息：

bash-4.2$ amqsget Q1

Sample AMQSGET0 start

message

amqsget 程序将持续侦听队列上的新消息。用 Ctrl-c 终止它。也可以用 amqsgbr 代码来浏览 Q1 上的消息以确保没有遗漏。现在就试一下。

2.13现在使用 amqsput 命令将一个或多个消息放置到 AQ1（我们为 Q1 创建的别名）上。如有需要，可以回头参阅2.9  
2.14 使用 runmqsc ，显示 Q1 的属性以确定队列上有多少消息（检查队列的 CURDEPTH）：  
检查 Q1 的深度：

bash-4.2$ runmqsc

5724-B41 © Copyright IBM Corp. 1994, 2002. ALL RIGHTS RESERVED.

Starting MQSC for queue manager .

dis q(Q1)

     1 : dis q(Q1)
    

AMQ8409: Display Queue details.

DESCR( ) PROCESS( )

BOQNAME( ) INITQ( )

TRIGDATA( ) CLUSTER( )

CLUSNL( ) QUEUE(Q1)

CRDATE(2002-10-31) CRTIME(11.50.04)

ALTDATE(2002-10-31) ALTTIME(11.50.04)

GET(ENABLED) PUT(ENABLED)

DEFPRTY(0) DEFPSIST(NO)

MAXDEPTH(10) MAXMSGL(4194304)

BOTHRESH(0) SHARE

DEFSOPT(SHARED) HARDENBO

MSGDLVSQ(PRIORITY) RETINTVL(999999999)

USAGE(NORMAL) NOTRIGGER

TRIGTYPE(FIRST) TRIGDPTH(1)

TRIGMPRI(0) QDEPTHHI(80)

QDEPTHLO(20) QDPMAXEV(ENABLED)

QDPHIEV(DISABLED) QDPLOEV(DISABLED)

QSVCINT(999999999) QSVCIEV(NONE)

DISTL(NO) DEFTYPE(PREDEFINED)

TYPE(QLOCAL) SCOPE(QMGR)

DEFBIND(OPEN) IPPROCS(0)

OPPROCS(0) CURDEPTH(2)

请记得输入 end 以终止 runmqsc 命令。

2.15 现在再次使用 amqsget 来获得 Q 上的消息。如有需要，请回头参阅2.12。

2.16现在执行禁用 Q2 上 PUT 函数的操作，使用 runmqsc ：  
禁用 Q2 的 PUT 函数：

bash-4.2$ runmqsc

5724-B41 © Copyright IBM Corp. 1994, 2002. ALL RIGHTS RESERVED.

Starting MQSC for queue manager .

alter ql(Q2) put(disabled)

     1 : alter ql(Q2) put(disabled)
    

AMQ8008: WebSphere MQ queue changed.

2.17 现在试着将一个消息放置到 Q2 上以验证 PUT 已经被禁用：  
对 Q2 尝试 PUT：

bash-4.2$ amqsput Q2

Sample AMQSPUT0 start

target queue is Q2

Hello Q2

MQPUT ended with reason code 2051

Sample AMQSPUT0 end

\[mqm@echidna mqm\]$

这一命令会失败并且显示一个错误代码，因为 PUT 已经被禁用。

2.18通过使用 runmqsc ，删除 Q2：  
bash-4.2$ runmqsc

5724-B41 © Copyright IBM Corp. 1994, 2002. ALL RIGHTS RESERVED.

Starting MQSC for queue manager .

delete qlocal(Q2)

     1 : delete qlocal(Q2)
    

AMQ8007: WebSphere MQ queue deleted.

2.19当您准备停止队列管理器时，可输入 endmqm QM1 命令以常规方式终止，或输入 endmqm -i QM1 立即终止。可以输入 dltmqm QM1 命令来删除队列管理器。

* * *

本文来自 1275012490 的CSDN 博客 ，全文地址请点击：[https://blog.csdn.net/qq\_34569497/article/details/81082370?utm\_source=copy](https://blog.csdn.net/qq_34569497/article/details/81082370?utm_source=copy) 一、Windows上安装MQ：

AMQ8101: 发生 IBM MQ 错误（80F）。

配置好后需要重启服务或者电脑才可创建队列管理器

1069错误（由于登录失败而无法启动服务）解决方法

创建本地队列：

二、Linux上安装MQ：  
参考地址：[https://www.ibm.com/developerworks/cn/linux/linux-speed-start/l-ss-mq/#code9](https://www.ibm.com/developerworks/cn/linux/linux-speed-start/l-ss-mq/#code9)

1安装IBM MQ  
下载安装包  
IBM\_MQ\_9.0.0.0\_LINUX\_X86-64_TRIAL.tar.gz

下载地址：

[https://www-01.ibm.com/marketing/iwm/iwm/web/download.do?S_PKG=CRZC5ML&source=ESD-WSMQ-EVAL&transactionid=448604060&pageType=urx](https://www-01.ibm.com/marketing/iwm/iwm/web/download.do?S_PKG=CRZC5ML&source=ESD-WSMQ-EVAL&transactionid=448604060&pageType=urx)

注意：需要注册IBM账号登录后才可下载，可选择https方式下载无需下载插件。另一种方式需要下载插件。

1.2 解压并安装  
1.2.1解压后，解压文件都在MQServer中

tar –xzvf IBM\_MQ\_9.0.0.0\_LINUX\_X86-64_TRIAL.tar.gz

1.2.2进入MQServer文件夹中:

\[root@izwz96vkfmmbo4o9iwca5oz tools\]# cd MQServer/

1.2.3运行 MQ 许可证程序

(由于本人下载的IBM MQ安装包非Linux下包，所以找不到./mqlicense.sh，所以注意不要下载错安装包)

执行\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]#./mqlicense.sh

1.2.4安装 WebSphere MQ for Linux 服务器（Runtime、SDK 和 Server 软件包）：

\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]# rpm -U MQSeriesRuntime-9.0.0-0.x86_64.rpm

\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]# rpm -U MQSeriesSDK-9.0.0-0.x86_64.rpm

\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]# rpm -U MQSeriesServer-9.0.0-0.x86_64.rpm

1.2.5安装 WebSphere MQ for Linux 客户机：

（注：安装服务器时我们已经安装了 Runtime 软件包）：

\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]#rpm -U MQSeriesClient-9.0.0-0.x86_64.rpm

1.2.6安装 WebSphere MQ 样本程序:

（其中包括 amqsput、amqsget、amqsgbr 和 amqsbcg 等）

\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]#rpm -U MQSeriesSamples-9.0.0-0.x86_64.rpm

这个命令把 WebSphere MQ 样本程序安装在 /opt/mqm/samp/bin 中。它还将在 /opt/mqm/samp 中安装这些样本程序的 C 和 CPP 源文件。您可以打开这些样本程序的一些源文件（如 amqsput.c ），以了解如何使用 MQ API（MQI）。

1.2.7 创建组和用户

安装过程创建了一个名为 mqm 的用户和一个同样名为 mqm 的组。此时，新用户是被锁定的，您必须设置一个密码来解锁，这样才能继续本文的第二部分。可用 passwd 命令做到这一点：

\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]# passwd mqm

将提示您输入用于 mqm 的新密码并随后确认它。

提示：如果您已经有 Linux 方面的经验，并且更愿意用一个现有的用户来管理 WebSphere MQ，那么可以通过将该用户添加到 mqm 组来做到这一点

2运行IBM MQ  
在开始这一节之前，请确保象前一节末尾所描述的那样，对 WebSphere MQ 安装程序为您创建的新用户 mqm 设置了密码。

2.1以用户 mqm 的身份登录。  
切换用户：

su mqm

2.2创建队列管理器  
使用 crtmqm 命令来创建一个名为 QM1 的队列管理器。我们把它作为缺省队列，并且将不在创建时指定死信队列。然后使用 strmqm 命令启动队列管理器。

\[mqm@echidna mqm\]$ crtmqm -q QM1

There are 34 days left in the beta test period for this copy of WebSphere MQ.

WebSphere MQ queue manager created.

Creating or replacing default objects for QM1.

Default objects statistics : 31 created. 0 replaced. 0 failed.

Completing setup.

Setup completed.

\[mqm@echidna mqm\]$ strmqm QM1

There are 34 days left in the beta test period for this copy of WebSphere MQ.

Purchased processor allowance not set (use setmqcap).

WebSphere MQ queue manager ‘QM1’ started.

\[mqm@echidna mqm\]$

问题解决：

如果执行crtmqm命令时提示

-bash-3.2$ crtmqm

-bash: crtmqm: command not found

\[root@ izwz96vkfmmbo4o9iwca5oz ~\]# find / -name crtmqm

/opt/mqm/bin/crtmqm

则需要配置mqm用户的环境变量，编辑如下文件，并添加下面的内容，如下：

第一种方法： 相对第二种较安全 仅对 mqm用户有效

1）-bash-3.2$ vi /var/mqm/.bash_profile --有可能会在文件夹下看不到这个文件，通过编辑即可看到

PATH=$PATH:/opt/mqm/samp/bin:/opt/mqm/bin:bin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/X11R6/bin

2）执行“.”命令，使这个文件生效

-bash-3.2$ source .bash_profile

3）再次尝试实行crtmqm或是dspmqm命令，即可发现已经生效。

第二种方法：

1）su root

2）vim /etc/profile

3）在最后面加上：PATH=$PATH:/opt/mqm/samp/bin:/opt/mqm/bin:bin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/bin

4）关闭远程终端重新打开，无需重启服务器

2.3 创建命令文件，并将本地队列输入到这个命令文件

创建名为 ex1input.txt 的 WebSphere MQ 命令文件。将用于创建名为 Q1 的本地队列（最大深度是 10 条消息）的命令输入到这个命令文件中。创建 Q1 的别名，名为 AQ1。然后创建一个名为 Q2 的本地队列，它有和 Q1 相同的属性：

bash-4.2$ touch ex1input.txt (you can also use vi, emacs, pico, or kwrite)

可以使用缩写的命令，如def ql 代表 define qlocal 。将下面几行输入到文件ex1input.txt中：

def ql(Q1) maxdepth(10)

def qalias(AQ1) targq(Q1)

def ql(Q2) like(Q1)

2.4 运行 WebSphere MQ 命令应用程序 runmqsc  
使用 runmqsc 创建队列:

bash-4.2$ runmqsc < ex1input.txt

5724-B41 © Copyright IBM Corp. 1994, 2002. ALL RIGHTS RESERVED.

Starting MQSC for queue manager .

     1 : def ql(Q1) maxdepth(10)
    

AMQ8006: WebSphere MQ queue created.

     2 : def qalias(AQ1) targq(Q1)
    

AMQ8006: WebSphere MQ queue created.

     3 : def ql(Q2) like(Q1)
    

AMQ8006: WebSphere MQ queue created.

3 MQSC commands read.

No commands have a syntax error.

All valid MQSC commands were processed.

bash-4.2$

2.5 启动 WebSphere MQ 命令应用程序 runmqsc 来处理作为标准输入而输入的 WebSphere MQ 命令。Q1 的所有属性显示如下：  
显示 Q1 的详细信息:

\[mqm@echidna mqm\]$ runmqsc

5724-B41 © Copyright IBM Corp. 1994, 2002. ALL RIGHTS RESERVED.

Starting MQSC for queue manager .

dis q(Q1)

     1 : dis q(Q1)
    

AMQ8409: Display Queue details.

DESCR( ) PROCESS( )

BOQNAME( ) INITQ( )

TRIGDATA( ) CLUSTER( )

CLUSNL( ) QUEUE(Q1)

CRDATE(2002-10-31) CRTIME(11.50.04)

ALTDATE(2002-10-31) ALTTIME(11.50.04)

GET(ENABLED) PUT(ENABLED)

DEFPRTY(0) DEFPSIST(NO)

MAXDEPTH(10) MAXMSGL(4194304)

BOTHRESH(0) SHARE

DEFSOPT(SHARED) HARDENBO

MSGDLVSQ(PRIORITY) RETINTVL(999999999)

USAGE(NORMAL) NOTRIGGER

TRIGTYPE(FIRST) TRIGDPTH(1)

TRIGMPRI(0) QDEPTHHI(80)

QDEPTHLO(20) QDPMAXEV(ENABLED)

QDPHIEV(DISABLED) QDPLOEV(DISABLED)

QSVCINT(999999999) QSVCIEV(NONE)

DISTL(NO) DEFTYPE(PREDEFINED)

TYPE(QLOCAL) SCOPE(QMGR)

DEFBIND(OPEN) IPPROCS(0)

OPPROCS(0) CURDEPTH(0)

2.6. 现在显示队列管理器中的所有队列：  
2 : dis q(*)

AMQ8409: Display Queue details.

QUEUE(AQ1) TYPE(QALIAS)

AMQ8409: Display Queue details.

QUEUE(Q1) TYPE(QLOCAL)

AMQ8409: Display Queue details.

QUEUE(Q2) TYPE(QLOCAL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.ADMIN.CHANNEL.EVENT) TYPE(QLOCAL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.ADMIN.COMMAND.QUEUE) TYPE(QLOCAL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.ADMIN.PERFM.EVENT) TYPE(QLOCAL)

…

AMQ8409: Display Queue details.

QUEUE(SYSTEM.DEFAULT.INITIATION.QUEUE)

TYPE(QLOCAL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.DEFAULT.LOCAL.QUEUE) TYPE(QLOCAL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.DEFAULT.MODEL.QUEUE) TYPE(QMODEL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.DEFAULT.REMOTE.QUEUE) TYPE(QREMOTE)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.MQSC.REPLY.QUEUE) TYPE(QMODEL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.PENDING.DATA.QUEUE) TYPE(QLOCAL)

2.7最后，将队列管理器的死信队列更改为 SYSTEM.DEAD.LETTER.QUEUE，然后关闭命令应用程序。  
更改死信队列并关闭命令应用程序:

alter qmgr deadq(SYSTEM.DEAD.LETTER.QUEUE)

     4 : alter qmgr deadq(SYSTEM.DEAD.LETTER.QUEUE)
    

AMQ8005: WebSphere MQ queue manager changed.

end

     5 : end –使用end即可退出runmqsc
    

2.8在接下来的几步中，我们将使用 WebSphere MQ 样本程序在队列上放置、获取和浏览消息通过输入以下命令，将 WebSphere MQ 样本程序目录添加到 PATH：

bash-4.2$ PATH=$PATH:/opt/mqm/samp/bin

2.9使用 amqsput 样本程序，将一个或多个消息放置到 Q1 上。在每个消息后按 Enter。若要终止，则按 Ctrl-d 以在标准输入上发出文件结束符信号：  
在 Q1 上放置消息：

bash-4.2$ amqsput Q1

Sample AMQSPUT0 start

target queue is Q1

Hello Q1

Sample AMQSPUT0 end –使用Ctrl-d自动显示

错误解决：

bash-4.2$ amqsput Q1  
Sample AMQSPUT0 start  
target queue is Q1  
MQOPEN ended with reason code 2085  
unable to open queue for output  
Sample AMQSPUT0 end

若出现以上错误：

需使用 amqsput Q1 QM1 (amqsput 对列名 队列管理器名) amqsget也一样用法amqsget Q1 QM1

这里系统将处于等待用户输入的状态，随便输入一些消息，然后连敲二次回车，完成消息发送

2.10 使用 amqsput 样本程序，浏览 Q1 以查看队列上的消息：  
浏览 Q1 上的消息：

bash-4.2$ amqsgbr Q1

Sample AMQSGBR0 (browse) start

Messages for Q1

no more messages

Sample AMQSGBR0 (browse) end

2.11使用 amqsbcg 样本程序，浏览 Q1 以查看队列上的消息及其消息描述符：  
浏览 Q1 上的消息和描述符：

bash-4.2$ amqsbcg Q1

AMQSBCG0 - starts here

* * *

MQOPEN - ‘Q1’

MQGET of message number 1

****Message descriptor****

StrucId : 'MD ’ Version : 2

Report : 0 MsgType : 8

Expiry : -1 Feedback : 0

Encoding : 546 CodedCharSetId : 923

Format : 'MQSTR ’

Priority : 0 Persistence : 0

MsgId : X’414D5120514D312020202020202020203E81BD3D01030020’

CorrelId : X’000000000000000000000000000000000000000000000000’

BackoutCount : 0

ReplyToQ : ’ ’

ReplyToQMgr : 'QM1 ’

\*\* Identity Context

UserIdentifier : 'mqm ’

AccountingToken :

X’0335303500000000000000000000000000000000000000000000000000000006’

ApplIdentityData : ’ ’

\*\* Origin Context

PutApplType : ‘6’

PutApplName : 'amqsput ’

PutDate : ‘20021031’ PutTime : ‘17053341’

ApplOriginData : ’ ’

GroupId : X’000000000000000000000000000000000000000000000000’

MsgSeqNumber : ‘1’

Offset : ‘0’

MsgFlags : ‘0’

OriginalLength : ‘-1’

\*\*\*\* Message ****

length - 8 bytes

00000000: 4865 6C6C 6F20 5131 'Hello Q1 ’

No more messages

MQCLOSE

MQDISC

2.12使用 amqsget 样本程序清除 Q1 上的消息：  
从 Q1 获取消息：

bash-4.2$ amqsget Q1

Sample AMQSGET0 start

message

amqsget 程序将持续侦听队列上的新消息。用 Ctrl-c 终止它。也可以用 amqsgbr 代码来浏览 Q1 上的消息以确保没有遗漏。现在就试一下。

2.13现在使用 amqsput 命令将一个或多个消息放置到 AQ1（我们为 Q1 创建的别名）上。如有需要，可以回头参阅2.9  
2.14 使用 runmqsc ，显示 Q1 的属性以确定队列上有多少消息（检查队列的 CURDEPTH）：  
检查 Q1 的深度：

bash-4.2$ runmqsc

5724-B41 © Copyright IBM Corp. 1994, 2002. ALL RIGHTS RESERVED.

Starting MQSC for queue manager .

dis q(Q1)

     1 : dis q(Q1)
    

AMQ8409: Display Queue details.

DESCR( ) PROCESS( )

BOQNAME( ) INITQ( )

TRIGDATA( ) CLUSTER( )

CLUSNL( ) QUEUE(Q1)

CRDATE(2002-10-31) CRTIME(11.50.04)

ALTDATE(2002-10-31) ALTTIME(11.50.04)

GET(ENABLED) PUT(ENABLED)

DEFPRTY(0) DEFPSIST(NO)

MAXDEPTH(10) MAXMSGL(4194304)

BOTHRESH(0) SHARE

DEFSOPT(SHARED) HARDENBO

MSGDLVSQ(PRIORITY) RETINTVL(999999999)

USAGE(NORMAL) NOTRIGGER

TRIGTYPE(FIRST) TRIGDPTH(1)

TRIGMPRI(0) QDEPTHHI(80)

QDEPTHLO(20) QDPMAXEV(ENABLED)

QDPHIEV(DISABLED) QDPLOEV(DISABLED)

QSVCINT(999999999) QSVCIEV(NONE)

DISTL(NO) DEFTYPE(PREDEFINED)

TYPE(QLOCAL) SCOPE(QMGR)

DEFBIND(OPEN) IPPROCS(0)

OPPROCS(0) CURDEPTH(2)

请记得输入 end 以终止 runmqsc 命令。

2.15 现在再次使用 amqsget 来获得 Q 上的消息。如有需要，请回头参阅2.12。

2.16现在执行禁用 Q2 上 PUT 函数的操作，使用 runmqsc ：  
禁用 Q2 的 PUT 函数：

bash-4.2$ runmqsc

5724-B41 © Copyright IBM Corp. 1994, 2002. ALL RIGHTS RESERVED.

Starting MQSC for queue manager .

alter ql(Q2) put(disabled)

     1 : alter ql(Q2) put(disabled)
    

AMQ8008: WebSphere MQ queue changed.

2.17 现在试着将一个消息放置到 Q2 上以验证 PUT 已经被禁用：  
对 Q2 尝试 PUT：

bash-4.2$ amqsput Q2

Sample AMQSPUT0 start

target queue is Q2

Hello Q2

MQPUT ended with reason code 2051

Sample AMQSPUT0 end

\[mqm@echidna mqm\]$

这一命令会失败并且显示一个错误代码，因为 PUT 已经被禁用。

2.18通过使用 runmqsc ，删除 Q2：  
bash-4.2$ runmqsc

5724-B41 © Copyright IBM Corp. 1994, 2002. ALL RIGHTS RESERVED.

Starting MQSC for queue manager .

delete qlocal(Q2)

     1 : delete qlocal(Q2)
    

AMQ8007: WebSphere MQ queue deleted.

2.19当您准备停止队列管理器时，可输入 endmqm QM1 命令以常规方式终止，或输入 endmqm -i QM1 立即终止。可以输入 dltmqm QM1 命令来删除队列管理器。

* * *

本文来自 1275012490 的CSDN 博客 ，全文地址请点击：[https://blog.csdn.net/qq\_34569497/article/details/81082370?utm\_source=copy](https://blog.csdn.net/qq_34569497/article/details/81082370?utm_source=copy) 一、Windows上安装MQ：

AMQ8101: 发生 IBM MQ 错误（80F）。

配置好后需要重启服务或者电脑才可创建队列管理器

1069错误（由于登录失败而无法启动服务）解决方法

创建本地队列：

二、Linux上安装MQ：  
参考地址：[https://www.ibm.com/developerworks/cn/linux/linux-speed-start/l-ss-mq/#code9](https://www.ibm.com/developerworks/cn/linux/linux-speed-start/l-ss-mq/#code9)

1安装IBM MQ  
下载安装包  
IBM\_MQ\_9.0.0.0\_LINUX\_X86-64_TRIAL.tar.gz

下载地址：

[https://www-01.ibm.com/marketing/iwm/iwm/web/download.do?S_PKG=CRZC5ML&source=ESD-WSMQ-EVAL&transactionid=448604060&pageType=urx](https://www-01.ibm.com/marketing/iwm/iwm/web/download.do?S_PKG=CRZC5ML&source=ESD-WSMQ-EVAL&transactionid=448604060&pageType=urx)

注意：需要注册IBM账号登录后才可下载，可选择https方式下载无需下载插件。另一种方式需要下载插件。

1.2 解压并安装  
1.2.1解压后，解压文件都在MQServer中

tar –xzvf IBM\_MQ\_9.0.0.0\_LINUX\_X86-64_TRIAL.tar.gz

1.2.2进入MQServer文件夹中:

\[root@izwz96vkfmmbo4o9iwca5oz tools\]# cd MQServer/

1.2.3运行 MQ 许可证程序

(由于本人下载的IBM MQ安装包非Linux下包，所以找不到./mqlicense.sh，所以注意不要下载错安装包)

执行\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]#./mqlicense.sh

1.2.4安装 WebSphere MQ for Linux 服务器（Runtime、SDK 和 Server 软件包）：

\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]# rpm -U MQSeriesRuntime-9.0.0-0.x86_64.rpm

\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]# rpm -U MQSeriesSDK-9.0.0-0.x86_64.rpm

\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]# rpm -U MQSeriesServer-9.0.0-0.x86_64.rpm

1.2.5安装 WebSphere MQ for Linux 客户机：

（注：安装服务器时我们已经安装了 Runtime 软件包）：

\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]#rpm -U MQSeriesClient-9.0.0-0.x86_64.rpm

1.2.6安装 WebSphere MQ 样本程序:

（其中包括 amqsput、amqsget、amqsgbr 和 amqsbcg 等）

\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]#rpm -U MQSeriesSamples-9.0.0-0.x86_64.rpm

这个命令把 WebSphere MQ 样本程序安装在 /opt/mqm/samp/bin 中。它还将在 /opt/mqm/samp 中安装这些样本程序的 C 和 CPP 源文件。您可以打开这些样本程序的一些源文件（如 amqsput.c ），以了解如何使用 MQ API（MQI）。

1.2.7 创建组和用户

安装过程创建了一个名为 mqm 的用户和一个同样名为 mqm 的组。此时，新用户是被锁定的，您必须设置一个密码来解锁，这样才能继续本文的第二部分。可用 passwd 命令做到这一点：

\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]# passwd mqm

将提示您输入用于 mqm 的新密码并随后确认它。

提示：如果您已经有 Linux 方面的经验，并且更愿意用一个现有的用户来管理 WebSphere MQ，那么可以通过将该用户添加到 mqm 组来做到这一点

2运行IBM MQ  
在开始这一节之前，请确保象前一节末尾所描述的那样，对 WebSphere MQ 安装程序为您创建的新用户 mqm 设置了密码。

2.1以用户 mqm 的身份登录。  
切换用户：

su mqm

2.2创建队列管理器  
使用 crtmqm 命令来创建一个名为 QM1 的队列管理器。我们把它作为缺省队列，并且将不在创建时指定死信队列。然后使用 strmqm 命令启动队列管理器。

\[mqm@echidna mqm\]$ crtmqm -q QM1

There are 34 days left in the beta test period for this copy of WebSphere MQ.

WebSphere MQ queue manager created.

Creating or replacing default objects for QM1.

Default objects statistics : 31 created. 0 replaced. 0 failed.

Completing setup.

Setup completed.

\[mqm@echidna mqm\]$ strmqm QM1

There are 34 days left in the beta test period for this copy of WebSphere MQ.

Purchased processor allowance not set (use setmqcap).

WebSphere MQ queue manager ‘QM1’ started.

\[mqm@echidna mqm\]$

问题解决：

如果执行crtmqm命令时提示

-bash-3.2$ crtmqm

-bash: crtmqm: command not found

\[root@ izwz96vkfmmbo4o9iwca5oz ~\]# find / -name crtmqm

/opt/mqm/bin/crtmqm

则需要配置mqm用户的环境变量，编辑如下文件，并添加下面的内容，如下：

第一种方法： 相对第二种较安全 仅对 mqm用户有效

1）-bash-3.2$ vi /var/mqm/.bash_profile --有可能会在文件夹下看不到这个文件，通过编辑即可看到

PATH=$PATH:/opt/mqm/samp/bin:/opt/mqm/bin:bin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/X11R6/bin

2）执行“.”命令，使这个文件生效

-bash-3.2$ source .bash_profile

3）再次尝试实行crtmqm或是dspmqm命令，即可发现已经生效。

第二种方法：

1）su root

2）vim /etc/profile

3）在最后面加上：PATH=$PATH:/opt/mqm/samp/bin:/opt/mqm/bin:bin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/bin

4）关闭远程终端重新打开，无需重启服务器

2.3 创建命令文件，并将本地队列输入到这个命令文件

创建名为 ex1input.txt 的 WebSphere MQ 命令文件。将用于创建名为 Q1 的本地队列（最大深度是 10 条消息）的命令输入到这个命令文件中。创建 Q1 的别名，名为 AQ1。然后创建一个名为 Q2 的本地队列，它有和 Q1 相同的属性：

bash-4.2$ touch ex1input.txt (you can also use vi, emacs, pico, or kwrite)

可以使用缩写的命令，如def ql 代表 define qlocal 。将下面几行输入到文件ex1input.txt中：

def ql(Q1) maxdepth(10)

def qalias(AQ1) targq(Q1)

def ql(Q2) like(Q1)

2.4 运行 WebSphere MQ 命令应用程序 runmqsc  
使用 runmqsc 创建队列:

bash-4.2$ runmqsc < ex1input.txt

5724-B41 © Copyright IBM Corp. 1994, 2002. ALL RIGHTS RESERVED.

Starting MQSC for queue manager .

     1 : def ql(Q1) maxdepth(10)
    

AMQ8006: WebSphere MQ queue created.

     2 : def qalias(AQ1) targq(Q1)
    

AMQ8006: WebSphere MQ queue created.

     3 : def ql(Q2) like(Q1)
    

AMQ8006: WebSphere MQ queue created.

3 MQSC commands read.

No commands have a syntax error.

All valid MQSC commands were processed.

bash-4.2$

2.5 启动 WebSphere MQ 命令应用程序 runmqsc 来处理作为标准输入而输入的 WebSphere MQ 命令。Q1 的所有属性显示如下：  
显示 Q1 的详细信息:

\[mqm@echidna mqm\]$ runmqsc

5724-B41 © Copyright IBM Corp. 1994, 2002. ALL RIGHTS RESERVED.

Starting MQSC for queue manager .

dis q(Q1)

     1 : dis q(Q1)
    

AMQ8409: Display Queue details.

DESCR( ) PROCESS( )

BOQNAME( ) INITQ( )

TRIGDATA( ) CLUSTER( )

CLUSNL( ) QUEUE(Q1)

CRDATE(2002-10-31) CRTIME(11.50.04)

ALTDATE(2002-10-31) ALTTIME(11.50.04)

GET(ENABLED) PUT(ENABLED)

DEFPRTY(0) DEFPSIST(NO)

MAXDEPTH(10) MAXMSGL(4194304)

BOTHRESH(0) SHARE

DEFSOPT(SHARED) HARDENBO

MSGDLVSQ(PRIORITY) RETINTVL(999999999)

USAGE(NORMAL) NOTRIGGER

TRIGTYPE(FIRST) TRIGDPTH(1)

TRIGMPRI(0) QDEPTHHI(80)

QDEPTHLO(20) QDPMAXEV(ENABLED)

QDPHIEV(DISABLED) QDPLOEV(DISABLED)

QSVCINT(999999999) QSVCIEV(NONE)

DISTL(NO) DEFTYPE(PREDEFINED)

TYPE(QLOCAL) SCOPE(QMGR)

DEFBIND(OPEN) IPPROCS(0)

OPPROCS(0) CURDEPTH(0)

2.6. 现在显示队列管理器中的所有队列：  
2 : dis q(*)

AMQ8409: Display Queue details.

QUEUE(AQ1) TYPE(QALIAS)

AMQ8409: Display Queue details.

QUEUE(Q1) TYPE(QLOCAL)

AMQ8409: Display Queue details.

QUEUE(Q2) TYPE(QLOCAL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.ADMIN.CHANNEL.EVENT) TYPE(QLOCAL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.ADMIN.COMMAND.QUEUE) TYPE(QLOCAL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.ADMIN.PERFM.EVENT) TYPE(QLOCAL)

…

AMQ8409: Display Queue details.

QUEUE(SYSTEM.DEFAULT.INITIATION.QUEUE)

TYPE(QLOCAL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.DEFAULT.LOCAL.QUEUE) TYPE(QLOCAL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.DEFAULT.MODEL.QUEUE) TYPE(QMODEL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.DEFAULT.REMOTE.QUEUE) TYPE(QREMOTE)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.MQSC.REPLY.QUEUE) TYPE(QMODEL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.PENDING.DATA.QUEUE) TYPE(QLOCAL)

2.7最后，将队列管理器的死信队列更改为 SYSTEM.DEAD.LETTER.QUEUE，然后关闭命令应用程序。  
更改死信队列并关闭命令应用程序:

alter qmgr deadq(SYSTEM.DEAD.LETTER.QUEUE)

     4 : alter qmgr deadq(SYSTEM.DEAD.LETTER.QUEUE)
    

AMQ8005: WebSphere MQ queue manager changed.

end

     5 : end –使用end即可退出runmqsc
    

2.8在接下来的几步中，我们将使用 WebSphere MQ 样本程序在队列上放置、获取和浏览消息通过输入以下命令，将 WebSphere MQ 样本程序目录添加到 PATH：

bash-4.2$ PATH=$PATH:/opt/mqm/samp/bin

2.9使用 amqsput 样本程序，将一个或多个消息放置到 Q1 上。在每个消息后按 Enter。若要终止，则按 Ctrl-d 以在标准输入上发出文件结束符信号：  
在 Q1 上放置消息：

bash-4.2$ amqsput Q1

Sample AMQSPUT0 start

target queue is Q1

Hello Q1

Sample AMQSPUT0 end –使用Ctrl-d自动显示

错误解决：

bash-4.2$ amqsput Q1  
Sample AMQSPUT0 start  
target queue is Q1  
MQOPEN ended with reason code 2085  
unable to open queue for output  
Sample AMQSPUT0 end

若出现以上错误：

需使用 amqsput Q1 QM1 (amqsput 对列名 队列管理器名) amqsget也一样用法amqsget Q1 QM1

这里系统将处于等待用户输入的状态，随便输入一些消息，然后连敲二次回车，完成消息发送

2.10 使用 amqsput 样本程序，浏览 Q1 以查看队列上的消息：  
浏览 Q1 上的消息：

bash-4.2$ amqsgbr Q1

Sample AMQSGBR0 (browse) start

Messages for Q1

no more messages

Sample AMQSGBR0 (browse) end

2.11使用 amqsbcg 样本程序，浏览 Q1 以查看队列上的消息及其消息描述符：  
浏览 Q1 上的消息和描述符：

bash-4.2$ amqsbcg Q1

AMQSBCG0 - starts here

* * *

MQOPEN - ‘Q1’

MQGET of message number 1

****Message descriptor****

StrucId : 'MD ’ Version : 2

Report : 0 MsgType : 8

Expiry : -1 Feedback : 0

Encoding : 546 CodedCharSetId : 923

Format : 'MQSTR ’

Priority : 0 Persistence : 0

MsgId : X’414D5120514D312020202020202020203E81BD3D01030020’

CorrelId : X’000000000000000000000000000000000000000000000000’

BackoutCount : 0

ReplyToQ : ’ ’

ReplyToQMgr : 'QM1 ’

\*\* Identity Context

UserIdentifier : 'mqm ’

AccountingToken :

X’0335303500000000000000000000000000000000000000000000000000000006’

ApplIdentityData : ’ ’

\*\* Origin Context

PutApplType : ‘6’

PutApplName : 'amqsput ’

PutDate : ‘20021031’ PutTime : ‘17053341’

ApplOriginData : ’ ’

GroupId : X’000000000000000000000000000000000000000000000000’

MsgSeqNumber : ‘1’

Offset : ‘0’

MsgFlags : ‘0’

OriginalLength : ‘-1’

\*\*\*\* Message ****

length - 8 bytes

00000000: 4865 6C6C 6F20 5131 'Hello Q1 ’

No more messages

MQCLOSE

MQDISC

2.12使用 amqsget 样本程序清除 Q1 上的消息：  
从 Q1 获取消息：

bash-4.2$ amqsget Q1

Sample AMQSGET0 start

message

amqsget 程序将持续侦听队列上的新消息。用 Ctrl-c 终止它。也可以用 amqsgbr 代码来浏览 Q1 上的消息以确保没有遗漏。现在就试一下。

2.13现在使用 amqsput 命令将一个或多个消息放置到 AQ1（我们为 Q1 创建的别名）上。如有需要，可以回头参阅2.9  
2.14 使用 runmqsc ，显示 Q1 的属性以确定队列上有多少消息（检查队列的 CURDEPTH）：  
检查 Q1 的深度：

bash-4.2$ runmqsc

5724-B41 © Copyright IBM Corp. 1994, 2002. ALL RIGHTS RESERVED.

Starting MQSC for queue manager .

dis q(Q1)

     1 : dis q(Q1)
    

AMQ8409: Display Queue details.

DESCR( ) PROCESS( )

BOQNAME( ) INITQ( )

TRIGDATA( ) CLUSTER( )

CLUSNL( ) QUEUE(Q1)

CRDATE(2002-10-31) CRTIME(11.50.04)

ALTDATE(2002-10-31) ALTTIME(11.50.04)

GET(ENABLED) PUT(ENABLED)

DEFPRTY(0) DEFPSIST(NO)

MAXDEPTH(10) MAXMSGL(4194304)

BOTHRESH(0) SHARE

DEFSOPT(SHARED) HARDENBO

MSGDLVSQ(PRIORITY) RETINTVL(999999999)

USAGE(NORMAL) NOTRIGGER

TRIGTYPE(FIRST) TRIGDPTH(1)

TRIGMPRI(0) QDEPTHHI(80)

QDEPTHLO(20) QDPMAXEV(ENABLED)

QDPHIEV(DISABLED) QDPLOEV(DISABLED)

QSVCINT(999999999) QSVCIEV(NONE)

DISTL(NO) DEFTYPE(PREDEFINED)

TYPE(QLOCAL) SCOPE(QMGR)

DEFBIND(OPEN) IPPROCS(0)

OPPROCS(0) CURDEPTH(2)

请记得输入 end 以终止 runmqsc 命令。

2.15 现在再次使用 amqsget 来获得 Q 上的消息。如有需要，请回头参阅2.12。

2.16现在执行禁用 Q2 上 PUT 函数的操作，使用 runmqsc ：  
禁用 Q2 的 PUT 函数：

bash-4.2$ runmqsc

5724-B41 © Copyright IBM Corp. 1994, 2002. ALL RIGHTS RESERVED.

Starting MQSC for queue manager .

alter ql(Q2) put(disabled)

     1 : alter ql(Q2) put(disabled)
    

AMQ8008: WebSphere MQ queue changed.

2.17 现在试着将一个消息放置到 Q2 上以验证 PUT 已经被禁用：  
对 Q2 尝试 PUT：

bash-4.2$ amqsput Q2

Sample AMQSPUT0 start

target queue is Q2

Hello Q2

MQPUT ended with reason code 2051

Sample AMQSPUT0 end

\[mqm@echidna mqm\]$

这一命令会失败并且显示一个错误代码，因为 PUT 已经被禁用。

2.18通过使用 runmqsc ，删除 Q2：  
bash-4.2$ runmqsc

5724-B41 © Copyright IBM Corp. 1994, 2002. ALL RIGHTS RESERVED.

Starting MQSC for queue manager .

delete qlocal(Q2)

     1 : delete qlocal(Q2)
    

AMQ8007: WebSphere MQ queue deleted.

2.19当您准备停止队列管理器时，可输入 endmqm QM1 命令以常规方式终止，或输入 endmqm -i QM1 立即终止。可以输入 dltmqm QM1 命令来删除队列管理器。

* * *

本文来自 1275012490 的CSDN 博客 ，全文地址请点击：[https://blog.csdn.net/qq\_34569497/article/details/81082370?utm\_source=copy](https://blog.csdn.net/qq_34569497/article/details/81082370?utm_source=copy) 一、Windows上安装MQ：

AMQ8101: 发生 IBM MQ 错误（80F）。

配置好后需要重启服务或者电脑才可创建队列管理器

1069错误（由于登录失败而无法启动服务）解决方法

创建本地队列：

二、Linux上安装MQ：  
参考地址：[https://www.ibm.com/developerworks/cn/linux/linux-speed-start/l-ss-mq/#code9](https://www.ibm.com/developerworks/cn/linux/linux-speed-start/l-ss-mq/#code9)

1安装IBM MQ  
下载安装包  
IBM\_MQ\_9.0.0.0\_LINUX\_X86-64_TRIAL.tar.gz

下载地址：

[https://www-01.ibm.com/marketing/iwm/iwm/web/download.do?S_PKG=CRZC5ML&source=ESD-WSMQ-EVAL&transactionid=448604060&pageType=urx](https://www-01.ibm.com/marketing/iwm/iwm/web/download.do?S_PKG=CRZC5ML&source=ESD-WSMQ-EVAL&transactionid=448604060&pageType=urx)

注意：需要注册IBM账号登录后才可下载，可选择https方式下载无需下载插件。另一种方式需要下载插件。

1.2 解压并安装  
1.2.1解压后，解压文件都在MQServer中

tar –xzvf IBM\_MQ\_9.0.0.0\_LINUX\_X86-64_TRIAL.tar.gz

1.2.2进入MQServer文件夹中:

\[root@izwz96vkfmmbo4o9iwca5oz tools\]# cd MQServer/

1.2.3运行 MQ 许可证程序

(由于本人下载的IBM MQ安装包非Linux下包，所以找不到./mqlicense.sh，所以注意不要下载错安装包)

执行\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]#./mqlicense.sh

1.2.4安装 WebSphere MQ for Linux 服务器（Runtime、SDK 和 Server 软件包）：

\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]# rpm -U MQSeriesRuntime-9.0.0-0.x86_64.rpm

\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]# rpm -U MQSeriesSDK-9.0.0-0.x86_64.rpm

\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]# rpm -U MQSeriesServer-9.0.0-0.x86_64.rpm

1.2.5安装 WebSphere MQ for Linux 客户机：

（注：安装服务器时我们已经安装了 Runtime 软件包）：

\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]#rpm -U MQSeriesClient-9.0.0-0.x86_64.rpm

1.2.6安装 WebSphere MQ 样本程序:

（其中包括 amqsput、amqsget、amqsgbr 和 amqsbcg 等）

\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]#rpm -U MQSeriesSamples-9.0.0-0.x86_64.rpm

这个命令把 WebSphere MQ 样本程序安装在 /opt/mqm/samp/bin 中。它还将在 /opt/mqm/samp 中安装这些样本程序的 C 和 CPP 源文件。您可以打开这些样本程序的一些源文件（如 amqsput.c ），以了解如何使用 MQ API（MQI）。

1.2.7 创建组和用户

安装过程创建了一个名为 mqm 的用户和一个同样名为 mqm 的组。此时，新用户是被锁定的，您必须设置一个密码来解锁，这样才能继续本文的第二部分。可用 passwd 命令做到这一点：

\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]# passwd mqm

将提示您输入用于 mqm 的新密码并随后确认它。

提示：如果您已经有 Linux 方面的经验，并且更愿意用一个现有的用户来管理 WebSphere MQ，那么可以通过将该用户添加到 mqm 组来做到这一点

2运行IBM MQ  
在开始这一节之前，请确保象前一节末尾所描述的那样，对 WebSphere MQ 安装程序为您创建的新用户 mqm 设置了密码。

2.1以用户 mqm 的身份登录。  
切换用户：

su mqm

2.2创建队列管理器  
使用 crtmqm 命令来创建一个名为 QM1 的队列管理器。我们把它作为缺省队列，并且将不在创建时指定死信队列。然后使用 strmqm 命令启动队列管理器。

\[mqm@echidna mqm\]$ crtmqm -q QM1

There are 34 days left in the beta test period for this copy of WebSphere MQ.

WebSphere MQ queue manager created.

Creating or replacing default objects for QM1.

Default objects statistics : 31 created. 0 replaced. 0 failed.

Completing setup.

Setup completed.

\[mqm@echidna mqm\]$ strmqm QM1

There are 34 days left in the beta test period for this copy of WebSphere MQ.

Purchased processor allowance not set (use setmqcap).

WebSphere MQ queue manager ‘QM1’ started.

\[mqm@echidna mqm\]$

问题解决：

如果执行crtmqm命令时提示

-bash-3.2$ crtmqm

-bash: crtmqm: command not found

\[root@ izwz96vkfmmbo4o9iwca5oz ~\]# find / -name crtmqm

/opt/mqm/bin/crtmqm

则需要配置mqm用户的环境变量，编辑如下文件，并添加下面的内容，如下：

第一种方法： 相对第二种较安全 仅对 mqm用户有效

1）-bash-3.2$ vi /var/mqm/.bash_profile --有可能会在文件夹下看不到这个文件，通过编辑即可看到

PATH=$PATH:/opt/mqm/samp/bin:/opt/mqm/bin:bin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/X11R6/bin

2）执行“.”命令，使这个文件生效

-bash-3.2$ source .bash_profile

3）再次尝试实行crtmqm或是dspmqm命令，即可发现已经生效。

第二种方法：

1）su root

2）vim /etc/profile

3）在最后面加上：PATH=$PATH:/opt/mqm/samp/bin:/opt/mqm/bin:bin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/bin

4）关闭远程终端重新打开，无需重启服务器

2.3 创建命令文件，并将本地队列输入到这个命令文件

创建名为 ex1input.txt 的 WebSphere MQ 命令文件。将用于创建名为 Q1 的本地队列（最大深度是 10 条消息）的命令输入到这个命令文件中。创建 Q1 的别名，名为 AQ1。然后创建一个名为 Q2 的本地队列，它有和 Q1 相同的属性：

bash-4.2$ touch ex1input.txt (you can also use vi, emacs, pico, or kwrite)

可以使用缩写的命令，如def ql 代表 define qlocal 。将下面几行输入到文件ex1input.txt中：

def ql(Q1) maxdepth(10)

def qalias(AQ1) targq(Q1)

def ql(Q2) like(Q1)

2.4 运行 WebSphere MQ 命令应用程序 runmqsc  
使用 runmqsc 创建队列:

bash-4.2$ runmqsc < ex1input.txt

5724-B41 © Copyright IBM Corp. 1994, 2002. ALL RIGHTS RESERVED.

Starting MQSC for queue manager .

     1 : def ql(Q1) maxdepth(10)
    

AMQ8006: WebSphere MQ queue created.

     2 : def qalias(AQ1) targq(Q1)
    

AMQ8006: WebSphere MQ queue created.

     3 : def ql(Q2) like(Q1)
    

AMQ8006: WebSphere MQ queue created.

3 MQSC commands read.

No commands have a syntax error.

All valid MQSC commands were processed.

bash-4.2$

2.5 启动 WebSphere MQ 命令应用程序 runmqsc 来处理作为标准输入而输入的 WebSphere MQ 命令。Q1 的所有属性显示如下：  
显示 Q1 的详细信息:

\[mqm@echidna mqm\]$ runmqsc

5724-B41 © Copyright IBM Corp. 1994, 2002. ALL RIGHTS RESERVED.

Starting MQSC for queue manager .

dis q(Q1)

     1 : dis q(Q1)
    

AMQ8409: Display Queue details.

DESCR( ) PROCESS( )

BOQNAME( ) INITQ( )

TRIGDATA( ) CLUSTER( )

CLUSNL( ) QUEUE(Q1)

CRDATE(2002-10-31) CRTIME(11.50.04)

ALTDATE(2002-10-31) ALTTIME(11.50.04)

GET(ENABLED) PUT(ENABLED)

DEFPRTY(0) DEFPSIST(NO)

MAXDEPTH(10) MAXMSGL(4194304)

BOTHRESH(0) SHARE

DEFSOPT(SHARED) HARDENBO

MSGDLVSQ(PRIORITY) RETINTVL(999999999)

USAGE(NORMAL) NOTRIGGER

TRIGTYPE(FIRST) TRIGDPTH(1)

TRIGMPRI(0) QDEPTHHI(80)

QDEPTHLO(20) QDPMAXEV(ENABLED)

QDPHIEV(DISABLED) QDPLOEV(DISABLED)

QSVCINT(999999999) QSVCIEV(NONE)

DISTL(NO) DEFTYPE(PREDEFINED)

TYPE(QLOCAL) SCOPE(QMGR)

DEFBIND(OPEN) IPPROCS(0)

OPPROCS(0) CURDEPTH(0)

2.6. 现在显示队列管理器中的所有队列：  
2 : dis q(*)

AMQ8409: Display Queue details.

QUEUE(AQ1) TYPE(QALIAS)

AMQ8409: Display Queue details.

QUEUE(Q1) TYPE(QLOCAL)

AMQ8409: Display Queue details.

QUEUE(Q2) TYPE(QLOCAL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.ADMIN.CHANNEL.EVENT) TYPE(QLOCAL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.ADMIN.COMMAND.QUEUE) TYPE(QLOCAL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.ADMIN.PERFM.EVENT) TYPE(QLOCAL)

…

AMQ8409: Display Queue details.

QUEUE(SYSTEM.DEFAULT.INITIATION.QUEUE)

TYPE(QLOCAL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.DEFAULT.LOCAL.QUEUE) TYPE(QLOCAL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.DEFAULT.MODEL.QUEUE) TYPE(QMODEL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.DEFAULT.REMOTE.QUEUE) TYPE(QREMOTE)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.MQSC.REPLY.QUEUE) TYPE(QMODEL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.PENDING.DATA.QUEUE) TYPE(QLOCAL)

2.7最后，将队列管理器的死信队列更改为 SYSTEM.DEAD.LETTER.QUEUE，然后关闭命令应用程序。  
更改死信队列并关闭命令应用程序:

alter qmgr deadq(SYSTEM.DEAD.LETTER.QUEUE)

     4 : alter qmgr deadq(SYSTEM.DEAD.LETTER.QUEUE)
    

AMQ8005: WebSphere MQ queue manager changed.

end

     5 : end –使用end即可退出runmqsc
    

2.8在接下来的几步中，我们将使用 WebSphere MQ 样本程序在队列上放置、获取和浏览消息通过输入以下命令，将 WebSphere MQ 样本程序目录添加到 PATH：

bash-4.2$ PATH=$PATH:/opt/mqm/samp/bin

2.9使用 amqsput 样本程序，将一个或多个消息放置到 Q1 上。在每个消息后按 Enter。若要终止，则按 Ctrl-d 以在标准输入上发出文件结束符信号：  
在 Q1 上放置消息：

bash-4.2$ amqsput Q1

Sample AMQSPUT0 start

target queue is Q1

Hello Q1

Sample AMQSPUT0 end –使用Ctrl-d自动显示

错误解决：

bash-4.2$ amqsput Q1  
Sample AMQSPUT0 start  
target queue is Q1  
MQOPEN ended with reason code 2085  
unable to open queue for output  
Sample AMQSPUT0 end

若出现以上错误：

需使用 amqsput Q1 QM1 (amqsput 对列名 队列管理器名) amqsget也一样用法amqsget Q1 QM1

这里系统将处于等待用户输入的状态，随便输入一些消息，然后连敲二次回车，完成消息发送

2.10 使用 amqsput 样本程序，浏览 Q1 以查看队列上的消息：  
浏览 Q1 上的消息：

bash-4.2$ amqsgbr Q1

Sample AMQSGBR0 (browse) start

Messages for Q1

no more messages

Sample AMQSGBR0 (browse) end

2.11使用 amqsbcg 样本程序，浏览 Q1 以查看队列上的消息及其消息描述符：  
浏览 Q1 上的消息和描述符：

bash-4.2$ amqsbcg Q1

AMQSBCG0 - starts here

* * *

MQOPEN - ‘Q1’

MQGET of message number 1

****Message descriptor****

StrucId : 'MD ’ Version : 2

Report : 0 MsgType : 8

Expiry : -1 Feedback : 0

Encoding : 546 CodedCharSetId : 923

Format : 'MQSTR ’

Priority : 0 Persistence : 0

MsgId : X’414D5120514D312020202020202020203E81BD3D01030020’

CorrelId : X’000000000000000000000000000000000000000000000000’

BackoutCount : 0

ReplyToQ : ’ ’

ReplyToQMgr : 'QM1 ’

\*\* Identity Context

UserIdentifier : 'mqm ’

AccountingToken :

X’0335303500000000000000000000000000000000000000000000000000000006’

ApplIdentityData : ’ ’

\*\* Origin Context

PutApplType : ‘6’

PutApplName : 'amqsput ’

PutDate : ‘20021031’ PutTime : ‘17053341’

ApplOriginData : ’ ’

GroupId : X’000000000000000000000000000000000000000000000000’

MsgSeqNumber : ‘1’

Offset : ‘0’

MsgFlags : ‘0’

OriginalLength : ‘-1’

\*\*\*\* Message ****

length - 8 bytes

00000000: 4865 6C6C 6F20 5131 'Hello Q1 ’

No more messages

MQCLOSE

MQDISC

2.12使用 amqsget 样本程序清除 Q1 上的消息：  
从 Q1 获取消息：

bash-4.2$ amqsget Q1

Sample AMQSGET0 start

message

amqsget 程序将持续侦听队列上的新消息。用 Ctrl-c 终止它。也可以用 amqsgbr 代码来浏览 Q1 上的消息以确保没有遗漏。现在就试一下。

2.13现在使用 amqsput 命令将一个或多个消息放置到 AQ1（我们为 Q1 创建的别名）上。如有需要，可以回头参阅2.9  
2.14 使用 runmqsc ，显示 Q1 的属性以确定队列上有多少消息（检查队列的 CURDEPTH）：  
检查 Q1 的深度：

bash-4.2$ runmqsc

5724-B41 © Copyright IBM Corp. 1994, 2002. ALL RIGHTS RESERVED.

Starting MQSC for queue manager .

dis q(Q1)

     1 : dis q(Q1)
    

AMQ8409: Display Queue details.

DESCR( ) PROCESS( )

BOQNAME( ) INITQ( )

TRIGDATA( ) CLUSTER( )

CLUSNL( ) QUEUE(Q1)

CRDATE(2002-10-31) CRTIME(11.50.04)

ALTDATE(2002-10-31) ALTTIME(11.50.04)

GET(ENABLED) PUT(ENABLED)

DEFPRTY(0) DEFPSIST(NO)

MAXDEPTH(10) MAXMSGL(4194304)

BOTHRESH(0) SHARE

DEFSOPT(SHARED) HARDENBO

MSGDLVSQ(PRIORITY) RETINTVL(999999999)

USAGE(NORMAL) NOTRIGGER

TRIGTYPE(FIRST) TRIGDPTH(1)

TRIGMPRI(0) QDEPTHHI(80)

QDEPTHLO(20) QDPMAXEV(ENABLED)

QDPHIEV(DISABLED) QDPLOEV(DISABLED)

QSVCINT(999999999) QSVCIEV(NONE)

DISTL(NO) DEFTYPE(PREDEFINED)

TYPE(QLOCAL) SCOPE(QMGR)

DEFBIND(OPEN) IPPROCS(0)

OPPROCS(0) CURDEPTH(2)

请记得输入 end 以终止 runmqsc 命令。

2.15 现在再次使用 amqsget 来获得 Q 上的消息。如有需要，请回头参阅2.12。

2.16现在执行禁用 Q2 上 PUT 函数的操作，使用 runmqsc ：  
禁用 Q2 的 PUT 函数：

bash-4.2$ runmqsc

5724-B41 © Copyright IBM Corp. 1994, 2002. ALL RIGHTS RESERVED.

Starting MQSC for queue manager .

alter ql(Q2) put(disabled)

     1 : alter ql(Q2) put(disabled)
    

AMQ8008: WebSphere MQ queue changed.

2.17 现在试着将一个消息放置到 Q2 上以验证 PUT 已经被禁用：  
对 Q2 尝试 PUT：

bash-4.2$ amqsput Q2

Sample AMQSPUT0 start

target queue is Q2

Hello Q2

MQPUT ended with reason code 2051

Sample AMQSPUT0 end

\[mqm@echidna mqm\]$

这一命令会失败并且显示一个错误代码，因为 PUT 已经被禁用。

2.18通过使用 runmqsc ，删除 Q2：  
bash-4.2$ runmqsc

5724-B41 © Copyright IBM Corp. 1994, 2002. ALL RIGHTS RESERVED.

Starting MQSC for queue manager .

delete qlocal(Q2)

     1 : delete qlocal(Q2)
    

AMQ8007: WebSphere MQ queue deleted.

2.19当您准备停止队列管理器时，可输入 endmqm QM1 命令以常规方式终止，或输入 endmqm -i QM1 立即终止。可以输入 dltmqm QM1 命令来删除队列管理器。

* * *

本文来自 1275012490 的CSDN 博客 ，全文地址请点击：[https://blog.csdn.net/qq\_34569497/article/details/81082370?utm\_source=copy](https://blog.csdn.net/qq_34569497/article/details/81082370?utm_source=copy) 一、Windows上安装MQ：

AMQ8101: 发生 IBM MQ 错误（80F）。

配置好后需要重启服务或者电脑才可创建队列管理器

1069错误（由于登录失败而无法启动服务）解决方法

创建本地队列：

二、Linux上安装MQ：  
参考地址：[https://www.ibm.com/developerworks/cn/linux/linux-speed-start/l-ss-mq/#code9](https://www.ibm.com/developerworks/cn/linux/linux-speed-start/l-ss-mq/#code9)

1安装IBM MQ  
下载安装包  
IBM\_MQ\_9.0.0.0\_LINUX\_X86-64_TRIAL.tar.gz

下载地址：

[https://www-01.ibm.com/marketing/iwm/iwm/web/download.do?S_PKG=CRZC5ML&source=ESD-WSMQ-EVAL&transactionid=448604060&pageType=urx](https://www-01.ibm.com/marketing/iwm/iwm/web/download.do?S_PKG=CRZC5ML&source=ESD-WSMQ-EVAL&transactionid=448604060&pageType=urx)

注意：需要注册IBM账号登录后才可下载，可选择https方式下载无需下载插件。另一种方式需要下载插件。

1.2 解压并安装  
1.2.1解压后，解压文件都在MQServer中

tar –xzvf IBM\_MQ\_9.0.0.0\_LINUX\_X86-64_TRIAL.tar.gz

1.2.2进入MQServer文件夹中:

\[root@izwz96vkfmmbo4o9iwca5oz tools\]# cd MQServer/

1.2.3运行 MQ 许可证程序

(由于本人下载的IBM MQ安装包非Linux下包，所以找不到./mqlicense.sh，所以注意不要下载错安装包)

执行\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]#./mqlicense.sh

1.2.4安装 WebSphere MQ for Linux 服务器（Runtime、SDK 和 Server 软件包）：

\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]# rpm -U MQSeriesRuntime-9.0.0-0.x86_64.rpm

\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]# rpm -U MQSeriesSDK-9.0.0-0.x86_64.rpm

\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]# rpm -U MQSeriesServer-9.0.0-0.x86_64.rpm

1.2.5安装 WebSphere MQ for Linux 客户机：

（注：安装服务器时我们已经安装了 Runtime 软件包）：

\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]#rpm -U MQSeriesClient-9.0.0-0.x86_64.rpm

1.2.6安装 WebSphere MQ 样本程序:

（其中包括 amqsput、amqsget、amqsgbr 和 amqsbcg 等）

\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]#rpm -U MQSeriesSamples-9.0.0-0.x86_64.rpm

这个命令把 WebSphere MQ 样本程序安装在 /opt/mqm/samp/bin 中。它还将在 /opt/mqm/samp 中安装这些样本程序的 C 和 CPP 源文件。您可以打开这些样本程序的一些源文件（如 amqsput.c ），以了解如何使用 MQ API（MQI）。

1.2.7 创建组和用户

安装过程创建了一个名为 mqm 的用户和一个同样名为 mqm 的组。此时，新用户是被锁定的，您必须设置一个密码来解锁，这样才能继续本文的第二部分。可用 passwd 命令做到这一点：

\[root@izwz96vkfmmbo4o9iwca5oz MQServer\]# passwd mqm

将提示您输入用于 mqm 的新密码并随后确认它。

提示：如果您已经有 Linux 方面的经验，并且更愿意用一个现有的用户来管理 WebSphere MQ，那么可以通过将该用户添加到 mqm 组来做到这一点

2运行IBM MQ  
在开始这一节之前，请确保象前一节末尾所描述的那样，对 WebSphere MQ 安装程序为您创建的新用户 mqm 设置了密码。

2.1以用户 mqm 的身份登录。  
切换用户：

su mqm

2.2创建队列管理器  
使用 crtmqm 命令来创建一个名为 QM1 的队列管理器。我们把它作为缺省队列，并且将不在创建时指定死信队列。然后使用 strmqm 命令启动队列管理器。

\[mqm@echidna mqm\]$ crtmqm -q QM1

There are 34 days left in the beta test period for this copy of WebSphere MQ.

WebSphere MQ queue manager created.

Creating or replacing default objects for QM1.

Default objects statistics : 31 created. 0 replaced. 0 failed.

Completing setup.

Setup completed.

\[mqm@echidna mqm\]$ strmqm QM1

There are 34 days left in the beta test period for this copy of WebSphere MQ.

Purchased processor allowance not set (use setmqcap).

WebSphere MQ queue manager ‘QM1’ started.

\[mqm@echidna mqm\]$

问题解决：

如果执行crtmqm命令时提示

-bash-3.2$ crtmqm

-bash: crtmqm: command not found

\[root@ izwz96vkfmmbo4o9iwca5oz ~\]# find / -name crtmqm

/opt/mqm/bin/crtmqm

则需要配置mqm用户的环境变量，编辑如下文件，并添加下面的内容，如下：

第一种方法： 相对第二种较安全 仅对 mqm用户有效

1）-bash-3.2$ vi /var/mqm/.bash_profile --有可能会在文件夹下看不到这个文件，通过编辑即可看到

PATH=$PATH:/opt/mqm/samp/bin:/opt/mqm/bin:bin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/X11R6/bin

2）执行“.”命令，使这个文件生效

-bash-3.2$ source .bash_profile

3）再次尝试实行crtmqm或是dspmqm命令，即可发现已经生效。

第二种方法：

1）su root

2）vim /etc/profile

3）在最后面加上：PATH=$PATH:/opt/mqm/samp/bin:/opt/mqm/bin:bin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/bin

4）关闭远程终端重新打开，无需重启服务器

2.3 创建命令文件，并将本地队列输入到这个命令文件

创建名为 ex1input.txt 的 WebSphere MQ 命令文件。将用于创建名为 Q1 的本地队列（最大深度是 10 条消息）的命令输入到这个命令文件中。创建 Q1 的别名，名为 AQ1。然后创建一个名为 Q2 的本地队列，它有和 Q1 相同的属性：

bash-4.2$ touch ex1input.txt (you can also use vi, emacs, pico, or kwrite)

可以使用缩写的命令，如def ql 代表 define qlocal 。将下面几行输入到文件ex1input.txt中：

def ql(Q1) maxdepth(10)

def qalias(AQ1) targq(Q1)

def ql(Q2) like(Q1)

2.4 运行 WebSphere MQ 命令应用程序 runmqsc  
使用 runmqsc 创建队列:

bash-4.2$ runmqsc < ex1input.txt

5724-B41 © Copyright IBM Corp. 1994, 2002. ALL RIGHTS RESERVED.

Starting MQSC for queue manager .

     1 : def ql(Q1) maxdepth(10)
    

AMQ8006: WebSphere MQ queue created.

     2 : def qalias(AQ1) targq(Q1)
    

AMQ8006: WebSphere MQ queue created.

     3 : def ql(Q2) like(Q1)
    

AMQ8006: WebSphere MQ queue created.

3 MQSC commands read.

No commands have a syntax error.

All valid MQSC commands were processed.

bash-4.2$

2.5 启动 WebSphere MQ 命令应用程序 runmqsc 来处理作为标准输入而输入的 WebSphere MQ 命令。Q1 的所有属性显示如下：  
显示 Q1 的详细信息:

\[mqm@echidna mqm\]$ runmqsc

5724-B41 © Copyright IBM Corp. 1994, 2002. ALL RIGHTS RESERVED.

Starting MQSC for queue manager .

dis q(Q1)

     1 : dis q(Q1)
    

AMQ8409: Display Queue details.

DESCR( ) PROCESS( )

BOQNAME( ) INITQ( )

TRIGDATA( ) CLUSTER( )

CLUSNL( ) QUEUE(Q1)

CRDATE(2002-10-31) CRTIME(11.50.04)

ALTDATE(2002-10-31) ALTTIME(11.50.04)

GET(ENABLED) PUT(ENABLED)

DEFPRTY(0) DEFPSIST(NO)

MAXDEPTH(10) MAXMSGL(4194304)

BOTHRESH(0) SHARE

DEFSOPT(SHARED) HARDENBO

MSGDLVSQ(PRIORITY) RETINTVL(999999999)

USAGE(NORMAL) NOTRIGGER

TRIGTYPE(FIRST) TRIGDPTH(1)

TRIGMPRI(0) QDEPTHHI(80)

QDEPTHLO(20) QDPMAXEV(ENABLED)

QDPHIEV(DISABLED) QDPLOEV(DISABLED)

QSVCINT(999999999) QSVCIEV(NONE)

DISTL(NO) DEFTYPE(PREDEFINED)

TYPE(QLOCAL) SCOPE(QMGR)

DEFBIND(OPEN) IPPROCS(0)

OPPROCS(0) CURDEPTH(0)

2.6. 现在显示队列管理器中的所有队列：  
2 : dis q(*)

AMQ8409: Display Queue details.

QUEUE(AQ1) TYPE(QALIAS)

AMQ8409: Display Queue details.

QUEUE(Q1) TYPE(QLOCAL)

AMQ8409: Display Queue details.

QUEUE(Q2) TYPE(QLOCAL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.ADMIN.CHANNEL.EVENT) TYPE(QLOCAL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.ADMIN.COMMAND.QUEUE) TYPE(QLOCAL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.ADMIN.PERFM.EVENT) TYPE(QLOCAL)

…

AMQ8409: Display Queue details.

QUEUE(SYSTEM.DEFAULT.INITIATION.QUEUE)

TYPE(QLOCAL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.DEFAULT.LOCAL.QUEUE) TYPE(QLOCAL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.DEFAULT.MODEL.QUEUE) TYPE(QMODEL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.DEFAULT.REMOTE.QUEUE) TYPE(QREMOTE)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.MQSC.REPLY.QUEUE) TYPE(QMODEL)

AMQ8409: Display Queue details.

QUEUE(SYSTEM.PENDING.DATA.QUEUE) TYPE(QLOCAL)

2.7最后，将队列管理器的死信队列更改为 SYSTEM.DEAD.LETTER.QUEUE，然后关闭命令应用程序。  
更改死信队列并关闭命令应用程序:

alter qmgr deadq(SYSTEM.DEAD.LETTER.QUEUE)

     4 : alter qmgr deadq(SYSTEM.DEAD.LETTER.QUEUE)
    

AMQ8005: WebSphere MQ queue manager changed.

end

     5 : end –使用end即可退出runmqsc
    

2.8在接下来的几步中，我们将使用 WebSphere MQ 样本程序在队列上放置、获取和浏览消息通过输入以下命令，将 WebSphere MQ 样本程序目录添加到 PATH：

bash-4.2$ PATH=$PATH:/opt/mqm/samp/bin

2.9使用 amqsput 样本程序，将一个或多个消息放置到 Q1 上。在每个消息后按 Enter。若要终止，则按 Ctrl-d 以在标准输入上发出文件结束符信号：  
在 Q1 上放置消息：

bash-4.2$ amqsput Q1

Sample AMQSPUT0 start

target queue is Q1

Hello Q1

Sample AMQSPUT0 end –使用Ctrl-d自动显示

错误解决：

bash-4.2$ amqsput Q1  
Sample AMQSPUT0 start  
target queue is Q1  
MQOPEN ended with reason code 2085  
unable to open queue for output  
Sample AMQSPUT0 end

若出现以上错误：

需使用 amqsput Q1 QM1 (amqsput 对列名 队列管理器名) amqsget也一样用法amqsget Q1 QM1

这里系统将处于等待用户输入的状态，随便输入一些消息，然后连敲二次回车，完成消息发送

2.10 使用 amqsput 样本程序，浏览 Q1 以查看队列上的消息：  
浏览 Q1 上的消息：

bash-4.2$ amqsgbr Q1

Sample AMQSGBR0 (browse) start

Messages for Q1

no more messages

Sample AMQSGBR0 (browse) end

2.11使用 amqsbcg 样本程序，浏览 Q1 以查看队列上的消息及其消息描述符：  
浏览 Q1 上的消息和描述符：

bash-4.2$ amqsbcg Q1

AMQSBCG0 - starts here

* * *

MQOPEN - ‘Q1’

MQGET of message number 1

****Message descriptor****

StrucId : 'MD ’ Version : 2

Report : 0 MsgType : 8

Expiry : -1 Feedback : 0

Encoding : 546 CodedCharSetId : 923

Format : 'MQSTR ’

Priority : 0 Persistence : 0

MsgId : X’414D5120514D312020202020202020203E81BD3D01030020’

CorrelId : X’000000000000000000000000000000000000000000000000’

BackoutCount : 0

ReplyToQ : ’ ’

ReplyToQMgr : 'QM1 ’

\*\* Identity Context

UserIdentifier : 'mqm ’

AccountingToken :

X’0335303500000000000000000000000000000000000000000000000000000006’

ApplIdentityData : ’ ’

\*\* Origin Context

PutApplType : ‘6’

PutApplName : 'amqsput ’

PutDate : ‘20021031’ PutTime : ‘17053341’

ApplOriginData : ’ ’

GroupId : X’000000000000000000000000000000000000000000000000’

MsgSeqNumber : ‘1’

Offset : ‘0’

MsgFlags : ‘0’

OriginalLength : ‘-1’

\*\*\*\* Message ****

length - 8 bytes

00000000: 4865 6C6C 6F20 5131 'Hello Q1 ’

No more messages

MQCLOSE

MQDISC

2.12使用 amqsget 样本程序清除 Q1 上的消息：  
从 Q1 获取消息：

bash-4.2$ amqsget Q1

Sample AMQSGET0 start

message

amqsget 程序将持续侦听队列上的新消息。用 Ctrl-c 终止它。也可以用 amqsgbr 代码来浏览 Q1 上的消息以确保没有遗漏。现在就试一下。

2.13现在使用 amqsput 命令将一个或多个消息放置到 AQ1（我们为 Q1 创建的别名）上。如有需要，可以回头参阅2.9  
2.14 使用 runmqsc ，显示 Q1 的属性以确定队列上有多少消息（检查队列的 CURDEPTH）：  
检查 Q1 的深度：

bash-4.2$ runmqsc

5724-B41 © Copyright IBM Corp. 1994, 2002. ALL RIGHTS RESERVED.

Starting MQSC for queue manager .

dis q(Q1)

     1 : dis q(Q1)
    

AMQ8409: Display Queue details.

DESCR( ) PROCESS( )

BOQNAME( ) INITQ( )

TRIGDATA( ) CLUSTER( )

CLUSNL( ) QUEUE(Q1)

CRDATE(2002-10-31) CRTIME(11.50.04)

ALTDATE(2002-10-31) ALTTIME(11.50.04)

GET(ENABLED) PUT(ENABLED)

DEFPRTY(0) DEFPSIST(NO)

MAXDEPTH(10) MAXMSGL(4194304)

BOTHRESH(0) SHARE

DEFSOPT(SHARED) HARDENBO

MSGDLVSQ(PRIORITY) RETINTVL(999999999)

USAGE(NORMAL) NOTRIGGER

TRIGTYPE(FIRST) TRIGDPTH(1)

TRIGMPRI(0) QDEPTHHI(80)

QDEPTHLO(20) QDPMAXEV(ENABLED)

QDPHIEV(DISABLED) QDPLOEV(DISABLED)

QSVCINT(999999999) QSVCIEV(NONE)

DISTL(NO) DEFTYPE(PREDEFINED)

TYPE(QLOCAL) SCOPE(QMGR)

DEFBIND(OPEN) IPPROCS(0)

OPPROCS(0) CURDEPTH(2)

请记得输入 end 以终止 runmqsc 命令。

2.15 现在再次使用 amqsget 来获得 Q 上的消息。如有需要，请回头参阅2.12。

2.16现在执行禁用 Q2 上 PUT 函数的操作，使用 runmqsc ：  
禁用 Q2 的 PUT 函数：

bash-4.2$ runmqsc

5724-B41 © Copyright IBM Corp. 1994, 2002. ALL RIGHTS RESERVED.

Starting MQSC for queue manager .

alter ql(Q2) put(disabled)

     1 : alter ql(Q2) put(disabled)
    

AMQ8008: WebSphere MQ queue changed.

2.17 现在试着将一个消息放置到 Q2 上以验证 PUT 已经被禁用：  
对 Q2 尝试 PUT：

bash-4.2$ amqsput Q2

Sample AMQSPUT0 start

target queue is Q2

Hello Q2

MQPUT ended with reason code 2051

Sample AMQSPUT0 end

\[mqm@echidna mqm\]$

这一命令会失败并且显示一个错误代码，因为 PUT 已经被禁用。

2.18通过使用 runmqsc ，删除 Q2：  
bash-4.2$ runmqsc

5724-B41 © Copyright IBM Corp. 1994, 2002. ALL RIGHTS RESERVED.

Starting MQSC for queue manager .

delete qlocal(Q2)

     1 : delete qlocal(Q2)
    

AMQ8007: WebSphere MQ queue deleted.

2.19当您准备停止队列管理器时，可输入 endmqm QM1 命令以常规方式终止，或输入 endmqm -i QM1 立即终止。可以输入 dltmqm QM1 命令来删除队列管理器。

* * *

本文来自 1275012490 的CSDN 博客 ，全文地址请点击：[https://blog.csdn.net/qq\_34569497/article/details/81082370?utm\_source=copy](https://blog.csdn.net/qq_34569497/article/details/81082370?utm_source=copy)

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()