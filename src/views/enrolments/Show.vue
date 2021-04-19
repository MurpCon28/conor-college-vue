<template>
  <div>
<b-card>
  <h4>Date: </h4> {{ enrolment.date }} <br>
  <h4>Time: </h4> {{ enrolment.time }}<br>
  <h4>Status: </h4> {{ enrolment.status }}<br>
  <h4>Course Id: </h4> {{ enrolment.course_id }}<br>
  <h4>Lecturer Id: </h4> {{ enrolment.lecturer_id }}<br>
  <br>
  <b-button variant="light">
    <router-link :to="{name: 'enrolments_index'}">
    Back
  </router-link>
  </b-button>

  <b-button variant="warning">
    <b-icon icon="pencil"></b-icon>
    <router-link :to="{name: 'enrolments_edit'}" class="yellowButtonFont">
    Edit
  </router-link>
</b-button>

<b-button variant="danger" @click="deleteEnrolments()"> <b-icon icon="trash"></b-icon> Delete</b-button>

</b-card>
  </div>
</template>

<script>
import axios from '@/config/api';

export default {
  name: 'EnrolmentsShow',
  components: {
  },
  data() {
    return {
      enrolment: {}
    }
  },
  mounted(){
    let token = localStorage.getItem('token');

    axios.get(`/enrolments/${this.$route.params.id}`, {
      headers: { Authorization: "Bearer " + token}
    })
    .then(response => {
      console.log(response.data);
      this.enrolment = response.data.data;

    })
    .catch(error => {
      console.log(error)
      console.log(error.response.data)
    })
  },
  methods: {
    deleteEnrolments() {
      let token = localStorage.getItem("token");

  // loop through enrolments and send delete request to delete them
  this.lecturer.enrolments.forEach((enrolment) => {
        axios
          .delete("/enrolments/" + enrolment.id, {
            headers: { Authorization: "Bearer " + token }
          })
          .then(response => {
          //do something
          console.log(response.data)
          this.$router.push({ name: 'enrolments_index' });
          })
          .catch(error => {
            console.log(error);
          });
        });
    },
  },
}
</script>

<style>
.yellowButtonFont{
  color: black;
}
.yellowButtonFont:hover{
  color: black;
  text-decoration: none;
}
</style>
