import type { EffectCallback } from "react";
import { useEffect } from "react";

// eslint-disable-next-line react-hooks/exhaustive-deps, @typescript-eslint/explicit-function-return-type
const useDidMount = (effect: EffectCallback) => useEffect(effect, []);

export default useDidMount;
