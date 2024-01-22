import { useEffect } from "react";

type Callback = () => void;

const useWillUnmount = (callback: Callback): void => {
  useEffect(() => {
    return callback;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export { useWillUnmount };
