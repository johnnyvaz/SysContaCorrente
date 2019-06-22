<template>
<main-layout>
  <div id="app">
    <Header />
    <nav>
      <h1>Conta Corrente</h1>
    </nav>
    <div class="container">
      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          campo <b>{{erro.field}}</b> - {{erro.defaultMessage}}
        </li>
      </ul>
      <form @submit.prevent="salvar">

          <label>ID</label>
          <input type="text" placeholder="ID" v-model="conta.id" >
          <label>Agencia</label>
          <input type="text" placeholder="" v-model="conta.agencia" >
          <label>Numero Cartão</label>
          <input type="number" placeholder="" v-model="conta.digAgencia" >
          <label>Número Conta Corrente</label>
          <input type="number" placeholder="" v-model="conta.numContCorr" >
          <label>Dígito Conta Corrente</label>
          <input type="number" placeholder="" v-model="conta.digContCorr" >
          <label>Nome Agencia</label>
          <input type="text" placeholder="" v-model="conta.nomeAgencia" >

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>AGENCIA</th>
            <th>DIGITO AGENCIA</th>
            <th>NUMERO CONTA CORRENTE</th>
            <th>DIGITO CONTA CORRENTE</th>
            <th>NOME AGENCIA</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="conta of conta" :key="conta.id">

            <td>{{ conta.id }}</td>
            <td>{{ conta.agencia }}</td>
            <td>{{ conta.digAgencia }}</td>
            <td>{{ conta.numContCorr }}</td>
            <td>{{ conta.digContCorr }}</td>
            <td>{{ conta.nomeAgencia }}</td>
            <td>
              <button @click="editar(conta)" class="waves-effect btn-small blue darken-1"><i class="material-icons">Editar</i></button>
              <button @click="remover(conta)" class="waves-effect btn-small red darken-1"><i class="material-icons">Remover</i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</main-layout>

</template>

<script>
  import VLink from '../components/VLink.vue'
  import MainLayout from '../layouts/Main.vue'
   import conta from '../services/conta'

export default {
    name: 'app',
    components: {  MainLayout },
 
  data () {
    return {
      conta:{
        id: '',
        agencia: '',
        digAgencia: '',
        numContCorr: '',
        digContCorr: '',
        nomeAgencia: ''
      },
      errors: []
    }
  },

  mounted(){
    this.listar()
  },

  methods:{
    
    listar(){
      conta.listar().then(resposta => {
        this.conta = resposta.data
      }).catch(e => {
        console.log(e)
      })
    },

    salvar(){

      if(!this.conta.id){

        conta.salvar(this.conta).then(resposta => {
          this.conta = {}
          alert('Cadastrado com sucesso!')
          this.listar()
          this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }else{

        conta.atualizar(this.conta).then(resposta => {
          this.conta = {}
          this.errors = {}
          alert('Atualizado com sucesso!')
          this.listar()
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }
    },

    editar(conta){
      this.conta = conta
    },

    remover(contax){

      if(confirm('Deseja excluir o conta?')){

        conta.apagar(contax).then(resposta => {
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
