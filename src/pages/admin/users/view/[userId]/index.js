// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from 'src/store/apps/user'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { USER_ROLE, USER_STATUS } from 'src/configs/constants'

const data = {
  id: 1,
  role: 'admin',
  status: 'active',
  username: 'gslixby0',
  avatarColor: 'primary',
  country: 'El Salvador',
  company: 'Yotz PVT LTD',
  contact: '(479) 232-9151',
  currentPlan: 'enterprise',
  fullName: 'Daisy Patterson',
  email: 'gslixby0@abc.net.au',
  avatar: '/images/avatars/4.png'
}

const UserViewPage = () => {
  // ** Hooks
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.user)

  useEffect(() => {
    const userId = window.location.pathname.split('/')[4]
    dispatch(getCurrentUser(userId))
  }, [dispatch])

  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {data.avatar.length ? (
                <CustomAvatar
                  src={currentUser?.avatar}
                  variant='rounded'
                  alt={currentUser?.nickName}
                  sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
                />
              ) : (
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  color={data.avatarColor}
                  sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
                >
                  {getInitials(currentUser?.nickName)}
                </CustomAvatar>
              )}
              <Typography variant='h6' sx={{ mb: 4 }}>
                {currentUser?.nickName}
              </Typography>
              <CustomChip
                skin='light'
                size='small'
                label={currentUser?.role}
                color={USER_ROLE[currentUser?.role]?.roleColor}
                sx={{ textTransform: 'capitalize' }}
              />
            </CardContent>

            <CardContent>
              <Typography variant='h6'>User Details</Typography>
              <Divider sx={{ my: theme => `${theme.spacing(4)} !important` }} />
              <Box sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Username:</Typography>
                  <Typography variant='body2'>@{currentUser?.nickName}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Billing Email:</Typography>
                  <Typography variant='body2'>{currentUser?.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Status:</Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={USER_STATUS[currentUser?.status]?.status}
                    color={USER_STATUS[currentUser?.status]?.color}
                    sx={{ textTransform: 'capitalize' }}
                  />
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Role:</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      '& svg': { mr: 3, color: USER_ROLE[currentUser?.role]?.color }
                    }}
                  >
                    <Icon icon={USER_ROLE[currentUser?.role]?.icon} fontSize={20} />
                    <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                      {currentUser?.role}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Phone Number:</Typography>
                  <Typography variant='body2'>{currentUser?.phoneNumber}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Email Verified:</Typography>
                  <Typography variant='body2'>{currentUser?.isEmailVerified ? 'Yes' : 'No'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Phone Verified:</Typography>
                  <Typography variant='body2'>{currentUser?.isPhoneVerified ? 'Yes' : 'No'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Deleted:</Typography>
                  <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
                    {currentUser?.deleted ? 'Yes' : 'No'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Created At:</Typography>
                  <Typography variant='body2'>
                    {currentUser?.createdAt &&
                      new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                      }).format(currentUser?.createdAt * 1000)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Updated At:</Typography>
                  <Typography variant='body2'>
                    {currentUser?.updatedAt &&
                      new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                      }).format(currentUser?.updatedAt * 1000)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default UserViewPage
