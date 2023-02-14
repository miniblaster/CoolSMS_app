import { Container, Typography } from '@mui/material'

const ProfilePage = () => {
  return (
    <Container>
      <Typography variant='h2'>Profile</Typography>
    </Container>
  )
}

ProfilePage.acl = {
  action: 'read',
  subject: 'user-page'
}

export default ProfilePage
