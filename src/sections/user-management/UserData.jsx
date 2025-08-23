import { useState } from 'react';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { Button } from '@mui/material';

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Avatar,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  MenuItem,
  Select,
  Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ArrowDown, ArrowUp, Eye, Verify, CloseCircle } from 'iconsax-reactjs';
import DeleteConfirmModal from 'components/modal/DeleteConfirmModal';
import { HourGlassIcon, DeleteIcon } from 'components/asstes';

const getStatusColor = (status) => {
  switch (status) {
    case 'Active':
      return { color: '#2CA87F', bg: '#E1FCEF' };
    case 'In-Active':
      return { color: '#BEBEBE', bg: 'rgba(190, 190, 190, 0.15)' };
    case 'Suspend':
      return { color: '#FFA500', bg: 'rgba(255, 165, 0, 0.15)' };
    default:
      return {};
  }
};

const getStatus = (approvestatus) => {
  switch (approvestatus) {
    case 'approve':
      return <Verify size="20" color="#01A669" variant="Bold" />;
    case 'reject':
      return <CloseCircle size="20" color="#F44336" variant="Bold" />;
    case 'pending':
      return <HourGlassIcon size="20" />;
    default:
      return {};
  }
};

export default function UserData({ activeTab, onViewUser }) {
  const rows = Array.from({ length: 20 }, (_, i) => {
    // base status cycle
    let baseStatuses = ['Active', 'In-Active'];

    // when activeTab == 2, add Suspend in rotation
    if (activeTab === 2) {
      baseStatuses = ['Active', 'In-Active', 'Suspend'];
    }

    return {
      id: i + 1,
      name: 'Meritas',
      email: ['meritas@gmail.com', 'oliv@gmail.com', 'johan@gmail.com'][i % 3],
      phone: ['+1-368-123456', '+91 99999999999', '+91 99567695967'][i % 3],
      status: baseStatuses[i % baseStatuses.length],
      agencyteammember: ['11', '12', '18'][i % 3],
      registrationDate: ['01/01/2025', '01/9/2025', '20/01/2025'][i % 3],
      role: ['Agent', 'Seller'][i % 2],
      approvestatus: ['approve', 'reject', 'pending'][i % 3]
    };
  });

  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    ...(activeTab === 0 ? [{ key: 'phone', label: 'Phone' }] : []),
    { key: 'status', label: 'Status' },
    activeTab === 1
      ? { key: 'agencyteammember', label: 'Agency Team Member' }
      : activeTab === 2
        ? { key: 'registrationDate', label: 'Registration Date' }
        : { key: 'role', label: 'Role' }
  ];

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const allIds = sortedRows.map((row) => row.id);
      setSelected(allIds);
    } else {
      setSelected([]);
    }
  };

  const handleRowClick = (id) => {
    setSelected((prevSelected) => (prevSelected.includes(id) ? prevSelected.filter((item) => item !== id) : [...prevSelected, id]));
  };

  const filteredRows = rows.filter((row) => {
    const matchesSearch =
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.registrationDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.agencyteammember.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.phone.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = selectedRoles.length === 0 || selectedRoles.includes(row.role);

    return matchesSearch && matchesRole;
  });

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];

    // normalize strings
    if (typeof aVal === 'string') aVal = aVal.toLowerCase();
    if (typeof bVal === 'string') bVal = bVal.toLowerCase();

    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const isSelected = (id) => selected.includes(id);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const handleDeleteClick = (id) => {
    setDeleteUserId(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log('Deleting user id:', deleteUserId);
    setDeleteModalOpen(false);
    setDeleteUserId(null);
  };
  return (
    <Box>
      {/* Top bar: Search and Sort */}
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', md: 'center' }}
        mb={2}
        p={2.5}
        gap={2}
      >
        {/* Search Bar */}
        <TextField
          placeholder="Search..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth={true}
          sx={{
            maxWidth: { xs: '100%', sm: 250 },
            '& .MuiOutlinedInput-root': {
              borderRadius: '100px',
              fontSize: '16px'
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#5B6B79' }} />
              </InputAdornment>
            )
          }}
        />

        {/* Actions */}
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          gap={2}
          width={{ xs: '100%', sm: 'auto' }}
        >
          {/* Delete Button */}
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{ borderRadius: '100px', width: { xs: '100%', sm: 'auto' } }}
          >
            Delete all
          </Button>

          {/* Sort by Role (only when activeTab === 0) */}
          {activeTab === 0 && (
            <Select
              displayEmpty
              size="small"
              IconComponent={ArrowDropDownIcon}
              renderValue={() => 'Sort by Role'}
              open={menuOpen}
              onOpen={() => setMenuOpen(true)}
              onClose={() => setMenuOpen(false)}
              sx={{
                width: { xs: '100%', sm: 152 },
                borderRadius: '100px'
              }}
              MenuProps={{
                PaperProps: { sx: { width: 200 } },
                anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
                transformOrigin: { vertical: 'top', horizontal: 'right' }
              }}
            >
              {['All', 'Seller', 'Agent'].map((role) => (
                <MenuItem
                  key={role}
                  value={role}
                  onClick={() => {
                    if (role === 'All') {
                      setSelectedRoles([]);
                    } else {
                      setSelectedRoles([role]);
                    }
                  }}
                >
                  <Checkbox checked={role === 'All' ? selectedRoles.length === 0 : selectedRoles.includes(role)} color="success" />
                  {role}
                </MenuItem>
              ))}
            </Select>
          )}

          {/* Sort by Columns */}
          <Select
            displayEmpty
            size="small"
            IconComponent={ArrowDropDownIcon}
            renderValue={() => 'Sort by (#)'}
            open={roleMenuOpen}
            onOpen={() => setRoleMenuOpen(true)}
            onClose={() => setRoleMenuOpen(false)}
            sx={{
              width: { xs: '100%', sm: 189 },
              borderRadius: '100px'
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  width: 200,
                  '& .MuiMenu-list': { p: 0 },
                  '& .MuiMenuItem-root': {
                    p: '10px 20px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#5B6B79',
                    borderBottom: '1px solid #E8EBEE'
                  }
                }
              }
            }}
          >
            {columns.map(({ key, label }) => (
              <MenuItem
                key={key}
                onClick={() =>
                  setSortConfig((prev) => ({
                    key,
                    direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
                  }))
                }
              >
                <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                  {label}
                  <Box color="#333A54" fontSize={14} sx={{ cursor: 'pointer' }}>
                    <ArrowUp size="15" color="#333A54" />
                    <ArrowDown size="15" color="#333A54" />
                  </Box>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: 0
        }}
      >
        <Table>
          <TableHead>
            <TableRow bgcolor="#F8F9FA">
              <TableCell
                padding="checkbox"
                sx={{
                  paddingLeft: '20px'
                }}
              >
                <Checkbox
                  color="success"
                  indeterminate={selected.length > 0 && selected.length < sortedRows.length}
                  checked={sortedRows.length > 0 && selected.length === sortedRows.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell sx={{ fontSize: '18px' }}>Name</TableCell>
              <TableCell sx={{ fontSize: '18px' }}>Email</TableCell>
              {activeTab === 0 && <TableCell sx={{ fontSize: '18px' }}>Phone</TableCell>}
              <TableCell sx={{ fontSize: '18px' }}>Status</TableCell>
              {/* <TableCell sx={{ fontSize: '18px' }}>Role</TableCell> */}
              <TableCell sx={{ fontSize: '18px' }}>
                {activeTab === 1 ? 'Agency Team Member' : activeTab === 2 ? 'Registration Date' : 'Role'}
              </TableCell>

              <TableCell sx={{ fontSize: '18px' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="textSecondary">
                    No records available
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                const selectedRow = isSelected(row.id);
                const statusColor = getStatusColor(row.status);
                const statusApprove = getStatus(row.approvestatus);
                console.log('status', statusApprove);
                return (
                  <TableRow key={row.id} hover selected={selectedRow}>
                    <TableCell
                      padding="checkbox"
                      sx={{
                        paddingLeft: '20px'
                      }}
                    >
                      <Checkbox color="success" checked={selectedRow} onChange={() => handleRowClick(row.id)} />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Avatar alt={row.name} src="https://i.pravatar.cc/100" sx={{ width: 24, height: 24 }} />
                        {/* <Typography sx={{ fontSize: '18px', lineHeight: '1.66px' }}> {row.name}</Typography> */}
                        <Typography sx={{ fontSize: '18px', lineHeight: '1.66px', display: 'flex', alignItems: 'center', gap: 1 }}>
                          {row.name}
                          {(activeTab === 1 || activeTab === 2) && getStatus(row.approvestatus)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontSize: '18px' }}>{row.email}</TableCell>
                    {activeTab === 0 && <TableCell sx={{ fontSize: '18px' }}>{row.phone}</TableCell>}
                    <TableCell>
                      <Box
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          borderRadius: '100px',
                          fontSize: '18px',
                          fontWeight: 400,
                          textAlign: 'center',
                          color: statusColor.color,
                          bgcolor: statusColor.bg,
                          textTransform: 'capitalize'
                        }}
                      >
                        {row.status}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontSize: '18px' }}>
                      {activeTab === 1 ? row.agencyteammember : activeTab === 2 ? row?.registrationDate : row.role}
                    </TableCell>

                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <IconButton sx={{ color: '#565F68' }} color="secondary" onClick={() => onViewUser && onViewUser(row)}>
                          <Eye />
                        </IconButton>
                        <IconButton sx={{ color: '#DC2626' }} color="error" onClick={() => handleDeleteClick(row.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {/* Delete confirmation modal */}
        <DeleteConfirmModal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={handleConfirmDelete} />

        {/* Custom Pagination */}
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography color="#828E99">Row per page</Typography>
            <Select value={rowsPerPage} onChange={handleChangeRowsPerPage} size="small">
              {[5, 10, 25].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>

            <Typography color="#828E99">Go to</Typography>
            <TextField
              value={page + 1}
              onChange={(e) => {
                let val = Number(e.target.value);
                if (val >= 1 && val <= totalPages) setPage(val - 1);
              }}
              size="small"
              type="number"
              inputProps={{ min: 1, max: totalPages, style: { width: 50 } }}
            />
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton
              onClick={() => setPage(0)}
              disabled={page === 0}
              sx={{
                border: '1px solid #E8EBEE',
                borderRadius: '100px'
              }}
            >
              <FirstPageRoundedIcon />
            </IconButton>
            <IconButton
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0}
              sx={{
                border: '1px solid #E8EBEE',
                borderRadius: '100px'
              }}
            >
              <NavigateBeforeRoundedIcon />
            </IconButton>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(page, page + 5)
              .map((p) => (
                <IconButton
                  key={p}
                  onClick={() => setPage(p - 1)}
                  sx={{
                    bgcolor: p - 1 === page ? 'success.main' : 'transparent',
                    color: p - 1 === page ? 'white' : 'inherit',
                    border: '1px solid #E8EBEE',
                    borderRadius: '100px',
                    '&:hover': {
                      bgcolor: 'success.main',
                      color: 'white'
                    }
                  }}
                >
                  {p}
                </IconButton>
              ))}

            {page + 5 < totalPages && <Typography>...</Typography>}

            <IconButton
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
              disabled={page >= totalPages - 1}
              sx={{
                border: '1px solid #E8EBEE',
                borderRadius: '100px'
              }}
            >
              <NavigateNextRoundedIcon color="#565F68" />
            </IconButton>
            <IconButton
              onClick={() => setPage(totalPages - 1)}
              disabled={page >= totalPages - 1}
              sx={{
                border: '1px solid #E8EBEE',
                borderRadius: '100px'
              }}
            >
              <LastPageRoundedIcon color="#565F68" />
            </IconButton>
          </Stack>
        </Box>
      </TableContainer>
    </Box>
  );
}
