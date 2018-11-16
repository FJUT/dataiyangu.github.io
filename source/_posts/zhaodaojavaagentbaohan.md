title: javaagent找到包含可以setheader的方法汇总，解决不能端到端的问题，实现大部分情况下的端到端，上次的mq为什么不行
author: Leesin.Dong
tags:
  - 工作_cloudwise
categories:
  - 工作_cloudwise
  - 工作中匮乏的细节
date: 2018-11-05 13:24:00
---
<article>
		<div id="article_content" class="article_content clearfix csdn-tracking-statistics" data-pid="blog" data-mod="popu_307" data-dsm="post">
								<div class="article-copyright">
					版权声明：本文为作者原创，转载请注明出处，联系qq：32248827					https://blog.csdn.net/dataiyangu/article/details/83661126				</div>
								            <link rel="stylesheet" href="https://csdnimg.cn/release/phoenix/template/css/ck_htmledit_views-f76675cdea.css">
						<div class="htmledit_views">

温馨提示：本人的工作问题，请绕行～～～

通过代码一行一行往下找看能不能得到我想要的方法，

注意点：

1.  A a = new A（），&nbsp;从后面点进去，因为前面可能是接口，这一般是**<span style="color:#f33b45;">不能得到</span>**的，因为刚new出类来。
2.  一般往里面set url 之类参数的肯定**<span style="color:#f33b45;">不能得到</span>**，因为还没有set进去。
3.  一般是在set&nbsp; get&nbsp; &nbsp;send put 之类的字眼，是**<span style="color:#f33b45;">能够得到</span>**的。

方法：

1.  正序，一层一层往里面点
2.  倒序，通过报错找到最里面的，通过打断点。（习惯用的）
3.  找到包含set&nbsp; get&nbsp; &nbsp;send&nbsp; 之类的地方，通过idea智能提示拥有的可以进行setheader的方法。（简单的）

**<span style="color:#f33b45;">问题：如果是header final的话不能往里面set怎么办？？？？？？？</span>**

**<span style="color:#f33b45;">解决：如果是fianl的话只能被修饰一次，但是它肯定是被赋值，也就是在外面的层会有指针指向它，也就是在它变成fianl之前对它进行抓取，这里注意，可能在外面的方法被赋值的地方是被包装起来的，所以可以从最里面逐层向外，通篇看全类。</span>**

**<span style="color:#f33b45;">ibmmq端到端的问题：</span>**

queue.set （message）&nbsp; &nbsp; &nbsp;

1.  我开始放到了queue里，set和get的队列虽然是一个队列但不是一个对象只是名字的string是一样的，仔细观察代码会发现。
2.  放在message中会将这个对象传过去，是一个对象。
3.  而且将request_id放在queue中，requestid是一样的了就，需求是每个message的requestid都是不一样的

**<span style="color:#f33b45;">不论是否实现端到端注意：</span>**

1.  server端必须map.put&nbsp; &nbsp;rec.put （所以不能把这两行代码放在某个if中应该放在最后。）&nbsp; &nbsp;
2.  client端不需要

&nbsp;

&nbsp;
            </div>
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