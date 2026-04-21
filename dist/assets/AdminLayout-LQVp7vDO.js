import{j as e}from"./ui-vendor-Bw974icb.js";import{P as h}from"./profile-menu-tkq6FF-M.js";import{r as m,j as x,i as p,O as u}from"./router-vendor-C3CjdVJT.js";import{f as y,E as b}from"./index-CU7uJVvQ.js";import{u as j}from"./useRestoreUserByToken-D6sP7bwL.js";import{T as g}from"./ThemeLanguage-BX_F9Plf.js";import{B as d}from"./api.generated-DzyC09ai.js";import{U as v,I as N,L as k}from"./Link-CpXTV5k9.js";import{u as w,L as i}from"./useTranslation-VrRRv5wI.js";import{c as l}from"./createLucideIcon-BcbeP2tU.js";import{L}from"./layout-dashboard-CgvaSuE0.js";import{U as _}from"./users-DVb_gGjT.js";import{B as C}from"./book-open-DGQZWIVj.js";import{V as I}from"./video-ByWWj2Ej.js";import"./TriggerLanguage-CQMR6N1u.js";import"./utils-BLSKlp9E.js";import"./check-CfAAS19h.js";import"./book-marked-CqPYBDy4.js";import"./arrow-right-left-C_YzLgqh.js";import"./react-vendor-aJro3NIy.js";import"./hooks-DkTdyOA4.js";/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]],E=l("credit-card",z);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"m16 15-3-3 3-3",key:"14y99z"}]],P=l("panel-left-close",O);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"m14 9 3 3-3 3",key:"8010ee"}]],B=l("panel-left-open",T);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=[["path",{d:"M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z",key:"1bo67w"}],["rect",{x:"3",y:"14",width:"7",height:"7",rx:"1",key:"1bkyp8"}],["circle",{cx:"17.5",cy:"17.5",r:"3.5",key:"w3z12y"}]],M=l("shapes",D),U=[{href:"/admin",label:"Dashboard",icon:L},{href:"/admin/users",label:"Users",icon:_},{href:"/admin/courses",label:"Courses",icon:C},{href:"/admin/videos",label:"Videos",icon:I},{href:"/admin/payments",label:"Payments",icon:E},{href:"/admin/enrollments",label:"Enrollments",icon:v},{href:"/admin/images",label:"Images",icon:N},{href:"/admin/categories",label:"Categories",icon:M}],$=({navItems:c,pathname:r})=>{const[s,o]=m.useState(!1),a=c??U,{t:n}=w();return e.jsxs(e.Fragment,{children:[e.jsx(d,{className:"md:hidden m-4 fixed",variant:"outline",onClick:()=>o(!0),children:e.jsx(B,{})}),s&&e.jsx("button",{className:"fixed inset-0 bg-black/50 z-40 md:hidden",onClick:()=>o(!1)}),e.jsx("aside",{className:`
          fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50
          transform transition-transform duration-300 ease-in-out
          ${s?"translate-x-0":"-translate-x-full"} 
          md:translate-x-0 md:static md:h-auto
        `,children:e.jsxs("div",{className:"flex flex-col h-full",children:[e.jsxs("div",{className:"p-6 border-b border-border flex justify-between items-center",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"text-2xl font-bold text-foreground",children:n(i("form","admin_panel"))}),e.jsx("p",{className:"text-sm text-muted-foreground mt-1",children:n(i("form","system"))})]}),e.jsx(d,{className:"md:hidden p-2",variant:"outline",onClick:()=>o(!1),children:e.jsx(P,{})})]}),e.jsx("nav",{className:"flex-1 overflow-y-auto p-4",children:e.jsx("div",{className:"space-y-2",children:a==null?void 0:a.map(t=>{const f=t.icon;return e.jsxs(k,{href:t.href,isActive:r===t.href,children:[e.jsx(f,{className:"h-5 w-5"}),n(i("admin_nav",t.label))]},t.href)})})}),e.jsx("div",{className:"p-4 border-t border-border",children:e.jsx(d,{variant:"outline",className:"w-full",children:n(i("loginPage","logout"))})})]})})]})};function ne(){const{pathname:c}=x(),r=p(),{currentData:s,isLoading:o}=j(),a=y.get("accessToken");return m.useEffect(()=>{a||r("/",{replace:!0}),s&&s&&(s==null?void 0:s.role)!=b.ADMIN&&r("/",{replace:!0})},[s,r,a]),o?e.jsx(e.Fragment,{children:"loading ..."}):e.jsxs("div",{className:"flex h-screen bg-background",children:[e.jsx($,{pathname:c}),e.jsxs("main",{className:"flex-1 overflow-y-auto",children:[e.jsxs("div",{className:"flex flex-grow flex-row justify-self-end mr-4 mt-4",children:[e.jsx(g,{className:"w-[100px]"}),e.jsx(h,{})]}),e.jsx("div",{className:"p-8",children:e.jsx(u,{})})]})]})}export{ne as default};
