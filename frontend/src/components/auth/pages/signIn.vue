<template lang="html">

  <section class="sign-in">

    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Sign In</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('firstName')">
                <label for="first-name">First Name</label>
                <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>
                <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span>
              </md-field>
            </div>        
          </div>

          <md-field :class="getValidationClass('password')">
            <label>Your password</label>
            <md-input v-model="form.password" :disabled="sending" type="password"></md-input>
            <span class="md-error" v-if="!$v.form.password.required">The passwords is required</span>
          </md-field>
          <router-link to="/auth/signup" class="font">Registration</router-link>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />
        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending" @click="user()">continue</md-button>
        </md-card-actions>
        
      </md-card>
      <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
    </form>
    
  </section>

</template>

<script lang="js">
  import axios from 'axios'
  import { validationMixin } from 'vuelidate'
  import {
    required,
    minLength,
  } from 'vuelidate/lib/validators'

  export default  {
    name: 'sign-in',
    mixins: [validationMixin],
    props: [],
    mounted () {

    },
    data: () => ({
      api_url: 'http://localhost:9000/api',

      passValidVal: true,
      form: {
        firstName: null,
        
      },
      userSaved: false,
      sending: false,
      lastUser: null
    }),

    validations: {
      form: {
        firstName: {
          required,
          minLength: minLength(3)
        },
        password: {
          required
        }
      }
    },
    
    methods: {
      user() {
        axios.post(this.api_url+"/user/signin",{
          user: this.form
        }).then(result => {
          localStorage.setItem('token', result.data.token);
          axios.defaults.headers['x-access-token'] = localStorage.getItem("token");
          this.$router.push({path: '/todo'}) 
        }).catch(() => {
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

      clearForm () {
        this.$v.$reset()
        this.form.firstName = null
        this.form.password = null
        
      },

      saveUser () {
        this.sending = true
        window.setTimeout(() => {
          this.lastUser = `${this.form.firstName} `
          this.userSaved = true
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
  .sign-in {
    display: flex;
    height: 100%;
    flex-direction: column;
    form {
      max-width: 400px;
      width: 100%;
      margin: auto;
      .md-card {
        min-width: 100%;
      } 
    }
  }
</style>
