$("#search-field").ghostHunter({
  results: "#search-results",
  onKeyUp: true,
  info_template: "",
  result_template: "<h2><a class='search-results-title' href='{{link}}'>{{title}}</a></h2><p class='search-results-date'>{{pubDate}}</p>"
});