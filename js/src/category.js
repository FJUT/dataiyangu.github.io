// build time:Thu Jan 31 2019 07:48:59 GMT+0800 (China Standard Time)
$(document).ready(function(){i();function i(){$(".category-list-link").filter(function(){return $(this).siblings(".category-list-child").length>0}).attr("href","javascript:void(0)");$(".category-list-link").click(function(){$(this).siblings(".category-list-child").slideToggle()});var i=$(window).width()/1.2;console.log(i);$(".category-list-link").animate({width:i},300)}});
//rebuild by neat 