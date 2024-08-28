---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Hi I'm Maosusu"
  text: "D&C_知识小站😼"
  tagline: 这里记录着我 Design & Code 的经验。
  actions:
    - theme: brand
      text: 自我介绍
      link: ./文档/自我介绍
      img: /cover/1.png
    - theme: alt
      text: 服务开源项目
      link: ./文档/开源项目
      img: /cover/1.png
  image:
    src: /home.png

features:
  - title: 示例项目
    details: xxx 用途
    link: ./示例/markdown-examples
  - title: 项目 B
    details: 简介
  - title: 项目 C
    details: 简介
---

<!-- 自定模块 -->

<script setup>
import { ref } from "vue";

</script>

<style >
.Home{
  color:red
}
img{
  border-radius: 0;
}
.VPImage.logo{
  margin-right: 1rem;
  opacity: 0;
}

.VPContent{
}
</style>
