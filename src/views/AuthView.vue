<template>
  <div>
    <h1>Welcome to ToDoList authentication page!</h1>
     <h2>Don´t have an account yet?</h2>
     <h3>Fill in your data, please!</h3>
     <label for ="new-email">Your email
      <input v-model ="newUserEmail" id="new-email" type="email" placeholder="example@gmail.com">
     </label>
     <label for ="new-password">Create password
      <input v-model="newUserPassword" id="new-password" type="password" placeholder="new password">
     </label>
     <br>
      <button @click="handleSignUp">Sign Up</button>
    <h2>Already registered?</h2>
     <h3>Sign in with your email and password here:</h3>
     <label for ="email">Your email
      <input v-model ="userEmail" id="email" type="email" placeholder="example@gmail.com">
    </label>
    <label for ="password">Your password
      <input v-model="userPassword" id="password" type="password" placeholder="your password">
    </label>
     <br>
     <button @click="handleSignIn">Sign In</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';

export default {
  name: 'AuthView',
  data() {
    return {
      newUserPassword: '',
      newUserEmail: '',
      userPassword: '',
      userEmail: '',
    };
  },
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['signUp', 'signIn']),
    handleSignUp() {
      this.signUp(this.newUserEmail, this.newUserPassword);
    },
    handleSignIn() {
      this.signIn(this.userEmail, this.userPassword);
    },
  },
  watch: {
    user() {
      if (this.user) {
        console.log(this.user);
        this.$router.push({ path: '/' });
      }
    },
  },
};
</script>
<style>
button {
    border: 1px #072acb solid;
    background-color: #072acb;
    font-size: 15px;
    color: rgb(255, 255, 255);
    font-weight: lighter;
    width: 10%;
    height: 30px;
    margin-top: 20px;
}
h1 {
    color:#072acb;

}
</style>
