import { useState } from 'react';
import { Button } from '@mui/material';
import PricingPlans from './PricingPlans';
import MainCard from 'components/MainCard';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { ArrowDown, ArrowUp } from 'iconsax-reactjs';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteConfirmModal from 'components/modal/DeleteConfirmModal';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
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
  Stack,
} from '@mui/material';

export default function SubscribersList({ activeTab }) {
  const rows = Array.from({ length: 20 }, (_, i) => {
    return {
      id: i + 1,
      name: 'Meritas',
      date: ['01/01/2025', '01/9/2025', '20/01/2025'][i % 3],
      plan: ['Premium', 'Starter', 'Standard'][i % 3],
      amount: ['$129', '$189', '$200'][i % 3],
      expiryDate: ['26/12/2026', '29/12/2026', '31/12/2026'][i % 3],
    };
  });

  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedPlan, setSelectedPlan] = useState([]);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'date', label: 'Date' },
    { key: 'plan', label: 'Plan' },
    { key: 'amount', label: 'Amount' },
    { key: 'expiryDate', label: 'Expiry Date' },
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
      row.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.expiryDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.plan.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPlan = selectedPlan.length === 0 || selectedPlan.includes(row.plan);

    return matchesSearch && matchesPlan;
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
    <>
      {activeTab === 0 ? (
        <>
          <PricingPlans />
        </>
      ) : (
        <MainCard sx={{ '& .MuiCardContent-root': { padding: 0 } }} border={false}>
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
                    fontSize: '16px',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#5B6B79' }} />
                    </InputAdornment>
                  ),
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
                  color="success"
                  startIcon={<DoneIcon />}
                  sx={{ borderRadius: '100px', width: { xs: '100%', sm: 'auto' } }}
                >
                  Approve all
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<CloseIcon />}
                  sx={{ borderRadius: '100px', width: { xs: '100%', sm: 'auto' } }}
                >
                  Reject all
                </Button>

                {/* Sort by Plan  */}
                <Select
                  displayEmpty
                  size="small"
                  IconComponent={ArrowDropDownIcon}
                  renderValue={() => 'Sort by Plan'}
                  open={menuOpen}
                  onOpen={() => setMenuOpen(true)}
                  onClose={() => setMenuOpen(false)}
                  sx={{
                    width: { xs: '100%', sm: 152 },
                    borderRadius: '100px',
                  }}
                  MenuProps={{
                    PaperProps: { sx: { width: 200 } },
                    anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
                    transformOrigin: { vertical: 'top', horizontal: 'right' },
                  }}
                >
                  {['All', 'Starter', 'Premium', 'Standard'].map((plan) => (
                    <MenuItem
                      key={plan}
                      value={plan}
                      onClick={() => {
                        if (plan === 'All') {
                          setSelectedPlan([]);
                        } else {
                          setSelectedPlan([plan]);
                        }
                      }}
                    >
                      <Checkbox checked={plan === 'All' ? selectedPlan.length === 0 : selectedPlan.includes(plan)} color="success" />
                      {plan}
                    </MenuItem>
                  ))}
                </Select>

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
                    borderRadius: '100px',
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
                          borderBottom: '1px solid #E8EBEE',
                        },
                        '& .MuiMenuItem-root.Mui-selected': {
                          backgroundColor: 'white !important',
                        },
                        '& .MuiMenuItem-root.Mui-selected:hover': {
                          backgroundColor: 'white',
                        },
                        '& .MuiMenuItem-root.Mui-focusVisible': {
                          backgroundColor: 'white !important',
                        },
                      },
                    },
                  }}
                >
                  {columns.map(({ key, label }) => (
                    <MenuItem
                      key={key}
                      onClick={() =>
                        setSortConfig((prev) => ({
                          key,
                          direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
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
                borderRadius: 0,
              }}
            >
              <Table>
                <TableHead>
                  <TableRow bgcolor="#F8F9FA">
                    <TableCell
                      padding="checkbox"
                      sx={{
                        paddingLeft: '20px',
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
                    <TableCell sx={{ fontSize: '18px' }}>Date</TableCell>
                    <TableCell sx={{ fontSize: '18px' }}>Plan</TableCell>
                    <TableCell sx={{ fontSize: '18px' }}>Amount</TableCell>
                    <TableCell sx={{ fontSize: '18px' }}>Expiry Date</TableCell>
                    <TableCell sx={{ fontSize: '18px' }}>Status</TableCell>
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
                      return (
                        <TableRow key={row.id} hover selected={selectedRow}>
                          <TableCell
                            padding="checkbox"
                            sx={{
                              paddingLeft: '20px',
                            }}
                          >
                            <Checkbox color="success" checked={selectedRow} onChange={() => handleRowClick(row.id)} />
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Avatar alt={row.name} src="https://i.pravatar.cc/100" sx={{ width: 24, height: 24 }} />
                              <Typography sx={{ fontSize: '18px', lineHeight: '1.66px', display: 'flex', alignItems: 'center', gap: 1 }}>
                                {row.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ fontSize: '18px' }}>{row.date}</TableCell>
                          <TableCell sx={{ fontSize: '18px' }}>{row.plan}</TableCell>
                          <TableCell sx={{ fontSize: '18px' }}>{row.amount}</TableCell>
                          <TableCell sx={{ fontSize: '18px' }}>{row.expiryDate}</TableCell>
                          <TableCell sx={{ fontSize: '18px' }}>
                            <Select size="small" sx={{ borderRadius: '100px', minWidth: 120 }} placeholder="Select" defaultValue="select">
                              <MenuItem value="select" disabled>
                                Select
                              </MenuItem>
                              <MenuItem value="approve">Approve</MenuItem>
                              <MenuItem value="reject">Reject</MenuItem>
                            </Select>
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
                      borderRadius: '100px',
                    }}
                  >
                    <FirstPageRoundedIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                    disabled={page === 0}
                    sx={{
                      border: '1px solid #E8EBEE',
                      borderRadius: '100px',
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
                            color: 'white',
                          },
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
                      borderRadius: '100px',
                    }}
                  >
                    <NavigateNextRoundedIcon color="#565F68" />
                  </IconButton>
                  <IconButton
                    onClick={() => setPage(totalPages - 1)}
                    disabled={page >= totalPages - 1}
                    sx={{
                      border: '1px solid #E8EBEE',
                      borderRadius: '100px',
                    }}
                  >
                    <LastPageRoundedIcon color="#565F68" />
                  </IconButton>
                </Stack>
              </Box>
            </TableContainer>
          </Box>
        </MainCard>
      )}
    </>
  );
}
