<template>
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
      <button @click.prevent='handleSignUp'>Sign Up</button>
    </form>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';

export default {
  name: 'SignUp',
  data() {
    return {
      newUserPassword: '',
      newUserEmail: '',
      confirmPassword: '',
      message: '',
    };
  },
  computed: {
    ...mapState(userStore, ['user', 'errorMsg']),
  },
  created() {
    this.fetchUser();
  },
  methods: {
    ...mapActions(userStore, ['signUp', 'fetchUser']),
    validateEmail(value) {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        this.message = 'Please,create a password!';
      } else {
        this.message = 'Please, enter a valid email!';
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
  },
};
</script>
