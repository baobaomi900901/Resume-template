<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import "ksw-vue-icon/styles/icon.css";
import "vue-m-message/dist/style.css";
import * as Icons from "ksw-vue-icon";
import { IconSearch, IconTriangleBottom  } from "ksw-vue-icon";
import iconsData from "ksw-vue-icon/icons.json"; // 导入 JSON 数据
import useClipboard from "vue-clipboard3/dist/esm/index";
import Message from "vue-m-message";

const { toClipboard } = useClipboard();
const copyName = async (name) => {
  try {
    // 构建包含名称的 Vue 组件字符串
    // const vueComponent = `<${name} />`;
    await toClipboard(name);
    // 显示复制成功消息
    Message.success("复制成功: " + name, { duration: 3000 });
  } catch (error) {
    console.error("复制失败:", error);
  }
};

const iconNames = ref(Object.keys(Icons));

// 排序图标
const sortBy = ref("date"); // 用于控制排序方式，默认为按时间排序
const showColorIcons = ref(false); // 控制是否显示彩色图标
const searchQuery = ref(""); // 搜索框输入的值
// 过滤和排序图标
const sortIcons = () => {
  let sortedIcons = [...iconsData];
  if (sortBy.value === "date") {
    // 按修改日期排序
    sortedIcons.sort(
      (a, b) => new Date(b.modifiedTime) - new Date(a.modifiedTime)
    );
  } else {
    // 按名称排序
    sortedIcons.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (showColorIcons.value) {
    // 过滤彩色图标
    sortedIcons = sortedIcons.filter((icon) => icon.name.includes("Color"));
  }
  iconNames.value = sortedIcons.map((icon) => icon.name);
};
onMounted(() => {
  sortIcons();
});
// 切换排序方式
const handleSortChange = (event) => {
  sortBy.value = event.target.value;
  sortIcons();
};
// 切换是否显示彩色图标
const filterColorIcons = (show) => {
  showColorIcons.value = show;
  sortIcons();
};
// 计算属性，用于根据搜索框输入过滤图标列表
const filteredIconNames = computed(() => {
  return iconNames.value.filter((iconName) =>
    iconName.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
// 切换按扭配置
const commonButtonClass = [
  "inline-flex",
  "px-3",
  "py-1",
  "text-sm",
  "font-medium",
  "leading-6",
  "duration-200",
  "rounded-md",
  "transition-all",
];
const getButtonClass = (isColor) => {
  let buttonClass = [...commonButtonClass];
  if (isColor) {
    buttonClass.push("text-[var(--vp-c-text-1)]", "bg-[var(--vp-button-alt-bg)]");
  } else {
    buttonClass.push(
      "text-[var(--vp-c-text-2)]",
      "hover:text-[var(--vp-c-text-1)]",
      "hover:bg-[var(--vp-c-default-soft)]"
    );
  }
  return buttonClass;
};
const allButtonClass = computed(() => getButtonClass(!showColorIcons.value));
const colorButtonClass = computed(() => getButtonClass(showColorIcons.value));

// 滚动逻辑
const isSticky = ref(false);
const targetDiv = ref(null);
// 使用 ref 存储当前的顶部偏移
const topOffset = ref(80);

const handleScroll = () => {
  if (targetDiv.value) {
    const rect = targetDiv.value.getBoundingClientRect();
    isSticky.value = rect.top <= topOffset.value;
  }
};

// 监听媒体查询变化并设置对应的 topOffset
function updateTopOffset() {
  if (window.matchMedia('(min-width: 1280px)').matches) {
    topOffset.value = 80;  // xl: 1280px 以上时，top 为 80
  } else if (window.matchMedia('(min-width: 960px)').matches) {
    topOffset.value = 128;  // 960px 以上时，top 为 128
  } else if (window.matchMedia('(min-width: 768px)').matches) {
    topOffset.value = 64;  // md: 768px 以上时，top 为 64
  } else {
    topOffset.value = 80;   // 默认情况，top 为 0
  }
  handleScroll();
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', updateTopOffset);
  updateTopOffset(); // 初始化时即检查一次

  //观察更改和更新偏移的窗口宽度
  const resizeObserver = new ResizeObserver(updateTopOffset);
  resizeObserver.observe(document.body);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', updateTopOffset);
});
</script>

<template>
  <div class="mx-auto max-w-7xl">
    <div aria-hidden="false" ref="targetDiv" :class="{ 'shadow-lg p-2 -m-2 dark:bg-[#202127]/[.36] dark:backdrop-blur-xl': isSticky }" class="mt-9 sticky md:top-16 min-[960px]:top-32 xl:top-20 bg-[var(--vp-c-bg)] rounded-lg transition-all hidden md:flex isolate items-baseline lg:gap-4" role="tablist" aria-orientation="horizontal">
      <button :class="allButtonClass" @click="filterColorIcons(false)">
        全部
      </button>
      <button :class="colorButtonClass" @click="filterColorIcons(true)">
        彩色
      </button>
      <div class="ml-auto flex items-center gap-2 text-sm" role="none" aria-hidden="true">
        <div class="relative inline-block">
          <select
            class="myinput appearance-none px-4 py-1 pr-8 rounded-md cursor-pointer hover:!border-[var(--vp-c-brand-1)] hover:bg-[var(--vp-c-default-soft)] focus-visible:outline-none transition"
            @change="handleSortChange">
            <option value="date">最新</option>
            <option value="name">默认</option>
          </select>
          <IconTriangleBottom class="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        </div>
        <div class="relative flex-auto">
          <IconSearch
            class="pointer-events-none absolute !flex justify-center items-center h-full w-8 transition" />
          <input type="search" v-model="searchQuery" aria-label="搜索所有图标" placeholder="搜索所有图标…"
            class="myinput appearance-none block w-44 rounded-md hover:!border-[var(--vp-c-brand-1)] focus:!border-[var(--vp-c-brand-1)] caret-[var(--vp-c-brand-1)] transition py-1 pl-8 pr-4" />
        </div>
      </div>
    </div>
    <ul class="wrapper">
      <li class="group item cursor-pointer" v-for="iconComponentName in filteredIconNames" :key="iconComponentName"
        :title="iconComponentName" @click="copyName(iconComponentName)">
        <component :is="Icons[iconComponentName]" />
        <div
          class="text-xs antialiased text-center truncate break-normal text-[var(--vp-c-text-2)] text-wrap w-full h-4 group-hover:overflow-visible group-hover:break-words">
          {{ iconComponentName }}
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.wrapper {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
  gap: 2rem;
  margin: 0;
  padding: 2rem 0 0 0;
}

.item {
  display: flex;
  gap: 0.75rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  padding: 1rem;
  border-radius: 0.5rem;
  /* position: relative; */
  aspect-ratio: 1 / 1;
  cursor: pointer;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  margin: 0;
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.02),
    0 1px 3px -1px rgba(0, 0, 0, 0.2);
  /* @apply dark:bg-[var(--vp-code-copy-code-bg)] */
}
@media (prefers-color-scheme: dark) {
  .item{
    background-color: transparent;
  }
  .item:hover {
    background-color: var(--vp-code-copy-code-bg);
    box-shadow:
      0 0.3px 0.4px rgba(0, 0, 0, 0.02),
      0 0.9px 1.5px rgba(0, 0, 0, 0.045),
      0 3.5px 6px rgba(0, 0, 0, 0.09);
  }
}
.item:hover {
  box-shadow:
    0 0.3px 0.4px rgba(0, 0, 0, 0.02),
    0 0.9px 1.5px rgba(0, 0, 0, 0.045),
    0 3.5px 6px rgba(0, 0, 0, 0.09);
}
.myinput{
  border: 1px solid var(--vp-input-border-color);
}
</style>