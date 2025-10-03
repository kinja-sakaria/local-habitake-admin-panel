import { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { Button, CircularProgress, Alert, Snackbar, Tooltip } from '@mui/material';
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
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ArrowDown, ArrowUp, Eye } from 'iconsax-reactjs';
import ActionButtons from './ActionButtons';
import { LIST_PROPERTIES, GET_APPROVED_PROPERTIES_COUNT, GET_PENDING_PROPERTIES_COUNT } from 'graphql/propertyQueries';
import { BULK_APPROVE_PROPERTIES } from 'graphql/propertyMutations';
import { useQuery, useMutation } from '@apollo/client/react';
import { DeleteIcon } from 'components/asstes';
import DeleteConfirmModal from 'components/modal/DeleteConfirmModal';
import { DELETE_PROPERTY } from 'graphql/propertyMutations';

export default function PropertyData({ activeTab, onViewUser, onTabChange }) {
  const { t } = useTranslation();
  const [page, setPage] = useState(1); // API uses 1-based pagination
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState({
    type: 'bulk',
    ids: [],
  });

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  const getStatusFilter = useCallback((tab) => {
    switch (tab) {
      case 0:
        return 'APPROVED'; // Residential tab - approved properties
      case 1:
        return 'PENDING'; // Commercial tab - pending properties
      default:
        return null; // No filter for all properties
    }
  }, []);

  const currentStatusFilter = getStatusFilter(activeTab);

  // GraphQL query with exact schema match
  const { data, loading, error, refetch } = useQuery(LIST_PROPERTIES, {
    variables: {
      limit: rowsPerPage,
      page: page,
      approvalStatus: currentStatusFilter || undefined,
    },
    notifyOnNetworkStatusChange: true,
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  });

  // Count queries for ActionButtons
  const { data: approvedCountData } = useQuery(GET_APPROVED_PROPERTIES_COUNT, {
    errorPolicy: 'ignore',
    fetchPolicy: 'cache-and-network',
  });

  const { data: pendingCountData } = useQuery(GET_PENDING_PROPERTIES_COUNT, {
    errorPolicy: 'ignore',
    fetchPolicy: 'cache-and-network',
  });
  const [deleteProperty, { loading: deleteApiLoading }] = useMutation(DELETE_PROPERTY, {
    refetchQueries: [
      {
        query: LIST_PROPERTIES,
        variables: {
          limit: rowsPerPage,
          page,
          approvalStatus: currentStatusFilter || undefined,
        },
      },
      { query: GET_APPROVED_PROPERTIES_COUNT },
      { query: GET_PENDING_PROPERTIES_COUNT },
    ],
    awaitRefetchQueries: true,
  });

  // Bulk approval mutation
  const [bulkApproveProperties, { loading: bulkLoading }] = useMutation(BULK_APPROVE_PROPERTIES, {
    refetchQueries: [
      { query: LIST_PROPERTIES, variables: { limit: rowsPerPage, page: page, approvalStatus: 'APPROVED' } },
      { query: LIST_PROPERTIES, variables: { limit: rowsPerPage, page: page, approvalStatus: 'PENDING' } },
      { query: GET_APPROVED_PROPERTIES_COUNT },
      { query: GET_PENDING_PROPERTIES_COUNT },
    ],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      if (data.bulkApproveProperties.success) {
        const { successCount, errorCount, totalProcessed } = data.bulkApproveProperties.data;
        setNotification({
          open: true,
          message: t('properties.bulkApprovalSuccess', {
            success: successCount,
            error: errorCount,
            total: totalProcessed,
          }),
          severity: errorCount > 0 ? 'warning' : 'success',
        });
        setSelected([]);
      }
    },
    onError: (error) => {
      setNotification({
        open: true,
        message: error.message || t('properties.bulkApprovalErrorOccurred'),
        severity: 'error',
      });
    },
  });

  // Extract data from API response with exact schema match
  const apiData = data?.listProperties || {};
  const properties = apiData.data || [];
  const totalCount = apiData.totalCount || apiData.count || 0;
  const totalPages = apiData.totalPages || 1;
  const hasNextPage = apiData.hasNextPage || false;
  const hasPreviousPage = apiData.hasPreviousPage || false;
  const currentPage = page; // Use local page state

  // Transform API data to table format
  const transformedProperties = useMemo(() => {
    return properties.map((property) => ({
      id: property.id,
      propertyname: property.title || 'N/A',
      visits: property.visitsCount || '0',
      propertytype: property.propertyType || 'N/A',
      creator: `${property.firstName} ${property.lastName}`,
      registrationDate: property.createdAt ? new Date(property.createdAt).toLocaleDateString() : 'N/A',
      country: property.country || 'N/A',
      price: property.price ? `$${property.price}` : 'N/A',
      address: property.address || 'N/A',
      city: property.city || 'N/A',
      state: property.state || 'N/A',
      bedrooms: property.bedrooms || 'N/A',
      bathrooms: property.bathrooms || 'N/A',
      status: property.status || 'N/A',
      approvalStatus: property.approvalStatus || 'N/A',
    }));
  }, [properties]);

  const columns = [
    { key: 'propertyname', label: t('properties.propertyName') },
    { key: 'visits', label: t('properties.visits') },
    { key: 'propertytype', label: t('properties.propertyType') },
    { key: 'creator', label: t('properties.creator') },
    { key: 'registrationDate', label: t('properties.registeredOn') },
    { key: 'country', label: t('properties.country') },
  ];

  // Optimized filtering and sorting with useMemo
  const filteredAndSortedRows = useMemo(() => {
    let filtered = transformedProperties.filter((row) => {
      const matchesSearch =
        searchTerm === '' ||
        row.propertyname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.visits.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.registrationDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.propertytype.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.price.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });

    // Sort the filtered results
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];

        if (typeof aVal === 'string') aVal = aVal.toLowerCase();
        if (typeof bVal === 'string') bVal = bVal.toLowerCase();

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [transformedProperties, searchTerm, sortConfig]);

  const handleSelectAllClick = useCallback(
    (event) => {
      if (event.target.checked) {
        const allIds = filteredAndSortedRows.map((row) => row.id);
        setSelected(allIds);
      } else {
        setSelected([]);
      }
    },
    [filteredAndSortedRows]
  );

  const handleRowClick = useCallback((id) => {
    setSelected((prevSelected) => (prevSelected.includes(id) ? prevSelected.filter((item) => item !== id) : [...prevSelected, id]));
  }, []);

  const isSelected = useCallback((id) => selected.includes(id), [selected]);

  // Bulk approval handlers
  const handleBulkApprove = useCallback(
    async (ids) => {
      const targetIds = ids && ids.length > 0 ? ids : selected;

      if (targetIds.length === 0) {
        setNotification({
          open: true,
          message: t('properties.selectPropertiesFirstApprove'),
          severity: 'warning',
        });
        return;
      }

      try {
        await bulkApproveProperties({
          variables: {
            input: {
              propertyIds: targetIds,
              approved: true,
              notes: t('properties.bulkApprovalInProgress'),
            },
          },
        });
        // clear only bulk selections
        if (!ids) setSelected([]);
      } catch (error) {
        console.error('Bulk approve error:', error);
      }
    },
    [selected, bulkApproveProperties, t]
  );

  // reject all → open confirm modal
  const handleRejectAllClick = () => {
    if (selected.length === 0) {
      setNotification({
        open: true,
        message: t('properties.selectPropertiesFirstReject'),
        severity: 'warning',
      });
      return;
    }
    setDeleteTarget({ type: 'bulk', ids: selected });
    setDeleteModalOpen(true);
  };

  // delete single → open confirm modal
  const handleDeleteClick = (id) => {
    setDeleteTarget({ type: 'single', ids: [id] });
    setDeleteModalOpen(true);
  };

  // confirm modal action
  const handleConfirmDelete = async () => {
    setDeleteLoading(true);
    try {
      if (deleteTarget.type === 'bulk') {
        // Bulk reject
        await bulkApproveProperties({
          variables: {
            input: {
              propertyIds: deleteTarget.ids,
              approved: false,
              notes: t('properties.bulkRejectionInProgress'),
            },
          },
        });
        setSelected([]);
      } else {
        // Single delete API call
        await deleteProperty({
          variables: { propertyId: deleteTarget.ids[0] },
        });
      }

      setDeleteModalOpen(false);
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleChangeRowsPerPage = useCallback((event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(1); // Reset to first page
    setSelected([]); // Clear selections
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
    setSelected([]); // Clear selections when changing page
  }, []);

  // Reset pagination when tab changes
  useEffect(() => {
    setPage(1);
    setSelected([]);
    setSearchTerm('');
  }, [activeTab]);

  // Reset page when search term changes
  useEffect(() => {
    setPage(1);
    setSelected([]);
  }, [searchTerm]);

  // Show loading state
  if (loading && !data) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
        <Typography ml={2}>{t('properties.loadingProperties')}</Typography>
      </Box>
    );
  }

  // Show error state
  if (error) {
    return (
      <Box p={2}>
        <Alert severity="error">
          {t('common.error')}: {error.message}
        </Alert>
      </Box>
    );
  }

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
        <ActionButtons
          activeTab={activeTab}
          onTabChange={onTabChange}
          approvalCounts={approvedCountData?.listProperties?.totalCount || 0}
          pendingCounts={pendingCountData?.listProperties?.totalCount || 0}
        />

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
                startIcon={bulkLoading ? <CircularProgress size={20} color="inherit" /> : <DoneIcon />}
                onClick={handleBulkApprove}
                // disabled={bulkLoading || selected.length === 0}
                sx={{
                  borderRadius: '100px',
                  width: { xs: '100%', sm: 'auto' },
                  opacity: bulkLoading || selected.length === 0 ? 0.5 : 1,
                  pointerEvents: bulkLoading || selected.length === 0 ? 'none' : 'auto',
                }}
              >
                {t('properties.approveAll')}
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={bulkLoading ? <CircularProgress size={20} color="inherit" /> : <CloseIcon />}
                onClick={handleRejectAllClick}
                // disabled={bulkLoading || selected.length === 0}
                sx={{
                  borderRadius: '100px',
                  width: { xs: '100%', sm: 'auto' },
                  opacity: bulkLoading || selected.length === 0 ? 0.5 : 1,
                  pointerEvents: bulkLoading || selected.length === 0 ? 'none' : 'auto',
                }}
              >
                {t('properties.rejectAll')}
              </Button>
            </>
          )}

          {/* Search Bar */}
          <TextField
            placeholder={t('properties.searchPlaceholder')}
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
          {activeTab === 0 && (
            <Select
              displayEmpty
              size="small"
              IconComponent={ArrowDropDownIcon}
              renderValue={() => `${t('properties.sortBy')} (#)`}
              open={roleMenuOpen}
              onOpen={() => setRoleMenuOpen(true)}
              onClose={() => setRoleMenuOpen(false)}
              value={sortConfig.key || ''}
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
                      '&.Mui-selected': {
                        backgroundColor: '#fff !important',
                        color: '#333A54',
                      },
                      '&.Mui-selected:hover': {
                        backgroundColor: '#f5f5f5 !important',
                      },
                    },
                  },
                },
              }}
            >
              {columns.map(({ key, label }) => (
                <MenuItem
                  key={key}
                  value={key} // ✅ this matches Select’s value
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
          )}
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
              {activeTab === 1 && (
                <TableCell
                  padding="checkbox"
                  sx={{
                    paddingLeft: '20px',
                  }}
                >
                  <Checkbox
                    color="success"
                    indeterminate={selected.length > 0 && selected.length < filteredAndSortedRows.length}
                    checked={filteredAndSortedRows.length > 0 && selected.length === filteredAndSortedRows.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
              )}
              <TableCell sx={{ fontSize: '18px' }}>{t('properties.propertyName')}</TableCell>
              <TableCell sx={{ fontSize: '18px' }}>{activeTab === 0 ? t('properties.visits') : t('properties.propertyType')}</TableCell>
              <TableCell sx={{ fontSize: '18px' }}>{activeTab === 0 ? t('properties.propertyType') : t('properties.creator')}</TableCell>
              <TableCell sx={{ fontSize: '18px' }}>{activeTab === 0 ? t('properties.creator') : t('properties.createdOn')}</TableCell>
              <TableCell sx={{ fontSize: '18px' }}>{activeTab === 0 ? t('properties.registeredOn') : t('properties.country')}</TableCell>
              <TableCell sx={{ fontSize: '18px' }}>{activeTab === 0 ? t('properties.country') : t('properties.price')}</TableCell>
              <TableCell align="center" sx={{ fontSize: '18px' }}>
                {activeTab === 1 && <>{t('users.actions')}</>}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                    <CircularProgress size={24} />
                    <Typography variant="body2" color="textSecondary">
                      {t('properties.loadingProperties')}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : filteredAndSortedRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="textSecondary">
                    {t('properties.noPropertiesFound')}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedRows.map((row) => {
                const selectedRow = isSelected(row.id);
                return (
                  <TableRow
                    key={row.id}
                    hover
                    active={activeTab === 1 && selectedRow}
                    onClick={() => {
                      onViewUser && onViewUser(row);
                    }}
                    sx={{ cursor: 'pointer' }}
                  >
                    {activeTab === 1 && (
                      <TableCell
                        padding="checkbox"
                        sx={{
                          paddingLeft: '20px',
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
                    <TableCell sx={{ fontSize: '18px' }}>{row.propertyname}</TableCell>

                    <TableCell sx={{ fontSize: '18px' }}>{activeTab === 0 ? row.visits : row.propertytype}</TableCell>
                    <TableCell sx={{ fontSize: '18px' }}>{activeTab === 0 ? row.propertytype : row.creator}</TableCell>
                    <TableCell sx={{ fontSize: '18px' }}>{activeTab === 0 ? row.creator : row.registrationDate}</TableCell>
                    <TableCell sx={{ fontSize: '18px' }}>{activeTab === 0 ? row.registrationDate : row.country}</TableCell>
                    <TableCell sx={{ fontSize: '18px' }}>{activeTab === 0 ? row.country : row.price}</TableCell>
                    {activeTab === 1 && (
                      <TableCell align="center">
                        <Box display="flex" alignItems="center">
                          <Tooltip title="Approve property" arrow>
                            <IconButton
                              sx={{ color: 'success.main' }}
                              color="success"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleBulkApprove([row.id]);
                              }}
                            >
                              <DoneIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete property" arrow>
                            <IconButton
                              sx={{ color: '#DC2626' }}
                              color="error"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteClick(row.id);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {/* Custom Pagination */}
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography color="#828E99">
              {t('properties.showingEntries', {
                start: (currentPage - 1) * rowsPerPage + 1,
                end: Math.min(currentPage * rowsPerPage, totalCount),
                total: totalCount,
              })}
            </Typography>
            <Typography color="#828E99">{t('properties.rowsPerPage')}</Typography>
            <Select value={rowsPerPage} onChange={handleChangeRowsPerPage} size="small">
              {[5, 10, 25].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>

            <Typography color="#828E99">{t('properties.goTo')}</Typography>
            <TextField
              value={currentPage}
              onChange={(e) => {
                let val = Number(e.target.value);
                if (val >= 1 && val <= totalPages) handlePageChange(val);
              }}
              size="small"
              type="number"
              inputProps={{ min: 1, max: totalPages, style: { width: 50 } }}
            />
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              sx={{
                border: '1px solid #E8EBEE',
                borderRadius: '100px',
              }}
            >
              <FirstPageRoundedIcon />
            </IconButton>
            <IconButton
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!hasPreviousPage}
              sx={{
                border: '1px solid #E8EBEE',
                borderRadius: '100px',
              }}
            >
              <NavigateBeforeRoundedIcon />
            </IconButton>

            {/* Page numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const startPage = Math.max(1, currentPage - 2);
              const pageNum = startPage + i;
              if (pageNum > totalPages) return null;

              return (
                <IconButton
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  sx={{
                    bgcolor: pageNum === currentPage ? 'success.main' : 'transparent',
                    color: pageNum === currentPage ? 'white' : 'inherit',
                    border: '1px solid #E8EBEE',
                    borderRadius: '100px',
                    '&:hover': {
                      bgcolor: 'success.main',
                      color: 'white',
                    },
                  }}
                >
                  {pageNum}
                </IconButton>
              );
            })}

            {currentPage + 2 < totalPages && <Typography>...</Typography>}

            <IconButton
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!hasNextPage}
              sx={{
                border: '1px solid #E8EBEE',
                borderRadius: '100px',
              }}
            >
              <NavigateNextRoundedIcon color="#565F68" />
            </IconButton>
            <IconButton
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
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
      <DeleteConfirmModal
        title={deleteTarget.type === 'bulk' ? t('properties.confirmRejectProperties') : t('properties.confirmDeleteProperty')}
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
      />
      {/* Success/Error Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
