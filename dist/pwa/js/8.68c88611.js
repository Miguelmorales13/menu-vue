(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{dcf2:function(e,t,o){"use strict";o.r(t);var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"Products"}},[o("Delete",{attrs:{headers:e.headers,item:e.productsStore.selectedProduct},on:{onConfirm:e.onConfirmDelete},model:{value:e.dialogDelete,callback:function(t){e.dialogDelete=t},expression:"dialogDelete"}}),o("Table",{attrs:{headers:e.headers,loading:e.productsStore.loader,data:e.productsStore.productsTable,title:"titles.products",hasAccessToWrite:"2"==e.authStore.accessProducts},scopedSlots:e._u([{key:"normal",fn:function(t){var n=t.item;return[o("q-btn",{attrs:{icon:"edit",size:"sm",dense:"",color:"warning"},on:{click:function(t){return e.onAction(e.ActionEnum.Update,n)}}}),e._v(" \n      "),o("q-btn",{attrs:{icon:"delete",size:"sm",dense:"",color:"red"},on:{click:function(t){return e.onAction(e.ActionEnum.Delete,n)}}})]}},{key:"card",fn:function(t){var n=t.item;return[o("q-btn",{staticClass:"q-my-xs",attrs:{size:"sm",dense:"",color:"warning"},on:{click:function(t){return e.onAction(e.ActionEnum.Update,n)}}},[o("q-icon",{attrs:{name:"edit"}}),e._v("\n        "+e._s(e.$t("tables.edit"))+"\n      ")],1),o("q-btn",{staticClass:"q-my-xs",attrs:{size:"sm",dense:"",color:"red"},on:{click:function(t){return e.onAction(e.ActionEnum.Delete,n)}}},[o("q-icon",{attrs:{name:"delete"}}),e._v("\n        "+e._s(e.$t("tables.delete"))+"\n      ")],1)]}}])},[o("FormProducts",{model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}})],1)],1)},r=[],s=o("60a3"),i=o("0cbe"),c=o("139f"),l=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("Modal",{attrs:{btnTitle:"",title:e.product.id?"titles.updated":"titles.creation",loader:e.productsStore.loader,hasBtn:"2"==e.authStore.accessProducts,btnProps:{dense:!0,fab:!0,color:"primary",icon:"add"}},on:{onConfirm:e.onSubmit,onCancel:e.onCancel},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[o("FormFlex",{attrs:{fields:e.fields,loader:e.productsStore.loader,model:e.product},on:{onValidation:function(t){e.formValid=t},onSubmit:e.onSubmit}})],1)},a=[],d=o("0365"),u=o("714b"),p=o("6fc5"),h=o("02f2"),f=o("2b0b"),m=o("f8de"),b=o("ef3b"),g=o("04ec"),y=function(e,t,o,n){var r,s=arguments.length,i=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,t,o,n);else for(var c=e.length-1;c>=0;c--)(r=e[c])&&(i=(s<3?r(i):s>3?r(t,o,i):r(t,o))||i);return s>3&&i&&Object.defineProperty(t,o,i),i},S=function(e,t,o,n){function r(e){return e instanceof o?e:new o((function(t){t(e)}))}return new(o||(o=Promise))((function(o,s){function i(e){try{l(n.next(e))}catch(t){s(t)}}function c(e){try{l(n["throw"](e))}catch(t){s(t)}}function l(e){e.done?o(e.value):r(e.value).then(i,c)}l((n=n.apply(e,t||[])).next())}))};let v=class extends s["d"]{constructor(){super(...arguments),this.readImage=g["e"],this.dialog=!1,this.formValid=!1,this.productsStore=Object(p["e"])(b["a"],this.$store),this.categoriesState=Object(p["e"])(f["a"],this.$store),this.authStore=Object(p["e"])(m["a"],this.$store),this.product={images:[]},this.files=[],this.fields=[]}onCancel(){return S(this,void 0,void 0,(function*(){return this.dialog=!1,!1}))}onChange(e,t){this.dialog=e}mounted(){return S(this,void 0,void 0,(function*(){this.dialog=this.value,this.product=Object.assign({},this.productsStore.selectedProduct)}))}onSelectedProduct(e,t){this.product=Object.assign({},e)}onSubmit(){return S(this,void 0,void 0,(function*(){if(this.formValid)if(this.product.id){yield this.productsStore.update(Object.assign({},this.product));this.onCancel()}else{yield this.productsStore.create(Object.assign({},this.product));this.onCancel()}}))}created(){return S(this,void 0,void 0,(function*(){yield this.categoriesState.getAll(),this.generateOptions(this.categoriesState.subcategories)}))}generateOptions(e){this.fields=[{type:"text",label:"forms.products.name",key:"name",field:{class:"col-12 col-sm-6 q-px-sm q-py-sm"},props:{},rules:[...h["a"].reqAndTree]},{type:"photo_personal",label:"forms.products.photo",key:"photo",field:{class:"col-12 col-sm-6 q-px-sm q-py-sm"},rules:[],props:{}},{type:"text",label:"forms.products.description",key:"description",field:{class:"col-12 col-sm-12 q-px-sm q-py-sm"},rules:[...h["a"].reqAndTree],props:{}},{type:"select",label:"forms.products.category",key:"categoryId",keyLabel:"id",nameLabel:"name",options:e,field:{class:"col-12 col-sm-6 q-px-sm q-py-sm"},rules:[],props:{}},{type:"text",label:"forms.products.price",key:"price",field:{class:"col-12 col-sm-6 q-px-sm q-py-sm"},rules:[],props:{type:"number"}}]}};y([Object(s["c"])({type:Boolean,required:!0})],v.prototype,"value",void 0),y([Object(s["b"])("input")],v.prototype,"onCancel",null),y([Object(s["e"])("value")],v.prototype,"onChange",null),y([Object(s["e"])("productsStore.selectedProduct")],v.prototype,"onSelectedProduct",null),v=y([Object(s["a"])({components:{FormFlex:d["a"],Modal:u["a"]}})],v);var O,x=v,j=x,D=o("2877"),q=Object(D["a"])(j,l,a,!1,null,null,null),P=q.exports;(function(e){e["Update"]="Update",e["Add"]="Add",e["Delete"]="Delete",e["Show"]="Show",e["Images"]="Images"})(O||(O={}));var k=function(e,t,o,n){var r,s=arguments.length,i=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)i=Reflect.decorate(e,t,o,n);else for(var c=e.length-1;c>=0;c--)(r=e[c])&&(i=(s<3?r(i):s>3?r(t,o,i):r(t,o))||i);return s>3&&i&&Object.defineProperty(t,o,i),i},w=function(e,t,o,n){function r(e){return e instanceof o?e:new o((function(t){t(e)}))}return new(o||(o=Promise))((function(o,s){function i(e){try{l(n.next(e))}catch(t){s(t)}}function c(e){try{l(n["throw"](e))}catch(t){s(t)}}function l(e){e.done?o(e.value):r(e.value).then(i,c)}l((n=n.apply(e,t||[])).next())}))};let A=class extends s["d"]{constructor(){super(...arguments),this.productsStore=Object(p["e"])(b["a"],this.$store),this.authStore=Object(p["e"])(m["a"],this.$store),this.ActionEnum=O,this.dialog=!1,this.dialogDelete=!1,this.dialogPhoto=!1,this.model={},this.headers=[{name:"id",label:"headers.products.no",sortable:!0,required:!0,align:"center",field:"id"},{name:"name",label:"headers.products.name",sortable:!0,required:!0,align:"center",field:"name"},{name:"category",label:"headers.products.category",sortable:!0,required:!0,align:"center",field:"category"},{name:"options",label:"headers.products.options",sortable:!1,required:!1,align:"center",field:"options"}]}getReports(){Object(g["b"])(this.productsStore.excel,"usuarios")}onAction(e,t){switch(console.log(e),this.productsStore.context.commit("SET",t),e){case O.Update:case O.Add:this.dialog=!0;break;case O.Delete:this.dialogDelete=!0;break;case O.Show:break;case O.Images:this.dialogPhoto=!0;break;default:break}}onDialogDelete(e,t){e||this.productsStore.context.commit("SET")}onDialogPhoto(e,t){e||this.productsStore.context.commit("SET")}onDialog(e,t){e||this.productsStore.context.commit("SET")}onConfirmDelete(){return w(this,void 0,void 0,(function*(){yield this.productsStore.delete(this.productsStore.selectedProduct),this.dialogDelete=!1}))}created(){return w(this,void 0,void 0,(function*(){yield this.productsStore.getAll()}))}};k([Object(s["e"])("dialogDelete")],A.prototype,"onDialogDelete",null),k([Object(s["e"])("dialogPhoto")],A.prototype,"onDialogPhoto",null),k([Object(s["e"])("dialog")],A.prototype,"onDialog",null),A=k([Object(s["a"])({components:{Table:i["a"],FormProducts:P,Delete:c["a"]}})],A);var C=A,E=C,T=o("9c40"),_=o("0016"),$=o("eebe"),R=o.n($),F=Object(D["a"])(E,n,r,!1,null,null,null);t["default"]=F.exports;R()(F,"components",{QBtn:T["a"],QIcon:_["a"]})}}]);