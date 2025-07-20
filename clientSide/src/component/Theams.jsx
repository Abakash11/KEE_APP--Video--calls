import React from 'react'
import { useTheamStore } from '../stateStore/zustantTheamStore'
import { Palette } from 'lucide-react';
import { THEMES } from '../constants'

const Theams = () => {
  const { theam, setTheam } = useTheamStore()
  return (
    <div className='dropdown dropdown-end'>
      {/* Dropdown Trigger  */}
      <button tabIndex={0} className="btn btn-ghost btn-circle">
        <Palette className='size-5' />
      </button>
      <div tabIndex={0} className=' dropdown-content mt-2  shadow-2xl bg-base-200
       backdrop-blur-lg rounded-2xl w-60 border border-base-content/10 max-h-80
        overflow-y-auto'>
          <div className="space-y-1 ">
            {THEMES.map((theme,index) => (
              <button key={index} onClick={() => setTheam(theme.name)}
              className={`w-full px-3 py-4 rounded-xl flex items-center
               gap-3 transition-colors ${theam==theme.name? 'bg-primary/10 text-primary' 
               : 'hover:bg-base-content/5'}`
               }>
                <Palette className='size-2' />
                <span className=' font-medium'> {theme.name}</span>
                {/* theam preview colours  */}
                <div className="flex ml-auto gap-1">
                  {theme.colors.map((color, idx) => (
                    <span key={idx} className={`w-4 h-4 rounded-full `} style= {{backgroundColor:color}}/>
                  ))}
                </div>

              </button>
            ))}
          </div>
        </div>
      
    </div>
  )
}

export default Theams
