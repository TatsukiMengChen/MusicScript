var _createClass=function(){function t(t,i){for(var e=0;e<i.length;e++){var s=i[e];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(i,e,s){return e&&t(i.prototype,e),s&&t(i,s),i}}();function _classCallCheck(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}(function(){"use strict";var t,i,e;t=jQuery,i=function(){var t=function(){function t(){_classCallCheck(this,t)}return _createClass(t,null,[{key:"transition",value:function(t){var i,e,s,n;for(n in i=t[0],e=this.transitions)if(s=e[n],null!=i.style[n])return s}}]),t}();return t.transitions={webkitTransition:"webkitTransitionEnd",mozTransition:"mozTransitionEnd",oTransition:"oTransitionEnd",transition:"transitionend"},t}(),e=function(){var e=function(){function e(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};_classCallCheck(this,e),this.render=this.render.bind(this),this.bind=this.bind.bind(this),this.unbind=this.unbind.bind(this),this.mouseEnter=this.mouseEnter.bind(this),this.mouseLeave=this.mouseLeave.bind(this),this.click=this.click.bind(this),this.close=this.close.bind(this),this.cycle=this.cycle.bind(this),this.waitAndDismiss=this.waitAndDismiss.bind(this),this.present=this.present.bind(this),this.dismiss=this.dismiss.bind(this),this.remove=this.remove.bind(this),this.animate=this.animate.bind(this),this.$growls=this.$growls.bind(this),this.$growl=this.$growl.bind(this),this.html=this.html.bind(this),this.content=this.content.bind(this),this.container=this.container.bind(this),this.settings=t.extend({},e.settings,i),this.initialize(this.settings.location),this.render()}return _createClass(e,null,[{key:"growl",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new e(t)}}]),_createClass(e,[{key:"initialize",value:function(i){var e;return t("body:not(:has(#"+(e="growls-"+i)+"))").append('<div id="'+e+'" />')}},{key:"render",value:function(){var t;t=this.$growl(),this.$growls(this.settings.location).append(t),this.settings.fixed?this.present():this.cycle()}},{key:"bind",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.$growl();return t.on("click",this.click),this.settings.delayOnHover&&(t.on("mouseenter",this.mouseEnter),t.on("mouseleave",this.mouseLeave)),t.on("contextmenu",this.close).find("."+this.settings.namespace+"-close").on("click",this.close)}},{key:"unbind",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.$growl();return t.off("click",this.click),this.settings.delayOnHover&&(t.off("mouseenter",this.mouseEnter),t.off("mouseleave",this.mouseLeave)),t.off("contextmenu",this.close).find("."+this.settings.namespace+"-close").off("click",this.close)}},{key:"mouseEnter",value:function(t){return this.$growl().stop(!0,!0)}},{key:"mouseLeave",value:function(t){return this.waitAndDismiss()}},{key:"click",value:function(t){if(null!=this.settings.url)return t.preventDefault(),t.stopPropagation(),window.open(this.settings.url)}},{key:"close",value:function(t){return t.preventDefault(),t.stopPropagation(),this.$growl().stop().queue(this.dismiss).queue(this.remove)}},{key:"cycle",value:function(){return this.$growl().queue(this.present).queue(this.waitAndDismiss())}},{key:"waitAndDismiss",value:function(){return this.$growl().delay(this.settings.duration).queue(this.dismiss).queue(this.remove)}},{key:"present",value:function(t){var i;return i=this.$growl(),this.bind(i),this.animate(i,this.settings.namespace+"-incoming","out",t)}},{key:"dismiss",value:function(t){var i;return i=this.$growl(),this.unbind(i),this.animate(i,this.settings.namespace+"-outgoing","in",t)}},{key:"remove",value:function(t){return this.$growl().remove(),"function"==typeof t?t():void 0}},{key:"animate",value:function(t,e){var s,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"in",o=arguments[3];s=i.transition(t),t["in"===n?"removeClass":"addClass"](e),t.offset().position,t["in"===n?"addClass":"removeClass"](e),null!=o&&(null!=s?t.one(s,o):o())}},{key:"$growls",value:function(i){var e;return null==this.$_growls&&(this.$_growls=[]),null!=(e=this.$_growls)[i]?e[i]:e[i]=t("#growls-"+i)}},{key:"$growl",value:function(){return null!=this.$_growl?this.$_growl:this.$_growl=t(this.html())}},{key:"html",value:function(){return this.container(this.content())}},{key:"content",value:function(){return"<div class='"+this.settings.namespace+"-close'>"+this.settings.close+"</div>\n<div class='"+this.settings.namespace+"-title'>"+this.settings.title+"</div>\n<div class='"+this.settings.namespace+"-message'>"+this.settings.message+"</div>"}},{key:"container",value:function(t){return"<div class='"+this.settings.namespace+" "+this.settings.namespace+"-"+this.settings.style+" "+this.settings.namespace+"-"+this.settings.size+"'>\n  "+t+"\n</div>"}}]),e}();return e.settings={namespace:"growl",duration:1e3,close:"&#215;",location:"default",style:"default",size:"medium",delayOnHover:!0},e}(),this.Growl=e,t.growl=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return e.growl(t)},t.growl.error=function(){var i,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return i={title:"Error!",style:"error"},t.growl(t.extend(i,e))},t.growl.notice=function(){var i,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return i={title:"Notice!",style:"notice"},t.growl(t.extend(i,e))},t.growl.warning=function(){var i,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return i={title:"Warning!",style:"warning"},t.growl(t.extend(i,e))}}).call(this);