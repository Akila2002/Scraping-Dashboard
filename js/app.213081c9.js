(function(){"use strict";var t={4640:function(t,e,r){var a=r(5130),n=r(6768);const o={id:"app"};function i(t,e,r,a,i,s){const c=(0,n.g2)("Dashboard");return(0,n.uX)(),(0,n.CE)("div",o,[(0,n.bF)(c)])}var s=r(4232);const c=t=>((0,n.Qi)("data-v-913c8e6a"),t=t(),(0,n.jt)(),t),l={class:"dashboard"},u=c((()=>(0,n.Lk)("h1",null,"Website Scraper Dashboard",-1))),d={class:"input-container"},p={class:"pagination"},h=["disabled"],f=["disabled"];function g(t,e,r,o,i,c){return(0,n.uX)(),(0,n.CE)("div",l,[u,(0,n.Lk)("div",d,[(0,n.bo)((0,n.Lk)("input",{"onUpdate:modelValue":e[0]||(e[0]=t=>i.url=t),type:"text",placeholder:"Enter URL"},null,512),[[a.Jo,i.url]]),(0,n.Lk)("button",{onClick:e[1]||(e[1]=(...t)=>c.addUrl&&c.addUrl(...t))},"Add URL")]),(0,n.Lk)("button",{onClick:e[2]||(e[2]=(...t)=>c.fetchScrapedData&&c.fetchScrapedData(...t))},"Fetch Scraped Data"),(0,n.Lk)("table",null,[(0,n.Lk)("thead",null,[(0,n.Lk)("tr",null,[(0,n.Lk)("th",{scope:"col",onClick:e[3]||(e[3]=t=>c.sort("url"))},"URL"),(0,n.Lk)("th",{scope:"col",onClick:e[4]||(e[4]=t=>c.sort("title"))},"Title"),(0,n.Lk)("th",{scope:"col",onClick:e[5]||(e[5]=t=>c.sort("description"))},"Description")])]),(0,n.Lk)("tbody",null,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(c.paginatedData,(t=>((0,n.uX)(),(0,n.CE)("tr",{key:t.id},[(0,n.Lk)("td",null,(0,s.v_)(t.url),1),(0,n.Lk)("td",null,(0,s.v_)(t.title),1),(0,n.Lk)("td",null,(0,s.v_)(t.description),1)])))),128))])]),(0,n.Lk)("div",p,[(0,n.Lk)("button",{onClick:e[6]||(e[6]=(...t)=>c.prevPage&&c.prevPage(...t)),disabled:1===i.page},"Previous",8,h),(0,n.Lk)("span",null,"Page "+(0,s.v_)(i.page)+" of "+(0,s.v_)(c.totalPages),1),(0,n.Lk)("button",{onClick:e[7]||(e[7]=(...t)=>c.nextPage&&c.nextPage(...t)),disabled:i.page===c.totalPages},"Next",8,f)])])}r(4114);var v=r(4373),b={name:"ScraperDashboard",data(){return{url:"",scrapedData:[],page:1,perPage:5,sortKey:"",sortOrder:"asc"}},computed:{sortedData(){return[...this.scrapedData].sort(((t,e)=>"asc"===this.sortOrder?t[this.sortKey]>e[this.sortKey]?1:-1:t[this.sortKey]<e[this.sortKey]?1:-1))},paginatedData(){const t=(this.page-1)*this.perPage,e=t+this.perPage;return this.sortedData.slice(t,e)},totalPages(){return Math.ceil(this.scrapedData.length/this.perPage)}},methods:{addUrl(){this.url&&v.A.post("/api/scrape",{url:this.url}).then((t=>{const e={id:t.data.id,url:t.data.url,title:t.data.title,description:t.data.description};this.scrapedData.push(e),this.url=""})).catch((t=>{console.error(t)}))},fetchScrapedData(){v.A.get("/api/scrapedData").then((t=>{this.scrapedData=t.data})).catch((t=>{console.error(t)}))},sort(t){this.sortKey===t?this.sortOrder="asc"===this.sortOrder?"desc":"asc":(this.sortKey=t,this.sortOrder="asc")},prevPage(){this.page>1&&this.page--},nextPage(){this.page<this.totalPages&&this.page++}},mounted(){this.fetchScrapedData()}},k=r(1241);const y=(0,k.A)(b,[["render",g],["__scopeId","data-v-913c8e6a"]]);var L=y,D={name:"App",components:{Dashboard:L}};const P=(0,k.A)(D,[["render",i]]);var O=P;(0,a.Ef)(O).mount("#app")}},e={};function r(a){var n=e[a];if(void 0!==n)return n.exports;var o=e[a]={exports:{}};return t[a].call(o.exports,o,o.exports,r),o.exports}r.m=t,function(){var t=[];r.O=function(e,a,n,o){if(!a){var i=1/0;for(u=0;u<t.length;u++){a=t[u][0],n=t[u][1],o=t[u][2];for(var s=!0,c=0;c<a.length;c++)(!1&o||i>=o)&&Object.keys(r.O).every((function(t){return r.O[t](a[c])}))?a.splice(c--,1):(s=!1,o<i&&(i=o));if(s){t.splice(u--,1);var l=n();void 0!==l&&(e=l)}}return e}o=o||0;for(var u=t.length;u>0&&t[u-1][2]>o;u--)t[u]=t[u-1];t[u]=[a,n,o]}}(),function(){r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,{a:e}),e}}(),function(){r.d=function(t,e){for(var a in e)r.o(e,a)&&!r.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={524:0};r.O.j=function(e){return 0===t[e]};var e=function(e,a){var n,o,i=a[0],s=a[1],c=a[2],l=0;if(i.some((function(e){return 0!==t[e]}))){for(n in s)r.o(s,n)&&(r.m[n]=s[n]);if(c)var u=c(r)}for(e&&e(a);l<i.length;l++)o=i[l],r.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return r.O(u)},a=self["webpackChunkscraping_dashboard"]=self["webpackChunkscraping_dashboard"]||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))}();var a=r.O(void 0,[504],(function(){return r(4640)}));a=r.O(a)})();
//# sourceMappingURL=app.213081c9.js.map