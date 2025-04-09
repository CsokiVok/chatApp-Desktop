import { create } from "zustand";
import { axioss } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5001";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  signingUp: false,
  loggingin: false,
  updatingProfile: false,
  checkingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axioss.get("/auth/check");
      set({ authUser: res.data });

      get().connectSocket();
    } catch (error) {
      set({ authUser: null });
      console.log("checkAuth error (useAuthStore)", error);
    } finally {
      set({ checkingAuth: false });
    }
  },

  signup: async (data) => {
    set({ signingUp: true }); // Állapot beállítása
    try {
      const res = await axioss.post("/auth/signup", data);
      localStorage.setItem('token', res.data.token); // Token mentése a helyi tárolóba
      toast.success("Signup successful");
      set({ authUser: res.data });

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ signingUp: false }); // Állapot visszaállítása
    }
  },

  logout: async () => {
    try {
      await axioss.post("/auth/logout")
      set({ authUser: null })
      localStorage.removeItem('token'); // Token eltávolítása a helyi tárolóból
      toast.success("Logged out")

      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  login: async (data) => {
    set({ loggingin: true })
    try {
      const res = await axioss.post("/auth/login", data);
      localStorage.setItem('token', res.data.token); // Token mentése a helyi tárolóba
      toast.success("Login succesful");
      set({ authUser: res.data });

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally { set({ loggingin: false }) }
  },

  updateProfile: async (data) => {
    try {
      const res = await axioss.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated succesfully")
    } catch (error) {
      console.log("Error in update profile", error);
      toast.error("Error")
    } finally {
      set({ updatingProfile: false })
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds })
    })
  },

  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
    }
  }
}));
