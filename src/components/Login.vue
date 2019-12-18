<template>
  <v-app id="login">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="blue-grey lighten-4"
                flat
              >
                <v-toolbar-title>LOGIN</v-toolbar-title>
                <div class="flex-grow-1"></div>
                <v-spacer>
                </v-spacer>
                                  <v-toolbar-items>
                    <template>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">SIGN UP</v-btn>
      </template>
      <v-card>
        <v-form @submit.prevent="saveUser" class="col s12" id="newUserForm" ref="newUserForm" enctype="multipart/form-data">
      <v-card-title>
          <span class="headline">USER PROFILE</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="FIRST NAME*" :rules="[rules.required]" v-model="UserFirstName" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                v-model="UserLastName"
                  label="LAST NAME*"
                  persistent-hint
                  :rules="[rules.required]"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="UserEmail" label="EMAIL*" :rules="[rules.required, rules.email]" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="UserPhoneNumber" :rules="[rules.required]" label="PHONE NUMBER*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="UserPassword" :rules="[rules.required]" label="PASSWORD*" type="password" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="UserPasswordConFirm" :rules="[rules.required, rules.passwordConfirm]" label="PASSWORD CONFIRM*" type="password" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="close">CANCEL</v-btn>
           <v-btn color="blue darken-1" text @click="reset">CLEAR</v-btn>
          <v-btn color="blue darken-1" text  type="submit">CONFIRM</v-btn>
        </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
</template>
                  </v-toolbar-items>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="email"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue-grey lighten-4"  @click="UserLogin">Login</v-btn>
                <v-spacer></v-spacer>or<v-spacer></v-spacer>
                <v-btn color="primary" dark to="/library"><v-icon>mdi-facebook</v-icon></v-btn>
                <v-btn color="red" dark to="/library"><v-icon>mdi-google</v-icon></v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import axios from 'axios'
import db from '../main.js'
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      dialog: false,
    UserFirstName: null,
    UserLastName: null,
    UserPhoneNumber: null,
      UserEmail: null,
      UserPassword: '',
      UserPasswordConFirm: '',
      password: '',
      email: '',
rules: {
          required: value => !!value || 'Required.',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
          passwordConfirm: value => !!value || 'Required.',        
        },
    }),
   methods: {
     reset(){
      var p1 = new Promise((resolve, reject) => {
         this.$refs.newUserForm.resetValidation()
        this.$refs.newUserForm.reset()
  resolve('Success!');

  // or
  reject(new Error("Error!"));
});

p1.then(value => {

  console.log(value); // Success!
}, reason => {
  console.error(reason); // Error!
});
    },
    close(){
      var p1 = new Promise((resolve, reject) => {
         this.$refs.newUserForm.resetValidation()
        this.$refs.newUserForm.reset()
  resolve('Success!');
  // or
  reject(new Error("Error!"));
});

p1.then(value => {
this.dialog = false 
  console.log(value); // Success!
}, reason => {
  console.error(reason); // Error!
});     
    },
    UserLogin(){
      /*axios.post('http://page-api.aecplaza.com/home/login',{
  email: this.email,
  password: this.password
})
.then(docref => console.log("logged in", docref), this.$router.push('/library'))
.catch(error => console.log("Error loggedin: ", error))*/
    },
    saveUser () {
      //localhost
      /*axios.post('http://127.0.0.1/pages/public/api/insert',{
        firstname: this.UserFirstName,
  lastname: this.UserLastName,
  email: this.UserEmail,
  password: this.UserPassword,
  confirm: this.UserPasswordConFirm,
  phone: this.UserPhoneNumber,
  token: 'qwertyuiopasdfghjklzxcvbnm',
  status: 1
      }).then(docref => console.log("success", docref, this.dialog = false, this.close()))
.catch(error => console.log("Error adding document: ", error))*/

//aecplaza
/*axios.post('http://page-api.aecplaza.com/home/register',{
  firstname: this.UserFirstName,
  lastname: this.UserLastName,
  email: this.UserEmail,
  password: this.UserPassword,
  confirm: this.UserPasswordConFirm,
  telephone: this.UserPhoneNumber,
})
.then(docref => console.log("success", docref))
.catch(error => console.log("Error adding document: ", error))*/

//firebase 
      db.collection('users').add({
        UserFirstName: this.UserFirstName,
        UserLastName: this.UserLastName,
        UserEmail: this.UserEmail,
        UserPhoneNumber: this.UserPhoneNumber,
        UserPassword: this.UserPassword,
        UserPasswordConFirm: this.UserPasswordConFirm
      })
      .then(docref => console.log("Document written with ID: ", docref.id), this.$router.push('/library'))
        .catch(error => console.log("Error adding document: ", error))
    }
  }
  }
</script>