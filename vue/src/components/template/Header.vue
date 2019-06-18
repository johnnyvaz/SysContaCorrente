<template>
    <header class="header">
       
        <h1 class="title">
            <v-link href="/">Home</v-link>
        </h1>
          <ul>
      <li>
        <v-link href="/">Home</v-link>
        <v-link href="/gerente">Gerente</v-link>
        <v-link href="/contacorrente">Conta Corrente</v-link>
        <v-link href="/cartao">Cartão de Crédito</v-link>
        <v-link href="/contato">Contato</v-link>
      </li>
    </ul>
    </header>
</template>

<script>
  import VLink from '../../components/VLink.vue'
  import Header from '../../components/template/Header.vue'
export default {
    components: { VLink, Header },
    name: 'Header',

    props: {
        title: String,
    }
}
</script>

<style>
    .header {
        grid-area: header;
        background: linear-gradient(to right, #1e469a, #49a7c1);

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title {
        font-size: 1.2rem;
        color: #fff;
        font-weight: 100;
        flex-grow: 1;
        text-align: center;
    }

    .title a {
        color: #FFF;
        text-decoration: none;
    }

    .title a:hover {
        color: #FFF;
        text-decoration: none;
    }

    header.header > a.toggle {
        width: 60px;
        height: 100%;
        color: #fff;
        justify-self: flex-start;
        text-decoration: none;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    header.header > a.toggle:hover {
        color: #fff;
        background-color: rgba(0, 0, 0, 0.2);
    }
</style>
