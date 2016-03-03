/*
<template>
  <div id="app">
    <search-box></search-box>
    <template v-if="searchResults.length > 0 && searchTerm">
      <search-results v-bind:results="searchResults"></search-results>
    </template>
    <h2 class="no-results" v-if="searchResults.length === 0 && searchTerm !== ''">
      No search results.
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
    'search-submit': function (searchTerm) {
      console.log('search-submit:', searchTerm);
      this.searchTerm = searchTerm;
      this.runSearch(`search_articles.json?q=`, searchTerm);
    }
  },
  methods: {
    runSearch: function (searchType, searchTerm) {
      console.log(`${this.searchUrl}${searchType}${searchTerm}`);
      this.searchRequest(this.searchUrl + searchTerm)
      .then((results) => {
        if (results.length <= 0) {
          this.searchResults = [];
          return false;
        }
        console.log('results:', results[0]._source);
        this.searchResults = results;
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
    justify-content: center;
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
