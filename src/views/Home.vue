<template>

  <div v-if="loggedIn" class="home">
    <h3>Welcome, this is the Home page!</h3>
    <br>
    <h5>You are logged in<br> You can now view courses, lecturers and enrolments</h5>
  </div>

  <div v-else class="home">
    <!-- <b-form @submit="login()">
      <b-form-group id="input-group-1" label="Email address:">
        <b-form-input
          id="input-1" v-model="form.email" type="email" placeholder="Enter email" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2" v-model="form.password" placeholder="Enter password" required></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" @click="login()">Login</b-button>
    </b-form> -->

    <h3>Welcome to College Vue!</h3><br>
    <h5>You can view courses, lectureres and enrolments on the site by registering or logging in!</h5>
  </div>

</template>

<script>
import axios from '@/config/api';

export default {
  name: 'Home',
  components: {
  },
  props: {
    loggedIn: Boolean
  },
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    login() {
      axios.post('/login', {
        email: this.form.email,
        password: this.form.password
      })
      .then(response => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        this.$emit('login');
        this.$router.replace({ name: 'home' });
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
    }
  },
}
</script>

<style>
.home {
  text-align: center;
}
</style>
