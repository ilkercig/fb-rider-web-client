'use client'
import { useQuery } from '@tanstack/react-query'
import { checkAuthentication } from '@/lib/api/yahooAuthService'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { CircularProgress, Typography } from '@mui/material'
import AppBarShell from '@/components/AppBarShell'
import setupAxiosInterceptors from '@/lib/api/setupAxiosInterceptors'
import axios from 'axios'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { data: isAuth, isLoading } = useQuery({
    queryKey: ['checkAuthentication'],
    queryFn: checkAuthentication,
  })

  useEffect(() => {
    const id = setupAxiosInterceptors(() => router.push('/login'))
    return () => axios.interceptors.response.eject(id)
  }, [router])

  useEffect(() => {
    if (!isLoading && isAuth === false) router.push('/login')
  }, [isAuth, isLoading, router])

  if (isLoading) return <><CircularProgress /><Typography variant="h6">Loading...</Typography></>
  if (!isAuth) return null
  return <AppBarShell>{children}</AppBarShell>
}
