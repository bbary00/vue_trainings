<template>
  <div>
    <h1>Create event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
        @blur="$v.event.category.$touch()"
        :class="{ error: $v.event.category.$error }"
      />
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">
          Categoty is required
        </p>
      </template>
      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        v-model="event.title"
        type="text"
        placeholder="Title"
        class="field"
        @blur="$v.event.title.$touch()"
        :class="{ error: $v.event.title.$error }"
      />
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">
          Title is required
        </p>
      </template>

      <div class="field">
        <BaseInput
          label="Description"
          v-model="event.description"
          type="text"
          placeholder="Description"
          class="field"
          @blur="$v.event.description.$touch()"
          :class="{ error: $v.event.description.$error }"
        />
      </div>
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="errorMessage">
          Description is required
        </p>
      </template>

      <h3>Where is your event?</h3>
      <div class="field">
        <BaseInput
          label="Location"
          v-model="event.location"
          type="text"
          placeholder="Add a location"
          class="field"
          @blur="$v.event.location.$touch()"
          :class="{ error: $v.event.location.$error }"
        />
      </div>
      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">
          Location is required
        </p>
      </template>

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          @closed="$v.event.date.$touch()"
          :input-class="{ error: $v.event.date.$error }"
        />
      </div>
      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">
          Date is required
        </p>
      </template>

      <div class="field">
        <BaseSelect
          label="Select a time"
          v-model="event.time"
          :options="times"
          class="field"
          @blur="$v.event.time.$touch()"
          :class="{ error: $v.event.time.$error }"
        />
      </div>

      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">
          Time is required
        </p>
      </template>

      <BaseButton
        type="submit"
        buttonClass="-fill-gradient"
        :disabled="$v.$anyError"
        >Submit</BaseButton
      >
      <p v-if="$v.$anyError" class="errorMessage">
        Please fill out the required field(s).
      </p>
    </form>
    <!-- <p>The event was created by user {{ user.name }} with id {{ user.id }}</p>
    <ul>
      <li v-for="i in categories" :key="i">{{ i }}</li>
    </ul>
    <p>Test for local computed {{ localComputed }}</p>
    <p>There are {{ catLength }} categories.</p>
    <p>Get event by id 1: {{ getEventById(2) }}</p> -->
  </div>
</template>

<script>
// import { mapState, mapGetters } from "vuex";
import Datepicker from "vuejs-datepicker";
import NProgress from "nprogress";
import { required } from "vuelidate/lib/validators";

export default {
  components: {
    Datepicker
  },
  data() {
    const times = [];
    for (let i = 1; i <= 24; i++) {
      times.push(i + ":00");
    }
    return {
      event: this.createFreshEvent(),
      times,
      categories: this.$store.state.categories
    };
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required }
    }
  },
  methods: {
    createEvent() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        NProgress.start();
        this.$store
          .dispatch("event/createEvent", this.event)
          .then(() => {
            this.$router.push({
              name: "event-show",
              params: { id: this.event.id }
            });
            this.event = this.createFreshEventObject();
          })
          .catch(() => {
            NProgress.done();
          });
      }
    },
    createFreshEvent() {
      const user = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 10000000);
      return {
        category: "",
        organizer: user,
        id: id,
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        attendees: []
      };
    }
  }
  // computed: {
  // getEvent() {
  //   return this.$store.getters.getEventById;
  // },
  // catLength() {
  //   return this.$store.getters.catLength;
  // },
  // localComputed() {
  //   return "aaa";
  // },
  // ...mapGetters(["getEventById"]),
  // mapState({
  //   userName: state => state.user.name,
  //   categories: state => state.categories
  // })
  // ...mapState(["user", "categories"])
  // }
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
