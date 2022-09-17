import { defineStore } from 'pinia';
import supabase from '../supabase/index';

export default defineStore('tasks', {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: false });
      this.tasks = tasks;
    },
    async addTask(title, isComplete, userId) {
      const { data: createdTask } = await supabase
        .from('tasks')
        .insert([{
          user_id: userId,
          title,
          is_complete: isComplete,
        }]);
      this.tasks.unshift(createdTask[0]);
    },
  },
});
