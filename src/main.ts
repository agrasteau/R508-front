import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import { VApp, VAppBar, VToolbarTitle, VSpacer, VBtn, VList, VIcon, VMenu, VAppBarNavIcon, VMain, VContainer, VListItem, VListItemAction, VListItemMedia, VListItemTitle, VListItemSubtitle, VTextField, VForm } from 'vuetify/components'; // Importation des composants>> dev
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css'; // Import MDI icons CSS
import router from './router';

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi', // Ensure Vuetify uses mdi icon set
  },
  components: {
    VBtn,
    VApp,
    VAppBar,
    VToolbarTitle,
    VSpacer,
    VIcon,
    VMain,
    VContainer,
    VList,
    VListItem,
    VListItemAction,
    VListItemMedia,
    VListItemTitle,
    VListItemSubtitle,
    VDataTable,
    VTextField,
    VRow,
    VCol,
    VForm,
    VMenu,
    VAppBarNavIcon,
  },
});

const app = createApp(App);
app.use(vuetify);
app.use(router);
app.mount('#app');
