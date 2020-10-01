<template>
  <v-app>
    <Header/>
    <v-fab-transition appear>
      <router-view></router-view>
    </v-fab-transition>
    <Footer/>
  </v-app>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';

export default {
  name: 'App',

  components: {
    Header,
    Footer
  },

};
</script>

<style>
@media (min-width:1904px) {
    .container {
        max-width: 1185px !important;
    }
}
</style>
