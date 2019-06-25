<template>
  <div>
    <Header />
    <div class="container">
      <slot></slot>
    </div>
    <Footer />
  </div>
</template>

<script>
  import VLink from '../components/VLink.vue'
  import Footer from '../components/template/Footer.vue'
  import Header from '../components/template/Header.vue'
  import '../config/global'

  export default {
    components: { VLink, Footer, Header }
  }
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    font-family: 'Oswald', sans-serif;
    background-color: lightgray;
  }
  
  
</style>
