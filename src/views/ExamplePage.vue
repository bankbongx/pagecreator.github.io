<template>
      <v-container>
        <v-content>
          <v-app id="ExamplePage">
        <!--title section display max-height 1080px for desktop and 400px for moblie-->
          <v-layout row wrap>
            <v-flex xs12 sm12 md12 lg12 class="d-flex align-content-center justify-center flex-wrap align-items-center align-lg-content-center align-md-content-center">
              <v-responsive :aspect-ratio="16/9" max-height="1080px">
                <v-card flat class="mx-auto elevation-0 justify-center align-content-center align-lg-content-center align-md-content-center">
                  <v-col cols="12" sm="12" md="12">
                    <v-img
                    class="white--text"
                    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                    >
                      <v-col cols="12" sm="12" md="12">
                        <v-card-title class="justify-center align-self-center"><h1>THE STORY</h1>
                        </v-card-title>
                        <v-card-title class="justify-center align-self-center">season of life
                        </v-card-title>
                      </v-col>
                    </v-img>
                  </v-col>
                </v-card>
              </v-responsive>
            </v-flex>
            </v-layout>
        <!--content section 1 up to 10 display max-heigh 400px for mobile-->
                <!--<v-layout row wrap>
            <v-flex xs12 sm12 md12 class="d-flex align-content-center justify-center flex-wrap align-items-center align-lg-content-center align-md-content-center">
               <v-card flat class="mt-4 mx-auto elevation-0">
                    <v-col cols="12" sm="12" md="12" lg="12">
               <template>
  <div>
    <tiptap-vuetify v-model="content" :extensions="extensions"/>

    <h3 class="mt-4 primary--text">Preview</h3>
    <v-divider/>

    <div class="tiptap-vuetify-editor__content" v-html="content"/>

    <h3 class="mt-2 primary--text">HTML</h3>
    <v-divider/>

    <div class="mt-3">{{ content }}</div>
  </div>
</template>

                    </v-col>
               </v-card>
            </v-flex>
        </v-layout>-->
        <!--content section paragraph sample-->
        <v-layout row wrap>
            <v-flex xs12 sm12 md12 class="d-flex align-content-center justify-center flex-wrap align-items-center align-lg-content-center align-md-content-center">
               <v-card flat class="mt-4 mx-auto elevation-0">
                    <v-col cols="12" sm="12" md="12" lg="12">
                      <v-card-title><h3>| The Story of Life</h3></v-card-title>
                      <v-card-text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</v-card-text>
                    </v-col>
               </v-card>
            </v-flex>
        </v-layout>
        <!--content sect tion carousel sample-->
        <v-layout row wrap>
            <v-flex xs12 sm12 md12 class="d-flex align-content-center justify-center flex-wrap align-items-center align-lg-content-center align-md-content-center">
                <v-card flat class="mt-4 mx-auto elevation-0">
                    <v-col cols="12" sm="12" md="12">
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
                    </v-col>
                </v-card>
            </v-flex>
        </v-layout>
        <!--content section youtube embed sample-->
          <v-layout row wrap>
            <v-flex xs12 sm12 md12 class="d-flex align-content-center justify-center flex-wrap align-items-center align-lg-content-center align-md-content-center">
               
               <v-card flat class="mt-4 mx-auto elevation-0">
                    <v-col cols="12" sm="12" md="12">
                      <iframe height="315px" src="https://www.youtube.com/embed/h80qDTHp_yk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </v-col>
               </v-card>
            </v-flex>
        </v-layout>
        <!--content section image sample-->
        <v-layout row wrap>
            <v-flex xs12 sm12 md12  class="d-flex align-content-center justify-center flex-wrap align-items-center align-lg-content-center align-md-content-center">
               <v-card flat class="mt-4 mx-auto elevation-0">
                    <v-col cols="12" sm="12" md="12" lg="12">
                      <v-img src="https://cdn.vuetifyjs.com/images/carousel/sky.jpg" title="Sky and Clound">
                      </v-img>
                      <v-card-title ><h3>| Under The Sky</h3></v-card-title>
                    </v-col>
               </v-card>
            </v-flex>
        </v-layout>
        <!--content section image sample 2-->
        <v-layout row wrap>
            <v-flex xs12 sm12 md12  class="d-flex align-content-center justify-center flex-wrap align-items-center align-lg-content-center align-md-content-center">
               <v-card flat class="mt-4 mx-auto elevation-0">
                    <v-col cols="12" sm="12" md="12" lg="12">
                      <v-img src="https://cdn.vuetifyjs.com/images/carousel/planet.jpg" title="Sky and Clound">
                      </v-img>
                    </v-col>
               </v-card>
            </v-flex>
        </v-layout>
                <v-layout row wrap>
            <v-flex xs12 sm12 md12  class="d-flex align-content-center justify-center flex-wrap align-items-center align-lg-content-center align-md-content-center">
               <v-card flat class="mt-4 mx-auto elevation-0">
                    <v-col cols="12" sm="12" md="12" lg="12">
                      <v-card-title><a href="https://www.youtube.com/user/NationalGeographic/videos" target="blank"><h3 > Secret of Galaxy</h3></a></v-card-title>
                    </v-col>
               </v-card>
            </v-flex>
        </v-layout>
        <!--content section button sample -->
        <v-layout row wrap>
            <v-flex xs12 sm12 md12  class="d-flex align-content-center justify-center flex-wrap align-items-center align-lg-content-center align-md-content-center">
               <v-card flat class="mt-4 mx-auto elevation-0">
                    <v-col cols="12" sm="12" md="12" lg="12">
                      <v-btn href="https://www.youtube.com/user/NationalGeographic/videos"
                          target="blank">Watch Now</v-btn>
                    </v-col>
               </v-card>
            </v-flex>
        </v-layout>
        <!--contacts float button section  display stict on the bottom-->
        <v-layout row wrap>
            <v-flex xs12 sm12 md12 class="d-flex align-content-end justify-end flex-wrap align-items-end align-lg-content-end align-md-content-end">
              <template>
                <v-speed-dial
                v-model="fab"
                bottom
                right
                direction="top"
                transition="slide-y-reverse-transition"
                fixed
                >
                  <template v-slot:activator>
                    <v-btn
                      v-model="fab"
                      color="blue darken-2"
                      dark
                      fab
                      >
                        <v-icon v-if="fab">mdi-close</v-icon>
                        <v-icon v-else>mdi-account-plus</v-icon>
                    </v-btn>
                    </template>
                        <v-btn
                          fab
                          dark
                          small
                          color="green"
                          href="https://line.me/th/download"
                          target="blank"
                          >Line
                        </v-btn>
                        <v-btn
                          fab
                          dark
                          small
                          color="blue"
                          href="https://www.facebook.com/natgeo"
                          target="blank"
                        >
                          <v-icon>mdi-facebook</v-icon>
                          </v-btn>
            <v-btn
        fab
        dark
        small
        color="pink"
        href="https://www.instagram.com/natgeo/"
        target="blank"
      >
        <v-icon>mdi-linkedin</v-icon>
      </v-btn>
    </v-speed-dial>
