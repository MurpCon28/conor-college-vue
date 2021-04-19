<template>
  <div>
    <h3 class="home">This is the lecturers Index page</h3>

    <div v-if="loggedIn" class="home">
      <h4>You can view lecturers</h4>
    </div>
    <div v-else class="home">
      <h4>You need to be logged to see lecturers</h4>
    </div>

    <!-- <button @click="getLecturers()">Get Lecturers</button>

    <button @click="logout()">Logout</button> -->

    <br>
    <div class="float-right">
      <input type="text" v-model="term" placeholder=" Search Name or Email" class="textbox" />
      <b-button @click="searchLecturers()"><b-icon icon="search"></b-icon></b-button>
    </div>

    <br>
      <br>
        <b-button variant="outline-primary">
          <router-link :to="{ name: 'lecturers_create'}" class="whiteButtonFont">Create Lecturer</router-link>
        </b-button>
      <br>
    <br>

    <b-table striped hover :items="filterLecturers" :fields="fields">
      <template #cell(name)="data">
        <router-link :to="{ name: 'lecturers_show', params: { id: data.item.id }}">{{ data.item.name }}</router-link>
      </template>
      <template #cell(action)="data">
        <b-button variant="primary">
          <b-icon icon="eye"></b-icon>
            <router-link :to="{ name: 'lecturers_show', params: { id: data.item.id }}" class="blueButtonFont"> View</router-link>
        </b-button>
        <b-button variant="warning">
          <b-icon icon="pencil"></b-icon>
            <router-link :to="{ name: 'lecturers_edit', params: { id: data.item.id }}" class="yellowButtonFont"> Edit</router-link>
        </b-button>
      </template>
    </b-table>

  </div>
</template>

<script>
import axios from '@/config/api';

export default {
  name: 'LecturersIndex',
  components: {
  },
  props: {
    loggedIn: Boolean
  },
  data() {
    return {
      fields: [
        {
          key: 'name',
          sortable: true,
        },
        'email',
        'action',
        ],
      enrolments: [],
      term: "",
      filterLecturers: [],
      lecturers: [],
      selectedCourses: [],
      selectedLecturers: []
    }
  },
  watch: {
    term: function(newTerm, oldTerm) {
      console.log('New: ', newTerm)
      console.log('Old: ', oldTerm)
      this.searchLecturers();
    }
  },
  mounted(){
    this.getLecturers();
  },
  methods: {
    searchLecturers() {
      this.filterLecturers = this.lecturers.filter(lecturers =>{
        if (lecturers.name.toLowerCase().includes(this.term.toLowerCase())) {
          return true
        }

        if (lecturers.email.toLowerCase().includes(this.term.toLowerCase())) {
          return true
        }
      });
    },
    getLecturers() {
      let token = localStorage.getItem('token');

      axios.get('/lecturers', {
        headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
        console.log(response.data);
        this.lecturers = response.data.data;
        this.filterLecturers = response.data.data;

      })
      .catch(error => {
        console.log(error)
        console.log(error.response.data)
      })
    },

    // getLecturers() {
    //   let token = localStorage.getItem('token');
    //
    //   axios.get('/courses', {
    //     headers: { Authorization: "Bearer " + token}
    //   })
    //   .then(response => {
    //     console.log(response.data);
    //     this.courses = response.data.data;
    //
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     console.log(error.response.data)
    //   })
    // },

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
    }
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
