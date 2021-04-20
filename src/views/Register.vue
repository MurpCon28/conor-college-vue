<template>
  <div>

    <b-form>
      <b-form-group id="input-group-1" label="Full Name:">
        <b-form-input
          id="input-1" v-model="form.name" type="text" placeholder="Enter full name" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Email address:" label-for="input-2">
        <b-form-input
          id="input-2" v-model="form.email" type="email" placeholder="Enter email" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Password:" label-for="input-3">
        <b-form-input
          id="input-3" v-model="form.password" type="password" placeholder="Enter password" required></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" @click.prevent="createUser()">Register</b-button>
    </b-form>

  </div>
</template>

<script>
import axios from '@/config/api';

export default {
  name: 'Register',
  components: {
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
      },
      errors: {}
    }
  },
  mounted(){

  },
  methods: {
    createUser() {
      let token = localStorage.getItem('token');


      axios.post('/register', {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password,
      },
      {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        this.$emit('login');
        this.$router.push({ name: 'home' });
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
        if (error.response.data.errors) {
          this.errors = error.response.data.errors
        }
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
