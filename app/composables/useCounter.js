export function useCounter() {
  const count = useState('count', () => 0)

  function increase() {
    count.value++
  }

  return { count, increase }
}