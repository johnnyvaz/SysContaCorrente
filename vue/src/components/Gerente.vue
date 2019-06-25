  <template>
    <main-layout>
        <h1>Gerente</h1>
        <b-form>
            <input id="gerente-id" type="hidden" v-model="gerente.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="gerente-name">
                        <b-form-input id="gerente-name" type="text"
                        v-model="gerente.nome" required
                        :readonly="mode === 'remove'"
                        placeholder="Informe o Nome do gerente..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Data Nascimento:" label-for="gerente-dataNasc">
                        <b-form-input id="gerente-dataNasc" type="date"
                        v-model="gerente.dataNasc" required
                        :readonly="mode === 'remove'"
                        placeholder="Informe a Data de Nascimento do gerente..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Telefone:" label-for="gerente-telefone">
                        <b-form-input id="gerente-telefone" type="text"
                        v-model="gerente.telefone" required
                        :readonly="mode === 'remove'"
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
        
        <h1>Lista de Gerentes</h1>
        <b-table striped hover :items="gerentes" :fields="fields">
        <template slot="actions" slot-scope="data">
            <b-button variant="warning" @click="loadGerente(data.item)" class="mr-2">Editar
                <i class="fa fa-pencil"></i>
            </b-button>
            <b-button variant="danger" @click="loadGerente(data.item, 'remove')">Remover
                <i class="fa fa-trash"></i>
            </b-button>
        </template>
    </b-table>
    </main-layout>
</template>

<script>
    import axios from 'axios';
    // import {baseURL} from '../../global'
    import MainLayout from '../layouts/Main.vue'
    const baseURL = 'http://localhost:3001'
    export default {
        name: 'Gerente', 
        components: { MainLayout },
        data: function() {
            return {
                mode: 'save',
                gerentes: [],
                gerente:{},
                errors: [],
                fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'nome', label: 'Nome', sortable: true },
                { key: 'dataNasc', label: 'Data Nasc.', sortable: true },
                { key: 'telefone', label: 'Telefone', sortable: true },
                { key: 'actions', label: 'Ações' }
                ]
            }
        }, 
        methods: { 
            loadGerentes(){
                const url = `${baseURL}/ge`
                axios.get(url).then(res => {
                    this.gerentes = res.data
                })
                .catch(e => {
                    this.errors.push(e)
                })
            },
            
            loadGerente(gerente, mode = 'save'){
                axios.get(`${baseURL}/ge/${gerente.id}`)
                .then(res => this.gerente = res.data)
            },
            
            save() {
                const method = this.gerente.id ? 'put' : 'post'
                const id = this.gerente.id ? `/${this.gerente.id}` : ''
                axios[method](`${baseURL}/ge${id}`, this.gerente)
                .then(() => {
                    this.$toasted.global.defaultSave()
                    this.reset()
                })
                .catch()
            },
            reset() {
                this.mode = 'save'
                this.gerente = {}
                this.loadGerentes()
            },
            remove() {
                const id = this.gerente.id
                axios.delete(`${baseURL}/ge/${id}`)
                .then(() => {
                    this.$toasted.global.defaultDel()
                    this.reset()
                })
                .catch()
            }
        },
            watch: {
                page() {
                    this.loadGerentes()
                }
            },
            mounted() {
                this.loadGerentes()
            }
        }    
</script>