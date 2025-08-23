import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Checkbox } from '@mui/material';
import { useState } from 'react';

const roles = ['Admin', 'Seller/ Buyer', 'Agent (Real Estate Agency)'];

const initialFeatures = [
  {
    name: 'Create & Edit Listings',
    permissions: [true, true, false],
  },
  {
    name: 'Manage AI-Generated Images',
    permissions: [true, '(Own Listings)', '(Own Listings)'],
  },
  {
    name: 'View Listings',
    permissions: [true, true, true],
  },
  {
    name: 'Contact Sellers',
    permissions: [true, true, false],
  },
  {
    name: 'Manage Advertisements',
    permissions: [true, '(Paid Feature)', '(Paid Feature)'],
  },
  {
    name: 'View Analytics',
    permissions: [true, '(Own Listings)', '(Own Listings)'],
  },
  {
    name: 'Verify & Suspend Accounts',
    permissions: [true, false, false],
  },
  {
    name: 'Process Payments',
    permissions: [true, false, false],
  },
];

export default function PermissionTable() {
  const [features, setFeatures] = useState(initialFeatures);

  const handleCheckboxChange = (featureIndex, roleIndex) => {
    setFeatures((prev) =>
      prev.map((feature, fIdx) => {
        if (fIdx !== featureIndex) return feature;

        const updatedPermissions = [...feature.permissions];
        const currentValue = updatedPermissions[roleIndex];

        if (typeof currentValue === 'boolean') {
          updatedPermissions[roleIndex] = !currentValue;
        } else if (typeof currentValue === 'string') {
          // Convert to boolean + retain label
          const wasChecked = currentValue.startsWith('[x]');
          const label = currentValue.replace(/^\[\s?\]|\[\s?x\s?\]/i, '').trim();
          updatedPermissions[roleIndex] = wasChecked ? `[ ] ${label}` : `[x] ${label}`;
        }

        return { ...feature, permissions: updatedPermissions };
      })
    );
  };

  const renderCellContent = (value, fIdx, rIdx) => {
    if (typeof value === 'boolean') {
      return <Checkbox checked={value} color="success" onChange={() => handleCheckboxChange(fIdx, rIdx)} sx={{ color: '#D3D3D3' }} />;
    } else {
      // For custom string: handle checkbox + label
      const isChecked = value.startsWith('[x]');
      const label = value.replace(/^\[\s?\]|\[\s?x\s?\]/i, '').trim();

      return (
        <Box display="flex" alignItems="center" justifyContent="start" gap={0.5}>
          <Checkbox checked={isChecked} color="success" onChange={() => handleCheckboxChange(fIdx, rIdx)} sx={{ color: '#D3D3D3' }} />
          <Typography variant="caption" sx={{ color: '#000000', fontWeight: 500 }}>
            {label}
          </Typography>
        </Box>
      );
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#F5F5F5' }}>
            <TableCell
              sx={{
                borderTopLeftRadius: '12px',
                borderBottomLeftRadius: '12px',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              Features
            </TableCell>
            {roles.map((role, idx) => (
              <TableCell
                key={role}
                align="start"
                sx={{
                  backgroundColor: '#F5F5F5',
                  fontSize: '16px',
                  fontWeight: 600,
                  ...(idx === roles.length - 1 && {
                    borderTopRightRadius: '12px',
                    borderBottomRightRadius: '12px',
                  }),
                }}
              >
                {role}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {features.map((row, fIdx) => (
            <TableRow key={row.name}>
              <TableCell sx={{ fontSize: '16px', fontWeight: 500, borderBottom: 'none' }}>{row.name}</TableCell>
              {row.permissions.map((perm, rIdx) => (
                <TableCell key={rIdx} align="start" sx={{ borderBottom: 'none' }}>
                  {renderCellContent(perm, fIdx, rIdx)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
