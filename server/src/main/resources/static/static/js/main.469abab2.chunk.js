(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{39:function(e,t,a){e.exports=a.p+"static/media/home_otter_red_background.ed422ee0.png"},47:function(e,t,a){e.exports=a(75)},56:function(e,t,a){},59:function(e,t,a){},60:function(e,t,a){},62:function(e,t,a){},63:function(e,t,a){},73:function(e,t,a){},75:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),i=a(30),r=a(9),o=a.n(r),c=(a(56),a(81)),l=a(10),u=a.n(l),m=a(20),p=a(11),h=a(12),f=a(14),d=a(13),b=a(15),g=(a(59),a(60),a(39)),v=a.n(g),O=a(21),E=a(41),j=function(e){function t(e){return Object(p.a)(this,t),Object(f.a)(this,Object(d.a)(t).call(this,e))}return Object(b.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this.props,t=e.mode,a=e.src,n=e.height,i=e.width,r=e.style,o=Object(E.a)(e,["mode","src","height","width","style"]),c={fill:"cover",fit:"contain"}[t||"fit"],l={backgroundImage:"url('".concat(a,"')"),backgroundSize:c,backgroundPosition:"center center",backgroundRepeat:"no-repeat",width:i,height:n};return s.a.createElement("div",Object.assign({},o,{style:Object(O.a)({},r,l)}))}}]),t}(n.Component);j.defaultProps=void 0,j.defaultProps={height:60,width:60,mode:"fit"};var w=a(82),k=a(24),S=a(33),y=a(23),T=function(e){function t(){return Object(p.a)(this,t),Object(f.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return s.a.createElement("header",{style:{position:"fixed",zIndex:1,width:"100%"}},s.a.createElement(w.a,{className:"navbar"},s.a.createElement(w.a.Group,{align:k.a.LEFT},s.a.createElement(w.a.Heading,null,s.a.createElement("a",{href:"/"},s.a.createElement(j,{src:v.a})))),s.a.createElement(w.a.Group,{align:k.a.RIGHT},s.a.createElement(S.b,{className:"bp3-minimal",icon:s.a.createElement(y.a,{icon:"new-person",iconSize:20}),text:"Register"}),s.a.createElement(S.b,{className:"bp3-minimal",icon:s.a.createElement(y.a,{icon:"log-in",iconSize:20}),text:"Login"}))))}}]),t}(n.Component),C=function(e){function t(){return Object(p.a)(this,t),Object(f.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return s.a.createElement("section",{id:"landing-section"},s.a.createElement(T,null))}}]),t}(n.Component),N=(a(62),a(25)),I=a(8),x=(a(63),a(78)),D=a(16),F=a(79),R=a(80),L=a(83),P=a(40),A=a(22),G=function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(f.a)(this,Object(d.a)(t).call(this,e))).onSubmit=function(){var e=Object(m.a)(u.a.mark(function e(t){var n;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!a.validateForm()){e.next=6;break}return e.next=4,a.submitForm();case 4:n=e.sent,a.setState(Object(O.a)({},a.state,{submitSuccessful:n}));case 6:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.state={email:"",firstName:"",lastName:"",password:"",submitSuccessful:null,csrfToken:a.props.csrfToken},a.onInputChange=a.onInputChange.bind(Object(I.a)(Object(I.a)(a))),a.onSubmit=a.onSubmit.bind(Object(I.a)(Object(I.a)(a))),a.onToastDismissed=a.onToastDismissed.bind(Object(I.a)(Object(I.a)(a))),a}return Object(b.a)(t,e),Object(h.a)(t,[{key:"onInputChange",value:function(e){var t=e.currentTarget;["email","firstName","lastName","password"].includes(t.name)?this.setState(Object(N.a)({},t.name,t.value)):console.log("Can't assign name \"".concat(t.name,'" to form.'))}},{key:"onToastDismissed",value:function(){this.setState(Object(O.a)({},this.state,{submitSuccessful:null}))}},{key:"validateForm",value:function(){return!0}},{key:"submitForm",value:function(){var e=Object(m.a)(u.a.mark(function e(){var t;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/user_api/users",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json","X-XSRF-TOKEN":this.state.csrfToken},body:JSON.stringify({email:this.state.email,firstName:this.state.firstName,lastName:this.state.lastName,passwordHash:this.state.password})});case 3:return t=e.sent,e.abrupt("return",200===t.status);case 7:return e.prev=7,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return",!1);case 11:case"end":return e.stop()}},e,this,[[0,7]])}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return s.a.createElement("section",{id:"register-section"},s.a.createElement(x.a,{elevation:D.a.ONE},s.a.createElement("form",{onSubmit:this.onSubmit},s.a.createElement("h1",null,"Register"),s.a.createElement(F.a,null,s.a.createElement(R.a,{name:"email",value:this.state.email,onChange:this.onInputChange,leftIcon:"envelope",id:"email-input",placeholder:"Email Address"})),s.a.createElement(F.a,null,s.a.createElement(R.a,{name:"firstName",value:this.state.firstName,onChange:this.onInputChange,leftIcon:"person",id:"firstname-input",placeholder:"First Name"})),s.a.createElement(F.a,null,s.a.createElement(R.a,{name:"lastName",value:this.state.lastName,onChange:this.onInputChange,leftIcon:"person",id:"lastname-input",placeholder:"Last Name"})),s.a.createElement(F.a,null,s.a.createElement(R.a,{name:"password",value:this.state.password,onChange:this.onInputChange,leftIcon:"lock",id:"text-input",placeholder:"Password",type:"password"})),s.a.createElement(S.b,{type:"submit",fill:!0},"Register"))),!0===this.state.submitSuccessful&&s.a.createElement(L.a,null,s.a.createElement(P.a,{message:"Registration successful!",intent:A.a.SUCCESS,onDismiss:this.onToastDismissed,timeout:3e3})),!1===this.state.submitSuccessful&&s.a.createElement(L.a,null,s.a.createElement(P.a,{message:"Registration failed!",intent:A.a.DANGER,onDismiss:this.onToastDismissed,timeout:3e3})))}}]),t}(n.Component),X=(a(73),function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(f.a)(this,Object(d.a)(t).call(this,e))).onSubmit=function(){var e=Object(m.a)(u.a.mark(function e(t){var n;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!a.validateForm()){e.next=6;break}return e.next=4,a.submitForm();case 4:n=e.sent,a.setState(Object(O.a)({},a.state,{loginSuccessful:n}));case 6:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a.state={email:"",password:"",loginSuccessful:null,csrfToken:e.csrfToken},a.onInputChange=a.onInputChange.bind(Object(I.a)(Object(I.a)(a))),a.onSubmit=a.onSubmit.bind(Object(I.a)(Object(I.a)(a))),a.onToastDismissed=a.onToastDismissed.bind(Object(I.a)(Object(I.a)(a))),a}return Object(b.a)(t,e),Object(h.a)(t,[{key:"onInputChange",value:function(e){var t=e.currentTarget;["email","password"].includes(t.name)?this.setState(Object(N.a)({},t.name,t.value)):console.log("Can't assign name \"".concat(t.name,'" to form.'))}},{key:"onToastDismissed",value:function(){this.setState(Object(O.a)({},this.state,{loginSuccessful:null}))}},{key:"validateForm",value:function(){return!0}},{key:"submitForm",value:function(){var e=Object(m.a)(u.a.mark(function e(){var t,a;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,(t=new URLSearchParams).append("email",this.state.email),t.append("password",this.state.password),e.next=6,fetch("/user_api/login",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/x-www-form-urlencoded","X-XSRF-TOKEN":this.state.csrfToken},body:t.toString()});case 6:return(a=e.sent).text().then(function(e){console.log(e)}),console.log(a),e.abrupt("return",200===a.status);case 12:return e.prev=12,e.t0=e.catch(0),console.log(e.t0),e.abrupt("return",!1);case 16:case"end":return e.stop()}},e,this,[[0,12]])}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return s.a.createElement("section",{id:"login-section"},s.a.createElement(x.a,{elevation:D.a.ONE},s.a.createElement("form",{onSubmit:this.onSubmit},s.a.createElement("h1",null,"Login"),s.a.createElement(F.a,null,s.a.createElement(R.a,{name:"email",value:this.state.email,onChange:this.onInputChange,leftIcon:"envelope",id:"email-input",placeholder:"Email Address"})),s.a.createElement(F.a,null,s.a.createElement(R.a,{name:"password",value:this.state.password,onChange:this.onInputChange,leftIcon:"lock",id:"text-input",placeholder:"Password",type:"password"})),s.a.createElement(S.b,{type:"submit",fill:!0},"Login"))),!0===this.state.loginSuccessful&&s.a.createElement(L.a,null,s.a.createElement(P.a,{message:"Login successful!",intent:A.a.SUCCESS,onDismiss:this.onToastDismissed,timeout:3e3})),!1===this.state.loginSuccessful&&s.a.createElement(L.a,null,s.a.createElement(P.a,{message:"Login failed!",intent:A.a.DANGER,onDismiss:this.onToastDismissed,timeout:3e3})))}}]),t}(n.Component)),_=function(e){function t(e){var a;Object(p.a)(this,t),a=Object(f.a)(this,Object(d.a)(t).call(this,e));var n=e.cookies;return a.state={csrfToken:n.get("XSRF-TOKEN"),isAuthenticated:!1,user:void 0},console.log(a.state.csrfToken),a}return Object(b.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=Object(m.a)(u.a.mark(function e(){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return s.a.createElement("div",{id:"app"},s.a.createElement(C,null),s.a.createElement(G,{csrfToken:this.state.csrfToken}),s.a.createElement(X,{csrfToken:this.state.csrfToken}))}}]),t}(n.Component),z=Object(i.b)(_);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(74);o.a.render(s.a.createElement(i.a,null,s.a.createElement(c.a,null,s.a.createElement(z,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[47,1,2]]]);
//# sourceMappingURL=main.469abab2.chunk.js.map