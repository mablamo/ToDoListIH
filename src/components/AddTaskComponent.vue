<template>

<h2>Añadir tarea</h2>
<div class="card">
  <label for="title">
    <input type="text" id="title" v-model="title" placeholder="Introduce tu nueva tarea">
    </label>
  <div v-if="esCompra" class="box">
    <h4>Quieres agregar "{{ this.title.replace('comprar ', '').replace('compra ', '') }}"
       a la lista de la compra?</h4>
    <button class="btn btn-primary" @click="handleAddCompra" type="button">SI</button>
    <button class="btn btn-primary cancel" @click="handleAddTaskAnyway" type="button">
      NO, es una tarea</button><br>
    <button class="btn btn-primary cancel" @click="handleCancel" type="button"> Cancelar</button>
  </div>
    <div v-if="!esCompra" class="box">
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
      esCompra: false,
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
      if (this.title.includes('compra')) {
        this.esCompra = true;
      } else {
        this.addTask(this.title, this.user.id, false);
        this.title = '';
        this.$emit('hideAdd');
      }
    },
    handleAddTaskAnyway() {
      this.addTask(this.title, this.user.id, false);
      this.title = '';
      this.esCompra = false;
      this.$emit('hideAdd');
    },
    handleCancel() {
      this.title = '';
      this.esCompra = false;
      this.$emit('hideAdd');
    },
    handleAddCompra() {
      this.addTask(this.title.replace('comprar ', '').replace('compra ', ''), this.user.id, true);
      this.title = '';
      this.esCompra = false;
      this.$emit('hideAdd');
    },
  },
};
</script>
