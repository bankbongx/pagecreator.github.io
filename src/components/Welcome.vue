<template>
    <v-container>
      <v-content>
      <v-app id="Welcome">
        <v-layout row wrap>
          <v-flex xs12 sm12 md12 class="d-flex align-content-center flex-wrap">
            <v-card class="pa-4 mt-12 mx-auto elevation-0">
              <v-card-title>Welcome To Page Creator</v-card-title>
              <v-card-text>Try to make your own page</v-card-text>
              <v-card-actions><v-btn class="info" text to="/login">Get Start</v-btn></v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm12 md12>
          <v-carousel>
            <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ><div class="title">
      {{ item.title }}
    </div>
    </v-carousel-item>
  </v-carousel>
        </v-flex>
      </v-layout>
        </v-app>
        </v-content>
    </v-container>
</template>
<script>

export default {
  name: 'Welcome',
  components: {
  },
  data () {
      return {
        items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg', title: "Animal Story",
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg', title: "Sky and Clound",
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg', title: "Under The Wings",
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg', title: "Cosmic Being?",
          },
        ],
      }
    },
};
</script>
<style lang="scss" scoped>
.title {
  position:absolute;
  bottom:50px;
  color:white;
  padding:20px
}
</style>
