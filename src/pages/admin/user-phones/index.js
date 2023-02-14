import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import { Typography } from '@mui/material'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'

import Icon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'
import TableHeader from 'src/views/admin/user-phones/list/TableHeader'
import AssignPhoneDrawer from 'src/views/admin/user-phones/list/AssignPhoneDrawer'
import { USER_LINE_STATUS } from 'src/configs/constants'
import { fetchData as fetchUserData } from 'src/store/apps/user'
import { fetchData as fetchLineData } from 'src/store/apps/line'
import { fetchData as fetchUserLineData, deleteUserLine } from 'src/store/apps/user-lines'

const RowOptions = ({ id }) => {
  // ** Hooks
  const dispatch = useDispatch()

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    dispatch(deleteUserLine(id))
    handleRowOptionsClose()
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='mdi:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          onClick={handleRowOptionsClose}
          href={`/admin/user-phones/view/${id}`}
        >
          <Icon icon='mdi:eye-outline' fontSize={20} />
          View
        </MenuItem>
        <MenuItem
          component={Link}
          onClick={handleRowOptionsClose}
          href={`/admin/user-phones/${id}`}
          sx={{ '& svg': { mr: 2 } }}
        >
          <Icon icon='mdi:pencil-outline' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:delete-outline' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

const columns = [
  {
    flex: 0.1,
    minWidth: 100,
    field: 'label',
    headerName: 'Label',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap variant='body2'>
          {row.label}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'user.nickName',
    headerName: 'UserName',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap variant='body2'>
          {row.user.nickName}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'line.phoneNumber',
    headerName: 'PhoneNumber',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap variant='body2'>
          {row.line.phoneNumber}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }) => {
      return (
        <CustomChip
          skin='light'
          size='small'
          label={USER_LINE_STATUS[row.status].status}
          color={USER_LINE_STATUS[row.status].color}
          sx={{ textTransform: 'capitalize' }}
        />
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'deleted',
    headerName: 'deleted',
    renderCell: ({ row }) => {
      return (
        <CustomChip skin='light' size='small' label={row.deleted ? 'Yes' : 'No'} sx={{ textTransform: 'capitalize' }} />
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 220,
    field: 'createdAt',
    headerName: 'Created At',
    renderCell: ({ row }) => {
      return (
        <CustomChip
          skin='light'
          size='small'
          label={new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }).format(row.createdAt * 1000)}
          sx={{ textTransform: 'capitalize' }}
        />
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 220,
    field: 'updatedAt',
    headerName: 'Updated At',
    renderCell: ({ row }) => {
      return (
        <CustomChip
          skin='light'
          size='small'
          label={new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }).format(row.updatedAt * 1000)}
          sx={{ textTransform: 'capitalize' }}
        />
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => <RowOptions id={row.id} />
  }
]

const UserLinesPage = () => {
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [addLineOpen, setAddLineOpen] = useState(false)

  const dispatch = useDispatch()
  const store = useSelector(state => state)
  useEffect(() => {
    dispatch(
      fetchUserData({
        q: value
      })
    )
    dispatch(
      fetchLineData({
        q: value
      })
    )
    dispatch(
      fetchUserLineData({
        q: value
      })
    )
  }, [dispatch, value])

  useEffect(() => {
    dispatch(
      fetchLineData({
        q: value
      })
    )
  }, [dispatch, value, store.userLines])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const toggleAddLineDrawer = () => setAddLineOpen(!addLineOpen)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Manage User Phones' />
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddLineDrawer} />
          <DataGrid
            autoHeight
            rows={store.userLines?.data}
            columns={columns}
            checkboxSelection
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>
      <AssignPhoneDrawer open={addLineOpen} toggle={toggleAddLineDrawer} store={store} />
    </Grid>
  )
}

export default UserLinesPage
