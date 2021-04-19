<template>
  <div>
    <h3 class="home">This is the Courses Index page</h3>

    <div v-if="loggedIn" class="home">
      <h4>You can view courses</h4>
    </div>
    <div v-else class="home">
      <h4>You need to be logged to see courses</h4>
    </div>

    <!-- <button @click="getCourses()">Get Courses</button>

    <button @click="logout()">Logout</button> -->

    <br>
    <div class="float-right">
      <input type="text" v-model="term" placeholder=" Search Title or Code" class="textbox" />
      <b-button @click="searchCourse()"><b-icon icon="search"></b-icon></b-button>
    </div>

    <br>
      <br>
        <b-button variant="outline-primary">
          <router-link :to="{ name: 'courses_create'}" class="whiteButtonFont">Create Course</router-link>
        </b-button>
      <br>
    <br>

    <b-table striped hover :items="filterCourses" :fields="fields">
      <template #cell(title)="data">
        <router-link :to="{ name: 'courses_show', params: { id: data.item.id }}">{{ data.item.title }}</router-link>
      </template>
      <template #cell(action)="data">
        <b-button variant="primary">
          <b-icon icon="eye"></b-icon>
            <router-link :to="{ name: 'courses_show', params: { id: data.item.id }}" class="blueButtonFont"> View</router-link>
        </b-button>
        <b-button variant="warning">
          <b-icon icon="pencil"></b-icon>
            <router-link :to="{ name: 'courses_edit', params: { id: data.item.id }}" class="yellowButtonFont"> Edit</router-link>
        </b-button>

        <!-- <b-button variant="danger" @click="deleteEnrolments()">
          <b-icon icon="trash"></b-icon>
          Delete
        </b-button> -->
      </template>
    </b-table>

  </div>
</template>

<script>
import axios from '@/config/api';

export default {
  name: 'CourseIndex',
  components: {
  },
  props: {
    loggedIn: Boolean
  },
  data() {
    return {
      fields: [
        {
          key: 'title',
          sortable: true,
        },
        'code',
        {
          key: 'points',
          sortable: true,
        },
        {
          key: 'level',
          sortable: true,
        },
        'action',
        ],
      courses: [],
      term: "",
      filterCourses: [],
      lecturers: [],
      selectedCourses: [],
      selectedLecturers: []
    }
  },
  watch: {
    term: function(newTerm, oldTerm) {
      console.log('New: ', newTerm)
      console.log('Old: ', oldTerm)
      this.searchCourse();
    }
  },
  mounted(){
    this.getCourses();
    this.getLecturers();
  },
  methods: {
    searchCourse() {
      this.filterCourses = this.courses.filter(course =>{
        if (course.title.toLowerCase().includes(this.term.toLowerCase())) {
          return true
        }

        if (course.code.toLowerCase().includes(this.term.toLowerCase())) {
          return true
        }
      });
    },
    getCourses() {
      let token = localStorage.getItem('token');

      axios.get('/courses', {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.courses = response.data.data;
        this.filterCourses = response.data.data;

      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
    },

    getLecturers() {
      let token = localStorage.getItem('token');

      axios.get('/courses', {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.courses = response.data.data;

      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
    },

    logout() {
      let token = localStorage.getItem('token');

      axios.get('/logout', {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        console.log("LOGGED OUT");
      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })

      localStorage.removeItem('token');
    },
  //   deleteEnrolments() {
  //     let token = localStorage.getItem("token");
  //
  // // loop through enrolments and send delete request to delete them
  //     this.course.enrolments.forEach((enrolment) => {
  //       axios
  //         .delete("/enrolments/" + enrolment.id, {
  //           headers: { Authorization: "Bearer " + token }
  //         })
  //         .catch(error => {
  //           console.log(error);
  //         });
  //     });
  // // delete course or lecturer
  //     axios
  //       .delete("/courses/" + this.course.id, {
  //         headers: { Authorization: "Bearer " + token }
  //       })
  //       .then(response => {
  //       //do something
  //       console.log(response.data)
  //       this.$router.push({ name: 'courses_index' });
  //       // this.$router.replace({ name: 'courses_index' });
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   },
  },
}
</script>
<style>
.home {
  text-align: center;
}
.blueButtonFont{
  color: white;
}
.blueButtonFont:hover{
  color: white;
  text-decoration: none;
}
.whiteButtonFont:hover{
  color: white;
  text-decoration: none;
}
.yellowButtonFont{
  color: black;
}
.yellowButtonFont:hover{
  color: black;
  text-decoration: none;
}
.textbox[type=text] {
  padding-top:3px;
  padding-bottom:7px;
  border: 2px solid gray;
  border-radius: 4px;
}
.textbox[type=text]:focus {
  background-color: lightblue;
}
</style>
