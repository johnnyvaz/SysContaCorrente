<template>
<main-layout>
  <div id="app">
    <div class="container">
  <Header />
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Gerente</a>
      </div>
    </nav>


      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          campo <b>{{erro.field}}</b> - {{erro.defaultMessage}}
        </li>
      </ul>
<!-- <p>{{ hoje() }}</p> -->
 <div>{{ gerente.nome }}, {{ gerente.dataNasc }}</div>

      <form @submit.prevent="salvar">

          <div class="row">
          <label>ID</label>
          <input type="text" placeholder="ID" v-model="gerente.id" >
          </div>
          <div class="row">
          <label>Nome</label>
          <input type="text" placeholder="Nome" v-model="gerente.nome" >
          </div>
          <div class="row">
          <label>Telefone</label>
          <input type="number" placeholder="Telefone" v-model="gerente.telefone" >
          </div>
          <div class="row">
          <label>dataNasc</label>
          <input type="date" placeholder="Data de Nascimento" v-model="gerente.dataNasc" >
</div>
          <button class="waves-effect waves-light btn-small">Salvar</button>

      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NOME</th>
            <th>TELEFONE</th>
            <th>DATA NASCIMENTO</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="gerente of gerente" :key="gerente.id">
            <td>{{ gerente.id }}</td>
            <td>{{ gerente.nome }}</td>
            <td>{{ gerente.telefone }}</td>
            <td>{{ gerente.dataNasc }}</td>
            <td>
              <button @click="editar(gerente)" class="waves-effect btn-small blue darken-1"><i class="material-icons">Editar</i></button>
              <button @click="remover(gerente)" class="waves-effect btn-small red darken-1"><i class="material-icons">Delete</i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</main-layout>
</template>

<script>
  import VLink from '../VLink.vue'
  import MainLayout from '../../layouts/Main.vue'
  //import gerente from '../services/gerente'

export default {
  components: { MainLayout },
  name: 'app',
  data () {
    return {
      gerente:{
        id: '',
        nome: '',
        telefone: '',
        dataNasc: ''
      },
      errors: []
    }
  },

  mounted(){
    this.listar()
  },

  methods:{
    
    //  hoje(){
    // return 'teste'
    // },
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
          console.log(gerente)
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

    remover(gerenter){

      if(confirm('Deseja excluir o gerente?')){

        gerente.apagar(gerenter).then(resposta => {
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
