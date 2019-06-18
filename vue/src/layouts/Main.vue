<template>
  <div class="container">
  <Header />
    <slot></slot>
    <Footer />
  </div>
</template>

<script>
  import VLink from '../components/VLink.vue'
  import Footer from '../components/template/Footer.vue'
  import Header from '../components/template/Header.vue'
  // import Conta from '../pages/Conta.vue'

  export default {
    components: { VLink, Footer, Header }
  }
</script>

<style scoped>
  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 15px 30px;
    background: #b1f5f1;
  }

  h1 {
    text-align: center;
    
  }
</style>
 