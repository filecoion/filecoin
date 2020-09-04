$(document).ready(function () {
   var addbutton=$("#add_button");
   addbutton.on("click",function () {
       var msg=prompt("请输入或粘贴你的ETH钱包地址");
       alert(msg);
   })
});