/* empty css             *//* empty css               */import{_ as p,a3 as d,r as i,o as u,c as m,a as e,e as a,t as f,b as l,d as o,w as s,p as y,g as h}from"./index-6ff172c9.js";import{E as x}from"./index-1ce73683.js";const n=t=>(y("data-v-ea1084f3"),t=t(),h(),t),v={class:"container"},k={class:"pay-result"},B=n(()=>e("span",{class:"iconfont icon-queren2 green"},null,-1)),I=n(()=>e("p",{class:"tit"},"支付成功",-1)),g=n(()=>e("p",{class:"tip"},"可至我的订单进行模拟发货等后续操作~",-1)),E=n(()=>e("p",null,[a("支付方式："),e("span",null,"E-Pay")],-1)),P={class:"btn"},S={__name:"PayBack-index",setup(t){const c=d();return(b,q)=>{const _=x,r=i("RouterLink");return u(),m("div",null,[e("div",v,[e("div",k,[B,I,g,E,e("p",null,[a(" 支付金额："),e("span",null,"¥"+f(l(c).query.money),1)]),e("div",P,[o(r,{replace:"",to:`/order/${l(c).query.orderId}`},{default:s(()=>[o(_,{type:"primary",style:{"margin-right":"20px"}},{default:s(()=>[a("查看订单")]),_:1})]),_:1},8,["to"]),o(r,{replace:"",to:"/"},{default:s(()=>[o(_,null,{default:s(()=>[a("进入首页")]),_:1})]),_:1})])])])])}}},C=p(S,[["__scopeId","data-v-ea1084f3"]]);export{C as default};
