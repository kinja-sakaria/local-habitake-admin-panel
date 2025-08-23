/* eslint-disable prettier/prettier */
import { Table, TableHead, TableBody, TableRow, TableCell, Checkbox, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { Eye } from 'iconsax-reactjs';
import Avatar from 'components/@extended/Avatar';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import IconButton from 'components/@extended/IconButton';

const userData = [
  {
    id: 1,
    name: 'Meritas',
    role: 'Seller',
    type: 'Residential',
    createdDate: '12/26/2025',
    proof: 'Aadhar Card',
    value: '30000',
    idNumber: '1234 5678 9012',
    location: 'NY 1003, USA',
  },
  {
    id: 2,
    name: 'Meritas',
    role: 'Agent',
    type: 'Residential',
    createdDate: '12/26/2025',
    proof: 'Driving License',
    value: '30000',
    idNumber: '1234 5678 9012',
    location: 'NY 1003, USA',
  },
  {
    id: 3,
    name: 'Meritas',
    role: 'Seller',
    type: 'Residential',
    createdDate: '12/26/2025',
    proof: 'Passport',
    value: '30000',
    idNumber: '1234 5678 9012',
    location: 'NY 1003, USA',
  },
  {
    id: 4,
    name: 'Meritas',
    role: 'Agent',
    createdDate: '12/26/2025',
    proof: 'Passport',
    value: '30000',
    idNumber: '1234 5678 9012',
    location: 'NY 1003, USA',
  },
  {
    id: 5,
    name: 'Meritas',
    role: 'Agent',
    createdDate: '12/26/2025',
    proof: 'Driving License',
    value: '30000',
    idNumber: '1234 5678 9012',
    location: 'NY 1003, USA',
  },
  {
    id: 6,
    name: 'Meritas',
    role: 'Agent',
    createdDate: '12/26/2025',
    proof: 'Aadhar Card',
    value: '30000',
    idNumber: '1234 5678 9012',
    location: 'NY 1003, USA',
  },
];

export default function VerificationTable({ activeTab }) {
  const [selected, setSelected] = useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = userData.map((user) => user.id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  const handleRowClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter((selectedId) => selectedId !== id);
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <Box>
      <Table>
        <TableHead sx={{ bgcolor: '#F8F9FA' }}>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                indeterminate={selected.length > 0 && selected.length < userData.length}
                checked={selected.length === userData.length}
                onChange={handleSelectAllClick}
              />
            </TableCell>
            <TableCell sx={{ fontSize: '18px' }}>Name</TableCell>
            <TableCell sx={{ fontSize: '18px' }}>{activeTab === 1 ? 'Type' : 'Role'}</TableCell>
            <TableCell sx={{ fontSize: '18px' }}>Created Date</TableCell>
            <TableCell sx={{ fontSize: '18px' }}>{activeTab === 1 ? 'Value' : 'Proof of ID'}</TableCell>
            <TableCell sx={{ fontSize: '18px' }}>{activeTab === 1 ? 'Location' : 'ID Number'}</TableCell>
            <TableCell sx={{ fontSize: '18px', textAlign: 'center' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((user) => {
            const isItemSelected = isSelected(user.id);
            return (
              <TableRow key={user.id} hover selected={isItemSelected}>
                <TableCell padding="checkbox">
                  <Checkbox color="primary" checked={isItemSelected} onChange={() => handleRowClick(user.id)} />
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1} sx={{ fontSize: '18px' }}>
                    {activeTab === 1 ? '' : <Avatar alt={user.name} src="/avatar.png" size="xs" />}
                    {user.name}
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: '18px' }}>{activeTab === 1 ? user.type || '-' : user.role || '-'}</TableCell>
                <TableCell sx={{ fontSize: '18px' }}>{user.createdDate || '-'}</TableCell>
                <TableCell sx={{ fontSize: '18px' }}>{activeTab === 1 ? user.value || '-' : user.proof || '-'}</TableCell>
                <TableCell sx={{ fontSize: '18px' }}>{activeTab === 1 ? user.location || '-' : user.idNumber || '-'}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <IconButton sx={{ color: '#565F68' }} color="secondary">
                      <Eye />
                    </IconButton>
                    <IconButton sx={{ color: '#DC2626' }} color="error">
                      <CloseIcon />
                    </IconButton>
                    <Button variant="contained" color="success" size="small" sx={{ borderRadius: '100px' }} startIcon={<DoneIcon />}>
                      Approve
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
}
