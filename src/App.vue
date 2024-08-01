<template>
  <div id="app">
    <Dashboard />
  </div>
</template>

<script>
import Dashboard from "./components/Dashboard.vue";

export default {
  name: "App",
  components: {
    Dashboard,
  },
};
</script>

<style>/* Global styles for the App component */
#app {
  font-family: 'Arial', sans-serif;
  text-align: center;
  color: #333;
  background-color: #f8f9fa;
  margin-top: 40px;
  min-height: 100vh;
}

#app h1 {
  font-size: 2.5em;
  color: #333;
}

button {
  border: none;
  border-radius: 4px;
  font-size: 1em;
}

</style>
