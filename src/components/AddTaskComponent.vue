<template>

<h2>Añadir tarea</h2>
<div class="card">
  <label for="title">
    <input type="text" id="title" v-model="title" placeholder="Introduce tu nueva tarea">
    </label>
  <div class="box">
    <button class="btn btn-primary" @click="handleAddTask" type="button"> Añadir</button>
    <button class="btn btn-primary cancel" @click="handleCancel" type="button"> Cancelar</button>
  </div>
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
    ...mapActions(tasksStore, ['addTask']),
    handleAddTask() {
      this.addTask(this.title, this.user.id);
      this.title = '';
      this.$emit('hideAdd');
    },
    handleCancel() {
      this.title = '';
      this.$emit('hideAdd');
    },
  },
};
</script>
