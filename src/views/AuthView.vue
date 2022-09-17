<template>
  <h1>Auth view</h1>
  <form>
    <label for="email"><input type="email" id="email" v-model="email">email</label>
    <label for="password"><input type="password" id="password" v-model="password">password</label>
    <label for="condirmPassword">
      <input type="password" id="confirmPassword" v-model="confirmPassword">confirm password
    </label>
    <button @click="handleSignUp">Sign Up</button>
  </form>
  <form>
    <label for="email"><input type="email" id="signInEmail" v-model="signInEmail">email</label>
    <label for="password"><input type="password" id="signInPassword" v-model="signInPassword">
    password
    </label>
    <button @click="handleSignIn" type="button">Sign In</button>
  </form>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';

export default {
  name: 'AuthView',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      signInEmail: '',
      signInPassword: '',
    };
  },
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['signUp', 'signIn']),
    handleSignUp() {
      if (this.password === this.confirmPassword) {
        this.signUp(this.email, this.password);
      } else {
        console.log('password no coincide');
      }
    },
    handleSignIn() {
      this.signIn(this.signInEmail, this.signInPassword);
      console.log(this.user);
    },
  },
  watch: {
    user() {
      if (this.user) {
        console.log(this.user);
        this.$router.push({ path: '/' });
      }
    },
  },
};
</script>
