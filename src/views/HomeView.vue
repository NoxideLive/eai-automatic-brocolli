<script setup>
import { usePollsStore } from '@/stores/polls.js'

const store = usePollsStore()
</script>

<template>
  <v-container>
    <h1>Welcome to the Poll Site</h1>
    <p>Select a poll from the list below:</p>
    <div v-for="(poll, index) in store.polls" :key="index">
      <RouterLink :to="{ name: 'vote-poll', params: { id: index } }">{{ poll.text }}</RouterLink>
    </div>
    <v-btn to="/polls/create">Create Polls</v-btn>
  </v-container>
</template>

<style scoped></style>
