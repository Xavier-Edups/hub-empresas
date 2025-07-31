import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';

export const fetchCompanies = createAsyncThunk('companies/fetch', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/companies');
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Erro ao carregar empresas');
  }
});

export const createCompany = createAsyncThunk('companies/create', async (data: any, { rejectWithValue }) => {
  try {
    const res = await api.post('/companies', data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Erro ao criar empresa');
  }
});

export const updateCompany = createAsyncThunk('companies/update', async ({ id, data }: any, { rejectWithValue }) => {
  try {
    const res = await api.put(`/companies/${id}`, data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Erro ao editar empresa');
  }
});

export const deleteCompany = createAsyncThunk('companies/delete', async (id: string, { rejectWithValue }) => {
  try {
    await api.delete(`/companies/${id}`);
    return id;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Erro ao deletar empresa');
  }
});
