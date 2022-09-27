<template>
  <div class ="auth">
    <h2>Welcome to Your Dream Travel Planner!</h2>
  <div class="signin">
  <h3>Already registered?</h3>
    <h4>Sign in with your email and password here:</h4>
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
    <button class="btn btn-primary" @click='handleSignIn'>Sign In</button>
  </div>
  <div class="newacc">
  <h3>Don`t have an account yet?</h3>
    <router-link class="link-success" to="/signup" >Create new account</router-link>
  </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';

export default {
  name: 'AuthView',
  data() {
    return {
      userPassword: '',
      userEmail: '',
      logmessage: '',
    };
  },

  computed: {
    ...mapState(userStore, ['user', 'errorMsg']),
  },
  methods: {
    ...mapActions(userStore, ['signIn', 'fetchUser']),
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
.auth {
  display: flex;
  flex-flow: column wrap;
}
h1 {
  color: #072acb;
}
.msg {
  color: blueviolet;
  margin-top: 10px;
}

</style>
