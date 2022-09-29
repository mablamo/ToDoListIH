<template>
  <div class="home">
    <button v-if="!addController && !editController"
    class="btn btn-primary" @click="openAddTask">Nueva Tarea</button>
    <add-task-component v-if="addController" @hideAdd="addController = false"></add-task-component>
    <tasks-component v-if="!addController" @hideAddButton="editController = !editController">
    </tasks-component>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';
import tasksStore from '@/store/task';
import TasksComponent from '../components/TasksComponent.vue';
import AddTaskComponent from '../components/AddTaskComponent.vue';

export default {
  name: 'HomeView',
  data() {
    return {
      title: '',
      addController: false,
      editController: false,
    };
  },
  components: {
    TasksComponent,
    AddTaskComponent,
  },
  computed: {
    ...mapState(userStore, ['user']),
    ...mapState(tasksStore, ['tasks']),
  },
  methods: {
    ...mapActions(tasksStore, ['fetchTasks', 'addTask']),
    handleAddTask() {
      this.addTask(this.title, this.user.id);
    },
    openAddTask() {
      this.addController = true;
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
