import React, { useState, useRef } from 'react';
import { Send, Camera, Paperclip, X } from 'lucide-react';

interface InputAreaProps {
  onSendMessage: (text: string, image?: string) => void;
  isTyping: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, isTyping }) => {
  const [text, setText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!text.trim() && !selectedImage) return;
    
    onSendMessage(text, selectedImage || undefined);
    setText('');
    setSelectedImage(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-[#f0f2f5] p-2 flex items-end gap-2 sticky bottom-0 z-20 w-full min-h-[60px]">
      {/* Hidden File Input */}
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange}
      />

      {/* Image Preview Overlay (if image selected) */}
      {selectedImage && (
        <div className="absolute bottom-full left-0 w-full bg-[#e9edef] p-4 shadow-lg border-t border-gray-300 animate-in slide-in-from-bottom-10 fade-in duration-200">
           <div className="relative inline-block">
                <img src={selectedImage} alt="Preview" className="h-48 w-auto rounded-lg border border-gray-300 shadow-sm" />
                <button 
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-gray-600 text-white rounded-full p-1 hover:bg-red-500 transition-colors"
                >
                    <X size={16} />
                </button>
           </div>
        </div>
      )}

      {/* Action Buttons (Left) */}
      <div className="flex items-center gap-2 pb-3 pl-1 text-[#54656f]">
        <button 
            onClick={triggerFileSelect}
            className="p-1 hover:bg-gray-200 rounded-full transition"
            title="Attach Image"
        >
            <Paperclip size={24} />
        </button>
      </div>

      {/* Input Field */}
      <div className="flex-1 bg-white rounded-xl flex items-center shadow-sm overflow-hidden min-h-[42px] mb-1.5">
        <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={selectedImage ? "Add a caption..." : "Type a message"}
            className="w-full px-4 py-2 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
            disabled={isTyping}
        />
        <button 
            onClick={triggerFileSelect}
            className={`p-2 text-[#54656f] hover:text-gray-800 transition ${selectedImage ? 'hidden' : 'block'}`}
        >
            <Camera size={22} />
        </button>
      </div>

      {/* Send Button */}
      <div className="pb-1.5 pr-1">
        <button 
            onClick={handleSend}
            disabled={(!text.trim() && !selectedImage) || isTyping}
            className={`p-3 rounded-full shadow-sm transition-all duration-200 flex items-center justify-center ${
                (text.trim() || selectedImage) && !isTyping
                ? 'bg-[#008069] text-white hover:bg-[#006a57] hover:scale-105' 
                : 'bg-[#008069] text-white opacity-50 cursor-default'
            }`}
        >
            <Send size={20} className="ml-0.5" />
        </button>
      </div>
    </div>
  );
};