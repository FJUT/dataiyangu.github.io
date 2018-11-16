title: 事物的特性
author: Leesin.Dong
tags:
  - interview
  - 数据库
  - 事物
categories:
  - 数据库
  - 数据库基础知识
date: 2018-11-09 00:07:00
---
<article>
		<div id="article_content" class="article_content clearfix csdn-tracking-statistics" data-pid="blog" data-mod="popu_307" data-dsm="post">
								            <link rel="stylesheet" href="https://csdnimg.cn/release/phoenix/template/css/ck_htmledit_views-f76675cdea.css">
						<div class="htmledit_views">
                <p style="margin-left:10px;">一、事务的基本要素（ACID）</p>

<p style="margin-left:10px;">　　1、原子性（Atomicity）：事务开始后所有操作，要么全部做完，要么全部不做，不可能停滞在中间环节。事务执行过程中出错，会回滚到事务开始前的状态，所有的操作就像没有发生一样。也就是说事务是一个不可分割的整体，就像化学中学过的原子，是物质构成的基本单位。</p>

<p style="margin-left:10px;">　　&nbsp;2、一致性（Consistency）：事务开始前和结束后，数据库的完整性约束没有被破坏 。比如A向B转账，不可能A扣了钱，B却没收到。</p>

<p style="margin-left:10px;">　　 3、隔离性（Isolation）：同一时间，只允许一个事务请求同一数据，不同的事务之间彼此没有任何干扰。比如A正在从一张银行卡中取钱，在A取钱的过程结束前，B不能向这张卡转账。</p>

<p style="margin-left:10px;">　　 4、持久性（Durability）：事务完成后，事务对数据库的所有更新将被保存到数据库，不能回滚。</p>

<p style="margin-left:10px;">&nbsp;</p>

<p style="margin-left:10px;">二、事务的并发问题</p>

<p style="margin-left:10px;">　　1、脏读：事务A读取了事务B更新的数据，然后B回滚操作，那么A读取到的数据是脏数据</p>

<p style="margin-left:10px;">　　2、不可重复读：事务 A 多次读取同一数据，事务 B 在事务A多次读取的过程中，对数据作了更新并提交，导致事务A多次读取同一数据时，结果 不一致。</p>

<p style="margin-left:10px;">　　3、幻读：系统管理员A将数据库中所有学生的成绩从具体分数改为ABCDE等级，但是系统管理员B就在这个时候插入了一条具体分数的记录，当系统管理员A改结束后发现还有一条记录没有改过来，就好像发生了幻觉一样，这就叫幻读。</p>

<p style="margin-left:10px;">　　小结：不可重复读的和幻读很容易混淆，不可重复读侧重于修改，幻读侧重于新增或删除。解决不可重复读的问题只需锁住满足条件的行，解决幻读需要锁表</p>

<p style="margin-left:10px;">&nbsp;</p>

<p style="margin-left:10px;">三、MySQL事务隔离级别</p>

<table border="1" style="width:615px;"><tbody><tr><td style="border-color:#c0c0c0;">事务隔离级别</td>
			<td style="border-color:#c0c0c0;">脏读</td>
			<td style="border-color:#c0c0c0;">不可重复读</td>
			<td style="border-color:#c0c0c0;">幻读</td>
		</tr><tr><td style="border-color:#c0c0c0;">读未提交（read-uncommitted）</td>
			<td style="border-color:#c0c0c0;">是</td>
			<td style="border-color:#c0c0c0;">是</td>
			<td style="border-color:#c0c0c0;">是</td>
		</tr><tr><td style="border-color:#c0c0c0;">不可重复读（read-committed）oracle默认</td>
			<td style="border-color:#c0c0c0;">否</td>
			<td style="border-color:#c0c0c0;">是</td>
			<td style="border-color:#c0c0c0;">是</td>
		</tr><tr><td style="border-color:#c0c0c0;">可重复读（repeatable-read）mysql默认的</td>
			<td style="border-color:#c0c0c0;">否</td>
			<td style="border-color:#c0c0c0;">否</td>
			<td style="border-color:#c0c0c0;">是</td>
		</tr><tr><td style="border-color:#c0c0c0;">串行化（serializable）</td>
			<td style="border-color:#c0c0c0;">否</td>
			<td style="border-color:#c0c0c0;">否</td>
			<td style="border-color:#c0c0c0;">否</td>
		</tr></tbody></table><p style="margin-left:10px;">&nbsp;</p>

<p style="margin-left:10px;">&nbsp;</p>

<p style="margin-left:10px;">&nbsp;</p>

<p style="margin-left:10px;">&nbsp;</p>

<p style="margin-left:10px;">&nbsp;</p>            </div>
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