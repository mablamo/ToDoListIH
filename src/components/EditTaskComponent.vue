<template>

<h2>Edit task</h2>
<div class="card">
  <div class="card-body">
    {{ editedTask.title }} Index: {{ editedIndex }}
  </div>
  <label for="taskToEdit">
  <input id="taskToEdit" type="text" :placeholder="editedTask.title" v-model="editTitle">
  <button @click="handleEditTask(editedTask, editedIndex )">Modificar</button>
  </label>
</div>

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
  props: {
    editedTask: Object,
    editedIndex: Number,
  },
  computed: {
    ...mapState(userStore, ['user']),
    ...mapState(tasksStore, ['tasks']),
  },
  methods: {
    ...mapActions(tasksStore, ['editTask']),
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
  },
};
</script>
