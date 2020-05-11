(this["webpackJsonpminitwit-client"]=this["webpackJsonpminitwit-client"]||[]).push([[0],{192:function(e,t,a){e.exports=a(332)},197:function(e,t,a){},198:function(e,t,a){},332:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(49),o=a.n(s),l=(a(197),a(198),a(126),a(51)),i=a(349),c=a(341);function u(){return r.a.createElement(i.a,{fixed:"top",inverted:!0},r.a.createElement(c.a,null,r.a.createElement(i.a.Item,{as:l.b,to:"/",header:!0},"MiniTwit"),r.a.createElement(i.a.Item,{as:l.b,to:"/public"},"Public Timeline"),r.a.createElement(i.a.Item,{as:l.b,to:"/signup"},"Sign Up"),r.a.createElement(i.a.Item,{as:l.b,to:"/signin"},"Sign In")))}var m=a(21),h=a(22),p=a(23),g=a(24),d=a(25),f=a(344),E=a(350),b=a(354),v=a(351),w=a(345),y=a(342),S=a(180),k=a(53),j=function(e){function t(){return Object(m.a)(this,t),Object(p.a)(this,Object(g.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(h.a)(t,[{key:"reportMsg",value:function(){alert("Do you want to report this message ?")}},{key:"render",value:function(){var e=this.props.name,t=this.props.text,a=this.props.date;return r.a.createElement(f.a.Event,null,r.a.createElement(f.a.Label,{image:"https://react.semantic-ui.com/images/avatar/small/elliot.jpg"}),r.a.createElement(f.a.Content,null,r.a.createElement(f.a.Summary,null,r.a.createElement("a",{href:"/"+e},e)," posted on his page",r.a.createElement(f.a.Date,null,a)),r.a.createElement(f.a.Extra,{text:!0},t),r.a.createElement(f.a.Meta,null,r.a.createElement(f.a.Like,null,r.a.createElement(k.a,{name:"flag",onClick:this.reportMsg})))))}}]),t}(r.a.Component),O=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(p.a)(this,Object(g.a)(t).call(this,e))).handlePaginationChange=function(e,t){var n=t.activePage;a.setState({activePage:n}),a.fetchData(n)},a.state={items:[],activePage:1,numberPages:1},a}return Object(d.a)(t,e),Object(h.a)(t,[{key:"fetchData",value:function(e){var t=this;fetch("https://minitwit-api.herokuapp.com/public?p="+e).then((function(e){return e.json()})).then((function(e){console.log("success fetching api",e),t.setState({isLoaded:!0,items:e.messages,numberPages:e.pageCount,activePage:e.page})}),(function(e){t.setState({isLoaded:!0}),console.log("fail fetching api",e)}))}},{key:"componentDidMount",value:function(){this.fetchData(1)}},{key:"render",value:function(){var e=this.state,t=(e.isLoaded,e.items);return r.a.createElement("div",null,this.state.isLoaded?r.a.createElement("div",null,r.a.createElement(f.a,{size:"large"},t.map((function(e){return r.a.createElement(j,{key:e.message_id.toString(),name:e.author_username,text:e.text,date:e.pub_date})}))),r.a.createElement(E.a,null,r.a.createElement(E.a.Column,{textAlign:"center"},r.a.createElement(b.a,{activePage:this.state.activePage,onPageChange:this.handlePaginationChange,totalPages:this.state.numberPages,style:{marginBottom:"2em"}})))):r.a.createElement(v.a,null,r.a.createElement(w.a,{active:!0,style:{height:"15vh"}},r.a.createElement(y.a,{size:"big",inverted:!0},"Loading")),r.a.createElement(S.a,{src:"/images/wireframe/short-paragraph.png"})))}}]),t}(r.a.Component),C=a(26),P=a(353),x=a(343),M=a(348),T=a(346),A=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(p.a)(this,Object(g.a)(t).call(this,e))).changeHandler=function(e){var t=e.target.name,n=e.target.value;a.setState(Object(C.a)({},t,n))},a.sendToApi=function(){var e={username:a.state.username,password:a.state.password};fetch("https://minitwit-api.herokuapp.com/login",{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(e)}).then((function(e){200==e.status?a.props.history.push("/"):(console.log("login failed"),a.setState({errorMessage:!0}))}))},a.state={username:"",password:"",errorMessage:!1},a}return Object(d.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return r.a.createElement(E.a,{textAlign:"center",style:{height:"100vh"},verticalAlign:"middle"},r.a.createElement(E.a.Column,{style:{maxWidth:450}},r.a.createElement(P.a,{as:"h2",color:"teal",textAlign:"center"},"Log-in to your account"),r.a.createElement(x.a,{size:"large"},r.a.createElement(v.a,{stacked:!0},r.a.createElement(x.a.Input,{fluid:!0,icon:"user",iconPosition:"left",placeholder:"Username",name:"username",onChange:this.changeHandler}),r.a.createElement(x.a.Input,{fluid:!0,icon:"lock",iconPosition:"left",placeholder:"Password",type:"password",name:"password",onChange:this.changeHandler}),r.a.createElement(M.a,{color:"teal",fluid:!0,size:"large",onClick:this.sendToApi},"Login"))),r.a.createElement(T.a,null,"New to us? ",r.a.createElement("a",{href:"/signup"},"Sign Up")),this.state.errorMessage?r.a.createElement(T.a,{error:!0,header:"Sign in failed",list:["Make sure you correctly entered your credentials"]}):null))}}]),t}(r.a.Component),I=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(p.a)(this,Object(g.a)(t).call(this,e))).changeHandler=function(e){var t=e.target.name,n=e.target.value;a.setState(Object(C.a)({},t,n))},a.sendToApi=function(){a.setState({errorMessage:!1,errorMessageUser:!1});var e={username:a.state.username,password:a.state.password,email:a.state.email};e.username&&e.password&&e.email?fetch("https://minitwit-api.herokuapp.com/register",{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(e)}).then((function(e){200==e.status?(console.log("Sign up success"),a.setState({successMessage:!0})):409==e.status?(console.log("Username exists"),a.setState({errorMessageUser:!0})):(a.setState({errorMessage:!0}),console.log("Sign up error"))})):a.setState({errorMessage:!0})},a.state={username:"",password:"",password2:"",email:"",errorMessage:!1,successMessage:!1,errorMessageUser:!1},a}return Object(d.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return r.a.createElement(E.a,{textAlign:"center",style:{height:"100vh"},verticalAlign:"middle"},r.a.createElement(E.a.Column,{style:{maxWidth:450}},r.a.createElement(P.a,{as:"h2",color:"teal",textAlign:"center"},"Sign up"),r.a.createElement(x.a,{size:"large"},r.a.createElement(v.a,{stacked:!0},r.a.createElement(x.a.Input,{fluid:!0,icon:"user",iconPosition:"left",placeholder:"Username",name:"username",onChange:this.changeHandler}),r.a.createElement(x.a.Input,{fluid:!0,icon:"user",iconPosition:"left",placeholder:"E-mail address",name:"email",onChange:this.changeHandler}),r.a.createElement(x.a.Input,{fluid:!0,icon:"lock",iconPosition:"left",placeholder:"Password",type:"password",name:"password",onChange:this.changeHandler}),r.a.createElement(x.a.Input,{fluid:!0,icon:"lock",iconPosition:"left",placeholder:"Repeat password",type:"password",name:"password2",onChange:this.changeHandler}),r.a.createElement(M.a,{color:"teal",fluid:!0,size:"large",onClick:this.sendToApi},"Sign Up"))),r.a.createElement(T.a,null,"Already a member? ",r.a.createElement("a",{href:"/signin"},"Sign In")),this.state.successMessage?r.a.createElement(T.a,{success:!0,header:"Your user registration was successful",content:"You may now log-in with the username you have chosen."}):null,this.state.errorMessage?r.a.createElement(T.a,{error:!0,header:"Sign up failed",list:["Make sure you entered a valid email address","Make sure you entered correctly the passwords"]}):null,this.state.errorMessageUser?r.a.createElement(T.a,{error:!0,header:"Sign up failed",list:["Username already exists. Please choose another one"]}):null))}}]),t}(r.a.Component),H=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(p.a)(this,Object(g.a)(t).call(this,e))).changeHandler=function(e){var t=e.target.name,n=e.target.value;a.setState(Object(C.a)({},t,n))},a.sendToApi=function(){var e={text:a.state.text};fetch("https://minitwit-api.herokuapp.com/add_message",{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(e)}).then((function(e){200==e.status&&(a.setState({successMessage:!0}),setTimeout((function(){a.setState({successMessage:!1}),window.location.reload()}),3500))})).catch((function(e){return console.log(e)}))},a.state={text:"",successMessage:!1},a}return Object(d.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return r.a.createElement(v.a,null,r.a.createElement(x.a,null,r.a.createElement(x.a.Group,{widths:"equal"},r.a.createElement(x.a.TextArea,{id:"form-textarea-control-opinion",label:"Whats on your mind ?",placeholder:"type here..",name:"text",onChange:this.changeHandler})),r.a.createElement(M.a,{type:"submit",onClick:this.sendToApi},"Submit")),this.state.successMessage?r.a.createElement(T.a,{success:!0,header:"Hooray!",content:"Your message is now available to your followers"}):null)}}]),t}(r.a.Component),U=a(40),L=a(90),z=function(e){function t(e){var a;return Object(m.a)(this,t),a=Object(p.a)(this,Object(g.a)(t).call(this,e)),console.log(e),a.onFollowClicked=a.onFollowClicked.bind(Object(U.a)(a)),a.state={items:[],loaded:!1,followError:!1,followSuccess:!1,username:a.props.location.pathname.substr(1)},a}return Object(d.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("https://minitwit-api.herokuapp.com/"+this.state.username).then((function(e){return e.json()})).then((function(t){console.log("success fetching api"),e.setState({items:t.response,loaded:!0})}),(function(t){e.setState({error:t}),console.log("fail fetching api")}))}},{key:"onFollowClicked",value:function(){var e=this;fetch("https://minitwit-api.herokuapp.com/"+this.state.username+"/follow").then((function(t){console.log("success",t),200==t.status?(e.setState({followSuccess:!0}),setTimeout((function(){e.setState({followSuccess:!1})}),3500)):(console.log("error"),e.setState({followError:!0}))})).catch((function(t){return e.setState({followError:!0})}))}},{key:"render",value:function(){var e=this,t=this.state.items;return r.a.createElement("div",null,this.state.loaded?r.a.createElement(c.a,{text:!0,style:{marginTop:"7em"}},r.a.createElement(P.a,{as:"h1"},this.state.username,"'s feed"),r.a.createElement(M.a,{as:"div",labelPosition:"right",onClick:this.onFollowClicked},r.a.createElement(M.a,{basic:!0,color:"blue"},r.a.createElement(k.a,{name:"user plus"}),"Follow"),r.a.createElement(L.a,{as:"a",basic:!0,color:"blue",pointing:"left"},"+1")),this.state.followError?r.a.createElement(T.a,{error:!0,header:"Follow failed",list:["An unexpected error has occured. Please try again later."]}):null,this.state.followSuccess?r.a.createElement(T.a,{success:!0,header:"Follow successful",content:"You are now following the user."}):null,r.a.createElement(f.a,{size:"large"},t.map((function(t){return r.a.createElement(j,{key:t.message_id.toString(),name:e.username,text:t.text,date:t.pub_date})})))):r.a.createElement(v.a,null,r.a.createElement(w.a,{active:!0,style:{height:"15vh",marginTop:"7em"}},r.a.createElement(y.a,{size:"big",inverted:!0},"Loading")),r.a.createElement(S.a,{src:"/images/wireframe/short-paragraph.png"})))}}]),t}(r.a.Component),F=a(42);var D=function(){return r.a.createElement("div",null,r.a.createElement(c.a,{text:!0,style:{marginTop:"7em"}},r.a.createElement(H,null),r.a.createElement(P.a,{as:"h1"},"Public Feed"),r.a.createElement(O,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement((function(){return r.a.createElement(l.a,null,r.a.createElement(u,null),r.a.createElement(F.c,null,r.a.createElement(F.a,{exact:!0,path:"/",component:D}),r.a.createElement(F.a,{path:"/public",component:D}),r.a.createElement(F.a,{path:"/signin",component:A}),r.a.createElement(F.a,{path:"/signup",component:I}),r.a.createElement(F.a,{path:"/:user",component:z})))}),null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[192,1,2]]]);
//# sourceMappingURL=main.ad6ddc5e.chunk.js.map