</template>
</v-flex>
        </v-layout>
        </v-app>
    </v-content>
    </v-container>
</template>
<script>
// import the component and the necessary extensions
/*<import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, CodeBlock, Paragraph, BulletList, OrderedList,
  ListItem, Link, Blockquote, HardBreak, HorizontalRule, History
} from 'tiptap-vuetify'*/
  export default {
      name: 'ExamplePage',
      //components: { TiptapVuetify },
  data () {
      return {
          fab: false,
        items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg', title: "Under The Wings",
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg', title: "Sky and Clound",
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg', title: "Animal Story",
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg', title: "Cosmic Being?",
          },
        ],
      // declare extensions you want to use
    /*extensions: [
      // you can specify options for extension
      new Heading({
        levels: [1, 2, 3]
      }),
      new Bold(),
      new Italic(),
      new Strike(),
      new Underline(),
      new Code(),
      new CodeBlock(),
      new Paragraph(),
      new BulletList(),
      new OrderedList(),
      new ListItem(),
      new Link(),
      new Blockquote(),
      new HardBreak(),
      new HorizontalRule(),
      new History()
    ],
    // starting content for the editor
    content: `<h1>Most basic use</h1>
<p>
  You can use the necessary extensions. 
  The corresponding buttons are 
  <strong>
    added automatically.
  </strong>
</p>
<pre><code>&lt;tiptap-vuetify v-model="content" :extensions="extensions"/&gt;</code></pre>
<p></p>
<h2>Icons</h2>
<p>Avaliable icons groups:</p>
<ol>
  <li>
    <p>Material Design <em>Official</em></p>
  </li>
  <li>
    <p>Font Awesome (FA)</p>
  </li>
  <li>
    <p>Material Design Icons (MDI)</p>
  </li>
</ol>
<p></p>
<blockquote>
  <p>This package is awesome!</p>
</blockquote>
<p></p>`*/
}
    },
  }
  </script>
  <style lang="scss" scoped>
.title {
  position:absolute;
  bottom:50px;
  color:white;
  padding:50px;
  align-self:center;
}
</style>