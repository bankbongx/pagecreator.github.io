
<template>
    <v-app id="view-page">
    
        <v-container flex-grow-1>
    
            <v-content flex-grow-1>
    
                <!--view  page-->
    
                <v-layout row xs12 sm12 md12 lg12 xl12>
    
                    <v-flex xs12 sm12 md12 lg12 xl12 class="d-flex  justify-center">
    
                        <v-card>
    
                            <!--toolbar-->
    
                            <v-toolbar>
    
                                <v-btn icon to="/library">
    
                                    <v-icon>mdi-arrow-left</v-icon>
    
                                </v-btn>
    
                                <div class="flex-grow-1"></div>
    
                                <v-spacer>
    
                                </v-spacer>
    
                                <!--Save Event-->
    
                                <v-toolbar-items>
    
                                    <v-btn @click="DeletePage" text>
    
                                        <v-icon>mdi-delete</v-icon>
    
                                    </v-btn>
    
                                    <!--<v-btn dark text @click="PageSave">Save</v-btn>-->
    
                                </v-toolbar-items>
    
                            </v-toolbar>
    
                            <v-divider></v-divider>
    
                            <!--Title Section Card-->
    
                            <v-responsive :aspect-ratio="16/9">
    
                                <v-card class="mx-auto elevation-0" blue-grey lighten-3>
    
                                    <!--<v-col cols="12" sm="12" md="12">-->
    
                                    <v-card flat title="Returned values:" v-if="TitleImageURL" class="d-flex align-content-center justify-center">
    
                                        <v-img :src="TitleImageURL" class="white--text d-flex align-content-center justify-center align-center">
    
                                            <v-col cols="12" sm="12" md="12">
    
                                                <!--Title-->
    
                                                <v-card-title class="justify-center ">
    
                                                    <h1>{{ PageTitle }}</h1>
    
                                                </v-card-title>
    
                                                <!--Subtitle-->
    
                                                <v-card-title class="justify-center ">{{ PageSubTitle }}
    
                                                </v-card-title>
    
                                            </v-col>
    
                                        </v-img>
    
                                    </v-card>
    
                                    <!--</v-col>-->
    
                                </v-card>
    
                            </v-responsive>
    
                            <!--Content Section 1 dispaly only 1 content type template-->
    
                            <v-card flat class="mt-5 d-flex align-content-center justify-center flex-wrap" title="Content Section 1:">
    
                                <!--Section 1 Image Card -->
    
                                <v-card flat class="mt-5" title="Content Type Image" v-if="ImageAddReturnURL1">
    
                                    <v-img :src="ImageAddReturnURL1" class="white--text"> </v-img>
    
                                </v-card>
    
                                <!--Section 1 Text Card-->
    
                                <v-card xs12 sm6 md4 lg4 flat class="mt-5" title="Content Type Text" v-if="TextAddReturn1">
    
                                    <div class="tiptap-vuetify-editor__content" v-html="TextContent1" />
    
                                </v-card>
    
                                <!--Section 1 Carousel  Card-->
    
                                <v-card xs12 sm12 md12 lg12 flat class="mt-5" title="Content Type Carousel" v-if="CarouselActive1 === true">
    
                                    <v-layout row wrap>
    
                                        <v-flex xs12 sm12 md12 class="d-flex align-content-center justify-center flex-wrap align-items-center align-lg-content-center align-md-content-center">
    
                                            <v-responsive :aspect-ratio="16/9" lg-height="1080px" max-height="1080px">
    
                                                <v-card flat class="mt-4 mx-auto elevation-0">
    
                                                    <v-carousel hide-delimiters cycle continuous>
    
                                                        <v-carousel-item v-for="(item,i) in CarouselAddReturnURL1" :key="i" :src="item" reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
    
                                                    </v-carousel>
    
                                                </v-card>
    
                                            </v-responsive>
    
                                        </v-flex>
    
                                    </v-layout>
    
                                </v-card>
    
                                <!--Section 1 Video Card-->
    
                                <v-card xs12 sm12 md12 lg12 class="mt-5 d-flex align-content-center justify-center flex-wrap align-items-center align-lg-content-center align-md-content-center" title="Content Type Video" v-if="VideoAddReturn1">
    
                                    <youtube :video-id="VideoId1" player-width="auto" player-height="auto"></youtube>
    
                                </v-card>
    
                                <!--Section 1 Button Card-->
    
                                <v-card xs12 sm12 md12 lg12 class="mt-5" title="Content Type Button" v-if="ButtonAddReturn1">
    
                                    <v-card-title>
    
                                        <v-btn href='{ ButtonURLAdd1 }' target="_blank" @click="ExternalLink">{{ ButtonAddReturn1 }}</v-btn>
    
                                    </v-card-title>
    
                                </v-card>
    
                                <!--Section 1 Link Card -->
    
                                <v-card xs12 sm12 md12 lg12 class="mt-5" title="Content Type Link" v-if="LinkURLAddReturn1">
    
                                    <v-card-title>
    
                                        <a href="{ LinkURLAddReturn1 }" target="_blank" @click="ExternalLink">{{ LinkURLAddReturn1 }}</a>
    
                                    </v-card-title>
    
                                </v-card>
    
                            </v-card>
    
                            <!--Content Section 2 dispaly only 1 content type template-->
    
                            <v-card flat class="mt-5 d-flex align-content-center justify-center flex-wrap" title="Content Section 2:">
    
                                <!--Section 2 Image Card -->
    
                                <v-card flat class="mt-5" title="Content Type Image" v-if="ImageAddReturnURL2">
    
                                    <v-img :src="ImageAddReturnURL2" class="white--text"> </v-img>
    
                                </v-card>
    
                                <!--Section 2 Text Card-->
    
                                <v-card xs12 sm6 md4 lg4 flat class="mt-5" title="Content Type Text" v-if="TextAddReturn2">
    
                                    <div class="tiptap-vuetify-editor__content" v-html="TextContent2" />
    
                                </v-card>
    
                                <!--Section 2 Carousel  Card-->
    
                                <v-card xs12 sm12 md12 lg12 flat class="mt-5" title="Content Type Carousel" v-if="CarouselActive2 === true">
    
                                    <v-layout row wrap>
    
                                        <v-flex xs12 sm12 md12 class="d-flex align-content-center justify-center flex-wrap align-items-center align-lg-content-center align-md-content-center">
    
                                            <v-responsive :aspect-ratio="16/9" lg-height="1080px" max-height="1080px">
    
                                                <v-card flat class="mt-4 mx-auto elevation-0">
    
                                                    <v-carousel hide-delimiters cycle continuous>
    
                                                        <v-carousel-item v-for="(item,i) in CarouselAddReturnURL2" :key="i" :src="item" reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
    
                                                    </v-carousel>
    
                                                </v-card>
    
                                            </v-responsive>
    
                                        </v-flex>
    
                                    </v-layout>
    
                                </v-card>
    
                                <!--Section 2 Video Card-->
    
                                <v-card xs12 sm12 md12 lg12 class="mt-5 d-flex align-content-center justify-center flex-wrap align-items-center align-lg-content-center align-md-content-center" title="Content Type Video" v-if="VideoAddReturn2">
    
                                    <youtube :video-id="VideoId2" player-width="auto" player-height="auto"></youtube>
    
                                </v-card>-
    
                                <!--Section 2 Button Card-->
    
                                <v-card xs12 sm12 md12 lg12 class="mt-5" title="Content Type Button" v-if="ButtonAddReturn2">
    
                                    <v-card-title>
    
                                        <v-btn href='{ ButtonURLAdd2 }' target="_blank" @click="ExternalLink">{{ ButtonAddReturn2 }}</v-btn>
    
                                    </v-card-title>
    
                                </v-card>
    
                                <!--Section 2 Link Card -->
    
                                <v-card xs12 sm12 md12 lg12 class="mt-5" title="Content Type Link" v-if="LinkURLAddReturn2">
    
                                    <v-card-title>
    
                                        <a href="{ LinkURLAddReturn2 }" target="_blank" @click="ExternalLink">{{ LinkURLAddReturn2 }}</a>
    
                                    </v-card-title>
    
                                </v-card>
    
                            </v-card>
    
                            <!--Content Section 3 dispaly only 1 content type template-->
    
                            <v-card flat class="mt-5 d-flex align-content-center justify-center flex-wrap" title="Content Section 3:">
    
                                <!--Section  3 Image Card -->
    
                                <v-card flat class="mt-5" title="Content Type Image" v-if="ImageAddReturnURL3">
    
                                    <v-img :src="ImageAddReturnURL3" class="white--text"> </v-img>
    
                                </v-card>
    
                                <!--Section 3 Text Card-->
    
                                <v-card xs12 sm6 md4 lg4 flat class="mt-5" title="Content Type Text" v-if="TextAddReturn3">
    
                                    <div class="tiptap-vuetify-editor__content" v-html="TextContent3" />
    
                                </v-card>
    
                                <!--Section 3 Carousel  Card-->
    
                                <v-card xs12 sm12 md12 lg12 flat class="mt-5" title="Content Type Carousel" v-if="CarouselActive3 === true">
    
                                    <v-layout row wrap>
    
                                        <v-flex xs12 sm12 md12 class="d-flex align-content-center justify-center flex-wrap align-items-center align-lg-content-center align-md-content-center">
    
                                            <v-responsive :aspect-ratio="16/9" lg-height="1080px" max-height="1080px">
    
                                                <v-card flat class="mt-4 mx-auto elevation-0">
    
                                                    <v-carousel hide-delimiters cycle continuous>
    
                                                        <v-carousel-item v-for="(item,i) in CarouselAddReturnURL3" :key="i" :src="item" reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
    
                                                    </v-carousel>
    
                                                </v-card>
    
                                            </v-responsive>
    
                                        </v-flex>
    
                                    </v-layout>
    
                                </v-card>
    
                                <!--Section 3 Video Card-->
    
                                <v-card xs12 sm12 md12 lg12 class="mt-5 d-flex align-content-center justify-center flex-wrap align-items-center align-lg-content-center align-md-content-center" title="Content Type Video" v-if="VideoAddReturn3">
    
                                    <youtube :video-id="VideoId3" player-width="auto" player-height="auto"></youtube>
    
                                </v-card>
    
                                <!--Section 3 Button Card-->
    
                                <v-card xs12 sm12 md12 lg12 class="mt-5" title="Content Type Button" v-if="ButtonAddReturn3">
    
                                    <v-card-title>
    
                                        <v-btn href='{ ButtonURLAdd3 }' target="_blank" @click="ExternalLink">{{ ButtonAddReturn3 }}</v-btn>
    
                                    </v-card-title>
    
                                </v-card>
    
                                <!--Section 3 Link Card -->
    
                                <v-card xs12 sm12 md12 lg12 class="mt-5" title="Content Type Link" v-if="LinkURLAddReturn3">
    
                                    <v-card-title>
    
                                        <a href="{ LinkURLAddReturn3 }" target="_blank" @click="ExternalLink">{{ LinkURLAddReturn3 }}</a>
    
                                    </v-card-title>
    
                                </v-card>
    
                            </v-card>
    
                            <!--Content Section 4 dispaly only 1 content type template-->
    
                            <v-card flat class="mt-5 d-flex align-content-center justify-center flex-wrap" title="Content Section 4:">
    
                                <!--Section 4 Image Card -->
    
                                <v-card flat class="mt-5" title="Content Type Image" v-if="ImageAddReturnURL4">
    
                                    <!--URL4-->
    
                                    <v-img :src="ImageAddReturnURL4" class="white--text"> </v-img>
    
                                </v-card>
    
                                <!--Section 4 Text Card-->
    
                                <v-card xs12 sm6 md4 lg4 flat class="mt-5" title="Content Type Text" v-if="TextAddReturn4">
    
                                    <div class="tiptap-vuetify-editor__content" v-html="TextContent4" />
    
                                </v-card>
    
                                <!--Section 4 Carousel  Card-->
    
                                <v-card xs12 sm12 md12 lg12 flat class="mt-5" title="Content Type Carousel" v-if="CarouselActive4 === true">
    
                                    <v-layout row wrap>
    
                                        <v-flex xs12 sm12 md12 class="d-flex align-content-center justify-center flex-wrap align-items-center align-lg-content-center align-md-content-center">
    
                                            <v-responsive :aspect-ratio="16/9" lg-height="1080px" max-height="1080px">
    
                                                <v-card flat class="mt-4 mx-auto elevation-0">
    
                                                    <v-carousel hide-delimiters cycle continuous>
    
                                                        <v-carousel-item v-for="(item,i) in CarouselAddReturnURL4" :key="i" :src="item" reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
    
                                                    </v-carousel>
    
                                                </v-card>
    
                                            </v-responsive>
    
                                        </v-flex>
    
                                    </v-layout>
    
                                </v-card>
                                <!--Section 4 Button Card-->
                                <v-card xs12 sm12 md12 lg12 class="mt-5" title="Content Type Button" v-if="ButtonAddReturn4">
                                    <v-card-title>
                                        <v-btn href='{ ButtonURLAdd4 }' target="_blank" @click="ExternalLink">{{ ButtonAddReturn4 }}</v-btn>
                                    </v-card-title>
                                </v-card>
                                <!--Section 4 Link Card -->
                                <v-card xs12 sm12 md12 lg12 class="mt-5" title="Content Type Link" v-if="LinkURLAddReturn4">
                                    <v-card-title>
    
                                        <a href="{ LinkURLAddReturn4 }" target="_blank" @click="ExternalLink">{{ LinkURLAddReturn4 }}</a>
    
                                    </v-card-title>
    
                                </v-card>
    
                            </v-card>
    
                            <!--Content Section 5 dispaly only 1 content type template-->
    
                            <v-card flat class="mt-5 d-flex align-content-center justify-center flex-wrap" title="Content Section 5:">
    
    
    
                                <!--Section 5 Image Card -->
    
                                <v-card flat class="mt-5" title="Content Type Image" v-if="ImageAddReturnURL5">
    
                                    <v-img :src="ImageAddReturnURL5" class="white--text"> </v-img>
    
                                </v-card>
    
                                <!--Section 5 Text Card-->
    
                                <v-card xs12 sm6 md4 lg4 flat class="mt-5" title="Content Type Text" v-if="TextAddReturn5">
    
                                    <div class="tiptap-vuetify-editor__content" v-html="TextContent5" />
    
                                </v-card>
    
                                <!--Section 5 Carousel  Card-->
    
                                <v-card xs12 sm12 md12 lg12 flat class="mt-5" title="Content Type Carousel" v-if="CarouselActive5 === true">
    
                                    <v-layout row wrap>
    
                                        <v-flex xs12 sm12 md12 class="d-flex align-content-center justify-center flex-wrap align-items-center align-lg-content-center align-md-content-center">
    
                                            <v-responsive :aspect-ratio="16/9" lg-height="1080px" max-height="1080px">
    
                                                <v-card flat class="mt-4 mx-auto elevation-0">
    
                                                    <v-carousel hide-delimiters cycle continuous>
    
                                                        <v-carousel-item v-for="(item,i) in CarouselAddReturnURL5" :key="i" :src="item" reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
    
                                                    </v-carousel>
    
                                                </v-card>
    
                                            </v-responsive>
    
                                        </v-flex>
    
                                    </v-layout>
    
                                </v-card>
    
                                <!--Section 5 Video Card-->
    
                                <v-card xs12 sm12 md12 lg12 class="mt-5 d-flex align-content-center justify-center flex-wrap align-items-center align-lg-content-center align-md-content-center" title="Content Type Video" v-if="VideoAddReturn5">
    
                                    <youtube :video-id="VideoId5" player-width="auto" player-height="auto"></youtube>
    
                                </v-card>
    
                                <!--Section 5 Button Card-->
    
                                <v-card xs12 sm12 md12 lg12 class="mt-5" title="Content Type Button" v-if="ButtonAddReturn5">
    
                                    <v-card-title>
    
                                        <v-btn href='{ ButtonURLAdd5 }' target="_blank" @click="ExternalLink">{{ ButtonAddReturn5 }}</v-btn>
    
                                    </v-card-title>
    
                                </v-card>
    
                                <!--Section 5 Link Card -->
    
                                <v-card xs12 sm12 md12 lg12 class="mt-5" title="Content Type Link" v-if="LinkURLAddReturn5">
    
                                    <v-card-title>
    
                                        <a href="{ LinkURLAddReturn5 }" target="_blank" @click="ExternalLink">{{ LinkURLAddReturn5 }}</a>
    
                                    </v-card-title>
    
                                </v-card>
    
                            </v-card>
    
                            <!--Contacts section-->
    
                            <v-layout row wrap>
    
                                <v-flex xs12 sm12 md12 class="d-flex align-content-end justify-end flex-wrap align-items-end align-lg-content-end align-md-content-end">
    
                                    <template>
    
                    <v-speed-dial
    
                    v-if="FacebookAccount||LineAccount||InstagramAccount"
    
                    v-model="fab"
    
                    bottom
    
                    right
    
                    small
    
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
                        v-if="LineAccount"
                          fab
                          dark
                          small
                          color="green"
                          :href="LineAccount"
                          target="_blank"
                          @click="ExternalLink"
                          >Line
                        </v-btn>
                        <v-btn
                        v-if="FacebookAccount"
                          fab
                          dark
                          small
                          color="blue"
                          :href="FacebookAccount"
                          target="_blank"
                          @click="ExternalLink"
                        >
                          <v-icon>mdi-facebook</v-icon>
                          </v-btn>
            <v-btn
            v-if="InstagramAccount"
        fab
        dark
        small
        color="pink"
        :href="InstagramAccount"
        target="_blank"
        @click="ExternalLink"
      >Ins
        <!--<v-icon>mdi-linkedin</v-icon>-->
      </v-btn>
    </v-speed-dial>
