(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{"52c3":function(e,t,o){"use strict";o.r(t);var i=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"Categories"}},[o("Delete",{attrs:{headers:e.headers,item:e.categoriesStore.selectedCategory},on:{onConfirm:e.onConfirmDelete},model:{value:e.dialogDelete,callback:function(t){e.dialogDelete=t},expression:"dialogDelete"}}),o("Table",{attrs:{headers:e.headers,loading:e.categoriesStore.loader,data:e.categoriesStore.categoriesTable,title:"titles.categories",hasAccessToWrite:"2"==e.authStore.accessCategories},scopedSlots:e._u([{key:"normal",fn:function(t){var i=t.item;return[o("q-btn",{attrs:{icon:"edit",size:"sm",dense:"",color:"warning"},on:{click:function(t){return e.onUpdate(i)}}}),e._v(" \n      "),o("q-btn",{attrs:{icon:"delete",size:"sm",dense:"",color:"red"},on:{click:function(t){return e.onDelete(i)}}})]}},{key:"card",fn:function(t){var i=t.item;return[o("q-btn",{staticClass:"q-my-xs",attrs:{size:"sm",dense:"",color:"warning"},on:{click:function(t){return e.onUpdate(i)}}},[o("q-icon",{attrs:{name:"edit"}}),e._v("\n        "+e._s(e.$t("tables.edit"))+"\n      ")],1),o("q-btn",{staticClass:"q-my-xs",attrs:{size:"sm",dense:"",color:"red"},on:{click:function(t){return e.onDelete(i)}}},[o("q-icon",{attrs:{name:"delete"}}),e._v("\n        "+e._s(e.$t("tables.delete"))+"\n      ")],1)]}}])},[o("FormCategories",{model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}})],1)],1)},n=[],r=o("60a3"),s=o("0cbe"),a=o("139f"),l=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("Modal",{attrs:{btnTitle:"",title:e.category.id?"titles.updated":"titles.creation",loader:e.categoriesStore.loader,hasBtn:"2"==e.authStore.accessCategories,btnProps:{dense:!0,fab:!0,color:"primary",icon:"add"}},on:{onConfirm:e.onSubmit,onCancel:e.onCancel},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[o("FormFlex",{attrs:{fields:e.fields,loader:e.categoriesStore.loader,model:e.category},on:{onValidation:function(t){e.formValid=t},onSubmit:e.onSubmit}})],1)},c=[],d=o("0365"),u=o("714b"),g=o("6fc5"),h=o("02f2"),f=o("68d2"),p=o("f8de"),m=o("add8"),b=function(e,t,o,i){var n,r=arguments.length,s=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(s=(r<3?n(s):r>3?n(t,o,s):n(t,o))||s);return r>3&&s&&Object.defineProperty(t,o,s),s},y=function(e,t,o,i){function n(e){return e instanceof o?e:new o((function(t){t(e)}))}return new(o||(o=Promise))((function(o,r){function s(e){try{l(i.next(e))}catch(t){r(t)}}function a(e){try{l(i["throw"](e))}catch(t){r(t)}}function l(e){e.done?o(e.value):n(e.value).then(s,a)}l((i=i.apply(e,t||[])).next())}))};let S=class extends r["d"]{constructor(){super(...arguments),this.dialog=!1,this.formValid=!1,this.categoriesStore=Object(g["e"])(m["a"],this.$store),this.rolesState=Object(g["e"])(f["a"],this.$store),this.authStore=Object(g["e"])(p["a"],this.$store),this.category={},this.fields=[]}onCancel(){return y(this,void 0,void 0,(function*(){return this.dialog=!1,!1}))}onChange(e,t){this.dialog=e}mounted(){return y(this,void 0,void 0,(function*(){this.dialog=this.value,this.category=Object.assign({},this.categoriesStore.selectedCategory)}))}onSelectedCategory(e,t){this.category=Object.assign({},e)}onSubmit(){return y(this,void 0,void 0,(function*(){if(this.formValid)if(this.category.id){yield this.categoriesStore.update(Object.assign({},this.category));this.onCancel()}else{yield this.categoriesStore.create(Object.assign({},this.category));this.onCancel()}}))}created(){return y(this,void 0,void 0,(function*(){yield this.rolesState.getAll(),this.generateOptions(this.rolesState.roles)}))}generateOptions(e){console.log(e),this.fields=[{type:"text",label:"forms.categories.name",key:"name",field:{class:"col-12 col-sm-12 q-px-sm q-py-sm"},props:{},rules:[...h["a"].reqAndTree]},{type:"text",label:"forms.categories.description",key:"description",field:{class:"col-12 col-sm-12 q-px-sm q-py-sm"},rules:[],props:{}},{type:"photo_personal",label:"forms.users.photo",key:"photo",field:{class:"col-12 col-sm-12 q-px-sm q-py-sm"},rules:[],props:{}}]}};b([Object(r["c"])({type:Boolean,required:!0})],S.prototype,"value",void 0),b([Object(r["b"])("input")],S.prototype,"onCancel",null),b([Object(r["e"])("value")],S.prototype,"onChange",null),b([Object(r["e"])("categoriesStore.selectedCategory")],S.prototype,"onSelectedCategory",null),S=b([Object(r["a"])({components:{FormFlex:d["a"],Modal:u["a"]}})],S);var v=S,O=v,j=o("2877"),x=Object(j["a"])(O,l,c,!1,null,null,null),C=x.exports,D=o("04ec"),q=function(e,t,o,i){var n,r=arguments.length,s=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,o):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)s=Reflect.decorate(e,t,o,i);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(s=(r<3?n(s):r>3?n(t,o,s):n(t,o))||s);return r>3&&s&&Object.defineProperty(t,o,s),s},w=function(e,t,o,i){function n(e){return e instanceof o?e:new o((function(t){t(e)}))}return new(o||(o=Promise))((function(o,r){function s(e){try{l(i.next(e))}catch(t){r(t)}}function a(e){try{l(i["throw"](e))}catch(t){r(t)}}function l(e){e.done?o(e.value):n(e.value).then(s,a)}l((i=i.apply(e,t||[])).next())}))};let k=class extends r["d"]{constructor(){super(...arguments),this.categoriesStore=Object(g["e"])(m["a"],this.$store),this.authStore=Object(g["e"])(p["a"],this.$store),this.dialog=!1,this.dialogDelete=!1,this.dialogPhoto=!1,this.model={},this.headers=[{name:"id",label:"headers.categories.no",sortable:!0,required:!0,align:"center",field:"id"},{name:"name",label:"headers.categories.name",sortable:!0,required:!0,align:"center",field:"name"},{name:"options",label:"headers.categories.options",sortable:!1,required:!1,align:"center",field:"options"}]}getReports(){Object(D["b"])(this.categoriesStore.excel,"usuarios")}onUpdate(e){this.categoriesStore.context.commit("SET",e),this.dialog=!0}onPhoto(e){this.categoriesStore.context.commit("SET",e),this.dialogPhoto=!0}onDelete(e){this.dialogDelete=!0,this.categoriesStore.context.commit("SET",e)}onDialogDelete(e,t){e||this.categoriesStore.context.commit("SET")}onDialogPhoto(e,t){console.log(e),e||this.categoriesStore.context.commit("SET")}onDialog(e,t){e||this.categoriesStore.context.commit("SET")}onConfirmDelete(){return w(this,void 0,void 0,(function*(){yield this.categoriesStore.delete(this.categoriesStore.selectedCategory),this.dialogDelete=!1}))}created(){return w(this,void 0,void 0,(function*(){yield this.categoriesStore.getAll()}))}};q([Object(r["e"])("dialogDelete")],k.prototype,"onDialogDelete",null),q([Object(r["e"])("dialogPhoto")],k.prototype,"onDialogPhoto",null),q([Object(r["e"])("dialog")],k.prototype,"onDialog",null),k=q([Object(r["a"])({components:{Table:s["a"],FormCategories:C,Delete:a["a"]}})],k);var P=k,T=P,_=o("9c40"),$=o("0016"),E=o("eebe"),R=o.n(E),F=Object(j["a"])(T,i,n,!1,null,null,null);t["default"]=F.exports;R()(F,"components",{QBtn:_["a"],QIcon:$["a"]})}}]);