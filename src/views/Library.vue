<template>
<v-container >
  <v-app id="Library">
    <!--------------------------------------------------------------------------------------->
  <v-layout row wrap>
          <v-flex xs12 sm12 md12 class="d-flex align-content-center flex-wrap">
            <v-card class="mt-12 mx-auto elevation-0">
              <v-card-title>My Library</v-card-title>
            </v-card>
          </v-flex>
  </v-layout>
   <v-layout row wrap>
     <v-flex xs12 sm12 md12>
  <v-card max-width="400" class="mx-auto">
    <v-container class="pa-2" fluid>
      <v-row>
        <v-col v-for="yourpage in yourpages" v-bind:key="yourpage.id">
          <v-card color="#1F7087" dark >        
       <v-list-item three-line>
              <v-list-item-content class="align-self-start">
                <v-list-item-title class="headline mb-2" v-text="yourpage.PageTitle"></v-list-item-title>
                <v-list-item-subtitle v-text="yourpage.PageSubTitle"></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-avatar size="125" tile>
                <v-img :src="yourpage.TitleImageURL"></v-img>
              </v-list-item-avatar>
            </v-list-item>
            <v-card-actions>
              <v-btn fab x-small class="warning" :to="{name:'view-page', params: {PageID: yourpage.PageID}}"><v-icon>mdi-magnify</v-icon></v-btn>
            <v-btn fab x-small class="info" :to="{name:'edit-page', params: {PageID: yourpage.PageID}}"><v-icon>mdi-pencil</v-icon></v-btn>
            <v-btn fab x-small class="error" @click="DeletePage(yourpage.id)"><v-icon>mdi-delete</v-icon></v-btn>           
            </v-card-actions>
  </v-card>
        </v-col>
      </v-row>
         <v-layout row wrap>
            <v-flex xs12 sm12 md12 class="d-flex align-content-end  flex-wrap align-items-end align-lg-content-end align-md-content-end">
                                   <v-btn dark fab bottom right fixed color="pink" to="/newpage"><v-icon>mdi-plus</v-icon></v-btn>
            </v-flex></v-layout></v-container>         
  </v-card>    
     </v-flex>
        </v-layout>
  </v-app>
</v-container>
</template>
<script>
import axios from 'axios'
import db from '../main.js'
export default {
  name: 'Library',
  components: {
  },
  data: () => ({
      yourpages: [],
    }),
    methods:{
        DeletePage (doc) {
      if (confirm('Are you sure?')) {
 db.collection("yourpages").doc(doc).delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});     
           this.$router.go()
      }
    },
    },
      created () {

             /*axios.get('http://127.0.0.1/pages/public/api/basic').then(response=>{
        this.yourpages=response.data
      })*/
    db.collection('yourpages').orderBy('PageID').get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(doc.data)
        const data = {
          'id': doc.id,
          'PageID': doc.data().PageID,
          'PageTitle': doc.data().PageTitle,
          'PageSubTitle': doc.data().PageSubTitle,
          'TitleImageURL': doc.data().TitleImageURL,

          }
        this.yourpages.push(data)
        console.log(doc.id, " => ", doc.data())
         console.log(this.PageID)    
      })
      
    })
  }
};
</script>