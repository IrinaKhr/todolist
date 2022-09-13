<template>
  <div>
    <h1>Welcome to ToDoList authentication page!</h1>
    <h2>Don`t have an account yet?</h2>
    <h3>Fill in your data, please!</h3>
    <form>
      <label for='new-email'
        >Your email
        <input
          v-model='newUserEmail'
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
      <div class='msg'>{{ message }}</div>
      <br />
      <button type='submit' @click='handleSignUp'>Sign Up</button>
    </form>
    <h2>Already registered?</h2>
    <h3>Sign in with your email and password here:</h3>
    <form>
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
      <div class='msg'>{{ logmessage }}</div>
    </form>
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
      logmessage: '',
    };
  },

  computed: {
    ...mapState(userStore, ['user', 'errorMsg']),
  },
  methods: {
    ...mapActions(userStore, ['signUp', 'signIn', 'fetchUser']),
    validateEmail(value) {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.message = 'Please,create a password!';
      } else {
        this.message = 'Please, enter a valid email!';
      }
    },
    validateUserEmail(value) {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.logmessage = '';
      } else {
        this.logmessage = 'Please, enter a valid email!';
      }
    },
    validatePassword(value) {
      const difference = 6 - value.length;
      if (value.length < 6) {
        this.message = `The password must have at least 6 characters! + ${difference} + characters left`;
      } else {
        this.message = '';
      }
    },
    validateUserPassword(value) {
      const difference = 6 - value.length;
      if (value.length < 6) {
        this.logmessage = `The password must have 6 characters! + ${difference} + characters left`;
      } else {
        this.logmessage = '';
      }
    },

    async handleSignUp() {
      if (this.confirmPassword === this.newUserPassword) {
        try {
          await this.signUp(this.newUserEmail, this.newUserPassword);
        } catch (error) {
          this.message = 'User already registered. Please, sign in below!';
        }
      } else {
        this.message = 'Oops!Try again!The passwords do not match!';
      }
    },
    async handleSignIn() {
      try {
        await this.signIn(this.userEmail, this.userPassword);
      } catch (error) {
        this.logmessage = 'Please, check that your user name and password are correct or create an account above!';
      }
    },
  },
  watch: {
    user() {
      if (this.user) {
        console.log(this.user);
        this.$router.push({ path: '/' });
      }
    },
    newUserEmail(value) {
      // binding this to the data value in the email input
      this.newUserEmail = value;
      this.validateEmail(value);
    },
    newUserPassword(value) {
      this.newUserPassword = value;
      this.validatePassword(value);
    },
    userEmail(value) {
      // binding this to the data value in the email input
      this.userEmail = value;
      this.validateUserEmail(value);
    },
    userPassword(value) {
      this.userPassword = value;
      this.validateUserPassword(value);
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
  width: 5em;
  height: 30px;
  margin-top: 20px;
}
h1 {
  color: #072acb;
}
.msg {
  color: blueviolet;
  margin-top: 10px;
}
</style>
