(this["webpackJsonptweetme2-web"]=this["webpackJsonptweetme2-web"]||[]).push([[0],{12:function(e,t,n){},13:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var c=n(1),s=n.n(c),a=n(6),r=n.n(a),i=(n(12),n.p+"static/media/logo.6ce24c58.svg"),o=(n(13),n(7)),l=n(2);var j=n(0);function u(e){var t=s.a.createRef(),n=Object(c.useState)([]),a=Object(l.a)(n,2),r=a[0],i=a[1];return Object(j.jsxs)("div",{className:e.className,children:[Object(j.jsx)("div",{className:"col-12 mb-3",children:Object(j.jsxs)("form",{onSubmit:function(e){e.preventDefault();var n=t.current.value,c=Object(o.a)(r);c.unshift({content:n,likes:0,id:50}),i(c),t.current.value=""},children:[Object(j.jsx)("textarea",{ref:t,required:!0,className:"form-control"}),Object(j.jsx)("button",{type:"submit",className:"btn btn-primary my-3",children:"Tweet"})]})}),Object(j.jsx)(b,{newTweets:r})]})}function b(e){var t=Object(c.useState)([]),n=Object(l.a)(t,2),s=n[0],a=n[1],r=Object(c.useState)([]),i=Object(l.a)(r,2),u=i[0],b=i[1];return Object(c.useEffect)((function(){console.log("useEffect for insert new tweets - run more then one time");var t=Object(o.a)(e.newTweets).concat(s);t.length!==u.length&&b(t)}),[e.newTweets,u,s]),Object(c.useEffect)((function(){!function(e){var t=new XMLHttpRequest;t.responseType="json",t.open("GET","http://localhost:8000/api/tweets/"),t.onload=function(){e(t.response,t.status)},t.onerror=function(t){console.log(t),e({message:"The request was an error"},400)},t.send()}((function(e,t){200===t?a(e):alert("There was an error")}))}),[]),u.map((function(e,t){return Object(j.jsx)(m,{tweet:e,className:"my-5 py-5 border bg-white text-dark"},"".concat(t,"-{item.id}"))}))}function d(e){var t=e.tweet,n=e.action,s=Object(c.useState)(t.likes?t.likes:0),a=Object(l.a)(s,2),r=a[0],i=a[1],o=Object(c.useState)(!0===t.userLike),u=Object(l.a)(o,2),b=u[0],d=u[1],m=e.className?e.className:"btn btn-primary btn-sm",p=n.display?n.display:"Action",O="like"===n.type?"".concat(r," ").concat(p):p;return Object(j.jsx)("button",{className:m,onClick:function(e){e.preventDefault(),"like"===n.type&&(!0===b?(i(r-1),d(!1)):(i(t.likes+1),d(!0)))},children:O})}function m(e){var t=e.tweet,n=e.className?e.className:"col-10 mx-auto col-md-6";return Object(j.jsxs)("div",{className:n,children:[Object(j.jsxs)("p",{children:[t.id," - ",t.content]}),Object(j.jsxs)("div",{className:"btn btn-group",children:[Object(j.jsx)(d,{tweet:t,action:{type:"like",display:"Likes"}}),Object(j.jsx)(d,{tweet:t,action:{type:"unlike",display:"Unlike"}}),Object(j.jsx)(d,{tweet:t,action:{type:"retweet",display:"Retweet"}})]})]})}var p=function(){return Object(j.jsx)("div",{className:"App",children:Object(j.jsxs)("header",{className:"App-header",children:[Object(j.jsx)("img",{src:i,className:"App-logo",alt:"logo"}),Object(j.jsxs)("p",{children:["Edit ",Object(j.jsx)("code",{children:"src/App.js"})," and save to reload."]}),Object(j.jsx)("div",{children:Object(j.jsx)(u,{})})]})})},O=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,16)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,a=t.getLCP,r=t.getTTFB;n(e),c(e),s(e),a(e),r(e)}))},f=document.getElementById("root");f&&r.a.render(Object(j.jsx)(p,{}),f);var h=document.getElementById("tweetme-2");h&&r.a.render(Object(j.jsx)(u,{}),h),O()}},[[15,1,2]]]);
//# sourceMappingURL=main.96c9dcf0.chunk.js.map