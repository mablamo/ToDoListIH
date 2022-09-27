<template>

<h2>Edit task</h2>
<div class="card">
  <label for="taskToEdit">
  <input id="taskToEdit" type="text" :placeholder="editedTask.title" v-model="editTitle">
  <button @click="handleEditTask(editedTask, editedIndex)">Modificar</button>
  <button @click="handleCancel()">Cancelar</button>
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
    handleEditTask(task) {
      this.editTask(
        task.id,
        this.editTitle,
        task.is_complete,
        this.user.id,
        this.editedIndex,
      );
      this.editTitle = '';
      this.$emit('hideEdit');
    },
    handleCancel() {
      this.editTitle = '';
      this.$emit('hideEdit');
    },
  },
};
</script>
