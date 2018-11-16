title: 使用Jedis操作Redis-使用Java语言在客户端操作---set类型
author: Leesin.Dong
tags:
  - 数据库
  - redis
categories:
  - 基础亦是进阶
  - 数据库
date: 2018-11-12 11:40:00
---
原文地址：[http://www.cnblogs.com/lixianyuan-org/p/9509696.html](http://www.cnblogs.com/lixianyuan-org/p/9509696.html)

  1 //测试set数据类型
  2     /**
  3      *  在Redis中，我们可以将Set类型看作为没有排序的字符集合，和List类型一样，我们也可以在该类型的数据值上执行添加、删除或判断某一元素是否存在等操作。需要说明的是，这些操作的时间复杂度为O(1)，即常量时间内完成次操作。Set可包含的最大元素数量是4294967295。
  4      *   和List类型不同的是，Set集合中不允许出现重复的元素,如果多次添加相同元素，Set中将仅保留该元素的一份拷贝
  5      * @throws Exception
  6      */
  7     @Test
  8     public void testSet() throws Exception {
  9         //插入测试数据，由于该键myset之前并不存在，因此参数中的三个成员都被正常插入。
 10         Long sadd = jedis.sadd("myset", "a","b","c");
 11         System.out.println("myset中的元素："+jedis.smembers("myset"));//myset中的元素：\[a, b, c\]
 12         //由于参数中的a在myset中已经存在，因此本次操作仅仅插入了d和e两个新成员
 13         Long sadd2 = jedis.sadd("myset", "a","d","e");
 14         System.out.println("myset中的元素："+jedis.smembers("myset"));//myset中的元素：\[a, b, c, d, e\]
 15         
 16         //判断a是否已经存在，返回值为true表示存在,返回值为false表示不存在
 17         Boolean sismember = jedis.sismember("myset", "a");
 18         System.out.println(sismember);//true
 19         
 20         //#通过smembers命令查看插入的结果，从结果可以，输出的顺序和插入顺序无关。
 21         Set<String> smembers = jedis.smembers("myset");
 22         System.out.println(smembers);//\[a, b, c, d, e\]
 23 
 24         
 25         //获取Set集合中元素的数量。
 26         Long scard = jedis.scard("myset");
 27         System.out.println(scard);//5
 28         
 29         System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
 30         //====================》》》》》>>>>>>>>
 31         Long sadd3 = jedis.sadd("myset2", "a","b","c","d");
 32         System.out.println("sadd3: "+sadd3);//sadd3: 4
 33         //查看Set中成员的位置。查看插入结果
 34         System.out.println(jedis.smembers("myset2"));//\[a, b, c, d\]
 35         
 36         //随机返回某一成员
 37         String srandmember = jedis.srandmember("myset2");
 38         System.out.println("srandmember= "+srandmember);//srandmember= b  这个结果是随机的
 39         
 40         //Set中尾部的成员b被移出并返回，事实上b并不是之前插入的第一个或最后一个成员。弹出一个元素
 41         String spop = jedis.spop("myset2");
 42         System.out.println("spop= "+spop);//spop= b
 43         
 44         //查看移出后set的成员信息
 45         Set<String> smenmber3 = jedis.smembers("myset2");
 46         System.out.println("smenmber3= "+smenmber3);////smenmber3= \[a, c, d\]
 47         
 48         //从Set中移出a、d和f三个成员，其中f并不存在，因此只有a和d两个成员被移出，返回为2。
 49         Long srem = jedis.srem("myset2", "a","d","f");
 50         System.out.println("srem= "+srem);//srem= 2
 51         
 52         //查看移出后的输出结果。
 53         Set<String> smember4 = jedis.smembers("myset2");
 54         System.out.println("smember4= "+smember4);//smember4= \[c\]
 55         
 56         System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
 57         //=====================>>>>>>>
 58         jedis.sadd("myset3", "a","b");
 59         jedis.sadd("myset4", "c","d");
 60         //将a从myset3移到myset4，从结果可以看出移动成功
 61         Long smove = jedis.smove("myset3", "myset4", "a");
 62         System.out.println(smove);//1
 63         //再次将a从myset移到myset2，由于此时a已经不是myset的成员了，因此移动失败并返回0。
 64         Long smove2 =jedis.smove("myset3", "myset4", "a");
 65         System.out.println(smove2);//0
 66         
 67         //分别查看myse3和myset4的成员，确认移动是否真的成功。
 68         System.out.println("myset3: "+jedis.smembers("myset3"));//myset3: \[b\]
 69         System.out.println("myset4: "+jedis.smembers("myset4"));//myset4: \[a, c, d\]
 70         
 71         
 72         System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
 73         //================================>>>>>>>>>>>>>>>
 74         jedis.sadd("myset5", "a","b","c","d");
 75         jedis.sadd("myset6","c");
 76         jedis.sadd("myset7", "a","c","e");
 77         
 78         //差集，比较顺序，从左到右
 79         //myset5和myset6相比，a、b和d三个成员是两者之间的差异成员。再用这个结果继续和myset7进行差异比较，b和d是myset7不存在的成员。
 80         Set<String> sdiff = jedis.sdiff("myset5","myset6","myset7");
 81         System.out.println(sdiff);//\[d, b\]
 82         
 83         //将3个集合的差异成员存在在diffkey关联的Set中，并返回插入的成员数量。
 84         Long sdiffstore = jedis.sdiffstore("diffkey","myset5", "myset6","myset7");
 85         System.out.println(sdiffstore);//2
 86         
 87         //查看一下sdiffstore的操作结果。
 88         Set<String> result = jedis.smembers("diffkey");
 89         System.out.println(result);//\[b, d\]
 90         
 91         //交集
 92         //从之前准备的数据就可以看出，这三个Set的成员交集只有c。
 93         Set<String> sinter = jedis.sinter("myset5","myset6","myset7");
 94         System.out.println(sinter);//\[c\]
 95         
 96         //将3个集合中的交集成员存储到与interkey关联的Set中，并返回交集成员的数量。
 97         Long sinterstore = jedis.sinterstore("interkey", "myset5","myset6","myset7");
 98         System.out.println("sinterstore = "+sinterstore);//sinterstore = 1
 99         
100         //#查看一下sinterstore的操作结果。
101         System.out.println(jedis.smembers("interkey"));//\[c\]
102         
103         //获取3个集合中的成员的并集
104         Set<String> sunion = jedis.sunion("myset5","myset6","myset7");
105         System.out.println("sunion="+sunion);//sunion=\[a, b, c, d, e\]
106         
107         //获取3个集合中的成员的并集。    
108         Long sunionstore = jedis.sunionstore("unionkey", "myset5","myset6","myset7");
109         System.out.println("sunionstore= "+sunionstore);//sunionstore= 5
110         
111         //将3个集合中成员的并集存储到unionkey关联的set中，并返回并集成员的数量。
112         Long result2 = jedis.sunionstore("unionkey", "myset5","myset6","myset7");
113         System.out.println(result2);//5
114         //查看一下suiionstore的操作结果。
115         System.out.println(jedis.smembers("unionkey"));//\[a, b, c, d, e\]
116     }
117     

![复制代码](http://common.cnblogs.com/images/copycode.gif)

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()