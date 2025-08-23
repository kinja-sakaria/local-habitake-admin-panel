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
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const rows = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: 'Meritas',
  userId: 'SHTER89',
  paymentMethod: ['Credit Card', 'Debit Card', 'Net Banking'][i % 3],
  transactionId: ['10223453', '10223489', '10223490'][i % 3],
  amount: ['$500', '$400', '$300'][i % 3],
  status: ['Completed', 'Failed', 'Pending'][i % 3],
}));

const getStatusColor = (status) => {
  switch (status) {
    case 'Completed':
      return { color: '#2CA87F', bg: '#E1FCEF' };
    case 'Failed':
      return { color: '#D32F2F', bg: '#F9E0E0' };
    case 'Pending':
      return { color: '#FF9800', bg: '#FFF0D9' };
    default:
      return {};
  }
};

export default function TransactionHistory() {
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState([]);
  const [selected, setSelected] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [tempFilters, setTempFilters] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tempSortOrder, setTempSortOrder] = useState(null);

  const handleFilterToggle = (value) => {
    setTempFilters((prev) => (prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]));
  };

  const filteredRows = rows
    .filter((row) => {
      if (filters.length === 0) return true;
      return filters.includes(row.status.toLowerCase()) || filters.includes(row.paymentMethod.toLowerCase().replace(' ', ''));
    })
    .filter((row) => {
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return (
        row.name.toLowerCase().includes(term) || row.userId.toLowerCase().includes(term) || row.transactionId.toLowerCase().includes(term)
      );
    });

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (sortOrder === 'hightolowamount') {
      return parseFloat(b.amount.replace(/[^0-9.-]+/g, '')) - parseFloat(a.amount.replace(/[^0-9.-]+/g, ''));
    }
    if (sortOrder === 'lowtohighamount') {
      return parseFloat(a.amount.replace(/[^0-9.-]+/g, '')) - parseFloat(b.amount.replace(/[^0-9.-]+/g, ''));
    }
    return 0;
  });

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const allIds = rows.map((row) => row.id);
      setSelected(allIds);
    } else {
      setSelected([]);
    }
  };

  const handleRowClick = (id) => {
    setSelected((prevSelected) => (prevSelected.includes(id) ? prevSelected.filter((item) => item !== id) : [...prevSelected, id]));
  };

  const isSelected = (id) => selected.includes(id);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleApplyFilters = () => {
    setFilters(tempFilters);
    setSortOrder(tempSortOrder);
    setMenuOpen(false);
  };

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  return (
    <Box>
      {/* Top bar: Search and Sort */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          // placeholder="Search 100 records..."
          placeholder="Search..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: 250,
            '& .MuiOutlinedInput-root': {
              borderRadius: '100px',
              fontSize: '18px',
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

        <Select
          displayEmpty
          size="small"
          IconComponent={ArrowDropDownIcon}
          renderValue={() => 'Sort by'}
          open={menuOpen}
          onOpen={() => setMenuOpen(true)}
          onClose={(event, reason) => {
            if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
              setMenuOpen(false);
            }
          }}
          sx={{
            width: 114,
            '&.MuiOutlinedInput-root': {
              borderRadius: '100px',
            },
          }}
          MenuProps={{
            disableAutoFocusItem: true,
            PaperProps: {
              sx: {
                width: 200,
              },
            },
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'right',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'right',
            },
          }}
        >
          <MenuItem
            value="all"
            onClick={(e) => {
              e.preventDefault();
              setTempFilters([]);
              setFilters([]);
            }}
          >
            <Checkbox checked={tempFilters.length === 0} color="success" />
            All
          </MenuItem>

          <MenuItem
            value="completed"
            onClick={(e) => {
              e.preventDefault();
              handleFilterToggle('completed');
            }}
          >
            <Checkbox checked={tempFilters.includes('completed')} color="success" />
            Completed
          </MenuItem>

          <MenuItem
            value="failed"
            onClick={(e) => {
              e.preventDefault();
              handleFilterToggle('failed');
            }}
          >
            <Checkbox checked={tempFilters.includes('failed')} color="success" />
            Failed
          </MenuItem>
          <MenuItem
            value="hightolowamount"
            onClick={(e) => {
              e.preventDefault();
              setTempSortOrder(tempSortOrder === 'hightolowamount' ? null : 'hightolowamount');
            }}
          >
            <Checkbox checked={tempSortOrder === 'hightolowamount'} color="success" />
            High to low amount
          </MenuItem>

          <MenuItem
            value="lowtohighamount"
            onClick={(e) => {
              e.preventDefault();
              setTempSortOrder(tempSortOrder === 'lowtohighamount' ? null : 'lowtohighamount');
            }}
          >
            <Checkbox checked={tempSortOrder === 'lowtohighamount'} color="success" />
            Low to high amount
          </MenuItem>

          <MenuItem
            value="pending"
            onClick={(e) => {
              e.preventDefault();
              handleFilterToggle('pending');
            }}
          >
            <Checkbox checked={tempFilters.includes('pending')} color="success" />
            Pending
          </MenuItem>

          <MenuItem
            value="creditcard"
            onClick={(e) => {
              e.preventDefault();
              handleFilterToggle('creditcard');
            }}
          >
            <Checkbox checked={tempFilters.includes('creditcard')} color="success" />
            Credit Card
          </MenuItem>

          <MenuItem
            value="debitcard"
            onClick={(e) => {
              e.preventDefault();
              handleFilterToggle('debitcard');
            }}
          >
            <Checkbox checked={tempFilters.includes('debitcard')} color="success" />
            Debit Card
          </MenuItem>

          <MenuItem
            value="netbanking"
            onClick={(e) => {
              e.preventDefault();
              handleFilterToggle('netbanking');
            }}
          >
            <Checkbox checked={tempFilters.includes('netbanking')} color="success" />
            Net Banking
          </MenuItem>
          <MenuItem disableRipple>
            <Button variant="contained" color="success" sx={{ width: '100%', borderRadius: '100px' }} onClick={handleApplyFilters}>
              Apply
            </Button>
          </MenuItem>
        </Select>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="success"
                  indeterminate={selected.length > 0 && selected.length < filteredRows.length}
                  checked={filteredRows.length > 0 && selected.length === filteredRows.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell sx={{ fontSize: '18px' }}>Name</TableCell>
              <TableCell sx={{ fontSize: '18px' }}>User ID</TableCell>
              <TableCell sx={{ fontSize: '18px' }}>Payment Method</TableCell>
              <TableCell sx={{ fontSize: '18px' }}>Transaction ID</TableCell>
              <TableCell sx={{ fontSize: '18px' }}>Amount</TableCell>
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
                const statusColor = getStatusColor(row.status);
                return (
                  <TableRow key={row.id} hover selected={selectedRow}>
                    <TableCell padding="checkbox">
                      <Checkbox color="success" checked={selectedRow} onChange={() => handleRowClick(row.id)} />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Avatar alt={row.name} src="https://i.pravatar.cc/100" sx={{ width: 24, height: 24 }} />
                        <Typography sx={{ fontSize: '18px', lineHeight: '1.66px' }}>{row.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontSize: '18px' }}>{row.userId}</TableCell>
                    <TableCell sx={{ fontSize: '18px' }}>{row.paymentMethod}</TableCell>
                    <TableCell sx={{ fontSize: '18px' }}>{row.transactionId}</TableCell>
                    <TableCell sx={{ fontSize: '18px' }}>{row.amount}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          borderRadius: '10px',
                          fontSize: '18px',
                          fontWeight: 400,
                          textAlign: 'center',
                          color: statusColor.color,
                          bgcolor: statusColor.bg,
                          textTransform: 'capitalize',
                        }}
                      >
                        {row.status}
                      </Box>
                    </TableCell>
                    {/* <TableCell sx={{ fontSize: '18px', padding: '10px 16px' }}>{getStatusColor(row.status)}</TableCell> */}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

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
  );
}
