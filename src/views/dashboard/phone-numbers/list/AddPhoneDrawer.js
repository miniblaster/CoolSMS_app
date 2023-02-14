// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
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
import { addLine } from 'src/store/apps/line'

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const SidebarAddPhone = props => {
  // ** Props
  const { open, toggle } = props

  // ** Hooks
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
      note: ''
    },
    validationSchema: yup.object({
      phoneNumber: yup.string().length(10).required(),
      note: yup.string().max(255).required()
    }),
    onSubmit: async (values, helpers) => {
      const payload = { ...values }
      onSubmit(payload)
        .then(data => {
          helpers.setStatus({ success: true })
          helpers.setSubmitting(false)
          toast.success(`Add Phone success!`)
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
        const originalPromiseResult = await dispatch(addLine(payload)).unwrap()
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
        <Typography variant='h6'>Add Phone</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <TextField
              error={Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)}
              fullWidth
              helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              label='Phone Number'
              name='phoneNumber'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
              value={formik.values.phoneNumber}
            />
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

export default SidebarAddPhone
