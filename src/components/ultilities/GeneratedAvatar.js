import React from 'react'
import { Avatar, Box } from '@material-ui/core'

function stringToColor (string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.substr(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

export const GeneratedAvatar = ({ name, sx, ...rest }) => {
  const { height } = sx
  return (
        <Avatar sx={{ bgcolor: stringToColor(name), ...sx }} {...rest}>
          <Box fontSize={height / 2}>
            {name.split(' ')[0][0]}{name.split(' ')[1][0]}
          </Box>
        </Avatar>
  )
}
