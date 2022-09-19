<template>
  <div class="position-absolute top-50 start-50 translate-middle auth">
    <h1>Welcome to</h1>
    <img src='../assets/logo.png' alt="Logo_Dori">
    <h2>don't forget anything!</h2>

    <div
      class="btn-group"
      role="group"
      aria-label="Basic radio toggle button group"
    >
      <label class="btn btn-outline-primary" for="btnradio1">
        I have an account
        <input
          type="radio"
          class="btn-check"
          name="btnradio"
          id="btnradio1"
          checked
          @click="logedUser"
      /></label>
      <label class="btn btn-outline-primary" for="btnradio2"
        >Create new account
        <input type="radio" class="btn-check" name="btnradio" id="btnradio2" @click="unlogedUser"/>
      </label>
    </div>

    <sign-in-component class="auth-component" v-show="loged"></sign-in-component>
    <sign-up-component class="auth-component" v-show="!loged"></sign-up-component>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';
import SignInComponent from '../components/SignInComponent.vue';
import SignUpComponent from '../components/SignUpComponent.vue';

export default {
  name: 'AuthView',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      signInEmail: '',
      signInPassword: '',
      loged: true,
    };
  },
  components: {
    SignInComponent,
    SignUpComponent,
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
    unlogedUser() {
      this.loged = false;
    },
    logedUser() {
      this.loged = true;
    },
  },
  watch: {
    user() {
      if (this.user) {
        this.$router.push({ path: '/' });
      }
    },
  },
};
</script>

<style>
img {
  width: 50%;
}

.auth {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-component {
  margin: 15px 0;
}

h2 {
  margin-bottom: 50px;
}

</style>
