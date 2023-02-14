// ** React Imports
import { useEffect, useState } from 'react'

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
import { addUserLines } from 'src/store/apps/user-lines'
import { sentenceCase } from 'src/utils/sentence-case'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const SidebarAssignPhone = props => {
  // ** Props
  const { open, toggle, store } = props

  const [users, setUsers] = useState(store.user?.data)
  const [lines, setLines] = useState(store.line?.data)

  // ** Hooks
  const dispatch = useDispatch()

  useEffect(() => {
    setUsers(store.user.data)
    setLines(store.line.data)
  }, [store])

  const formik = useFormik({
    initialValues: {
      label: '',
      note: '',
      userId: '',
      lineId: ''
    },
    validationSchema: yup.object({
      label: yup.string().max(255).required(),
      userId: yup.string().required(),
      lineId: yup.string().required(),
      note: yup.string().optional()
    }),
    onSubmit: async (values, helpers) => {
      const payload = { ...values }
      onSubmit(payload)
        .then(data => {
          helpers.setStatus({ success: true })
          helpers.setSubmitting(false)
          toast.success(`Assign Phone success!`)
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
        const originalPromiseResult = await dispatch(addUserLines(payload)).unwrap()
        toggle()
        if (originalPromiseResult?.statusCode) reject(originalPromiseResult)
        resolve(originalPromiseResult)
      } catch (rejectedValueOrSerializedError) {
        reject(rejectedValueOrSerializedError)
      }
    })
  }

  const handleClose = () => {
    toggle()
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
        <Typography variant='h6'>Assign Phone</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              error={Boolean(formik.touched.label && formik.errors.label)}
              fullWidth
              helperText={formik.touched.label && formik.errors.label}
              label='Label'
              name='label'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
              value={formik.values.label}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='user-select'>Select User</InputLabel>
            <Select
              fullWidth
              value={formik.values.userId}
              id='select-user'
              label='Select User'
              name='userId'
              labelId='user-select'
              onChange={formik.handleChange}
              inputProps={{ placeholder: 'Select User' }}
            >
              {users.map(el => (
                <MenuItem key={el.id} value={el.id}>
                  {el.nickName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='phone-select'>Select Phone</InputLabel>
            <Select
              fullWidth
              value={formik.values.lineId}
              id='select-phone'
              label='Select Phone'
              labelId='phone-select'
              name='lineId'
              onChange={formik.handleChange}
              inputProps={{ placeholder: 'Select Phone' }}
            >
              {lines
                .filter(el => el.status == 'available')
                .map(el => (
                  <MenuItem key={el.id} value={el.id}>
                    {el.phoneNumber}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              error={Boolean(formik.touched.note && formik.errors.note)}
              fullWidth
              helperText={formik.touched.note && formik.errors.note}
              label='Note'
              name='note'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
              value={formik.values.note}
            />
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

export default SidebarAssignPhone
