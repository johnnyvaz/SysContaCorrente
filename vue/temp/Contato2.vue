<template>
    <main-layout>
        <div class="contato">
            
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOME</th>
                        <th>TELEFONE</th>
                        <th>email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="contato of contato" :key="contato.id">
                        <td>{{ contato.id }}</td>
                        <td>{{ contato.nome }}</td>
                        <td>{{ contato.telefone }}</td>
                        <td>{{ contato.email }}</td>
                        <td>
                            <button @click="editar(gerente)" class="waves-effect btn-small blue darken-1"><i class="material-icons">Editar</i></button>
                            <button @click="remover(gerente)" class="waves-effect btn-small red darken-1"><i class="material-icons">Delete</i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <b-form>
                <input id="contato-id" type="hidden" v-model="contato.id" />
                <b-row>
                    <b-col md="6" sm="12">
                        <b-form-group label="Nome:" label-for="contato-name">
                            <b-form-input id="contato-name" type="text"
                            v-model="contato.name" required
                            placeholder="Informe o Nome do Contato..." />
                        </b-form-group>
                    </b-col>
                    <b-col md="6" sm="12">
                        <b-form-group label="E-mail:" label-for="contato-email">
                            <b-form-input id="coontato-email" type="text"
                            v-model="contato.email" required
                            placeholder="Informe o E-mail do Contato..." />
                        </b-form-group>
                    </b-col>
                </b-row>
                
                <b-row>
                    <b-col xs="12">
                        <b-button variant="primary" @click="save">Salvar</b-button>
                        <b-button variant="danger" @click="remove">Excluir</b-button>
                        <b-button class="ml-2" @click="reset">Cancelar</b-button>
                    </b-col>
                </b-row>
            </b-form>
            <hr>
            
            <div>
                <b-table striped hover :items="contatos" :fields="fields"></b-table>
                
            </div>
            
            
            
        </div>
    </main-layout>
</template>

<script>
    // import { baseURL } from '../../global'
    import MainLayout from '../layouts/Main.vue'
    import VLink from '../components/VLink.vue'
    const baseURL = 'http://localhost:3001'
    import axios from 'axios'
    
    export default {
        components: { MainLayout },
        name: 'Contato',
        data: function() {
            // return {
                //         items: [
                //           { id: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
                //           { id: 21, first_name: 'Larsen', last_name: 'Shaw' },
                //           { id: 89, first_name: 'Geneva', last_name: 'Wilson' },
                //           { id: 38, first_name: 'Jami', last_name: 'Carney' }
                //         ]
                //       }
                
                return {
                    fields: [
                    { key: 'id', label: 'Código', sortable: true },
                    { key: 'nome', label: 'Nome', sortable: true },
                    { key: 'email', label: 'E-mail', sortable: true },
                    // { key: 'actions', label: 'Ações' }
                    ]
                }
            },
            methods: {
                loadContatos() {
                    const url = `${baseURL}/contato`
                    axios.get(url).then(res => {
                        this.contato = res.data
                    })
                },
                reset() {
                    this.contato = {}
                    this.loadContatos()
                },
                save() {
                    const id = this.contato.id ? `/${this.contato.id}` : ''
                    axios[method](`${baseURL}/contato${id}`, this.user)
                    .then(() => {
                        // this.$toasted.global.defaultSuccess()
                        this.reset()
                    })
                    .catch(showError)
                },
                remove() {
                    const id = this.user.id
                    axios.delete(`${baseURL}/contato/${id}`)
                    .then(() => {
                        // this.$toasted.global.defaultSuccess()
                        this.reset()
                    })
                    .catch(showError)
                },
                loadContato(contato) {
                    this.contato = {contato }
                }
            },
            mounted() {
                this.loadContatos()
            }
        }
    </script>
    
    <style>
        
    </style>
    