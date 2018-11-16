title: 数组算法总结
author: Leesin.Dong
tags:
  - interview
  - 算法
categories:
  - 基础亦是进阶
  - 算法
date: 2018-11-09 13:28:00
---
<article>
		<div id="article_content" class="article_content clearfix csdn-tracking-statistics" data-pid="blog" data-mod="popu_307" data-dsm="post">
								            <link rel="stylesheet" href="https://csdnimg.cn/release/phoenix/template/css/ck_htmledit_views-f76675cdea.css">
						<div class="htmledit_views">
                <p><strong>问题：</strong></p>

<p>已知一个递增排序的数组和一个数字s，在数组中找出两个数，使它们的和正好等于s，找出任意一对便可。</p>
**问题：**

已知一个递增排序的数组和一个数字s，在数组中找出两个数，使它们的和正好等于s，找出任意一对便可。

**思路：**

普通解法：

第一个数从数组的开头开始，然后利用二分法找第二个数，时间复杂度为nlogn，因为第一个数是从头到尾顺序选择的。

时间复杂度为n的解法：

第一个数从数组的开头开始，第二个数从数组的结尾开始，如果两者的和大于s，则第二个数往前取下一个数，如果两者的和小于s，则第一个数往后取下一个数，重复直至两者的和等于s。

* * *

**找出和为s的连续正数序列**

**问题：**

有一个连续正数序列，找出所有的和为s的连续正数序列。

如，有正数序列：1、2、3、4、5、6、7、8、9、10，找出所有的和为15的序列，结果为：

1~5,、4~6和7~8

**思路：**

设两个变量small、big分别为序列的第一个值和第二个值，这里即small为1，big为2，则它们之间的和为3，如果small到big之间的和小于s，则big往后移一个数，如果大于s，则small往后移一个数，如果等于s，则先打印该序列（只要打印small和big即可），然后分别往后移一个数，进一步找下一个序列。求和的时候，不需要每次都从small到big累加，big往后移只要加上(big+1)即可，small往后移只要减去small即可。

**证明思路的正确性：**

假设一个满足和为s的序列的头为m，尾为n，满足以下规则：

small<=m、big<=n

我们知道，刚开始的时候肯定满足上面条件（理由就不多说了）。

只要我们能证明通过以上思路能找到该序列，并且下一序列也满足以上规则，便可证明通过该思路能找到所有的和为s的序列（归纳法）。

画图很容易看出，small向后移的时候最多也就只能移到位置m，因为big<=n，big向后移的时候最多只能移到位置n，最终两者会先后到达位置m和位置n，这时找到一个连续序列，然后small和big分别往后移一位，而下一个和为s的序列的开头一定比m大，结尾一定比n大，这时新的m、n和新的small、big满足以上规则。

* * *

把数组排列成最小的数

问题：

输入一个正整数数组，把数组里所有数字拼接起来排成一个数，求出所有拼接结果中最小的一个，例如，数组{3,32,321}，最小的拼接结果为321323

思路：

两个数字m和n能拼接成数字mn和nm，如果mn<nm，则我们认为m应该排在n的前面（m小于n），反之，如果nm<mn，则认为n小于m，注意，这里的n小于m不是数值上的大小，例如，两个数3与32，可以组成332和323，由于323<332，所以，我们认为32小于3。

根据上面定义的比较规则，我们可以先对数组进行排序，然后把排序后的数组拼接成一个整数，该整数便是最小的拼接结果。这里有一个拼接技巧，两个整数拼接成一个整数，可以先把整数转换成字符串然后进行拼接。比较拼接结果无需转换回整数，直接比较字符串大小便可。

这里有几个表达式需要证明：

1、已知a<b<c，证明a<c（传递性）

也就是说已知ab<ba、bc<cb，证明ac<ca

暂时不会证明

2、已知a<b<c，且a<c，证明abc是最小的拼接结果：

证明：

假如acb小于abc，那么cb<bc，这与b<c矛盾

假如cab小于abc，由于ca>ac，所以cab>acb，又有cb>bc，所以acb>abc，故cab>abc，矛盾

。。。。

* * *

“基数排序”之数组中缺失的数字

问题：

给定一个无序的整数数组，怎么找到第一个大于0，并且不在此数组的整数。比如\[1,2,0\]返回3，\[3,4,-1,1\]返回2，\[1, 5, 3, 4, 2\]返回6，\[100,3, 2, 1, 6,8, 5\]返回4。要求使用O(1)空间和O(n)时间。

