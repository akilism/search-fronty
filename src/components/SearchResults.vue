/*
<template>
  <button-list v-bind:items="topics" title="Topics"></button-list>
  <icon-list v-bind:items="contributors" title="Contributors"></icon-list>
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
import ButtonList from './ButtonList';
import IconList from './IconList';

const pickTopics = (result) => {
  return _.map((t) => {
    const topic = _.pick(['name', 'id'], t);
    return {...topic, searchType: 'topic-search'};
  }, result._source.topics);
};

const pickContributors = (result) => {
  return _.map((contrib) => {
    const contributor = _.pick(['contributor'], contrib).contributor;
    const thumbnail_url = contributor.thumbnail_url || "https://video-images.vice.com/images/contributors/158/lede/GAYCATION_101.jpg";
    return {...contributor, thumbnail_url: thumbnail_url, name: contributor.full_name, searchType: 'contributor-search'};
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
  components: {
    ButtonList,
    IconList
  },
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
