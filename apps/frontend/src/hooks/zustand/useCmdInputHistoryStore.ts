import { create } from "zustand";

type Union<T> = T | (string & Record<never, never>);

export type Command =
  | "help"
  | "clear"
  | "about"
  | "post"
  | "need-ai"
  | "not-found";

export type CmdInputHistory = Union<Command>;

export interface CmdInputHistoryWithKey {
  cmdInputHistory: CmdInputHistory;
  key: string;
}

const appendKey = (
  cmdInputHistory: CmdInputHistory[],
): CmdInputHistoryWithKey[] => {
  return cmdInputHistory.map<CmdInputHistoryWithKey>((cmdInput) => ({
    cmdInputHistory: cmdInput,
    key: `${Date.now()}`,
  }));
};

interface Store {
  // cmdInputHistory: CmdInputHistory[];
  cmdInputHistory: CmdInputHistoryWithKey[];
  setCmdInputHistory: (cmdInputHistory: CmdInputHistory[]) => void;
  pushCmdInput: (cmdInput: CmdInputHistory) => void;
  clearCmdInputHistory: () => void;
}

export const useCmdInputHistoryStore = create<Store>((set, get) => ({
  cmdInputHistory: [],
  setCmdInputHistory: (cmdInputHistory): void =>
    set(() => {
      const nextCmdInputHistory = appendKey(cmdInputHistory);
      return { cmdInputHistory: nextCmdInputHistory };
    }),
  pushCmdInput: (cmdInput): void =>
    set(() => {
      const preCmdInputHistory = get().cmdInputHistory;
      const cmdInputHistoryWithKey = appendKey([cmdInput]);
      return {
        cmdInputHistory: [...preCmdInputHistory, ...cmdInputHistoryWithKey],
      };
    }),
  clearCmdInputHistory: (): void => set({ cmdInputHistory: [] }),
}));
