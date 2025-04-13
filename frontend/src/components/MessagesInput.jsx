import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore';
import { Image, Send, X } from 'lucide-react';

const MessagesInput = () => {
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    const fileInput = useRef(null);
    const { sendMessage } = useChatStore();

    const handleImage = (e) => {
        const file = e.target.files[0];
        if(!file.type.startsWith("image/")){
            toast.error("Válassz egy képet");
            return;
        }

        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setImage(fileReader.result);
        };
        fileReader.readAsDataURL(file)
    };

    const removeImage = () => { 
        setImage(null);
        if(fileInput.current){
            fileInput.current.value =""
        };
    };
    const handleSendMessage = async (e) => { 
        e.preventDefault();
        if(!text.trim() && !image) return;

        try{
            await sendMessage({
                text: text.trim(),
                image: image,
            });
            setText("");
            setImage(null);
            if(fileInput.current){
                fileInput.current.value ="";
            }
        }catch(error){
            console.error(error);
        }
    };

    return (
        <div className='p-4 w-full'>
            {image && (
                <div className='mb-3 flex items-center gap-2'>
                    <div className="relative">
                        <img src={image} alt="Kép" className='w-20 h-20 object-cover rounded-lg border' />

                        <button onClick={removeImage} className='ablosule -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex 
                        items-center justify-center' type='button'><X className="size-3"/></button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
                <div className="flex-1 flex gap-2">
                    <input type="text" className='w-full input input-bordered rounded-lg input-sm sm:input-md' placeholder='Üzenet írása...'
                    value={text} onChange={(e) => setText(e.target.value)} />
                    
                    <input type="file" ref={fileInput} className='hidden' onChange={handleImage} />

                    <button type='button' className={`hidden sm:flex btn btn-circle`} onClick={() => fileInput.current?.click()}><Image size={20}/></button>
                </div>

                <button type='submit' className='btn btn-sm btn-cicle' disabled={!text.trim() && !image}><Send size={22}/></button>
            </form>
        </div>
    )
}

export default MessagesInput