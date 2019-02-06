var searchField=$("#search-field"),searchResults=$("#search-results");searchField.val(""),searchField.ghostHunter({results:"#search-results",before:function(){searchResults.empty()},onKeyUp:!0,info_template:"",result_template:"<h2><a class='search-results-title' href='/blog{{link}}'>{{title}}</a></h2><p class='search-results-date'>{{pubDate}}</p>"});
//# sourceMappingURL=search.js.map
