'use client'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import CssBaseline from '@mui/material/CssBaseline'
import { useQuery } from '@tanstack/react-query'
import { fetchUserData } from '@/lib/api/yahooAuthService'
import UserProfileMenu from './UserProfileMenu'
import { useRouter } from 'next/navigation'

export default function AppBarShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { data: user } = useQuery({ queryKey: ['user'], queryFn: fetchUserData })
  return (
    <Box>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            onClick={() => router.push('/')}
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
          >
            DehDeh Premium
          </Typography>
          {user && <UserProfileMenu userName={user.name} imageUrl={user.profileImages.image64} />}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box component="main" sx={{ pt: 2 }}>{children}</Box>
    </Box>
  )
}
