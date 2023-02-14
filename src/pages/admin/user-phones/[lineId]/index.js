/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useState, useEffect } from 'react'

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
import { useFormik } from 'formik'

import { Button, TextField } from '@mui/material'
import { getCurrentUserLine } from 'src/store/apps/user-lines'
import { fetchData as fetchUserData } from 'src/store/apps/user'
import { fetchData as fetchLineData } from 'src/store/apps/line'

// ** Actions Imports
import { updateUserLine } from 'src/store/apps/user-lines'
import { USER_LINE_STATUS } from 'src/configs/constants'

const UserLinesEditPage = () => {
  // ** Hooks
  const dispatch = useDispatch()
  const { userLines, user, line } = useSelector(state => state)
  const router = useRouter()
  const [users, setUsers] = useState(user?.data)
  const [lines, setLines] = useState(line?.data)

  const formik = useFormik({
    initialValues: {
      label: userLines.currentUserLine?.label || '',
      note: userLines.currentUserLine?.note || '',
      userId: userLines.currentUserLine?.user?.id || '',
      lineId: userLines.currentUserLine?.line?.id || '',
      status: userLines.currentUserLine?.status || ''
    },
    validationSchema: yup.object({
      label: yup.string().max(255).required(),
      note: yup.string().optional(),
      userId: yup.string().required('User is required'),
      lineId: yup.string().required('Phone is required'),
      status: yup.string().required('Status is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        const payload = {
          label: values.label,
          note: values.note,
          userId: values.userId,
          lineId: values.lineId,
          status: values.status,
          id: userLines.currentUserLine?.id
        }

        await onSubmit(payload)
        helpers.setStatus({ success: true })
        helpers.setSubmitting(false)
        toast.success(`User-Phone update success!`)
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
    formik.setValues(values => ({
      ...values,
      ...userLines.currentUserLine,
      userId: userLines.currentUserLine?.user?.id,
      lineId: userLines.currentUserLine?.line?.id
    }))
  }, [dispatch, userLines.currentUserLine])

  useEffect(() => {
    const lineId = window.location.pathname.split('/')[3]
    dispatch(getCurrentUserLine(lineId))
    dispatch(
      fetchUserData({
        q: ''
      })
    )
    dispatch(
      fetchLineData({
        q: ''
      })
    )
  }, [dispatch])

  useEffect(() => {
    setUsers(user.data)
    setLines(line.data)
  }, [user, line])

  const onSubmit = async payload => {
    dispatch(updateUserLine(payload)).then(() => router.replace('/admin/user-phones'))
  }

  const handleCancel = () => {
    router.replace('/admin/user-phones')
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Update User Phone' />
          <CardContent>
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
                    error={Boolean(formik.touched.userId && formik.errors.userId)}
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
                    error={Boolean(formik.touched.lineId && formik.errors.lineId)}
                    fullWidth
                    value={formik.values.lineId}
                    id='select-phone'
                    name='lineId'
                    label='Select Phone'
                    labelId='phone-select'
                    onChange={formik.handleChange}
                    inputProps={{ placeholder: 'Select Phone' }}
                  >
                    {lines.map(el => (
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
                <FormControl fullWidth sx={{ mb: 6 }}>
                  <InputLabel id='status-select'>Select Status</InputLabel>
                  <Select
                    fullWidth
                    error={Boolean(formik.touched.status && formik.errors.status)}
                    value={formik.values.status}
                    id='select-status'
                    label='Select Status'
                    name='status'
                    labelId='status-select'
                    onChange={formik.handleChange}
                    inputProps={{ placeholder: 'Select Role' }}
                  >
                    {Object.keys(USER_LINE_STATUS).map((key, index) => (
                      <MenuItem value={key} key={index}>
                        {USER_LINE_STATUS[key].status}
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

export default UserLinesEditPage
