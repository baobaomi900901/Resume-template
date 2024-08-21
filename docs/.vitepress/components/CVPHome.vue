<script setup lang="ts">
// import VPHomeHero from "./CVPHomeHero.vue";
// import VPHomeFeatures from "./CVPHomeFeatures.vue";
// import VPHomeContent from "./CVPHomeContent.vue";
import { useData } from "vitepress";
import { ref, nextTick } from "vue";

const { frontmatter: fm } = useData();

const name = ref("");
const text = ref("");
const tagline = ref("");
const image = ref();
const actions = ref([]);
const features = ref([]);

nextTick(() => {
  console.log(fm.value.features);
  name.value = fm.value.hero.name;
  text.value = fm.value.hero.text;
  tagline.value = fm.value.hero.tagline;
  image.value = fm.value.hero.image.src;
  actions.value = fm.value.hero.actions;
  features.value = fm.value.features;
});
</script>

<template>
  <div class="VPHome">
    <slot name="home-hero-before" />
    <div>{{ name }}</div>
    <div>{{ text }}</div>
    <div>{{ tagline }}</div>
    <img :src="image" />
    <div v-for="item in actions" :key="item?.text" :class="item?.theme">
      <a :href="item?.link">
        <div><img :src="item?.img" /></div>
        <div>{{ item?.text }}</div>
      </a>
    </div>

    <div v-for="item in features" :key="item?.title" :class="item?.theme">
      <a :href="item?.link">
        <div><img :src="item?.img" /></div>
        <div>{{ item?.title }}</div>
        <div>{{ item?.details }}</div>
      </a>
    </div>

    <!-- <VPHomeContent v-if="frontmatter.markdownStyles !== false">
      <Content />
    </VPHomeContent>
    <Content v-else /> -->
  </div>
</template>

<style scoped>
.VPHome {
  margin-bottom: 96px;
}

@media (min-width: 768px) {
  .VPHome {
    margin-bottom: 128px;
  }
}
.brand {
  background: red;
}
.alt {
  background: blue;
}
</style>
