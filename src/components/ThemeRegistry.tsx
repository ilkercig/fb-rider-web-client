'use client'
import * as React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useServerInsertedHTML } from 'next/navigation'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [{ cache, flush }] = React.useState(() => {
    const cache = createCache({ key: 'css' })
    cache.compat = true
    const prevInsert = cache.insert
    let inserted: string[] = []
    cache.insert = (...args) => {
      const serialized = args[1]
      if (cache.inserted[serialized.name] === undefined) inserted.push(serialized.name)
      return prevInsert(...args)
    }
    return {
      cache,
      flush: () => {
        const p = inserted
        inserted = []
        return p
      },
    }
  })

  useServerInsertedHTML(() => {
    const names = flush()
    if (!names.length) return null
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: names.map((n) => cache.inserted[n]).join('') }}
      />
    )
  })

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={createTheme()}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}
