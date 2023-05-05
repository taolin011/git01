//先引入mockjs模块
import Mock from 'mockjs';
//引入mock数据
//webpack默认对外暴露的：图片，json数据格式
import banner from './banner.json';
import floor from './floor.json';
//mock数据：第一个参数：请求路径，第二个参数：请求方式，第三个参数：请求数据
Mock.mock('/mock/banner',{code:200,data:banner});
Mock.mock('/mock/floor',{code:200,data:floor});

let phoneCode=Mock.mock({
    "userInfo":"@string('number',5)"
})

Mock.mock('/mock/user',"post",(data)=>{
    console.log("mockcode",phoneCode.userInfo);
    return {code:200,message:"mockcode请求成功",data:phoneCode}
});
Mock.mock('/mock/register',"post",(data)=>{
    console.log(data);
    let item=JSON.parse(data.body);
    let username=item.phone;
    let code=item.code;
    let password=item.password;
    console.log('item:',item)
    if(code==phoneCode.userInfo){
        console.log("注册成功");
        return {code:200,message:"mockRegister请求成功",data:{}}
        
    }else{
        console.log("注册失败",code,phoneCode.userInfo);
        return {code:201,message:"mockRegister请求失败",data:{}}}
});