import { useAppDispatch } from "@/store/hooks";
import type { FetchingState } from "@/store/slices/type";
import type { AsyncThunkAction } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";

export default function useFetch(
  thunkCallback: () => AsyncThunkAction<any, any, any>
) {
  const [state, setState] = useState<FetchingState>("idle");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(thunkCallback()).then((arg) => {
      if (arg.meta.requestStatus == "fulfilled") setState("succeeded");
      else if (arg.meta.requestStatus == "rejected") setState("failed");
      else setState("loading");
    });
  }, []);

  return state;
}
