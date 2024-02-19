<script setup>
import { usePollsStore } from '@/stores/polls.js'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const store = usePollsStore()

const selected = ref(null)

const poll = ref()

onMounted(() => {
  poll.value = store.getPoll(props.id)
})

const $router = useRouter()

const vote = () => {
  store.addVote(props.id, selected.value)
  $router.push({ name: 'home' })
}

</script>

<template>
  <v-container v-if="poll">
    <div class="d-flex justify-end">
      <v-btn to="/">Back</v-btn>
      <v-btn :to="{ name: 'results-poll'}">Results</v-btn>
    </div>
    <span>{{ poll.text }}</span>
    <div>
      <v-radio-group v-model="selected">
        <v-radio
          color="primary"
          v-for="(option, index) in poll.options"
          :key="index"
          :label="option.text + ' (' + option.votes + ')'"
          :value="index"
        ></v-radio>
      </v-radio-group>
    </div>
    <v-btn color="primary" @click="vote">Vote</v-btn>
  </v-container>
</template>

<style scoped>

</style>
