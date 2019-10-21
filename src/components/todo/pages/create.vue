<template lang="html">

  <section class="create">
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Create card</div>
        </md-card-header>

        <md-card-content>
          <md-field :class="getValidationClass('card')">
            <label for="card">Enter text...</label>
            <md-input type="text" v-model="form.card" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.card.required">You didn’t enter the text</span>
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending" >Сreate</md-button>
        </md-card-actions>

      </md-card>

    </form>
  </section>

</template>

<script lang="js">
  import { validationMixin } from 'vuelidate'
  import {
    required,
  } from 'vuelidate/lib/validators'

  export default  {
    name: 'create',
    mixins: [validationMixin],
    props: [],
    mounted () {

    },
    data: () => ({
      
      form: {
        card: null,
      },
      sending: false,
    }),

    validations: {
      form: {
        card: {
          required,
        }, 
      }
    },

    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]
        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },

      clearForm () {
        this.form.card = null
      },

      saveUser () {
      console.log(this.$v.form)

        this.$v.$reset()
        this.sending = true
        // Instead of this timeout, here you can call your API
        window.setTimeout(() => {
          this.sending = false
          this.clearForm()
        }, 1500)
      },

      validateUser () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.saveUser()
        }
      }
    } 
  }

</script>

<style scoped lang="scss">
  .create {

  }
</style>
