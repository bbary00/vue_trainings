<template>
  <div>
    <h1>Ooops..</h1>
    <p>The {{ resource }} you're looking for is not found!</p>
    <router-link :to="{ name: 'event-list' }">Home</router-link>
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      required: true
    }
  }
};
</script>