以{1, 3, 6, -100, 2}为例来简介这种解法，注意，空间为O(1)，不能用临时数组：

从第一个数字开始，由于a\[0\]=1，所以不用处理了（下标0+1=1说明位置正确了）。

第二个数字为3，因此放到第3个位置（下标为2），交换a\[1\]和a\[2\]，得到数组为{1, 6, 3, -100, 2}。由于6无法放入数组（因为数组大小为5，下标最大是4，放不下6），所以直接跳过。

第三个数字是3，不用处理（下标2+1=3说明位置正确了）。

第四个数字是-100，也无法放入数组，直接跳过。

第五个数字是2，因此放到第2个位置（下标为1），交换a\[4\]和a\[1\]，得到数组为{1, 2, 3, -100, 6}，由于6无法放入数组，所以直接跳过。  
此时“基数排序”就完成了，然后再从遍历数组，如果对于某个位置上没该数，就说明数组缺失了该数字。如{1, 2, 3, -100, 6}缺失的就为4。

通过第i个位置上存放大小为(i+1)的数，“基数排序”就顺利的搞定此题了。

可不可以用这种方式排序呢，如果数字连的很近，比如1,4,6,9,2,11,13,5,7,8...并且没有离群很远的数，比如1000，那么可以用一个足够大的临时数组来辅助排序，当如果有很大的数就不行了，因为数组大小不好定，浪费空间。

#include <iostream>

void Swap(int &a, int &b)

{

    int c = a;

    a = b;

    b = c;

}

int FindFirstNumberNotExistenceInArray(int a\[\], int n)

{

    int i;

    // 类似基数排序，当a\[i\]>0且a\[i\]<N时保证a\[i\] == i + 1

    for (i = 0; i < n; i++)

    while (a\[i\] > 0 && a\[i\] <= n && a\[i\] != i + 1 && a\[i\] != a\[a\[i\] - 1\])

        Swap(a\[i\], a\[a\[i\] - 1\]);

    // 查看缺少哪个数

    for (i = 0; i < n; i++)

    if (a\[i\] != i + 1)

        break;

    return i + 1;

}

void PrintfArray(int a\[\], int n)

{

    for (int i = 0; i < n; i++)

        printf("%d ", a\[i\]);

    putchar('\\n');

}

int main()

{

    const int MAXN = 5;

    //int a\[MAXN\] = {1, 2, 3, 4, 7};

    int a\[MAXN\] = {1, 3, 5, 4, 2};

    //int a\[MAXN\] = { 2, -100, 4, 1, 70 };

    //int a\[MAXN\] = {2, 2, 2, 2, 1};

    PrintfArray(a, MAXN);

    printf("该数组缺失的数字为%d\\n", FindFirstNumberNotExistenceInArray(a, MAXN));

    return 0;

}

* * *

“一步千里”之数组找数

问题：

有这样一个数组A，大小为n，相邻元素差的绝对值都是1。如：A={4,5,6,5,6,7,8,9,10,9}。现在，给定A和目标整数y，请找到y在A中的位置。除了依次遍历，还有更好的方法么？

思路：

数组第一个数为array\[0\], 要找的数为y，设t = abs(y - array\[0\])。由于每个相邻的数字之差的绝对值为1。故第t个位置之前的数肯定都比y小（这里假设y>array\[0\]，如果y<array\[0\]那t之前的数都比y大）。因此直接定位到array\[t\]，重新计算t，t = abs(y – array\[t\])，再重复上述步骤即可。这种算法主要利用了当前位置的数与查找数的差来实现跨越式搜索。算法效率要比遍历数组的算法要高一些，并且易于实现。

C++实现：

#include <iostream>

#include <math.h>

void PrintfArray(int a\[\], int n)

{

    for (int i = 0; i < n; i++)

        printf("%d ", a\[i\]);

    putchar('\\n');

}

int FindNumberInArray(int arr\[\], int n, int find_number)

{

    int next\_arrive\_index = abs(find_number - arr\[0\]);

    while (next\_arrive\_index < n)

    {

        if (arr\[next\_arrive\_index\] == find_number)

            return next\_arrive\_index;

        next\_arrive\_index += abs(find\_number - arr\[next\_arrive_index\]);

    }

    return -1;

}

int main()

