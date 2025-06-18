import { Typography } from '@mui/material'

const Title = ({title}: {title: string}) => {
  return (
    <Typography variant="h4" mt={2}>{title}</Typography>
  )
}

export default Title