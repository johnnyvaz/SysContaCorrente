<template>
  <main-layout>
    <p>Cartão de Crédito</p>


    <form @submit.prevent="salvar">

          <label>ID</label>
          <input type="text" placeholder="ID" v-model="cartao.id" >
          <label>Bandeira</label>
          <input type="text" placeholder="" v-model="cartao.bandeira" >
          <label>Numero Cartão</label>
          <input type="number" placeholder="" v-model="cartao.numeroCartao" >
          <label>Validade</label>
          <input type="number" placeholder="" v-model="cartao.validade" >
          <label>Código de Segurança</label>
          <input type="number" placeholder="" v-model="cartao.codigoSeguranca" >
          <label>Cód Conta Corrente</label>
          <input type="text" placeholder="" v-model="cartao.id_cc" >

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Bandeira</th>
            <th>Numero Cartão</th>
            <th>Validade</th>
            <th>Código Segurança</th>
            <th>Cód Conta</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="cartao of cartao" :key="cartao.id">

            <td>{{ cartao.id }}</td>
            <td>{{ cartao.bandeira }}</td>
            <td>{{ cartao.numeroCartao }}</td>
            <td>{{ cartao.validade }}</td>
            <td>{{ cartao.codigoSeguranca }}</td>
            <td>{{ cartao.id_cc }}</td>
            <td>
              <button @click="editar(cartao)" class="waves-effect btn-small blue darken-1"><i class="material-icons">Editar</i></button>
              <button @click="remover(cartao)" class="waves-effect btn-small red darken-1"><i class="material-icons">Remover</i></button>
            </td>
          </tr>
        </tbody>
      </table>

</main-layout>
</template>

<script>
    import MainLayout from '../layouts/Main.vue'
    import VLink from '../components/VLink.vue'
    import cartao from '../services/cartao'

  export default {
    components: { MainLayout },
    name: 'app',
    data(){
       return {
      cartao:{
        id: '',
        bandeira: '',
        numeroCartao: '',
        validade: '',
        codigoSeguranca: '',
        id_cc: ''
      },
      errors: []
    }
    },
    mounted(){
    this.listar()
  },
  methods:{
    
    listar(){
      cartao.listar().then(resposta => {
        this.cartao = resposta.data
      }).catch(e => {
        console.log(e)
      })
    },

    salvar(){

      if(!this.cartao.id){

        cartao.salvar(this.cartao).then(resposta => {
          this.cartao = {}
          alert('Cadastrado com sucesso!')
          this.listar()
          this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }else{

        cartao.atualizar(this.cartao).then(resposta => {
          this.cartao = {}
          this.errors = {}
          alert('Atualizado com sucesso!')
          this.listar()
        }).catch(e => {
          this.errors = e.response.data.errors
        })
      }
    },
    editar(cartao){
      this.cartao = cartao
    },
    remover(cartao){
      if(confirm('Deseja excluir o cartao?')){

        cartao.apagar(cartao).then(resposta => {
          this.listar()
          //this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
        })
      }
    }
  }
  }
</script>
<style>

</style>