title: swicth和if else的效率问题
author: Leesin.Dong
tags:
  - interview
  - java基础
categories:
  - java
  - java基础
date: 2018-11-08 23:25:00
---
首先声明，本人菜鸟一枚，前段时间在面试的时候和面试官聊得不错，学到了一点点东西。

  首先我们粘贴一波代码：（很高端的样子，么么哒）

/* $begin switch-c */ 
int switch_eg(int x) 
{ 
    int result = x; 

    switch (x) { 

    case 100: 
    result *= 13; 
    break; 

    case 102: 
    result += 10; 
    /* Fall through */ 

    case 103: 
    result += 11; 
    break; 

    case 104: 
    case 106: 
    result *= result; 
    break; 

    default: 
    result = 0;       
    } 

    return result; 
} 
/* $end switch-c */ 

用GCC汇编出来的代码如下： 
    .file    "switch.c" 
    .version    "01.01" 
gcc2_compiled.: 
.text 
    .align 4 
.globl switch_eg 
    .type     switch_eg,@function 
switch_eg: 
    pushl %ebp 
    movl %esp,%ebp 
    movl 8(%ebp),%edx 
    leal -100(%edx),%eax 
    cmpl ,%eax 
    ja .L9 
    jmp *.L10(,%eax,4) 
    .p2align 4,,7 
.section    .rodata 
    .align 4 
    .align 4 
.L10: 
    .long .L4 
    .long .L9 
    .long .L5 
    .long .L6 
    .long .L8 
    .long .L9 
    .long .L8 
.text 
    .p2align 4,,7 
.L4: 
    leal (%edx,%edx,2),%eax 
    leal (%edx,%eax,4),%edx 
    jmp .L3 
    .p2align 4,,7 
.L5: 
    addl ,%edx 
.L6: 
    addl ,%edx 
    jmp .L3 
    .p2align 4,,7 
.L8: 
    imull %edx,%edx 
    jmp .L3 
    .p2align 4,,7 
.L9: 
    xorl %edx,%edx 
.L3: 
    movl %edx,%eax 
    movl %ebp,%esp 
    popl %ebp 
    ret 
.Lfe1: 
    .size     switch_eg,.Lfe1-switch_eg 

    .ident    "GCC: (GNU) 2.95.3 20010315 (release)" 

在上面的汇编代码中我们可以很清楚的看到switch部分被分配了一个连续的查找表，switch case中不连续的部分也被添加上了相应的条目，switch表的大小不是根据case语句的多少，而是case的最大值的最小值之间的间距。在选择相应 的分支时，会先有一个cmp子句，如果大于查找表的最大值，则跳转到default子句。而其他所有的case语句的耗时都回事O(1)。 
 

相比于if-else结构，switch的效率绝对是要高很多的，但是switch使用查找表的方式决定了case的条件必须是一个连续的常量。而if-else则可以灵活的多。 

switch和if-else相比，由于使用了Binary Tree算法，绝大部分情况下switch会快一点，除非是if-else的第一个条件就为true.

 

原理：switch...case会生成一个跳转表来指示实际的case分支的地址，而这个跳转表的索引号与switch变量的值是相等的。从而，switch...case不用像if...else那样遍历条件分支直到命中条件，而只需访问对应索引号的表项从而到达定位分支的目的。

---------------------------------------------------------------------------------------- 

呀呀呀，上面都是我粘贴的啦，下面是本人根据看牛人博客和面试官的指点，自己总结的：首先正如上面说的switch用到的是一个跳转表的结构，和if是不一样的，然后呢至于跳转表具体怎么查找地址，并没有看太懂，这里引用面试官的话，switch的话是将那五种数据类型（byte，int，short，char，枚举以及string）转化成可以排序的结构，然后利用二分法（这个就不用介绍了，xx出来的的都知道）来进行查找，所以肯定比if else快很多了。


--------------------- 
作者：Leesin Dong 
来源：CSDN 
原文：https://blog.csdn.net/dataiyangu/article/details/80044327 
版权声明：本文为博主原创文章，转载请附上博文链接！