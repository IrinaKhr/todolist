<template>
  <section class='vh-100'>
    <div class='container py-5 h-100'>
      <div class='row d-flex justify-content-center align-items-center h-100'>
        <div class='col col-xl-10'>
          <div class='cardsignup' style='border-radius: 1rem'>
            <div class='row g-0'>
              <div class='col-md-6 col-lg-5 d-none d-md-block'>
              </div>
              <div class='col-md-6 col-lg-7 d-flex align-items-center'>
                <div class='card-body p-4 p-lg-5 text-black'>
                  <form>
                    <div class='d-flex align-items-center mb-3 pb-1'>
                      <span class='h1 fw-bold mb-0'
                        >Let´s create a new account!</span
                      >
                    </div>

                    <h5 class='fw-normal mb-3 pb-3' style='letter-spacing: 1px'>
                      Fill in your data here:
                    </h5>

                    <div class='form-outline mb-4'>
                      <label class='form-label' for='new-email'
                        >Email address
                        <input
                          type='email'
                          id='new-email'
                          class='form-control form-control-lg'
                          v-model='newUserEmail'
                          placeholder='example@gmail.com'
                          required
                        />
                      </label>
                    </div>

                    <div class='form-outline mb-4'>
                      <label class='form-label' for='new-password'
                        >Create password
                        <input
                          type='password'
                          id='new-password'
                          class='form-control form-control-lg'
                          v-model='newUserPassword'
                          placeholder='new password'
                          required
                        />
                      </label>
                    </div>

                    <div class='form-outline mb-4'>
                      <label class='form-label' for='confirm-password'
                        >Confirm password
                        <input
                          type='password'
                          id='confirm-password'
                          class='form-control form-control-lg'
                          v-model='confirmPassword'
                          placeholder='confirm password'
                        />
                      </label>
                    </div>
                    <div class='msg'>{{ message }}</div>

                    <div class='pt-1 mb-4'>
                      <button
                        @click.prevent='handleSignUp'
                        class='btn btn-dark btn-lg btn-block'
                        type='button'
                        to='/thankyou'
                      >
                        Sign up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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
      if (!this.newUserEmail) {
        this.message = 'Email required';
      } else if (this.confirmPassword === this.newUserPassword) {
        try {
          await this.signUp(this.newUserEmail, this.newUserPassword);
        } catch (error) {
          this.message = 'User already registered. Please, sign in!';
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
<style>
.cardsignup {
  background-image: url('../assets/Playa.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
