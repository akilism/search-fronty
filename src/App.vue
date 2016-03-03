/*
<template>
  <div id="app">
    <search-box></search-box>
    <ul v-if="searchResults.length > 0 && searchTerm">
      <li v-for="result in searchResults">
        <a v-bind:href="result._source.url">
          <img class="article-image" v-bind:src="result._source.thumbnail_url" >
        </a>
        <h3 class="article-title">
          <a v-bind:href="result._source.url">
            {{result._source.title}}
          </a>
        </h3>
        <div class="article-summary">{{ result._source.summary }}</div>
      </li>
    </ul>
    <h2 class="no-results" v-if="searchResults.length === 0 && searchTerm !== ''">
      No search results.
    </h2>
  </div>
</template>
*/

<script>
import SearchBox from './components/SearchBox';

export default {
  components: {
    SearchBox
  },
  data: function () {
    return {
      searchUrl: 'http://localhost:3000/search_articles.json?q=',
      requestOptions: { method: 'GET', mode: 'no-cors' },
      searchResults: [],
      searchTerm: ''
    };
  },
  events: {
    'search-submit': function (searchTerm) {
      console.log('search-submit:', searchTerm);
      this.searchTerm = searchTerm;
      this.runSearch(searchTerm);
    }
  },
  methods: {
    runSearch: function (searchTerm) {
      console.log(this.searchUrl + searchTerm);
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
  html {
    height: 100%;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  #app {
    margin-top: -100px;
    max-width: 600px;
    font-family: Helvetica, sans-serif;
    text-align: center;
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
