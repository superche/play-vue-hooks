<template>
  <div class="hello">
    <img width="200" src="../assets/logo.png" @click="countCallback" />
    <h1>{{ msg }}</h1>
    <h2>{{ count }}</h2>
    <h1 id="eventcallback-clicker" @click="callback">
      Click Me! Event Callback
    </h1>
    <h2>{{ eventCallbackCount }}</h2>
    <ul>
      oh wow that is cool
    </ul>
  </div>
</template>

<script>
import { from } from "rxjs";
import { switchMap, map, withLatestFrom } from "rxjs/operators";
import { useEventCallback } from "../rxjs-hooks";

export default {
  name: "hello",
  hooks() {
    let [countCallback, count] = useEventCallback((event$, state$) => {
      return event$.pipe(
        withLatestFrom(state$),
        map((event, value) => value + 1)
      );
    }, 0);

    let [callback, eventCallbackCount] = useEventCallback(event$ => {
      return event$.pipe(
        switchMap(event =>
          from(new Promise(resolve => resolve(Math.random() * event.clientX)))
        )
      );
    }, 0);

    return {
      callback,
      eventCallbackCount,
      countCallback,
      count
    };
  },
  data() {
    return {
      msg: "Click Vue.js Logo"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

img:hover,
#eventcallback-clicker:hover {
  cursor: pointer;
}
</style>
