<template lang="html">

  <section class="create">
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item  md-small-size-100">
        <md-card-header v-if="mode=='CREATE'">
          <div class="md-title">Create card</div>
        </md-card-header>

        <md-card-header  v-else-if="mode=='EDIT'">
          <div class="md-title">Edit card</div>
        </md-card-header>

        <md-card-content>
          <md-field :class="getValidationClass('card')">
            <label for="card">Enter text...</label>
            <md-input type="text" name="card" v-model="form.card" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.card.required">You didn’t enter the text</span>
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions v-if="mode=='CREATE'">
          <md-button type="submit" class="md-primary" :disabled="sending" v-on:click="createCard">Сreate</md-button>
        </md-card-actions>

        <md-card-actions v-else-if="mode=='EDIT'">
          <md-button type="submit" class="md-primary" :disabled="sending" v-on:click="editCard">Edit</md-button>
        </md-card-actions>

      </md-card>

    </form>
  </section>

</template>

<script lang="js">
  
  import axios from 'axios'
  import { validationMixin } from 'vuelidate'
  import {
    required,
  } from 'vuelidate/lib/validators'

  export default  {
    name: 'create',
    mixins: [validationMixin],
    props: [],
    
    data: () => ({
      mode: '',
      api_url: 'http://localhost:9000/api',
      posts: [],
      errors: [],
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
    
    mounted () {
      if(this.$route.params.id) this.mode = 'EDIT'
      else this.mode = 'CREATE'
      
      this.getCard()
    },

    methods: {
      createCard: function() {
        axios.post(this.api_url+"/todo/card/create",{
            body: this.form.card,
          })
          .then(response => {
            console.log(response);
            this.$router.push({path: '/todo'}) 
          })
          .catch(error => {
            console.log(error);
          })
      },
      
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]
        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },

      editCard: function() {
        axios.post(this.api_url+"/todo/card/edit",{
            id: this.$route.params.id,
            body: this.form.card,
          })
          .then(response => {
            console.log(response);
            this.$router.push({path: '/todo'}) 
          })
          .catch(error => {
            console.log(error);
          })

      },
      
      getCard() {
        axios.post(this.api_url+"/todo/card/get/one",{
            id: this.$route.params.id,
          })
          .then(response => {
            this.form.card = response.data[0].body;
            console.log(response.data[0].body)
            console.log(this.form);
          })
          .catch(error => {
            console.log(error);
          })
      },

      clearForm () {
        this.form.card = null
      },

      saveUser () {
      console.log(this.form)

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
