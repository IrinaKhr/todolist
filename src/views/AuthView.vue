<template>
  <div>
    <h1>Welcome to ToDoList authentication page!</h1>
    <h2>Don´t have an account yet?</h2>
    <h3>Fill in your data, please!</h3>
    <label for='new-email'
      >Your email
      <input
        v-model='newUserEmail'
        @input='validateEmail'
        id='new-email'
        type='email'
        placeholder='example@gmail.com'
        required
      />
    </label>
    <label for='new-password'
      >Create password
      <input
        v-model='newUserPassword'
        @input="validatePassword"
        id='new-password'
        type='password'
        placeholder='new password'
        required
      />
    </label>
    <label for='confirm-password'
      >Confirm password
      <input
        v-model='confirmPassword'
        id='confirm-password'
        type='password'
        placeholder='confirm password'
      />
    </label>
    <div>{{ message }}</div>
    <br />
    <button @click='handleSignUp'>Sign Up</button>
    <h2>Already registered?</h2>
    <h3>Sign in with your email and password here:</h3>
    <label for='email'
      >Your email
      <input
        v-model='userEmail'
        id='email'
        type='email'
        placeholder='example@gmail.com'
        required
      />
    </label>
    <label for='password'
      >Your password
      <input
        v-model='userPassword'
        id='password'
        type='password'
        placeholder='your password'
      />
    </label>
    <br />
    <button @click='handleSignIn'>Sign In</button>
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
      confirmPassword: '',
      userPassword: '',
      userEmail: '',
      message: '',
    };
  },

  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['signUp', 'signIn']),
    validateEmail() {
      if (this.newUserEmail.includes('@', '.')) {
        this.message = 'Please,create a password!';
      } else {
        this.message = 'Please, enter a valid email!';
      }
    },
    validatePassword() {
      if (this.newUserPassword.length < 8) {
        this.message = 'The password must have at least 8 characters';
      }
    },
    handleSignUp() {
      if (this.confirmPassword === this.newUserPassword) {
        this.signUp(this.newUserEmail, this.newUserPassword);
      } else {
        this.message = 'Oops!Try again!The passwords do not match!';
      }
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
  color: #072acb;
}
</style>
