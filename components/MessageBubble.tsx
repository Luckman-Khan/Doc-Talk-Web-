import React from 'react';
import { Message } from '../types';
import ReactMarkdown from 'react-markdown';
import { Check, CheckCheck } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  // Format time (e.g., 10:30 AM)
  const formattedTime = message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`flex w-full mb-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-[85%] md:max-w-[65%] rounded-lg p-2 relative shadow-sm text-sm md:text-base ${
          isUser 
            ? 'bg-[#d9fdd3] rounded-tr-none' 
            : 'bg-white rounded-tl-none'
        }`}
      >
        {/* Image Attachment */}
        {message.image && (
          <div className="mb-2 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
            <img src={message.image} alt="Uploaded attachment" className="w-full h-auto max-h-64 object-cover" />
          </div>
        )}

        {/* Text Content */}
        <div className="text-gray-900 leading-relaxed px-1">
          <ReactMarkdown 
             components={{
                ul: ({node, ...props}) => <ul className="list-disc pl-4 my-2" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-4 my-2" {...props} />,
                strong: ({node, ...props}) => <span className="font-bold text-gray-900" {...props} />,
                p: ({node, ...props}) => <p className="mb-1 last:mb-0" {...props} />
             }}
          >
            {message.text}
          </ReactMarkdown>
        </div>

        {/* Metadata (Time & Status) */}
        <div className="flex items-center justify-end gap-1 mt-1 select-none">
          <span className="text-[10px] text-gray-500">{formattedTime}</span>
          {isUser && (
            <span className={message.status === 'read' ? 'text-blue-500' : 'text-gray-400'}>
              {message.status === 'sent' && <Check size={14} />}
              {(message.status === 'delivered' || message.status === 'read') && <CheckCheck size={14} />}
            </span>
          )}
        </div>
        
        {/* Tail (Decorative) */}
        <div className={`absolute top-0 w-0 h-0 border-[6px] border-transparent ${
            isUser 
                ? 'right-[-6px] border-t-[#d9fdd3] border-l-[#d9fdd3]' 
                : 'left-[-6px] border-t-white border-r-white'
        }`}></div>
      </div>
    </div>
  );
};