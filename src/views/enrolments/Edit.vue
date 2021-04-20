<template>
  <div>

    <b-form>
      <b-form-group id="input-group-1" label="Date:">
        <b-form-input
          id="input-1" v-model="form.date" type="date" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Time:" label-for="input-2">
        <b-form-input
          id="input-2" v-model="form.time" type="time" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Status:" label-for="input-3">
        <b-form-input
          id="input-3" v-model="form.status" type="text" placeholder="Enter Enrolment Status" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Course ID:" label-for="input-4">
        <b-form-input
          id="input-4" v-model="form.course_id" type="number" placeholder="Enter Course ID" required></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Lecturer ID:" label-for="input-5">
        <b-form-input
          id="input-5" v-model="form.lecturer_id" type="number" placeholder="Enter Lecturer ID" required></b-form-input>
      </b-form-group>

      <b-button variant="light"><router-link :to="{ name: 'enrolments_index'}">Back</router-link></b-button>
      <b-button type="submit" variant="primary" @click.prevent="createEnrolments()">Confirm Changes</b-button>
    </b-form>

  </div>
</template>

<script>
import axios from '@/config/api';

export default {
  name: 'EnrolmentsEdit',
  components: {
  },
  data() {
    return {
      fields: [
        {
          key: 'date',
          sortable: true,
        },
        {
          key: 'time',
          sortable: true,
        },
        'status',
        {
          key: 'course_id',
          sortable: true,
        },
        {
          key: 'lecturer_id',
          sortable: true,
        },
        // selected: null,
        // options: [
        //   { value: null, text: 'Please select an option' },
        //   { value: 'assigned', text: 'Assigned' },
        //   { value: 'associate', text: 'Associate' },
        //   { value: 'career_break', text: 'Career Break' },
        //   { value: 'interested', text: 'Interested' },
        // ],
        ],
      courses: [],
      form: {
        date: "",
        time: "",
        status: "",
        course_id: "",
        lecturer_id: "",
      },
      errors: {}
    }
  },
  mounted(){
    this.getEnrolments();
  },
  methods: {
    getEnrolments() {
      let token = localStorage.getItem('token');

      axios.get(`/enrolments/${this.$route.params.id}`, {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.form.date = response.data.data.date;
        this.form.time = response.data.data.time;
        this.form.status = response.data.data.status;
        this.form.course_id = response.data.data.course_id;
        this.form.lecturer_id = response.data.data.lecturer_id;

      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
    },
    editEnrolments() {
      let token = localStorage.getItem('token');


      axios.put(`/enrolments/${this.$route.params.id} `, {
        date: this.form.date,
        time: this.form.time,
        status: this.form.status,
        course_id: this.form.course_id,
        lecturer_id: this.form.lecturer_id,
      },
      {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.$router.push({ name: 'enrolments_index' });
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
