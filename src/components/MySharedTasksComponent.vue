<template>
  <h3>Tareas Enviadas</h3>
  <ol class="list-group list-group-numbered">
    <li
      class="
        list-group-item
        d-flex
        justify-content-between
        align-items-start
        pending
      "
      v-for="task in mySharedTasks"
      :key="task.id"
    >
      <div class="ms-2 me-auto">
        <div class="fw-bold">{{ task.title }}</div>
        Creada:{{ task.created_at.substr(0, 10) }} Para:
        {{
          users[users.findIndex((item) => item.user_id === task.user_target)]
            .user_mail
        }}
      </div>
      <button
        class="badge bg-primary rounded-pill"
        @click="aceptarTask(task)"
        :key="task.is_complete"
      >
        Eliminar
      </button>
    </li>
  </ol>
  <h3>Tareas Recibidas</h3>
  <ol class="list-group list-group-numbered">
    <li
      class="list-group-item d-flex justify-content-between align-items-start"
      v-for="task in sharedTasksForMe"
      :key="task.id"
    >
      <div class="ms-2 me-auto">
        <div class="fw-bold">{{ task.title }}</div>
        Creada:{{ task.created_at.substr(0, 10) }} De:
        {{
          users[users.findIndex((item) => item.user_id === task.user_id)]
            .user_mail
        }}
      </div>
      <span v-if="task.chart">Lista de la compra</span>
      <button
        class="badge bg-primary rounded-pill"
        @click="aceptarTask(task)"
        :key="task.is_complete"
      >
        Aceptar
      </button>
    </li>
  </ol>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';
import tasksStore from '@/store/task';
import sharedTasksStore from '@/store/sharedtask';
import usersStore from '@/store/users';

export default {
  name: 'MySharedTasksComponent',
  data() {
    return {
      title: '',
    };
  },
  computed: {
    ...mapState(userStore, ['user']),
    ...mapState(usersStore, ['users']),
    ...mapState(tasksStore, ['tasks']),
    ...mapState(sharedTasksStore, ['sharedTasks']),
    mySharedTasks() {
      return this.sharedTasks.filter((elem) => elem.user_id === this.user.id);
    },
    sharedTasksForMe() {
      return this.sharedTasks.filter(
        (elem) => elem.user_target === this.user.id,
      );
    },
  },
  methods: {
    ...mapActions(tasksStore, ['addTask']),
    ...mapActions(sharedTasksStore, ['deleteSharedTask']),
    aceptarTask(task) {
      this.addTask(task.title, this.user.id, task.chart);
      this.deleteSharedTask(task.id);
    },
    eliminarTask(task) {
      this.deleteSharedTask(task.id);
    },
  },
};
</script>

<style>
.dropdown {
  position: relative;
  justify-self: flex-start;
}

h3 {
  margin-top: 30px;
}

li.pending {
  background-color: rgb(188, 229, 246);
}

li.completed {
  background-color: rgb(144, 243, 216);
}

li.completed div.fw-bold {
  text-decoration: line-through;
}

span {
  background-color: rgb(123, 234, 162);
}
</style>