{

    const int MAXN = 10;

    int arr\[MAXN\] = { 6, 5, 6, 7, 8, 7, 6, 5, 4, 3};

    PrintfArray(arr, MAXN);

    for (int i = 0; i < MAXN; i++)

        printf("查找%d   \\y下标为%d\\n", arr\[i\], FindNumberInArray(arr, MAXN, arr\[i\]));

    printf("查找%d   \\y下标为%d\\n", -1, FindNumberInArray(arr, MAXN, -1));

    printf("查找%d   \\y下标为%d\\n", 0, FindNumberInArray(arr, MAXN, 0));

    printf("查找%d   \\y下标为%d\\n", 100, FindNumberInArray(arr, MAXN, 100));

    return 0;

}

* * *

查找二维数组中的数

问题描述：

有一个二维数组，每一行都从左到右递增，每一列都从上到下递增，判断数组是否含有某个数（目标），要求时间复杂度为n+m（n、m是数组的行、列数），如下：

1    2    8    9    

2    4    9    12

4    7    10  13

6    8    11  15

思路：

从矩阵的右上角出发，与目标比较，如果比目标大，则与该点同列的下方的数都比目标大，可以排除，然后再比较与该点同一行的位于该点左边的数字；如果比目标小，则与该点同行的左边的数都比目标小，可以排除，然后再比较与该点同列的位于该点下方的数字。依此比较下去，便可找到目标，或者目标不存在。

也可以从矩阵的左下角出发，但不能从左上角或右下角，比如，从左上角出发，如果该点比目标小，这时有可能往右走，也有可能往下走，方向不能确定。

C++实现：

#include<iostream>

#include<vector>

usingnamespace std;

void main()

{

    int row, //行

        column;//列

    cout << "输入二维数组的行和列，以空格隔开" << endl;

    cin >> row >> column;

    vector<vector<int> > vt(row, vector<int>(column));

    for (int r = 0; r < row; r++)

    {

        for (int c = 0; c < column; c++)

        {

            cout << "输入第" << r + 1 << "行，第" << c + 1 << "列的值：" << endl;

            cin >> vt\[r\]\[c\];

        }

    }

    for (int r = 0; r < row; r++)

    {

        for (int c = 0; c < column; c++)

        {

            cout << "\[" << vt\[r\]\[c\] << "\] ";

        }

        cout << endl;

    }

    int goalNum;

    while (true)

    {

        cout << "输入要查找的数：" << endl;

        cin >> goalNum;

        int pr = 0, pc = column - 1;

        bool isFind = false;

        while (pr < row && pc >= 0)

        {

            if (vt\[pr\]\[pc\] == goalNum)

            {

                cout << "找到！位于：\[" << pr + 1 << "," << pc + 1 << "\]" << endl;

                isFind = true;

                break;

            }

            if (vt\[pr\]\[pc\]>goalNum)

                pc--;

            else

                pr++;

        }

        if (!isFind)

            cout << "未能找到" << endl;

    }

}

* * *

查找数组中第k大的数、或最大的k个数

查找第k大的数：

解法1：

对这个乱序数组按照从大到小先行排序，然后取出前k大，总的时间复杂度为O(n*logn + k)

解法2：

利用选择排序，K次选择后即可得到第k大的数。总的时间复杂度为O(n*k)

解法3：

利用快速排序的思想，并不真正快速排序，从数组S中随机找出一个元素X，把数组分为两部分Sa和Sb。Sa中的元素大于等于X，Sb中元素小于X。这时有两种情况：

1、Sa中元素的个数小于k，则Sb中的第(k-|Sa|)大元素即为S中的第k大数。如果|Sa|等于k-1，则X本身便是第k大的数；如果|Sa|等于k-2，则Sb中最大的那个数便是要找的数。  
2、Sa中元素的个数大于等于k，则返回Sa中的第k大数。如果|Sa|等于k，则Sa中最小的那个数便是要找的数

时间复杂度为：n+n/2+n/4+n/8+...=n(1+1/2+1/4+1/8+...)，属于等比数列，结果为2*n，故时间复杂度为O(n)

解法4：

利用堆，首先建最大堆（时间复杂度为O(n)，证明可看笔记“堆排序”），然后分别从堆取出前k个数，第k个便是要找的数，取k个数时间复杂度为k*log2n，因为每取出一个数，堆都需要保持最大堆。总时间复杂度为两者之和。

取出最大的k个数：

前面的解法1、2、4均可。

* * *

查找出现次数超过总数一半的数

问题描述：

在一组数中，有一个数出现的次数大于总个数的一半，快速找出该数。

解法1：

先对数组排序，然后取排序后的中间一个数，但该解法需要对数组排序，故时间复杂度为N * log2N，不可取。

