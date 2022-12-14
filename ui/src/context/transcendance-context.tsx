import {
  createContext,
  Dispatch,
  FC,
  ReactElement,
  useReducer,
} from "react";

import {
  transcendanceReducer,
  initialTranscendanceState,
  transcendanceState,
  TranscendanceStateAction,
} from "./transcendance-reducer";

export const TranscendanceContext = createContext<{
  transcendanceState: transcendanceState;
  dispatchTranscendanceState: Dispatch<TranscendanceStateAction>;
}>({
  transcendanceState: initialTranscendanceState,
  dispatchTranscendanceState: () => null,
});

export const TranscendanceProvider: FC<{ children: ReactElement }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    transcendanceReducer,
    initialTranscendanceState
  );

  return (
    <TranscendanceContext.Provider
      value={{
        transcendanceState: state,
        dispatchTranscendanceState: dispatch,
      }}
    >
      {children}
    </TranscendanceContext.Provider>
  );
};
