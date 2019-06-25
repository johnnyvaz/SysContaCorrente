<template>
    <main-layout>
        <h1>Cartão Crédito</h1>
        <b-form>
            <input id="cart-id" type="hidden" v-model="cart.id" />
            <b-row>
                <b-col md="3" sm="6">
                    <b-form-group label="Bandeira:" label-for="cart-bandeira"> <!-- TODO: alterar tipo -->
                        <b-form-input id="cart-bandeira" type="text"
                        v-model="cart.bandeira" required
                        :readonly="mode === 'remove'"
                        placeholder="" />
                    </b-form-group>
                </b-col>
                <b-col md="3" sm="6">
                    <b-form-group label="Número Cartão:" label-for="numeroCartao">
                        <b-form-input id="numeroCartao" type="number"
                        v-model="cart.numeroCartao" required
                        :readonly="mode === 'remove'"
                        placeholder="" />
                    </b-form-group>
                </b-col>
                <b-col md="3" sm="6">
                    <b-form-group label="Validade:" label-for="validade">
                        <b-form-input id="validade" type="date"
                        v-model="cart.validade" required
                        :readonly="mode === 'remove'"
                        placeholder="" />
                    </b-form-group>
                </b-col>
                <b-col md="3" sm="6">
                    <b-form-group label="Código de Segurança:" label-for="codsegur">
                        <b-form-input id="codseguranca" type="number"
                        v-model="cart.codigoSeguranca" required
                        :readonly="mode === 'remove'"
                        placeholder="" />
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
        
        <h1>Lista de Cartão de Créditos</h1>
        <b-table striped hover :items="carts" :fields="fields">
        <template slot="actions" slot-scope="data">
            <b-button variant="warning" @click="loadCart(data.item)" class="mr-2">Editar
                <i class="fa fa-pencil"></i>
            </b-button>
            <b-button variant="danger" @click="loadCart(data.item, 'remove')">Remover
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
        name: 'CartaoCredito', 
        components: { MainLayout },
        data: function() {
            return {
                mode: 'save',
                carts: [],
                cart:{},
                errors: [],
                fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'bandeira', label: 'Bandeira', sortable: true },
                { key: 'numeroCartao', label: 'Número Cartão', sortable: true },
                { key: 'validade', label: 'Validade', sortable: true },
                { key: 'codigoSeguranca', label: 'Código de Segurança', sortable: true },
                { key: 'actions', label: 'Ações' }
                ]
            }
        }, 
        methods: { 
            loadCarts(){
                const url = `${baseURL}/cart`
                axios.get(url).then(res => {
                    this.carts = res.data
                })
                .catch(e => {
                    this.errors.push(e)
                })
            },
            
            loadCart(cart, mode = 'save'){
                axios.get(`${baseURL}/cart/${cart.id}`)
                .then(res => this.cart = res.data)
            },
            
            save() {
                const method = this.cart.id ? 'put' : 'post'
                const id = this.cart.id ? `/${this.cart.id}` : ''
                axios[method](`${baseURL}/cart${id}`, this.cart)
                .then(() => {
                    this.$toasted.global.defaultSave()
                    this.reset()
                })
                .catch()
            },
            reset() {
                this.mode = 'save'
                this.cart = {}
                this.loadCarts()
            },
            remove() {
                const id = this.cart.id
                axios.delete(`${baseURL}/cart/${id}`)
                .then(() => {
                    this.$toasted.global.defaultDel()
                    this.reset()
                })
                .catch()
            }
        },
            watch: {
                page() {
                    this.loadCarts()
                }
            },
            mounted() {
                this.loadCarts()
            }
        }    
</script>