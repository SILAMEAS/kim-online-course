const a=r=>{if(!r)return"0m";const o=Math.floor(r/3600),t=Math.floor(r%3600/60),f=Math.floor(r%60);return o>0?`${o}h ${t}m`:t>0?`${t}m ${f}s`:`${f}s`};export{a as f};
