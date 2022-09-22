<template>
  <b-jumbotron
    bg-variant="light"
    :header="'Welcome ' + name + '!'"
    lead="This is a simple hero unit, a simple jumbotron-style component for calling
      extra attention to featured content or information."
  >
    <hr class="my-4" />
    <p>
      It uses utility classes for typography and spacing to space content out
      within the larger container.
    </p>
    <b-button class="primary-el" href="#">Learn more</b-button>
  </b-jumbotron>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      name: this.$store.getters["auth/user"].name,
    };
  },
};
</script>