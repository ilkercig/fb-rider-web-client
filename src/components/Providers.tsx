'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { SnackbarProvider } from '@/lib/snackbarContext'

const GlobalSnackbar = dynamic(() => import('./GlobalSnackbar'), { ssr: false })

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <SnackbarProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <GlobalSnackbar />
      </QueryClientProvider>
    </SnackbarProvider>
  )
}
