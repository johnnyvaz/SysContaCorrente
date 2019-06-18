<template>
<main-layout>
  <div id="app">
  <Header />
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Gerente</a>
      </div>
    </nav>

    <div class="container">

      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          campo <b>{{erro.field}}</b> - {{erro.defaultMessage}}
        </li>
      </ul>


      <form @submit.prevent="salvar">

          <label>ID</label>
          <input type="text" placeholder="ID" v-model="gerente.id" >
          <label>Nome</label>
          <input type="text" placeholder="Nome" v-model="gerente.nome" >
          <label>Telefone</label>
          <input type="number" placeholder="Telefone" v-model="gerente.telefone" >
          <label>dataNasc</label>
          <input type="date" placeholder="Data de Nascimento" v-model="gerente.dataNasc" >


          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>NOME</th>
            <th>TELEFONE</th>
            <th>DATA NASCIMENTO</th>
            <th>ID CONTA CORRENTE</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="gerente of gerente" :key="gerente.id">

            <td>{{ gerente.id }}</td>
            <td>{{ gerente.nome }}</td>
            <td>{{ gerente.telefone }}</td>
            <td>{{ gerente.dataNasc }}</td>
            <td>{{ gerente.id_cc }}</td>
            <td>
              <button @click="editar(gerente)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(gerente)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
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
  import gerente from '../services/gerente'

export default {
  components: { MainLayout },
  name: 'app',
  data () {
    return {
      gerente:{
        id: '',
        nome: '',
        telefone: '',
        dataNasc: '',
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
      gerente.listar().then(resposta => {
        this.gerente = resposta.data
      }).catch(e => {
        console.log(e)
      })
    },

    salvar(){

      if(!this.gerente.id){

        gerente.salvar(this.gerente).then(resposta => {
          this.gerente = {}
          alert('Cadastrado com sucesso!')
          this.listar()
          this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }else{

        gerente.atualizar(this.gerente).then(resposta => {
          this.gerente = {}
          this.errors = {}
          alert('Atualizado com sucesso!')
          this.listar()
        }).catch(e => {
          this.errors = e.response.data.errors
        })

      }
      

    },

    editar(gerente){
      this.gerente = gerente
    },

    remover(gerente){

      if(confirm('Deseja excluir o gerente?')){

        gerente.apagar(gerente).then(resposta => {
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
