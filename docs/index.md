---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "王鹏程"
  text: "D&C_知识小站"
  tagline: 这里记录着我 Design & Code 的成长。
  actions:
    - theme: brand
      text: 自我介绍
      link: ./文档/自我介绍
    - theme: alt
      text: 服务开源项目
      link: ./文档/开源项目
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

<loading></loading>

<script setup>
import { ref, reactive, onMounted, watch ,nextTick} from "vue";
import loading from "../src/loading.vue";

const loge=ref();
const logoBox=ref();
const loadingDom=ref();
const divContent = `
       <div ref="containerBox" class="containerBox2">
           <div class="box-wrapper">
               <div ref="boxFaces" class="box-faces">
                 <div class="box-face box-face1">
                   <p>W</p>
                 </div>
                 <div class="box-face box-face2">
                   <p>P</p>
                 </div>
                 <div class="box-face box-face4">
                   <p>C</p>
                 </div>
                 <div class="box-face box-face3">
                 </div>
               </div>
           </div>
       </div>`;

onMounted(() => {
  loadingDom.value = document.querySelector(".loading");
  loge.value = document.querySelector(".VPNavBarTitle > .title");
  logoBox.value = document.querySelector(".containerBox2");

  loge.value.insertAdjacentHTML('afterbegin', divContent);
})
</script>

<style >
.Home{
  color:red
}
img{
  border-radius: 0;
}
.container > .title {
  position: relative;
}
.VPNavBarTitle > .title {
  position: relative;
}
.VPImage.logo{
  margin-right: 1rem;
  opacity: 0;
}
.containerBox2 {
  width: 4rem;
  height: 4rem;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-12px, -50%) scale(0.5);
  z-index: 9999;
}
.containerBox2 >.box-wrapper {
  position: absolute;
  perspective: 300px;
  perspective-origin: 100% 32px;
}
.containerBox2 >.box-wrapper >.box-faces {
  width: 4rem;
  position: relative;
  transform-style: preserve-3d;
  transition: 1.5s transform cubic-bezier(0.79, 0, 0.54, 0.99);
  user-select: none;
  pointer-events: none;
}
.box-face {
  position: absolute;
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  color: black;
  font-weight: 600;
}
.box-face4 {
  transform: translateZ(-32px) rotateY(180deg);
    border: 0.125rem solid rgba(0,0,0,0.1);
}
.box-face2 {
  transform: rotateY(-270deg) translateX(32px);
  transform-origin: top right;
    border: 0.125rem solid rgba(0,0,0,0.1);
}
.box-face3 {
  transform: rotateY(270deg) translateX(-32px);
  transform-origin: center left;
  font-size: 1.5rem;
  background-image: url("./public/Virtual-image.png");
  background-repeat: no-repeat;
  /* 图片自适应宽高 */
  background-size: cover;
}
.box-face1 {
  transform: translateZ(32px);
  /* background-color: #000; */
  color: white;
  box-sizing: border-box;
  overflow: hidden;
}

.box-face1:after {
  content: '';
  position: absolute;
  top: -30px;
  right: -30px;
  bottom: -30px;
  left: -30px;
  background: conic-gradient(from 180deg at 50% 50%, #12001B -97.5deg, #000000 14.05deg, #040EFF 54.01deg, #8000FF 113.42deg, #00B6B6 185.62deg, #12001B 262.5deg, #000000 374.05deg);
  filter: blur(20px) brightness(1.5);
  z-index: -1;
  animation: 10s move linear infinite;
}
@keyframes move {
  from {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(540deg);
  }
}

.containerBox2 .box-faces:hover {
  transform: rotateY(-270deg);
  transition: 2s transform cubic-bezier(0.79, 0, 0.54, 0.99);
}
</style>
