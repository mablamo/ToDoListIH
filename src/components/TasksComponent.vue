<template>

<!-- <table>

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
</table> -->

<ol class="list-group list-group-numbered">
  <li class="list-group-item d-flex justify-content-between align-items-start"
  v-for="(task, index) in tasks" :key="task.id">
    <div class="ms-2 me-auto">
      <div class="fw-bold">{{ task.title }}</div>
      {{ task.inserted_at.substr(0, 10) }}
    </div>
    <div class="dropdown">
  <a class="btn btn-secondary dropdown-toggle" href="#"
  role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Opciones
  </a>
  <ul class="dropdown-menu">
    <li><button class="dropdown-item" @click="handleEditTask(task, index )">Modificar</button></li>
    <li><button class="dropdown-item" @click="handleDeleteTask(task, index )">Eliminar</button></li>
  </ul>
</div>
    <span class="badge bg-primary rounded-pill">{{ task.is_complete }}</span>
  </li>
</ol>

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
    };
  },
  computed: {
    ...mapState(userStore, ['user']),
    ...mapState(tasksStore, ['tasks']),
  },
  methods: {
    ...mapActions(tasksStore, ['editTask', 'deleteTask']),
    handleEditTask(task, index) {
      this.editTask(
        task.id,
        this.editTitle,
        task.is_complete,
        this.user.id,
        index,
      );
      this.editTitle = '';
    },
    handleDeleteTask(task, index) {
      this.deleteTask(task.id, index);
    },
    handleCompleteTask(task, index) {
      this.editTask(
        task.id,
        task.title,
        !task.is_complete,
        this.user.id,
        index,
      );
    },
  },
};
</script>

<style>
.dropdown {
  position: relative;
  justify-self: flex-start;
}
</style>
