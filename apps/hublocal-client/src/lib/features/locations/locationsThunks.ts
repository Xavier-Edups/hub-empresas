import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';

export const fetchLocationsByCompany = createAsyncThunk(
  'locations/fetchByCompany',
  async (companyId: string, { rejectWithValue }) => {
    try {
      const res = await api.get(`/companies/${companyId}/locations`);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Erro ao buscar locais');
    }
  }
);

export const createLocation = createAsyncThunk(
  'locations/create',
  async ({ companyId, data }: { companyId: string; data: any }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/companies/${companyId}/locations`, data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Erro ao criar local');
    }
  }
);

export const updateLocation = createAsyncThunk(
  'locations/update',
  async ({ companyId, id, data }: { companyId: string; id: string; data: any }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/companies/${companyId}/locations/${id}`, data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Erro ao atualizar local');
    }
  }
);

export const deleteLocation = createAsyncThunk(
  'locations/delete',
  async ({ companyId, id }: { companyId: string; id: string }, { rejectWithValue }) => {
    try {
      await api.delete(`/companies/${companyId}/locations/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Erro ao excluir local');
    }
  }
);
