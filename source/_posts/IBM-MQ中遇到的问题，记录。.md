title: IBM MQ中遇到的问题，记录。
author: Leesin.Dong
tags:
  - mq
categories:
  - 基础亦是进阶
  - mq
date: 2018-11-12 00:15:00
---
<article>
		<div id="article_content" class="article_content clearfix csdn-tracking-statistics" data-pid="blog" data-mod="popu_307" data-dsm="post">
								<div class="article-copyright">
					版权声明：本文为作者原创，转载请注明出处，联系qq：32248827					https://blog.csdn.net/dataiyangu/article/details/82848888				</div>
								            <link rel="stylesheet" href="https://csdnimg.cn/release/phoenix/template/css/ck_htmledit_views-f76675cdea.css">
						<div class="htmledit_views">
                <blockquote>
<p><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">引起：com.ibm.mqservices.MQInternalException：MQJE001：MQException出现：完成代码是2，原因为2195 MQJE018：协议错误 - 接收到意外的段类型</font></font></p>

<p><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">解决：</font></font></p>

<h3><span style="color:#f33b45;"><strong><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">首先这个错误的本质是连接错误。</font></font></strong></span></h3>

<p><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">什么是ccsid：</font><a href="https://blog.csdn.net/dataiyangu/article/details/82849300" rel="nofollow" target="_blank"><font style="vertical-align:inherit;">https</font></a><font style="vertical-align:inherit;">：//blog.csdn.net/dataiyangu/article/details/82849300</font></font></p>

<p><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">一：MQEnvironment.CCSID = 1381;（在JAVA连接代码时指定一下字符集）&nbsp; </font></font><br><br><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">二：修改字符集设置&nbsp;</font></font></p>

<p><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">查看ccsid dis QMGR </font></font><br><br><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">一般Unix，Linux平台中MQ默认的字符集为819，而Windows平台为1381，所以你必须改变其字符集，使两边的字符集相同。改变方法：&nbsp; </font></font><br><br><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">1。通过DOS进入MQ的安装目录，进入/ bin下。假如要更改的队列管理器为A&nbsp; </font></font><br><br><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">2.用指令“strmqm A”启动队列管理器A.&nbsp; </font></font><br><br><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">3.用指令“runmqsc A”启动A的</font></font><br><br><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">MQSC.4 </font><font style="vertical-align:inherit;">。&nbsp; </font><font style="vertical-align:inherit;">运行指令“ALTER QMGR CCSID（819）”，‘结束’则修改字符集为819。&nbsp;</font></font></p>

<p><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">上面的是正常的操作，而我就按照上面的正常的操作怎么也不成功</font><font style="vertical-align:inherit;">，百思不得其解，中午和同事吃饭，一语点破，原来我也想过这点，但没有实施：因为我的服务是建立在Linux的系统上的，JAVA代码因为在测试阶段放在MAC上，这样就导致，cssid不论怎么配置都不对，</font></font><span style="color:#f33b45;"><strong><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">最终的决绝方案，除了上面说的，请确保在同一个操作系统下。</font></font></strong></span></p>

<p><span style="color:#f33b45;"><strong><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">更正一下：后来发现在MAC上的想法运行又没问题了，我也不知道原因，貌似只要同意CCSID即可，不需要一样的系统。</font></font></strong></span></p>

<p><strong><span style="color:#f33b45;">还有一种可能是我试图通过java反射进行端到端，在端到端的过程中代码有问题，导致这个错误</span></strong></p>
</blockquote>

<blockquote>
<p><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">MQJE001：MQException出现：完成代码是2，原因为2058 MQJE036：队列管理器拒绝连接尝试</font></font></p>

<p><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">队列管理器的名称大小不对，或名称不对。</font></font></p>

<p><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">dspmq查看全部队列管理器</font></font></p>

<p><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">删除不必要的：</font></font></p>

<p><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">mqm @ localhos~&gt; $ endmqm Qm1停止队列管理器</font></font></p>

<p><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">mqm @ localhos~&gt; $ dspmq查看当前队列管理器的执行状态，当队列管理器状态变为通常时才能删除</font></font></p>

<p><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">mqm @ localhos~&gt; $ dltmqm Qm1删除队列管理器，它会级联删除该队列管理器中的队列和监听器等等。</font></font></p>
</blockquote>

<p>&nbsp;</p>

<blockquote>
<p><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">引起：com.ibm.mqservices.MQInternalException：MQJE001：MQException出现：完成代码是2，原因为2035 </font></font><br><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">MQJE036：队列管理器拒绝连接尝试</font></font></p>

<p><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">解决：</font></font></p>

<p><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">display qmgr chlauth </font></font><br><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">&nbsp; &nbsp; &nbsp;1：display qmgr chlauth </font></font><br><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">AMQ8408：Display Queue Manager详细信息。</font></font><br><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">&nbsp; &nbsp;QMNAME（Q）CHLAUTH（已启用）</font></font><br><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">alter qmgr chlauth（已禁用）</font></font><br><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">&nbsp; &nbsp; &nbsp;2：alter qmgr chlauth（已禁用）</font></font><br><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">AMQ8005：WebSphere MQ队列管理器已更改。</font></font></p>

<p><font style="vertical-align:inherit;"><font style="vertical-align:inherit;">此外还要注意客户端的Java代码中的对应于服务端的用户名密码是否正确。</font></font><br>
&nbsp;</p>
</blockquote>

<blockquote>
<p>com.ibm.mq.MQException: MQJE001: 完成代码为 '2'，原因为 '2009'。</p>

<p>这个错误我也是笑了，是因为我打开外往的（科学上网）的原因，因为我的服务是安装在本地的局域网的机器中的，所以报这个错，关了外网就没事了。<br>
&nbsp;</p>
</blockquote>            </div>
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