<template>
  <button @click="getUserInfo">getUserInfo</button>
</template>

<script>

import axios from "axios";

export default {
  name:'HomeLogin',
  methods:{
    getUserInfo() {
      axios.get('/WebServer/home/get-user-info?id=1', null, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
    }
  }
}
</script>