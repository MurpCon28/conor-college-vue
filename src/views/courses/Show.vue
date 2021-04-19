<template>
  <div>
    <b-card>
      <h4>Title: </h4> {{ course.title }} <br>
      <h4>Code: </h4> {{ course.code }}<br>
      <h4>Description: </h4> {{ course.description }}<br>
      <h4>Points: </h4> {{ course.points }}<br>
      <h4>Level: </h4> {{ course.level }}<br>

      <br>
      <b-button variant="light">
        <router-link :to="{name: 'courses_index'}">
          Back
        </router-link>
      </b-button>

      <b-button variant="warning">
        <b-icon icon="pencil"></b-icon>
        <router-link :to="{name: 'courses_edit'}" class="yellowButtonFont">
          Edit
        </router-link>
    </b-button>

    <b-button variant="danger" @click="deleteEnrolments()"><b-icon icon="trash"></b-icon> Delete</b-button>

      <br><br>
      <h3>Enrolments</h3>

      <b-table striped hover :items="course.enrolments">
         <template #cell(title)="data">
          <router-link :to="{ name: 'courses_show', params: { id: data.item.id }}">{{ data.item.title }}</router-link>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
import axios from '@/config/api';

export default {
  name: 'CoursesShow',
  components: {
  },
  data() {
    return {
      course: {}
    }
  },
  mounted(){
    let token = localStorage.getItem('token');

    axios.get(`/courses/${this.$route.params.id}`, {
      headers: { Authorization: "Bearer " + token}
    })
    .then(response => {
      console.log(response.data);
      this.course = response.data.data;

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
      this.course.enrolments.forEach((enrolment) => {
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
        .delete("/courses/" + this.course.id, {
          headers: { Authorization: "Bearer " + token }
        })
        .then(response => {
        //do something
        console.log(response.data)
        this.$router.push({ name: 'courses_index' });
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
.home {
  text-align: center;
}
.yellowButtonFont{
  color: black;
}
.yellowButtonFont:hover{
  color: black;
  text-decoration: none;
}
</style>
