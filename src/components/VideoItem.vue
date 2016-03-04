/*
<template>
  <div class="video-result">
    <a v-bind:href="item.url">
      <div class="video-media">
        <h3 class="video-title">
          {{item.title}}
        </h3>
        <img class="video-image" v-bind:src="item.thumbnail_url_16_9" >
        <span class="duration">Runtime: {{ Math.round(item.duration / 60) }}:00 </span>
      </div>
    </a>
    <div class="video-summary">
      <div class="publish-date">{{ item.publish_date | DateFilter }}</div>
      {{ item.dek }}
    </div>
  </div>
</template>
*/

<script>
  import DateFilter from '../filters/Date';

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
.video-result {
  text-align: left;
  width: 640px;
}

.video-title {
  position: absolute;
  top: 0;
  left: -5px;
  background-color: black;
  color: white;
  padding: 10px;
  margin-right: 15px;
}

.video-image {
  width: 640px;
}

.video-media {
  position: relative;
  text-align: left;
}

.duration {
  position: absolute;
  right: -5px;
  bottom: 14px;
  background-color: black;
  color: white;
  padding: 10px;
  font-size: 12px;
  letter-spacing: 1px;
}

.video-summary {

}
</style>