解法2：

借鉴“查找数组中第k大的数”，这里查找数组中第n/2（上取整）大的数，该数便是要找的数，时间复杂度为O(n)。

解法3：

每次删除两个不同的数，那么，最后剩下的便是要找的数。

关键是怎么找到两个不同的数来删除呢，直接看代码：

publicclass Test{

   publicint find(List<Integer>list){

      int goal = -1;

      int count = 0;

      for(int i = 0;i<list.size();i++){

         if(count==0){

            goal = list.get(i);

            count = 1;

         }else{

            if(goal==list.get(i))

                count++;

            else

                count--;

         }

      }

      return goal;

   }

   publicstaticvoid main(String\[\]args) throws IOException{

      List<Integer>list = new ArrayList<Integer>();

      Scanner sc = new Scanner(System.in);

       int in = -1;

       while((in = sc.nextInt())!=-1){

          list.add(in);

       }

       sc.close();

       Test test = new Test();

       for(int i:list){

          System.out.print(i+",");

       }

       System.out.println("\\n找到："+test.find(list));

   }

}

* * *

第一个只出现一次的字符

问题：

在字符串中找出第一个只出现一次的字符，如输入abcdfgsecdefas，则输出'b'。

思路：

利用哈希表，表现在Java里可以用HashMap，其中字符作为key，字符出现的次数作为value。这样只要经过两轮扫描便可，第一轮用于设置value，第二轮用于找第一个value为1的key。

Java实现：

      String str = "abcdfgsecdefas";

      Map<Character, Integer>map = new HashMap<Character, Integer>();

      int size = str.length();

      for(int i = 0;i<size;i++){

         char c = str.charAt(i);

         Integer value = map.get(c);

         if(value==null)

            map.put(c, 1);

         else

            map.put(c, value+1);

      }

      for(int i = 0;i<size;i++){

         Integer value = map.get(str.charAt(i));

         if(value==1){

            System.out.println(str.charAt(i));

            break;

         }

      }

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()
<p><strong>思路：</strong></p>

<p>普通解法：</p>

<p>第一个数从数组的开头开始，然后利用二分法找第二个数，时间复杂度为nlogn，因为第一个数是从头到尾顺序选择的。</p>

<p>时间复杂度为n的解法：</p>

<p>第一个数从数组的开头开始，第二个数从数组的结尾开始，如果两者的和大于s，则第二个数往前取下一个数，如果两者的和小于s，则第一个数往后取下一个数，重复直至两者的和等于s。</p>

<hr><p><strong>找出和为s的连续正数序列</strong></p>

<p><strong>问题：</strong></p>

<p>有一个连续正数序列，找出所有的和为s的连续正数序列。</p>

<p>如，有正数序列：1、2、3、4、5、6、7、8、9、10，找出所有的和为15的序列，结果为：</p>

<p>1~5,、4~6和7~8</p>

<p><strong>思路：</strong></p>

<p>设两个变量small、big分别为序列的第一个值和第二个值，这里即small为1，big为2，则它们之间的和为3，如果small到big之间的和小于s，则big往后移一个数，如果大于s，则small往后移一个数，如果等于s，则先打印该序列（只要打印small和big即可），然后分别往后移一个数，进一步找下一个序列。求和的时候，不需要每次都从small到big累加，big往后移只要加上(big+1)即可，small往后移只要减去small即可。</p>

<p><strong>证明思路的正确性：</strong></p>

<p>假设一个满足和为s的序列的头为m，尾为n，满足以下规则：</p>

<p>small&lt;=m、big&lt;=n</p>

<p>我们知道，刚开始的时候肯定满足上面条件（理由就不多说了）。</p>

<p>只要我们能证明通过以上思路能找到该序列，并且下一序列也满足以上规则，便可证明通过该思路能找到所有的和为s的序列（归纳法）。</p>

<p>画图很容易看出，small向后移的时候最多也就只能移到位置m，因为big&lt;=n，big向后移的时候最多只能移到位置n，最终两者会先后到达位置m和位置n，这时找到一个连续序列，然后small和big分别往后移一位，而下一个和为s的序列的开头一定比m大，结尾一定比n大，这时新的m、n和新的small、big满足以上规则。</p>

<hr><p>把数组排列成最小的数</p>

<p>问题：</p>

<p>输入一个正整数数组，把数组里所有数字拼接起来排成一个数，求出所有拼接结果中最小的一个，例如，数组{3,32,321}，最小的拼接结果为321323</p>

