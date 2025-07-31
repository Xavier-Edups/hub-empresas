// app/locations/[companyId]/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { Box, Typography, Button, Avatar, Menu, MenuItem, CircularProgress, IconButton } from '@mui/material';
import Image from 'next/image';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import PrivateRoute from '@/components/auth/PrivateRoute';
import LocationModal from '@/components/locations/LocationModal'; // Assumindo a existência deste componente
import { useSession, signOut } from 'next-auth/react';
import { logout, setAuth } from '@/lib/features/auth/authSlice';
import { fetchLocationsByCompany, deleteLocation } from '@/lib/features/locations/locationsThunks'; // Assumindo a existência destes thunks
import { fetchCompanies } from '@/lib/features/companies/companiesThunks'; // Importar para corrigir o contador
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter, useParams } from 'next/navigation';

export default function LocationsPage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useParams();
  const companyId = params.companyId as string;

  const { data: session, status } = useSession();
  const [openModal, setOpenModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any | null>(null);
  const { items, isLoading } = useAppSelector((state) => state.locations);
  const openDropdown = Boolean(anchorEl);

  // Busca os locais da empresa e sincroniza o token
  useEffect(() => {
    if (status === "authenticated" && (session as any)?.accessToken && companyId) {
      dispatch(setAuth({
        token: (session as any).accessToken,
        isAuthenticated: true,
      }));
      dispatch(fetchLocationsByCompany(companyId));
    }
  }, [dispatch, status, session, companyId]);

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

  const handleEdit = (location: any) => {
    setSelectedLocation(location);
    setOpenModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este local?')) {
      dispatch(deleteLocation({ companyId, id })).then(() => {
        // Atualiza a lista de empresas no Redux para o contador ficar correto no dashboard
        dispatch(fetchCompanies());
      });
    }
  };

  const handleAddNew = () => {
    setSelectedLocation(null);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    if (companyId) {
      // Atualiza a lista de locais na página atual
      dispatch(fetchLocationsByCompany(companyId));
      // Atualiza a lista de empresas no Redux para o contador ficar correto no dashboard
      dispatch(fetchCompanies());
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', flex: 1, minWidth: 200 },
    { field: 'street', headerName: 'Rua', flex: 1.5, minWidth: 250 },
    { field: 'city', headerName: 'Cidade', flex: 1, minWidth: 150 },
    { field: 'state', headerName: 'Estado', flex: 0.5, minWidth: 100 },
    {
      field: 'actions',
      headerName: 'Ações',
      flex: 0.5,
      minWidth: 120,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      renderCell: ({ row }) => (
        <Box>
          <IconButton onClick={() => handleEdit(row)} aria-label="editar">
            <EditIcon />
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
              sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textTransform: 'none', color: 'text.primary' }}
            >
              <Typography variant="body1">{session?.user?.name || 'Usuário'}</Typography>
              <Avatar src={'/pfp.png'} alt="Foto do Perfil" sx={{ width: 40, height: 40 }} />
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
          <Box display="flex" alignItems="center" mb={3}>
            <IconButton onClick={() => router.push('/dashboard')} aria-label="voltar para o dashboard" sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" fontWeight="bold" sx={{ flexGrow: 1 }}>
              Locais
            </Typography>
            <Button
              variant="contained"
              onClick={handleAddNew}
              sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' }, textTransform: 'none', fontSize: '1rem', padding: '8px 22px' }}
            >
              Adicionar Local
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
                  pagination: { paginationModel: { pageSize: 10 } },
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
                  Nenhum local cadastrado!
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
                  Adicionar Local
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <LocationModal open={openModal} handleClose={handleModalClose} initialData={selectedLocation} companyId={companyId} />
    </PrivateRoute>
  );
}
