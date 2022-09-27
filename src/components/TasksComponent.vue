<template>

<edit-task-component :editedIndex="editedIndex" :editedTask="editedTask"
v-if="editController" @hideEdit="editController = false">
</edit-task-component>

<h2>Pending Tasks</h2>
<ol class="list-group list-group-numbered">
  <li class="list-group-item d-flex justify-content-between align-items-start"
  v-for="(task) in pendingTasks" :key="task.id">
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
    <li><button class="dropdown-item" @click="openEditTask(task)">Modificar</button></li>
    <li><button class="dropdown-item" @click="handleDeleteTask(task)">Eliminar</button></li>
  </ul>
</div>
    <button class="badge bg-primary rounded-pill" @click="handleCompleteTask(task)"
    :key="task.is_complete">
      {{ task.is_complete }}</button>
  </li>
</ol>
<h2>Completed Tasks</h2>
<ol class="list-group list-group-numbered">
  <li class="list-group-item d-flex justify-content-between align-items-start"
  v-for="(task) in completedTasks" :key="task.id">
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
    <li><button class="dropdown-item" @click="openEditTask(task)">Modificar</button></li>
    <li><button class="dropdown-item" @click="handleDeleteTask(task)">Eliminar</button></li>
  </ul>
</div>
    <button class="badge bg-primary rounded-pill" @click="handleCompleteTask(task)"
    :key="task.is_complete">
      {{ task.is_complete }}</button>
  </li>
</ol>

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
      console.log(this.tasks.filter((elem) => !elem.is_completed));
      return this.tasks.filter((elem) => !elem.is_completed);
    },
    completedTasks() {
      return this.tasks.filter((elem) => elem.is_completed);
    },
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
    openEditTask(task, index) {
      this.editController = true;
      this.editedTask = task;
      this.editedIndex = index;
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

li.completed {
  background-color: green;
}
</style>
