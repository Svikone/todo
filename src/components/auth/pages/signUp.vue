<template lang="html">

  <section class="sign-up">
     <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Sign Up</div>
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

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('lastName')">
                <label for="last-name">Last Name</label>
                <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.lastName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.lastName.required">The last name is required</span>
                <span class="md-error" v-else-if="!$v.form.lastName.minlength">Invalid last name</span>
              </md-field>
            </div>
          </div>

          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
          </md-field>

          <md-field>
            <label>Your password</label>
            <md-input v-model="form.password" type="password"></md-input>
            <span class="md-error" v-if="passValidVal==false">The email is required</span>
            <span class="md-error" v-else-if="passValidVal">Invalid email</span>
          </md-field>

          <md-field :md-toggle-password="false">
            <label> Confirm password  </label>
            <md-input v-model="form.confirmpassword" type="password"></md-input>
            <span class="md-error" v-if="!passValidVal">The email is required</span>
            <span class="md-error" v-else-if="passValidVal">Invalid email</span>
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending" @click="passValid">Create user</md-button>
        </md-card-actions>

      </md-card>

      <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
    </form>

  </section>

</template>

<script lang="js">
  import { validationMixin } from 'vuelidate'
  import {
    required,
    email,
    minLength,
  } from 'vuelidate/lib/validators'

  export default  {
    name: 'sign-up',
    mixins: [validationMixin],
    props: [],
    mounted () {

    },
    data: () => ({
      passwordValidVal: true,
      form: {
        firstName: null,
        lastName: null,
        email: null,
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
        lastName: {
          required,
          minLength: minLength(3)
        },
        email: {
          required,
          email
        },
        password: {
          required
        }
      }
    },
    methods: {

      passValid: function() {
         return this.passValidVal = this.form.password == this.form.confirmpassword
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
        this.form.lastName = null
        this.form.email = null
      },
      saveUser () {
        this.sending = true

        // Instead of this timeout, here you can call your API
        window.setTimeout(() => {
          this.lastUser = `${this.form.firstName} ${this.form.lastName}`
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
  .sign-up {
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: auto;
    form {
      margin: auto;
    }
  }
</style>
