title: 关于反射里的内部类和外部类
author: Leesin.Dong
tags:
  - Java基础
categories:
  - java
  - java基础
date: 2018-11-11 10:47:00
---
版权声明：本文为作者原创，转载请注明出处，联系qq：32248827 https://blog.csdn.net/dataiyangu/article/details/81317784

    最近写适配，遇到了一点小问题，

1.通过反射得到某个实例，可是这个实例是内部类，想要得到并通过invoke方法执行外部类的方法，需要得到外部类的实例，通过网上查阅，每一个内部类都有一个this$0的变量是指向外部类的引用，通过getdeclearedField得到这个引用，然后setaccessible(true)得到访问权限实例化外部类就得到了，此时这个内部类的实例对应的外部类的实例了。

      可是我这里的内部类是static的，上面的this$0是有限制的，静态内部类和静态方法里面的内部类是没有this$0这个引用的，因为静态内部类，是面向类的而不是对象，能够独自的应用本身，而脱离外部类，和外部类没有这个引用关系。

2.     还有一个方法是要invoke的方法在内部类，得到的实例是外部类，想得到对应的内部类的实例，并没有这层关系。所以这个方法不可行

**在这里记录下通过外部类得到内部类的方法：**

clazz.getDeclaredClasses();

通过内部类得到外部类的方法：

`Clazz.getDeclaringClass();`

得到类的构造函数

clazz.getConstructors()

得到类的所有构造函数

clazz.getDeclaredConstructor();

**注意：构造函数通过getmethod是得不到的！只能通过getdeclaredconstructor/getconstructors得到**

最后解决的办法，在前辈的帮助下，发现setheader方法，最终是走的内部类的request里面的add方法这样就不需要关联内部类和外部类了。下面是asynchttpclient一个类的代码：

**package** com.ning.http.client;

