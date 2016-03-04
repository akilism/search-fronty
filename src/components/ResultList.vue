/*
<template>
  <h2>{{ title }}</h2>
  <ul class="result-list">
      <li v-for="item in items">
        <article-item v-bind:item="item._source"
                      v-if="item._source.type === 'article'">
        </article-item>
        <video-item v-bind:item="item._source"
                    v-if="item._source.type === 'video'">
        </video-item>
      </li>
  </ul>
</template>
*/

<script>
  import ArticleItem from './ArticleItem';
  import VideoItem from './VideoItem';

  export default {
    components: {
      ArticleItem,
      VideoItem
    },
    props: {
      'title': {
        required: true,
        type: String
      },
      'items': {
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

  .result-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
  }

  .result-list li {
    // margin: 5px;
    // padding: 5px;
    padding: 0 0 30px 0;
    border-bottom: 1px solid #ababab;
    margin: 0 0 30px 0;
  }

</style>
