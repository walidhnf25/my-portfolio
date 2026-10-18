import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * False during SSR and the hydrating render, true afterwards. Same contract as the
 * `useEffect(() => setMounted(true), [])` idiom, but through useSyncExternalStore
 * so it does not set state inside an effect (and costs no extra render pass).
 */
export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
