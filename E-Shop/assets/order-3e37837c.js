import{$ as e}from"./index-6ff172c9.js";const o=r=>e({url:"/member/order",method:"GET",params:r}),n=r=>e({url:`/member/order/${r}`,method:"GET"}),m=r=>e({url:`/member/order/${r}/cancel`,method:"PUT",data:{cancelReason:""}}),d=r=>e({url:`/member/order/consignment/${r}`,method:"GET"}),a=r=>e({url:`/member/order/${r}/receipt`,method:"PUT"}),s=r=>e({url:"/member/order",method:"DELETE",data:{ids:r}});export{m as C,s as D,o as G,d as S,a,n as b};
