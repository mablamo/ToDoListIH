<template>
  <div class="home">
    <h1>Home View</h1>
    <button @click="handleSignOut">SignOut</button>
    <h2>Crear componente</h2>
    <label for="title"><input type="text" id="title" v-model="title">Tarea</label>
    <button @click="handleAddTask"> Añadir</button>
    <h3 v-for="(task) in tasks" :key="task.id">{{ task.title }}</h3>
    <button @click="prueba">prueba</button>
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
    ...mapActions(tasksStore, ['fetchTasks', 'addTask']),
    handleSignOut() {
      this.signOut();
    },
    handleAddTask() {
      this.addTask(this.title, true, this.user.id);
    },
    prueba() {
      this.fetchTasks();
      console.log(this.tasks);
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
