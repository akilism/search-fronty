/*
<template>
  <div class="article-result">
    <div class="article-media">
      <a v-bind:href="item.url">
        <img class="article-image" v-bind:src="item.thumbnail_url" >
      </a>
    </div>
    <div class="article-copy">
      <a v-bind:href="item.url">
        <h3 class="article-title">
          {{item.title}}
        </h3>
      </a>
      <div class="article-summary">
        <div class="publish-date">{{ item.publish_date | DateFilter }}</div>
        {{ item.summary }}
        <br>
        <a v-bind:href="item.url" class="article-read-time">{{ Math.round(Math.random() * 10) + 2}} min read</a>
      </div>
    </div>
  </div>
</template>
*/

<script>
  import DateFilter from '../filters/DateFilter';

  export default {
    filters: { DateFilter },
    props: {
      'item': {
        required: true,
        type: Object
      }
    }
  }
</script>

<style>
.article-result {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: row;
  width: 640px;
  padding-bottom: 10px;
}

.article-media {
  flex: 1;
}

.article-copy {
  flex: 2;
  margin: 0 0 0 10px;
}

.article-title {
  margin: 0 0 5px 0;
  background-color: black;
  color: white;
  padding: 5px;
}

.article-title a {
  color: white;
}

.article-summary {
  font-size: 14px;
  line-height: 1.25;
  position: relative;
}

.article-read-more {
  text-decoration: underline;
}

.article-read-time {
  display: inline-block;
  margin: 10px 0 5px 0;
  padding: 5px 10px;
  background-color: black;
  color: white;
  font-size: 12px;
  position: absolute;
  right: 0;
}
</style>
