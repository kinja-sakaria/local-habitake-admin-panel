import { useState } from 'react';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { Button } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

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
import { ArrowDown, ArrowUp } from 'iconsax-reactjs';
import ActionButtons from './ActionButtons';

export default function PropertyData({ activeTab, onViewUser, onTabChange }) {
  const rows = Array.from({ length: 20 }, (_, i) => {
    return {
      id: i + 1,
      propertyname: 'Meritas',
      visits: ['120', '145', '210'][i % 3],
      propertytype: ['Rental', 'Residential', 'Commercial', 'Luxury'][i % 4],
      creator: ['Ada Merino - seller', 'Ada Merino - Agent', 'Ada Merino - Agency', 'Ada Merino - Agency'][i % 4],
      registrationDate: ['01/01/2025', '01/9/2025', '20/01/2025'][i % 3],
      country: 'NY 1003, USA',
      price: '$5000'
    };
  });

  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const columns = [
    { key: 'propertyname', label: 'Property name' },
    { key: 'visits', label: 'Visits' },
    { key: 'propertytype', label: 'Property Type' },
    { key: 'creator', label: 'Creator' },
    { key: 'registrationDate', label: 'Registered On' },
    { key: 'country', label: 'Country' }
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
      row.propertyname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.visits.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.registrationDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.propertytype.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.price.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
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

  return (
    <Box>
      {/* Top bar: Search and Sort */}
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', md: 'center' }}
        p={2.5}
        gap={2}
      >
        <ActionButtons activeTab={activeTab} onTabChange={onTabChange} />

        {/* Actions */}
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          gap={2}
          width={{ xs: '100%', sm: 'auto' }}
        >
          {activeTab === 1 && (
            <>
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
            </>
          )}

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
          {activeTab === 0 && (
            <Select
              displayEmpty
              size="small"
              IconComponent={ArrowDropDownIcon}
              renderValue={() => 'Sort by (#)'}
              open={roleMenuOpen}
              onOpen={() => setRoleMenuOpen(true)}
              onClose={() => setRoleMenuOpen(false)}
              value={sortConfig.key || ''}
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
                      borderBottom: '1px solid #E8EBEE',
                      '&.Mui-selected': {
                        backgroundColor: '#fff !important',
                        color: '#333A54'
                      },
                      '&.Mui-selected:hover': {
                        backgroundColor: '#f5f5f5 !important'
                      }
                    }
                  }
                }
              }}
            >
              {columns.map(({ key, label }) => (
                <MenuItem
                  key={key}
                  value={key} // ✅ this matches Select’s value
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
          )}
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
              {activeTab === 1 && (
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
              )}
              <TableCell sx={{ fontSize: '18px' }}>Property name</TableCell>
              <TableCell sx={{ fontSize: '18px' }}>{activeTab === 0 ? 'Visits' : 'Property Type'}</TableCell>
              <TableCell sx={{ fontSize: '18px' }}>{activeTab === 0 ? 'Property Type' : 'Creator'}</TableCell>
              <TableCell sx={{ fontSize: '18px' }}>{activeTab === 0 ? 'Creator' : 'Created On'}</TableCell>
              <TableCell sx={{ fontSize: '18px' }}>{activeTab === 0 ? 'Registered On' : 'Country'}</TableCell>
              <TableCell sx={{ fontSize: '18px' }}>{activeTab === 0 ? 'Country' : 'Price'}</TableCell>
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
                  <TableRow key={row.id} hover active={activeTab === 1 && selectedRow} onClick={() => onViewUser && onViewUser(row)}>
                    {activeTab === 1 && (
                      <TableCell
                        padding="checkbox"
                        sx={{
                          paddingLeft: '20px'
                        }}
                      >
                        <Checkbox
                          color="success"
                          checked={selectedRow}
                          onClick={(e) => e.stopPropagation()}
                          onChange={() => handleRowClick(row.id)}
                        />
                      </TableCell>
                    )}
                    <TableCell sx={{ fontSize: '18px', cursor: 'pointer' }}>{row.propertyname}</TableCell>

                    <TableCell sx={{ fontSize: '18px' }}>{activeTab === 0 ? row.visits : row.propertytype}</TableCell>
                    <TableCell sx={{ fontSize: '18px' }}>{activeTab === 0 ? row.propertytype : row.creator}</TableCell>
                    <TableCell sx={{ fontSize: '18px' }}>{activeTab === 0 ? row.creator : row.registrationDate}</TableCell>
                    <TableCell sx={{ fontSize: '18px' }}>{activeTab === 0 ? row.registrationDate : row.country}</TableCell>
                    <TableCell sx={{ fontSize: '18px' }}>{activeTab === 0 ? row.country : row.price}</TableCell>
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
