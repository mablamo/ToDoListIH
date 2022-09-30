<template>
<div class="view">
<!-- <button v-if="!addCompra"
    class="btn btn-primary" @click="openAddCompra">Nueva Compra</button>
    <label for="title">
    <input v-if="addCompra" type="text" id="title"
    v-model="title" placeholder="¿Qué quieres comprar?">
    </label><br>
    <button v-if="addCompra"
    class="btn btn-primary" @click="handleAddCompra">Añadir</button>
    <button v-if="addCompra"
    class="btn btn-primary cancel" @click="cancelAddCompra">Cancelar</button> -->
<shared-component></shared-component>
</div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';
import tasksStore from '@/store/task';
import SharedComponent from '../components/SharedComponent.vue';

export default {
  name: 'SharedView',
  data() {
    return {
      title: '',
      addCompra: false,
    };
  },
  components: {
    SharedComponent,
  },
  computed: {
    ...mapState(userStore, ['user']),
    ...mapState(tasksStore, ['tasks']),
  },
  methods: {
    ...mapActions(tasksStore, ['fetchTasks', 'addTask']),
    handleAddCompra() {
      this.addTask(this.title, this.user.id, true);
      this.title = '';
    },
    openAddCompra() {
      this.addCompra = true;
    },
    cancelAddCompra() {
      this.addCompra = false;
    },
  },
  watch: {
    user() {
      if (this.user === null) {
        this.$router.push({ path: '/auth' });
      }
    },
  },
};
</script>
