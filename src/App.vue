/*
<template>
  <div id="app">
    <h2 v-if="searchResults.length <= 0">(๑◐︵◑๑) Search (๑◕︵◕๑)</h2>
    <h2 v-if="searchResults.length > 0">(*′☉ω☉) Search (☉ω☉′*)</h2>
    <search-box v-bind:search-term="searchTerm"></search-box>
    <template v-if="searchResults.length > 0 && searchTerm">
      <search-results v-bind:results="searchResults"></search-results>
    </template>
    <h2 class="no-results" v-if="searchResults.length === 0 && searchTerm !== ''">
      (๑◐︵◑๑)(๑◕︵◕๑)No search results.(๑◕︵◕๑)(๑◐︵◑๑)
    </h2>
  </div>
</template>
*/

<script>
import SearchBox from './components/SearchBox';
import SearchResults from './components/SearchResults';

export default {
  components: {
    SearchBox,
    SearchResults
  },
  data: function () {
    return {
      searchUrl: 'http://localhost:3000/',
      requestOptions: { method: 'GET', mode: 'no-cors' },
      searchResults: [],
      searchTerm: ''
    };
  },
  events: {
    'clear-results': function () {
      this.searchResults = [];
    },
    'contributor-search': function (contributor) {
      console.log('contributor-search:', contributor.name, ':', contributor.id);
      this.searchTerm = contributor.name;
      this.runSearch(`search_contributors.json?q=`, contributor.id);
    },
    'look-ahead': function (searchTerm) {
      console.log('look-ahead:', searchTerm);
      this.searchTerm = searchTerm;
      this.runSearch(`look_ahead.json?q=`, searchTerm);
    },
    'search-submit': function (searchTerm) {
      console.log('search-submit:', searchTerm);
      this.searchTerm = searchTerm;
      this.runSearch(`search.json?q=`, searchTerm);
    },
    'topic-search': function (topic) {
      console.log('topic-search:', topic.name, ':', topic.id);
      this.searchTerm = topic.name;
      this.runSearch(`search_topics.json?q=`, topic.id);
    }
  },
  methods: {
    runSearch: function (searchType, searchTerm) {
      console.log(`hitting search end-point: ${this.searchUrl}${searchType}${searchTerm}`);
      this.searchRequest(`${this.searchUrl}${searchType}${searchTerm}`)
      .then((results) => {
        if (results.length <= 0) {
          this.searchResults = [];
          return false;
        }
        console.log(`# o' results: ${results.length}`);
        this.searchResults = results;
      })
      .catch((err) => {
        console.error(err);
      });
    },
    searchRequest: function (url) {
      return new Promise((resolve, reject) => {
        let request = new window.XMLHttpRequest();
        request.addEventListener('load', (response) => {
          try {
            resolve(JSON.parse(request.response).results);
          } catch (e) {
            reject(e);
          }
        });

        request.open('GET', url);
        request.send();
      });
    }
  }
}
</script>

<style>
  body {

  }

  #app {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    max-width: 100vw;
    height: 100vh;
    font-family: Helvetica, sans-serif;
    text-align: center;
    flex-wrap: wrap;
    flex-direction: row;
  }

  ul {
    list-style-type: none;
  }

  li {
    margin: 0 0 20px 0;
  }

  .article-image {
    max-width: 300px;
  }

  .article-title {
    text-align: left;
  }

  .article-summary {
    text-align: left;
  }

  a {
    text-decoration: none;
    color: black;
  }
</style>
