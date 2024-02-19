<script setup>
import { useFieldArray, useForm } from 'vee-validate'
import { usePollsStore } from '@/stores/polls.js'
import { useRouter } from 'vue-router'

const { defineField, meta, errors } = useForm({
  validationSchema: {
    question_text: val => val?.length > 5 || 'Question is required'
  }
})
const [question_text, nameAttrs] = defineField('question_text')
const { remove, push, fields } = useFieldArray('options')

const store = usePollsStore()

const $router = useRouter()

const onSubmit = () => {
  store.addPoll({
    text: question_text,
    options: fields.value.map(option => ({ text: option.text, votes: 0 }))
  })

  $router.push({ name: 'home' })
}

</script>

<template>
  <v-container>
    <v-form @submit.prevent="onSubmit">
      <v-text-field
        v-model="question_text"
        v-bind="nameAttrs"
        label="Question"
      ></v-text-field>
      <span>{{ errors.question_text }}</span>

      <div>
        <div v-for="(option, index) in fields" :key="index"
             class="mb-2">
          <v-text-field
            :label="`Option ${index + 1}`"
            v-model="option.text"
          ></v-text-field>
          <v-btn @click="remove(index)">Remove</v-btn>
        </div>
      </div>
      <v-btn-group>
        <v-btn @click="push({ text: '' })">Add Option</v-btn>
        <v-btn type="submit" :disabled="!meta.valid">Submit</v-btn>
      </v-btn-group>
    </v-form>
  </v-container>
</template>

<style scoped>

</style>
