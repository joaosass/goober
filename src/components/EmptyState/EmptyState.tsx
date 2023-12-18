import { Card, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  text: string;
}

export default function EmptyState({ icon, text }: EmptyStateProps) {
  return (
    <Stack flexGrow={1} position="relative">
      <Stack position="absolute" top="50%" left="50%" sx={{ transform: 'translate(-50%, -50%)'}}>
        <Card variant="outlined">
          <Stack gap={1} py={3} px={5} alignItems="center" maxWidth={320}>
            {icon}
            <Typography fontWeight="bold" textAlign="center">{text}</Typography>
          </Stack>
        </Card>
      </Stack>
    </Stack>
  )
}
