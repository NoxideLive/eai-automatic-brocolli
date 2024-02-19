import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePollsStore = defineStore('polls', () => {
  const polls = ref([
    {
      id: 1,
      text: 'What is your favorite programming language?',
      options: [
        { id: 1, text: 'JavaScript', votes: 0 },
        { id: 2, text: 'TypeScript', votes: 0 },
        { id: 3, text: 'Python', votes: 0 },
        { id: 4, text: 'Ruby', votes: 0 }
      ]
    },
    {
      id: 2,
      text: 'What is your favorite frontend framework?',
      options: [
        { id: 1, text: 'Vue', votes: 0 },
        { id: 2, text: 'React', votes: 0 },
        { id: 3, text: 'Angular', votes: 0 },
        { id: 4, text: 'Svelte', votes: 0 }
      ]
    }
  ])

  const addPoll = (poll) => {
    polls.value.push(poll)
  }

  const getPoll = (id) => {
    return polls.value[id]
  }

  const addVote = (pollId, optionId) => {
    const poll = polls.value[pollId]
    const option = poll.options[optionId]
    option.votes++
  }

  return {
    polls,
    addPoll,
    getPoll,
    addVote
  }
})
