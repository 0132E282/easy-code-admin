import React, { createContext, useState, useContext, ReactNode } from 'react'

const AppContext = createContext<{ state: string; setState: React.Dispatch<React.SetStateAction<string>> } | undefined>(undefined)

interface AppContextProviderProps {
  children: ReactNode
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [state, setState] = useState('Initial State')

  return <AppContext.Provider value={{ state, setState }}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider')
  }
  return context
}
