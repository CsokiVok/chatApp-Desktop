import { create } from "zustand";
import toast from "react-hot-toast";
import { axioss } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,

    getUsers: async () => {
        try {
            const res = await axioss.get("/messages/users");
            set({ users: res.data })
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    getMessages: async (userId) => {
        try {
            const res = await axioss.get(`/messages/${userId}`);
            set({ messages: res.data })
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    sendMessage: async (data) => {
        const { selectedUser, messages } = get();

        try {
            const res = await axioss.post(`/messages/send/${selectedUser._id}`, data)
            set({ messages: [...messages, res.data] })
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    subscribeToMessages: () => {
        const {selectedUser} = get();
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            if(newMessage.senderId !== selectedUser._id) return
            set({
                messages: [...get().messages, newMessage],
            });
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage")
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}))