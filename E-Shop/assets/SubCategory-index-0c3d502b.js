/* empty css             */import{v as V}from"./loading-768be197.js";import{E as G,a as P}from"./breadcrumb-item-ab243313.js";import{b as z,c as N}from"./category-00be04ac.js";import{a4 as M,a5 as L,_ as R,h as v,a3 as k,r as U,I as D,o as f,c as m,a as A,d as g,w as h,t as E,n as I,F as j,l as q,e as T,m as K}from"./index-6ff172c9.js";import{t as Y}from"./error-78e43d3e.js";import{g as $}from"./scroll-23b79392.js";import{t as B}from"./throttle-8d3b8ec0.js";import"./debounce-c7ad9d3e.js";const H=e=>{let t=0,o=e;for(;o;)t+=o.offsetTop,o=o.offsetParent;return t},J=(e,t)=>Math.abs(H(e)-H(t)),c="ElInfiniteScroll",Q=50,W=200,X=0,Z={delay:{type:Number,default:W},distance:{type:Number,default:X},disabled:{type:Boolean,default:!1},immediate:{type:Boolean,default:!0}},C=(e,t)=>Object.entries(Z).reduce((o,[n,r])=>{var u,s;const{type:d,default:a}=r,i=e.getAttribute(`infinite-scroll-${n}`);let l=(s=(u=t[i])!=null?u:i)!=null?s:a;return l=l==="false"?!1:l,l=d(l),o[n]=Number.isNaN(l)?a:l,o},{}),F=e=>{const{observer:t}=e[c];t&&(t.disconnect(),delete e[c].observer)},ee=(e,t)=>{const{container:o,containerEl:n,instance:r,observer:u,lastScrollTop:s}=e[c],{disabled:d,distance:a}=C(e,r),{clientHeight:i,scrollHeight:l,scrollTop:_}=n,y=_-s;if(e[c].lastScrollTop=_,u||d||y<0)return;let p=!1;if(o===e)p=l-(i+_)<=a;else{const{clientTop:S,scrollHeight:b}=e,O=J(e,n);p=_+i>=O+S+b-a}p&&t.call(r)};function w(e,t){const{containerEl:o,instance:n}=e[c],{disabled:r}=C(e,n);r||o.clientHeight===0||(o.scrollHeight<=o.clientHeight?t.call(n):F(e))}const te={async mounted(e,t){const{instance:o,value:n}=t;M(n)||Y(c,"'v-infinite-scroll' binding value must be a function"),await L();const{delay:r,immediate:u}=C(e,o),s=$(e,!0),d=s===window?document.documentElement:s,a=B(ee.bind(null,e,n),r);if(s){if(e[c]={instance:o,container:s,containerEl:d,delay:r,cb:n,onScroll:a,lastScrollTop:d.scrollTop},u){const i=new MutationObserver(B(w.bind(null,e,n),Q));e[c].observer=i,i.observe(e,{childList:!0,subtree:!0}),w(e,n)}s.addEventListener("scroll",a)}},unmounted(e){const{container:t,onScroll:o}=e[c];t==null||t.removeEventListener("scroll",o),F(e)},async updated(e){if(!e[c])await L();else{const{containerEl:t,cb:o,observer:n}=e[c];t.clientHeight&&n&&w(e,o)}}},x=te;x.install=e=>{e.directive("InfiniteScroll",x)};const oe=x;const ne={class:"container"},se={class:"bread-container"},ae={class:"sub-container"},re={key:0,style:{"text-align":"center","font-size":"28px","font-weight":"600",color:"#ff6600d0",margin:"25px","margin-top":"15px"}},le=["infinite-scroll-disabled"],ie={key:1},ce={key:2},de={__name:"SubCategory-index",setup(e){const t=v({}),o=v(!0),n=v([]),r={categoryId:k().params.id,page:1,pageSize:20,sortField:"publishTime"};(async()=>{try{const a=await z(k().params.id);t.value=a.result;const i=await N(r);n.value=i.result.items}catch{}o.value=!1})();const s=v(!1),d=async()=>{r.page++;const a=await N(r);n.value=[...n.value,...a.result.items],a.result.items.length===0&&(s.value=!0)};return(a,i)=>{const l=P,_=G,y=U("GoodsItem"),p=oe,S=V;return D((f(),m("div",ne,[A("div",se,[g(_,{separator:">"},{default:h(()=>[g(l,null,{default:h(()=>[T("首页")]),_:1}),g(l,null,{default:h(()=>[T(E(t.value.parentName),1)]),_:1}),g(l,null,{default:h(()=>[T(E(t.value.name),1)]),_:1})]),_:1})]),A("div",ae,[o.value?I("",!0):(f(),m("div",re," ——  "+E(t.value.name)+"  —— ",1)),D((f(),m("div",{class:"body","infinite-scroll-disabled":s.value},[(f(!0),m(j,null,q(n.value,b=>(f(),K(y,{goods:b,key:b.id},null,8,["goods"]))),128))],8,le)),[[p,d]]),s.value?I("",!0):(f(),m("p",ie,"Loading...")),s.value?(f(),m("p",ce,"已经到底啦~")):I("",!0)])])),[[S,o.value,void 0,{fullscreen:!0,lock:!0}]])}}},ye=R(de,[["__scopeId","data-v-0bdb78aa"]]);export{ye as default};