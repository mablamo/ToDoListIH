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
      const { data: createdUser } = await supabase
        .from('dbUsers')
        .insert([{
          user_id: userId,
          user_mail: user,
        }]);
      this.users.push(createdUser[0]);
    },
  },
});
