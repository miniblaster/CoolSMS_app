// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CustomChip from 'src/@core/components/mui/chip'
import CardContent from '@mui/material/CardContent'

import { useDispatch, useSelector } from 'react-redux'
import { getCurrentLine } from 'src/store/apps/line'
import { LINE_STATUS } from 'src/configs/constants'

const LineViewPage = () => {
  // ** Hooks
  const dispatch = useDispatch()
  const { currentLine } = useSelector(state => state.line)
  useEffect(() => {
    const lineId = window.location.pathname.split('/')[4]
    dispatch(getCurrentLine(lineId))
  }, [dispatch])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h6'>Phone Details</Typography>
            <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />
            <Box sx={{ pb: 1 }}>
              <Box sx={{ display: 'flex', mb: 2 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Phone Number:</Typography>
                <Typography variant='body2'>{currentLine?.phoneNumber}</Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 2 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Status:</Typography>
                <CustomChip
                  skin='light'
                  size='small'
                  label={LINE_STATUS[currentLine?.status]?.status}
                  color={LINE_STATUS[currentLine?.status]?.color}
                  sx={{ textTransform: 'capitalize' }}
                />
              </Box>
              <Box sx={{ display: 'flex', mb: 2 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Note:</Typography>
                <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
                  {currentLine?.note}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', mb: 2 }}>
                <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Deleted:</Typography>
                <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
                  {currentLine?.deleted ? 'Yes' : 'No'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Created At:</Typography>
                <Typography variant='body2'>
                  {currentLine?.createdAt &&
                    new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    }).format(currentLine?.createdAt * 1000)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Updated At:</Typography>
                <Typography variant='body2'>
                  {currentLine?.updatedAt &&
                    new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    }).format(currentLine.updatedAt * 1000)}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default LineViewPage
