"use client"
import { Stack, ThemeProvider, Typography } from '@mui/material';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import theme from '@theme';

import './globals.css'

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
      />
      {/* <script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDLLqAUH0By1HLwEONL0-2EI-G8jURlZcI&libraries=places" /> */}
      <title>Goober</title>
      </Head>
      <body>
        <Stack alignItems="center" height={60} justifyContent="center" p={1}>
          <Typography component="h1" variant="h4">Goober</Typography>
        </Stack>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <main>{children}</main>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
