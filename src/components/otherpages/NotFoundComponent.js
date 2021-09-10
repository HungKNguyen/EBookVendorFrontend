import React from 'react'
import { Stack, Typography } from '@material-ui/core'

export const Notfound = () => {
  return (
      <Stack spacing={3} mt={5}>
          <Typography variant='h2' fontWeight='fontWeightBold' align='center'>Not Found 404</Typography>
          <Typography variant='h6' fontWeight='fontWeightRegular' align='center'>
              The page you are looking for doesn&apos;t exist.
          </Typography>
      </Stack>
  )
}
