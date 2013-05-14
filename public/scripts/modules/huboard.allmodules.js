/**
 * @license RequireJS text 0.27.1 Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

define("marker",{}),define("backlog/collections/issues",[],function(){var e={fetch:function(e,t){var n=this;$.ajax({url:"/api/"+e+"/"+t+"/backlog",dataType:"json",success:function(e){n.trigger("ondatareceived",e)}})}};return _.extend(e,Backbone.Events),e}),function(){var e=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],t=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,n=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,r=typeof location!="undefined"&&location.href,i=r&&location.protocol&&location.protocol.replace(/\:/,""),s=r&&location.hostname,o=r&&(location.port||undefined),u=[];define("text",[],function(){var a,f,l;return typeof window!="undefined"&&window.navigator&&window.document?f=function(e,t){var n=a.createXhr();n.open("GET",e,!0),n.onreadystatechange=function(e){n.readyState===4&&t(n.responseText)},n.send(null)}:typeof process!="undefined"&&process.versions&&!!process.versions.node?(l=require.nodeRequire("fs"),f=function(e,t){t(l.readFileSync(e,"utf8"))}):typeof Packages!="undefined"&&(f=function(e,t){var n="utf-8",r=new java.io.File(e),i=java.lang.System.getProperty("line.separator"),s=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(r),n)),o,u,a="";try{o=new java.lang.StringBuffer,u=s.readLine(),u&&u.length()&&u.charAt(0)===65279&&(u=u.substring(1)),o.append(u);while((u=s.readLine())!==null)o.append(i),o.append(u);a=String(o.toString())}finally{s.close()}t(a)}),a={version:"0.27.1",strip:function(e){if(e){e=e.replace(t,"");var r=e.match(n);r&&(e=r[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r")},createXhr:function(){var t,n,r;if(typeof XMLHttpRequest!="undefined")return new XMLHttpRequest;for(n=0;n<3;n++){r=e[n];try{t=new ActiveXObject(r)}catch(i){}if(t){e=[r];break}}if(!t)throw new Error("createXhr(): XMLHttpRequest not available");return t},get:f,parseName:function(e){var t=!1,n=e.indexOf("."),r=e.substring(0,n),i=e.substring(n+1,e.length);return n=i.indexOf("!"),n!==-1&&(t=i.substring(n+1,i.length),t=t==="strip",i=i.substring(0,n)),{moduleName:r,ext:i,strip:t}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,t,n,r){var i=a.xdRegExp.exec(e),s,o,u;return i?(s=i[2],o=i[3],o=o.split(":"),u=o[1],o=o[0],(!s||s===t)&&(!o||o===n)&&(!u&&!o||u===r)):!0},finishLoad:function(e,t,n,r,i){n=t?a.strip(n):n,i.isBuild&&i.inlineText&&(u[e]=n),r(n)},load:function(e,t,n,u){var f=a.parseName(e),l=f.moduleName+"."+f.ext,c=t.toUrl(l),h=u&&u.text&&u.text.useXhr||a.useXhr;!r||h(c,i,s,o)?a.get(c,function(t){a.finishLoad(e,f.strip,t,n,u)}):t([l],function(e){a.finishLoad(f.moduleName+"."+f.ext,f.strip,e,n,u)})},write:function(e,t,n,r){if(t in u){var i=a.jsEscape(u[t]);n.asModule(e+"!"+t,"define(function () { return '"+i+"';});\n")}},writeFile:function(e,t,n,r,i){var s=a.parseName(t),o=s.moduleName+"."+s.ext,u=n.toUrl(s.moduleName+"."+s.ext)+".js";a.load(o,n,function(t){var n=function(e){return r(u,e)};n.asModule=function(e,t){return r.asModule(e,u,t)},a.write(e,o,n,i)},i)}},a})}(),define("text!backlog/templates/board.html",[],function(){return'<div class="backlog">\n</div>\n'}),define("text!backlog/templates/column.html",[],function(){return'<h3><%= milestone.title %></h3>\n<ul class="sortable"></ul>\n'}),define("text!backlog/templates/card.html",[],function(){return'<a href="#"  title="Close issue" class="close iconic x"><span></span></a>\n<div class="card-header">\n  <div class="title" title="<%= title %>">\n    <%= title %>\n  </div>\n  <a class="number" href="<%= html_url %>" target="_blank" title="View issue on github.com"><small>#</small><%= number %></a>\n</div>\n<% if(assignee) { %>\n <img data-placement="right" rel="twipsy" title="Assigned to <%= assignee.login %>" src="https://secure.gravatar.com/avatar/<%= assignee.gravatar_id %>?s=24" />\n<% } %>\n\n<% if(milestone) { %>\n<div class="milestone">\n   Milestone: <%= milestone.title %>\n</div>\n<% } %>\n<% if (pull_request.html_url) { %><span class="label label-info">Pull request</span> <%}%>\n<div class="card-labels">\n<% _(other_labels).each(function(l) { %>\n<div class="card-label-wrapper"> \n  <div class="card-label -x<%= l.color %> active small"> \n  </div>\n  <div class="card-label -x<%= l.color %> active large"> \n    <span> <%= l.name %> </span>\n  </div>\n</div>\n\n<% }); %>\n\n</div>\n'}),define("common/events/postal",["socket"],function(e){function t(){return((1+Math.random())*65536|0).toString(16).substring(1)}function n(){return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t()}var r={},i=n();return{correlationId:i,subscribe:function(e,t){postal.channel(e).subscribe(t)},channel:function(e){return postal.channel(e)},publish:function(e,t){postal.channel(e).publish(t)},socket:function(t,n,s){if(!e)return;var o=postal.channel(t);postal.channel(n).subscribe(s);if(r[t])return;r[t]=t,e.on(t,function(e){e.correlationId!==i&&postal.channel(e.event).publish(e.payload)})}}}),define("backlog/models/card",["../../common/events/postal"],function(e){var t=function(e){this.attributes=e.model,this.user=e.user,this.repo=e.repo};return _.extend(t.prototype,{save:function(t){$.post("/api/"+this.attributes.repo.owner.login+"/"+this.attributes.repo.name+"/assignmilestone",{milestone:t.milestone,issue:this.attributes,correlationId:e.correlationId},function(e){})},close:function(t){$.post("/api/"+this.attributes.repo.owner.login+"/"+this.attributes.repo.name+"/close",{index:t.index,issue:this.attributes,correlationId:e.correlationId},function(e){})},assign:function(t){this.attributes.assignee=t,$.post("/api/"+this.attributes.repo.owner.login+"/"+this.attributes.repo.name+"/assigncard",{issue:this.attributes,correlationId:e.correlationId,assignee:t.login},function(e){})},reorder:function(t){$.post("/api/"+this.attributes.repo.owner.login+"/"+this.attributes.repo.name+"/reorderissue",{index:t.order,issue:this.attributes,correlationId:e.correlationId},function(e){})}}),t}),define("backlog/views/cardView",["text!../templates/card.html","../models/card","../../common/events/postal"],function(e,t,n){return Backbone.View.extend({initialize:function(e){this.issue=new t({model:e.issue,user:e.user,repo:e.repo}),_.bind(this,"moved",this.moved),_.bind(this,"reorder",this.drop),n.subscribe("Filter.Simple",$.proxy(this.simpleFilter,this)),n.subscribe("Filter.Complex",$.proxy(this.complexFilter,this)),n.socket(e.user+"/"+e.repo,"Closed."+e.issue.number,$.proxy(this.onClosed,this)),n.socket(e.user+"/"+e.repo,"Assigned."+e.issue.number,$.proxy(this.onAssigned,this)),n.socket(e.user+"/"+e.repo,"Updated."+e.issue.number,$.proxy(this.onUpdated,this)),this.filtersHash={simple:{},complex:{}}},events:{moved:"moved","click .close":"closed",drop:"dropped",reorder:"drop","click .number":"onNumber",click:"fullscreen"},tagName:"li",onMoved:function(e){n.publish("Moved.Socket."+e.index,{card:this})},onNumber:function(e){e.stopPropagation()},onUpdated:function(e){this.issue.attributes=_.extend(this.issue.attributes,e.issue),this.render(),this.transition()},onClosed:function(){this.remove(),n.publish("Closed.Issue",{card:this})},fullscreen:function(e){n.publish("Card.Fullscreen",this.issue)},render:function(){$(this.el).html(_.template(e,this.issue.attributes)).droppable({scope:"assignee",hoverClass:"assignee-accept"}).data("issue",this.issue.attributes);if(this.issue.attributes.repo.color){var t=$.Color("#"+this.issue.attributes.repo.color),n="3px solid "+$.Color(t.alpha(.5)).toRgbaString();$(this.el).css({"border-left":n})}return this},moved:function(e,t){this.issue.save({milestone:t.milestone})},dropped:function(e,t){var n=$(t.draggable).data("assignee");this.issue.assign(n),this.onAssigned({assignee:n})},onAssigned:function(e){this.issue.attributes.assignee=e.assignee,this.render()},closed:function(e,t){e.preventDefault(),this.issue.close({index:t}),this.remove(),n.publish("Closed.Issue",{card:this})},transition:function(){var e=[],t=this;setTimeout(function(){for(var n in t.filtersHash.simple)e.push(t.filtersHash.simple[n]);var r=_.filter(e,function(e){return e.state===1}),i=_.filter(e,function(e){return e.state===2});if(_.any(i,function(e){return!e.condition(t.issue.attributes)})){$(t.el).addClass("hide").removeClass("dim active");return}if(_.any(r,function(e){return!e.condition(t.issue.attributes)})){$(t.el).addClass("dim").removeClass("hide active");return}$(t.el).removeClass("dim hide active"),(r.length||i.length)&&$(t.el).addClass("active")},0)},simpleFilter:function(e){var t=this;this.filtersHash.simple[e.id]=e,this.transition()},drop:function(e,t){this.issue.reorder({order:t})}})}),define("backlog/models/milestone",[],function(){var e=function(e){this.attributes=e.model,this.user=e.user,this.repo=e.repo};return _.extend(e.prototype,{save:function(e){if(!e.order||e.order===0)console.error("something wrong happened index should not be 0"),console.log("falling back to original number",this.attributes.number),e.order=this.attributes.number;$.post("/api/"+this.user+"/"+this.repo+"/reordermilestone",{index:e.order,status:e.status,milestone:this.attributes},function(e){})}}),e}),define("backlog/views/columnView",["text!../templates/column.html","./cardView","../../common/events/postal","../models/milestone"],function(e,t,n,r){var i=Backbone.View.extend({initialize:function(e){this.column=e.column,this.repo=e.repo,this.user=e.user,this.milestone=new r({model:this.column.milestone,user:e.user,repo:e.repo}),_.bind("reordered",this.reordered)},tagName:"div",className:"column",events:{reorder:"reordered"},reordered:function(e,t){this.milestone.save(t)},onOpened:function(e){var r=new t({issue:e,user:this.user,repo:this.repo});$("ul",this.el).append(r.render().el),n.publish("Opened.Issue",e)},onSocket:function(e){var t=$("li",this.el),n=t.index(e.card.el);if(n!==-1)return;$("ul",this.el).append(e.card.el)},render:function(){var n=$(_.template(e,this.column)),r=this,i=_.map(this.column.issues,function(e){var n=new t({issue:e,user:r.user,repo:r.repo});return n.render().el});return $(this.el).append(n).data("milestone",this.column.milestone).find("ul").append(i),$("ul",this.el).sortable({helper:"clone",connectWith:".sortable",placeholder:"ui-sortable-placeholder",receive:$.proxy(this.onReceive,this),remove:$.proxy(this.onRemove,this),over:$.proxy(this.onOver,this),update:$.proxy(this.onStop,this),out:$.proxy(this.onOut,this)}),this},onReceive:function(e,t){$(t.item).trigger("moved",this.column)},onRemove:function(e,t){},onOver:function(e,t){$("ul",this.el).addClass("ui-sortable-hover")},onOut:function(e,t){$("ul",this.el).removeClass("ui-sortable-hover")},onStop:function(e,t){var n=$("li",this.el),r=n.index(t.item);if(r===-1)return;var i=r===0,s=r===n.size()-1,o=$(t.item),u=o.data("issue"),a=n.get(r?r-1:r),f=n.index(a),l=$(a).data("issue"),c=n.get(n.size()-1>r?r+1:r),h=n.index(c),p=$(c).data("issue"),d=u._data.order||u.number,v=l._data.order||l.number,m=p._data.order||p.number;if(i&&s)return;i?(u._data.order=(m||1)/2,o.trigger("reorder",u._data.order).data("issue",u)):s?(u._data.order=v+1,o.trigger("reorder",u._data.order).data("issue",u)):(u._data.order=(m+v||1)/2,o.trigger("reorder",u._data.order).data("issue",u))}});return i}),define("backlog/views/filterView",["../../common/events/postal"],function(e){return jQuery.Color.fn.contrastColor=function(){var e=this._rgba[0],t=this._rgba[1],n=this._rgba[2];return(e*299+t*587+n*144)/1e3>=131.5?"#333":"white"},Backbone.View.extend({tagName:"li",className:"filter",initialize:function(e){this.params=e,this.condition=e.condition,this.name=e.name,this.type=e.type||"Simple",this.state=0,this.states=[0,1,2,0]},events:{click:"clicked",clear:"clearAndPublish","click .iconic":"clearAndPublish"},render:function(){return $(this.el).html("<a href='#'>"+this.name+"<span class='iconic x-alt'></span></a>").addClass("-x"+this.params.color.substring(1)).data("filter",this),this},clicked:function(e){e.preventDefault();switch(this.state=this.states[this.state+1]){case 0:this.clear();break;case 1:this.fade();break;case 2:this.solid()}this.publish()},clear:function(){$(this.el).find("a").removeClass("dim").removeClass("active")},publish:function(){e.publish("Filter."+this.type,{id:this.cid,condition:this.condition,state:this.state})},clearAndPublish:function(e){return e.preventDefault(),this.state=0,this.publish(),this.clear(),!1},fade:function(){$(this.el).find("a").addClass("dim").removeClass("active")},solid:function(){$(this.el).find("a").addClass("active").removeClass("dim")}})}),define("backlog/views/sidebarView",["../../common/events/postal","./filterView"],function(e,t){return Backbone.View.extend({tagName:"ul",className:"filters",initialize:function(e){this.login=e.params.login,this.labels=e.data.other_labels},render:function(){var e=$(this.el),n=this.login,r=(new t({color:"#0069D6",name:"Assigned to me",condition:function(e){return e.assignee&&e.assignee.login===n}})).render(),i=(new t({color:"#0069D6",name:"Assigned to others",condition:function(e){return e.assignee&&e.assignee.login!==n}})).render(),s=(new t({color:"#0069D6",name:"Unassigned issues",condition:function(e){return!e.assignee}})).render(),o=$([r.el,i.el,s.el]);e.append(o),o.click(function(e){e.preventDefault();var t=$(this),n=t.data("filter"),r=_(o).filter(function(e){var t=$(e).data("filter");return n.cid!==t.cid&&t.state!==0});_(r).each(function(e){$(e).trigger("clear")})});var u=_.map(this.labels,function(e){return(new t({color:"#"+e.color,name:e.name,condition:function(t){return _.any(t.labels,function(t){return t.name.toLocaleLowerCase()===e.name.toLocaleLowerCase()})}})).render().el});return e.append("<h5>Labels</h5>"),e.append(u),this}})}),define("backlog/views/headerView",["../../common/events/postal"],function(e){return Backbone.View.extend({el:$(".page-header-wrapper"),events:{"keyup input":"onkeyup"},initialize:function(t){var n=this;this.publish=_.debounce(function(){var t=$(n.el).find("input").val();e.publish("Filter.Simple",{id:"search",condition:function(e){return e.title.toLocaleLowerCase().indexOf(t.toLocaleLowerCase())!==-1},state:2})},300)},onkeyup:function(e){this.publish()}})}),define("text!backlog/templates/assignee.html",[],function(){return'<li class="assignee" data-login="<%= login %>">\n  <img src="https://secure.gravatar.com/avatar/<%= gravatar_id %>?s=24" title="<%=login %>" alt="<%= login %>"/>\n</li>\n'}),define("backlog/views/assigneeView",["text!../templates/assignee.html"],function(e){return Backbone.View.extend({el:$(".page-header-wrapper"),initialize:function(e){var t=this;t.data=e.data,t.render()},render:function(){var t=$(this.el).find("ol"),n=_(this.data.assignees).chain().map(function(t){return $(_.template(e,t)).data("assignee",t)}).value();return t.append(n),t.find("li").draggable({helper:"clone",scope:"assignee",zIndex:100,appendTo:"body"}),this}})}),define("text!backlog/templates/css.html",[],function(){return'<% \n_(["filter","card-label"]).each(function(name){\n  _(other_labels).each(function(l) {\n%>\n  .<%= name %>.-x<%= l.color %>.active, .<%= name %>.-x<%= l.color %>.active:hover  {\n    background-color: #<%= l.color %>;\n    background-color: <%= $.Color("#" + l.color).toString() %>;\n    color: <%= $.Color("#" + l.color).contrastColor() %>;\n  }\n\n  .<%= name %>.-x<%= l.color %> .active, .<%= name %>.-x<%= l.color %> .active:hover  {\n    background-color: #<%= l.color %>;\n    background-color: <%= $.Color("#" + l.color).toString() %>;\n    color: <%= $.Color("#" + l.color).contrastColor() %>;\n  }\n  \n  .<%= name %>.-x<%= l.color %>.dim, .<%= name %>.-x<%= l.color %>.dim:hover  {\n    background-color: <%= $.Color($.Color("#" + l.color).alpha(0.6)).toString() %>;\n    color: <%= $.Color("#" + l.color).contrastColor() %>;\n  }\n\n  .<%= name %>.-x<%= l.color %> .dim ,  .<%= name %>.-x<%= l.color %> .dim:hover {\n    background-color: <%= $.Color($.Color("#" + l.color).alpha(0.6)).toString() %>;\n    color: <%= $.Color("#" + l.color).contrastColor() %>;\n  }\n\n  <%})});%>\n'}),define("backlog/views/cssView",["../collections/issues","text!../templates/css.html"],function(e,t){e.bind("ondatareceived",function(e){var n=_.template(t,e),r=document.getElementsByTagName("head")[0],i=document.createElement("style");i.type="text/css",i.styleSheet?i.styleSheet.cssText=n:i.appendChild(document.createTextNode(n)),r.appendChild(i)})}),define("backlog/views/board",["../collections/issues","text!../templates/board.html","./columnView","./sidebarView","./headerView","./assigneeView","../../common/events/postal","./cssView"],function(e,t,n,r,i,s,o){var u=function(){var e=_($("ul")).chain().map(function(e){return $(e).height()}).reduce(function(e,t){return t>e?t:e}).value();return e},a=function(e){switch(e){case"open":$("#drawer").find(".toggle-drawer").removeClass("arrow-right").addClass("arrow-left").end().animate({left:"+=270px"},300),$("#content").animate({"margin-left":"+=100px"},300);break;case"close":$("#drawer").animate({left:"-=270px"},300,function(){$(this).find(".toggle-drawer").removeClass("arrow-left").addClass("arrow-right").end()}),$("#content").animate({"margin-left":"-=100px"},300)}};return Backbone.View.extend({el:$("#stage"),events:{"click .toggle-drawer":"toggleDrawer"},initialize:function(t){e.bind("ondatareceived",this.onfetch,this),e.fetch(t.user,t.repo),this.user=t.user,this.repo=t.repo,this.params=t,o.subscribe("Opened.Issue",$.proxy(this.onOpened,this)),o.subscribe("Closed.Issue",$.proxy(this.onClosed,this))},onOpened:function(){this.resizeColumns()},onClosed:function(){this.resizeColumns()},onfetch:function(e){var o=$(_.template(t,e)),u=o.clone(),a=e.unassigned,f=new r({data:e,params:this.params}),l=new i,c=new s({data:e,params:this.params}),h=this;$(u).append((new n({column:a,user:this.user,repo:this.repo})).render().el),_.each(e.milestones,function(e){var t=new n({column:e,user:h.user,repo:h.repo}),r=$(t.render().el).css({width:"260px"});$(o).append(r)}),$("#stage").append(o),$(o).sortable({axis:"x",handle:"h3",cursor:"move",stop:$.proxy(this.fullStop,this),start:$.proxy(this.onStart,this),remove:$.proxy(this.onRemove,this),over:$.proxy(this.onOver,this),update:$.proxy(this.onStop,this)}),$("#drawer","#main-stage").append(f.render().el).find(".toggle-drawer").show(),$(".sidebar-wrapper").append(u).show(),$('[rel~="twipsy"]').tooltip({live:!0}),this.resizeColumns()},resizeColumns:function(){var e=u();$("ul","#main-stage").css("min-height",e)},toggleDrawer:function(e){e.preventDefault();var t=$(".toggle-drawer").hasClass("arrow-left");t?a("close"):a("open")},onReceive:function(e,t){},onRemove:function(e,t){},onOver:function(e,t){},onOut:function(e,t){},fullStop:function(e,t){$(t.item).removeClass("ui-state-dragging")},onStart:function(e,t){$(t.item).addClass("ui-state-dragging")},onStop:function(e,t){var n=$(".backlog > div",this.el),r=n.index(t.item);if(r===-1)return;var i=r===0,s=r===n.size()-1,o=$(t.item),u=o.data("milestone"),a=n.get(r?r-1:r),f=n.index(a),l=$(a).data("milestone"),c=n.get(n.size()-1>r?r+1:r),h=n.index(c),p=$(c).data("milestone"),d=u._data.order||u.number,v=l._data.order||l.number,m=p._data.order||p.number;if(i&&s)u._data.order=d;else if(i){var g=m||1;u._data.order=g-1>0?g-1:g/2}else s?u._data.order=v+1:u._data.order=(m+v||1)/2;o.trigger("reorder",{order:u._data.order}).data("milestone",u)}})}),define("backlog/main",["./views/board"],function(e){var t={};return{init:function(n){t.board=new e(n)}}}),define("board/collections/issues",[],function(){var e={fetch:function(e,t){var n=this,r=$.ajax({url:"/api/"+e+"/"+t+"/board",dataType:"json",success:function(e){}}),i=$.ajax({url:"/api/"+e+"/"+t+"/column",dataType:"json"});$.when(r).then(function(e){n.trigger("ondatareceived",e),_.each(e.labels,function(e){n.trigger("onissuesreceived."+e.index,e.issues)}),n.trigger("afterreceived"),$.when(i).then(function(e){n.trigger("onissuesreceived.0",e.issues),n.trigger("afterreceived")})})}};return _.extend(e,Backbone.Events),e}),define("text!board/templates/board.html",[],function(){return'<div class="board">\n</div>\n'}),define("text!board/templates/column.html",[],function(){return'<div class="column">\n<h3><%= text %></h3>\n<ul class="sortable"></ul>\n</div>\n'}),define("text!board/templates/card.html",[],function(){return'<a href="#"  title="Close issue" class="close iconic x"><span></span></a>\n<div class="card-header">\n  <div class="title title="<%= title %>">\n    <%= title %> \n  </div>\n \n  <a class="number" href="<%= html_url %>" target="_blank" title="View issue on github.com"><small>#</small><%= number %></a>\n</div>\n<% if(assignee) { %>\n <img data-placement="right" rel="twipsy" title="Assigned to <%= assignee.login %>" src="https://secure.gravatar.com/avatar/<%= assignee.gravatar_id %>?s=24" />\n<% } %>\n\n<% if(milestone) { %>\n<div class="milestone">\n   Milestone: <%= milestone.title %>\n</div>\n<% } %>\n <!-- <a href="javascript:void(0);" onclick="highlightTasks(\'<%= title %>\');" >..<img src="/css/link.png" /></a>  -->\n<% if(pull_request.html_url) { %>\n  <span class="label label-info">Pull request</span>\n<% } %>\n<div class="card-labels">\n<% _(other_labels).each(function(l) { %>\n<div class="card-label-wrapper"> \n  <div class="card-label -x<%= l.color %> active small"> \n  </div>\n  <div class="card-label -x<%= l.color %> active large"> \n    <span> <%= l.name %> </span>\n  </div>\n</div>\n\n<% }); %>\n\n</div> <a href="#" class="linker" title="<%= title %>"  >..</a> \n'}),define("board/models/card",["../../common/events/postal"],function(e){var t=function(e){this.attributes=e.model,this.user=e.user,this.repo=e.repo};return _.extend(t.prototype,{save:function(t){$.post("/api/"+this.attributes.repo.owner.login+"/"+this.attributes.repo.name+"/movecard",{index:t.index,issue:this.attributes,correlationId:e.correlationId},function(e){})},close:function(t){$.post("/api/"+this.attributes.repo.owner.login+"/"+this.attributes.repo.name+"/close",{index:t.index,issue:this.attributes,correlationId:e.correlationId},function(e){})},assign:function(t){this.attributes.assignee=t,$.post("/api/"+this.attributes.repo.owner.login+"/"+this.attributes.repo.name+"/assigncard",{issue:this.attributes,correlationId:e.correlationId,assignee:t.login},function(e){})},reorder:function(t){$.post("/api/"+this.attributes.repo.owner.login+"/"+this.attributes.repo.name+"/reorderissue",{index:t.order,issue:this.attributes,correlationId:e.correlationId},function(e){})}}),t}),define("board/views/cardView",["text!../templates/card.html","../models/card","../../common/events/postal"],function(e,t,n){return Backbone.View.extend({initialize:function(e){this.issue=new t({model:e.issue,user:e.user,repo:e.repo}),_.bind(this,"moved",this.moved),_.bind(this,"reorder",this.drop),n.subscribe("Filter.Simple",$.proxy(this.simpleFilter,this)),n.subscribe("Filter.Complex",$.proxy(this.complexFilter,this)),n.socket(e.user+"/"+e.repo,"Moved."+e.issue.number,$.proxy(this.onMoved,this)),n.socket(e.user+"/"+e.repo,"Closed."+e.issue.number,$.proxy(this.onClosed,this)),n.socket(e.user+"/"+e.repo,"Assigned."+e.issue.number,$.proxy(this.onAssigned,this)),n.socket(e.user+"/"+e.repo,"Updated."+e.issue.number,$.proxy(this.onUpdated,this)),this.filtersHash={simple:{},complex:{}}},events:{moved:"moved","click .close":"closed",drop:"dropped",reorder:"drop","click .number":"onNumber",click:"fullscreen"},tagName:"li",onNumber:function(e){e.stopPropagation()},onMoved:function(e){n.publish("Moved.Socket."+e.index,{card:this})},onUpdated:function(e){this.issue.attributes=_.extend(this.issue.attributes,e.issue),this.render(),this.transition()},onClosed:function(){this.remove(),n.publish("Closed.Issue",{card:this})},fullscreen:function(e){n.publish("Card.Fullscreen",this.issue)},render:function(){$(this.el).html(_.template(e,this.issue.attributes)).droppable({scope:"assignee",hoverClass:"assignee-accept"}).data("issue",this.issue.attributes);if(this.issue.attributes.repo.color){var t=$.Color("#"+this.issue.attributes.repo.color),n="3px solid "+$.Color(t.alpha(.5)).toRgbaString();$(this.el).css({"border-left":n})}return this},moved:function(e,t){this.issue.save({index:t})},dropped:function(e,t){var n=$(t.draggable).data("assignee");this.issue.assign(n),this.onAssigned({assignee:n})},onAssigned:function(e){this.issue.attributes.assignee=e.assignee,this.render()},closed:function(e,t){e.preventDefault(),e.stopPropagation(),this.issue.close({index:t}),this.remove(),n.publish("Closed.Issue",{card:this})},transition:function(){var e=[],t=this;setTimeout(function(){for(var n in t.filtersHash.simple)e.push(t.filtersHash.simple[n]);var r=_.filter(e,function(e){return e.state===1}),i=_.filter(e,function(e){return e.state===2});if(_.any(i,function(e){return!e.condition(t.issue.attributes)})){$(t.el).addClass("hide").removeClass("dim active");return}if(_.any(r,function(e){return!e.condition(t.issue.attributes)})){$(t.el).addClass("dim").removeClass("hide active");return}$(t.el).removeClass("dim hide active"),(r.length||i.length)&&$(t.el).addClass("active")},0)},simpleFilter:function(e){var t=this;this.filtersHash.simple[e.id]=e,this.transition()},drop:function(e,t){this.issue.reorder({order:t})}})}),define("board/views/columnView",["../collections/issues","text!../templates/column.html","./cardView","../../common/events/postal"],function(e,t,n,r){var i=Backbone.View.extend({initialize:function(t){this.column=t.column,this.repo=t.repo,this.user=t.user,this.latched=!1,r.subscribe("Moved.Socket."+t.column.index,$.proxy(this.onSocket,this)),r.socket(t.user+"/"+t.repo,"Opened."+t.column.index,$.proxy(this.onOpened,this)),e.bind("onissuesreceived."+t.column.index,this.onfetch,this)},onfetch:function(e){var t=_.map(e,function(e){var t=new n({issue:e,user:self.user,repo:self.repo});return t.render().el});$("ul",this.el).append(t)},onOpened:function(e){var t=new n({issue:e,user:this.user,repo:this.repo});$("ul",this.el).append(t.render().el),r.publish("Opened.Issue",e)},onSocket:function(e){var t=$("li",this.el),n=t.index(e.card.el);if(n!==-1)return;$("ul",this.el).append(e.card.el)},render:function(){var e=$(_.template(t,this.column)),n=this;return this.el=e,$("ul",this.el).sortable({helper:"clone",connectWith:".sortable",placeholder:"ui-sortable-placeholder",receive:$.proxy(this.onReceive,this),remove:$.proxy(this.onRemove,this),over:$.proxy(this.onOver,this),update:$.proxy(this.onStop,this),out:$.proxy(this.onOut,this)}),this},onReceive:function(e,t){$(t.item).trigger("moved",this.column.index)},onRemove:function(e,t){},onOver:function(e,t){$("ul",this.el).addClass("ui-sortable-hover")},onOut:function(e,t){$("ul",this.el).removeClass("ui-sortable-hover")},onStop:function(e,t){var n=$("li",this.el),r=n.index(t.item);if(r===-1)return;var i=r===0,s=r===n.size()-1,o=$(t.item),u=o.data("issue"),a=n.get(r?r-1:r),f=n.index(a),l=$(a).data("issue"),c=n.get(n.size()-1>r?r+1:r),h=n.index(c),p=$(c).data("issue"),d=u._data.order||u.number,v=l._data.order||l.number,m=p._data.order||p.number;if(i&&s)return;i?(u._data.order=(m||1)/2,o.trigger("reorder",u._data.order).data("issue",u)):s?(u._data.order=v+1,o.trigger("reorder",u._data.order).data("issue",u)):(u._data.order=(m+v||1)/2,o.trigger("reorder",u._data.order).data("issue",u))}});return i}),define("board/views/filterView",["../../common/events/postal"],function(e){return jQuery.Color.fn.contrastColor=function(){var e=this._rgba[0],t=this._rgba[1],n=this._rgba[2];return(e*299+t*587+n*144)/1e3>=131.5?"#333":"white"},Backbone.View.extend({tagName:"li",className:"filter",initialize:function(e){this.params=e,this.condition=e.condition,this.name=e.name,this.type=e.type||"Simple",this.state=0,this.states=[0,1,2,0]},events:{click:"clicked",clear:"clearAndPublish","click .iconic":"clearAndPublish"},render:function(){return $(this.el).html("<a href='#'>"+this.name+"<span class='iconic x-alt'></span></a>").addClass("-x"+this.params.color.substring(1)).data("filter",this),this},clicked:function(e){e.preventDefault();switch(this.state=this.states[this.state+1]){case 0:this.clear();break;case 1:this.fade();break;case 2:this.solid()}this.publish()},clear:function(){$(this.el).find("a").removeClass("dim").removeClass("active")},publish:function(){e.publish("Filter."+this.type,{id:this.cid,condition:this.condition,state:this.state})},clearAndPublish:function(e){return e.preventDefault(),this.state=0,this.publish(),this.clear(),!1},fade:function(){$(this.el).find("a").addClass("dim").removeClass("active")},solid:function(){$(this.el).find("a").addClass("active").removeClass("dim")}})}),define("board/views/sidebarView",["../../common/events/postal","./filterView"],function(e,t){return Backbone.View.extend({tagName:"ul",className:"filters",initialize:function(e){this.milestones=e.data.milestones,this.login=e.params.login,this.labels=e.data.other_labels},render:function(){var e=$(this.el),n=this.login,r=(new t({color:"#0069D6",name:"Assigned to me",condition:function(e){return e.assignee&&e.assignee.login===n}})).render(),i=(new t({color:"#0069D6",name:"Assigned to others",condition:function(e){return e.assignee&&e.assignee.login!==n}})).render(),s=(new t({color:"#0069D6",name:"Unassigned issues",condition:function(e){return!e.assignee}})).render(),o=$([r.el,i.el,s.el]);e.append(o),o.click(function(e){e.preventDefault();var t=$(this),n=t.data("filter"),r=_(o).filter(function(e){var t=$(e).data("filter");return n.cid!==t.cid&&t.state!==0});_(r).each(function(e){$(e).trigger("clear")})});var u=_.groupBy(this.milestones,function(e){return e._data.status||"backlog"}),a=(u.wip||[]).concat(u.backlog||[]),f=_.map(a,function(e){return(new t({color:"#0069D6",name:e.title,count:e.open_issues,condition:function(t){return t.milestone&&t.milestone.title.toLocaleLowerCase()===e.title.toLocaleLowerCase()}})).render().el}),l=(new t({color:"#0069D6",name:"No milestone assigned",condition:function(e){return!e.milestone}})).render().el;e.append("<h5>Milestones</h5>"),e.append(l),e.append(f),$(f.concat(l)).click(function(e){e.preventDefault();var t=$(this),n=t.data("filter"),r=_(f.concat(l)).filter(function(e){var t=$(e).data("filter");return n.cid!==t.cid&&t.state!==0});_(r).each(function(e){$(e).trigger("clear")})});var c=_.map(this.labels,function(e){return(new t({color:"#"+e.color,name:e.name,condition:function(t){return _.any(t.labels,function(t){return t.name.toLocaleLowerCase()===e.name.toLocaleLowerCase()})}})).render().el});return e.append("<h5>Labels</h5>"),e.append(c),this}})}),define("board/views/headerView",["../../common/events/postal"],function(e){return Backbone.View.extend({el:$(".page-header-wrapper"),events:{"keyup input":"onkeyup"},initialize:function(t){var n=this;this.publish=_.debounce(function(){var t=$(n.el).find("input").val();e.publish("Filter.Simple",{id:"search",condition:function(e){return e.title.toLocaleLowerCase().indexOf(t.toLocaleLowerCase())!==-1},state:2})},300)},onkeyup:function(e){this.publish()}})}),define("text!board/templates/assignee.html",[],function(){return'<li class="assignee" data-login="<%= login %>">\n  <img src="https://secure.gravatar.com/avatar/<%= gravatar_id %>?s=24" title="<%=login %>" alt="<%= login %>"/>\n</li>\n'}),define("board/views/assigneeView",["text!../templates/assignee.html"],function(e){return Backbone.View.extend({el:$(".page-header-wrapper"),initialize:function(e){var t=this;t.data=e.data,t.render()},render:function(){var t=$(this.el).find("ol"),n=_(this.data.assignees).chain().map(function(t){return $(_.template(e,t)).data("assignee",t)}).value();return t.append(n),t.find("li").draggable({helper:"clone",scope:"assignee",zIndex:100,appendTo:"body"}),this}})}),define("text!board/templates/css.html",[],function(){return'<% \n_(["filter","card-label"]).each(function(name){\n  _(other_labels).each(function(l) {\n%>\n  .<%= name %>.-x<%= l.color %>.active, .<%= name %>.-x<%= l.color %>.active:hover  {\n    background-color: #<%= l.color %>;\n    background-color: <%= $.Color("#" + l.color).toString() %>;\n    color: <%= $.Color("#" + l.color).contrastColor() %>;\n  }\n\n  .<%= name %>.-x<%= l.color %> .active, .<%= name %>.-x<%= l.color %> .active:hover  {\n    background-color: #<%= l.color %>;\n    background-color: <%= $.Color("#" + l.color).toString() %>;\n    color: <%= $.Color("#" + l.color).contrastColor() %>;\n  }\n  \n  .<%= name %>.-x<%= l.color %>.dim, .<%= name %>.-x<%= l.color %>.dim:hover  {\n    background-color: <%= $.Color($.Color("#" + l.color).alpha(0.6)).toString() %>;\n    color: <%= $.Color("#" + l.color).contrastColor() %>;\n  }\n\n  .<%= name %>.-x<%= l.color %> .dim ,  .<%= name %>.-x<%= l.color %> .dim:hover {\n    background-color: <%= $.Color($.Color("#" + l.color).alpha(0.6)).toString() %>;\n    color: <%= $.Color("#" + l.color).contrastColor() %>;\n  }\n\n  <%})});%>\n'}),define("board/views/cssView",["../collections/issues","text!../templates/css.html"],function(e,t){e.bind("ondatareceived",function(e){var n=_.template(t,e),r=document.getElementsByTagName("head")[0],i=document.createElement("style");i.type="text/css",i.styleSheet?i.styleSheet.cssText=n:i.appendChild(document.createTextNode(n)),r.appendChild(i)})}),define("board/views/board",["../collections/issues","text!../templates/board.html","./columnView","./sidebarView","./headerView","./assigneeView","../../common/events/postal","./cssView"],function(e,t,n,r,i,s,o){var u=function(){var e=_($("ul")).chain().map(function(e){return $(e).height()}).reduce(function(e,t){return t>e?t:e}).value();return e},a=function(e){switch(e){case"open":$("#drawer").find(".toggle-drawer").removeClass("arrow-right").addClass("arrow-left").end().animate({left:"+=270px"},300),$("#content").animate({"margin-left":"+=100px"},300);break;case"close":$("#drawer").animate({left:"-=270px"},300,function(){$(this).find(".toggle-drawer").removeClass("arrow-left").addClass("arrow-right").end()}),$("#content").animate({"margin-left":"-=100px"},300)}};return Backbone.View.extend({el:$("#stage"),events:{"click .toggle-drawer":"toggleDrawer"},initialize:function(t){e.bind("ondatareceived",this.onfetch,this),e.bind("afterreceived",this.resizeColumns,this),e.fetch(t.user,t.repo),this.user=t.user,this.repo=t.repo,this.params=t,o.subscribe("Opened.Issue",$.proxy(this.onOpened,this)),o.subscribe("Closed.Issue",$.proxy(this.onClosed,this))},onOpened:function(){this.resizeColumns()},onClosed:function(){this.resizeColumns()},onfetch:function(e){if(!e.labels.length){window.location.href="/"+this.user+"/"+this.repo+"/board/create";return}var o=$(_.template(t,e)),u=o.clone(),a=_.first(e.labels),f=_.rest(e.labels),l=new r({data:e,params:this.params}),c=new i,h=new s({data:e,params:this.params}),p=this;$(u).append((new n({column:a,user:this.user,repo:this.repo})).render().el);var d=100/f.length;_.each(f,function(e){var t=new n({column:e,user:p.user,repo:p.repo}),r=$(t.render().el).css({width:d+"%"});$(o).append(r)}),$("#stage").append(o),$("#drawer","#main-stage").append(u).find(".toggle-drawer").show(),$(".sidebar-wrapper").append(l.render().el).show(),$('[rel~="twipsy"]').tooltip({live:!0}),this.resizeColumns()},resizeColumns:function(){var e=u();$("ul","#main-stage").css("min-height",e)},toggleDrawer:function(e){e.preventDefault();var t=$(".toggle-drawer").hasClass("arrow-left");t?a("close"):a("open")}})}),define("board/main",["./views/board"],function(e){var t={};return{init:function(n){t.board=new e(n)}}}),define("text!card/templates/card.html",[],function(){return'<div class="fullscreen-card-right">\n      <h2> <a class="number" href="<%= html_url %>" target="_blank" title="View issue on github.com"><small>ISSUE #</small><%= number %></a> </h2>\n      <div class="labels-placeholder"></div>\n</div>\n<div class="fullscreen-card-left">\n  <div class=\'fullscreen-card-preamble\'>\n    <div class="fullscreen-header">\n      <h2> <%= title %> </h2>\n    </div>\n  </div>\n  <div class="fullscreen-card-description card-comment">\n    <a href="<%= user.html_url %>" target="_blank">\n      <img title="Created by <%= user.login %>" src="https://secure.gravatar.com/avatar/<%= user.gravatar_id%>?s=30" />\n    </a>\n    <div class="comment-body">\n      <%= body_html %>\n    </div>\n    <% _(labels).each(function(l) { %>\n<div class="card-label-wrapper"> \n  <div class="card-label -x<%= l.color %> active small"> \n  </div>\n  <div class="card-label -x<%= l.color %> active large"> \n    <span> <%= l.name %> </span>\n  </div>\n</div>\n\n<% }); %>\n  </div>\n</div>\n'}),define("text!card/templates/feed.html",[],function(){return'\n  <div class="fullscreen-card-activity">\n    <div class="fullscreen-header">\n      <h4> Activity </h4>\n    </div>\n    <% _(issue.comments).each(function(c) { %>\n    <div class="card-comment">\n      <a href="<%= c.user.html_url %>" target="_blank">\n        <img title="Created by <%= c.user.login %>" src="https://secure.gravatar.com/avatar/<%= c.user.gravatar_id%>?s=30" />\n      </a>\n      <div class="comment-body">\n        <%= c.body_html %>\n      </div>\n    </div>\n    <% }); %>\n  </div>\n'}),define("text!card/templates/actions/labels.html",[],function(){return'\n\n  <ul class="labels"> \n    <h5> Labels </h5>\n  <% _(available_labels).each(function(l) { %>\n    <li class="card-label -x<%= l.color %>"> \n    <% if(_.find(current_labels, function(x){ return x.name === l.name})) { %>\n      <span class="active"> <%= l.name %> </span>\n      <input type="checkbox" style="display:none" name="labels[name][]" value=\'<%= l.name %>\' checked=\'checked\' />\n      <% } else {  %>\n        <span > <%= l.name %> </span>\n        <input type=\'checkbox\' style="display:none" name="labels[name][]" value=\'<%= l.name %>\' />\n      <% } %>\n    </li>\n  <% }); %>\n  </ul>\n'}),define("card/views/actions/labels",["text!../../templates/actions/labels.html"],function(e){var t=Backbone.View.extend({initialize:function(e,t){this.data=e,this.issue=t},events:{"click li":"update"},render:function(){var t=this.issue,n="/api/"+t.attributes.repo.owner.login+"/"+t.attributes.repo.name+"/issues/"+t.attributes.number+"/update_labels";return $(this.el).append("<form action='"+n+"'>").find("form").html(_.template(e,this.data)),this},update:function(e,t){var n=$(e.currentTarget),r=n.find("span").toggleClass("active"),i=n.find("input");i.prop("checked",!i.prop("checked"));var s=$(this.el).find("form"),o=s.serialize();$.ajax({url:s.attr("action"),data:o,dataType:"json",type:"POST"}).done(function(e){console.log(e)})}});return{create:function(e,n){return new t(e,n)}}}),define("card/views/card",["../../common/events/postal","text!../templates/card.html","text!../templates/feed.html","./actions/labels"],function(e,t,n,r){var i={labels:r};return Backbone.View.extend({tagName:"div",className:"fullscreen-card",initialize:function(t){e.subscribe("Card.Fullscreen",$.proxy(this.open,this))},render:function(e){return $(this.el).html(_.template(t,e)),this},open:function(e){var t=this;this.issue=e,this.render(e.attributes),$.getJSON("/api/"+e.attributes.repo.owner.login+"/"+e.attributes.repo.name+"/issues/"+e.attributes.number+"/feed").done(function(e){$(t.el).find(".fullscreen-card-left").append(_.template(n,e));var r=null;for(r in e.actions)$(t.el).find("."+r+"-placeholder").append(i[r].create(e.actions[r],t.issue).render().el)})}})}),define("card/main",["../common/events/postal","./views/card"],function(e,t){var n={open:function(){$("body").addClass("fullscreen-open")},close:function(){$("body").removeClass("fullscreen-open")},init:function(){$(".fullscreen-wrapper > div").click(function(e){e.stopPropagation()}),$(".fullscreen-overlay").click(n.close),e.subscribe("Card.Fullscreen",$.proxy(this.open,this))}};return{init:function(e){n.card=new t(e),$(this).append(n.card.el),n.init()}}});