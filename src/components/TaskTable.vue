<template>
  <tr v-for='task in tasks' :key='task.id'>
    <td @dblclick='handleEditTask'>
      {{ task.title }}
      <label v-show='editing' for='newtitle'>
        <input
          placeholder='Change task title'
          type='text'
          v-model='task.title'
          @keyup.enter='doneEdit'
        />
      </label>
    </td>
    <td>{{ task.inserted_at }}</td>
    <td>
      <label for='taskStatus'>
        {{ task.is_complete }}
        <input
          @click='handleComplete(task.id, !task.is_complete)'
          v-model='task.is_complete'
          name='taskStatus'
          type='checkbox'
        />
      </label>
    </td>
    <td class='taskbuttons'>
      <button class='taskbutton' @click='handleEditTask(task.id, task.title)'>
        Edit
      </button>
      <button class='taskbutton' @click='handleDelete(task.id)'>Delete</button>
    </td>
  </tr>
</template>
<script>
export default {
  name: 'TaskTable',
};
</script>
