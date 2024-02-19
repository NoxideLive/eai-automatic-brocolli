<script setup>
import { usePollsStore } from '@/stores/polls.js'
import { computed } from 'vue'
import BarChart from '@/components/BarChart.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const store = usePollsStore()

const poll = computed(() => store.polls?.[props.id])

function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const data = computed(() => {
  return {
    labels: poll.value.options.map((option) => option.text),
    datasets: [
      {
        data: poll.value.options.map((option) => option.votes),
        backgroundColor: poll.value.options.map(() => getRandomColor())
      }
    ]
  }
})
</script>

<template>
  <v-container>
    <h1>Results for {{ poll.text }}</h1>
    <BarChart :chart-data="data" />
    <v-btn :to="{ name: 'vote-poll', params: { id: props.id } }">Back</v-btn>
  </v-container>
</template>

<style scoped></style>
