<template>
    <main-layout>
        <h1>Conta Corrente</h1>
        <b-form>
            <input id="CC-id" type="hidden" v-model="cc.id" />
            <b-row>
                <b-col md="3" sm="6">
                    <b-form-group label="Agencia:" label-for="CC-Agencia">
                        <b-form-input id="CC-Agencia" type="number"
                        v-model="cc.agencia" required
                        :readonly="mode === 'remove'"
                        placeholder="Informe a Agencia ..." />
                    </b-form-group>
                </b-col>
                <b-col md="3" sm="6">
                    <b-form-group label="Dígito Agência:" label-for="digAgencia">
                        <b-form-input id="digAgencia" type="number"
                        v-model="cc.digAgencia" required
                        :readonly="mode === 'remove'"
                        placeholder="Informe o dígito da Agência..." />
                    </b-form-group>
                </b-col>
                <b-col md="3" sm="6">
                    <b-form-group label="Número Conta Corrente:" label-for="numContCorr">
                        <b-form-input id="numContCorr" type="number"
                        v-model="cc.numContCorr" required
                        :readonly="mode === 'remove'"
                        placeholder="Informe o Número da Conta Corrente..." />
                    </b-form-group>
                </b-col>
                <b-col md="3" sm="6">
                    <b-form-group label="Dígito Conta Corrente:" label-for="digContCorr">
                        <b-form-input id="digContCorr" type="number"
                        v-model="cc.digContCorr" required
                        :readonly="mode === 'remove'"
                        placeholder="Informe o dígito da Conta Corrente..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome Agência:" label-for="NomeAgencia">
                        <b-form-input id="nomeAgencia" type="text"
                        v-model="cc.nomeAgencia" required
                        :readonly="mode === 'remove'"
                        placeholder="Informe o Nome da Agência..." />
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
        
        <h1>Lista de ContaCorrentes</h1>
        <b-table striped hover :items="ccs" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadCC(data.item)" class="mr-2">Editar
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadCC(data.item, 'remove')">Remover
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
        name: 'ContaCorrente', 
        components: { MainLayout },
        data: function() {
            return {
                mode: 'save',
                ccs: [],
                cc:{},
                errors: [],
                fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'nomeAgencia', label: 'Nome Agência', sortable: true },
                { key: 'agencia', label: 'Agência', sortable: true },
                { key: 'digAgencia', label: 'Dígito Agencia', sortable: true },
                { key: 'numContCorr', label: 'Conta Corrente', sortable: true },
                { key: 'digContCorr', label: 'Dígito C.C.', sortable: true },
                { key: 'actions', label: 'Ações' }
                ]
            }
        }, 
        methods: { 
            loadCCs(){
                const url = `${baseURL}/cc`
                axios.get(url).then(res => {
                    this.ccs = res.data
                })
                .catch(e => {
                    this.errors.push(e)
                })
            },
            
            loadCC(cc, mode = 'save'){
                axios.get(`${baseURL}/cc/${cc.id}`)
                .then(res => this.cc = res.data)
            },
            
            save() {
                const method = this.cc.id ? 'put' : 'post'
                const id = this.cc.id ? `/${this.cc.id}` : ''
                axios[method](`${baseURL}/cc${id}`, this.cc)
                .then(() => {
                    this.$toasted.global.defaultSave()
                    this.reset()
                })
                .catch(e)
            },
            reset() {
                this.mode = 'save'
                this.cc = {}
                this.loadCCs()
            },
            remove() {
                const id = this.cc.id
                axios.delete(`${baseURL}/cc/${id}`)
                .then(() => {
                    this.$toasted.global.defaultDel()
                    this.reset()
                })
                .catch()
            },
        },
        watch: {
            page() {
                this.loadCCs()
            }
        },
        mounted() {
            this.loadCCs()
        }
    }    
</script>