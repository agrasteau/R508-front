import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import { VApp, VAppBar, VToolbarTitle, VSpacer, VBtn, VIcon, VMain, VContainer } from 'vuetify/components'; // Importation des composants
import 'vuetify/styles';

const vuetify = createVuetify({
  components: {
    VBtn,
    VApp,
    VAppBar,
    VToolbarTitle,
    VSpacer,
    VIcon,
    VMain,
    VContainer
  },
});

const app = createApp(App);
app.use(vuetify);
app.mount('#app');
