import { create } from "zustand";

interface CurrentModalStore {
  url: boolean;
  email: boolean;
  sms: boolean;
  onOpenURL: () => void;
  onOpenEmail: () => void;
  onOpenSMS: () => void;
}

const useStaticCurrentType = create<CurrentModalStore>((set) => ({
  url: false,
  email: false,
  sms: false,
  onOpenURL: () => set({ url: true, email: false, sms: false }),
  onOpenEmail: () => set({ url: false, email: true, sms: false }),
  onOpenSMS: () => set({ url: false, email: false, sms: true }),
}));

export default useStaticCurrentType;
