import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import { VApp, VAppBar, VToolbarTitle, VSpacer, VBtn, VList, VIcon, VMain, VContainer, VListItem, VDataTable, VListItemAction, VListItemMedia, VListItemTitle, VListItemSubtitle,} from 'vuetify/components'; // Importation des composants
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css'; // Import MDI icons CSS

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


  },
});

const app = createApp(App);
app.use(vuetify);
app.mount('#app');
