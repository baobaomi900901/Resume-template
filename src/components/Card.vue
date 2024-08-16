<template>
  <div class="card">
    <div class="card-head" :style="{ color: headColor }">
      <component :is="iconComponent" v-if="iconComponent" />
      <span>{{ title }}</span>
    </div>
    <div class="card-body">
      <span class="value" :style="{ color: valueColor }">{{ value }}</span>
      <span class="unit">{{ unit }}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import * as Icons from "ksw-vue-icon";
import "ksw-vue-icon/styles/icon.css";

const props = defineProps({
  icon: String,
  title: { type: String, required: true },
  headColor: { type: String, default: "#333" },
  value: { type: [String, Number], required: true },
  valueColor: { type: String, default: "#000" },
  unit: { type: String, required: true },
});

const iconComponent = computed(() => {
  return props.icon ? Icons[props.icon] : null;
});
</script>

<style scoped>
.card {
  overflow: hidden;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 0px;
}

.card-head {
  font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    display: flex;
    flex-direction: row;
    padding: 16px 16px 8px 16px;
    align-self: stretch;
    background: #ffffff;
    align-items: center;
    gap: 4px;
}

.card-body {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  padding: 16px;
  gap: 4px;
  align-self: stretch;
  line-height: normal;
  background: #ffffff;
}
.value {
  font-size: 40px;
font-weight: 500;
}

.unit {
  font-size: 18px;
font-weight: 500;
  opacity: .4;
}
</style>
