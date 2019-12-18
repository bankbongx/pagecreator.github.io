<template>
<v-speed-dial
      v-model="fab"
      bottom
      left
      direction="right"
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="blue darken-2"
          dark
          fab
          x-small
        >
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-menu</v-icon>
        </v-btn>
      </template>
      <!--ImageUploader-->
        <v-btn
        fab
        dark
        x-small
        color="green"
        @click.stop="ImageDialog = true"
        >
          <v-icon>mdi-image</v-icon>
        </v-btn>
          <v-dialog v-model="ImageDialog" max-width="600" hide-overlay transition="dialog-bottom-transition">
            <v-card>
              <v-toolbar dark color="primary">
                <v-btn icon dark @click="ImageDialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Add Image</v-toolbar-title>
                <div class="flex-grow-1"></div>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                <v-btn dark text @click="ImageDialog = false">Save</v-btn>
                </v-toolbar-items>
                </v-toolbar>
                <v-card class="mx-auto elevation-0" blue-grey lighten-3>
                  <v-col cols="12" sm="12" md="12">
                    <!--Picture input component vue-picture-input-->
                    <picture-input 
                    ref="pictureInput" 
                    @change="onChange"  
                    accept="image/jpeg,image/png" 
                    max-height="400px"
                    size="10" 
                    :removable="true"
                    :zIndex="0"
                    button-class="btn" 
                    :customStrings="{
                      upload: 'Drag an image or <br>click here to select a file',
                      drag: 'Drag an image or <br>click here to select a file',
                      tap: 'Tap here to select an image <br>from your folder',
                      change: 'Change Image', // Text only
                      remove: 'Remove' // Text only
                      }">
                      </picture-input>
                    </v-col>
                </v-card>
            </v-card>
          </v-dialog>

      <!--Text Editor-->
        <v-btn
        fab
        dark
        x-small
        color="indigo"
        @click.stop="TextDialog = true"
        >
          <v-icon>mdi-format-color-text</v-icon>
          </v-btn>
            <v-dialog v-model="TextDialog" hide-overlay transition="dialog-bottom-transition">
              <v-card height="400">
                <v-toolbar dark color="primary">
                  <v-btn icon dark @click="TextDialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-toolbar-title>Add Text</v-toolbar-title>
                  <div class="flex-grow-1"></div>
                  <v-spacer>
                  </v-spacer>
                  <v-toolbar-items>
                    <v-btn dark text @click="TextDialog = false">Save</v-btn>
                  </v-toolbar-items>
                </v-toolbar>
                <v-form
                ref="form"
                v-model="form"
                class="pa-4 pt-6"
                >
                <template>
                  <v-toolbar dense>
                    <template>
                      <v-btn-toggle
                      v-model="toggle_multiple"
                      multiple
                      >
                      <v-btn :value="1" text>
                        <v-icon>mdi-format-bold</v-icon>
                        </v-btn>
                        <v-btn :value="2" text>
                          <v-icon>mdi-format-italic</v-icon>
                          </v-btn>
                          <v-btn :value="3" text>
                            <v-icon>mdi-format-underline</v-icon>
                            </v-btn>
                            <v-btn :value="4" text>
                              <v-icon>mdi-format-color-fill</v-icon>
                              </v-btn>
                      </v-btn-toggle>

                      <v-btn-toggle v-model="toggle_exclusive">
                                <v-btn :value="1" text>
                                  <v-icon>mdi-format-align-left</v-icon>
                                  </v-btn>
                                  <v-btn :value="2" text>
                                    <v-icon>mdi-format-align-center</v-icon>
                                    </v-btn>
                                    <v-btn :value="3" text>
                                      <v-icon>mdi-format-align-right</v-icon>
                                      </v-btn>
                                      <v-btn :value="4" text>
                                        <v-icon>mdi-format-align-justify</v-icon>
                                      </v-btn>
                      </v-btn-toggle>
                    </template>
                  </v-toolbar>
                </template>
                <v-textarea
                v-model="bio"
                clearable
                auto-grow
                filled
                color="primary"
                solo
                flat
                rows="5"
                placeholder="Add text here "
                >
                </v-textarea>
              </v-form>
            </v-card>
          </v-dialog>



            <!--CarouselUploader-->
                    <v-btn
        fab
        dark
        x-small
        color="teal"
        @click.stop="CarouselDialog = true"
      >
        <v-icon>mdi-image-filter</v-icon>
      </v-btn>
      <v-dialog v-model="CarouselDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="CarouselDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <div class="flex-grow-1"></div>
                <v-spacer>
                </v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="CarouselDialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card class="mx-auto elevation-0" blue-grey lighten-3>
              <v-col cols="12" sm="12" md="3">
        <v-list three-line subheader>
          <v-subheader>Image Slider Limit 4 Images</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Image 1</v-list-item-title>
              <picture-input 
      ref="pictureInput" 
      @change="onChange"  
      accept="image/jpeg,image/png" 
      max-height="400px"
      size="10" 
      :removable="true"
      :zIndex="0"
      button-class="btn" 
      :customStrings="{
        upload: 'Drag an image or <br>click here to select a file',
        drag: 'Drag an image or <br>click here to select a file',
        tap: 'Tap here to select an image <br>from your folder',
        change: 'Change Image', // Text only
        remove: 'Remove' // Text only
      }">
    </picture-input>
            </v-list-item-content>
          </v-list-item>
        </v-list>
              </v-col>
                         <v-col cols="12" sm="12" md="3">
        <v-list three-line subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Image 2</v-list-item-title>
              <picture-input 
      ref="pictureInput" 
      @change="onChange"  
      accept="image/jpeg,image/png" 
      max-height="400px"
      size="10" 
      :removable="true"
      :zIndex="0"
      button-class="btn" 
      :customStrings="{
        upload: 'Drag an image or <br>click here to select a file',
        drag: 'Drag an image or <br>click here to select a file',
        tap: 'Tap here to select an image <br>from your folder',
        change: 'Change Image', // Text only
        remove: 'Remove' // Text only
      }">
    </picture-input>
            </v-list-item-content>
          </v-list-item>
        </v-list>
              </v-col>
                         <v-col cols="12" sm="12" md="3">
        <v-list three-line subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Image 3</v-list-item-title>
              <picture-input 
      ref="pictureInput" 
      @change="onChange"  
      accept="image/jpeg,image/png" 
      max-height="400px"
      size="10" 
      :removable="true"
      :zIndex="0"
      button-class="btn" 
      :customStrings="{
        upload: 'Drag an image or <br>click here to select a file',
        drag: 'Drag an image or <br>click here to select a file',
        tap: 'Tap here to select an image <br>from your folder',
        change: 'Change Image', // Text only
        remove: 'Remove' // Text only
      }">
    </picture-input>
            </v-list-item-content>
          </v-list-item>
        </v-list>
              </v-col>
              <v-col cols="12" sm="12" md="3">
        <v-list three-line subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Image 4</v-list-item-title>
              <picture-input 
      ref="pictureInput" 
      @change="onChange"  
      accept="image/jpeg,image/png" 
      max-height="400px"
      size="10" 
      :removable="true"
      :zIndex="0"
      button-class="btn" 
      :customStrings="{
        upload: 'Drag an image or <br>click here to select a file',
        drag: 'Drag an image or <br>click here to select a file',
        tap: 'Tap here to select an image <br>from your folder',
        change: 'Change Image', // Text only
        remove: 'Remove' // Text only
      }">
    </picture-input>
            </v-list-item-content>
          </v-list-item>
        </v-list>
              </v-col>
        </v-card>
      </v-card>
    </v-dialog>
    <!--Video Add-->
          <v-btn
        fab
        dark
        x-small
        color="red"
        @click.stop="VideoDialog = true"
      >
        <v-icon>mdi-youtube</v-icon>
      </v-btn>
      <v-dialog v-model="VideoDialog" max-width="400" hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="VideoDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Add Embed Video</v-toolbar-title>
          <div class="flex-grow-1"></div>
                <v-spacer>
                </v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="VideoDialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card class="mx-auto elevation-0" blue-grey lighten-3>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                clearable 
          label="Add Video Link "
          placeholder="www.youtube.com/watch?v=<id>"></v-text-field>
              </v-col>
        </v-card>
      </v-card>
            </v-dialog>
      <!--Button Add-->
            <v-btn
        fab
        dark
        x-small
        color="light-blue"
        @click.stop="ButtonDialog = true"
      >
        <v-icon>mdi-link</v-icon>
      </v-btn>
            <v-dialog v-model="ButtonDialog" max-width="400" hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="ButtonDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Add Button</v-toolbar-title>
          <div class="flex-grow-1"></div>
                <v-spacer>
                </v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="ButtonDialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card class="mx-auto elevation-0" blue-grey lighten-3>
              <v-col cols="12" sm="12" md="12">
                <v-text-field 
          clearable
          placeholder="Button Name"></v-text-field>
           <v-text-field
           clearable 
          placeholder="URL"></v-text-field>
              </v-col>
        </v-card>
      </v-card>
            </v-dialog>
            <!--Link Add-->
            <v-btn
        fab
        dark
        x-small
        color="pink"
        @click.stop="LinkDialog = true"
      >
        <v-icon>mdi-link-variant</v-icon>
      </v-btn>
      <v-dialog v-model="LinkDialog" max-width="400" hide-overlay transition="dialog-bottom-transition">
      <v-card>
              <v-toolbar dark color="primary">
                   <v-btn icon dark @click="LinkDialog = false">
                   <v-icon>mdi-close</v-icon>
                   </v-btn>
                  <v-toolbar-title>Add Link</v-toolbar-title>
                  <div class="flex-grow-1"></div>
                <v-spacer>
                </v-spacer>
                  <v-toolbar-items>
                    <v-btn dark text @click="AddLinkSubmit">Save</v-btn>
                  </v-toolbar-items>
              </v-toolbar>
              <v-card class="mx-auto elevation-0" blue-grey lighten-3>
                  <v-col cols="12" sm="12" md="12">
                    <v-form>
                <v-text-field
                clearable
                v-model="LinkURLAdd"
          label="Edit link"
          placeholder="www.example.com"></v-text-field>
          </v-form>
                  </v-col>
              </v-card>
      </v-card>
      </v-dialog>
          <!-- Output from the popover interaction -->
      </v-speed-dial>
</template>
  
<script>



 export default {
      name: 'ContentFloatingMenu',
       components: {

  },
    data ()  {
      
      return {
            LinkURLAdd: '',
            LinkURLAddReturn: '',
           toggle_exclusive: 2,
        toggle_multiple: [1, 2, 3],
        form: false,
        fab: false,
        ImageDialog: false,
        TextDialog: false,
        CarouselDialog: false,
        VideoDialog: false,
        ButtonDialog: false,
        LinkDialog: false,
        bio: '',
    } 
     }, 
             
      methods: {
    onChange () {
      console.log('New picture selected!')
      if (this.$refs.pictureInput.image) {
        console.log('Picture loaded.')
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
    },
    AddLinkSubmit () {
      {
      console.log(this.LinkURLAdd)
      this.LinkURLAddReturn = this.LinkURLAdd
      this.LinkDialog = false 
      this.fab = false }
      
    }
  }
  }
 </script>