<p>思路：</p>

<p>两个数字m和n能拼接成数字mn和nm，如果mn&lt;nm，则我们认为m应该排在n的前面（m小于n），反之，如果nm&lt;mn，则认为n小于m，注意，这里的n小于m不是数值上的大小，例如，两个数3与32，可以组成332和323，由于323&lt;332，所以，我们认为32小于3。</p>

<p>根据上面定义的比较规则，我们可以先对数组进行排序，然后把排序后的数组拼接成一个整数，该整数便是最小的拼接结果。这里有一个拼接技巧，两个整数拼接成一个整数，可以先把整数转换成字符串然后进行拼接。比较拼接结果无需转换回整数，直接比较字符串大小便可。</p>

<p>这里有几个表达式需要证明：</p>

<p>1、已知a&lt;b&lt;c，证明a&lt;c（传递性）</p>

<p>也就是说已知ab&lt;ba、bc&lt;cb，证明ac&lt;ca</p>

<p>暂时不会证明</p>

<p>2、已知a&lt;b&lt;c，且a&lt;c，证明abc是最小的拼接结果：</p>

<p>证明：</p>

<p>假如acb小于abc，那么cb&lt;bc，这与b&lt;c矛盾</p>

<p>假如cab小于abc，由于ca&gt;ac，所以cab&gt;acb，又有cb&gt;bc，所以acb&gt;abc，故cab&gt;abc，矛盾</p>

<p>。。。。</p>

<hr><p>“基数排序”之数组中缺失的数字</p>

<p>问题：</p>

<p>给定一个无序的整数数组，怎么找到第一个大于0，并且不在此数组的整数。比如[1,2,0]返回3，[3,4,-1,1]返回2，[1, 5, 3, 4, 2]返回6，[100,3, 2, 1, 6,8, 5]返回4。要求使用O(1)空间和O(n)时间。</p>

<p>以{1, 3, 6, -100, 2}为例来简介这种解法，注意，空间为O(1)，不能用临时数组：</p>

<p>从第一个数字开始，由于a[0]=1，所以不用处理了（下标0+1=1说明位置正确了）。</p>

<p>第二个数字为3，因此放到第3个位置（下标为2），交换a[1]和a[2]，得到数组为{1, 6, 3, -100, 2}。由于6无法放入数组（因为数组大小为5，下标最大是4，放不下6），所以直接跳过。</p>

<p>第三个数字是3，不用处理（下标2+1=3说明位置正确了）。</p>

<p>第四个数字是-100，也无法放入数组，直接跳过。</p>

<p>第五个数字是2，因此放到第2个位置（下标为1），交换a[4]和a[1]，得到数组为{1, 2, 3, -100, 6}，由于6无法放入数组，所以直接跳过。<br>
此时“基数排序”就完成了，然后再从遍历数组，如果对于某个位置上没该数，就说明数组缺失了该数字。如{1, 2, 3, -100, 6}缺失的就为4。</p>

<p>通过第i个位置上存放大小为(i+1)的数，“基数排序”就顺利的搞定此题了。</p>

<p>可不可以用这种方式排序呢，如果数字连的很近，比如1,4,6,9,2,11,13,5,7,8...并且没有离群很远的数，比如1000，那么可以用一个足够大的临时数组来辅助排序，当如果有很大的数就不行了，因为数组大小不好定，浪费空间。</p>

<p>#include&nbsp;&lt;iostream&gt;</p>

<p>void&nbsp;Swap(int&nbsp;&amp;a,&nbsp;int&nbsp;&amp;b)</p>

<p>{</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;c =&nbsp;a;</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;a&nbsp;=&nbsp;b;</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;b&nbsp;= c;</p>

<p>}</p>

<p>int&nbsp;FindFirstNumberNotExistenceInArray(int&nbsp;a[],&nbsp;int&nbsp;n)</p>

<p>{</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;i;</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;类似基数排序，当a[i]&gt;0且a[i]&lt;N时保证a[i] == i + 1</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(i = 0; i &lt;&nbsp;n; i++)</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;while&nbsp;(a[i] &gt; 0 &amp;&amp;&nbsp;a[i] &lt;=&nbsp;n&nbsp;&amp;&amp;&nbsp;a[i] != i + 1 &amp;&amp;&nbsp;a[i] !=&nbsp;a[a[i] - 1])</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Swap(a[i],&nbsp;a[a[i] - 1]);</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;查看缺少哪个数</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(i = 0; i &lt;&nbsp;n; i++)</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(a[i] != i + 1)</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break;</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;i + 1;</p>

<p>}</p>

