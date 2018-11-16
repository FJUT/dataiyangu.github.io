title: 内连接、外连接、交叉连接
author: Leesin.Dong
tags:
  - interview
  - 数据库
categories:
  - 数据库
  - 数据库基础知识
date: 2018-11-09 00:00:00
---
首先划分一下，连接分为三种：内连接、外连接、交叉连接  
  
内连接(INNER JOIN)：  
    分为三种：等值连接、自然连接、不等连接  
      
外连接(OUTER JOIN)：  
    分为三种：  
    左外连接(LEFT OUTER JOIN或LEFT JOIN)  
    右外连接(RIGHT OUTER JOIN或RIGHT JOIN)  
    全外连接(FULL OUTER JOIN或FULL JOIN)  
  
交叉连接(CROSS JOIN)：  
    没有WHERE 子句，它返回连接表中所有数据行的笛卡尔积 

==================================================================================================

==================================================================================================

1.

a. 并集UNION ：SELECT column1, column2 FROM table1 UNION SELECT column1, column2 FROM table2

b. 交集JOIN ：SELECT * FROM table1 AS a JOIN table2 b ON a.name=b.name

c. 差集NOT IN ：SELECT * FROM table1 WHERE name NOT IN(SELECT name FROM table2)

d. 笛卡尔积CROSS JOIN ：SELECT * FROM table1 CROSS JOIN table2 （   与 SELECT * FROM table1,table2相同）

 2.

SQL中的UNION 与UNION ALL的区别是，前者会去除重复的条目，后者会仍旧保留。

a. UNION ：SQL Statement1 UNION SQL Statement2

b. UNION ALL： SQL Statement1 UNION ALL SQL Statement2

3.

SQL中的各种JOIN， SQL中的连接可以分为内连接，外连接，以及交叉连接(即是笛卡尔积)

a. 交叉连接 CROSS JOIN:

如果不带WHERE条件子句，它将会返回被连接的两个表的笛卡尔积，返回结果的行数等于两个表行数的乘积； 举例

SELECT * FROM table1 CROSS JOIN table2 等同于

SELECT * FROM table1,table2

一般不建议使用该方法，因为如果有WHERE子句的话，往往会先生成两个表行数乘积的行的数据表然后才根据WHERE条件从中选择。 因此，如果两个需要求交际的表太大，将会非常非常慢，不建议使用。

b. 内连接 INNER JOIN :

如果仅仅使用 SELECT * FROM table1 INNER JOIN table2 没有指定连接条件的话，和交叉连接的结果一样。 但是通常情况下，使用INNER JOIN需要指定连接条件。

-- 等值连接(=号应用于连接条件, 不会去除重复的列) SELECT * FROM table1 AS a INNER JOIN table2 AS b on a.column=b.column

-- 不等连接(>,>=,<,<=,!>,!<,<>) 例如 SELECT * FROM table1 AS a INNER JOIN table2 AS b on a.column<>b.column

-- 自然连接(会去除重复的列)

c. 外连接 OUTER JOIN:

 首先内连接和外连接的不同之处： 内连接如果没有指定连接条件的话，和笛卡尔积的交叉连接结果一样，但是不同于笛卡尔积的地方是，没有笛卡尔积那么复杂地要先生成行数乘积的数据表，内连接的效率要高于笛卡尔积的交叉连接。指定条件的内连接，仅仅返回符合连接条件的条目。外连接则不同，返回的结果不仅包含符合连接条件的行，而且包括左表(左外连接时), 右表(右连接时)或者两边连接(全外连接时)的所有数据行  

1)左外连接LEFT [OUTER] JOIN ：

显示符合条件的数据行，同时显示左边数据表不符合条件的数据行，右边没有对应的条目显示NULL 例如 SELECT * FROM table1 AS a LEFT [OUTER] JOIN ON a.column=b.column                                                                                                                                     

2)右外连接RIGHT [OUTER] JOIN：

 显示符合条件的数据行，同时显示右边数据表不符合条件的数据行，左边没有对应的条目显示NULL 例如 SELECT * FROM table1 AS a RIGHT [OUTER] JOIN ON a.column=b.column                                                                                                                                               

3)全外连接：

显示符合条件的数据行，同时显示左右不符合条件的数据行，相应的左右两边显示NUL