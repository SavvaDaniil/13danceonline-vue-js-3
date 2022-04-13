<template>

  <Header />
  <router-view />
  <Footer />

</template>

<script>
import Header from './components/template/Header.vue'
import Footer from "./components/template/Footer.vue"
import VueCookies from "vue-cookies";

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  beforeMount(){
    const cookieVal = VueCookies.get("user");
    if(cookieVal != null){
      this.$store.commit("signIn");
    } else {
      this.$store.commit("signOut");
    }
  }
}
</script>


<style>
@font-face {
  font-family: 'Proxima Nova';
  src: local('Proxima Nova'),
        url('./assets/font/Proxima Nova.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

body {
  font-family:"Proxima Nova";
}
.row {
	padding:0;
	margin:0;
}
.table-responsive {
  display:block;
}
.preload {
  border-radius: 25px;
}
</style>
