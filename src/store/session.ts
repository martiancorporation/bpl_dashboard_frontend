import { getLocalStorageData } from "@/utility";
import { create } from "zustand";

// Define types
interface PropertyHost {
  [key: string]: any;
}

export interface UserSession {
  id: string;
  name: string;
  property_host?: PropertyHost;
  [key: string]: any; // Optional additional fields
}

interface SessionState {
  userSession: UserSession | null;
  isLoading: boolean;
  isUnauthorized: boolean;
  // Actions
  loadingStart: () => void;
  loadingStop: () => void;
  login: (userSession: UserSession) => void;
  logout: () => void;
  signup: (userSession: UserSession) => void;
  updateSession: (updatedData: Partial<UserSession>) => void;
  setUnauthorizedAccess: (state: boolean) => void;
  loadSessionFromLocal: () => void;
}

// Create Zustand store
const useSessionStore = create<SessionState>((set) => ({
  userSession: getLocalStorageData<UserSession>("userSession"),
  isLoading: false,
  isUnauthorized: false,

  loadingStart: () => set({ isLoading: true }),
  loadingStop: () => set({ isLoading: false }),

  login: (userSession) => {
    set({ userSession });
    localStorage.setItem("userSession", JSON.stringify(userSession));
  },

  logout: () => {
    set({ userSession: null });
    localStorage.removeItem("persist:bpl_dashboard");
    localStorage.removeItem("userSession");
  },

  signup: (userSession) => {
    set({ userSession });
    localStorage.setItem("userSession", JSON.stringify(userSession));
  },

  updateSession: (updatedData: Partial<UserSession>) => {
    set((state) => {
      const newSession: UserSession = {
        ...state.userSession!,
        ...updatedData,
      };
      localStorage.setItem("userSession", JSON.stringify(newSession));
      return { userSession: newSession } as Partial<SessionState>;
    });
  },

  setUnauthorizedAccess: (stateVal) => {
    set({ isUnauthorized: stateVal });
  },

  loadSessionFromLocal: () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("userSession");
      if (stored) {
        set({ userSession: JSON.parse(stored) });
      }
    }
  },
}));

export default useSessionStore;
