<template>
  <div>
    <h1>Ohh..</h1>
    <p>Seems like you have a network problems. Please try again.</p>
    <router-link :to="{ name: 'event-list' }"
      >Or go to the home page!</router-link
    >
  </div>
</template>
