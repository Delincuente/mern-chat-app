import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import ChaatHeader from './ChaatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './MessageSkeleton';
import { formatMessageTime } from '../lib/utils';

const ChatContainer = () => {
    const authUser = useAuthStore((state) => state.authUser);
    const selectedUser = useChatStore((state) => state.selectedUser);
    const messages = useChatStore((state) => state.messages);
    const getMessages = useChatStore((state) => state.getMessages);
    const isMessagesLoading = useChatStore((state) => state.isMessagesLoading);
    const subscribeToMessages = useChatStore((state) => state.subscribeToMessages);
    const unsubscribeFromMessages = useChatStore((state) => state.unsubscribeFromMessages);
    const messageEndRef = useRef(null);

    useEffect(() => {
        getMessages(selectedUser?._id);
        subscribeToMessages();

        return () => unsubscribeFromMessages();
    }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

    useEffect(() => {
        if (messageEndRef.current && messages.length > 0) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className='flex-1 flex flex-col h-full overflow-auto'>
            <ChaatHeader />
            {isMessagesLoading ? (<MessageSkeleton />) :
                (<>
                    <div className='flex-1 overflow-y-auto p-4 space-y-4'>
                        {messages.map((message) => (
                            <div key={message._id} className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                                ref={messageEndRef}>
                                <div className='chat-image avatar'>
                                    <div className='size-10 rounded-full border'>
                                        <img
                                            src={
                                                message.senderId === authUser._id
                                                    ? (authUser.profilePic || "/avatar.png")
                                                    : (selectedUser.profilePic || "/avatar.png")
                                            }
                                            alt="Profile pic" className='skeleton h-full w-full rounded-full' />
                                    </div>
                                </div>

                                <div className='chat-header mb-1'>
                                    <time className='text-xs opacity-50 ml-1'>
                                        {formatMessageTime(message.createdAt)}
                                    </time>
                                </div>

                                <div className='chat-bubble flex flex-col'>
                                    {message.image && (
                                        <img src={message.image} alt="Attachment" className='sm:max-w-[200px] rounded-md mb-2' />
                                    )}
                                    {message.text && (message.text)}
                                </div>
                            </div>
                        ))}
                    </div>
                    <MessageInput />
                </>)}
        </div>
    )
}

export default ChatContainer