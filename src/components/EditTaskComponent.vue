<template>
  <h3>Modifica tu tarea:</h3>
  <div class="card">
    <label for="taskToEdit"
      >Tarea:
      <input
        id="taskToEdit"
        type="text"
        :placeholder="editedTask.title"
        v-model="editTitle"
      />
      <div class="box">
        <button
          class="btn btn-primary"
          @click="handleEditTask(editedTask, editedIndex)"
        >
          Modificar
        </button>
        <button class="btn btn-primary cancel" @click="handleCancel()">
          Cancelar
        </button>
      </div>
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
        null,
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
