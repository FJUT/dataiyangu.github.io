title: 一维数组和二维数组的最大连续子数组问题
author: Leesin.Dong
tags:
  - interview
  - 数据结构
categories:
  - 基础亦是进阶
  - 数据结构
date: 2018-11-09 13:12:00
---
    http://blog.csdn.net/liangbopirates/article/details/9411335
    

    求数组的连续子数组之和的最大值

    	输入一个N个元素的整型数组，数组里有正数也有负数。数组中连续的一个或多个整数组成一个子数组，每个子数组都有一个和。求所有子数组的和的最大值。	例如输入的数组为-9  -3  -2  2  -1  2  5  -7  1  5，和最大的子数组为2  -1  2  5。因此输出为该子数组的和8。	可是如果都是负数的话，要返回0？还是返回最小的负数？，这个数时候你要问问面试官（交流很重要）。	OK，想一想该如何做？遍历？遍历是最伟大的方法，几乎多有的题目都可解答，堪称万能解题法。	好吧，咱就先用遍历来解决一下。Sum[i-j]代表i-j元素的和，需要N次遍历，每一次遍历都要求Sum[i-j]。编码开始

**\[cpp\]** [view plain](http://blog.csdn.net/liangbopirates/article/details/9411335#) [copy](http://blog.csdn.net/liangbopirates/article/details/9411335#) 

1.  **int** MaxSum(**int** array\[\],**int** start,**int** end)  
2.  　{    
3.  　   **int** MaxSum=-INFINITY;//最大值初始化为极小值  
4.  　   **int** sum=0;  
5.  　   **for**(**int** i=start;i<=end;i++)  
6.  　   {  
7.  　       sum=0; //记得每次初始化，我们求的是子数组的和  
8.  　       **for**(**int** j=i;j<=end;j++)  
9.  　       {  
10.  　           sum+=array\[j\];  
11.  　           **if**(sum>MaxSum)  
12.  　               MaxSum=sum;  
13.  　       }  
14.  　   }  
15.  　   **return** MaxSum;  
16.  　}  

    	时间复杂度是O(n^2)。还凑合吧，还能继续优化吗？	想一想，之前学过的方法。分治法，分而治之，可以吗？YES如果我们把数组array[1-N]分成两部分array[0-N/2-1]和array[N/2-N-1]，那么我们要求的连续子数组最大和就有了3种可能：	1 原始数组最大和就是array[0-N/2-1]数组的最大和	2 原始数组最大和就是array[N/2-N-1]数组的最大和	3 最大和的子数组是包括array[N/2-1]和array[N/2]的一段子数组。前两种情况可以用递归解决，第三种情况从Mid向两边遍历一次O(n)就可以了。

    递归要递归到只有一个元素的时候直接返回即可。时间复杂度很明显是O(nlgn)。编码实现：

**\[cpp\]** [view plain](http://blog.csdn.net/liangbopirates/article/details/9411335#) [copy](http://blog.csdn.net/liangbopirates/article/details/9411335#) 

1.  **int** MaxSum(**int** array\[\],**int** start,**int** end)  
2.  {  
3.      **int** LeftSum,RightSum,MidLeftSum,MidRightSum;  
4.      **int** max,sum;  
5.      **int** i;  
6.      **if**(end==start)  
7.          **return** array\[start\];  
8.      **int** pivot=start+(end-start)/2;   
9.      LeftSum=MaxSum(array,start,pivot);  
10.      RightSum=MaxSum(array,pivot+1,end);  
11.      max=-INFINITY; <span style="font-family:Arial,Helvetica,sans-serif">//最大值初始化为极小值</span>  
12.      sum=0;  
13.      **for**(i=(end-start+1)/2-1;i>=start;i--)  //求以array\[N/2-1\]结尾的一段最大和  
14.      {  
15.          sum+=array\[i\];  
16.          **if**(sum>max)  
17.              max=sum;  
18.      }  
19.      MidLeftSum=max;  
20.      max=-INFINITY;  
21.      sum=0;  
22.      **for**(i=(end-start+1)/2;i<=end;i++)  //求以array\[N/2\]开始的一段最大和  
23.      {  
24.          sum+=array\[i\];  
25.          **if**(sum>max)  
26.              max=sum;  
27.      }  
28.      MidRightSum=max;  
29.      **return** Max(LeftSum,MidLeftSum+MidRightSum,RightSum);  
30.  }  

    	时间复杂度降到了O(nlgn)，还不错。可是我们不能仅仅满足于这样的复杂度,O(n)才是我们追求的目标。可是这个题目可以达到吗？想一想，这个题目有什么性质？	最优子结构？YES。原数组的最优解包含子数组的最优解。数组array[0-N-1]的最优解肯定包含子数组array[1-N-1]的最优解。数组array[0-N-1]的最优解与谁有关系？要么是array[0]，要么是子数组array[1-N-1]的最优解，要么是两者之和。而且在求最大和的时候会出现很多的重叠子问题。比如求array[0-N-1]和array[1-N-1]的最优解肯定都要求array[2-N-1]的最优解。而且满足无后效性，对于当前求得array[0-N-1]的最优解只和array[1-N-1]的最优解有关系，和array[1-N-1]的值没有关系，唯一影响的就是array[0]。这样我们就知道可以用DP来做。

    	假设用数组All[i]表示array[i-N-1]的最大和，用数组Start[i]表示包含arry[i]的array[i-N-1]的最大和。那我们要求array[i-N-1]的最大值就是All[i]，Start[i],array[i]三者中的最大值。而Start[i]如何求呢？要么等于array[i]，要么等于array[i]+Start[i+1]。而All[i]要么和array[i]有关系要么没关系，所以要么等于Start[i],，要么等于All[i+1]。这样状态转移方程就来了：	 Start[i]=MaxNum(array[i],array[i]+Start[i+1]);	All[i]=MaxNum(Start[i],All[i+1]);我们要求的最大值就是All[0]。编码开始

**\[cpp\]** [view plain](http://blog.csdn.net/liangbopirates/article/details/9411335#) [copy](http://blog.csdn.net/liangbopirates/article/details/9411335#) 

1.  **int** MaxSum(**int** array\[\],**int** start,**int** end)  
2.  　{  
3.  　   **int** arraylength=end-start+1;  
4.  　   **int** *Start=**new** **int**\[arraylength\];  
5.  　   **int** *All=**new** **int**\[arraylength\];  
6.  　   Start\[arraylength-1\]=array\[end\]; //注意arraylength-1=end不是什么时候都成立的//  
7.  　   All\[arraylength-1\]=array\[end\];  
8.  　   **for**(**int** i=end-1;i>=start;i--)  
9.  　   {  
10.  　       Start\[i\]=MaxNum(array\[i\],array\[i\]+Start\[i+1\]);  
11.  　       All\[i\]=MaxNum(Start\[i\],All\[i+1\]);  

13.  　   }  
14.  　   **return** All\[0\];  
15.  　}  

    	时间复杂度当然是O(n)。因为我们有O(n)个子问题（array[0-i]），对于每一子问题我们有3种选择。	这样就算法就比较nice了。可是空间复杂度很大啊，辅助空间就要O(n)。可以降低吗？仔细分析下刚才所写的代码，你能发现什么问题吗？	没必要定义辅助数组？YES。因为我们最后要求的只是数组中的一个值。我们只要求这三个array[i],rray[i]+Start[i+1],All[i+1]的最大值即可，很多值就是一个过渡，一个变量足以解决问题。

    代码修改

**\[cpp\]** [view plain](http://blog.csdn.net/liangbopirates/article/details/9411335#) [copy](http://blog.csdn.net/liangbopirates/article/details/9411335#) 

1.  **int** MaxSum(**int** array\[\],**int** start,**int** end)  
2.  　{  
3.  　   **int** Start,All;  
4.  　   Start=array\[end\];   
5.  　   All=array\[end\];  
6.  　   **for**(**int** i=end-1;i>=start;i--)  
7.  　   {  
8.  　       Start=MaxNum(array\[i\],array\[i\]+Start);  
9.  　       All=MaxNum(Start,All);  
10.  　   }  
11.  　   **return** All;  
12.  　}  

    辅助空间是O(1)。很不错

    可是我们可以换个写法，如果Start[i]<0那就没必要要他了，直接舍弃。

**\[cpp\]** [view plain](http://blog.csdn.net/liangbopirates/article/details/9411335#) [copy](http://blog.csdn.net/liangbopirates/article/details/9411335#) 

1.  **int** MaxSum(**int** array\[\],**int** start,**int** end)  
2.  {  
3.      **int** Start,All;  
4.      Start=array\[end\];   
5.      All=array\[end\];  
6.      **for**(**int** i=end-1;i>=start;i--)  
7.      {  
8.          **if**(Start>=0)  
9.              Start+=array\[i\];  
10.          **else**  
11.              Start=array\[i\];  
12.          **if**(Start>All)  
13.              All=Start;  
14.      }  
15.      **return** All;  
16.  }  

    测试代码

**\[cpp\]** [view plain](http://blog.csdn.net/liangbopirates/article/details/9411335#) [copy](http://blog.csdn.net/liangbopirates/article/details/9411335#) 

1.  #include <iostream>     
2.  **using** **namespace** std;      
3.  **const** **int** N=10;  
4.  **const** **int** INFINITY=1000;//定义一个最大值  

6.  //求数组的连续子数组之和的最大值  
7.  **int** MaxSum(**int** array\[\],**int** start,**int** end);  
8.  **int** MaxNum(**int** x,**int** y);  
9.  **int** Max(**int** x,**int** y,**int** z);  
10.  **int** main()  
11.  {     
12.      **int** i;  
13.      **int** array\[N\]={-9,-3,-2,-2,-1,-2,-5,-7,-1,-5};  
14.      **for**(i=0;i<N;i++)  
15.          cout<<array\[i\]<<" ";  
16.      cout<<endl;  
17.      cout<<"连续子数组之和的最大值MaxSum="<<MaxSum(array,0,N-1)<<endl;  
18.      **return** 0;  
19.  }  

    OK，这样才算是完美解决。	可是，这个时候我要问你，如果一维数组首尾相连怎么办？

    	这个时候要分情况了，如果最优解没有跨过array[N-1]到array[0],那就是原问题的解。如果跨过，那么我们要遍历一次就可以了。Sum=array[i]+....+array[N-1]+array[0]+...array[j]，是吗？这个时候我们还要判断i和j的大小。如果i<=j那我们要求的就是 Sum=array[0]+....+array[N-1],否则Sum=array[0]+...array[j]+array[i]+....+array[N-1]。这个代码应该很好写，因为有了刚才的铺垫。	这个时候我再问你，如果我要返回下标，你要怎么做？无非是传入两个坐标值，每次求最大和的时候记录下来即可。没问题的。代码就不写了。

    OK，一维数组咱算是说完了，那咱来看看二维的怎么搞？二维数组连续的二维子数组的和怎么求，肯定是一个矩形，我们要遍历吗？？？遍历的话估计复杂度扛不住吧。。如何遍历也是一个问题。

![](https://img-blog.csdn.net/20130722170955390?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3VzdGxpYW5nYm8=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

    这个时候我们可以把每一行看成是一个元素，这样就变成了一个纵向的一维数组了。

![](https://img-blog.csdn.net/20130722171123781?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3VzdGxpYW5nYm8=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

    这样对一维数组的遍历是和刚才一样的。而对于每一行我们遍历也是和一维是一样的。编码试一试

**\[cpp\]** [view plain](http://blog.csdn.net/liangbopirates/article/details/9411335#) [copy](http://blog.csdn.net/liangbopirates/article/details/9411335#) 

1.  //求二维数组的连续子数组之和的最大值  
2.  　**int** MaxSum(**int** (*array)\[N\])  
3.  　{  
4.  　   **int** i,j;  
5.  　   **int** MaxSum=-INFINITY;//初始化  
6.  　   **int** imin,imax,jmin,jmax;  
7.  　   **for**(imin=1;imin<=N;imin++)  
8.  　{  
9.  　       **for**(imax=imin;imax<=N;imax++)//当成是遍历纵向的一维  
10.  　{  
11.  　           **for**(jmin=1;jmin<=M;jmin++)  
12.  　{  
13.  　               **for**(jmax=jmin;jmax<=M;jmax++)//当成是遍历横向的一维  
14.  　                       MaxSum=MaxNum(MaxSum,PartSum(imin,jmin,imax,jmax));  
15.  　           }  
16.  　}  
17.  　}            
18.  　   **return** MaxSum;  
19.  　}  

    	时间复杂度(N^2*M^2*O(PartSum))，如何求部分和PartSum呢？如果这个还是要遍历求的话，复杂度真是不敢看了。。	求一维的时候我们求Sum[i-j]很好求，可是求二维的时候就变成了四个坐标了，不敢遍历求和了。我们可以先求部分和，把他当作已知的，这个时候遍历求的时候复杂度就是O(1)。	如何求？我们定义一个部分和数组PartSum，其中PartSum[i][[j]代表了下标(0，0)，(0，j)，(i，0)，(i，j)包围的区间的和。

![](https://img-blog.csdn.net/20130722171320921?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3VzdGxpYW5nYm8=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

    而此时下标(imin，jmin)，(imin，jmax)，(imax，jmin)，(imax，jmax)包围的区间和就等于

    	PartSum[imax][[jmax]-PartSum[imin-1][[jmax]-PartSum[imax][[jmin-1]+PartSum[imin-1][[jmin-1]。

![](https://img-blog.csdn.net/20130722171448515?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3VzdGxpYW5nYm8=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

    这就是我们要求的PartSum(imin,jmin,imax,jmax)，接下来就是求PartSum数组了。如何求呢？

    对于每一个PartSum[i][[j]都不是孤立的，都是和其他的有关系的。我们要找出这个关系式

![](https://img-blog.csdn.net/20130722171535921?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3VzdGxpYW5nYm8=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

    PartSum[i][[j]=PartSum[i-1][[j]+PartSum[i][[j-1]-PartSum[i-1][[j-1]+array[i][j]。	这样求可以求出全部的PartSum[i][[j]，可是我们不要忽略了一点，PartSum[0][[0]=？对于边界值我们要处理好，而且下标要从1开始。对于PartSum[i][[0]和PartSum[0][[j]都要初始化0，而且array[i][j]的下标也是要-1，因为数组的下标是从0开始的。这是一个办法，不过我们也可以单独求PartSum[i][[0]和PartSum[0][[j]的值，连续相加即可，然后再求其他的也是可以的，空间复杂度也是一样。可是在4重遍历的时候对于PartSum[i][[0]和PartSum[0][[j]我们还是要另外处理，这就比较麻烦了。我们还是用预处理的方法来编码吧。。

**\[cpp\]** [view plain](http://blog.csdn.net/liangbopirates/article/details/9411335#) [copy](http://blog.csdn.net/liangbopirates/article/details/9411335#) 

1.  **int** PartSum\[N+1\]\[M+1\];  
2.      **int** i,j;  
3.      **for**(i=0;i<=N;i++)  
4.          PartSum\[i\]\[0\]=0;  
5.      **for**(j=0;j<=M;j++)  
6.          PartSum\[0\]\[j\]=0;  
7.      **for**(i=1;i<=N;i++)  
8.          **for**(j=1;j<=M;j++)  
9.          PartSum\[i\]\[j\]=PartSum\[i-1\]\[j\]+PartSum\[i\]\[j-1\]-PartSum\[i-1\]\[j-1\]+array\[i-1\]\[j-1\];  

    	OK，求得部分和之后我们就开始完善我们的编码了。记住一点，下标(imin,jmin)，(imin,jmax),(imax,jmin),(imax,jmax)包围的区间和等于

    		PartSum[imax][[jmax]-PartSum[imin-1][[jmax]-PartSum[imax][[jmin-1]+PartSum[imin-1][[jmin-1]。

编码开始：

**\[cpp\]** [view plain](http://blog.csdn.net/liangbopirates/article/details/9411335#) [copy](http://blog.csdn.net/liangbopirates/article/details/9411335#) 

1.  //求二维数组的连续子数组之和的最大值  
2.  **int** MaxSum(**int** (*array)\[N\])  
3.  {  
4.      **int** PartSum\[N+1\]\[M+1\];  
5.      **int** i,j;  
6.      **for**(i=0;i<=N;i++)  
7.          PartSum\[i\]\[0\]=0;  
8.      **for**(j=0;j<=M;j++)  
9.          PartSum\[0\]\[j\]=0;  
10.      **for**(i=1;i<=N;i++)  
11.          **for**(j=1;j<=M;j++)  
12.              PartSum\[i\]\[j\]=PartSum\[i-1\]\[j\]+PartSum\[i\]\[j-1\]-PartSum\[i-1\]\[j-1\]+array\[i-1\]\[j-1\];  
13.      **int** MaxSum=-INFINITY;//初始化  
14.      **int** imin,imax,jmin,jmax;  
15.      **for**(imin=1;imin<=N;imin++)  
16.          **for**(imax=imin;imax<=N;imax++)  
17.              **for**(jmin=1;jmin<=M;jmin++)  
18.                  **for**(jmax=jmin;jmax<=M;jmax++)  
19.                          MaxSum=MaxNum(MaxSum,PartSum\[imax\]\[jmax\]-PartSum\[imin-1\]\[jmax\]-PartSum\[imax\]\[jmin-1\]+PartSum\[imin-1\]\[jmin-1\]);  

21.      **return** MaxSum;  
22.  }  

    	时间复杂度是O(N^2*M^2)，有点坑啊。想一想一维的时候我们用DP来做，这个也可以吗？可以的。我们把每一列看成一个元素。这样对于遍历的行区间，我们就可以当成一维来做。

![](https://img-blog.csdn.net/20130722171750125?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3VzdGxpYW5nYm8=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

    	对于imin和imax之间的每一列，就相当于一维的一个元素。	假设这个一维数组是BC，则BC[j]=array[imin][j]+....+array[imax][j]，问题就变成了求BC数组的连续子数组之和的最大值了。而根据刚才求的部分和，我们可以知道对于imin行和imax行之间的区间第j列的值是	BC(PartSum,imin,imax,j)=PartSum[imax][j]-PartSum[imin-1][j]-PartSum[imax][j-1]+PartSum[imin-1][j-1].（此时BC是一个函数）OK，编码开始

**\[cpp\]** [view plain](http://blog.csdn.net/liangbopirates/article/details/9411335#) [copy](http://blog.csdn.net/liangbopirates/article/details/9411335#) 

1.  //求二维数组的连续子数组之和的最大值  
2.  **int** MaxSum(**int** (*array)\[N\])  
3.  {  
4.      **int** PartSum\[N+1\]\[M+1\];  
5.      **int** i,j;  
6.      **for**(i=0;i<=N;i++)  
7.          PartSum\[i\]\[0\]=0;  
8.      **for**(j=0;j<=M;j++)  
9.          PartSum\[0\]\[j\]=0;  
10.      **for**(i=1;i<=N;i++)  
11.          **for**(j=1;j<=M;j++)  
12.              PartSum\[i\]\[j\]=PartSum\[i-1\]\[j\]+PartSum\[i\]\[j-1\]-PartSum\[i-1\]\[j-1\]+array\[i-1\]\[j-1\];  
13.      **int** MaxSum=-INFINITY;  
14.      **int** Start,All;  
15.      **int** imin,imax;  
16.      **for**(imin=1;imin<=N;imin++)  
17.      {  
18.          **for**(imax=imin;imax<=N;imax++)  
19.          {  
20.              Start=BC(PartSum,imin,imax,M);  
21.              All=BC(PartSum,imin,imax,M);  
22.              **for**(j=M-1;j>=1;j--)  
23.              {  
24.                  **if**(Start>0)  
25.                      Start+=BC(PartSum,imin,imax,j);  
26.                  **else**  
27.                      Start=BC(PartSum,imin,imax,j);  
28.                  **if**(Start>All)  
29.                      All=Start;  
30.              }  
31.              **if**(All>MaxSum)  
32.                  MaxSum=All;  
33.          }  
34.      }  
35.      **return** MaxSum;  
36.  }  

38.  **int** BC(**int** (*PartSum)\[N+1\],**int** imin,**int** imax,**int** j) //imin--imax第j列的和  
39.  {  
40.      **int** value;  
41.      value=PartSum\[imax\]\[j\]-PartSum\[imin-1\]\[j\]-PartSum\[imax\]\[j-1\]+PartSum\[imin-1\]\[j-1\];  
42.      **return** value;  
43.  }  

    	OK,very nice.时间辅助度降到O(N*M*min(M,N)),差不多O(N^3)吧。
    

    	这个时候我要问你，如果也把二维的数组首尾相连，你要怎么求最大值。方法和一维的类似，略有不同吧。	如果对于三维数组求一个长方体的最大和，你怎么求？

    	 如果上下也相连怎么办？？？
    

    	     四维呢？？

    	这次你可要好好思考了。先说到这吧。

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()