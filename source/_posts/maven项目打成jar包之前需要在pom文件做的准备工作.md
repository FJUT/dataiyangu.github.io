title: maven项目打成jar包之前需要在pom文件做的准备工作
author: Leesin.Dong
tags:
  - maven
categories:
  - 编码辅助工具
  - maven
date: 2018-11-11 23:31:00
---
版权声明：本文为作者原创，转载请注明出处，联系qq：32248827 https://blog.csdn.net/dataiyangu/article/details/81334177

**很多时候在eclipse中没问题java -jar没有主类，或者classnotfound**

> <插件\>  
> 
>         <artifactId的>行家组装-插件</ artifactId的>  
> 
>         <结构\>  
> 
>             <appendAssemblyId>假</ appendAssemblyId>  
> 
>             <descriptorRefs>  
> 
>                 <descriptorRef>罐与 - 依赖</ descriptorRef>  
> 
>             </ descriptorRefs>  
> 
>             <存档\>  
> 
>                 <清单\>  
> 
>                     <mainClass> com.cloudwise.Main </ mainClass> //设置主类
> 
>                 </清单\>  
> 
>             </存档\>  
> 
>         </配置\>  
> 
>         <处决\>  
> 
>             <execution>将依赖打包进jar
> 
>                 <ID>使组装</ ID>  
> 
>                 <阶段>包</相位\>  
> 
>                 <目标\>  
> 
>                     <目标>组件</目标\>  
> 
>                 </目标\>  
> 
>             </执行\>  
> 
>         </处决\>  
> 
>       </插件>
> 
> 或者
> 
> <build> <plugins> <plugin> <groupId>org.apache.maven.plugins</groupId> <artifactId>maven-shade-plugin</artifactId> <version>1.2.1</version> <executions> <execution> <phase>package</phase> <goals> <goal>shade</goal> </goals> <configuration> <transformers> <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer"> <!--程序入口类，main方法类--> <mainClass>com.company.project</mainClass> </transformer> </transformers> </configuration> </execution> </executions> </plugin> </plugins> </build>
> 
> 或者
> 
> <plugin> <groupId> org.apache.maven.plugins </ groupId> <artifactId> maven-shade-plugin </ artifactId> <version> 1.2.1 </ version> <executions> <execution> <phase> package < / phase> <goals> <goal> shade </ goal> </ goals> <configuration> <transformers> <transformer implementation =“org.apache.maven.plugins.shade.resource.ManifestResourceTransformer”> <mainClass> com.cloume .project.App </ mainClass> </ transformer> </ transformers> </ configuration> </ execution> </ executions> </ plugin>

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()