import { Stack } from '@mui/material'
import { ReactElement, ReactNode } from 'react';

interface SidebarProps {
  children: ReactElement | ReactElement[];
}

const Sidebar = ({ children }: SidebarProps) => {
  return (
    <Stack height="calc(100dvh - 60px)" width="min(100%, 350px)" p={2}>
      {children}
    </Stack>
  )
}

export default Sidebar;
