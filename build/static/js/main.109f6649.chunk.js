(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{21:function(n,e,t){},39:function(n,e,t){"use strict";t.r(e);var c=t(0),o=t(1),u=t.n(o),a=t(14),r=t.n(a),i=(t(21),t(15)),l=t(3),s=function(n){var e=n.person,t=n.handleDelete;return Object(c.jsxs)("div",{children:[e.name," ",e.number," ",Object(c.jsx)("button",{onClick:t,children:"delete"})]})},d=function(n){var e=n.personsToShow,t=n.handleDeleteOf;return e.map((function(n){return Object(c.jsx)(s,{person:n,handleDelete:function(){return t(n.id)}},n.name)}))},f=function(n){var e=n.val,t=n.handle;return Object(c.jsx)("input",{value:e,onChange:t})},j=function(n){var e=n.onSubmit,t=n.nameVal,o=n.nameOnChng,u=n.numVal,a=n.numOnChng;return Object(c.jsxs)("form",{onSubmit:e,children:[Object(c.jsxs)("div",{children:["name: ",Object(c.jsx)("input",{value:t,onChange:o}),Object(c.jsx)("br",{}),"number: ",Object(c.jsx)("input",{value:u,onChange:a})]}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",children:"add"})})]})},b=t(4),h=t.n(b),m="/api/persons",O=function(){return h.a.get(m).then((function(n){return n.data}))},v=function(n){return h.a.post(m,n).then((function(n){return n.data}))},p=function(n,e){return h.a.put("".concat(m,"/").concat(n),e).then((function(n){return n.data}))},x=function(n,e){return h.a.delete("".concat(m,"/").concat(n),e).then((function(n){return n.data}))},g=function(n){var e=n.message;return null===e?null:Object(c.jsx)("div",{className:"error",children:e})},w=function(){var n=Object(o.useState)([]),e=Object(l.a)(n,2),t=e[0],u=e[1],a=Object(o.useState)(""),r=Object(l.a)(a,2),s=r[0],b=r[1],h=Object(o.useState)(""),m=Object(l.a)(h,2),w=m[0],S=m[1],C=Object(o.useState)(!1),T=Object(l.a)(C,1)[0],D=Object(o.useState)(""),k=Object(l.a)(D,2),F=k[0],y=k[1],V=Object(o.useState)(null),L=Object(l.a)(V,2),P=L[0],B=L[1];Object(o.useEffect)((function(){O().then((function(n){u(n)}))}),[]);var E=T?t:t.filter((function(n){return n.name.toLowerCase().includes(F)}));return Object(c.jsxs)("div",{children:[Object(c.jsx)(g,{message:P}),Object(c.jsx)("h2",{children:"Phonebook"}),Object(c.jsxs)("div",{children:["Filter phonebook: ",Object(c.jsx)(f,{val:F,handle:function(n){y(n.target.value)}})]}),Object(c.jsx)("h3",{children:"Add new person"}),Object(c.jsx)(j,{onSubmit:function(n){n.preventDefault();var e={name:s,number:w};if(t.map((function(n){return n.name})).includes(s)){if(window.confirm("".concat(s," is already added to phonebook, replace the old number with a new one?"))){var c=t.find((function(n){return n.name===s})),o=c.id;console.log(c,o),p(o,e).then((function(n){console.log(n),u(t.map((function(e){return e.id!==o?e:n}))),B("".concat(s," was modified!")),setTimeout((function(){B(null)}),2e3)})).catch((function(n){console.log(n),B("".concat(s," has been removed by someone!")),setTimeout((function(){B(null)}),2e3),u(t.filter((function(n){return n.id!==o})))}))}}else v(e).then((function(n){u(t.concat(n)),B("".concat(s," was added!")),setTimeout((function(){B(null)}),2e3)})).catch((function(n){B("".concat(n.response.data.error)),setTimeout((function(){B(null)}),5e3)}));b(""),S("")},nameVal:s,nameOnChng:function(n){b(n.target.value)},numVal:w,numOnChng:function(n){S(n.target.value)}}),Object(c.jsx)("h3",{children:"Numbers"}),Object(c.jsx)(d,{personsToShow:E,handleDeleteOf:function(n){var e=t.find((function(e){return e.id===n})).name;if(window.confirm("Delete ".concat(e,"?"))){var c=t.find((function(e){return e.id===n})),o=Object(i.a)({},c);x(n,o).then(u(t.filter((function(e){return e.id!==n}))))}}})]})},S=function(n){n&&n instanceof Function&&t.e(3).then(t.bind(null,40)).then((function(e){var t=e.getCLS,c=e.getFID,o=e.getFCP,u=e.getLCP,a=e.getTTFB;t(n),c(n),o(n),u(n),a(n)}))};r.a.render(Object(c.jsx)(u.a.StrictMode,{children:Object(c.jsx)(w,{})}),document.getElementById("root")),S()}},[[39,1,2]]]);
//# sourceMappingURL=main.109f6649.chunk.js.map