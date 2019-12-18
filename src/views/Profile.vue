<template>
  <v-app id="Profile">
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
              <v-card-text>
                <h1>User Profile</h1>
              </v-card-text>
<v-layout row justify-centered pa-3>
  <v-flex xs12 sm6 md6>

<div style="list-style-type:none" class="ul collection with-hearder" justify-centered xs6 sm3 offset-sm3 pa3>
    <v-divider></v-divider>
  <li v-for="user in users" v-bind:key="user.id" class="collection-item" xs6 sm3 offset-sm3>
    <v-card class="elevation-12" pa3>
  <v-card-title>{{user.firstname}} {{user.lastname}}</v-card-title>
  <v-card-text> {{user.email}} </v-card-text>
  <v-card-text> Password{{user.password}} </v-card-text>
  </v-card>
    <!--<router-link class="secondary-content" v-bind:to="{name:'view-service', params: {service_id: services.service_id}}"><v-icon>visibility</v-icon></router-link>-->
  </li>
  <v-divider></v-divider>
</div>


<!--<div id = "view-profile" >
<ul class="">
  <li class=""><h4>{{UserFirstName}} {{UserLastName}}</h4></li>
  <li class="">EMAIL:{{UserEmail}}</li>
  <li class="">PASSWORD:{{UserPassword}}</li>
</ul>
</div>-->

</v-flex>
</v-layout>

    <!--<v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">EDIT</v-btn>
      </template>
      <v-card>
        <form @submit.prevent="saveUser" class="col s12" id="newUserForm">
        <v-card-title>
          <span class="headline">USER PROFILE</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="FIRST NAME*" v-model="UserFirstName" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                v-model="UserLastName"
                  label="LAST NAME*"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="UserEmail" label="EMAIL*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="UserPassword" label="PASSWORD*" type="password" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="dialog = false">CANCEL</v-btn>
          <v-btn color="blue darken-1" text  type="submit">CONFIRM</v-btn>
        </v-card-actions>
        </form>
      </v-card>
    </v-dialog>-->

            </v-card>
            

          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import axios from 'axios'
//import db from '../main.js'
  export default {
      name: 'Profile',
    data: () => ({
      drawer: null,
      dialog: false,

users: [],
    }),
    /* beforeRouteEnter (to, from, next) {
    db.collection('users').get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.id = doc.id
            vm.UserFirstName = doc.data().UserFirstName
            vm.UserLastName = doc.data().UserLastName
            vm.UserEmail = doc.data().UserEmail
            vm.UserPassword = doc.data().UserPassword
          })
        })
      })
  },
  watch: {
    '$route': 'fetchData'
  },*/
   methods: {
         /*fethData () {
      db.collection('users').get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.id = doc.id
            this.UserFirstName= doc.data().UserFirstName
            this.UserLastName = doc.data().UserLastName
            this.UserEmail = doc.data().UserEmail
            this.UserPassword = doc.data().UserPassword
        })
        })
    },*/
    /*saveUser () {
      db.collection('users').add({
        UserFirstName: this.UserFirstName,
        UserLastName: this.UserLastName,
        UserEmail: this.UserEmail,
        UserPassword: this.UserPassword
      })
      .then(docref => console.log("Document written with ID: ", docref.id), this.$router.push('/library'))
        

        .catch(error => console.log("Error adding document: ", error))
    },*/
  },
    created () {
      axios.get('http://127.0.0.1/pages/public/api/basic').then(response=>{
        this.users=response.data
      })

    /*db.collection('users').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = {
          'id': doc.id,
          'UserFirstName': doc.data().UserFirstName,
          'UserLastName': doc.data().UserLastName,
          'UserEmail': doc.data().UserEmail,
          'UserPassword': doc.data().UserPassword
          }
        this.users.push(data)
      })
    })*/
  }
  }
</script>





