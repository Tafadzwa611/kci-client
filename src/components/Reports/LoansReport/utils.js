import { useState, useRef } from 'react';

export function useAsyncReference(value) {
  const ref = useRef(value);
  const [, forceRender] = useState(false);
  function updateState(newState) {
    ref.current = newState;
    forceRender(s => !s);
  }
  return [ref, updateState];
}

export function debounceFunction (func, delay) {
  let timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, delay)
  }
}