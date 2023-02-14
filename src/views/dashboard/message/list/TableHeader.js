// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useDispatch } from 'react-redux'
import { fetchData } from 'src/store/apps/message'

const TableHeader = props => {
  // ** Props
  const { handleFilter, value } = props
  const dispatch = useDispatch()

  const handleRefresh = () => {
    dispatch(
      fetchData({
        q: value
      })
    )
  }

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Button
        sx={{ mr: 4, mb: 2 }}
        color='secondary'
        variant='outlined'
        startIcon={<Icon icon='mdi:export-variant' fontSize={20} />}
      >
        Export
      </Button>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          sx={{ mr: 4, mb: 2 }}
          placeholder='Search Phone'
          onChange={e => handleFilter(e.target.value)}
        />
        <Button onClick={handleRefresh} sx={{ mb: 2 }} variant='contained'>
          Refresh
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
