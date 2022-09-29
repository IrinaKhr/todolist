<template>
  <nav>
    <button class="btn btn-secondary btn-sm" @click='handleSignOut'>Sign Out</button>
  </nav>
  <div class='home'>
    <h1>My Dream Destinations!</h1>
    <article>
      <label for='newtask'>
        <input placeholder='New destination' type='text' v-model='newTask' />
      </label>
      <button class="btn btn-success" @click='handleAddTask'>
        Add to the list
      </button>
    </article>
    <table class="tasktable">
      <tr>
        <th>Where</th>
        <th>Wish date</th>
        <th>Been there(✓)</th>
        <th>What to do</th>
      </tr>
      <tr v-for='task in tasks' :key='task.id'>
        <td>
          <span v-show='editing !== task.id'>{{ task.title }}</span>
          <label for='newTitle'>
            <input
              @keyup.enter='doneEdit(task.id)'
              v-model='newTitle'
              v-show='editing === task.id'
              :placeholder='task.title'
            />
          </label>
        </td>
        <td>{{ formatDate(task.inserted_at) }}</td>
        <td>
          <label for='taskStatus'>
            <input
              @click='handleComplete(task.id, !task.is_complete)'
              name='taskStatus'
              type='checkbox'
              v-model='task.is_complete'
            />
          </label>
        </td>
        <td>
          <button
            class="btn btn-light btn-sm"
            data-bs-toggle="tooltip" data-bs-placement="top"
            data-bs-title="Tooltip on top"
            v-show='editing !== task.id'
            @click='edit(task.id)'
          >
            Edit
          </button>
          <button
            class="btn btn-success btn-sm"
            v-show='editing === task.id'
            @click='doneEdit(task.id)'
          >
            Save
          </button>
          <button
            class="btn btn-light btn-sm"
            @click='handleDelete(task.id)'
          > Delete
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import taskStore from '@/store/task';
import userStore from '@/store/user';
import moment from 'moment';

export default {
  name: 'HomeView',
  data() {
    return {
      newTask: '',
      editing: false,
      newTitle: '',
      msg: '',
    };
  },

  computed: {
    ...mapState(taskStore, ['tasks']),
    ...mapState(userStore, ['user']),
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    ...mapActions(taskStore, [
      'addTask',
      'fetchTasks',
      'editTask',
      'deleteTask',
      'markCompleted',
    ]),
    ...mapActions(userStore, ['signOut']),
    async handleSignOut() {
      try {
        await this.signOut();
        this.$router.push({ path: '/auth' });
      } catch (error) {
        this.msg = 'An error has occured';
      }
    },
    handleAddTask() {
      this.addTask(this.newTask, this.user.id);
      this.newTask = '';
    },
    edit(taskId) {
      this.editing = taskId;
    },
    doneEdit(taskId) {
      this.editTask(taskId, this.newTitle);
      this.editing = false;
      this.newTitle = '';
    },
    handleComplete(taskId, taskComplete) {
      this.markCompleted(taskId, taskComplete);
    },
    handleDelete(taskId) {
      this.deleteTask(taskId);
    },
    formatDate(date) {
      return moment(date).format('DD/MM/yyyy HH:mm');
    },
  },
};
</script>
<style>
.tasktable {
  width: 80%;
  margin-top: 40px;
}
.home {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
</style>
