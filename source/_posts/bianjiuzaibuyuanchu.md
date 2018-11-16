title: 彼岸就在不远处 -.-！
author: Leesin.Dong
tags:
  - interview
  - 喵~
categories: []
date: 2018-11-09 13:14:00
---
<article>
		<div id="article_content" class="article_content clearfix csdn-tracking-statistics" data-pid="blog" data-mod="popu_307" data-dsm="post">
								            <link rel="stylesheet" href="https://csdnimg.cn/release/phoenix/template/css/ck_htmledit_views-f76675cdea.css">
						<div class="htmledit_views">
                <p>作者：重口味 ぅヾ<br>
链接：<a href="https://www.nowcoder.com/discuss/61958" rel="nofollow" target="_blank">https://www.nowcoder.com/discuss/61958</a><br>
来源：牛客网<br>
&nbsp;</p>

<p>博主渣渣本科，挣扎到十一月秋招终于结束了。面过百度/腾讯/小米/网易/搜狗/知乎/京东/360/瓜子。期间总结了一些面试题目，现在放上来。由于是博主自己的面经记录，所以涵盖不全面的话诸位请谅解。&nbsp;<br>
根据博主的面试经验来看，面试有一定的层次性，如bat级别公司每个点都会深入，而有些公司则只会问到表层，所以将每个领域都分为必须掌握和深入了解这两个部分。</p>

<h1><a name="t0"></a>一、计算机网络</h1>

<p><strong>基础部分</strong></p>

<ol><li>TCP报头格式</li>
	<li>UDP报头格式</li>
	<li>TCP/UDP区别（不仅是宏观上的，最好能根据各自的机制讲解清楚）</li>
	<li>HTTP状态码（最好结合使用场景，比如在缓存命中时使用哪个）</li>
	<li>HTTP协议（一些报头字段的作用，如cace-control、keep-alive）</li>
	<li>OSI协议、TCP/IP协议以及每层对应的协议。</li>
	<li>SESSION机制、cookie机制</li>
	<li>TCP三次握手、四次挥手（这个问题真的要回答吐了，不过真的是面试官最喜欢问的，建议每天手撸一遍，而且不只是每次请求的过程，各种FIN_WAIT、TIME_WAIT状态也要掌握）。</li>
	<li>打开网页到页面显示之间的过程（涵盖了各个方面，DNS解析过程，Nginx请求转发、连接建立和保持过程、浏览器内容渲染过程，考虑的越详细越好）。</li>
	<li>http和https区别，https在请求时额外的过程，https是如何保证数据安全的</li>
	<li>IP地址子网划分</li>
	<li>POST和GET区别</li>
	<li>DNS解析过程</li>
</ol><p><strong>深入部分</strong>&nbsp;<br>
13. TCP如何保证数据的可靠传输的（这个问题可以引申出很多子问题，拥塞控制慢开始、拥塞避免、快重传、滑动窗口协议、停止等待协议、超时重传机制，最好都能掌握）&nbsp;<br>
14. 地址解析协议ARP&nbsp;<br>
15. 交换机和路由器的区别</p>

<h1><a name="t1"></a>二、数据库</h1>

<p><strong>基础部分</strong></p>

<ol><li>事务四大特性（ACID）</li>
	<li>数据库隔离级别，每个级别会引发什么问题，mysql默认是哪个级别</li>
	<li>MYSQL的两种存储引擎区别（事务、锁级别等等），各自的适用场景</li>
	<li>数据库的优化（从sql语句优化和索引两个部分回答）</li>
	<li>索引有B+索引和hash索引，各自的区别</li>
	<li>B+索引数据结构，和B树的区别</li>
	<li>索引的分类（主键索引、唯一索引），最左前缀原则，哪些情况索引会失效</li>
	<li>聚集索引和非聚集索引区别。</li>
	<li>有哪些锁（乐观锁悲观锁），select时怎么加排它锁</li>
	<li>关系型数据库和非关系型数据库区别</li>
	<li>了解nosql</li>
	<li>数据库三范式，根据某个场景设计数据表（可以通过手绘ER图）</li>
	<li>数据库的主从复制</li>
	<li>使用explain优化sql和索引</li>
	<li>long_query怎么解决</li>
	<li>内连接、外连接、交叉连接、笛卡儿积等</li>
</ol><p><strong>深入</strong></p>

<ol><li>MVCC机制</li>
	<li>根据具体场景，说明版本控制机制</li>
	<li>死锁怎么解决</li>
	<li>varchar和char的使用场景。</li>
	<li>mysql并发情况下怎么解决（通过事务、隔离级别、锁）</li>
</ol><p><strong>Redis</strong></p>

<ol><li>redis数据结构有哪些</li>
	<li>redis队列应用场景</li>
	<li>redis和Memcached（支持数据持久化）</li>
	<li>分布式使用场景（储存session等）</li>
	<li>发布/订阅使用场景</li>
</ol><h1><a name="t2"></a>三、操作系统</h1>

