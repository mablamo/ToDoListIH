<template>
<div class="view">
<shared-component></shared-component>
<my-shared-tasks-component></my-shared-tasks-component>
</div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';
import tasksStore from '@/store/task';
import SharedComponent from '../components/SharedComponent.vue';
import MySharedTasksComponent from '../components/MySharedTasksComponent.vue';

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
    MySharedTasksComponent,
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
