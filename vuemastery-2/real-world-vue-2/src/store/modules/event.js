import EventService from "@/services/EventService.js";

export const namespaced = true;

export const state = {
  events: [],
  event: {},
  eventsCount: 0,
  perPage: 3
};

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENTS_COUNT(state, total) {
    state.eventsCount = total;
  },
  SET_EVENT(state, event) {
    state.event = event;
  }
};
export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit("ADD_EVENT", event);
        const notification = {
          type: "success",
          message: "Your notification has been created!"
        };
        dispatch("notification/add", notification, { root: true });
      })
      .catch(error => {
        const notification = {
          type: "error",
          message: "There was a problem creating event: " + error.message
        };
        dispatch("notification/add", notification, { root: true });
        throw error;
      });
  },
  fetchEvents({ commit, dispatch, state }, { page }) {
    return EventService.getEvents(state.perPage, page)
      .then(response => {
        commit("SET_EVENTS_COUNT", response.headers["x-total-count"]);
        commit("SET_EVENTS", response.data);
      })
      .catch(error => {
        const notification = {
          type: "error",
          message: "There was a problem fetching events: " + error.message
        };
        dispatch("notification/add", notification, { root: true });
      });
  },
  fetchEvent({ commit, getters }, id) {
    //dispatch
    var event = getters.getEventById(id);
    if (event) {
      commit("SET_EVENT", getters.getEventById(id));
      return event;
    } else
      return EventService.getEvent(id).then(response => {
        commit("SET_EVENT", response.data);
        return response.data;
      });
    // .catch(error => {
    //   const notification = {
    //     type: "error",
    //     message: "There was a problem fetching event: " + error.message
    //   };
    //   dispatch("notification/add", notification, { root: true });
    // });
  }
};
export const getters = {
  // catLength: state => {
  //   return state.categories.length;
  // },
  // doneTodos: state => {
  //   return state.todos.filter(todo => todo.done);
  // },
  // // Pass getter to getter
  // activeTodosCount: (state, getters) => {
  //   return state.todos.length - getters.doneTodos.length;
  // },
  getEventById: state => id => {
    return state.events.find(event => event.id === id);
  }
};
