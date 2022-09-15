<template>
  <div class="home">
    <h1>Welcome to Your ToDoList!</h1>
    <article>
      <label for="newtask">
        <input placeholder='New task name' type="text" v-model="newTask">
      </label>
      <button class="newtaskbutton" @click='handleAddTask'> Add to the list </button>
    </article>
    <table class="tasktable">
      <tr>
        <th>Task Name</th>
        <th>Date</th>
        <th>Check if completed</th>
        <th>Actions</th>
      </tr>
      <tr v-for = "task in tasks" :key="task.id">
        <td> {{task.title}}</td>
        <td>{{task.inserted_at}}</td>
        <td><label for='taskStatus'> {{task.is_complete}}
          <input v-model ="task.is_complete" name="taskStatus" type="checkbox"></label></td>
        <td class="taskbuttons">
          <button class="taskbutton" @click="handleEditTask(title)">
            Edit
          </button>
          <button class="taskbutton" @click="handleDelete(taskId)">
            Delete
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

export default {
  name: 'HomeView',
  data() {
    return {
      newTask: '',
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
    ...mapActions(taskStore, ['fetchTasks', 'signOut', 'addTask', 'editTask', 'deleteTask']),
    handleSignOut() {
      this.signOut();
    },
    handleAddTask() {
      this.addTask(this.newTask, this.user.id);
      this.newTask = '';
    },
    handleEditTask(title) {
      this.editTask(title);
    },
    handleDelete(taskId) {
      this.deleteTask(taskId);
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
.taskbutton {
  border: 1px #0c9625 solid;
  background-color: #10af15;
  font-size: 15px;
  color: rgb(255, 255, 255);
  font-weight: lighter;
  width: 5em;
  margin: 3px;
}
.newtaskbutton {
  border: 1px #072acb solid;
  background-color: #072acb;
  font-size: 15px;
  color: rgb(255, 255, 255);
  font-weight: lighter;
  width: 8em;
  margin: 5px;
}
</style>
