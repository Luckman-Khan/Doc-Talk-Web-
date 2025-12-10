import React, { useState } from 'react';
import { Key, Lock, ArrowRight } from 'lucide-react';

interface ApiKeyModalProps {
  onSave: (key: string) => void;
  isOpen: boolean;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSave, isOpen }) => {
  const [inputKey, setInputKey] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputKey.trim()) {
      onSave(inputKey.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative animate-in fade-in zoom-in duration-300">
        
        <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-[#008069]">
                <Key size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Enter Access Key</h2>
            <p className="text-center text-gray-500 mt-2 text-sm">
                To use Doc Talk securely without a backend server, please enter your own Google Gemini API Key.
            </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="Paste your API Key here"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#008069] focus:border-transparent outline-none transition-all"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={!inputKey.trim()}
            className="w-full bg-[#008069] hover:bg-[#006a57] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            Start Chatting <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-6 text-center">
            <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs text-[#008069] hover:underline font-medium"
            >
                Get a free API Key from Google AI Studio
            </a>
            <p className="text-[10px] text-gray-400 mt-2">
                Your key is stored locally in your browser and never sent to our servers.
            </p>
        </div>
      </div>
    </div>
  );
};