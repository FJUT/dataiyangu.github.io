title: 工作中，反射得到了field，但是实例化的时候是null
author: Leesin.Dong
tags:
  - 工作_cloudwise
categories:
  - 工作_cloudwise
  - 工作中匮乏的细节
date: 2018-11-07 14:15:00
---
版权声明：本文为作者原创，转载请注明出处，联系qq：32248827 https://blog.csdn.net/dataiyangu/article/details/82143771

>     originalSqlField = ObjectInspector.lookupField(statements.getClass(), "sql");//能得到field

>     Object originalSqlValue = originalSqlField.get(statements);//originalSqlValue是null
>     

解决：如果再出现类似的问题，可以查看本类的tostring方法。

经过查看类的tostring方法：

> **public** String toString()
> 
>   {
> 
>     StringBuffer sb;
> 
>     **if** (**this**.serverPrepareResult != **null**)
> 
>     {
> 
>       StringBuffer sb = **new** StringBuffer("sql : '" + **this**.serverPrepareResult.getSql() + "'");
> 
>       **if** (**this**.parameterCount > 0)
> 
>       {
> 
>         sb.append(", parameters : \[");
> 
>         **for** (**int** i = 0; i < **this**.parameterCount; i++)
> 
>         {
> 
>           ParameterHolder holder = (ParameterHolder)**this**.currentParameterHolder.get(Integer.valueOf(i));
> 
>           **if** (holder == **null**) {
> 
>             sb.append("null");
> 
>           } **else** {
> 
>             sb.append(holder.toString());
> 
>           }
> 
>           **if** (i != **this**.parameterCount - 1) {
> 
>             sb.append(",");
> 
>           }
> 
>         }
> 
>         sb.append("\]");
> 
>       }
> 
>     }
> 
>     **else**
> 
>     {
> 
>       sb = **new** StringBuffer("sql : '" + **this**.sql + "'");
> 
>       sb.append(", parameters : \[");
> 
>       **for** (**int** i = 0; i < **this**.currentParameterHolder.size(); i++)
> 
>       {
> 
>         ParameterHolder holder = (ParameterHolder)**this**.currentParameterHolder.get(Integer.valueOf(i));
> 
>         **if** (holder == **null**) {
> 
>           sb.append("null");
> 
>         } **else** {
> 
>           sb.append(holder.toString());
> 
>         }
> 
>         **if** (i != **this**.currentParameterHolder.size() - 1) {
> 
>           sb.append(",");
> 
>         }
> 
>       }
> 
>       sb.append("\]");
> 
>     }
> 
>     **return** sb.toString();
> 
>   }

该方法经过了一次判断，并不是直接给this.sql赋值的

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()