import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import { VApp, VAppBar, VToolbarTitle, VSpacer, VBtn, VList,VAutocomplete, VIcon, VMenu, VAppBarNavIcon, VMain, VContainer, VListItem, VListItemAction, VListItemMedia, VListItemTitle, VListItemSubtitle, VTextField, VForm, VCard, VCardTitle, VCardText, VDataTable, VRow, VCol, VSelect, VTextarea } from 'vuetify/components'; // Importation des composants
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css'; // Import MDI icons CSS
import router from './router';

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi', // Ensure Vuetify uses mdi icon set
  },
  components: {
    VBtn,
    VAutocomplete,
    VApp,
    VAppBar,
    VToolbarTitle,
    VSpacer,
    VIcon,
    VMain,
    VContainer,
    VList,
    VCard,
    VCardTitle,
    VCardText,
    VListItem,
    VListItemAction,
    VListItemMedia,
    VListItemTitle,
    VListItemSubtitle,
    VTextField,
    VDataTable,
    VRow,
    VCol,
    VForm,
    VMenu,
    VAppBarNavIcon,
    VTextarea,
    VSelect,
  },
});

const app = createApp(App);
app.use(vuetify);
app.use(router);
app.mount('#app');
