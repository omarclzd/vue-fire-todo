
  
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div class="title">What do I need to do today?</div>
    <input v-model="myTodo" />
    <button @click="addTodo">Add</button>
    <div v-if="errors !== ''" id="errors">{{ errors }}</div>

    <div v-if="this.$store.getters.getItems && this.$store.getters.getItems.length > 0">
      <div class="title">Today, you've got to do...</div>

      <div v-for="item in this.$store.getters.getItems" :key="item.id">
        {{ item.title }}
        <br />

        <br />
        <small style="text-decoration:underline;" @click="deleteItem(item.id)">Delete</small>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "home",
  beforeCreate: function() {
    this.$store.dispatch("setItems");
  },
  data: function() {
    return {
      myTodo: "",
      errors: ""
    };
  },
  methods: {
    addTodo: function() {
      this.errors = "";
      if (this.myTodo !== "") {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("items")
          .add({
            title: this.myTodo,
            created_at: new Date()
          })
          .then(response => {
            if (response) {
              this.myTodo = "";
            }
          })
          .catch(error => {
            this.errors = error;
          });
      } else {
        this.errors = "Please enter some text";
      }
    },
    deleteItem: function(id) {
      if (id) {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("items")
          .doc(id)
          .delete()
          .catch(function(error) {
            this.error = error;
          });
      } else {
        this.error = "Invalid Id";
      }
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
body,
html,
#app {
  background: lightgray;
}
.home {
  width: 300px;
  margin: auto;
}
#vue-logo {
  width: 100px;
}
input,
button {
  border: 0;
  width: 100%;
  margin: 0 0 10px;
  padding: 7px;
}
input {
  font-size: 12px;
}
button {
  background: #43b823;
  border: 0;
  text-transform: uppercase;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}
.title {
  font-size: 14px;
  font-weight: 700;
  padding: 0 0 10px 0;
  margin: 0 0 10px 0;
  border-bottom: 1px solid #666;
}
#errors {
  background: #a52222;
  color: #fff;
  padding: 5px;
}
</style>

