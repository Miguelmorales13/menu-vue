if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let n=Promise.resolve();return c[e]||(n=new Promise(async n=>{if("document"in self){const c=document.createElement("script");c.src=e,document.head.appendChild(c),c.onload=n}else importScripts(e),n()})),n.then(()=>{if(!c[e])throw new Error(`Module ${e} didn’t register its module`);return c[e]})},n=(n,c)=>{Promise.all(n.map(e)).then(e=>c(1===e.length?e[0]:e))},c={require:Promise.resolve(n)};self.define=(n,u,s)=>{c[n]||(c[n]=Promise.resolve().then(()=>{let c={};const i={uri:location.origin+n.slice(1)};return Promise.all(u.map(n=>{switch(n){case"exports":return c;case"module":return i;default:return e(n)}})).then(e=>{const n=s(...e);return c.default||(c.default=n),c})}))}}define("./service-worker.js",["./workbox-e170c028"],(function(e){"use strict";e.setCacheNameDetails({prefix:"menu"}),self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"/menu-vue/background.jpg",revision:"8d8f24892a615c845955a2c5254e9d63"},{url:"/menu-vue/css/3.02c38dcd.css",revision:"2c10da37edabea63763a478983a5f1b7"},{url:"/menu-vue/css/4.739f4023.css",revision:"8357b70ec419bdb73b81e4ac3f520ff4"},{url:"/menu-vue/css/5.2c3c89ec.css",revision:"c412cf91f7d47dde6b53434f7516275e"},{url:"/menu-vue/css/app.0e433876.css",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"/menu-vue/css/chunk-common.f8e58fd4.css",revision:"9142d4f85dcb1259ffa7003615cbb52e"},{url:"/menu-vue/css/vendor.daa9653c.css",revision:"a01c4489e2c4973f05a30f9606cfde9d"},{url:"/menu-vue/favicon.ico",revision:"2edabcbe859c371d0a79a695953f31ae"},{url:"/menu-vue/fonts/KFOkCnqEu92Fr1MmgVxIIzQ.a45108d3.woff",revision:"5cb7edfceb233100075dc9a1e12e8da3"},{url:"/menu-vue/fonts/KFOlCnqEu92Fr1MmEU9fBBc-.cea99d3e.woff",revision:"87284894879f5b1c229cb49c8ff6decc"},{url:"/menu-vue/fonts/KFOlCnqEu92Fr1MmSU5fBBc-.865f928c.woff",revision:"b00849e00f4c2331cddd8ffb44a6720b"},{url:"/menu-vue/fonts/KFOlCnqEu92Fr1MmWUlfBBc-.2267169e.woff",revision:"adcde98f1d584de52060ad7b16373da3"},{url:"/menu-vue/fonts/KFOlCnqEu92Fr1MmYUtfBBc-.bac8362e.woff",revision:"bb1e4dc6333675d11ada2e857e7f95d7"},{url:"/menu-vue/fonts/KFOmCnqEu92Fr1Mu4mxM.49ae34d4.woff",revision:"60fa3c0614b8fb2f394fa29944c21540"},{url:"/menu-vue/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.6d14df8c.woff",revision:"39083cdef834fe0d7ee39e0272d1aa76"},{url:"/menu-vue/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.c8685531.woff2",revision:"d960b795b343e35150c1a0aa3c38c16b"},{url:"/menu-vue/icons/apple-icon-120x120.png",revision:"c9920835d2adb9f6ab6a79a27f220a3a"},{url:"/menu-vue/icons/apple-icon-152x152.png",revision:"9df9e65a1d2c6df3bd9143666b0e8c63"},{url:"/menu-vue/icons/apple-icon-167x167.png",revision:"4300c6c136c06abcd781aa18644dd7a3"},{url:"/menu-vue/icons/apple-icon-180x180.png",revision:"88dbf3d9e8269f1298486d103e22a57c"},{url:"/menu-vue/icons/favicon-128x128.png",revision:"d4ccc3e5ca65654924a6402fb1629d6e"},{url:"/menu-vue/icons/favicon-16x16.png",revision:"497b9030597aad8fe61e2d4f6ef92e3f"},{url:"/menu-vue/icons/favicon-32x32.png",revision:"3c0613316f438845ba0ac26799865e2b"},{url:"/menu-vue/icons/favicon-96x96.png",revision:"7fb4d9fa02a9f7d0dc1121559cb0a09f"},{url:"/menu-vue/icons/icon-128x128.png",revision:"1be07e62226c8f6a7086f132d9be1642"},{url:"/menu-vue/icons/icon-192x192.png",revision:"a1b423855a450ae7adbd9d2a782e0dfb"},{url:"/menu-vue/icons/icon-256x256.png",revision:"9f33ebc999e51d0dc2975fc573d53a0b"},{url:"/menu-vue/icons/icon-384x384.png",revision:"a126be0d50ed682c3129e0b8b31f680a"},{url:"/menu-vue/icons/icon-512x512.png",revision:"02abd24e7c8638e848d96a6bf78d2c27"},{url:"/menu-vue/icons/logonormal.png",revision:"0e14e1ebfae3d612d4f7784df122cced"},{url:"/menu-vue/icons/ms-icon-144x144.png",revision:"f256ec55be616f32ae486ab7571eb936"},{url:"/menu-vue/icons/safari-pinned-tab.svg",revision:"de8107bed7f087fb443d8e36855e7467"},{url:"/menu-vue/index.html",revision:"f34164d9e5e0ae9b4e1b97e8223fe151"},{url:"/menu-vue/js/10.10ad10eb.js",revision:"55ccbfd9117671a65e56c0e1411cddba"},{url:"/menu-vue/js/11.e3131a62.js",revision:"d018a53cac970d37215d43c98c31df8a"},{url:"/menu-vue/js/3.8777beee.js",revision:"231c2379dae85bd570807a884c2618da"},{url:"/menu-vue/js/4.95adfa44.js",revision:"51c427f15bb9cfae36467aba4093f0ab"},{url:"/menu-vue/js/5.bbfa0cf8.js",revision:"c6dd1e31a9d59fa511df8d0f7f5461a3"},{url:"/menu-vue/js/6.eed2bd9d.js",revision:"abc3c9c6ffa28e63f73b9b0b8d765fbf"},{url:"/menu-vue/js/7.b61915d2.js",revision:"79d4962435bd8bbec3245c680b88edf0"},{url:"/menu-vue/js/8.68c88611.js",revision:"bf1463cadcc2259cd7561eb276dfe992"},{url:"/menu-vue/js/9.ae17a052.js",revision:"eb75017b6929f60884fcf9a6dd646133"},{url:"/menu-vue/js/app.24af54d8.js",revision:"d16fe5bc2b91b7d2532809803b8158a5"},{url:"/menu-vue/js/chunk-common.8dc27ef4.js",revision:"fecbd87c4416bd0e734f5ad91e24fbe8"},{url:"/menu-vue/js/vendor.bbe8bb60.js",revision:"75b2ba53d2898e795e4f1912b802a5b1"},{url:"/menu-vue/logo.png",revision:"be0518cf17ddbc80e13c03dd4d50fdc8"},{url:"/menu-vue/manifest.json",revision:"beab423eab9cadbf6ca8f9db596b4623"}],{}),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/menu-vue/index.html"),{denylist:[/service-worker\.js$/,/workbox-(.)*\.js$/]}))}));
