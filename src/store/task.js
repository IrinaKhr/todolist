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
        .order('id', { ascending: false });
      this.tasks = tasks;
    },
    async addTask(title, userId) {
      const { data: newTask } = await supabase
        .from('tasks')
        .insert([{ title, user_id: userId }]);
      this.newTask = newTask;
    },
  },
});
