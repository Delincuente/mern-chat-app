import React, { use } from 'react';
import { THEMES } from '../config';
import { Send } from 'lucide-react';
import { useSettingStore } from '../store/useSettingStore';

const SettingsPage = () => {
  const theme = useSettingStore((state) => state.theme);
  const setTheme = useSettingStore((state) => state.setTheme);
  const PREVIEW_MESSAGES = [
    { id: 1, isSent: false, content: "Hey! How's it going?", time: "12:00 PM" },
    { id: 2, isSent: true, content: "I'm doing great! Just working on some new features.", time: "12:00 PM" }
  ];
  return (
    <div className='h-screen container mx-auto px-4 pt-20 max-w-5xl'>
      <div className='space-y-6'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-lg font-semibold'>Theme</h2>
          <p className='text-sm text-base-content/70'>Choose a theme for chat interface</p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-6 md:grid-cols-8 gap-2'>
          {THEMES.map((t) => (
            <button key={t} onClick={() => (setTheme(t))}
              className={`group flex flex-col items-center gap-1.5 rounded-lg transition-colors p-2 ${theme === t ? "bg-base-200" : "hover:bg-base-300"}`}>
              <div className='relative h-8 w-full rounded-md overflow-hidden' data-theme={t}>
                <div className='absolute inset-0 grid grid-cols-4 gap-px p-1'>
                  <div className='rounded bg-primary'></div>
                  <div className='rounded bg-secondary'></div>
                  <div className='rounded bg-accent'></div>
                  <div className='rounded bg-neutral'></div>
                </div>
              </div>
              <span className='text-[11px] font-medium truncate w-full text-center'>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>

        <h3 className='text-lg font-semibold mb-3'>Preview</h3>
        <div className='rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg'>
          <div className='p-4 bg-base-200'>
            <div className='max-w-lg mx-auto'>
              <div className='bg-base-100 rounded-xl shadow-sm overflow-hidden'>
                <div className='px-4 py-3 border-b border-base-300 bg-base-200'>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium'>J</div>
                    <div className=''>
                      <h3 className='font-medium text-sm'>Jone Doe</h3>
                      <p className='text-xs text-base-content/70'>Online</p>
                    </div>
                  </div>
                </div>

                <div className='p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100'>
                  {PREVIEW_MESSAGES.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.isSent ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] rounded-xl p-3 shadow-sm ${msg.isSent ? "bg-primary text-primary-content" : "bg-base-200"}`}>
                        <p className='text-sm'>{msg.content}</p>
                        <p className={`text-[10px] mt-1.5 ${msg.isSent ? "text-primary-content/70" : "text-base-content/70"}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className='p-4 border-t border-base-300 bg-base-100'>
                  <div className='flex gap-2'>
                    <input type='text' className='input input-bordered flex-1 text-sm h-10'
                      placeholder='Type a message...'
                      value="This is a preview" readOnly />
                    <button className='btn btn-primary h-10 min-h-0'>
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage