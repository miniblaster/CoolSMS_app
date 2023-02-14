// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import toast from 'react-hot-toast'

// ** Third Party Imports
import * as yup from 'yup'
import { useFormik } from 'formik'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addUser } from 'src/store/apps/user'
import { USER_ROLE } from 'src/configs/constants'

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const SidebarAddUser = props => {
  // ** Props
  const { open, toggle } = props

  // ** Hooks
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      nickName: '',
      role: ''
    },
    validationSchema: yup.object({
      email: yup.string().email().required(),
      nickName: yup
        .string()
        .min(6, obj => showErrors('Username', obj.value.length, obj.min))
        .required(),
      role: yup.string().required()
    }),
    onSubmit: async (values, helpers) => {
      const payload = { ...values }
      onSubmit(payload)
        .then(data => {
          helpers.setStatus({ success: true })
          helpers.setSubmitting(false)
          toast.success(`Add User success!`)
        })
        .catch(err => {
          console.log('err', err.message)
          helpers.setStatus({ success: false })
          helpers.setErrors({ submit: err.message })
          toast.error(sentenceCase(err.message))
          helpers.setSubmitting(false)
        })
    }
  })

  const onSubmit = async payload => {
    return new Promise(async (resolve, reject) => {
      try {
        const originalPromiseResult = await dispatch(addUser(payload)).unwrap()
        toggle()
        if (originalPromiseResult?.statusCode) reject(originalPromiseResult)
        resolve(originalPromiseResult)
      } catch (rejectedValueOrSerializedError) {
        reject(rejectedValueOrSerializedError)
      }
    })
  }

  const handleClose = () => {
    setPlan('basic')
    setRole('user')
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Add User</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              error={Boolean(formik.touched.nickName && formik.errors.nickName)}
              fullWidth
              helperText={formik.touched.nickName && formik.errors.nickName}
              nickName='User Name'
              name='nickName'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
              value={formik.values.nickName}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              email='Email'
              name='email'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
              value={formik.values.email}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='role-select'>Select Role</InputLabel>
            <Select
              fullWidth
              value={formik.values.role}
              id='select-role'
              label='Select Role'
              labelId='role-select'
              name='role'
              onChange={formik.handleChange}
              inputProps={{ placeholder: 'Select Role' }}
            >
              {Object.keys(USER_ROLE).map((key, index) => (
                <MenuItem value={key} key={index}>
                  {USER_ROLE[key].role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddUser
