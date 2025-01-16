<script lang="ts">

export default {
  name: 'CarouselItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<template>
  <div :class="['carousel-item', { active: isActive }]">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="detail-box">
            <h1>
              <span v-html="item.title.split('<br>').join('<br>')"></span>
            </h1>
            <p>{{ item.description }}</p>
<!--            <div class="btn-box">-->
<!--              <a :href="item.buttonLink" class="btn1">{{ item.buttonLabel }}</a>-->
<!--            </div>-->
          </div>
        </div>
        <div class="col-md-6">
          <div class="img-box">
            <img :src="item.imageSrc" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>