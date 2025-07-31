'use client';

import { useForm } from 'react-hook-form';
import { Box, TextField, Button, Alert } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import api from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm();
  const [error, setError] = useState<string | null>(null);

    const isValidEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

  const onSubmit = async (data: any) => {
    if (!isValidEmail(data.email)) {
      setError('Por favor insira um e-mail válido.');
      return;
    }
    if (data.password !== data.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    if (data.password.length < 6) {
      setError('A senha deve conter pelo menos 6 caracteres.');
      return;
    }

    setError(null);

    try {
      const { confirmPassword, ...userData } = data;

      await api.post('/auth/register', userData)
      router.push('/login');
    } catch (err) {
      setError('Erro ao criar conta');
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      {/* Lado esquerdo - imagem */}
      <Box
        sx={{
          width: '50%',
          height: '100%',
          position: 'relative',
          backgroundColor: '#00C3A5',
        }}
      >
        <Image
          src="/pessoa.png"
          alt="Imagem lateral"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </Box>

      {/* Lado direito - formulário */}
      <Box
        sx={{
          width: '50%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 4,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400, textAlign: 'center' }}>
          <Image
            src="/logo.png"
            alt="HubLocal Logo"
            width={180}
            height={50}
            style={{ objectFit: 'contain', marginBottom: 24 }}
          />

          <Box component="form" onSubmit={handleSubmit(onSubmit)} width="100%">
            <TextField
              label="Nome de Usuário"
              fullWidth
              margin="normal"
              {...register('name')}
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              {...register('email')}
            />
            <TextField
              label="Senha"
              type="password"
              fullWidth
              margin="normal"
              {...register('password')}
            />
            <TextField
              label="Repetir Senha"
              type="password"
              fullWidth
              margin="normal"
              {...register('confirmPassword')}
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, bgcolor: '#007AFF' }}
            >
              CRIAR CONTA
            </Button>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, bgcolor: '#00C3A5' }}
              onClick={() => router.push('/login')}
            >
              VOLTAR PARA LOGIN
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
