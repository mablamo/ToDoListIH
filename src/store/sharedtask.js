import { defineStore } from 'pinia';
import supabase from '../supabase/index';

export default defineStore('sharedTasks', {
  state: () => ({
    sharedTasks: [],
  }),
  actions: {
    async fetchSharedTasks() {
      const { data: sharedTasks } = await supabase
        .from('sharedTask')
        .select('*')
        .order('id', { ascending: true });
      this.sharedTasks = sharedTasks;
    },
    async addSharedTask(title, userId, compra, targetId) {
      const { data: sharedTask } = await supabase
        .from('sharedTask')
        .insert([{
          user_id: userId,
          title,
          chart: compra,
          user_target: targetId,
        }]);
      this.sharedTasks.push(sharedTask[0]);
    },
    async deleteSharedTask(sharedTaskId) {
      const { data, error } = await supabase
        .from('sharedTask')
        .delete()
        .match({ id: sharedTaskId });
      const taskIndex = this.sharedTasks.findIndex((item) => item.id === sharedTaskId);
      this.tasks.splice(taskIndex, 1);
      console.log(data, error);
    },
  },
});
