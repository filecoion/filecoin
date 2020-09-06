function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function setCookie (name, value) {
    if (value) {
        var days = 30; //定义一天
        var exp = new Date();
        exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
// 写入Cookie, toGMTString将时间转换成字符串
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString;
    }
};

/**
 * cookie中取值
 * */
function getCookie (name) {
    var arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //匹配字段
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return null;
    }
};

var baseUrl="https://api-ivyf.trilobite.ltd/api"

function add(ethaddr,parentCode){
    $.post(baseUrl+"/dappUser/add",{addr:ethaddr,parentCode:parentCode},function (s) {
        console.log(s);
        if(s["code"]==-1){
            alert("找不到当前推荐人");
        }
        if(s["code"]==-2){
            alert("ETH地址不能为空");
        }
        if(s["code"]==-3){
            alert("已存在当前ETH地址，请更换加入,如果你清除了缓存，系统自动切换当前地址的用户为你显示");
            setCookie("code",s["data"].code);
            document.location.reload();
        }
        if(s["code"]==200){
            setCookie("code",s["data"].code);
            document.location.reload();
        }
    })
}

function getAccount(code){
    $.post(baseUrl+"/dappUser/findParentCount",{code:code},function (s) {
        alert("注册获取0.1FIL,推荐人"+s["data"]+"人，推荐获取"+(0.1*s["data"])+"FIL");
    })
}



$(document).ready(function () {
   var addbutton=$("#add_button");
    var my_button=$("#my_button");
    var tuj_button=$("#tuj_button");
   //获取url
   var parentCode=getQueryString("code");
   if(getCookie("code")){
       console.log(getCookie("code"))
       addbutton.hide();
       my_button.show();
       tuj_button.show();
       var clipboardtujian = new Clipboard('#tuj_button');

       clipboardtujian.on('success', function (e) {
           alert("复制成功，请粘贴到你的QQ/微信上推荐给你的好友");
       });

       clipboardtujian.on('error', function (e) {
           alert(e);
       });
       tuj_button.on("mousedown",function () {
           $(this).attr("data-clipboard-text","复制当前地址到浏览器打开："+window.location.protocol+"//"+window.location.host+"/filecoin/index.html?code="+getCookie("code"));
       })

       my_button.on("mousedown",function () {
           getAccount(getCookie("code"))
       })
   }else{
       addbutton.on("mousedown",function () {
           var msg=prompt("请输入或粘贴你的ETH钱包地址");
           add(msg,parentCode);
       });
   }




    var clipboard = new Clipboard('#copyaddr');

    clipboard.on('success', function (e) {
        alert("复制成功，请粘贴到你钱宝进行充值。");
    });

    clipboard.on('error', function (e) {
        alert(e);
    });

    var copybutton=$("#copyaddr");
    copybutton.on("mousedown",function () {
        $(this).attr("data-clipboard-text",$("#ethaddr").text());
   })
});