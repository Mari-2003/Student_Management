import React from 'react'
import TableTemplate from '../../../components/layout/TableTemplate'
import {Box} from '@mui/material'


const circularColumns = [
    { id: 'rollNumber', label: 'Roll Number'},
    { id: 'name', label: 'Name', minWidth: 50 },
    {id: "class" , label:"Class",  minWidth: 50},
    {id: "complaint", label:"Complaint", minwidth: 50},
]

const circularRows =[
    { rollNumber: '001', name: 'Alice Johnson', class: '10', section: 'A', complaint: 'alice.johnson@example.com' },
]
const Complain = () => {
  return (
    <Box container sx={{px:3 , pt:10, pb:3}}>
        <TableTemplate columns={circularColumns} rows={circularRows}/>
    </Box>
  )
}

export default Complain