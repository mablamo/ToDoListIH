<template>
  <nav v-if="user">
    <img class="nav-logo" src='./assets/logo_sin.png' alt="Logo_Dori">
    <router-link to="/">Tareas</router-link>
    <router-link to="/compra">Lista de la compra</router-link>
    <router-link to="/shared">Tareas compartidas</router-link>
    <button class="btn" id="signOutButton" @click="handleSignOut">Salir</button>
  </nav>
  <router-view />
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';

export default {
  name: 'App',
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['fetchUser', 'signOut']),
    handleSignOut() {
      this.signOut();
    },
  },
  async created() {
    try {
      await this.fetchUser();
      if (!this.user) {
        this.$router.push({ path: '/auth' });
      } else {
        this.$router.push({ path: '/' });
      }
    } catch (e) {
      console.error(e);
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

button.cancel {
    background-color: rgb(175, 8, 8);
    --bs-btn-hover-bg: #700f06;
}

button {
  margin: 10px;
}

.card {
  padding: 10px;
}

h3 {
  margin: 15px;
}

.nav-logo {
  width: 10%;
  height: 10%;
  margin: 5px;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0;
}

body {
  background-color: rgb(69, 193, 224);
}

.view {
  margin: 15px;
}

#signOutButton {
  border: 2px black;
  background-color: rgb(100, 143, 171);
  box-shadow:  5px 5px rgb(78, 87, 99);
  border-radius: 10%;
  font-weight: 600;
}

nav a.router-link-exact-active {
    color: #5842b9;
    font-size: 30px;
}

</style>
