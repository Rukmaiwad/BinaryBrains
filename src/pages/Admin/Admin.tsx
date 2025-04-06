import React from 'react'
import { useState } from 'react'
import { adminMenuOptions, ADMIN_MENU_TO_PAGES_MAP } from './adminUtils'
import { isInvalid } from '@/utils/utils';
import NotFoundPage from '../Error/NotFound';

const Admin = () => {

  const [selected, setSelected] = useState<string>('admin_pages');

  return (
    <div className='flex p-5 text-white' style={{ height: '92vh'}}>
        <div className='options-container border border-gray-500 rounded-xl md:w-80 w-3/12 h-full flex flex-col gap-4 p-3 overflow-auto'>
        {
          adminMenuOptions.map((menu, index: number) => {
            return <button 
              key={index} 
              className='admin-menu-button w-full' 
              style={{ background: selected === menu.identifier ? 'linear-gradient(45deg, rgba(251, 46, 152, 0.9), rgba(0, 62, 117, 0.9))' :'linear-gradient(45deg, rgba(251, 46, 152, 0.3), rgba(26, 148, 255, 0.3))' }}
              onClick={() => setSelected(menu.identifier)}
              >
                <div className='flex gap-5 overflow-auto'>
                  <div className='w-12/12 md:1/12 border rounded-xl flex justify-center p-0.5 h-full'>{<menu.icon />}</div>
                  <div className='w-10/12 hidden md:block text-left text-nowrap'>{menu.option}</div>
                </div>
              </button>
          })
        }
        </div>
        <div className='controller-container w-10/12 h-full border border-gray-500 rounded-xl ml-1 overflow-auto'>
            {isInvalid(ADMIN_MENU_TO_PAGES_MAP[selected]) ? <NotFoundPage/> : React.createElement(ADMIN_MENU_TO_PAGES_MAP[selected])}
        </div>
    </div>
  )
}

export default Admin