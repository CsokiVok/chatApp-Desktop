import { create } from "zustand";
import { axioss } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

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

      // Frissítsük az axios fejlécet a tokennel
      const token = localStorage.getItem("token");
      if (token) {
        axioss.defaults.headers.Authorization = `Bearer ${token}`;
      }
      get().connectSocket();
    } catch (error) {
      set({ authUser: null });
      console.log("checkAuth error (useAuthStore)", error);
    } finally {
      set({ checkingAuth: false });
    }
  },

  signup: async (data) => {
    try {
      const res = await axioss.post("/auth/signup", data);
      localStorage.setItem("token", res.data.token); // Token mentése
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
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
    try {
      const res = await axioss.post("/auth/login", data);
      localStorage.setItem("token", res.data.token); // Token mentése
      set({ authUser: res.data });
      get().connectSocket();

      // Oldal újratöltése a bejelentkezés után
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message);
    }
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
