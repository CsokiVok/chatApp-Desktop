import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore';

const ChatHeader = () => {
    const {selectedUser, setSelectedUser} = useChatStore();
    const {onlineUsers} = useAuthStore();

    return (
        <div className='p-2.5 border-b border-base-300'>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    
                    {/*Avatar*/}
                    <div className="avatar">
                        <div className="size-10 rounded-full relative">
                            <img src={selectedUser.profilePic || "./avatarDefault.png"} alt="profilePic" />
                        </div>
                    </div>

                    <div>
                        <h2 className='font-medium'>{selectedUser.name}</h2>
                        <p className='text-sm text-base-content/50'>{onlineUsers.includes(selectedUser._id) ? "online" : "offline"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatHeader