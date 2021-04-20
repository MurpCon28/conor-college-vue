<template>
  <div>
  <b-navbar type="dark" variant="dark">
    <b-navbar-nav>
      <!-- <router-link to="/">Home</router-link> -->
      <b-nav-item to="/">Home</b-nav-item>
      <b-nav-item :to="{name: 'courses_index'}">Courses</b-nav-item>
      <b-nav-item :to="{name: 'enrolments_index'}">Enrolments</b-nav-item>
      <b-nav-item :to="{name: 'lecturers_index'}">Lecturers</b-nav-item>

      <div v-if="loggedIn">
        <b-button @click="logout()"><b-icon icon="power" aria-hidden="true"></b-icon> Logout</b-button>
      </div>
      <div v-else>
        <b-nav-item :to="{name: 'login'}" class="float-left">Login</b-nav-item>
        <b-nav-item :to="{name: 'register'}" class="float-right">Register</b-nav-item>
      </div>
      <!-- <router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link> -->
    </b-navbar-nav>
  </b-navbar>
</div>
</template>

<script>
  export default {
    name: "NavBar",
    props: {
      loggedIn: Boolean //<-- this is new line
    },
    methods: {
      logout() {
      localStorage.removeItem('token'); // optionally, can now move this to App.vue's logout method
      this.$emit('logout'); //<-- tells App.vue to update loggedIn
      this.$router.push('/');
    }
    }
  }
</script>

<style>
.navbar {
  margin-bottom: 40px;
}
</style>
