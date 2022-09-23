<template>
  <div class='home'>
    <h1>Welcome to Your ToDoList!</h1>
    <article>
      <label for='newtask'>
        <input placeholder='New task name' type='text' v-model='newTask' />
      </label>
      <button class='newtaskbutton' @click='handleAddTask'>
        Add to the list
      </button>
    </article>
    <table class='tasktable'>
      <tr>
        <th>Task Name</th>
        <th>Date</th>
        <th>Check if completed</th>
        <th>Actions</th>
      </tr>
      <tr v-for='task in tasks' :key='task.id'>
        <td>
          <span v-show='editing !== task.id'>{{ task.title }}</span>
          <label @dblclick='edit(task.id)' for='newTitle'>
            <input
              @keyup.enter='doneEdit(taskId, newTitle)'
              v-model='task.title'
              v-show='editing === task.id'
            />
          </label>
        </td>
        <td>{{ task.inserted_at }}</td>
        <td>
          <label for='taskStatus'>
            <input
              @click='handleComplete(task.id, !task.is_complete)'
              name='taskStatus'
              type='checkbox'
            />
          </label>
        </td>
        <td class='taskbuttons'>
          <button v-show='editing !== task.id'
            class='taskbutton'
            @click='edit(task.id)'
          >
            Edit
          </button>
          <button v-show='editing === task.id'
            class='taskbutton'
            @click='doneEdit(taskId, newTitle)'
          >
            Save
          </button>
          <button class='taskbutton' @click='handleDelete(task.id)'>
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
// import TaskRow from '@/components/TaskRow.vue';

export default {
  name: 'HomeView',
  // components: { TaskRow },
  data() {
    return {
      newTask: '',
      editing: 0,
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
      'signOut',
      'addTask',
      'fetchTasks',
      'editTask',
      'deleteTask',
      'markCompleted',
    ]),
    handleSignOut() {
      this.signOut();
    },
    handleAddTask() {
      this.addTask(this.newTask, this.user.id);
      this.newTask = '';
    },
    edit(taskId) {
      this.editing = taskId;
    },
    doneEdit(taskId, newTitle) {
      this.editing = false;
      this.editTask(taskId, newTitle);
    },
    handleComplete(taskId, taskComplete) {
      this.markCompleted(taskId, taskComplete);
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
.edit {
  display: none;
}
.editing .edit {
  display: block;
}
</style>
