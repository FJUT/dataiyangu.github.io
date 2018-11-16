title: 二分法浅析
author: Leesin.Dong
tags:
  - interview
  - 数据结构
  - 算法
categories:
  - 基础亦是进阶
  - 算法
date: 2018-11-08 23:51:00
---
**二分查找算法：**是一种在有序数组中查找某一特定元素的搜索算法。

**二分查找思想：**搜素过程从数组的中间元素开始，如果中间元素正好是要查找的元素，则搜索过程结束；如果某一特定元素大于或者小于中间元素，则在数组大于或小于中间元素的那一半中查找，而且跟开始一样从中间元素开始比较。如果在某一步骤数组 为空，则代表找不到。这种搜索算法每一次比较都使搜索范围缩小一半。折半搜索每次把搜索区域减少一半，时间复杂度为Ο(logn)。

**二分查找算法要求：1>**必须采用顺序存储结构;2>必须按关键字大小有序排列。

**其流程图如下**：（来自于百度百科）

![](https://img-blog.csdn.net/20160722105342748)

**算法实现**：

**\[cpp\]** [view plain](https://blog.csdn.net/what_lei/article/details/51992174#) [copy](https://blog.csdn.net/what_lei/article/details/51992174#)

1.  #include <iostream>  

3.  **using** **namespace** std;  
4.  //二分查找: 递归实现  
5.  **int** binarySearch(**int** a\[\],**int** low,**int** high,**int** key)  
6.  {  
7.      **int** mid=low+(high-low)/2;  

9.      **if**(low>high)  
10.          **return** -1;  
11.      **else**{  
12.          **if**(a\[mid\]==key)  
13.              **return** mid;  
14.          **else** **if**(a\[mid\]>key)  
15.              **return** binarySearch(a,low,mid-1,key);  
16.          **else**  
17.              **return** binarySearch(a,mid+1,high,key);  

19.      }  

21.  }  
22.  //二分查找：非递归方法实现  
23.  **int** binarySearch(**int** a\[\],**int** n,**int** key)  
24.  {  
25.      **int** low=0,high=n-1;  
26.      **int** mid;  
27.      **while**(low<=high)  
28.      {  
29.          mid=(low+high)/2;  
30.          **if**(key==a\[mid\])  
31.              **return** mid;  
32.          **else** **if**(key<a\[mid\])  
33.              high=mid-1;  
34.          **else**  
35.              low=mid+1;  
36.      }  
37.      **return** -1;  
38.  }  
39.  **int** main()  
40.  {  
41.      **int** a\[8\]={1,3,4,5,6,7,9,10};  
42.      **int** index=0;  
43.  //  index=binarySerach(a,0,8,3);  
44.      index=binarySearch(a,8,3);  
45.      cout<<"下表索引："<<index<<endl<<"输出要查找的值："<<a\[index\]<<endl;  
46.      **return** 0;  
47.  }  

**输出结果**

![](https://img-blog.csdn.net/20160722105114765)  
 

**二分查找应用**：

[二分查找法找寻边界值](http://www.cnblogs.com/ider/archive/2012/04/01/binary_search.html)

[二分查找法统计元素出现的个数](http://www.cnblogs.com/shihaochangeworld/p/5502190.html)

[leetcode：数组之Search in Rotated Sorted Array](http://blog.csdn.net/what_lei/article/details/51993479)

**二分查找的优点：二分查找法的O(log n)让它成为十分高效的算法，是比较次数少，查找速度快，平均性能好**

**二分查找法的缺陷：**

**数组必须有序**，我们很难保证我们的数组都是有序的。当然可以在构建数组的时候进行排序，可是又落到了第二个瓶颈上：它必须是[**数组**](http://en.wikipedia.org/wiki/Array_data_structure)。

数组读取效率是O(1)，可是它的插入和删

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()