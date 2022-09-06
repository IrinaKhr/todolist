<template>
  <div class="home">
    <h1>Welcome to TodoList home page!</h1>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import taskStore from '@/store/task';

export default {
  name: 'HomeView',
  computed: {
    ...mapState(taskStore, ['tasks']),
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    ...mapActions(taskStore, ['fetchTasks', 'signOut']),
    handleSignOut() {
      this.signOut();
    },
  },
};
</script>
