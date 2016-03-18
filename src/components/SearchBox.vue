/*
<template>
  <div class="search-box">
    <input  v-on:keyup="lookAhead" v-on:keyup.enter="submit" v-model="searchTerm" placeholder="">
    <button v-on:click.prevent="submit" name="submitSearch">searchy</button>
  </div>
</template>
*/

<script>
export default {
  methods: {
    submit: function () {
      this.$dispatch('search-submit', this.searchTerm);
    },
    lookAhead: function () {
      if (this.searchTerm.length >= 3) {
        this.$dispatch('look-ahead', this.searchTerm);
      }
    }
  },
  props: {
    searchTerm: {
      required: true,
      type: String
    }
  }
}
</script>

<style>
  .search-box {
    margin: 20px 0;
    border: 1px solid black;
    border-width: 1px 0;
    padding: 20px 0;
    width: 100%;
  }

  .search-box input {
    border: 1px solid black;
    border-width: 0 0 1px 0;
    font-size: 28px;
  }

  .search-box input:focus {
    outline: none;
  }

  .search-box button {
    font-size: 24px;
    border-radius: 3px;
    background: white;
    border-width: 1px;
  }

</style>
