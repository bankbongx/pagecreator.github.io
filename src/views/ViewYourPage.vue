<template>
    <!--------------------------------------------------------------------------------------->
    
    <!--Preview Dialog page-->
    
    
    
    <v-layout row wrap>
    
        <v-flex xs12 sm12 md12 class="d-flex align-content-center justify-center flex-wrap">
    
            <template>
    
            <!--toolbar-->
    
            <v-toolbar dark color="primary">
    
              <v-btn icon dark @click="PreviewDialog = false">
    
                <v-icon>mdi-close</v-icon>
    
              </v-btn>
    
              <v-toolbar-title>Preview</v-toolbar-title>
    
              <div class="flex-grow-1"></div>
    
                    <v-spacer>
    
                    </v-spacer>
    
                    <!--Save Event-->
    
              <v-toolbar-items>
    
                <v-btn dark text @click="PreviewDialog = false">Save</v-btn>
    
              </v-toolbar-items>
    
            </v-toolbar>
    
    
    
    
    
            <!--Title Section Card-->
    
            <v-responsive :aspect-ratio="16/9" lg-height="1080px" max-height="1080px">
    
              <v-card class="mx-auto elevation-0" blue-grey lighten-3 lg-height="1080px">
    
                  <!--<v-col cols="12" sm="12" md="12">-->
    
               <v-card flat title="Returned values:" v-if="PreviewTitleImage">
    
         <v-img :src="PreviewTitleImage" class="white--text"> 
    
           <v-col cols="12" sm="12" md="12">
    
    
    
             <!--Title-->
    
                            <v-card-title class="justify-center align-self-center"><h1>{{ TitleSection }}</h1>
    
                            </v-card-title>
    
    
    
                            <!--Subtitle-->
    
                            <v-card-title class="justify-center align-self-center">{{ SubtitleSection }}
    
                            </v-card-title>
    
                          </v-col></v-img>
    
        </v-card>
    
           <!--</v-col>-->
    
           </v-card>
    
           </v-responsive>
    
        <!--Content Section 1 dispaly only 1 content type template-->
    
    
    
        <!--Section 1 Content Type Image template-->
    
        <v-card flat class="mt-5 d-flex align-content-center justify-center flex-wrap" title="Content Section 1:">
    
    
    
    <!--Section 1 Image Card -->
    
                   <v-card flat class="mt-5" title="Content Type Image" v-if="ImageAddReturn" >
    
         <v-img :src="ImageAddReturn" class="white--text"> </v-img>
    
        </v-card>
    
        
    
        <!--Section 1 Text Card-->
    
        <v-card xs12 sm6 md4 lg4 flat class="mt-5" title="Content Type Text" v-if="TextAddReturn">
    
         <div class="tiptap-vuetify-editor__content" v-html="content"/>
    
        </v-card>
    
    
    
    
    
        <!--Section 1 Carousel  Card-->
    
    
    
         <v-card xs12 sm12 md12 lg12 flat  class="mt-5" title="Content Type Carousel" v-if="CarouselAddReturn === true">
    
           <v-layout row wrap>
    
                <v-flex xs12 sm12 md12 class="d-flex align-content-center justify-center flex-wrap align-items-center align-lg-content-center align-md-content-center">
    
                  <v-responsive :aspect-ratio="16/9" lg-height="1080px" max-height="1080px">
    
                    <v-card flat class="mt-4 mx-auto elevation-0">
    
             <v-carousel hide-delimiters cycle continuous>
    
     
    
               <v-carousel-item
    
                       v-if="CarouselAddReturn11 !== null"
    
          reverse-transition="fade-transition"
    
          transition="fade-transition"
    
        >
    
        <v-img :src="CarouselAddReturn11"></v-img>
    
        </v-carousel-item>
    
        <v-carousel-item
    
         v-if="CarouselAddReturn12 !== null"
    
          reverse-transition="fade-transition"
    
          transition="fade-transition"
    
        >
    
        <v-img :src="CarouselAddReturn12"></v-img>
    
        </v-carousel-item>
    
        <v-carousel-item
    
        v-if="CarouselAddReturn13 !== null"
    
          reverse-transition="fade-transition"
    
          transition="fade-transition"
    
        >
    
        <v-img :src="CarouselAddReturn13"></v-img>
    
        </v-carousel-item>
    
        <v-carousel-item
    
         v-if="CarouselAddReturn14 !== null"
    
          reverse-transition="fade-transition"
    
          transition="fade-transition"
    
        >
    
        <v-img :src="CarouselAddReturn14"></v-img>
    
        </v-carousel-item>
    
    
    
      </v-carousel>
    
        </v-card></v-responsive>
    
                </v-flex> </v-layout></v-card>
    
        
    
        <!--Section 1 Video Card-->
    
    
    
        <v-card xs12 sm12 md12 lg12 class="mt-5 d-flex align-content-center justify-center flex-wrap align-items-center align-lg-content-center align-md-content-center" title="Content Type Video" v-if="VideoAddReturn">
    
          <youtube :video-id="VideoId" player-width="auto" player-height="auto"></youtube>
    
    </v-card>
    
        
    
        <!--Section 1 Button Card-->
    
        
    
         <v-card xs12 sm12 md12 lg12 class="mt-5" title="Content Type Button" v-if="ButtonAddReturn">
    
          <v-card-title>
    
         <v-btn href='{ ButtonURLAdd }' target="_blank" @click="ExternalLink">{{ ButtonAddReturn }}</v-btn>
    
          </v-card-title>
    
        </v-card>
    
        
    
        <!--Section 1 Link Card -->
    
    
    
        <v-card xs12 sm12 md12 lg12 class="mt-5" title="Content Type Link" v-if="LinkURLAddReturn">
    
          <v-card-title>
    
             <a href="{ LinkURLAddReturn }" target="_blank" @click="ExternalLink">{{ LinkURLAddReturn }}</a>
    
          </v-card-title>
    
          </v-card>
    
        </v-card>
    
    
    
    <!--Content Section 2 Display-->
    
        <!--Content Section 2 dispaly only 1 content type template-->
    
    
    
        <!--Section 2 Content Type Image template-->
    
        <v-card flat class="mt-5" title="Content Section 2:">
    
    
    
    <!--Section 2 Image Card -->
    
                   <v-card flat class="mt-5" title="Content Type Image" v-if="ImageAddReturn2" >
    
         <v-img :src="ImageAddReturn2" class="white--text"> </v-img>
    
        </v-card>
    
        
    
        <!--Section 2 Text Card-->
    
        <v-card xs12 sm6 md4 lg4 flat class="mt-5" title="Content Type Text" v-if="TextAddReturn2">
    
         <div class="tiptap-vuetify-editor__content" v-html="content2"/>
    
        </v-card>
    
    
    
    
    
        <!--Section 2 Carousel  Card-->
    
    
    
         <v-card xs12 sm12 md12 lg12 flat class="mt-5" title="Content Type Carousel" v-if="CarouselAddReturn2">
    
           <v-layout row wrap>
    
                <v-flex xs12 sm12 md12 class="d-flex align-content-center justify-center flex-wrap align-items-center align-lg-content-center align-md-content-center">
    
                    <v-card flat class="mt-4 mx-auto elevation-0" >
    
                <v-carousel hide-delimiters cycle continuous>
    
                <v-carousel-item
    
          reverse-transition="fade-transition"
    
          transition="fade-transition"
    
        >
    
        <v-img :src="CarouselAddReturn21"></v-img>
    
        </v-carousel-item>
    
        <v-carousel-item
    
          reverse-transition="fade-transition"
    
          transition="fade-transition"
    
        >
    
        <v-img :src="CarouselAddReturn22"></v-img>
    
        </v-carousel-item>
    
        <v-carousel-item
    
          reverse-transition="fade-transition"
    
          transition="fade-transition"
    
        >
    
        <v-img :src="CarouselAddReturn23"></v-img>
    
        </v-carousel-item>
    
        <v-carousel-item
    
          reverse-transition="fade-transition"
    
          transition="fade-transition"
    
        >
    
        <v-img :src="CarouselAddReturn24"></v-img>
    
        </v-carousel-item>
    
      </v-carousel>
    
        </v-card>
    
                </v-flex> </v-layout></v-card>
    
        
    
        <!--Section 2 Video Card-->
    
    
    
        <v-card xs12 sm12 md12 lg12 class="mt-5" title="Content Type Video" v-if="VideoAddReturn2">
    
          <v-card-title>{{ VideoAddReturn2 }}</v-card-title>
    
          <youtube :video-id="VideoId2" player-width="auto" player-height="auto"></youtube>
    
    </v-card>
    
        
    
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
    
    
    
    <!--Content Section 3 Display-->
    
        <!--Content Section 3 dispaly only 1 content type template-->
    
    
    
        <!--Section 3 Content Type Image template-->
    
        <v-card flat class="mt-5" title="Content Section 3:">
    
    
    
    <!--Section 3 Image Card -->
    
                   <v-card flat class="mt-5" title="Content Type Image" v-if="ImageAddReturn3" >
    
         <v-img :src="ImageAddReturn3" class="white--text"> </v-img>
    
        </v-card>
    
        
    
        <!--Section 3 Text Card-->
    
        <v-card xs12 sm6 md4 lg4 flat class="mt-5" title="Content Type Text" v-if="TextAddReturn3">
    
         <div class="tiptap-vuetify-editor__content" v-html="content3"/>
    
        </v-card>
    
    
    
    
    
        <!--Section 3 Carousel  Card-->
    
    
    
         <v-card xs12 sm12 md12 lg12 flat class="mt-5" title="Content Type Carousel" v-if="CarouselAddReturn3">
    
           <v-layout row wrap>
    
                <v-flex xs12 sm12 md12 class="d-flex align-content-center justify-center flex-wrap align-items-center align-lg-content-center align-md-content-center">
    
                  <v-responsive :aspect-ratio="16/9" lg-height="1080px" max-height="1080px">
    
                    <v-card flat class="mt-4 mx-auto elevation-0">
    
                                <v-carousel hide-delimiters cycle continuous>
    
                <v-carousel-item
    
          reverse-transition="fade-transition"
    
          transition="fade-transition"
    
        >
    
        <v-img :src="CarouselAddReturn31"></v-img>
    
        </v-carousel-item>
    
        <v-carousel-item
    
          reverse-transition="fade-transition"
    
          transition="fade-transition"
    
        >
    
        <v-img :src="CarouselAddReturn32"></v-img>
    
        </v-carousel-item>
    
        <v-carousel-item
    
          reverse-transition="fade-transition"
    
          transition="fade-transition"
    
        >
    
        <v-img :src="CarouselAddReturn33"></v-img>
    
        </v-carousel-item>
    
        <v-carousel-item
    
          reverse-transition="fade-transition"
    
          transition="fade-transition"
    
        >
    
        <v-img :src="CarouselAddReturn34"></v-img>
    
        </v-carousel-item>
    
      </v-carousel>
    
       
    
        </v-card></v-responsive>
    
                </v-flex> </v-layout></v-card>
    
        
    
        <!--Section 3 Video Card-->
    
    
    
        <v-card xs12 sm12 md12 lg12 class="mt-5" title="Content Type Video" v-if="VideoAddReturn3">
    
          <v-card-title>{{ VideoAddReturn3 }}</v-card-title>
    
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
    
    
    
    <!--Content Section 4 Display-->
    
        <!--Content Section 4 dispaly only 1 content type template-->
    
    
    
        <!--Section 4 Content Type Image template-->
    
        <v-card flat class="mt-5" title="Content Section 4:">
    
    
    
    <!--Section 4 Image Card -->
    
                   <v-card flat class="mt-5" title="Content Type Image" v-if="ImageAddReturn4" >
    
         <v-img :src="ImageAddReturn4" class="white--text"> </v-img>
    
        </v-card>
    
        
    
        <!--Section 4 Text Card-->
    
        <v-card xs12 sm6 md4 lg4 flat class="mt-5" title="Content Type Text" v-if="TextAddReturn4">
    
         <div class="tiptap-vuetify-editor__content" v-html="content4"/>
    
        </v-card>
    
    
    
    
    
        <!--Section 4 Carousel  Card-->
    
    
    
         <v-card xs12 sm12 md12 lg12 flat class="mt-5" title="Content Type Carousel" v-if="CarouselAddReturn4">
    
           <v-layout row wrap>
    
                <v-flex xs12 sm12 md12 class="d-flex align-content-center justify-center flex-wrap align-items-center align-lg-content-center align-md-content-center">
    
                  <v-responsive :aspect-ratio="16/9" lg-height="1080px" max-height="1080px">
    
                    <v-card flat class="mt-4 mx-auto elevation-0">
    
                                <v-carousel hide-delimiters cycle continuous>
    
                <v-carousel-item
    
          reverse-transition="fade-transition"
    
          transition="fade-transition"
    
        >
    
        <v-img :src="CarouselAddReturn41"></v-img>
    
        </v-carousel-item>
    
        <v-carousel-item
    
          reverse-transition="fade-transition"
    
          transition="fade-transition"
    
        >
    
        <v-img :src="CarouselAddReturn42"></v-img>
    
        </v-carousel-item>
    
        <v-carousel-item
    
          reverse-transition="fade-transition"
    
          transition="fade-transition"
    
        >
    
        <v-img :src="CarouselAddReturn43"></v-img>
    
        </v-carousel-item>
    
        <v-carousel-item
    
          reverse-transition="fade-transition"
    
          transition="fade-transition"
    
        >
    
        <v-img :src="CarouselAddReturn44"></v-img>
    
        </v-carousel-item>
    
      </v-carousel>
    
        </v-card></v-responsive>
    
                </v-flex> </v-layout></v-card>
    
        
    
        <!--Section 4 Video Card-->
    
    
    
        <v-card xs12 sm12 md12 lg12 class="mt-5" title="Content Type Video" v-if="VideoAddReturn4">
    
          <v-card-title>{{ VideoAddReturn4 }}</v-card-title>
    
          <youtube :video-id="VideoId4" player-width="auto" player-height="auto"></youtube>
    
    </v-card>
    
        
    
        <!--Section 4 Button Card-->
    
        
    
         <v-card xs12 sm12 md12 lg12 class="mt-5" title="Content Type Button" v-if="ButtonAddReturn4">
    
          <v-card-title>
    
         <v-btn href='{ ButtonURLAdd2 }' target="_blank" @click="ExternalLink">{{ ButtonAddReturn4 }}</v-btn>
    
          </v-card-title>
    
        </v-card>
    
        
    
        <!--Section 4 Link Card -->
    
    
    
        <v-card xs12 sm12 md12 lg12 class="mt-5" title="Content Type Link" v-if="LinkURLAddReturn4">
    
          <v-card-title>
    
             <a href="{ LinkURLAddReturn4 }" target="_blank" @click="ExternalLink">{{ LinkURLAddReturn4 }}</a>
    
          </v-card-title>
    
          </v-card>
    
        </v-card>
    
    
    
    <!--Content Section 5 Display-->
    
        <!--Content Section 5 dispaly only 1 content type template-->
    
    
    
        <!--Section 5 Content Type Image template-->
    
        <v-card flat class="mt-5" title="Content Section 5:">
    
    
    
    <!--Section 5 Image Card -->
    
                   <v-card flat class="mt-5" title="Content Type Image" v-if="ImageAddReturn5" >
    
         <v-img :src="ImageAddReturn5" class="white--text"> </v-img>
    
        </v-card>
    
        
    
        <!--Section 5 Text Card-->
    
        <v-card xs12 sm6 md4 lg4 flat class="mt-5" title="Content Type Text" v-if="TextAddReturn5">
    
         <div class="tiptap-vuetify-editor__content" v-html="content5"/>
    
        </v-card>
    
    
    
    
    
        <!--Section 5 Carousel  Card-->
    
    
    
         <v-card xs12 sm12 md12 lg12 flat class="mt-5" title="Content Type Carousel" v-if="CarouselAddReturn5">
    
           <v-layout row wrap>
    
                <v-flex xs12 sm12 md12 class="d-flex align-content-center justify-center flex-wrap align-items-center align-lg-content-center align-md-content-center">
    
                  <v-responsive :aspect-ratio="16/9" lg-height="1080px" max-height="1080px">
    
                    <v-card flat class="mt-4 mx-auto elevation-0">
    
                       <v-carousel hide-delimiters cycle continuous> 
    
                <v-carousel-item
    
          reverse-transition="fade-transition"
    
          transition="fade-transition"
    
        >
    
        <v-img :src="CarouselAddReturn51"></v-img>
    
        </v-carousel-item>
    
        <v-carousel-item
    
          reverse-transition="fade-transition"
    
          transition="fade-transition"
    
        >
    
        <v-img :src="CarouselAddReturn52"></v-img>
    
        </v-carousel-item>
    
        <v-carousel-item
    
          reverse-transition="fade-transition"
    
          transition="fade-transition"
    
        >
    
        <v-img :src="CarouselAddReturn53"></v-img>
    
        </v-carousel-item>
    
        <v-carousel-item
    
          reverse-transition="fade-transition"
    
          transition="fade-transition"
    
        >
    
        <v-img :src="CarouselAddReturn54"></v-img>
    
        </v-carousel-item>
    
      </v-carousel>
    
        </v-card></v-responsive>
    
                </v-flex> </v-layout></v-card>  
        <!--Section 5 Video Card-->
        <v-card xs12 sm12 md12 lg4 class="mt-5" title="Content Type Video" v-if="VideoAddReturn5">
    
          <v-card-title>{{ VideoAddReturn5 }}</v-card-title>
    
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
      >
        <v-icon>mdi-linkedin</v-icon>
      </v-btn>
    </v-speed-dial>
</template>
</v-flex>
        </v-layout>
       </template>
       </v-flex>
       </v-layout>

</template>