<template>
    <div>
      <h1>{{ this.msg }}</h1>
    </div>
</template>

<script>import axios from "axios";
export default {
  name: "Test",
  data() {
    return {
      msg: "",
    };
  },
  created() {
    axios
      .get("http://localhost:3000/test")
      .then((res) => {
        this.msg = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
</style>