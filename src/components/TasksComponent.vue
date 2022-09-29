<template>

<edit-task-component :editedIndex="editedIndex" :editedTask="editedTask"
v-if="editController" @hideEdit="editController = false">
</edit-task-component>
<div v-if="!editController">
<h3>Tareas Pendientes</h3>
<ol class="list-group list-group-numbered">
  <li class="list-group-item d-flex justify-content-between align-items-start pending"
  v-for="(task) in pendingTasks" :key="task.id">
    <div class="ms-2 me-auto">
      <div class="fw-bold">{{ task.title }}</div>
      Creada:{{ task.inserted_at.substr(0, 10) }}
    </div>
    <button class="badge bg-primary rounded-pill" @click="handleCompleteTask(task)"
    :key="task.is_complete">
      Completar</button>
    <div class="dropdown">
  <a class="btn btn-secondary dropdown-toggle" href="#"
  role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Opciones
  </a>
  <ul class="dropdown-menu">
    <li><button class="dropdown-item" @click="openEditTask(task)">Modificar</button></li>
    <li><button class="dropdown-item" @click="handleDeleteTask(task)">Eliminar</button></li>
  </ul>
</div>
  </li>
</ol>
<h3>Tareas completadas</h3>
<ol class="list-group list-group-numbered">
  <li class="list-group-item d-flex justify-content-between align-items-start completed"
  v-for="(task) in completedTasks" :key="task.id">
    <div class="ms-2 me-auto">
      <div class="fw-bold">{{ task.title }}</div>
      Creada:{{ task.inserted_at.substr(0, 10) }}
    </div>
    <button class="badge bg-primary rounded-pill" @click="handleCompleteTask(task)"
    :key="task.is_complete">
      No completada</button>
    <div class="dropdown">
  <a class="btn btn-secondary dropdown-toggle" href="#"
  role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Opciones
  </a>
  <ul class="dropdown-menu">
    <li><button class="dropdown-item" @click="openEditTask(task)">Modificar</button></li>
    <li><button class="dropdown-item" @click="handleDeleteTask(task)">Eliminar</button></li>
  </ul>
</div>
  </li>
</ol>
</div>

</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';
import tasksStore from '@/store/task';
import EditTaskComponent from './EditTaskComponent.vue';

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
  components: {
    EditTaskComponent,
  },
  computed: {
    ...mapState(userStore, ['user']),
    ...mapState(tasksStore, ['tasks']),
    pendingTasks() {
      return this.tasks.filter((elem) => !elem.is_complete);
    },
    completedTasks() {
      return this.tasks.filter((elem) => elem.is_complete);
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

li.pending {
  background-color: rgb(198, 231, 91);
}

li.completed {
  background-color: rgb(62, 239, 92);
}

</style>
