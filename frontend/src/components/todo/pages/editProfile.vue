<template lang="html">
  <section class="edit-profile">

    <md-steppers md-alternative>
      <md-step id="first" md-label="Сhange зassword">
        <form novalidate class="md-layout" >
          <md-field :class="getValidationClass('oldPassword')">
            <label>Old password</label>
            <md-input v-model="form.oldPassword"  type="password"></md-input>
          </md-field>

          <md-field :class="getValidationClass('newPassword')">
            <label>New password</label>
            <md-input v-model="form.newPassword" type="password"></md-input>
          </md-field>
          <span class="eror" v-if="passValidVal==false" id="passerr">Passwords do not match</span>

          <md-field :class="getValidationClass('confirmPassword')" :md-toggle-password="false">
            <label> Confirm password  </label>
            <md-input v-model="form.confirmPassword" type="password"></md-input>
          </md-field>
          <span class="eror" v-if="passValidVal==false" id="passerr">Passwords do not match</span>

          <md-card-actions>
            <md-button class="md-primary" type="submit"  @click="passValid(), validatePass()">Save</md-button>
          </md-card-actions>
        </form>
      </md-step>

      <md-step id="second" md-label="Change user">
        <form novalidate class="md-layout">
          <button type="button" class="md-fab font" @click="addImg()">Upload image
          </button>
          <input type="file" class="imgInp" id="file" ref="imgInput"/>
          <md-field >
            <label for="email">Email</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="user.email" />
            <span class="eror" v-if="userVal==false">The email is required</span> 
          </md-field>
          <md-card-actions>
            <md-button  class="md-primary" @click="validateUser()">Send</md-button>
          </md-card-actions>
        </form>
        
      </md-step>
    </md-steppers>
  </section>
</template>
<script lang="js">
  import axios from 'axios'
  import { validationMixin } from 'vuelidate'
  import {eventBus} from '../../../main.js'
  import {
    required,
  } from 'vuelidate/lib/validators'
 
  export default  {
    name: 'edit-profile',
    mixins: [validationMixin],
    props: [],
    mounted () {
      this.loadingProfil()
    },
    data: () => ({
      api_url: 'http://localhost:9000/api',
      passValidVal: true,
      userVal: true,
      user:'',
      form: {
        oldPassword: null,
        newPassword: null,
        confirmPassword: null
      },
      lastUser: null
    }),
    validations: {
      form: {
        oldPassword: {
         required
        },
        newPassword: {
          required
        },
        confirmPassword: {
          required
        },
       
      },
    },

    methods: {
      loadingProfil() {
          this.user = JSON.parse(localStorage.getItem('user'))
      },
      passValid: function() {
         this.passValidVal = this.form.newPassword == this.form.confirmPassword
      },
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]
        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },

      editPassword() {
        axios.post(this.api_url+'/user/password/edit',{password: this.form})
        .then(() => {
          this.$router.push({path: '/todo'}) 
        })
        .catch(() => {
          alert("You entered an incorrect password")
        })
      },

      addImg() {
        this.$refs.imgInput.click()
      },

      saveUser () {
        this.lastUser = `${this.form.firstName} ${this.form.lastName}`
        this.userSaved = true
      },

      validatePass () {
        if (!this.$v.$invalid && this.passValidVal) {
          this.editPassword()
        }
      },
      
      validateUser () {
        if (!this.validEmail(this.user.email)) {
          this.userVal = false
        }else {
          this.userVal = true
          this.editUser()
        }
      },

      validEmail: function (email) {
        /* eslint-disable */
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },

      editUser() {
        var formData = new FormData();
        var imagefile = document.querySelector('#file');
        formData.append("image", imagefile.files[0])
        formData.append("email", this.user.email)
        axios.post(this.api_url+'/user/profil/edit',formData)
        .then(() => {
          eventBus.$emit("updateProfil")
          this.$router.push({path: '/todo'}) 
        }).catch(() => {
        })
      },
    }
  }

</script>
<style scoped lang="scss">
  .eror {
    color: red;
  }
  .imgInp {
    display: none;
  }
  .md-fab {
    &:hover {
      background: #1268ad;
    }
    .font {
      width: 176px;
    }
  }
</style>