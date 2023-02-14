/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select from '@mui/material/Select'
import toast from 'react-hot-toast'

import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

// ** Third Party Imports
import * as yup from 'yup'
import { Button, TextField } from '@mui/material'
import { getCurrentLine } from 'src/store/apps/line'
import { useFormik } from 'formik'

// ** Actions Imports
import { updateLine } from 'src/store/apps/line'
import { LINE_STATUS } from 'src/configs/constants'

const LineEditPage = () => {
  // ** Hooks
  const dispatch = useDispatch()
  const { currentLine } = useSelector(state => state.line)
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      phoneNumber: currentLine?.phoneNumber || '',
      note: currentLine?.note || '',
      status: currentLine?.status || ''
    },
    validationSchema: yup.object({
      phoneNumber: yup.string().length(10).required(),
      note: yup.string().max(255).required(),
      status: yup.string().required()
    }),
    onSubmit: async (values, helpers) => {
      try {
        const payload = {
          phoneNumber: values.phoneNumber,
          note: values.note,
          id: currentLine.id,
          status: values.status
        }

        await onSubmit(payload)
        helpers.setStatus({ success: true })
        helpers.setSubmitting(false)
        toast.success(`Phone Number update success!`)
      } catch (err) {
        console.error(err)
        helpers.setStatus({ success: false })
        helpers.setErrors({ submit: err.message })
        toast.error(sentenceCase(err.message))
        helpers.setSubmitting(false)
      }
    }
  })
  useEffect(() => {
    const lineId = window.location.pathname.split('/')[3]
    dispatch(getCurrentLine(lineId))
  }, [dispatch])

  useEffect(() => {
    formik.setValues(values => ({ ...values, ...currentLine }))
  }, [dispatch, currentLine])

  const onSubmit = async payload => {
    return dispatch(updateLine(payload)).then(() => router.replace('/admin/phone-numbers'))
  }

  const handleCancel = () => {
    router.replace('/admin/phone-numbers')
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Update Phone' />
          <CardContent>
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
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <InputLabel id='status-select'>Select Status</InputLabel>
                  <Select
                    fullWidth
                    value={formik.values.status}
                    id='select-status'
                    label='Select Status'
                    labelId='status-select'
                    name='status'
                    onChange={formik.handleChange}
                    inputProps={{ placeholder: 'Select Role' }}
                  >
                    {Object.keys(LINE_STATUS).map((key, index) => (
                      <MenuItem value={key} key={index}>
                        {LINE_STATUS[key].status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
                    Update
                  </Button>
                  <Button size='large' variant='outlined' color='secondary' onClick={handleCancel}>
                    Cancel
                  </Button>
                </Box>
              </form>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default LineEditPage
