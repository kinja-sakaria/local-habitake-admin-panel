import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
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
import { ArrowDown, ArrowUp } from 'iconsax-reactjs';

const getStatusColor = (status, t) => {
    // Map translated status back to original for color logic
    const statusMap = {
        [t('propertyListing.active')]: 'Active',
        [t('propertyListing.pending')]: 'Pending',
        [t('propertyListing.sold')]: 'Sold',
        [t('propertyListing.rented')]: 'Rented'
    };

    const originalStatus = statusMap[status] || status;

    switch (originalStatus) {
        case 'Active':
            return { color: '#2CA87F', bg: '#E1FCEF' };
        case 'Pending':
            return { color: '#FF9800', bg: 'rgba(255, 152, 0, 0.15)' };
        case 'Sold':
            return { color: '#D32F2F', bg: 'rgba(211, 47, 47, 0.15)' };
        case 'Rented':
            return { color: '#6C757D', bg: 'rgba(108, 117, 125, 0.15)' };
        default:
            return {};
    }
};

export default function PropertyListingTable({ user, activeTab }) {
    const { t } = useTranslation();
    const rows = Array.from({ length: 20 }, (_, i) => {
        // base status cycle
        let baseStatuses = ['Active', 'Sold', 'Pending', 'Rented'];

        // when activeTab == 2, add Suspend in rotation
        if (activeTab === 2) {
            baseStatuses = ['Active', 'Sold', 'Rented'];
        }
        return {
            id: i + 1,
            name: 'Meritas',
            type: ['Rental', 'Residential', 'Commercial', 'Luxury'][i % 4],
            status: baseStatuses[i % baseStatuses.length],
            numberOfViews: ['11', '12', '18'][i % 3],
            registrationDate: ['01/01/2025', '01/9/2025', '20/01/2025'][i % 3],
            country: 'NY 1003, USA',
            location: 'NY 1003, USA',
            price: '$5000',
            listingPrice: '$5000',
        };
    });

    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [roleMenuOpen, setRoleMenuOpen] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const columns = [
        { key: 'name', label: t('propertyListing.name') },
        { key: 'type', label: t('propertyListing.type') },
        activeTab === 2 ? { key: 'numberOfViews', label: t('propertyListing.numberOfViews') } : { key: 'registrationDate', label: t('propertyListing.registrationDate') },
        activeTab === 2 ? { key: 'location', label: t('propertyListing.location') } : { key: 'country', label: t('propertyListing.country') },
        activeTab === 2 ? { key: 'price', label: t('propertyListing.price') } : { key: 'listingPrice', label: t('propertyListing.listingPrice') },
        { key: 'status', label: t('propertyListing.status') },
    ];

    const filteredRows = rows.filter((row) => {
        const matchesSearch =
            row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.registrationDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.numberOfViews.toLowerCase().includes(searchTerm.toLowerCase());

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

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

    return (
        <Box>
            <Typography variant="h5" fontWeight={700} color="secondary.800" px={2.5} pt={2.5}>
                {activeTab === 0 && (
                    <>
                        {user.role === 'Seller' && t('propertyListing.sellerListedProperties')}
                        {user.role === 'Agent' && t('propertyListing.agentListedProperties')}
                    </>
                )}

                {activeTab === 1 && t('propertyListing.agentListedProperties')}

                {activeTab === 2 && t('propertyListing.visitedPropertiesList')}
            </Typography>
            {/* Top bar: Search and Sort */}
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2.5} bgcolor="white">
                <TextField
                    // placeholder="Search 100 records..."
                    placeholder={t('propertyListing.searchPlaceholder')}
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
                <Box display="flex" gap={4}>
                    <Select
                        displayEmpty
                        size="small"
                        IconComponent={ArrowDropDownIcon}
                        renderValue={() => `${t('propertyListing.sortBy')} (#)`}
                        open={roleMenuOpen}
                        onOpen={() => setRoleMenuOpen(true)}
                        onClose={() => setRoleMenuOpen(false)}
                        sx={{
                            width: 189,
                            '&.MuiOutlinedInput-root': {
                                borderRadius: '100px',
                            },
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    width: 200,
                                    '& .MuiMenu-list': {
                                        padding: 0,
                                    },
                                    '& .MuiMenuItem-root': {
                                        padding: '10px 20px',
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
                                onClick={() => {
                                    setSortConfig((prev) => ({
                                        key,
                                        direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
                                    }));
                                }}
                            >
                                <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                                    {label}
                                    <Box
                                        color="#333A54"
                                        sx={{
                                            fontSize: 14,
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {sortConfig.key === key ? (
                                            sortConfig.direction === 'asc' ? (
                                                <>
                                                    <ArrowUp size="15" color="#333A54" />
                                                    <ArrowDown size="15" color="#333A54" />
                                                </>
                                            ) : (
                                                <>
                                                    <ArrowUp size="15" color="#333A54" />
                                                    <ArrowDown size="15" color="#333A54" />
                                                </>
                                            )
                                        ) : (
                                            <>
                                                <ArrowUp size="15" color="#333A54" />
                                                <ArrowDown size="15" color="#333A54" />
                                            </>
                                        )}
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
                            <TableCell sx={{ fontSize: '18px' }}>{t('propertyListing.name')}</TableCell>
                            <TableCell sx={{ fontSize: '18px' }}>{t('propertyListing.type')}</TableCell>
                            <TableCell sx={{ fontSize: '18px' }}> {activeTab === 2 ? t('propertyListing.numberOfViews') : t('propertyListing.registrationDate')}</TableCell>
                            <TableCell sx={{ fontSize: '18px' }}>{activeTab === 2 ? t('propertyListing.location') : t('propertyListing.country')}</TableCell>
                            <TableCell sx={{ fontSize: '18px' }}>{activeTab === 2 ? t('propertyListing.price') : t('propertyListing.listingPrice')}</TableCell>
                            <TableCell sx={{ fontSize: '18px' }}>{t('propertyListing.status')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedRows.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                                    <Typography variant="body1" color="textSecondary">
                                        {t('propertyListing.noRecordsAvailable')}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                const statusColor = getStatusColor(row.status, t);
                                const translatedStatus = t(`propertyListing.${row.status.toLowerCase()}`);
                                return (
                                    <TableRow key={row.id} hover>
                                        <TableCell>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <Typography sx={{ fontSize: '18px', lineHeight: '1.66px', display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    {row.name}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ fontSize: '18px' }}>{row.type}</TableCell>
                                        <TableCell sx={{ fontSize: '18px' }}>{activeTab === 2 ? row.numberOfViews : row.registrationDate}</TableCell>
                                        <TableCell sx={{ fontSize: '18px' }}>{activeTab === 2 ? row.location : row.country}</TableCell>
                                        <TableCell sx={{ fontSize: '18px' }}>{activeTab === 2 ? row.price : row.listingPrice}</TableCell>
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
                                                    textTransform: 'capitalize',
                                                }}
                                            >
                                                {translatedStatus}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>

                {/* Custom Pagination */}
                <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography color="#828E99">{t('propertyListing.rowsPerPage')}</Typography>
                        <Select value={rowsPerPage} onChange={handleChangeRowsPerPage} size="small">
                            {[5, 10, 25].map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>

                        <Typography color="#828E99">{t('propertyListing.goTo')}</Typography>
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
