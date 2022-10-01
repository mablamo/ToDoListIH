<template>
  <div class="view">
    <button
      v-if="!addController && !editController"
      class="btn btn-primary"
      @click="openAddTask"
    >
      Nueva Tarea
    </button>
    <add-task-component
      v-if="addController"
      @hideAdd="addController = false"
    ></add-task-component>
    <tasks-component
      v-if="!addController"
      @hideAddButton="editController = !editController"
    >
    </tasks-component>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';
import tasksStore from '@/store/task';
import sharedTasksStore from '@/store/sharedtask';
import usersStore from '@/store/users';
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
    ...mapState(usersStore, ['users']),
    ...mapState(tasksStore, ['tasks']),
    ...mapState(sharedTasksStore, ['sharedTasks']),
  },
  methods: {
    ...mapActions(tasksStore, ['fetchTasks', 'addTask']),
    ...mapActions(usersStore, ['fetchUsers', 'addUser']),
    ...mapActions(sharedTasksStore, ['fetchSharedTasks']),
    handleAddTask() {
      this.addTask(this.title, this.user.id);
    },
    openAddTask() {
      this.addController = true;
    },
  },
  created() {
    this.fetchTasks();
    this.fetchUsers();
    this.fetchSharedTasks();
  },
  watch: {
    user() {
      if (this.user === null) {
        this.$router.push({ path: '/auth' });
      }
    },
    users() {
      if (
        this.users.findIndex((item) => item.user_id === this.user.id) === -1
      ) {
        this.addUser(this.user.email, this.user.id);
      }
    },
  },
};
</script>
