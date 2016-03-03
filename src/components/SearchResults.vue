/*
<template>
  <h2>Topics</h2>
  <ul class="topic-list">
    <li v-for="topic in topics">
      {{ topic.name }}
    </li>
  </ul>
  <h2>Articles</h2>
  <ul class="article-list">
    <li v-for="result in results">
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
</template>
*/

<script>
import _ from 'ramda';

const pickTopics = (result) => {
  return _.map(_.pick(['name']), result._source.topics);
};

export default {
  computed: {
    topics: function () {
      let t = _.flatten(this.results.map(pickTopics));
      console.log('topics:', t);
      return t;
    }
  },
  data () {
    return { };
  },
  methods: { },
  props: {
    'results': {
      required: true,
      type: Array
    }
  }
}
</script>

<style>
  .topic-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    border-bottom: 1px solid black;
  }

  .topic-list li {
    flex: 1;
    margin: 10px;
    white-space: nowrap;
  }
</style>
