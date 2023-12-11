# react-18

## Hooks

1. useRef - container to have the same value between renders, get hold of specific dom node
2. using memo() the component will get re-rendered only if the props are changed
3. useReducer() for managing more complex state (update to useState), Redux heavilly depends on it
4. useMemo use Callback - performance optimizations (when using three.js, when some complex calculation is preformed) - use when you have junky ui
5. useLayoutEffect - synchrnously called after render
6. useId


## useDeferredValue - low priority re-rendering
## useTransition