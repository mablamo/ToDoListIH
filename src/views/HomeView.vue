<template>
  <div class="home">
    <h1>Home View</h1>
    <button @click="handleSignOut">SignOut</button>
    <h2>Crear componente</h2>
    <label for="title"><input type="text" id="title" v-model="title">Tarea</label>
    <button @click="handleAddTask"> Añadir</button>
    <tasks-component></tasks-component>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';
import tasksStore from '@/store/task';
import TasksComponent from '../components/TasksComponent.vue';

export default {
  name: 'HomeView',
  data() {
    return {
      title: '',
    };
  },
  components: {
    TasksComponent,
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
