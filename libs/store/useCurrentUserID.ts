import { create } from "zustand";

interface useCurrentUserIdProps {
  userId: string;
  setUserId: (e: string) => void;
}

const useCurrentUserID = create<useCurrentUserIdProps>((set) => ({
  userId: "",
  setUserId: (e: string) => set({ userId: e }),
}));

export default useCurrentUserID;
