!function(_){console.log(333333);var y=require("/lunr.min.js");_.fn.ghostHunter=function(t){var e=_.extend({},_.fn.ghostHunter.defaults,t);if(e.results)return i.init(this,e),i},_.fn.ghostHunter.defaults={resultsData:!1,onPageLoad:!1,onKeyUp:!1,result_template:"<a id='gh-{{ref}}' class='gh-search-item' href='{{link}}'><p><h2>{{title}}</h2><h4>{{prettyPubDate}}</h4></p></a>",info_template:"<p>Number of posts found: {{amount}}</p>",displaySearchInfo:!0,zeroResultsInfo:!0,before:!1,onComplete:!1,includepages:!1,filterfields:!1,subpath:"",item_preprocessor:!1,indexing_start:!1,indexing_end:!1,includebodysearch:!1};var s=function(t){return t.replace(/^\//,"").replace(/\//g,"-")},t=null,x=function(){_(".gh-search-item").each(function(){var t=this.getAttribute("id").replace(/^new-/,"");this.setAttribute("id",t)})},a=function(){this.blogData={},this.latestPost=0;var t={limit:"all",include:"tags"};this.includebodysearch?t.formats=["plaintext"]:t.formats=[""],this.includepages&&(t.filter="(page:true,page:false)");var l=this;_.get(ghost.url.api("posts",t)).done(function(t){var e=t.posts;l.index=y(function(){this.ref("id"),this.field("title"),this.field("description"),l.includebodysearch&&this.field("plaintext"),this.field("pubDate"),this.field("tag"),e.forEach(function(t){var e=new Date(t.updated_at).getTime();new Date(l.latestPost).getTime()<e&&(l.latestPost=t.updated_at);var i=t.tags.map(function(t){return t.name});null==t.meta_description&&(t.meta_description="");var s=i.join(", ");s.length<1&&(s="undefined");var a={id:String(t.id),title:String(t.title),description:String(t.custom_excerpt),pubDate:String(t.published_at),tag:s};l.includebodysearch&&(a.plaintext=String(t.plaintext)),this.add(a);var n,r,o=l.subpath+t.url;l.blogData[t.id]={title:t.title,description:t.custom_excerpt,pubDate:(n=a.pubDate,r=new Date(n),r.getDate()+" "+["January","February","March","April","May","June","July","August","September","October","November","December"][r.getMonth()]+" "+r.getFullYear()),link:o,tags:i},l.item_preprocessor&&Object.assign(l.blogData[t.id],l.item_preprocessor(t))},this)});try{var i=s(l.subpath);localStorage.setItem("ghost_"+i+"_lunrIndex",JSON.stringify(l.index)),localStorage.setItem("ghost_"+i+"_blogData",JSON.stringify(l.blogData)),localStorage.setItem("ghost_"+i+"_latestPost",l.latestPost)}catch(t){console.warn("ghostHunter: save to localStorage failed: "+t)}l.indexing_end&&l.indexing_end(),l.isInit=!0})},i={isInit:!1,init:function(e,t){var i=this;if(i.target=e,Object.assign(this,t),console.log("ghostHunter: init"),t.onPageLoad){window.setTimeout(function(){i.loadAPI()},1)}else e.focus(function(){i.loadAPI()});e.closest("form").submit(function(t){t.preventDefault(),i.find(e.val())}),t.onKeyUp&&(e.keydown(function(t){if(13===t.which)return!1}),e.keyup(function(t){i.find(e.val())}))},loadAPI:function(){if(!this.isInit){this.indexing_start&&this.indexing_start();try{var t=s(this.subpath);this.index=localStorage.getItem("ghost_"+t+"_lunrIndex"),this.blogData=localStorage.getItem("ghost_"+t+"_blogData"),this.latestPost=localStorage.getItem("ghost_"+t+"_latestPost"),this.latestPost&&this.index&&this.blogData&&(this.latestPost=this.latestPost,this.index=y.Index.load(JSON.parse(this.index)),this.blogData=JSON.parse(this.blogData),this.isInit=!0)}catch(t){console.warn("ghostHunter: retrieve from localStorage failed: "+t)}}if(this.isInit){var e={limit:"all",filter:"updated_at:>'"+this.latestPost.replace(/\..*/,"").replace(/T/," ")+"'",fields:"id"},i=this;_.get(ghost.url.api("posts",e)).done(function(t){0<t.posts.length?a.call(i):(i.indexing_end&&i.indexing_end(),i.isInit=!0)})}else a.call(this)},find:function(v){clearTimeout(t),v||(v=""),v=v.toLowerCase(),t=setTimeout(function(){for(var t=[],e=v.split(/\s+/),i=0,s=e.length;i<s;i++){var a=e[i];a&&t.push(this.index.query(function(t){t.term(a,{usePipeline:!0,boost:100}),t.term(a,{usePipeline:!1,boost:10,wildcard:y.Query.wildcard.TRAILING}),t.term(a,{usePipeline:!1,editDistance:1,boost:1})}))}if(1<t.length){var n=t[0];t=t.slice(1);for(i=n.length-1;-1<i;i--){var r=n[i].ref;for(j=0,jlen=t.length;j<jlen;j++){for(var o={},l=0,h=t[j].length;l<h;l++)o[t[j][l].ref]=!0;if(!o[r]){n=n.slice(0,i).concat(n.slice(i+1));break}}}}else n=1===t.length?t[0]:[];var u=_(this.results),c=[];0===n.length?(u.empty(),this.displaySearchInfo&&this.zeroResultsInfo&&u.append(this.format(this.info_template,{amount:0}))):this.displaySearchInfo&&(0<u.length?u.children().eq(0).replaceWith(this.format(this.info_template,{amount:n.length})):u.append(this.format(this.info_template,{amount:n.length}))),this.before&&this.before();for(i=0;i<n.length;i++){var f=n[i].ref,g=this.blogData[f];g?(g.ref=f,c.push(g)):console.warn("ghostHunter: index/data mismatch. Ouch.")}var d=_(".gh-search-item"),p=d.map(function(){return this.id.slice(3)}).get();if(0===p.length){for(i=0,s=c.length;i<s;i++)u.append(this.format(this.result_template,c[i]));x()}else{var m=[];for(i=0,s=n.length;i<s;i++)m.push(n[i].ref);var b=new Levenshtein(p,m).getSteps();(function(t,e,i){for(var s=0,a=i.length;s<a;s++){var n=i[s];if("delete"==n[0])t.eq(n[1]-1).remove();else{var r=e[n[2]-1].ref,o=this.blogData[r],l=this.format(this.result_template,o);if("substitute"===n[0])t.eq(n[1]-1).replaceWith(l);else if("insert"===n[0]){var h;h=0===n[1]?null:n[1]-1,t.eq(h).after(l)}}}x()}).call(this,d,n,b)}this.onComplete&&this.onComplete(c)}.bind(this),100)},clear:function(){_(this.results).empty(),this.target.val("")},format:function(t,s){return t.replace(/{{([^{}]*)}}/g,function(t,e){var i=s[e];return"string"==typeof i||"number"==typeof i?i:t})}}}(jQuery);
//# sourceMappingURL=ghostHunter.js.map
