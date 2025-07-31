// app/dashboard/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { Box, Typography, Button, Avatar, Menu, MenuItem, CircularProgress, IconButton } from '@mui/material';
import Image from 'next/image';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import PrivateRoute from '@/components/auth/PrivateRoute';
import CompanyModal from '@/components/companies/CompanyModal';
import { useSession, signOut } from 'next-auth/react';
import { logout, setAuth } from '@/lib/features/auth/authSlice';
import { fetchCompanies, deleteCompany } from '@/lib/features/companies/companiesThunks';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [openModal, setOpenModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any | null>(null);
  const { items, isLoading } = useAppSelector((state) => state.companies);
  const openDropdown = Boolean(anchorEl);

  // Busca os dados das empresas e sincroniza o token
  useEffect(() => {
    if (status === "authenticated" && (session as any)?.accessToken) {
      dispatch(setAuth({
        token: (session as any).accessToken,
        isAuthenticated: true,
      }));
      dispatch(fetchCompanies());
    }
  }, [dispatch, status, session]);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleCloseDropdown();
    dispatch(logout());
    signOut({ callbackUrl: '/login' });
  };

  const handleEdit = (company: any) => {
    setSelectedCompany(company);
    setOpenModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta empresa?')) {
      dispatch(deleteCompany(id));
    }
  };

  const handleAddNew = () => {
    setSelectedCompany(null);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    dispatch(fetchCompanies());
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Empresa',
      flex: 1,
      minWidth: 250,
    },
    {
      field: 'locationsCount',
      headerName: 'Qt de Locais',
      flex: 0.5,
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
      valueGetter: (value, row) => row.locations?.length || 0,
    },
    {
      field: 'actions',
      headerName: 'Ações',
      flex: 0.5,
      minWidth: 150,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      renderCell: ({ row }) => (
        <Box>
          <IconButton onClick={() => handleEdit(row)} aria-label="editar">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => router.push(`/locations/${row.id}`)} aria-label="ver locais">
            <Image src="/loc.png" alt="Ícone de Localização" width={24} height={24} />
          </IconButton>
          <IconButton onClick={() => handleDelete(row.id)} aria-label="deletar">
            <DeleteIcon sx={{ color: '#d32f2f' }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  if (status === "loading") {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <PrivateRoute>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f4f6f8' }}>
        {/* Cabeçalho Personalizado */}
        <Box
          component="header"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            borderBottom: '1px solid #e0e0e0',
            backgroundColor: '#ffffff',
            flexShrink: 0
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Minhas Empresas
          </Typography>
          <Box>
            <Button
              onClick={handleMenuClick}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                textTransform: 'none',
                color: 'text.primary'
              }}
            >
              <Typography variant="body1">
                {session?.user?.name || 'Usuário'}
              </Typography>
              <Avatar
                src={'/pfp.png'}
                alt="Foto do Perfil"
                sx={{ width: 40, height: 40 }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={openDropdown}
              onClose={handleCloseDropdown}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Conteúdo Principal */}
        <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4" fontWeight="bold">Minhas Empresas</Typography>
            <Button
              variant="contained"
              onClick={handleAddNew}
              sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' }, textTransform: 'none', fontSize: '1rem', padding: '8px 22px' }}
            >
              Adicionar Empresa
            </Button>
          </Box>

          <Box sx={{ height: 'auto', width: '100%', backgroundColor: '#ffffff', borderRadius: '8px' }}>
            {isLoading ? (
              <Box display="flex" justifyContent="center" alignItems="center" p={10}>
                <CircularProgress />
              </Box>
            ) : items.length > 0 ? (
              <DataGrid
                rows={items}
                columns={columns}
                getRowId={(row) => row.id}
                autoHeight
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
                pageSizeOptions={[10, 25, 50]}
                disableRowSelectionOnClick
                sx={{
                  border: 'none',
                  '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
                    outline: 'none !important',
                  },
                  '& .MuiDataGrid-columnHeaderTitle': {
                    fontWeight: 'bold',
                  }
                }}
              />
            ) : (
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                py={10}
              >
                <Typography variant="h4" component="p" fontWeight="bold" gutterBottom>
                  Nenhuma empresa cadastrada!
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleAddNew}
                  sx={{
                    mt: 2,
                    backgroundColor: '#1976d2',
                    '&:hover': { backgroundColor: '#1565c0' },
                    textTransform: 'none',
                    fontSize: '1rem',
                    padding: '8px 22px'
                  }}
                >
                  Adicionar Empresa
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <CompanyModal open={openModal} handleClose={handleModalClose} initialData={selectedCompany} />
    </PrivateRoute>
  );
}
