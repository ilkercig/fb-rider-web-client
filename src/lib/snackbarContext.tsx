'use client'
import { createContext, useContext, useState } from 'react'

interface SnackbarState {
  message: string
  severity: 'success' | 'error' | 'warning' | 'info'
  open: boolean
}

const defaultState: SnackbarState = { message: '', severity: 'info', open: false }

const SnackbarContext = createContext<{
  snackbar: SnackbarState
  setSnackbar: (state: SnackbarState) => void
}>({ snackbar: defaultState, setSnackbar: () => {} })

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [snackbar, setSnackbar] = useState<SnackbarState>(defaultState)
  return (
    <SnackbarContext.Provider value={{ snackbar, setSnackbar }}>
      {children}
    </SnackbarContext.Provider>
  )
}

export function useSnackbar() {
  return useContext(SnackbarContext)
}

export function useSetSnackbar() {
  return useContext(SnackbarContext).setSnackbar
}
