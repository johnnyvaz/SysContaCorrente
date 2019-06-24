  <template>
    <main-layout>
        <b-form>
            <input id="contato-id" type="hidden" v-model="contato.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="contato-name">
                        <b-form-input id="contato-name" type="text"
                        v-model="contato.nome" required
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
                <b-col md="6" sm="12">
                    <b-form-group label="Telefone:" label-for="contato-telefone">
                        <b-form-input id="contato-telefone" type="text"
                        v-model="contato.telefone" required
                        placeholder="Informe o Telefone do Contato..." />
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
        
        <h1>Lista de Contatos</h1>
        <b-table striped hover :items="contatos" :fields="fields"></b-table>
        <template slot="actions" slot-scope="data">
            <b-button variant="warning" @click="loadContato(data.item)" class="mr-2">
                <i class="fa fa-pencil"></i>
            </b-button>
            <b-button variant="danger" @click="loadContato(data.item, 'remove')">
                <i class="fa fa-trash"></i>
            </b-button>
        </template>
    </main-layout>
</template>

<script>
    import axios from 'axios';
    // import {baseURL} from '../../global'
    import MainLayout from '../layouts/Main.vue'
    const baseURL = 'http://localhost:3001'
    export default {
        name: 'Contato', 
        components: { MainLayout },
        data: function() {
            return {
                mode: 'save',
                contatos: [],
                contato:{},
                errors: [],
                fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'nome', label: 'Nome', sortable: true },
                { key: 'email', label: 'E-mail', sortable: true },
                { key: 'telefone', label: 'Telefone', sortable: true },
                { key: 'actions', label: 'Ações' }
                ]
            }
        }, 
        methods: { 
            loadContatos(){
                const url = `${baseURL}/contato`
                axios.get(url).then(res => {
                    this.contatos = res.data
                })
                .catch(e => {
                    this.errors.push(e)
                })
            },
            
            loadContato(contato, mode = 'save'){
                axios.get(`${baseURL}/contato/${contato.id}`)
                .then(res => this.contato = res.data)
            },
            
            save() {
                const method = this.contato.id ? 'put' : 'post'
                const id = this.contato.id ? `/${this.contato.id}` : ''
                axios[method](`${baseURL}/contato${id}`, this.contato)
                .then(() => {
                    // this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
            },
            reset() {
                this.mode = 'save'
                this.contato = {}
                this.loadContato()
            },
            remove() {
                const id = this.contato.id
                axios.delete(`${baseURL}/contato/${id}`)
                .then(() => {
                    // this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
            }
        },
            watch: {
                page() {
                    this.loadContatos()
                }
            },
            mounted() {
                this.loadContatos()
            }
        }    
</script>