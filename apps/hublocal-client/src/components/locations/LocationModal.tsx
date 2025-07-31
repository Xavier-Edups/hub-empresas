'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/lib/hooks';
import {
  createLocation,
  updateLocation,
} from '@/lib/features/locations/locationsThunks';

interface Props {
  open: boolean;
  handleClose: () => void;
  initialData?: any;
  companyId: string;
}

export default function LocationModal({
  open,
  handleClose,
  initialData,
  companyId,
}: Props) {
  const { register, handleSubmit, reset } = useForm({ defaultValues: initialData || {} });
  const dispatch = useAppDispatch();

  const onSubmit = (data: any) => {
    if (initialData) {
      dispatch(updateLocation({ companyId, id: initialData.id, data }));
    } else {
      dispatch(createLocation({ companyId, data }));
    }
    reset();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{initialData ? 'Editar Local' : 'Novo Local'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Nome" fullWidth {...register('name')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="CEP" fullWidth {...register('cep')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Rua" fullWidth {...register('street')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Número" fullWidth {...register('number')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Bairro" fullWidth {...register('neighborhood')} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="Cidade" fullWidth {...register('city')} />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField label="UF" fullWidth {...register('state')} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit" variant="contained">Salvar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
