<template>
  <v-app>
<v-navigation-drawer
      v-model="sideNav"
      app
      overflow
      mini-variant
    ><v-list>
      <v-list-item><v-btn to="/profile"><v-icon>mdi-account</v-icon></v-btn></v-list-item>
      <v-list-item><v-btn to="/example"><v-icon>mdi-settings</v-icon></v-btn></v-list-item>
      <v-list-item><v-btn to="/login"><v-icon>mdi-logout</v-icon></v-btn></v-list-item>
    </v-list>
    </v-navigation-drawer>
  <v-app-bar app color="">
    <v-app-bar-nav-icon @click="sideNav= !sideNav"></v-app-bar-nav-icon>
    <v-toolbar-title><v-btn  text to="/">Page Creator</v-btn></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items><v-btn text to="/example">Example</v-btn></v-toolbar-items>
  </v-app-bar>
  <v-footer
      app
    >
      <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <main>
      <router-view></router-view>
    </main>
</v-app>
</template>
<script>
export default {
  name: 'App',
  components: {
  },
  data: () => ({
    //
      sideNav: false
  }),
};
</script>