<p>void&nbsp;PrintfArray(int&nbsp;a[],&nbsp;int&nbsp;n)</p>

<p>{</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(int&nbsp;i = 0; i &lt;&nbsp;n; i++)</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; printf("%d ",&nbsp;a[i]);</p>

<p>&nbsp;&nbsp;&nbsp; putchar('\n');</p>

<p>}</p>

<p>int&nbsp;main()</p>

<p>{</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;int&nbsp;MAXN = 5;</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;//int a[MAXN] = {1, 2, 3, 4, 7};</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;a[MAXN] = {1, 3, 5, 4, 2};</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;//int a[MAXN] = { 2, -100, 4, 1, 70 };</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;//int a[MAXN] = {2, 2, 2, 2, 1};</p>

<p>&nbsp;&nbsp;&nbsp; PrintfArray(a, MAXN);</p>

<p>&nbsp;&nbsp;&nbsp; printf("该数组缺失的数字为%d\n", FindFirstNumberNotExistenceInArray(a, MAXN));</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;0;</p>

<p>}</p>

<hr><p>“一步千里”之数组找数</p>

<p>问题：</p>

<p>有这样一个数组A，大小为n，相邻元素差的绝对值都是1。如：A={4,5,6,5,6,7,8,9,10,9}。现在，给定A和目标整数y，请找到y在A中的位置。除了依次遍历，还有更好的方法么？</p>

<p>思路：</p>

<p>数组第一个数为array[0],&nbsp;要找的数为y，设t = abs(y - array[0])。由于每个相邻的数字之差的绝对值为1。故第t个位置之前的数肯定都比y小（这里假设y&gt;array[0]，如果y&lt;array[0]那t之前的数都比y大）。因此直接定位到array[t]，重新计算t，t = abs(y – array[t])，再重复上述步骤即可。这种算法主要利用了当前位置的数与查找数的差来实现跨越式搜索。算法效率要比遍历数组的算法要高一些，并且易于实现。</p>

<p>C++实现：</p>

<p>#include&nbsp;&lt;iostream&gt;</p>

<p>#include&nbsp;&lt;math.h&gt;</p>

<p>void&nbsp;PrintfArray(int&nbsp;a[],&nbsp;int&nbsp;n)</p>

<p>{</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(int&nbsp;i = 0; i &lt;&nbsp;n; i++)</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;printf("%d ",&nbsp;a[i]);</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;putchar('\n');</p>

<p>}</p>

<p>int&nbsp;FindNumberInArray(int&nbsp;arr[],&nbsp;int&nbsp;n,&nbsp;int&nbsp;find_number)</p>

<p>{</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;next_arrive_index = abs(find_number&nbsp;-&nbsp;arr[0]);</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;while&nbsp;(next_arrive_index &lt;&nbsp;n)</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;{</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(arr[next_arrive_index] ==&nbsp;find_number)</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;next_arrive_index;</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;next_arrive_index += abs(find_number&nbsp;-&nbsp;arr[next_arrive_index]);</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;}</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;-1;</p>

<p>}</p>

<p>int&nbsp;main()</p>

<p>{</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;const&nbsp;int&nbsp;MAXN = 10;</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;arr[MAXN] = { 6, 5, 6, 7, 8, 7, 6, 5, 4, 3};</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;PrintfArray(arr, MAXN);</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(int&nbsp;i = 0; i &lt; MAXN; i++)</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;printf("查找%d&nbsp;&nbsp;&nbsp;\y下标为%d\n", arr[i], FindNumberInArray(arr, MAXN, arr[i]));</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;printf("查找%d&nbsp;&nbsp;&nbsp;\y下标为%d\n", -1, FindNumberInArray(arr, MAXN, -1));</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;printf("查找%d&nbsp;&nbsp;&nbsp;\y下标为%d\n", 0, FindNumberInArray(arr, MAXN, 0));</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;printf("查找%d&nbsp;&nbsp;&nbsp;\y下标为%d\n", 100, FindNumberInArray(arr, MAXN, 100));</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;0;</p>

<p>}</p>

<hr><p>查找二维数组中的数</p>

<p>问题描述：</p>

<p>有一个二维数组，每一行都从左到右递增，每一列都从上到下递增，判断数组是否含有某个数（目标），要求时间复杂度为n+m（n、m是数组的行、列数），如下：</p>

