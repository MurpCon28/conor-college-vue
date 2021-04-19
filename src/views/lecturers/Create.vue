<template>
  <div>

    <b-form @submit="createLecturer()">
      <b-form-group id="input-group-1" label="Name:">
        <b-form-input
          id="input-1" v-model="form.name" type="text" placeholder="Enter Full Name" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Address:" label-for="input-2">
        <b-form-input
          id="input-2" v-model="form.address" type="text" placeholder="Enter Address" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Email:" label-for="input-3">
        <b-form-input
          id="input-3" v-model="form.email" type="email" placeholder="Enter Email" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Phone:" label-for="input-4">
        <b-form-input
          id="input-4" v-model="form.phone" type="number" placeholder="Enter Phone Number" required></b-form-input>
      </b-form-group>

      <b-button variant="light"><router-link :to="{ name: 'lecturers_index'}">Back</router-link></b-button>
      <b-button type="submit" variant="primary" @click="createLecturer()">Create Lecturer</b-button>
    </b-form>

  </div>
</template>

<script>
import axios from '@/config/api';

export default {
  name: 'LecturersCreate',
  components: {
  },
  data() {
    return {
      form: {
        name: "",
        address: "",
        email: "",
        phone: "",
      },
      errors: {}
    }
  },
  mounted(){

  },
  methods: {
    createLecturer() {
      let token = localStorage.getItem('token');


      axios.post('/lecturers', {
        name: this.form.name,
        address: this.form.address,
        email: this.form.email,
        phone: this.form.phone,
      },
      {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.$router.push({ name: 'lecturers_index' });
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
</style>
