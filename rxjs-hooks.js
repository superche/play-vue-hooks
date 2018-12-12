/**
 * rxjs hooks
 * Reference: git@github.com:LeetCode-OpenSource/rxjs-hooks.git
 */
import { Subject, BehaviorSubject } from "rxjs";
import { useState, useEffect } from "vue-hooks";

export function useEventCallback(callback, initialState) {
  const [returnedCallback, setEventCallback] = useState(() => null);
  const [state, setState] = useState(initialState);
  const [state$] = useState(new BehaviorSubject(initialState));
  useEffect(() => {
    const event$ = new Subject();
    setState(initialState);
    setEventCallback(e => event$.next(e));
    let value$ = callback(event$, state$);
    const subscription = value$.subscribe(value => {
      state$.next(value);
      setState(value);
    });
    return () => {
      subscription.unsubscribe();
      event$.complete();
      state$.complete();
    };
  }, []);
  return [returnedCallback, state];
}
