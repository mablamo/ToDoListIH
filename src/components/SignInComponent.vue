<template>
  <div>
    <form>
      <div class="row mb-3">
        <label for="signInEmail" class="col-sm-2 col-form-label"
          >Email
          <div class="col-sm-10">
            <input
              type="email"
              class="form-control"
              id="signInEmail"
              v-model="signInEmail"
            /></div
        ></label>
      </div>
      <div class="row mb-3">
        <label for="password" class="col-sm-2 col-form-label"
          >Password
          <div class="col-sm-10">
            <input
              type="password"
              id="signInPassword"
              class="form-control"
              v-model="signInPassword"
            /></div
        ></label>
      </div>
      <button class="btn btn-primary" @click="handleSignIn" type="button">
        Sign in
      </button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';

export default {
  name: 'SignInComponent',
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
    ...mapActions(userStore, ['signIn']),
    handleSignIn() {
      this.signIn(this.signInEmail, this.signInPassword);
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
