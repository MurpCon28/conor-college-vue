<template>
  <div>
    <b-card>
      <h4>Name: </h4> {{ lecturer.name }} <br>
      <h4>Address: </h4> {{ lecturer.address }}<br>
      <h4>Email: </h4> {{ lecturer.email }}<br>
      <h4>Phone: </h4> {{ lecturer.phone }}<br>
      <br>
      <b-button variant="light">
        <router-link :to="{name: 'lecturers_index'}">
        Back
      </router-link>
      </b-button>

      <b-button variant="warning">
        <b-icon icon="pencil"></b-icon>
        <router-link :to="{name: 'lecturers_edit'}" class="yellowButtonFont">
        Edit
      </router-link>
    </b-button>

    <b-button variant="danger" @click="deleteEnrolments()"><b-icon icon="trash"></b-icon> Delete</b-button>

    <br><br>
    <h3>Enrolments</h3>

    <b-table striped hover :items="lecturer.enrolments">
       <template #cell(title)="data">
        <router-link :to="{ name: 'lecturers_show', params: { id: data.item.id }}">{{ data.item.name }}</router-link>
      </template>
    </b-table>

    </b-card>
  </div>
</template>

<script>
import axios from '@/config/api';

export default {
  name: 'LecturersShow',
  components: {
  },
  data() {
    return {
      lecturer: {}
    }
  },
  mounted(){
    let token = localStorage.getItem('token');

    axios.get(`/lecturers/${this.$route.params.id}`, {
      headers: { Authorization: "Bearer " + token}
    })
    .then(response => {
      console.log(response.data);
      this.lecturer = response.data.data;

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
          .catch(error => {
            console.log(error);
          });
      });
  // delete course or lecturer
      axios
        .delete("/lecturers/" + this.lecturer.id, {
          headers: { Authorization: "Bearer " + token }
        })
        .then(response => {
        //do something
        console.log(response.data)
        this.$router.push({ name: 'lecturers_index' });
        // this.$router.replace({ name: 'courses_index' });
        })
        .catch(error => {
          console.log(error);
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
