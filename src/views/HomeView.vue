<template>
  <div class="home">
    <h1>Welcome to Your ToDoList!</h1>
    <button class="newtaskbutton"> New Task </button>
    <table class="tasktable">
      <tr>
        <th>Task Name</th>
        <th>Date</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td><label for='taskStatus'><input name="taskStatus" type="checkbox"></label></td>
        <td class="taskbuttons">
          <button class="taskbutton" @click="editTask(task.id)">
            Edit
          </button>
          <button class="taskbutton" @click="removeTask(task.id)">
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
      tasks: [],
    };
  },

  computed: {
    ...mapState(taskStore, ['tasks'], userStore, ['user']),
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    ...mapActions(taskStore, ['fetchTasks', 'signOut', 'addTask']),
    handleSignOut() {
      this.signOut();
    },
    handleAddTask() {
      this.addTask();
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
