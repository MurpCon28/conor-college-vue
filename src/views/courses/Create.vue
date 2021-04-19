<template>
  <div>

    <b-form @submit="createCourse()">
      <b-form-group id="input-group-1" label="Title:">
        <b-form-input
          id="input-1" v-model="form.title" type="text" placeholder="Enter Course Title" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Code:" label-for="input-2">
        <b-form-input
          id="input-2" v-model="form.code" type="text" placeholder="Enter Course Code" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Description:" label-for="input-3">
        <b-form-input
          id="input-3" v-model="form.description" type="text" placeholder="Enter Course Description" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Points:" label-for="input-4">
        <b-form-input
          id="input-4" v-model="form.points" type="number" placeholder="Enter Points Needed" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Level:" label-for="input-5">
        <b-form-input
          id="input-5" v-model="form.level" type="number" placeholder="Enter Course Level" required></b-form-input>
      </b-form-group>

      <b-button variant="light"><router-link :to="{ name: 'courses_index'}">Back</router-link></b-button>
      <b-button type="submit" variant="primary" @click="createCourse()">Create Course</b-button>
    </b-form>

  </div>
</template>

<script>
import axios from '@/config/api';

export default {
  name: 'CourseCreate',
  components: {
  },
  data() {
    return {
      form: {
        title: "",
        code: "",
        description: "",
        points: "",
        level: "",
      },
      errors: {}
    }
  },
  mounted(){

  },
  methods: {
    createCourse() {
      let token = localStorage.getItem('token');


      axios.post('/courses', {
        title: this.form.title,
        code: this.form.code,
        description: this.form.description,
        points: this.form.points,
        level: this.form.level,
      },
      {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.$router.push({ name: 'courses_index' });
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