<ol><li>内存的页面置换算法</li>
	<li>进程调度算法</li>
	<li>进程间通信方式</li>
	<li>进程线程区别</li>
	<li>进程之间的通信</li>
	<li>父子进程、孤儿进程</li>
	<li>fork进程时的操作，&nbsp;<br>
	这个部分我回答的都不好，只能是死记硬背，建议基础好的同学多看看操作系统这部分，能大大加分。</li>
</ol><h1><a name="t3"></a>四、算法</h1>

<p><strong>基础</strong></p>

<ol><li>剑指OFFER的各个题目是最常见的，即使不是原题也是题目的变体，因为面试不像笔试，一般不会出特别困难的题目，所以剑指OFFER上小而精的题目就非常适合。建议手刷一遍。PHP的同学可以参考专栏<a href="http://blog.csdn.net/column/details/15795.html" rel="nofollow" target="_blank">剑指OFFER</a></li>
	<li>二叉树相关（层次遍历、求深度、求两个节点距离、翻转二叉树、前中后序遍历）</li>
	<li>链表相关（插入节点、链表逆置、使用链表进行大数字的加减，双向链表实现队列、寻找链表中的环）</li>
	<li>堆（大量数据中寻找最大N个数字几乎每次都会问，还有堆在插入时进行的调整）</li>
	<li>排序（八大排序，各自的时间复杂度、排序算法的稳定性。快排几乎每次都问）</li>
	<li>二分查找（一般会深入，如寻找数组总和为K的两个数字）</li>
	<li>两个栈实现队列。</li>
	<li>图（深度广度优先遍历、单源最短路径、最小生成树）</li>
	<li>
	<p>动态规划问题。</p>

	<p><strong>深入</strong></p>
	</li>
	<li>
	<p>红黑树性质</p>
	</li>
	<li>分治法和动态规划的区别</li>
	<li>计算时间复杂度</li>
	<li>二叉树和哈希表查找的时间复杂度</li>
</ol><p>栈和链表是面试算法的时候经常用到的工具，多考虑怎么用数据结构的性质解决，因为面试不像笔试，对基础数据结构关注的比较多一些，一般问题也比较简单。然后取模也是常用的工具（比如有一次问怎么让100个进程按规定的权重被调用，就可以用取模的方式）。&nbsp;<br>
面试官一般会先出简单的问题，然后深入地问下去，最好是根据他的思路走，因为能听懂他的提示也是需要考察的能力。</p>

<h1><a name="t4"></a>LINUX</h1>

<ol><li>硬链接和软连接区别</li>
	<li>kill用法，某个进程杀不掉的原因（进入内核态，忽略kill信号）</li>
	<li>linux用过的命令</li>
	<li>系统管理命令（如查看内存使用、网络情况）</li>
	<li>管道的使用 |</li>
	<li>grep的使用，一定要掌握，每次都会问在文件中查找</li>
	<li>shell脚本</li>
	<li>find命令</li>
	<li>awk使用</li>
</ol><h1><a name="t5"></a>语言部分（PHP）</h1>

<ol><li>数组操作函数</li>
	<li>字符串操作函数（数组和字符串的函数是最常问的，非常多，一定不要记混了）</li>
	<li>指针和引用区别</li>
	<li>堆和栈的区别</li>
	<li>== ===区别</li>
	<li>PHP的垃圾回收机制</li>
	<li>zval结构</li>
	<li>防sql注入</li>
	<li>跨域问题</li>
	<li>长链接和长轮询</li>
</ol><p><strong>面向对象、设计模式</strong></p>

<ol><li>接口和抽象类区别</li>
	<li>单继承</li>
	<li>construct的调用顺序（子类父类之间）</li>
	<li>设计模式（工厂模式、策略模式、单例模式、装饰模式比较常见）</li>
	<li>OOP特性，通过哪些机制实现的</li>
	<li>重写和重载区别</li>
	<li>静态类静态方法</li>
	<li>根据某个需求设计一个类（主要考虑类之间的继承关系和属性的权限设置）</li>
</ol><h1><a name="t6"></a>项目</h1>

<ol><li>项目中遇到的困难（提前想好，并且把实现或者优化方法说清楚）</li>
	<li>系统的量级、pv、uv等</li>
	<li>应对高并发的解决办法（分布式）</li>
	<li>在项目中主要负责了哪些工作。</li>
	<li>nginx的负载均衡</li>
	<li>分布式缓存的一致性，服务器如何扩容（哈希环）</li>
</ol><p>总之要把写在简历上的项目部分熟悉一遍，技术栈、项目功能、难点都要考虑好。</p>            </div>
                </div>
									
					<script>
						(function(){
							function setArticleH(btnReadmore,posi){
								var winH = $(window).height();
								var articleBox = $("div.article_content");
								var artH = articleBox.height();
								if(artH > winH*posi){
									articleBox.css({
										'height':winH*posi+'px',
										'overflow':'hidden'
									})
									btnReadmore.click(function(){
										articleBox.removeAttr("style");
										$(this).parent().remove();
									})
								}else{
									btnReadmore.parent().remove();
								}
							}
							var btnReadmore = $("#btn-readmore");
							if(btnReadmore.length>0){
								if(currentUserName){
									setArticleH(btnReadmore,3);
								}else{
									setArticleH(btnReadmore,1.2);
								}
							}
						})()
					</script>
					</article>