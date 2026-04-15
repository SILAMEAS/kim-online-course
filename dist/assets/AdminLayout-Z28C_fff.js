import{j as e}from"./ui-vendor-C0_O5JAL.js";import{P as m}from"./profile-menu-CsDlXgrU.js";import{r as c,j as f,i as h,O as x}from"./router-vendor-BuXZ04F3.js";import{f as p,E as u}from"./index-Dt770avw.js";import{u as b}from"./useRestoreUserByToken-N2TlE2Tq.js";import{T as y}from"./ThemeLanguage-BBKdKRpj.js";import{B as l}from"./button-2eL4NBLq.js";import{V as j,U as g,I as v,L as N}from"./Link-Dd2pNdfn.js";import{c as n}from"./createLucideIcon-jjjkdIKJ.js";import{L as k}from"./layout-dashboard-CbBR0ue_.js";import{U as w}from"./users-DFdYVOnA.js";import{B as L}from"./book-open-Dw3O2mLa.js";import"./TriggerLanguage-mPaBlGAq.js";import"./utils-BLSKlp9E.js";import"./check-CRwYhRjD.js";import"./useTranslation-tXZQ712u.js";import"./book-marked-DUTrl_fk.js";import"./arrow-right-left-DM0olNwd.js";import"./react-vendor-MX_of3X_.js";import"./hooks-OzM-M0lP.js";import"./api.generated-yZMVOT9e.js";/**
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
 */const P=[["path",{d:"M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z",key:"1bo67w"}],["rect",{x:"3",y:"14",width:"7",height:"7",rx:"1",key:"1bkyp8"}],["circle",{cx:"17.5",cy:"17.5",r:"3.5",key:"w3z12y"}]],z=n("shapes",P),B=[{href:"/admin",label:"Dashboard",icon:k},{href:"/admin/users",label:"Users",icon:w},{href:"/admin/courses",label:"Courses",icon:L},{href:"/admin/videos",label:"Videos",icon:j},{href:"/admin/payments",label:"Payments",icon:_},{href:"/admin/enrollments",label:"Enrollments",icon:g},{href:"/admin/images",label:"Images",icon:v},{href:"/admin/categories",label:"Categories",icon:z}],D=({navItems:i,pathname:r})=>{const[s,t]=c.useState(!1),a=i??B;return e.jsxs(e.Fragment,{children:[e.jsx(l,{className:"md:hidden m-4 fixed",variant:"outline",onClick:()=>t(!0),children:e.jsx(O,{})}),s&&e.jsx("button",{className:"fixed inset-0 bg-black/50 z-40 md:hidden",onClick:()=>t(!1)}),e.jsx("aside",{className:`
          fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50
          transform transition-transform duration-300 ease-in-out
          ${s?"translate-x-0":"-translate-x-full"} 
          md:translate-x-0 md:static md:h-auto
        `,children:e.jsxs("div",{className:"flex flex-col h-full",children:[e.jsxs("div",{className:"p-6 border-b border-border flex justify-between items-center",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"text-2xl font-bold text-foreground",children:"Admin Panel"}),e.jsx("p",{className:"text-sm text-muted-foreground mt-1",children:"Course Management"})]}),e.jsx(l,{className:"md:hidden p-2",variant:"outline",onClick:()=>t(!1),children:e.jsx(E,{})})]}),e.jsx("nav",{className:"flex-1 overflow-y-auto p-4",children:e.jsx("div",{className:"space-y-2",children:a==null?void 0:a.map(o=>{const d=o.icon;return e.jsxs(N,{href:o.href,isActive:r===o.href,children:[e.jsx(d,{className:"h-5 w-5"}),o.label]},o.href)})})}),e.jsx("div",{className:"p-4 border-t border-border",children:e.jsx(l,{variant:"outline",className:"w-full",children:"Logout"})})]})})]})};function re(){const{pathname:i}=f(),r=h(),{currentData:s,isLoading:t}=b(),a=p.get("accessToken");return c.useEffect(()=>{a||r("/",{replace:!0}),s&&s&&(s==null?void 0:s.role)!=u.ADMIN&&r("/",{replace:!0})},[s,r,a]),t?e.jsx(e.Fragment,{children:"loading ..."}):e.jsxs("div",{className:"flex h-screen bg-background",children:[e.jsx(D,{pathname:i}),e.jsxs("main",{className:"flex-1 overflow-y-auto",children:[e.jsxs("div",{className:"flex flex-grow flex-row justify-self-end mr-4 mt-4",children:[e.jsx(y,{className:"w-[100px]"}),e.jsx(m,{})]}),e.jsx("div",{className:"p-8",children:e.jsx(x,{})})]})]})}export{re as default};
