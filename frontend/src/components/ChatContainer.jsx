import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader';
import MessagesInput from './MessagesInput';
import { useAuthStore } from '../store/useAuthStore';

const ChatContainer = () => {
  const {messages, getMessages, selectedUser, subscribeToMessages, unsubscribeFromMessages} = useChatStore();
  const {authUser} = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages])

  useEffect(() => {
    if(messageEndRef.current && messages){
      messageEndRef.current.scrollIntoView({behavior: "smooth"})
    }
  }, [messages])

  return (
    <div className="flex-1 flex
     flex-col overflow-auto">
      <ChatHeader/>

      <div className="flex-1 overflow-y-auto p-4 space-x-4">
        {messages.map((message) => (
          <div key={message._id} className={`me-0 ms-0 chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`} ref={messageEndRef}>
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img src={message.senderId === authUser._id ? authUser.profilePic || "./avatarDefault.png" : selectedUser.profilePic || "./avatarDefault.png"} alt="kép" />

              </div>
            </div>
            <div className="chat-header mb-1">
              <time className='text-xs opacity-50 ml-1'>
                {message.createdAt}
              </time>
            </div>
            <div className='chat-bubble flex flex-col'>
              {message.image && (
                <img src={message.image} alt="kép" className='sm:max-w-[200px] rounded-md mb-2' />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessagesInput/>
    </div>
  )
}

export default ChatContainer