<p>1 &nbsp; &nbsp;2 &nbsp; &nbsp;8 &nbsp; &nbsp;9 &nbsp; &nbsp;</p>

<p>2 &nbsp; &nbsp;4 &nbsp; &nbsp;9 &nbsp; &nbsp;12</p>

<p>4 &nbsp; &nbsp;7 &nbsp; &nbsp;10 &nbsp;13</p>

<p>6 &nbsp; &nbsp;8 &nbsp; &nbsp;11 &nbsp;15</p>

<p>思路：</p>

<p>从矩阵的右上角出发，与目标比较，如果比目标大，则与该点同列的下方的数都比目标大，可以排除，然后再比较与该点同一行的位于该点左边的数字；如果比目标小，则与该点同行的左边的数都比目标小，可以排除，然后再比较与该点同列的位于该点下方的数字。依此比较下去，便可找到目标，或者目标不存在。</p>

<p>也可以从矩阵的左下角出发，但不能从左上角或右下角，比如，从左上角出发，如果该点比目标小，这时有可能往右走，也有可能往下走，方向不能确定。</p>

<p>C++实现：</p>

<p>#include&lt;iostream&gt;</p>

<p>#include&lt;vector&gt;</p>

<p>usingnamespace&nbsp;std;</p>

<p>void&nbsp;main()</p>

<p>{</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;row,&nbsp;//行</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; column;//列</p>

<p>&nbsp;&nbsp;&nbsp; cout &lt;&lt;&nbsp;"输入二维数组的行和列，以空格隔开"&nbsp;&lt;&lt; endl;</p>

<p>&nbsp;&nbsp;&nbsp; cin &gt;&gt; row &gt;&gt; column;</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;vector&lt;vector&lt;int&gt; &gt; vt(row,&nbsp;vector&lt;int&gt;(column));</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(int&nbsp;r = 0; r &lt; row; r++)</p>

<p>&nbsp;&nbsp;&nbsp; {</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(int&nbsp;c = 0; c &lt; column; c++)</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; cout &lt;&lt;&nbsp;"输入第"&nbsp;&lt;&lt; r + 1 &lt;&lt;&nbsp;"行，第"&nbsp;&lt;&lt; c + 1 &lt;&lt;&nbsp;"列的值："&nbsp;&lt;&lt; endl;</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; cin &gt;&gt; vt[r][c];</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</p>

<p>&nbsp;&nbsp;&nbsp; }</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(int&nbsp;r = 0; r &lt; row; r++)</p>

<p>&nbsp;&nbsp;&nbsp; {</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;(int&nbsp;c = 0; c &lt; column; c++)</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; cout &lt;&lt;&nbsp;"["&nbsp;&lt;&lt; vt[r][c] &lt;&lt;&nbsp;"] ";</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; cout &lt;&lt; endl;</p>

<p>&nbsp;&nbsp;&nbsp; }</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;goalNum;</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;while&nbsp;(true)</p>

<p>&nbsp;&nbsp;&nbsp; {</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; cout &lt;&lt;&nbsp;"输入要查找的数："&nbsp;&lt;&lt; endl;</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; cin &gt;&gt; goalNum;</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;pr = 0, pc = column - 1;</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bool&nbsp;isFind =&nbsp;false;</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;while&nbsp;(pr &lt; row &amp;&amp; pc &gt;= 0)</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(vt[pr][pc] == goalNum)</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; cout &lt;&lt;&nbsp;"找到！位于：["&nbsp;&lt;&lt; pr + 1 &lt;&lt;&nbsp;","&nbsp;&lt;&lt; pc + 1 &lt;&lt;&nbsp;"]"&nbsp;&lt;&lt; endl;</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; isFind =&nbsp;true;</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break;</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(vt[pr][pc]&gt;goalNum)</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; pc--;</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; pr++;</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;(!isFind)</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; cout &lt;&lt;&nbsp;"未能找到"&nbsp;&lt;&lt; endl;</p>

<p>&nbsp;&nbsp;&nbsp; }</p>

<p>}</p>

<hr><p>查找数组中第k大的数、或最大的k个数</p>

<p>查找第k大的数：</p>

<p>解法1：</p>

<p>对这个乱序数组按照从大到小先行排序，然后取出前k大，总的时间复杂度为O(n*logn + k)</p>

<p>解法2：</p>

<p>利用选择排序，K次选择后即可得到第k大的数。总的时间复杂度为O(n*k)</p>

<p>解法3：</p>

