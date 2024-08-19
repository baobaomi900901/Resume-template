<!--
* @description  参数1
* @fileName  CVPNavBarTitle
* @author userName
* @date 2024-08-18 16:51:44
* @version V3.0.0
!-->
<template>
  <div class="VPNavBarTitle" :class="{ 'has-sidebar': hasSidebar }">
    <a
      class="title"
      :href="link ?? normalizeLink(currentLang.link)"
      :rel="rel"
      :target="target"
    >
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
              <p class="text-2xl">😼</p>
            </div>
          </div>
        </div>
      </div>
      <template v-if="theme.siteTitle"
        ><span>{{ theme.siteTitle }}</span></template
      >
      <template v-else-if="theme.siteTitle === undefined"
        ><span>{{ site.title }}</span></template
      >
    </a>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useData } from "vitepress";
import { useSidebar } from "./composables/sidebar";
import { useLangs } from "./composables/langs";
import { normalizeLink } from "./support/utils";

const { site, theme } = useData();
const { hasSidebar } = useSidebar();
const { currentLang } = useLangs();

const link = computed(() =>
  typeof theme.value.logoLink === "string"
    ? theme.value.logoLink
    : theme.value.logoLink?.link
);
const rel = computed(() =>
  typeof theme.value.logoLink === "string"
    ? undefined
    : theme.value.logoLink?.rel
);

const target = computed(() =>
  typeof theme.value.logoLink === "string"
    ? undefined
    : theme.value.logoLink?.target
);
</script>
<style scoped>
.title {
  display: flex;
  align-items: center;
  border-bottom: 1px solid transparent;
  width: 100%;
  height: var(--vp-nav-height);
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  transition: opacity 0.25s;
}

.containerBox2 {
  width: 4rem;
  height: 4rem;
  transform: scale(0.5);
  z-index: 9999;
}
.containerBox2 > .box-wrapper {
  position: absolute;
  perspective: 300px;
  perspective-origin: 100% 32px;
}
.containerBox2 > .box-wrapper > .box-faces {
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
  border: 0.125rem solid rgba(0, 0, 0, 0.1);
}
.box-face2 {
  transform: rotateY(-270deg) translateX(32px);
  transform-origin: top right;
  border: 0.125rem solid rgba(0, 0, 0, 0.1);
}
.box-face3 {
  transform: rotateY(270deg) translateX(-32px);
  transform-origin: center left;
  /* background-image: url("/Virtual-image.png"); */
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
  content: "";
  position: absolute;
  top: -30px;
  right: -30px;
  bottom: -30px;
  left: -30px;
  background: conic-gradient(
    from 180deg at 50% 50%,
    #12001b -97.5deg,
    #000000 14.05deg,
    #040eff 54.01deg,
    #8000ff 113.42deg,
    #00b6b6 185.62deg,
    #12001b 262.5deg,
    #000000 374.05deg
  );
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

.VPNavBarTitle:hover .box-faces {
  transform: rotateY(-270deg);
  transition: 2s transform cubic-bezier(0.79, 0, 0.54, 0.99);
}

@media (min-width: 960px) {
  .title {
    flex-shrink: 0;
  }

  .VPNavBarTitle.has-sidebar .title {
    border-bottom-color: var(--vp-c-divider);
  }
}

:deep(.logo) {
  margin-right: 8px;
  height: var(--vp-nav-logo-height);
}
</style>
