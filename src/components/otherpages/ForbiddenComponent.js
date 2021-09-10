import React from 'react'
import { Stack, Typography } from '@material-ui/core'

export const Forbidden = () => {
  return (
        <Stack spacing={3} mt={5}>
            <Typography variant='h2' fontWeight='fontWeightBold' align='center'>Forbidden 403</Typography>
            <Typography variant='h6' fontWeight='fontWeightRegular' align='center'>
                You don&apos;t have admin privilege to access this page.
                <br/>
                Please log in to an account that have admin right or contact server owner.
            </Typography>
        </Stack>
  )
}
