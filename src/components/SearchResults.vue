/*
<template>
  <template v-if="topics.length > 0">
    <h2>Topics</h2>
    <ul class="topic-list">
      <li v-for="topic in topics" v-on:click.prevent="topicSearch(topic.id)">
        {{ topic.name }}
      </li>
    </ul>
  </template>
  <template v-if="contributors.length > 0">
    <h2>Contributors</h2>
    <ul class="contributor-list">
      <li v-for="contributor in contributors" v-on:click.prevent="contributorSearch(contributor.id)">
        {{ contributor.full_name }}
      </li>
    </ul>
  </template>
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
  return _.map(_.pick(['name', 'id']), result._source.topics);
};

const pickContributors = (result) => {
  return _.map((contrib) => {
    return _.pick(['contributor'], contrib).contributor;
  }, result._source.contributions);
};

const id = (thing) => {
  return thing.id;
};

const name = (thing) => {
  return thing.name;
};

const uniqTopics = (topics) => {
  return _.sortBy(name, _.uniqBy(id, topics));
};

const uniqContributors = (contributors) => {
  return _.sortBy(name, _.uniqBy(id, contributors));
};

export default {
  computed: {
    topics: function () {
      const topics = _.flatten(this.results.map(pickTopics));
      return uniqTopics(topics);
    },
    contributors: function () {
      const contribs = _.flatten(this.results.map(pickContributors));
      return uniqContributors(contribs);
    }
  },
  data () {
    return { };
  },
  methods: {
    topicSearch: function (topic) {
      this.$dispatch('topic-search', topic);
    },
    contributorSearch: function (contributor) {
      this.$dispatch('contributor-search', contributor);
    }
  },
  props: {
    'results': {
      required: true,
      type: Array
    }
  }
}
</script>

<style>
  h2 {
    width: 100vw;
  }

  .topic-list,
  .contributor-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    border-bottom: 1px solid black;
  }

  .topic-list li,
  .contributor-list li {
    flex: 1;
    margin: 10px;
    white-space: nowrap;
    cursor: pointer;
  }

  .article-list li {
    border-bottom: 1px solid black;
    padding-bottom: 20px;
    margin-bottom: 40px;
  }
</style>
