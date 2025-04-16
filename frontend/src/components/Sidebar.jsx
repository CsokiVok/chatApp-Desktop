import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { Users } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import Home from '../pages/Home';
import { Navigate, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const { getUsers, selectedUser, setSelectedUser, users } = useChatStore()
    const { onlineUsers } = useAuthStore()



    useEffect(() => {
        getUsers()
    }, [getUsers])



    return (
        <aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2 flex-wrap">
                    <Users className="size-4 shrink-0" />

                    <button
                        className="text-sm md:text-base hover:bg-base-300 transition-colors px-2 py-1 rounded max-w-[120px] sm:max-w-none truncate"
                        onClick={() => setSelectedUser(null)}
                    >
                        Felhasználók
                    </button>
                </div>
            </div>



            <div className="overflow-y-auto w-full scrollbar-hide py-3">
                {users.map((user) => (
                    <button
                        key={user._id}
                        onClick={() => setSelectedUser(user)}
                        className={`w-full p-3 flex items-center gap-3 
                        hover:bg-base-300 transition-colors
                        ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
                        `}
                    >
                        <div className="relative mx-auto lg:mx-0">
                            <img src={user.profilePic || "./avatarDefault.png"} alt="user.name" className='size-12 object-cover rounded-full' />
                            {onlineUsers.includes(user._id) && (
                                <span className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full' />

                            )}
                        </div>

                        <div className=" lb:block text-left min-w-0 lg:block hidden">
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-zinc-400">
                                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                            </div>
                        </div>
                    </button>
                ))}
            </div>

        </aside>
    )
}

export default Sidebar