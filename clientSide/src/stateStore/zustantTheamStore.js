import { create } from 'zustand'

export const useTheamStore = create((set) => ({
  theam: localStorage.getItem('defaltTheam') || 'forest',
  setTheam: (theam) => {
    localStorage.setItem('defaltTheam', theam);
    set({ theam })
    
  },
  
}))
