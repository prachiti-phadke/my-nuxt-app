import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)                              // STATE: the data
  const double = computed(() => count.value * 2)    // GETTER: calculated from the data

  function increase() {                             // ACTION: changes the data
    count.value++
  }

  return { count, double, increase }
})