<p>利用快速排序的思想，并不真正快速排序，从数组S中随机找出一个元素X，把数组分为两部分Sa和Sb。Sa中的元素大于等于X，Sb中元素小于X。这时有两种情况：</p>

<p>1、Sa中元素的个数小于k，则Sb中的第(k-|Sa|)大元素即为S中的第k大数。如果|Sa|等于k-1，则X本身便是第k大的数；如果|Sa|等于k-2，则Sb中最大的那个数便是要找的数。<br>
2、Sa中元素的个数大于等于k，则返回Sa中的第k大数。如果|Sa|等于k，则Sa中最小的那个数便是要找的数</p>

<p>时间复杂度为：n+n/2+n/4+n/8+...=n(1+1/2+1/4+1/8+...)，属于等比数列，结果为2*n，故时间复杂度为O(n)</p>

<p>解法4：</p>

<p>利用堆，首先建最大堆（时间复杂度为O(n)，证明可看笔记“堆排序”），然后分别从堆取出前k个数，第k个便是要找的数，取k个数时间复杂度为k*log2n，因为每取出一个数，堆都需要保持最大堆。总时间复杂度为两者之和。</p>

<p>取出最大的k个数：</p>

<p>前面的解法1、2、4均可。</p>

<hr><p>查找出现次数超过总数一半的数</p>

<p>问题描述：</p>

<p>在一组数中，有一个数出现的次数大于总个数的一半，快速找出该数。</p>

<p>解法1：</p>

<p>先对数组排序，然后取排序后的中间一个数，但该解法需要对数组排序，故时间复杂度为N * log2N，不可取。</p>

<p>解法2：</p>

<p>借鉴“查找数组中第k大的数”，这里查找数组中第n/2（上取整）大的数，该数便是要找的数，时间复杂度为O(n)。</p>

<p>解法3：</p>

<p>每次删除两个不同的数，那么，最后剩下的便是要找的数。</p>

<p>关键是怎么找到两个不同的数来删除呢，直接看代码：</p>

<p>publicclass&nbsp;Test{</p>

<p>&nbsp;&nbsp;&nbsp;publicint&nbsp;find(List&lt;Integer&gt;list){</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;goal = -1;</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;count = 0;</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for(int&nbsp;i = 0;i&lt;list.size();i++){</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if(count==0){</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; goal = list.get(i);</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; count = 1;</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }else{</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if(goal==list.get(i))</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; count++;</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; count--;</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return&nbsp;goal;</p>

<p>&nbsp;&nbsp; }</p>

<p>&nbsp;&nbsp;&nbsp;publicstaticvoid&nbsp;main(String[]args)&nbsp;throws&nbsp;IOException{</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; List&lt;Integer&gt;list =&nbsp;new&nbsp;ArrayList&lt;Integer&gt;();</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Scanner sc =&nbsp;new&nbsp;Scanner(System.in);</p>

<p>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;in = -1;</p>

<p>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;while((in = sc.nextInt())!=-1){</p>

<p>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; list.add(in);</p>

<p>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }</p>

<p>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; sc.close();</p>

<p>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; Test test =&nbsp;new&nbsp;Test();</p>

<p>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;for(int&nbsp;i:list){</p>

<p>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; System.out.print(i+",");</p>

<p>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }</p>

<p>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; System.out.println("\n找到："+test.find(list));</p>

<p>&nbsp;&nbsp; }</p>

<p>}</p>

<hr><p>第一个只出现一次的字符</p>

<p>问题：</p>

<p>在字符串中找出第一个只出现一次的字符，如输入abcdfgsecdefas，则输出'b'。</p>

<p>思路：</p>

<p>利用哈希表，表现在Java里可以用HashMap，其中字符作为key，字符出现的次数作为value。这样只要经过两轮扫描便可，第一轮用于设置value，第二轮用于找第一个value为1的key。</p>

<p>Java实现：</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; String str =&nbsp;"abcdfgsecdefas";</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Map&lt;Character, Integer&gt;map =&nbsp;new&nbsp;HashMap&lt;Character, Integer&gt;();</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int&nbsp;size = str.length();</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for(int&nbsp;i = 0;i&lt;size;i++){</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;char&nbsp;c = str.charAt(i);</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Integer value = map.get(c);</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if(value==null)</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;map.put(c, 1);</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;map.put(c, value+1);</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for(int&nbsp;i = 0;i&lt;size;i++){</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Integer value = map.get(str.charAt(i));</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if(value==1){</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(str.charAt(i));</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break;</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}</p>

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }</p>            </div>
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