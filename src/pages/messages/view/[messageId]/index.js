// ** React Imports
import { useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CustomChip from 'src/@core/components/mui/chip'
import CardContent from '@mui/material/CardContent'

import { useDispatch, useSelector } from 'react-redux'
import { getCurrentMessage } from 'src/store/apps/message'

const MessageViewPage = () => {
  // ** Hooks
  const dispatch = useDispatch()
  const { currentMessage } = useSelector(state => state.message)
  useEffect(() => {
    const lineId = window.location.pathname.split('/')[3]
    dispatch(getCurrentMessage(lineId))
  }, [dispatch])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h6'>User Phone Details</Typography>
            <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />
            <Box sx={{ pb: 1 }}>
              <Box sx={{ display: 'flex', mb: 2 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Phone Number:</Typography>
                <Typography variant='body2'>{currentMessage?.receiver}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 2 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Sender:</Typography>
                <Typography variant='body2'>{currentMessage?.sender}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 2 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Message:</Typography>
                <Typography variant='body2'>{currentMessage?.message}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 2 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>IsRead:</Typography>
                <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
                  {currentMessage?.isRead ? 'Yes' : 'No'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 2 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Deleted:</Typography>
                <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
                  {currentMessage?.deleted ? 'Yes' : 'No'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Created At:</Typography>
                <Typography variant='body2'>
                  {currentMessage?.createdAt &&
                    new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    }).format(currentMessage?.createdAt * 1000)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Updated At:</Typography>
                <Typography variant='body2'>
                  {currentMessage?.updatedAt &&
                    new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    }).format(currentMessage.updatedAt * 1000)}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

MessageViewPage.acl = {
  action: 'read',
  subject: 'user-page'
}

export default MessageViewPage
