<template>
<v-dialog v-model="PreviewDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="PreviewDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Preview</v-toolbar-title>
          <div class="flex-grow-1"></div>
                <v-spacer>
                </v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="PreviewDialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>

       <!--<v-form>
        <v-card class="mx-auto elevation-0" blue-grey lighten-3>
              <v-col cols="12" sm="12" md="3">
                
        <v-list three-line subheader>
          <v-subheader>Image Slider Limit 4 Images</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Image 1</v-list-item-title>
              <picture-input 
      ref="pictureInput1" 
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
      ref="pictureInput2" 
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
        </v-form>-->
      </v-card>
</v-dialog>
        </template>