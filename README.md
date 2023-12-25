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

## vtest for testing

## try to test functionality not implementation - don't test that the hook has the correct value in it, test that the user interface is working the way that the user would have expected to, approach tests as user approaches application

## when testing it is ok to map api requests

## Snapshot testing - not very usefull, low effort, low confidence testing - if we have something that we expect never to change, can be used for api response testing (json...)
