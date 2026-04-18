import{j as e}from"./ui-vendor-Bw974icb.js";import{P as m}from"./profile-menu-Dw__4hEq.js";import{r as c,j as f,i as h,O as x}from"./router-vendor-C3CjdVJT.js";import{f as p,E as u}from"./index-BADv00Jy.js";import{u as y}from"./useRestoreUserByToken-HZsuyGP-.js";import{T as b}from"./ThemeLanguage-C9t64uh3.js";import{B as l}from"./api.generated-Bo05mmlX.js";import{U as j,I as g,L as k}from"./Link-BrT_KYM8.js";import{c as n}from"./createLucideIcon-BcbeP2tU.js";import{L as v}from"./layout-dashboard-CgvaSuE0.js";import{U as N}from"./users-DVb_gGjT.js";import{B as w}from"./book-open-DGQZWIVj.js";import{V as L}from"./video-ByWWj2Ej.js";import"./TriggerLanguage-BwrMIxGT.js";import"./utils-BLSKlp9E.js";import"./check-CfAAS19h.js";import"./useTranslation-BUY7COZu.js";import"./book-marked-CqPYBDy4.js";import"./arrow-right-left-C_YzLgqh.js";import"./react-vendor-aJro3NIy.js";import"./hooks-BEp4yUxY.js";/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]],_=n("credit-card",C);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"m16 15-3-3 3-3",key:"14y99z"}]],E=n("panel-left-close",I);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"m14 9 3 3-3 3",key:"8010ee"}]],O=n("panel-left-open",M);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=[["path",{d:"M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z",key:"1bo67w"}],["rect",{x:"3",y:"14",width:"7",height:"7",rx:"1",key:"1bkyp8"}],["circle",{cx:"17.5",cy:"17.5",r:"3.5",key:"w3z12y"}]],z=n("shapes",P),B=[{href:"/admin",label:"Dashboard",icon:v},{href:"/admin/users",label:"Users",icon:N},{href:"/admin/courses",label:"Courses",icon:w},{href:"/admin/videos",label:"Videos",icon:L},{href:"/admin/payments",label:"Payments",icon:_},{href:"/admin/enrollments",label:"Enrollments",icon:j},{href:"/admin/images",label:"Images",icon:g},{href:"/admin/categories",label:"Categories",icon:z}],D=({navItems:i,pathname:r})=>{const[s,t]=c.useState(!1),a=i??B;return e.jsxs(e.Fragment,{children:[e.jsx(l,{className:"md:hidden m-4 fixed",variant:"outline",onClick:()=>t(!0),children:e.jsx(O,{})}),s&&e.jsx("button",{className:"fixed inset-0 bg-black/50 z-40 md:hidden",onClick:()=>t(!1)}),e.jsx("aside",{className:`
          fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50
          transform transition-transform duration-300 ease-in-out
          ${s?"translate-x-0":"-translate-x-full"} 
          md:translate-x-0 md:static md:h-auto
        `,children:e.jsxs("div",{className:"flex flex-col h-full",children:[e.jsxs("div",{className:"p-6 border-b border-border flex justify-between items-center",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"text-2xl font-bold text-foreground",children:"Admin Panel"}),e.jsx("p",{className:"text-sm text-muted-foreground mt-1",children:"Course Management"})]}),e.jsx(l,{className:"md:hidden p-2",variant:"outline",onClick:()=>t(!1),children:e.jsx(E,{})})]}),e.jsx("nav",{className:"flex-1 overflow-y-auto p-4",children:e.jsx("div",{className:"space-y-2",children:a==null?void 0:a.map(o=>{const d=o.icon;return e.jsxs(k,{href:o.href,isActive:r===o.href,children:[e.jsx(d,{className:"h-5 w-5"}),o.label]},o.href)})})})]})})]})};function re(){const{pathname:i}=f(),r=h(),{currentData:s,isLoading:t}=y(),a=p.get("accessToken");return c.useEffect(()=>{a||r("/",{replace:!0}),s&&s&&(s==null?void 0:s.role)!=u.ADMIN&&r("/",{replace:!0})},[s,r,a]),t?e.jsx(e.Fragment,{children:"loading ..."}):e.jsxs("div",{className:"flex h-screen bg-background",children:[e.jsx(D,{pathname:i}),e.jsxs("main",{className:"flex-1 overflow-y-auto",children:[e.jsxs("div",{className:"flex flex-grow flex-row justify-self-end mr-4 mt-4",children:[e.jsx(b,{className:"w-[100px]"}),e.jsx(m,{})]}),e.jsx("div",{className:"p-8",children:e.jsx(x,{})})]})]})}export{re as default};
