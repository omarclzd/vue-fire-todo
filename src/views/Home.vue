<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div class="title">What do I need to do today?</div>
    <input v-model="myTodo" />
    <button @click="addTodo">Add</button>
    <div v-if="errors !== ''" id="errors">{{ errors }}</div>
  </div>
</template>

<script>
import { db } from "@/main";

export default {
  name: "home",
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
        db.collection("items")
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
  background: #8ac8e5;
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