title: 主题中遇到的问题以及各种错误汇总，记录下来。
author: Leesin.Dong
tags:
  - hexo
categories:
  - 自建博客
  - hexo
date: 2018-11-07 11:40:00
---
版权声明：本文为作者原创，转载请注明出处，联系qq：32248827 https://blog.csdn.net/dataiyangu/article/details/83759220

发布文章遇到：

> Unhandled rejection Template render error: (unknown path) \[Line 265, Column 814\]  
>   unexpected token: .  
>     at Object.\_prettifyError (/Users/leesin/Desktop/blog/node\_modules/nunjucks/src/lib.js:36:11)  
>     at Template.render (/Users/leesin/Desktop/blog/node_modules/nunjucks/src/environment.js:524:21)  
>     at Environment.renderString (/Users/leesin/Desktop/blog/node_modules/nunjucks/src/environment.js:362:17)  
>     at Promise (/Users/leesin/Desktop/blog/node_modules/hexo/lib/extend/tag.js:66:9)  
>     at Promise.\_execute (/Users/leesin/Desktop/blog/node\_modules/bluebird/js/release/debuggability.js:313:9)  
>     at Promise.\_resolveFromExecutor (/Users/leesin/Desktop/blog/node\_modules/bluebird/js/release/promise.js:483:18)  
>     at new Promise (/Users/leesin/Desktop/blog/node_modules/bluebird/js/release/promise.js:79:10)  
>     at Tag.render (/Users/leesin/Desktop/blog/node_modules/hexo/lib/extend/tag.js:64:10)  
>     at Object.tagFilter \[as onRenderEnd\] (/Users/leesin/Desktop/blog/node_modules/hexo/lib/hexo/post.js:230:16)  
>     at Promise.then.then.result (/Users/leesin/Desktop/blog/node_modules/hexo/lib/hexo/render.js:65:19)  
>     at tryCatcher (/Users/leesin/Desktop/blog/node_modules/bluebird/js/release/util.js:16:23)  
>     at Promise.\_settlePromiseFromHandler (/Users/leesin/Desktop/blog/node\_modules/bluebird/js/release/promise.js:512:31)  
>     at Promise.\_settlePromise (/Users/leesin/Desktop/blog/node\_modules/bluebird/js/release/promise.js:569:18)  
>     at Promise.\_settlePromise0 (/Users/leesin/Desktop/blog/node\_modules/bluebird/js/release/promise.js:614:10)  
>     at Promise.\_settlePromises (/Users/leesin/Desktop/blog/node\_modules/bluebird/js/release/promise.js:694:18)  
>     at \_drainQueueStep (/Users/leesin/Desktop/blog/node\_modules/bluebird/js/release/async.js:138:12)  
>     at \_drainQueue (/Users/leesin/Desktop/blog/node\_modules/bluebird/js/release/async.js:131:9)  
>     at Async.\_drainQueues (/Users/leesin/Desktop/blog/node\_modules/bluebird/js/release/async.js:147:5)  
>     at Immediate.Async.drainQueues \[as \_onImmediate\] (/Users/leesin/Desktop/blog/node\_modules/bluebird/js/release/async.js:17:14)  
>     at runCallback (timers.js:810:20)  
>     at tryOnImmediate (timers.js:768:5)  
>     at processImmediate \[as _immediateCallback\] (timers.js:745:5)  
>  

一般是markdown合适不对，找到对应的文件（上面不显示，可以通过二分法进行删除排除法，找到错误的），删除，google说是/{/{/}/}不能在{}中包{}

发布文章的时候出现错误：

> Template render error: (unknown path) \[Line 7, Column 23\]  
> Error: Unable to call `the return value of (posts["first"])["updated"]["toISOString"]`, which is undefined or falsey  
> at Object.exports.prettifyError (D:\\itxuye\\node_modules\\nunjucks\\src\\lib.js:34:15)  
> at D:\\itxuye\\node_modules\\nunjucks\\src\\environment.js:485:31  
> at root \[as rootRenderFunc\](eval at %28D:itxuyenode_modulesnunjuckssrcenvironment.js:564:24%29, :161:3)  
> at Obj.extend.render (D:\\itxuye\\node_modules\\nunjucks\\src\\environment.js:478:15)  
> at Hexo.module.exports (D:\\itxuye\\node_modules\\hexo-generator-feed\\lib\\generator.js:28:22)  
> at Hexo.tryCatcher (D:\\itxuye\\node_modules\\bluebird\\js\\release\\util.js:16:23)  
> at Hexo. (D:\\itxuye\\node_modules\\bluebird\\js\\release\\method.js:15:34)  
> at D:\\itxuye\\node_modules\\hexo\\lib\\hexo\\index.js:337:24  
> at tryCatcher (D:\\itxuye\\node_modules\\bluebird\\js\\release\\util.js:16:23)  
> at MappingPromiseArray.\_promiseFulfilled (D:\\itxuye\\node\_modules\\bluebird\\js\\release\\map.js:57:38)  
> at MappingPromiseArray.PromiseArray.\_iterate (D:\\itxuye\\node\_modules\\bluebird\\js\\release\\promise_array.js:113:31)

_posts文件中不能一篇文章都没有，可能是我上面的二分法给全部删除文章了出现问题。

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()