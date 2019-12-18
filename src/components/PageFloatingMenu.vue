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
        <v-btn
        fab
        dark
        x-small
        color="info"
        @click="PreviewDialogOpen"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        x-small
        color="green"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        x-small
        color="indigo"
      >
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        x-small
        color="red"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>


    
</template>
<script>
 export default {
      name: 'PageFloatingMenu',
    data: () => ({
        fab: false,
        PreviewDialog: false,
    }),
    methods: {
         PreviewDialogOpen(){
      this.PreviewDialog = true
    },
    }
  }
 </script>