<template>
  <v-app>
    <v-main>
    <Header />
    <router-view />
    </v-main>
   </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue'; 
import ListItem from './components/ListItem.vue'; 
import Login from './components/Login.vue';


export default defineComponent({
  name: 'App',
  components: {
    Header,
    ListItem
  },
   data() {
    return {
     
      tableHeaders: [
        { title: 'Code', key: 'code', align: 'start' },
        { title: 'Nom', key: 'name' },
        { title: 'Crédits', key: 'credits' },
        { title: 'Actions', key: 'actions', sortable: false }
      ],
      
      tableData: [
        {'code': 'R5.A.08', 'name': 'Qualité de développement', 'credits': 5},
        {'code': 'INFO101', 'name': 'Introduction aux BDD', 'credits': 3},
        {'code': 'TEST', 'name': 'TEST LESSON', 'credits': 5},
        {'code': 'R1.01', 'name': 'Initiation au développement', 'credits': 9},
        {'code': 'R1.02', 'name': "Développement d'interfaces web", 'credits': 7},
        {'code': 'R1.03', 'name': "Introduction à l'architecture des ordinateurs", 'credits': 3},
        {'code': 'R1.04', 'name': "Introduction aux systèmes d'exploitation et à leur fonctionnement", 'credits': 4},
        {'code': 'R1.05', 'name': 'Introduction aux bases de données et SQL', 'credits': 5},
        {'code': 'R1.06', 'name': 'Mathématiques discrètes', 'credits': 4},
        {'code': 'R1.07', 'name': 'Outils mathématiques fondamentaux', 'credits': 8},
        {'code': 'R1.08', 'name': 'Gestion de projet et des organisations', 'credits': 7},
        {'code': 'R1.09', 'name': 'Économie durable et numérique', 'credits': 8},
        {'code': 'R1.10', 'name': 'Anglais technique', 'credits': 5},
        {'code': 'R1.11', 'name': 'Bases de la communication', 'credits': 2},
        {'code': 'R1.12', 'name': 'Projet professionnel et personnel', 'credits': 2},
        {'code': 'R2.01', 'name': 'Développement orienté objets', 'credits': 2},
        {'code': 'R2.02', 'name': "Développement d'applications avec IHM", 'credits': 10},
        {'code': 'R2.03', 'name': 'Qualité de développement', 'credits': 7},
        {'code': 'R2.04', 'name': 'Communication et fonctionnement bas niveau', 'credits': 7},
        {'code': 'R2.05', 'name': 'Introduction aux services réseaux', 'credits': 9},
        {'code': 'R2.06', 'name': "Exploitation d'une base de données", 'credits': 7},
        {'code': 'R2.07', 'name': 'Graphes', 'credits': 7},
        {'code': 'R2.08', 'name': 'Outils numériques pour les statistiques descriptives', 'credits': 4},
        {'code': 'R2.09', 'name': 'Méthodes numériques', 'credits': 7},
        {'code': 'R2.10', 'name': 'Gestion de projet & des organisations', 'credits': 2},
        {'code': 'R2.11', 'name': 'Droit des contrats et du numérique', 'credits': 8},
        {'code': 'R2.12', 'name': "Anglais d'entreprise", 'credits': 9},
        {'code': 'R2.13', 'name': 'Communication avec le milieu professionnel', 'credits': 10},
        {'code': 'R2.14', 'name': "Projet professionnel et personnel : métiers de l'informatique", 'credits': 9},
        {'code': 'R3.01', 'name': 'Développement web', 'credits': 10},
        {'code': 'R3.02', 'name': 'Développement efficace', 'credits': 6},
        {'code': 'R3.03', 'name': 'Analyse', 'credits': 5},
        {'code': 'R3.04', 'name': 'Qualité de développement', 'credits': 9},
        {'code': 'R3.05', 'name': 'Prog. Système', 'credits': 2},
        {'code': 'R3.06', 'name': 'Archi. Réseaux', 'credits': 10},
        {'code': 'R3.07', 'name': 'SQL et programmation', 'credits': 8},
        {'code': 'R3.08', 'name': 'Probabilités', 'credits': 10},
        {'code': 'R3.09', 'name': 'Cryptographie', 'credits': 10},
        {'code': 'R3.10', 'name': 'Management SI', 'credits': 8},
        {'code': 'R3.11', 'name': 'Droit contrats et num.', 'credits': 2},
        {'code': 'R3.12', 'name': 'Anglais', 'credits': 4},
        {'code': 'R3.13', 'name': 'Comm. pro.', 'credits': 9},
        {'code': 'R3.14', 'name': 'PPP', 'credits': 2},
        {'code': 'R4.01', 'name': 'Architecture logicielle', 'credits': 7},
        {'code': 'R4.02', 'name': 'Qualité de développement', 'credits': 5},
        {'code': 'R4.03', 'name': 'Qualité & non-relationnel', 'credits': 5},
        {'code': 'R4.04', 'name': "Méthiodes d'optimisation", 'credits': 6},
        {'code': 'R4.05', 'name': 'Anglais', 'credits': 6},
        {'code': 'R4.06', 'name': 'Comm. Interne', 'credits': 9},
        {'code': 'R4.07', 'name': 'PPP', 'credits': 5},
        {'code': 'R4.A.08', 'name': 'Virtualisation', 'credits': 4},
        {'code': 'R4.A.09', 'name': 'Management avancé SI', 'credits': 2},
        {'code': 'R4.A.10', 'name': 'Complément web', 'credits': 5},
        {'code': 'R4.A.11', 'name': 'Développement mobile', 'credits': 4},
        {'code': 'R4.A.12', 'name': 'Automates', 'credits': 2},
        {'code': 'R5.01', 'name': 'Initiation au management', 'credits': 6},
        {'code': 'R5.02', 'name': 'PPP', 'credits': 7},
        {'code': 'R5.03', 'name': 'Communication', 'credits': 4},
        {'code': 'R5.A.04', 'name': 'Qualité algorithmique', 'credits': 3},
        {'code': 'R5.A.05', 'name': 'Programmation avancée', 'credits': 3},
        {'code': 'R5.A.06', 'name': 'Programmation multimédia', 'credits': 7},
        {'code': 'R5.A.07', 'name': 'Automatisation', 'credits': 3},
        {'code': 'R5.A.09', 'name': 'Virtualisation avancée', 'credits': 7},
        {'code': 'R5.A.10', 'name': 'Nouvelles BD', 'credits': 8},
        {'code': 'R5.A.11', 'name': 'Aide à la décision', 'credits': 10},
        {'code': 'R5.A.12', 'name': 'Modélisations mathématiques', 'credits': 4},
        {'code': 'R5.A.13', 'name': 'Economie durable et numérique', 'credits': 7},
        {'code': 'R5.A.14', 'name': 'Anglais', 'credits': 10},
        {'code': 'R6.01', 'name': 'Entrepreneuriat', 'credits': 6},
        {'code': 'R6.02', 'name': 'Droit du numérique et PI', 'credits': 9},
        {'code': 'R6.03', 'name': 'Comm. : information', 'credits': 9},
        {'code': 'R6.04', 'name': 'PPP', 'credits': 10},
        {'code': 'R6.A.05', 'name': 'Développement avancé', 'credits': 8},
        {'code': 'R6.A.06', 'name': 'Maintenance applicative', 'credits': 8}
      ]
    };
    ListItem,
    Login
  },
  
  methods: {
    handleActionClick() {
      alert('Action button clicked! - Fonctionnalité à implémenter');
    },
    onAddCourse() {
      alert('Ajout d\'un cours - Fonctionnalité à implémenter');
    }
  }
});
</script>
