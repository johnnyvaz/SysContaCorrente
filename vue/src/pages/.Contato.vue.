<template>
  <main-layout>
    <p>Contato</p>
    <br>
  
 <p>Hora Certa: {{ horaCerta() }}</p>
 <p>momento: {{ momento() }}</p>
  

  </main-layout>
</template>

<script>
  import MainLayout from '../layouts/Main.vue'
  import moment from 'moment/moment.js'

  export default {
    components: {
      MainLayout
    },
    methods: {
      horaCerta() {
                    return new Date().toLocaleString()
                },
      momento(){
                  return moment().format("DD/MM/YYYY")
                }
            }
        }
    </script>