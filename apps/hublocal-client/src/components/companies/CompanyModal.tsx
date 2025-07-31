'use client';

import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/lib/hooks';
import { createCompany, updateCompany } from '@/lib/features/companies/companiesThunks';

export default function CompanyModal({ open, handleClose, initialData }: any) {
  const { register, handleSubmit, reset } = useForm({ defaultValues: initialData || {} });
  const dispatch = useAppDispatch();

  const onSubmit = (data: any) => {
    if (initialData) {
      dispatch(updateCompany({ id: initialData.id, data }));
    } else {
      dispatch(createCompany(data));
    }
    reset();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{initialData ? 'Editar Empresa' : 'Nova Empresa'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField label="Nome" fullWidth margin="normal" {...register('name')} />
          <TextField label="Website" fullWidth margin="normal" {...register('website')} />
          <TextField label="CNPJ" fullWidth margin="normal" {...register('cnpj')} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit" variant="contained">Salvar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