> **import** com.ning.http.client.cookie.Cookie;
> 
> **import** com.ning.http.client.multipart.Part;
> 
> **import** com.ning.http.client.uri.Uri;
> 
> **import** com.ning.http.util.AsyncHttpProviderUtils;
> 
> **import** com.ning.http.util.MiscUtils;
> 
> **import** com.ning.http.util.UriEncoder;
> 
> **import** java.io.File;
> 
> **import** java.io.InputStream;
> 
> **import** java.net.InetAddress;
> 
> **import** java.util.ArrayList;
> 
> **import** java.util.Collection;
> 
> **import** java.util.Collections;
> 
> **import** java.util.List;
> 
> **import** java.util.Map;
> 
> **import** java.util.Map.Entry;
> 
> **import** org.slf4j.Logger;
> 
> **import** org.slf4j.LoggerFactory;
> 
> **public** **abstract** **class** RequestBuilderBase<T **extends** RequestBuilderBase<T>>
> 
> {
> 
>   **private** **static** **final** Logger logger = LoggerFactory.getLogger(RequestBuilderBase.**class**);
> 
>   **private** **static** **final** Uri DEFAULT\_REQUEST\_URL = Uri.create("http://localhost");
> 
>   **private** **final** Class<T> derived;
> 
>   **protected** **final** RequestImpl request;
> 
>   **protected** UriEncoder uriEncoder;
> 
>   **protected** List<Param> rbQueryParams;
> 
>   **protected** SignatureCalculator signatureCalculator;
> 
>   **private** **static** **final** **class** RequestImpl
> 
>     **implements** Request
> 
>   {
> 
>     **private** String method;
> 
>     **private** Uri uri;
> 
>     **private** InetAddress address;
> 
>     **private** InetAddress localAddress;
> 
>     **private** FluentCaseInsensitiveStringsMap headers = **new** FluentCaseInsensitiveStringsMap();
> 
>     **private** ArrayList<Cookie> cookies;
> 
>     **private** **byte**\[\] byteData;
> 
>     **private** List<**byte**\[\]\> compositeByteData;
> 
>     **private** String stringData;
> 
>     **private** InputStream streamData;
> 
>     **private** BodyGenerator bodyGenerator;
> 
>     **private** List<Param> formParams;
> 
>     **private** List<Part> parts;
> 
>     **private** String virtualHost;
> 
>     **private** **long** length = -1L;
> 
>     **public** ProxyServer proxyServer;
> 
>     **private** Realm realm;
> 
>     **private** File file;
> 
>     **private** Boolean followRedirects;
> 
>     **private** **int** requestTimeout;
> 
>     **private** **long** rangeOffset;
> 
>     **public** String charset;
> 
>     **private** ConnectionPoolPartitioning connectionPoolPartitioning = ConnectionPoolPartitioning.PerHostConnectionPoolPartitioning.INSTANCE;
> 
>     **private** NameResolver nameResolver = NameResolver.JdkNameResolver.INSTANCE;
> 
>     **private** List<Param> queryParams;
> 
>     **public** RequestImpl() {}
> 
>     **public** RequestImpl(Request prototype)
> 
>     {
> 
>       **if** (prototype != **null**)
> 
>       {
> 
>         **this**.method = prototype.getMethod();
> 
>         **this**.uri = prototype.getUri();
> 
>         **this**.address = prototype.getInetAddress();
> 
>         **this**.localAddress = prototype.getLocalAddress();
> 
>         **this**.headers = **new** FluentCaseInsensitiveStringsMap(prototype.getHeaders());
> 
>         **this**.cookies = **new** ArrayList(prototype.getCookies());
> 
>         **this**.byteData = prototype.getByteData();
> 
>         **this**.compositeByteData = prototype.getCompositeByteData();
> 
>         **this**.stringData = prototype.getStringData();
> 
>         **this**.streamData = prototype.getStreamData();
> 
>         **this**.bodyGenerator = prototype.getBodyGenerator();
> 
>         **this**.formParams = (prototype.getFormParams() == **null** ? **null** : **new** ArrayList(prototype.getFormParams()));
> 
>         **this**.parts = (prototype.getParts() == **null** ? **null** : **new** ArrayList(prototype.getParts()));
> 
>         **this**.virtualHost = prototype.getVirtualHost();
> 
>         **this**.length = prototype.getContentLength();
> 
>         **this**.proxyServer = prototype.getProxyServer();
> 
>         **this**.realm = prototype.getRealm();
> 
>         **this**.file = prototype.getFile();
> 
>         **this**.followRedirects = prototype.getFollowRedirect();
> 
>         **this**.requestTimeout = prototype.getRequestTimeout();
> 
>         **this**.rangeOffset = prototype.getRangeOffset();
> 
>         **this**.charset = prototype.getBodyEncoding();
> 
>         **this**.connectionPoolPartitioning = prototype.getConnectionPoolPartitioning();
> 
>         **this**.nameResolver = prototype.getNameResolver();
> 
>       }
> 
>     }
> 
>     **public** String getMethod()
> 
>     {
> 
>       **return** **this**.method;
> 
>     }
> 
>     **public** InetAddress getInetAddress()
> 
>     {
> 
>       **return** **this**.address;
> 
>     }
> 
>     **public** InetAddress getLocalAddress()
> 
>     {
> 
>       **return** **this**.localAddress;
> 
>     }
> 
>     **public** Uri getUri()
> 
>     {
> 
>       **return** **this**.uri;
> 
>     }
> 
>     **public** String getUrl()
> 
>     {
> 
>       **return** **this**.uri.toUrl();
> 
>     }
> 
>     **public** FluentCaseInsensitiveStringsMap getHeaders()
> 
>     {
> 
>       **return** **this**.headers;
> 
>     }
> 
>     **public** Collection<Cookie> getCookies()
> 
>     {
> 
>       **return** **this**.cookies != **null** ? Collections.unmodifiableCollection(**this**.cookies) : Collections.emptyList();
> 
>     }
> 
>     **public** **byte**\[\] getByteData()
> 
>     {
> 
>       **return** **this**.byteData;
> 
>     }
> 
>     **public** List<**byte**\[\]\> getCompositeByteData()
> 
>     {
> 
>       **return** **this**.compositeByteData;
> 
>     }
> 
>     **public** String getStringData()
> 
>     {
> 
>       **return** **this**.stringData;
> 
>     }
> 
>     **public** InputStream getStreamData()
> 
>     {
> 
>       **return** **this**.streamData;
> 
>     }
> 
>     **public** BodyGenerator getBodyGenerator()
> 
>     {
> 
>       **return** **this**.bodyGenerator;
> 
>     }
> 
>     **public** **long** getContentLength()
> 
>     {
> 
>       **return** **this**.length;
> 
>     }
> 
>     **public** List<Param> getFormParams()
> 
>     {
> 
>       **return** **this**.formParams != **null** ? **this**.formParams : Collections.emptyList();
> 
>     }
> 
>     **public** List<Part> getParts()
> 
>     {
> 
>       **return** **this**.parts != **null** ? **this**.parts : Collections.emptyList();
> 
>     }
> 
>     **public** String getVirtualHost()
> 
>     {
> 
>       **return** **this**.virtualHost;
> 
>     }
> 
>     **public** ProxyServer getProxyServer()
> 
>     {
> 
>       **return** **this**.proxyServer;
> 
>     }
> 
>     **public** Realm getRealm()
> 
>     {
> 
>       **return** **this**.realm;
> 
>     }
> 
>     **public** File getFile()
> 
>     {
> 
>       **return** **this**.file;
> 
>     }
> 
>     **public** Boolean getFollowRedirect()
> 
>     {
> 
>       **return** **this**.followRedirects;
> 
>     }
> 
>     **public** **int** getRequestTimeout()
> 
>     {
> 
>       **return** **this**.requestTimeout;
> 
>     }
> 
>     **public** **long** getRangeOffset()
> 
>     {
> 
>       **return** **this**.rangeOffset;
> 
>     }
> 
>     **public** String getBodyEncoding()
> 
>     {
> 
>       **return** **this**.charset;
> 
>     }
> 
>     **public** ConnectionPoolPartitioning getConnectionPoolPartitioning()
> 
>     {
> 
>       **return** **this**.connectionPoolPartitioning;
> 
>     }
> 
>     **public** NameResolver getNameResolver()
> 
>     {
> 
>       **return** **this**.nameResolver;
> 
>     }
> 
>     **public** List<Param> getQueryParams()
> 
>     {
> 
>       **if** (**this**.queryParams == **null**) {
> 
>         **if** (MiscUtils.isNonEmpty(**this**.uri.getQuery()))
> 
>         {
> 
>           **this**.queryParams = **new** ArrayList(1);
> 
>           **for** (String queryStringParam : **this**.uri.getQuery().split("&"))
> 
>           {
> 
>             **int** pos = queryStringParam.indexOf('=');
> 
>             **if** (pos <= 0) {
> 
>               **this**.queryParams.add(**new** Param(queryStringParam, **null**));
> 
>             } **else** {
> 
>               **this**.queryParams.add(**new** Param(queryStringParam.substring(0, pos), queryStringParam.substring(pos + 1)));
> 
>             }
> 
>           }
> 
>         }
> 
>         **else**
> 
>         {
> 
>           **this**.queryParams = Collections.emptyList();
> 
>         }
> 
>       }
> 
>       **return** **this**.queryParams;
> 
>     }
> 
>     **public** String toString()
> 
>     {
> 
>       StringBuilder sb = **new** StringBuilder(getUrl());
> 
>       sb.append("\\t");
> 
>       sb.append(**this**.method);
> 
>       sb.append("\\theaders:");
> 
>       **if** (MiscUtils.isNonEmpty(**this**.headers)) {
> 
>         **for** (String name : **this**.headers.keySet())
> 
>         {
> 
>           sb.append("\\t");
> 
>           sb.append(name);
> 
>           sb.append(":");
> 
>           sb.append(**this**.headers.getJoinedValue(name, ", "));
> 
>         }
> 
>       }
> 
>       **if** (MiscUtils.isNonEmpty(**this**.formParams))
> 
>       {
> 
>         sb.append("\\tformParams:");
> 
>         **for** (Param param : **this**.formParams)
> 
>         {
> 
>           sb.append("\\t");
> 
>           sb.append(param.getName());
> 
>           sb.append(":");
> 
>           sb.append(param.getValue());
> 
>         }
> 
>       }
> 
>       **return** sb.toString();
> 
>     }
> 
>   }
> 
>   **protected** RequestBuilderBase(Class<T> derived, String method, **boolean** disableUrlEncoding)
> 
>   {
> 
>     **this**(derived, method, UriEncoder.uriEncoder(disableUrlEncoding));
> 
>   }
> 
>   **protected** RequestBuilderBase(Class<T> derived, String method, UriEncoder uriEncoder)
> 
>   {
> 
>     **this**.derived = derived;
> 
>     **this**.request = **new** RequestImpl();
> 
>     **this**.request.method = method;
> 
>     **this**.uriEncoder = uriEncoder;
> 
>   }
> 
>   **protected** RequestBuilderBase(Class<T> derived, Request prototype)
> 
>   {
> 
>     **this**(derived, prototype, UriEncoder.FIXING);
> 
>   }
> 
>   **protected** RequestBuilderBase(Class<T> derived, Request prototype, UriEncoder uriEncoder)
> 
>   {
> 
>     **this**.derived = derived;
> 
>     **this**.request = **new** RequestImpl(prototype);
> 
>     **this**.uriEncoder = uriEncoder;
> 
>   }
> 
>   **public** T setUrl(String url)
> 
>   {
> 
>     **return** setUri(Uri.create(url));
> 
>   }
> 
>   **public** T setUri(Uri uri)
> 
>   {
> 
>     **this**.request.uri = uri;
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** T setInetAddress(InetAddress address)
> 
>   {
> 
>     **this**.request.address = address;
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** T setLocalInetAddress(InetAddress address)
> 
>   {
> 
>     **this**.request.localAddress = address;
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** T setVirtualHost(String virtualHost)
> 
>   {
> 
>     **this**.request.virtualHost = virtualHost;
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** T setHeader(String name, String value)
> 
>   {
> 
>     **this**.request.headers.replaceWith(name, **new** String\[\] { value });
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** T addHeader(String name, String value)
> 
>   {
> 
>     **if** (value == **null**)
> 
>     {
> 
>       logger.warn("Value was null, set to \\"\\"");
> 
>       value = "";
> 
>     }
> 
>     **this**.request.headers.add(name, value);
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** T setHeaders(FluentCaseInsensitiveStringsMap headers)
> 
>   {
> 
>     **this**.request.headers = (headers == **null** ? **new** FluentCaseInsensitiveStringsMap() : **new** FluentCaseInsensitiveStringsMap(headers));
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** T setHeaders(Map<String, Collection<String>> headers)
> 
>   {
> 
>     **this**.request.headers = (headers == **null** ? **new** FluentCaseInsensitiveStringsMap() : **new** FluentCaseInsensitiveStringsMap(headers));
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** T setContentLength(**int** length)
> 
>   {
> 
>     **this**.request.length = length;
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **private** **void** lazyInitCookies()
> 
>   {
> 
>     **if** (**this**.request.cookies == **null**) {
> 
>       **this**.request.cookies = **new** ArrayList(3);
> 
>     }
> 
>   }
> 
>   **public** T setCookies(Collection<Cookie> cookies)
> 
>   {
> 
>     **this**.request.cookies = **new** ArrayList(cookies);
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** T addCookie(Cookie cookie)
> 
>   {
> 
>     lazyInitCookies();
> 
>     **this**.request.cookies.add(cookie);
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** T addOrReplaceCookie(Cookie cookie)
> 
>   {
> 
>     String cookieKey = cookie.getName();
> 
>     **boolean** replace = **false**;
> 
>     **int** index = 0;
> 
>     lazyInitCookies();
> 
>     **for** (Cookie c : **this**.request.cookies)
> 
>     {
> 
>       **if** (c.getName().equals(cookieKey))
> 
>       {
> 
>         replace = **true**;
> 
>         **break**;
> 
>       }
> 
>       index++;
> 
>     }
> 
>     **if** (replace) {
> 
>       **this**.request.cookies.set(index, cookie);
> 
>     } **else** {
> 
>       **this**.request.cookies.add(cookie);
> 
>     }
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** **void** resetCookies()
> 
>   {
> 
>     **if** (**this**.request.cookies != **null**) {
> 
>       **this**.request.cookies.clear();
> 
>     }
> 
>   }
> 
>   **public** **void** resetQuery()
> 
>   {
> 
>     **this**.rbQueryParams = **null**;
> 
>     **this**.request.uri = **this**.request.uri.withNewQuery(**null**);
> 
>   }
> 
>   **public** **void** resetFormParams()
> 
>   {
> 
>     **this**.request.formParams = **null**;
> 
>   }
> 
>   **public** **void** resetNonMultipartData()
> 
>   {
> 
>     **this**.request.byteData = **null**;
> 
>     **this**.request.compositeByteData = **null**;
> 
>     **this**.request.stringData = **null**;
> 
>     **this**.request.streamData = **null**;
> 
>     **this**.request.bodyGenerator = **null**;
> 
>     **this**.request.length = -1L;
> 
>   }
> 
>   **public** **void** resetMultipartData()
> 
>   {
> 
>     **this**.request.parts = **null**;
> 
>   }
> 
>   **public** T setBody(File file)
> 
>   {
> 
>     **this**.request.file = file;
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** T setBody(**byte**\[\] data)
> 
>   {
> 
>     resetFormParams();
> 
>     resetNonMultipartData();
> 
>     resetMultipartData();
> 
>     **this**.request.byteData = data;
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** T setBody(List<**byte**\[\]\> data)
> 
>   {
> 
>     resetFormParams();
> 
>     resetNonMultipartData();
> 
>     resetMultipartData();
> 
>     **this**.request.compositeByteData = data;
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** T setBody(String data)
> 
>   {
> 
>     resetFormParams();
> 
>     resetNonMultipartData();
> 
>     resetMultipartData();
> 
>     **this**.request.stringData = data;
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** T setBody(InputStream stream)
> 
>   {
> 
>     resetFormParams();
> 
>     resetNonMultipartData();
> 
>     resetMultipartData();
> 
>     **this**.request.streamData = stream;
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** T setBody(BodyGenerator bodyGenerator)
> 
>   {
> 
>     **this**.request.bodyGenerator = bodyGenerator;
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** T addQueryParam(String name, String value)
> 
>   {
> 
>     **if** (**this**.rbQueryParams == **null**) {
> 
>       **this**.rbQueryParams = **new** ArrayList(1);
> 
>     }
> 
>     **this**.rbQueryParams.add(**new** Param(name, value));
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** T addQueryParams(List<Param> params)
> 
>   {
> 
>     **if** (**this**.rbQueryParams == **null**) {
> 
>       **this**.rbQueryParams = params;
> 
>     } **else** {
> 
>       **this**.rbQueryParams.addAll(params);
> 
>     }
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **private** List<Param> map2ParamList(Map<String, List<String>> map)
> 
>   {
> 
>     **if** (map == **null**) {
> 
>       **return** **null**;
> 
>     }
> 
>     List<Param> params = **new** ArrayList(map.size());
> 
>     **for** (Map.Entry<String, List<String>> entries : map.entrySet())
> 
>     {
> 
>       name = (String)entries.getKey();
> 
>       **for** (String value : (List)entries.getValue()) {
> 
>         params.add(**new** Param(name, value));
> 
>       }
> 
>     }
> 
>     String name;
> 
>     **return** params;
> 
>   }
> 
>   **public** T setQueryParams(Map<String, List<String>> map)
> 
>   {
> 
>     **return** setQueryParams(map2ParamList(map));
> 
>   }
> 
>   **public** T setQueryParams(List<Param> params)
> 
>   {
> 
>     **if** (MiscUtils.isNonEmpty(**this**.request.uri.getQuery())) {
> 
>       **this**.request.uri = **this**.request.uri.withNewQuery(**null**);
> 
>     }
> 
>     **this**.rbQueryParams = params;
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** T addFormParam(String name, String value)
> 
>   {
> 
>     resetNonMultipartData();
> 
>     resetMultipartData();
> 
>     **if** (**this**.request.formParams == **null**) {
> 
>       **this**.request.formParams = **new** ArrayList(1);
> 
>     }
> 
>     **this**.request.formParams.add(**new** Param(name, value));
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** T setFormParams(Map<String, List<String>> map)
> 
>   {
> 
>     **return** setFormParams(map2ParamList(map));
> 
>   }
> 
>   **public** T setFormParams(List<Param> params)
> 
>   {
> 
>     resetNonMultipartData();
> 
>     resetMultipartData();
> 
>     **this**.request.formParams = params;
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** T addBodyPart(Part part)
> 
>   {
> 
>     resetFormParams();
> 
>     resetNonMultipartData();
> 
>     **if** (**this**.request.parts == **null**) {
> 
>       **this**.request.parts = **new** ArrayList();
> 
>     }
> 
>     **this**.request.parts.add(part);
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** T setProxyServer(ProxyServer proxyServer)
> 
>   {
> 
>     **this**.request.proxyServer = proxyServer;
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** T setRealm(Realm realm)
> 
>   {
> 
>     **this**.request.realm = realm;
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** T setFollowRedirects(**boolean** followRedirects)
> 
>   {
> 
>     **this**.request.followRedirects = Boolean.valueOf(followRedirects);
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** T setRequestTimeout(**int** requestTimeout)
> 
>   {
> 
>     **this**.request.requestTimeout = requestTimeout;
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** T setRangeOffset(**long** rangeOffset)
> 
>   {
> 
>     **this**.request.rangeOffset = rangeOffset;
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** T setMethod(String method)
> 
>   {
> 
>     **this**.request.method = method;
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** T setBodyEncoding(String charset)
> 
>   {
> 
>     **this**.request.charset = charset;
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** T setConnectionPoolKeyStrategy(ConnectionPoolPartitioning connectionPoolKeyStrategy)
> 
>   {
> 
>     **this**.request.connectionPoolPartitioning = connectionPoolKeyStrategy;
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** T setNameResolver(NameResolver nameResolver)
> 
>   {
> 
>     **this**.request.nameResolver = nameResolver;
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **public** T setSignatureCalculator(SignatureCalculator signatureCalculator)
> 
>   {
> 
>     **this**.signatureCalculator = signatureCalculator;
> 
>     **return** (RequestBuilderBase)**this**.derived.cast(**this**);
> 
>   }
> 
>   **private** **void** executeSignatureCalculator()
> 
>   {
> 
>     **if** (**this**.signatureCalculator != **null**)
> 
>     {
> 
>       RequestBuilder rb = (RequestBuilder)**new** RequestBuilder(**this**.request).setSignatureCalculator(**null**);
> 
>       rb.rbQueryParams = **this**.rbQueryParams;
> 
>       Request unsignedRequest = rb.build();
> 
>       **this**.signatureCalculator.calculateAndAddSignature(unsignedRequest, **this**);
> 
>     }
> 
>   }
> 
>   **private** **void** computeRequestCharset()
> 
>   {
> 
>     **if** (**this**.request.charset == **null**) {
> 
>       **try**
> 
>       {
> 
>         String contentType = **this**.request.headers.getFirstValue("Content-Type");
> 
>         **if** (contentType != **null**)
> 
>         {
> 
>           String charset = AsyncHttpProviderUtils.parseCharset(contentType);
> 
>           **if** (charset != **null**) {
> 
>             **this**.request.charset = charset;
> 
>           }
> 
>         }
> 
>       }
> 
>       **catch** (Throwable localThrowable) {}
> 
>     }
> 
>   }
> 
>   **private** **void** computeRequestLength()
> 
>   {
> 
>     **if** ((**this**.request.length < 0L) && (**this**.request.streamData == **null**))
> 
>     {
> 
>       String contentLength = **this**.request.headers.getFirstValue("Content-Length");
> 
>       **if** (contentLength != **null**) {
> 
>         **try**
> 
>         {
> 
>           **this**.request.length = Long.parseLong(contentLength);
> 
>         }
> 
>         **catch** (NumberFormatException localNumberFormatException) {}
> 
>       }
> 
>     }
> 
>   }
> 
>   **private** **void** validateSupportedScheme(Uri uri)
> 
>   {
> 
>     String scheme = uri.getScheme();
> 
>     **if** ((scheme == **null**) || ((!scheme.equalsIgnoreCase("http")) && (!scheme.equalsIgnoreCase("https")) && (!scheme.equalsIgnoreCase("ws")) && 
> 
>       (!scheme.equalsIgnoreCase("wss")))) {
> 
>       **throw** **new** IllegalArgumentException("The URI scheme, of the URI " + uri + ", must be equal (ignoring case) to 'http', 'https', 'ws', or 'wss'");
> 
>     }
> 
>   }
> 
>   **private** **void** computeFinalUri()
> 
>   {
> 
>     **if** (**this**.request.uri == **null**)
> 
>     {
> 
>       logger.debug("setUrl hasn't been invoked. Using {}", DEFAULT\_REQUEST\_URL);
> 
>       **this**.request.uri = DEFAULT\_REQUEST\_URL;
> 
>     }
> 
>     **else**
> 
>     {
> 
>       validateSupportedScheme(**this**.request.uri);
> 
>     }
> 
>     **this**.request.uri = **this**.uriEncoder.encode(**this**.request.uri, **this**.rbQueryParams);
> 
>   }
> 
>   **public** Request build()
> 
>   {
> 
>     executeSignatureCalculator();
> 
>     computeFinalUri();
> 
>     computeRequestCharset();
> 
>     computeRequestLength();
> 
>     **return** **this**.request;
> 
>   }
> 
> }

(function(){ function setArticleH(btnReadmore,posi){ var winH = $(window).height(); var articleBox = $("div.article_content"); var artH = articleBox.height(); if(artH > winH\*posi){ articleBox.css({ 'height':winH\*posi+'px', 'overflow':'hidden' }) btnReadmore.click(function(){ articleBox.removeAttr("style"); $(this).parent().remove(); }) }else{ btnReadmore.parent().remove(); } } var btnReadmore = $("#btn-readmore"); if(btnReadmore.length>0){ if(currentUserName){ setArticleH(btnReadmore,3); }else{ setArticleH(btnReadmore,1.2); } } })()