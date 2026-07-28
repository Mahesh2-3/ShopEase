import { useEffect, useState } from 'react';

// Delays updating the returned value until the input has stopped changing
// for `delay` ms. Handy for search-as-you-type inputs.
const useDebounce = (value, delay = 400) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};

export default useDebounce;
