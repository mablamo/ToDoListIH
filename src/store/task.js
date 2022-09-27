import { defineStore } from 'pinia';
import supabase from '../supabase/index';

export default defineStore('tasks', {
  state: () => ({
    tasks: [],
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: true });
      this.tasks = tasks;
    },
    async addTask(title, userId) {
      const { data: createdTask } = await supabase
        .from('tasks')
        .insert([{
          user_id: userId,
          title,
        }]);
      this.tasks.push(createdTask[0]);
    },
    async editTask(taskId, title, isComplete, userId) {
      const { data: editedTask } = await supabase
        .from('tasks')
        .update([{
          user_id: userId,
          title,
          is_complete: isComplete,
        }])
        .match({ id: taskId });
      const taskIndex = this.tasks.findIndex((item) => item.id === taskId);
      this.tasks[taskIndex].title = editedTask[0].title;
      this.tasks.filter((elem) => elem.id === taskId)[0].title = editedTask[0].title;
      this.tasks[taskIndex].is_complete = isComplete;
    },
    async deleteTask(taskId) {
      const { data, error } = await supabase
        .from('tasks')
        .delete()
        .match({ id: taskId });
      const taskIndex = this.tasks.findIndex((item) => item.id === taskId);
      this.tasks.splice(taskIndex, 1);
      console.log(data, error);
    },
  },
});
