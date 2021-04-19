<template>
  <div>
    <NavBar :loggedIn="this.loggedIn" v-on:login="setLoggedIn" v-on:logout="setLoggedOut" />
        <b-container>
          <vue-page-transition name="fade-in-up">
            <router-view :loggedIn="this.loggedIn" v-on:login="setLoggedIn" v-on:logout="setLoggedOut" />
          </vue-page-transition>
        </b-container>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  },
  props: {
    loggedIn: Boolean
  },
  data() {
    return {
      // loggedIn: false
    }
  },
  created() {
    if (localStorage.getItem('token')) {
      this.loggedIn = true;
      console.log("APP: ",this.loggedIn);
    }
    else {
      this.loggedIn = false;
    }
  },
  methods: {
    setLoggedIn() {
      this.loggedIn = true;
            // optionally, you could store the token in localStorage here
    },
    setLoggedOut() {
      this.loggedIn = false;
            // optionally, you could trigger the whole logout process here
    }
  }
}
</script>

<style>

</style>
