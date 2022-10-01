<template>
  <h1>¿A quien quieres proponer una tarea?</h1>
  <form class="was-validated">
    <div class="mb-3">
      <select
        class="form-select"
        required
        aria-label="select example"
        v-model="targetUser"
      >
        <option
          v-for="targetUser in users"
          :key="targetUser.id"
          :value="targetUser"
        >
          {{ targetUser.user_mail }}
        </option>
      </select>
    </div>
    <div class="mb-3">
      <label for="validationTextarea" class="form-label"
        >Tarea
        <textarea
          class="form-control"
          id="validationTextarea"
          placeholder="Introduce la tarea aqui"
          v-model="title"
          required
        ></textarea>
        <div class="invalid-feedback"></div>
      </label>
    </div>

    <div class="form-check mb-3">
      <label class="form-check-label" for="validationFormCheck1"
        >Lista de la compra
        <input
          type="checkbox"
          class="form-check-input"
          id="validationFormCheck1"
          v-model="compra"
      /></label>
    </div>
  </form>
  <div class="mb-3">
    <button class="btn btn-primary" @click="sendTask">Enviar tarea</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';
import sharedTasksStore from '@/store/sharedtask';
import usersStore from '@/store/users';

export default {
  name: 'SharedComponent',
  data() {
    return {
      title: '',
      targetUser: {},
      compra: false,
    };
  },
  computed: {
    ...mapState(userStore, ['user']),
    ...mapState(usersStore, ['users']),
    ...mapState(sharedTasksStore, ['sharedTasks']),
    listaCompra() {
      return this.tasks.filter((elem) => elem.chart);
    },
  },
  methods: {
    ...mapActions(sharedTasksStore, ['addSharedTask']),
    sendTask() {
      this.addSharedTask(
        this.title,
        this.user.id,
        this.compra,
        this.targetUser.user_id,
      );
      this.title = '';
      this.targetUser = {};
      this.compra = false;
      window.alert('Tarea enviada');
    },
  },
};
</script>

<style>
li {
  text-align: center;
}
</style>