</template>
</v-flex>
        </v-layout>
      </v-card>
       </v-flex>
       </v-layout>
       </v-content>
</v-container>
   </v-app>
</template>
<script>
import firebase from 'firebase/app'
import "firebase/storage"
import db from '../main.js'
export default {
    name: 'view-page',
    data() {
        return {
            id: null,
            PageID: null,
            PageTitle: null,
            PageSubTitle: null,
            TitleImage: null,
            TitleImageURL: null,
            ImageAddReturnURL1: null,
            TextAddReturn1: null,
            TextContent1: null,
            //CarouselAddReturn: null,
            CarouselActive1: null,
            CarouselAddReturnURL1: null,
            VideoAddReturn1: null,
            VideoId1: null,
            //***VideoId URL need****
            ButtonURLAdd1: null,
            ButtonAddReturn1: null,
            LinkURLAddReturn1: null,
            ImageAddReturnURL2: null,
            ImageAddReturn2: null,
            TextAddReturn2: null,
            TextContent2: null,
            //CarouselAddReturn2: null,
            CarouselActive2: null,
            CarouselAddReturnURL2: null,
            VideoAddReturn2: null,
            //***VideoId URL need****
            ButtonURLAdd2: null,
            ButtonAddReturn2: null,
            LinkURLAddReturn2: null,
            ImageAddReturnURL3: null,
            ImageAddReturn3: null,
            TextAddReturn3: null,
            TextContent3: null,
            //CarouselAddReturn3:null,
            CarouselActive3: null,
            CarouselAddReturnURL3: null,
            VideoAddReturn3: null,
            //***VideoId URL need****
            ButtonURLAdd3: null,
            ButtonAddReturn3: null,
            LinkURLAddReturn3: null,
            ImageAddReturnURL4: null,
            ImageAddReturn4: null,
            TextAddReturn4: null,
            TextContent4: null,
            //CarouselAddReturn4: null,
            CarouselActive4: null,
            CarouselAddReturnURL4: null,
            VideoAddReturn4: null,
            //***VideoId URL need****
            ButtonURLAdd4: null,
            ButtonAddReturn4: null,
            LinkURLAddReturn4: null,
            ImageAddReturnURL5: null,
            ImageAddReturn5: null,
            TextAddReturn5: null,
            TextContent5: null,
            CarouselActive5: null,
            CarouselAddReturnURL5: null,
            //CarouselAddReturn5: null,
            VideoAddReturn5: null,
            //***VideoId URL need****
            ButtonURLAdd5: null,
            ButtonAddReturn5: null,
            LinkURLAddReturn5: null,
            //Add Contact data
            fab: null,
            FacebookAccount: null,
            LineAccount: null,
            InstagramAccount: null,
        }
    },
    beforeRouteEnter(to, from, next) {
        db.collection('yourpages').where('PageID', '==', to.params.PageID).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    next(vm => {
                        vm.id = doc.id
                        vm.PageID = doc.data().PageID
                        vm.PageTitle = doc.data().PageTitle
                        //vm.TitleImage = doc.data().TitleImage
                        vm.TitleImageURL = doc.data().TitleImageURL
                        vm.PageSubTitle = doc.data().PageSubTitle
                        vm.CarouselActive1 = doc.data().CarouselActive1
                        vm.CarouselAddReturnURL1 = doc.data().CarouselAddReturnURL1
                        vm.ImageAddReturnURL = doc.data().ImageAddReturnURL
                        vm.TextAddReturn1 = doc.data().TextAddReturn1
                        vm.TextContent1 = doc.data().TextContent1
                        //vm.CarouselAddReturn = doc.data().CarouselAddReturn
                        vm.VideoAddReturn1 = doc.data().VideoAddReturn1
                        vm.VideoId1 = doc.data().VideoId1

                        vm.ButtonURLAdd1 = doc.data().ButtonURLAdd1
                        vm.ButtonAddReturn1 = doc.data().ButtonAddReturn1
                        vm.LinkURLAddReturn1 = doc.data().LinkURLAddReturn1

                        vm.ImageAddReturnURL2 = doc.data().ImageAddReturnURL2
                        vm.TextAddReturn2 = doc.data().TextAddReturn2
                        vm.TextContent2 = doc.data().TextContent2
                        vm.CarouselActive2 = doc.data().CarouselActive2
                        vm.CarouselAddReturnURL2 = doc.data().CarouselAddReturnURL2
                        //vm.CarouselAddReturn2 = doc.data().CarouselAddReturn2
                        vm.VideoAddReturn2 = doc.data().VideoAddReturn2
                        //***VideoId URL need****
                        vm.ButtonURLAdd2 = doc.data().ButtonURLAdd2
                        vm.ButtonAddReturn2 = doc.data().ButtonAddReturn2
                        vm.LinkURLAddReturn2 = doc.data().LinkURLAddReturn2

                        vm.ImageAddReturnURL3 = doc.data().ImageAddReturnURL3
                        vm.TextAddReturn3 = doc.data().TextAddReturn3
                        vm.TextContent3 = doc.data().TextContent3
                        vm.CarouselActive3 = doc.data().CarouselActive3
                        vm.CarouselAddReturnURL3 = doc.data().CarouselAddReturnURL3
                        //vm.CarouselAddReturn3 = doc.data().CarouselAddReturn3
                        vm.VideoAddReturn3 = doc.data().VideoAddReturn3
                        //***VideoId URL need****
                        vm.ButtonAddReturn3 = doc.data().ButtonAddReturn3
                        vm.LinkURLAddReturn3 = doc.data().LinkURLAddReturn3

                        vm.ImageAddReturnURL4 = doc.data().ImageAddReturnURL4
                        vm.TextAddReturn4 = doc.data().TextAddReturn4
                        vm.TextContent4 = doc.data().TextContent4
                        vm.CarouselActive4 = doc.data().CarouselActive4
                        vm.CarouselAddReturnURL4 = doc.data().CarouselAddReturnURL4
                        vm.CarouselAddReturn4 = doc.data().CarouselAddReturn4
                        vm.VideoAddReturn4 = doc.data().VideoAddReturn4
                        //***VideoId URL need****
                        vm.ButtonURLAdd4 = doc.data().ButtonURLAdd4
                        vm.ButtonAddReturn4 = doc.data().ButtonAddReturn4
                        vm.LinkURLAddReturn4 = doc.data().LinkURLAddReturn4

                        vm.ImageAddReturnURL5 = doc.data().ImageAddReturnURL5
                        vm.TextAddReturn5 = doc.data().TextAddReturn5
                        vm.TextContent5 = doc.data().TextContent5
                        vm.CarouselActive5 = doc.data().CarouselActive5
                        vm.CarouselAddReturnURL5 = doc.data().CarouselAddReturnURL5
                        //vm.CarouselAddReturn5 = doc.data().CarouselAddReturn5
                        vm.VideoAddReturn5 = doc.data().VideoAddReturn5
                        //***VideoId URL need****
                        vm.ButtonURLAdd5 = doc.data().ButtonURLAdd5
                        vm.ButtonAddReturn5 = doc.data().ButtonAddReturn5
                        vm.LinkURLAddReturn5 = doc.data().LinkURLAddReturn5

                        vm.fab = doc.data().fab
                        vm.FacebookAccount = doc.data().FacebookAccount
                        vm.LineAccount = doc.data().LineAccount
                        vm.InstagramAccount = doc.data().InstagramAccount
                    })
                })
            })
    },
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        fethData() {
            db.collection('yourpages').where('PageID', '==',
                    this.$route.params.PageID).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        this.id = doc.id
                        this.PageID = doc.data().PageID
                        this.PageTitle = doc.data().PageTitle
                        this.PageSubTitle = doc.data().PageSubTitle
                        //this.TitleImage = doc.data().TitleImage
                        this.TitleImageURL = doc.data().TitleImageURL
                        console.log(this.TitleImageURL)
                        this.ImageAddReturnURL1 = doc.data().ImageAddReturnURL1
                        this.TextAddReturn1 = doc.data().TextAddReturn1
                        this.TextContent1 = doc.data().TextContent1
                        this.CarouselActive1 = doc.data().CarouselActive1
                        this.CarouselAddReturnURL1 = doc.data().CarouselAddReturnURL1
                        console.log(doc.data().CarouselAddReturnURL1)
                        console.log(this.CarouselAddReturnURL1)
                        this.VideoAddReturn1 = doc.data().VideoAddReturn1
                        this.VideoId1 = doc.data().VideoId1
                        this.ButtonURLAdd1 = doc.data().ButtonURLAdd1
                        this.ButtonAddReturn1 = doc.data().ButtonAddReturn1
                        this.LinkURLAddReturn1 = doc.data().LinkURLAddReturn1

                        this.TextAddReturn2 = doc.data().TextAddReturn2
                        this.TextContent2 = doc.data().TextContent2
                        this.ImageAddReturnURL2 = doc.data().ImageAddReturnURL2
                        this.CarouselAddReturnURL2 = doc.data().CarouselAddReturnURL2
                        this.CarouselActive2 = doc.data().CarouselActive2

                        this.VideoAddReturn2 = doc.data().VideoAddReturn2
                        //***VideoId URL need****
                        this.ButtonURLAdd2 = doc.data().ButtonURLAdd2
                        this.ButtonAddReturn2 = doc.data().ButtonAddReturn2
                        this.LinkURLAddReturn2 = doc.data().LinkURLAddReturn2

                        this.TextAddReturn3 = doc.data().TextAddReturn3
                        this.TextContent3 = doc.data().TextContent3
                        this.ImageAddReturnURL3 = doc.data().ImageAddReturnURL3
                        this.CarouselActive3 = doc.data().CarouselActive3
                        this.CarouselAddReturnURL3 = doc.data().CarouselAddReturnURL3

                        this.VideoAddReturn3 = doc.data().VideoAddReturn3
                        //***VideoId URL need****
                        this.ButtonURLAdd3 = doc.data().ButtonURLAdd3
                        this.ButtonAddReturn3 = doc.data().ButtonAddReturn3
                        this.LinkURLAddReturn3 = doc.data().LinkURLAddReturn3

                        this.TextAddReturn4 = doc.data().TextAddReturn4
                        this.TextContent4 = doc.data().TextContent4
                        this.ImageAddReturnURL4 = doc.data().ImageAddReturnURL4
                        this.CarouselActive4 = doc.data().CarouselActive4
                        this.CarouselAddReturnURL4 = doc.data().CarouselAddReturnURL4
                        this.CarouselAddReturn4 = doc.data().CarouselAddReturn4
                        this.VideoAddReturn4 = doc.data().VideoAddReturn4
                        //***VideoId URL need****
                        this.ButtonURLAdd4 = doc.data().ButtonURLAdd4
                        this.ButtonAddReturn4 = doc.data().ButtonAddReturn4
                        this.LinkURLAddReturn4 = doc.data().LinkURLAddReturn4

                        this.TextAddReturn5 = doc.data().TextAddReturn5
                        this.TextContent5 = doc.data().TextContent5
                        this.ImageAddReturnURL5 = doc.data().ImageAddReturnURL5
                        this.CarouselActive5 = doc.data().CarouselActive5
                        this.CarouselAddReturnURL5 = doc.data().CarouselAddReturnURL5
                        this.CarouselAddReturn5 = doc.data().CarouselAddReturn5
                        this.VideoAddReturn5 = doc.data().VideoAddReturn5
                        //***VideoId URL need****
                        this.fab = doc.data().fab
                        this.ButtonURLAdd5 = doc.data().ButtonURLAdd5
                        this.ButtonAddReturn5 = doc.data().ButtonAddReturn5
                        this.LinkURLAddReturn5 = doc.data().LinkURLAddReturn5
                        //Add Contact data
                    })
                })
        },
        DeleteImage() {
            if (this.TitleImageURL !== null && this.TitleImageURL.slice(0, 22) == 'https://firebasestorage') {
                let DeleteTitle = firebase.storage().refFromURL(this.TitleImageURL)
                DeleteTitle.delete()
            }
            if (this.ImageAddReturnURL1 !== null) {
                let DeleteImage1 = firebase.storage().refFromURL(this.ImageAddReturnURL1)
                DeleteImage1.delete()
            }
            if (this.ImageAddReturnURL2 !== null) {
                let DeleteImage2 = firebase.storage().refFromURL(this.ImageAddReturnURL2)
                DeleteImage2.delete()
            }
            if (this.ImageAddReturnURL3 !== null) {
                let DeleteImage3 = firebase.storage().refFromURL(this.ImageAddReturnURL3)
                DeleteImage3.delete()
            }
            if (this.ImageAddReturnURL4 !== null) {
                let DeleteImage4 = firebase.storage().refFromURL(this.ImageAddReturnURL4)
                DeleteImage4.delete()
            }
            if (this.ImageAddReturnURL5 !== null) {
                let DeleteImage5 = firebase.storage().refFromURL(this.ImageAddReturnURL5)
                DeleteImage5.delete()
            }
            if (this.CarouselAddReturnURL1.length !== null) {
                let i = 0
                for (i = 0; i < this.CarouselAddReturnURL1.length; i++) {
                    let DeleteCarousel1 = firebase.storage().refFromURL(this.CarouselAddReturnURL1[i])
                    DeleteCarousel1.delete()
                        .then(() => {
                            console.log('DeleteTitle Deleted')
                        })
                        .catch((error) => {
                            console.error(`file delete error occured: ${error}`)
                        })
                }
            }
            if (this.CarouselAddReturnURL2.length !== null) {
                let i = 0
                for (i = 0; i < this.CarouselAddReturnURL2.length; i++) {
                    let DeleteCarousel2 = firebase.storage().refFromURL(this.CarouselAddReturnURL2[i])
                    DeleteCarousel2.delete()
                        .then(() => {
                            console.log('DeleteTitle Deleted')
                        })
                        .catch((error) => {
                            console.error(`file delete error occured: ${error}`)
                        })
                }
            }
            if (this.CarouselAddReturnURL3.length !== null) {
                let i = 0
                for (i = 0; i < this.CarouselAddReturnURL3.length; i++) {
                    let DeleteCarousel3 = firebase.storage().refFromURL(this.CarouselAddReturnURL3[i])
                    DeleteCarousel3.delete()
                        .then(() => {
                            console.log('DeleteTitle Deleted')
                        })
                        .catch((error) => {
                            console.error(`file delete error occured: ${error}`)
                        })
                }
            }
            if (this.CarouselAddReturnURL4.length !== null) {
                let i = 0
                for (i = 0; i < this.CarouselAddReturnURL4.length; i++) {
                    let DeleteCarousel4 = firebase.storage().refFromURL(this.CarouselAddReturnURL4[i])
                    DeleteCarousel4.delete()
                        .then(() => {
                            console.log('DeleteTitle Deleted')
                        })
                        .catch((error) => {
                            console.error(`file delete error occured: ${error}`)
                        })
                }
            }
            if (this.CarouselAddReturnURL5.length !== null) {
                let i = 0
                for (i = 0; i < this.CarouselAddReturnURL5.length; i++) {
                    let DeleteCarousel5 = firebase.storage().refFromURL(this.CarouselAddReturnURL5[i])
                    DeleteCarousel5.delete()
                        .then(() => {
                            console.log('DeleteTitle Deleted')
                        })
                        .catch((error) => {
                            console.error(`file delete error occured: ${error}`)
                        })
                }
            }


            /*.then(() => {
             console.log('DeleteTitle Deleted')
            })
            .catch((error) => {
              console.error(`file delete error occured: ${error}`)
            })*/
        },
        DeletePage() {
            if (confirm('Are you sure?')) {
                var p1 = new Promise((resolve, reject) => {
                    this.DeleteImage()
                    resolve('Success!');

                    // or
                    reject(new Error("Error!"));
                });

                p1.then(value => {
                    db.collection('yourpages').where('PageID', '==',
                            this.$route.params.PageID).get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(doc => {
                                doc.ref.delete()
                                this.$router.push('/library')
                            })
                        })
                    console.log(value); // Success!
                }, reason => {
                    console.error(reason); // Error!
                });
            }
        },
        //open extrnallink method
        ExternalLink() {
            let routeData = this.LinkURLAddReturn1 || this.ButtonURLAdd1 || this.FacebookAccount || this.InstagramAccount || this.LineAccount || this.LinkURLAddReturn2 || this.ButtonURLAdd2 ||
                this.LinkURLAddReturn3 || this.ButtonURLAdd3 || this.LinkURLAddReturn4 || this.ButtonURLAdd4 || this.LinkURLAddReturn5 || this.ButtonURLAdd5
            window.location.href = routeData
        },
    }
}
</script>
    