import Vue from 'vue';
import Vuetify,{
    VTextField,
    VTooltip,
    VToolbar,
    VCard,
    VIcon,
    VBtn
} from 'vuetify/lib';
Vue.use(Vuetify, {
  components: {
    VTextField,
    VTooltip,
    VToolbar,
    VCard,
    VIcon,
    VBtn,
  }
});


export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
});
