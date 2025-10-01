import { useState, useEffect, useMemo, useCallback } from 'react';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { Button, CircularProgress, Alert, Snackbar } from '@mui/material';

import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Avatar, Typography, TextField, InputAdornment, IconButton, MenuItem, Select, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ArrowDown, ArrowUp, Eye, Verify, CloseCircle } from 'iconsax-reactjs';
import DeleteConfirmModal from 'components/modal/DeleteConfirmModal';
import { HourGlassIcon, DeleteIcon } from 'components/asstes';
import { LIST_USERS } from 'graphql/userQueries';
import { DELETE_USER } from 'graphql/userMutations';
import { useQuery, useMutation } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';

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

const getStatus = (status) => {
    switch (status) {
        case 'Active':
            return <Verify size="20" color="#01A669" variant="Bold" />;
        case 'In-Active':
            return <CloseCircle size="20" color="#F44336" variant="Bold" />;
        case 'Suspend':
            return <HourGlassIcon size="20" />;
        default:
            return {};
    }
};

export default function UserData({ activeTab, onViewUser }) {
    const [page, setPage] = useState(1); // API uses 1-based pagination
    const [selected, setSelected] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [roleMenuOpen, setRoleMenuOpen] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
    const { t } = useTranslation();

    // Map activeTab to role filter
    const getRoleFilter = useCallback((tab) => {
        switch (tab) {
            case 0: return 'Seller'; // Seller tab
            case 1: return 'Agent'; // Agency tab (assuming Agent role for agencies)
            case 2: return 'Buyer'; // Buyer tab
            default: return null; // No filter for all users
        }
    }, []);

    // Get all possible role variations for each tab
    const getRoleVariations = useCallback((tab) => {
        switch (tab) {
            case 0: return ['seller', 'agent']; // Seller tab - include sellers, agents, and admins
            case 1: return ['agent', 'agency']; // Agency tab - include agents, agencies, and admins
            case 2: return ['buyer', 'user']; // Buyer tab - include buyers, users, and admins
            default: return []; // No filter for all users
        }
    }, []);

    const currentRoleFilter = getRoleFilter(activeTab);

    // GraphQL query with proper variables including role filter
    const { data, loading, error, refetch } = useQuery(LIST_USERS, {
        variables: { page: page, limit: rowsPerPage, role: currentRoleFilter },
        notifyOnNetworkStatusChange: true,
        errorPolicy: 'all',
        fetchPolicy: 'cache-and-network' // Always fetch fresh data
    });

    // Delete user mutation
    const [deleteUser, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_USER, {
        onCompleted: (data) => {
            if (data.deleteUser.success) {
                // Show success notification
                setNotification({
                    open: true,
                    message: data.deleteUser.message || t('users.userDeletedSuccess'),
                    severity: 'success'
                });
                // Refetch the user list to update the table
                refetch();
                // Close the modal
                setDeleteModalOpen(false);
                setDeleteUserId(null);
            } else {
                console.error('Delete failed:', data.deleteUser.message);
                setNotification({
                    open: true,
                    message: data.deleteUser.message || t('users.userDeleteError'),
                    severity: 'error'
                });
            }
        },
        onError: (error) => {
            console.error('Delete mutation error:', error);
            setNotification({
                open: true,
                message: error.message || t('users.userDeleteErrorOccurred'),
                severity: 'error'
            });
        }
    });

    // Extract data from API response
    const apiData = data?.listUsers || {};
    const users = apiData.users || [];
    const pagination = apiData.pagination || {};
    const totalPages = pagination.total_pages || 1;
    const totalCount = pagination.total_count || 0;
    const currentPage = pagination.current_page || 1;
    const hasNextPage = pagination.has_next_page || false;
    const hasPrevPage = pagination.has_prev_page || false;

    // Transform API data to table format with role filtering
    const transformedUsers = useMemo(() => {
        return users
            .map((user, index) => ({
                id: user.userId,
                name: `${user?.firstName} ${user?.lastName}`.trim() || '',
                email: user.email || 'N/A',
                phone: user.phoneNumber || '-',
                status: user.status || 'N/A',
                agencyteammember: '0', // Default since not in API
                registrationDate: new Date().toLocaleDateString(), // Default since not in API
                role: user.role || 'N/A',
                kycStatus: 'N/A', // Not in new API structure
                username: 'N/A', // Not in new API structure
                profilePicture: user.profilePicture || 'https://i.pravatar.cc/100',
            }))
            .filter((user) => {
                // Client-side role filtering based on active tab
                if (!currentRoleFilter) return true; // Show all if no role filter

                // Get allowed role variations for current tab
                const allowedRoles = getRoleVariations(activeTab);

                // Normalize user role (case-insensitive)
                const userRole = user.role.toLowerCase();

                // Check if user role matches any allowed role for current tab
                return allowedRoles.includes(userRole);
            });
    }, [users, currentRoleFilter, activeTab, getRoleVariations]);

    const columns = [
        ...(activeTab === 1 ? [{ key: 'name', label: t('users.agencyName') }] : [{ key: 'name', label: t('users.name') }]),
        { key: 'email', label: t('users.email') },
        ...(activeTab !== 1 ? [{ key: 'phone', label: t('users.phone') }] : []),
        { key: 'status', label: t('users.status') },
        activeTab === 1
            ? { key: 'agencyteammember', label: t('users.agencyTeamMember') }
            : activeTab === 2
                ? { key: 'registrationDate', label: t('users.registrationDate') }
                : { key: 'role', label: t('users.role') },
    ];

    // Optimized filtering and sorting with useMemo
    const filteredAndSortedRows = useMemo(() => {
        let filtered = transformedUsers.filter((row) => {
            const matchesSearch = searchTerm === '' ||
            row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                row.role.toLowerCase().includes(searchTerm.toLowerCase());

            // Additional role filtering for the dropdown (case-insensitive)
            const matchesAdditionalRole = selectedRoles.length === 0 ||
                selectedRoles.some(selectedRole =>
                    row.role.toLowerCase() === selectedRole.toLowerCase()
                );

            return matchesSearch && matchesAdditionalRole;
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
    }, [transformedUsers, searchTerm, selectedRoles, sortConfig]);

    const handleSelectAllClick = useCallback((event) => {
        if (event.target.checked) {
            const allIds = filteredAndSortedRows.map((row) => row.id);
            setSelected(allIds);
        } else {
            setSelected([]);
        }
    }, [filteredAndSortedRows]);

    const handleRowClick = useCallback((id) => {
        setSelected((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((item) => item !== id)
                : [...prevSelected, id]
        );
    }, []);

    const isSelected = useCallback((id) => selected.includes(id), [selected]);

    const handleChangeRowsPerPage = useCallback((event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(1); // Reset to first page
        // Clear selections when changing page size
        setSelected([]);
    }, []);

    const handlePageChange = useCallback((newPage) => {
        setPage(newPage);
        // Clear selections when changing page
        setSelected([]);
    }, []);

    const handleDeleteClick = useCallback((id) => {
        setDeleteUserId(id);
        setDeleteModalOpen(true);
    }, []);

    const handleConfirmDelete = useCallback(() => {
        if (deleteUserId) {
            deleteUser({
                variables: { userId: deleteUserId }
            });
        }
    }, [deleteUserId, deleteUser]);

    // Debounced search to avoid too many API calls
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchTerm) {
                // For now, we'll filter client-side
                // In a real app, you might want to send search term to API
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    // Reset page when search term or role filter changes
    useEffect(() => {
        setPage(1);
        setSelected([]); // Clear selections when filtering changes
    }, [searchTerm, selectedRoles, currentRoleFilter]);

    // Reset pagination when tab changes
    useEffect(() => {
        setPage(1);
        setSelected([]);
        setSearchTerm(''); // Clear search when switching tabs
        setSelectedRoles([]); // Clear role filters when switching tabs
    }, [activeTab]);

    // Show loading state for initial load
    if (loading && !data) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress />
                <Typography ml={2}>{t('users.loadingUsers')}</Typography>
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
                mb={2}
                p={2.5}
                gap={2}
            >
                {/* Search Bar */}
                <TextField
                    placeholder={t('common.search')}
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
                        color="error"
                        startIcon={<DeleteIcon />}
                        sx={{ borderRadius: '100px', width: { xs: '100%', sm: 'auto' } }}
                    >
                        {t('users.deleteAll')}
                    </Button>

                    {/* Sort by Role (only when activeTab === 0) */}
                    {activeTab === 0 && (
                        <Select
                            displayEmpty
                            size="small"
                            IconComponent={ArrowDropDownIcon}
                            renderValue={() => t('users.sortByRole')}
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
                            {['All', 'Seller', 'Agent'].map((role) => (
                                <MenuItem
                                    key={role}
                                    value={role}
                                    onClick={() => {
                                        if (role === 'All') {
                                            setSelectedRoles([]);
                                        } else {
                                            // Normalize role case for consistent filtering
                                            const normalizedRole = role.toLowerCase();
                                            setSelectedRoles([normalizedRole]);
                                        }
                                    }}
                                >
                                    <Checkbox
                                        checked={role === 'All'
                                            ? selectedRoles.length === 0
                                            : selectedRoles.some(selectedRole =>
                                                selectedRole.toLowerCase() === role.toLowerCase()
                                            )
                                        }
                                        color="success"
                                    />
                                    {t(`users.${role}`)}
                                </MenuItem>
                            ))}
                        </Select>
                    )}

                    {/* Sort by Columns */}
                    <Select
                        displayEmpty
                        size="small"
                        IconComponent={ArrowDropDownIcon}
                        renderValue={() => `${t('common.sortBy')} (#)`}
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
                                    indeterminate={selected.length > 0 && selected.length < filteredAndSortedRows.length}
                                    checked={filteredAndSortedRows.length > 0 && selected.length === filteredAndSortedRows.length}
                                    onChange={handleSelectAllClick}
                                />
                            </TableCell>
                            <TableCell sx={{ fontSize: '18px' }}>{activeTab === 1 ? t('users.agencyName') : t('users.name')}</TableCell>
                            <TableCell sx={{ fontSize: '18px' }}>{t('users.email')}</TableCell>
                            {activeTab !== 1 && <TableCell align="center" sx={{ fontSize: '18px' }}>{t('users.phone')}</TableCell>}
                            <TableCell sx={{ fontSize: '18px' }} align="center">{t('users.status')}</TableCell>

                            <TableCell align="center" sx={{ fontSize: '18px' }}>
                                {activeTab === 1 ? t('users.agencyTeamMember') : activeTab === 2 ? t('users.registrationDate') : t('users.role')}
                            </TableCell>

                            <TableCell align="center" sx={{ fontSize: '18px' }}>{t('users.actions')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                                    <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                                        <CircularProgress size={24} />
                                        <Typography variant="body2" color="textSecondary">
                                            {t('users.loadingUsers')}
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : filteredAndSortedRows.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                                    <Typography variant="body1" color="textSecondary">
                                        {t('users.noUsersFound')}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredAndSortedRows.map((row) => {
                                const selectedRow = isSelected(row.id);
                                const statusColor = getStatusColor(row.status);
                                const statusApprove = getStatus(row.status);
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
                                                <Avatar alt={row.name} src={row.profilePicture} sx={{ width: 24, height: 24 }} />
                                                <Typography sx={{ fontSize: '18px', lineHeight: '1.66px', display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    {row.name}
                                                    {(activeTab === 1 || activeTab === 2) && statusApprove}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ fontSize: '18px' }}>{row.email}</TableCell>
                                        {activeTab !== 1 && <TableCell align="center" sx={{ fontSize: '18px' }}>{row.phone}</TableCell>}
                                        <TableCell align="center">
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
                                                    textTransform: 'capitalize',
                                                }}
                                            >
                                                {row.status}
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" sx={{ fontSize: '18px' }}>
                                            {activeTab === 1 ? row.agencyteammember : activeTab === 2 ? row?.registrationDate : row.role}
                                        </TableCell>

                                        <TableCell align="center">
                                            <Box display="flex" alignItems="center">
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
                <DeleteConfirmModal
                    open={deleteModalOpen}
                    onClose={() => setDeleteModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                    loading={deleteLoading}
                />

                {/* Success/Error Notification */}
                <Snackbar
                    open={notification.open}
                    autoHideDuration={6000}
                    onClose={() => setNotification(prev => ({ ...prev, open: false }))}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert
                        onClose={() => setNotification(prev => ({ ...prev, open: false }))}
                        severity={notification.severity}
                        sx={{ width: '100%' }}
                    >
                        {notification.message}
                    </Alert>
                </Snackbar>

                {/* Custom Pagination */}
                <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography color="#828E99">
                            {t('users.showingEntries', {
                                start: ((currentPage - 1) * pagination.limit) + 1,
                                end: Math.min(currentPage * pagination.limit, totalCount),
                                total: totalCount
                            })}
                        </Typography>
                        <Typography color="#828E99">{t('users.rowsPerPage')}</Typography>
                        <Select value={rowsPerPage} onChange={handleChangeRowsPerPage} size="small">
                            {[5, 10, 25].map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>

                        <Typography color="#828E99">{t('users.goTo')}</Typography>
                        <TextField
                            value={page}
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
                            disabled={page === 1}
                            sx={{
                                border: '1px solid #E8EBEE',
                                borderRadius: '100px',
                            }}
                        >
                            <FirstPageRoundedIcon />
                        </IconButton>
                        <IconButton
                            onClick={() => handlePageChange(Math.max(page - 1, 1))}
                            disabled={page === 1}
                            sx={{
                                border: '1px solid #E8EBEE',
                                borderRadius: '100px',
                            }}
                        >
                            <NavigateBeforeRoundedIcon />
                        </IconButton>

                        {/* Page numbers */}
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const startPage = Math.max(1, page - 2);
                            const pageNum = startPage + i;
                            if (pageNum > totalPages) return null;

                            return (
                                <IconButton
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    sx={{
                                        bgcolor: pageNum === page ? 'success.main' : 'transparent',
                                        color: pageNum === page ? 'white' : 'inherit',
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

                        {page + 2 < totalPages && <Typography>...</Typography>}

                        <IconButton
                            onClick={() => handlePageChange(Math.min(page + 1, totalPages))}
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
                            disabled={!hasNextPage}
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
