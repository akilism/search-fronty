/*
<template>
  <button-list v-bind:items="topics"       title="(*′☉ω☉) Topics (☉ω☉′*)"></button-list>
  <icon-list   v-bind:items="contributors" title="(*′☉ω☉) Contributors (☉ω☉′*)"></icon-list>
  <result-list v-bind:items="results"      title="(*′☉ω☉) Search Results (☉ω☉′*)"></result-list>
</template>
*/

<script>
import _ from 'ramda';
import ButtonList from './ButtonList';
import IconList from './IconList';
import ResultList from './ResultList';

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

const id = (thing) => { return thing.id; };
const name = (thing) => { return thing.name; };
const uniqTopics = (topics) => { return _.sortBy(name, _.uniqBy(id, topics)); };
const uniqContributors = (contributors) => { return _.sortBy(name, _.uniqBy(id, contributors)); };

export default {
  components: {
    ButtonList,
    IconList,
    ResultList
  },
  computed: {
    topics: function () {
      const topics = _.flatten(this.results.map(pickTopics));
      console.log(topics);
      return uniqTopics(topics).slice(0, 20);
    },
    contributors: function () {
      const contribs = _.flatten(this.results.map(pickContributors));
      return uniqContributors(contribs).slice(0, 10);
    }
  },
  created: function () {
    console.log('result length:', this.results.length);
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

  .publish-date {
    color: #a4a4a4;
    font-size: 12px;
    margin-bottom: 10px;
  }
</style>
