(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["auth.password"],{7390:function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ValidationObserver",{ref:"observer",staticClass:"ui--auth-pwd",attrs:{tag:"form"},on:{submit:function(a){return a.preventDefault(),t.submit(a)}}},[s("div",{staticClass:"ui--auth-head"},[s("h2",{staticClass:"ui--auth-head-h2"},[t._v("Set Password")]),s("h4",{staticClass:"ui--auth-head-h4"},[t._v("Project, Brand Short Link")])]),s("div",{staticClass:"ui--auth-pwd-main"},[s("InputProvider",{attrs:{vid:"ui--model-password",type:"password",label:"Password",maxlength:16,rules:{required:!0,min:6}},model:{value:t.password,callback:function(a){t.password=a},expression:"password"}}),s("InputProvider",{attrs:{vid:"ui--model-confirm-password",type:"password",label:"Confirm Password",maxlength:16,rules:{required:!0,confirmed:"ui--model-password"}},model:{value:t.confirmPassword,callback:function(a){t.confirmPassword=a},expression:"confirmPassword"}}),s("div",{staticClass:"ui--auth-pwd-button"},[s("button",{staticClass:"btn btn-default",attrs:{type:"button",title:"Back to login"},on:{click:t.back}},[s("svg",{staticClass:"icon",attrs:{viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"}},[s("path",{attrs:{d:"M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"}}),s("path",{attrs:{d:"M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"}})])]),s("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[s("span",{staticClass:"text"},[t._v("SUBMIT")])])])],1),s("div",{staticClass:"ui--auth-copyright"},[t._v("TAP Technology Company Limited. All Rights Reserved.")])])},r=[],i=(s("96cf"),s("1da1")),n=s("d4ec"),o=s("bee2"),u=s("262e"),c=s("2caf"),l=s("9ab4"),d=s("60a3"),p=s("7bb1"),h=function(t){Object(u["a"])(s,t);var a=Object(c["a"])(s);function s(){var t;return Object(n["a"])(this,s),t=a.apply(this,arguments),t.password="",t.confirmPassword="",t}return Object(o["a"])(s,[{key:"submit",value:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=this.$refs["observer"],t.next=3,a.validate();case 3:t.sent;case 5:case"end":return t.stop()}}),t,this)})));function a(){return t.apply(this,arguments)}return a}()},{key:"back",value:function(){this.$router.push({name:"auth.login"})}}]),s}(d["c"]);h=Object(l["a"])([Object(d["a"])({components:{ValidationObserver:p["a"]}})],h);var b=h,v=b,w=s("2877"),m=Object(w["a"])(v,e,r,!1,null,null,null);a["default"]=m.exports}}]);
//# sourceMappingURL=auth.password-legacy.5384ab47.js.map