import { defineStore } from 'pinia';
import supabase from '../supabase/index';

export default defineStore('users', {
  state: () => ({
    users: [],
  }),
  actions: {
    async fetchUsers() {
      const { data: users } = await supabase
        .from('dbUsers')
        .select('*')
        .order('id', { ascending: true });
      this.users = users;
    },
    async addUser(user, userId) {
      const { error } = await supabase
        .from('dbUsers')
        .insert([{
          user_id: userId,
          user_mail: user,
        }]);
      console.log(error);
    },
  },
});
