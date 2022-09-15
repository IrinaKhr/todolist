import { defineStore } from 'pinia';
import supabase from '../supabase/index';

export default defineStore('tasks', {
  state: () => ({
    tasks: [],
    newTask: null,
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
      const { data: newTask, error } = await supabase
        .from('tasks')
        .insert([{ title, user_id: userId }]);
      console.log('added task', newTask);
      if (error) throw error;
      this.tasks.unshift(newTask[0]);
    },
    async editTask(title) {
      const { data, error } = await supabase
        .from('tasks')
        .update({ title })
        .match({ title });
      this.data = data;
      this.error = error;
    },
    async deleteTask(taskId) {
      const { data: taskDeleted } = await supabase
        .from('tasks')
        .delete()
        .match({ id: taskId });
      this.taskRemoved = taskDeleted;
    },
  },
});
