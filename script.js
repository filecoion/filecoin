$(document).ready(function () {
   var addbutton=$("#add_button");
   addbutton.on("mousedown",function () {
       var msg=prompt("请输入或粘贴你的ETH钱包地址");
       alert(msg);
   });

    var clipboard = new Clipboard('#copyaddr');

    clipboard.on('success', function (e) {
        alert("复制成功，请粘贴到你的QQ/微信上推荐给你的好友");
    });

    clipboard.on('error', function (e) {
        alert(e);
    });

    var copybutton=$("#copyaddr");
    copybutton.on("mousedown",function () {
        $(this).attr("data-clipboard-text",$("#ethaddr").text());
   })
});