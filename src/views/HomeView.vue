<template>
  <div class="home">
    <h1>Home View</h1>
    <button @click="handleSignOut">SignOut</button>
    <h2>Crear componente</h2>
    <label for="title"><input type="text" id="title" v-model="title">Tarea</label>
    <button @click="handleAddTask"> Añadir</button>
    <table>
      <tr>
        <th>Tarea</th>
        <th>Fecha</th>
        <th>Completada</th>
        <th></th>
        <th>Modificar</th>
        <th>Eliminar</th>
        <th>Completada?</th>
      </tr>
      <tr v-for="(task, index) in tasks" :key="task.id">
        <th>{{ task.title }} <input type="text" v-model="editTitle" v-show=true></th>
        <th>{{ task.inserted_at.substr(0, 10) }}</th>
        <th><button @click="handleCompleteTask(task, index )" v-show="task.is_complete">
        Completada!</button></th>
        <th><button @click="handleCompleteTask(task, index )" v-show="!task.is_complete">
        No completada</button></th>
        <th><button @click="handleEditTask(task, index )">Editar</button></th>
        <th><button @click="handleDeleteTask(task, index )">Eliminar</button></th>
        <th>{{ task.is_complete }}</th>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';
import tasksStore from '@/store/task';

export default {
  name: 'HomeView',
  data() {
    return {
      title: '',
    };
  },
  computed: {
    ...mapState(userStore, ['user']),
    ...mapState(tasksStore, ['tasks']),
  },
  methods: {
    ...mapActions(userStore, ['signOut']),
    ...mapActions(tasksStore, ['fetchTasks', 'addTask', 'editTask', 'deleteTask']),
    handleSignOut() {
      this.signOut();
    },
    handleAddTask() {
      this.addTask(this.title, this.user.id);
    },
    handleEditTask(task, index) {
      this.editTask(task.id, this.editTitle, task.is_complete, this.user.id, index);
      this.editTitle = '';
    },
    handleDeleteTask(task, index) {
      this.deleteTask(task.id, index);
    },
    handleCompleteTask(task, index) {
      this.editTask(task.id, task.title, !task.is_complete, this.user.id, index);
    },
  },
  created() {
    this.fetchTasks();
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
