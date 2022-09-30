<template>
  <div>
    <form>
      <div class="row mb-3">
        <label for="email" class="col-sm-2 col-form-label"
          >Enter your email
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              id="email"
              v-model="email"
            /></div
        ></label>
      </div>
      <div class="row mb-3">
        <label for="password" class="col-sm-2 col-form-label"
          >Set your password
          <div class="col-sm-10">
            <input
              type="password"
              id="password"
              class="form-control"
              v-model="password"
            /></div
        ></label>
      </div>
      <div class="row mb-3">
        <label for="confirmPassword" class="col-sm-2 col-form-label"
          >Confirm your password
          <div class="col-sm-10">
            <input
              type="password"
              id="confirmPassword"
              class="form-control"
              v-model="confirmPassword"
            /></div
        ></label>
      </div>
      <button class="btn btn-primary" @click="handleSignUp" type="button">
        Sign Up
      </button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';

export default {
  name: 'SignUpComponent',
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
    ...mapActions(userStore, ['signUp']),
    handleSignUp() {
      if (this.password === this.confirmPassword) {
        this.signUp(this.email, this.password);
      } else {
        console.log('password no coincide');
      }
    },
  },
};
</script>

<style>
@media (min-width: 576px) {
.col-sm-2 {
    width: 100%;
}
}
@media (min-width: 576px) {
.col-sm-10 {
    width: 100%;
}
}
</style>
