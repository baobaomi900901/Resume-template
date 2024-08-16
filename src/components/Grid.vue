<template>
  <div id="app">
    <div class="card-container">
      <Card
        v-for="(card, index) in cards"
        :key="index"
        :icon="card.icon"
        :title="card.title"
        :headColor="card.headColor"
        :value="card.value"
        :valueColor="card.valueColor"
        :unit="card.unit"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import Card from './Card.vue';
  
  const cards = ref([
    {
      icon: 'IconStatusWarning',
      title: '当前需求总数',
      headColor: '#28a745',
      value: 18,
      valueColor: '#000',
      unit: '项'
    },
    {
      icon: 'IconStatusWarning',
      title: 'Another Metric',
      headColor: '#007bff',
      value: 42,
      valueColor: '#ff0000',
      unit: 'units'
    },
    // 添加其他卡片数据...
  ]);
  </script>

<style scoped>
.card-container {
  display: grid;
  gap: 1rem;
  /* grid-template-columns: repeat(6, minmax(0px, 1fr)); */
}

/* Media Queries */
@media (min-width: 976px) {
  .card-container {
    grid-template-columns: repeat(3, minmax(0px, 1fr));
  }
}

@media (min-width: 1360px) {
  .card-container {
    grid-template-columns: repeat(4, minmax(0px, 1fr));
  }
}

@media (min-width: 1600px) {
  .card-container {
    grid-template-columns: repeat(6, minmax(0px, 1fr));
  }
}

@media (min-width: 2000px) {
  .card-container {
    grid-template-columns: repeat(8, minmax(0px, 1fr));
  }
}
</style>
