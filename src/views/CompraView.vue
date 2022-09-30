<template>
<h3>Lista de la compra</h3>
<button
    class="btn btn-primary" @click="openAddCompra">Nueva Compra</button>
    <button v-if="addCompra"
    class="btn btn-primary" @click="handleAddCompra">Añadir</button>
    <label for="title">
    <input v-if="addCompra" type="text" id="title"
    v-model="title" placeholder="¿Qué quieres comprar?">
    </label>
<compra-component></compra-component>
  <!-- <div class="home">
    <button v-if="!addController && !editController"
    class="btn btn-primary" @click="openAddTask">Nueva Tarea</button>
    <add-task-component v-if="addController" @hideAdd="addController = false"></add-task-component>
    <tasks-component v-if="!addController" @hideAddButton="editController = !editController">
    </tasks-component>
  </div> -->
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';
import tasksStore from '@/store/task';
import CompraComponent from '../components/CompraComponent.vue';

export default {
  name: 'CompraView',
  data() {
    return {
      title: '',
      addCompra: false,
    };
  },
  components: {
    CompraComponent,
  },
  computed: {
    ...mapState(userStore, ['user']),
    ...mapState(tasksStore, ['tasks']),
  },
  methods: {
    ...mapActions(tasksStore, ['fetchTasks', 'addTask']),
    handleAddCompra() {
      this.addTask(this.title, this.user.id, true);
    },
    openAddCompra() {
      this.addCompra = true;
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
