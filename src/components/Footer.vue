<template>
  <footer class="py-2 navbar fixed-bottom bg-light">
    <b-container class="justify-content-center">
      <span
        >Place footer content here &copy;&nbsp;{{
          projectDate.getFullYear()
        }}</span
      >
    </b-container>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      projectDate: new Date(),
    };
  },
};
</script>