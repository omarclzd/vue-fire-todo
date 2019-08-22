<template>
  <span>
    <v-navigation-drawer app v-model="drawer" class="brown lighten-2" dark disable-resize-watcher>
      <v-list>
        <template v-for="(item, index) in items">
          <v-list-tile :key="index">
            <v-list-tile-content>{{item.title}}</v-list-tile-content>
          </v-list-tile>
          <v-divider :key="`divider-${index}`"></v-divider>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app color="green darken-4" dark>
      <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer class="hidden-md-and-up"></v-spacer>
      <router-link to="/">
        <v-toolbar-title to="/">{{appTitle}}</v-toolbar-title>
      </router-link>
      <div v-if="this.$store.getters.getUser">
        <div>{{ user }}</div>
      </div>

      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <div v-if="!isAuthenticated" class="hidden-sm-and-down">
        <v-btn flat to="/sign-in">SIGN IN</v-btn>
        <v-btn color="green lighten-3" to="/join">JOIN</v-btn>
      </div>
      <div v-else class="hidden-sm-and-down">
        <v-btn flat to="/profile">PROFILE</v-btn>
        <v-btn flat small color="black" @click="logout">Logout</v-btn>
      </div>
    </v-toolbar>
  </span>
</template>


<script>
export default {
  name: "AppNavigation",
  data() {
    return {
      appTitle: "Vue Todo",
      drawer: false,
      items: [{ title: "Home" }, { title: "Sign In" }, { title: "Join" }]
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("userSignOut");
    }
  }
};
</script>

<style scoped>
a {
  color: white;
  text-decoration: none;
}
</style>