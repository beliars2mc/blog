const searchField = $("#search-field");
const searchResults = $("#search-results");

searchField.val('');
searchField.ghostHunter({
  results: "#search-results",
  before: () => searchResults.empty(),
  onKeyUp: true,
  info_template: "",
  result_template: "<h2><a class='search-results-title' href='/blog{{link}}'>{{title}}</a></h2><p class='search-results-date'>{{pubDate}}</p>"
});


