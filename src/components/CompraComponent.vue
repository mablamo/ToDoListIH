<template>

<h3>Compras pendientes...</h3>
<ul class="list-group">
  <li class="list-group-item d-flex justify-content-between align-items-start pending"
  v-for="(task) in listaCompra" :key="task.id">
    <div class="ms-2 me-auto">
      <div class="fw-bold">{{ task.title }}</div>
    </div>
      <button class="badge bg-primary rounded-pill" @click="handleDeleteTask(task)">
      Comprado</button>
  </li>
</ul>

</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';
import tasksStore from '@/store/task';

export default {
  name: 'TasksComponent',
  data() {
    return {
      title: '',
      editedTask: {},
      editedIndex: 0,
      editController: false,
    };
  },
  computed: {
    ...mapState(userStore, ['user']),
    ...mapState(tasksStore, ['tasks']),
    listaCompra() {
      return this.tasks.filter((elem) => elem.chart);
    },
  },
  methods: {
    ...mapActions(tasksStore, ['editTask', 'deleteTask']),

    handleDeleteTask(task, index) {
      this.deleteTask(task.id, index);
    },
    openEditTask(task, index) {
      this.editController = true;
      this.editedTask = task;
      this.editedIndex = index;
      this.$emit('hideAddButton');
    },
    handleCompleteTask(task) {
      const dd = Date().substring(8, 10);
      const mm = Date().substring(4, 7);
      const yyyy = Date().substring(11, 15);
      const date = `${dd} de ${mm} de ${yyyy}`;
      console.log(date);
      this.editTask(
        task.id,
        task.title,
        !task.is_complete,
        this.user.id,
        date,
      );
    },
  },
};
</script>

<style>
li {
  text-align: center;
}
</style>
