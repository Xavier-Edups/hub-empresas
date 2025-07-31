// app/login/page.tsx
'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'; // ADICIONAR useState
import { signIn, useSession } from 'next-auth/react'; // ADICIONAR signIn e useSession
import {
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import Image from 'next/image';

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { data: session, status } = useSession(); // Usar a sessão do NextAuth para verificar se já está logado

  // Estado local para loading e erro, já que não usaremos mais o Redux aqui
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // MODIFICAR: A função de submit agora usa o signIn do NextAuth
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        ...data,
        redirect: false, // Importante: não redireciona automaticamente
      });

      if (result?.error) {
        // Se o NextAuth retornar um erro (ex: authorize retornou null)
        setError('Email ou senha inválidos.');
        setIsLoading(false);
      } else if (result?.ok) {
        // Se o login for bem-sucedido
        router.push('/dashboard');
      }
    } catch (e) {
      setError('Ocorreu um erro inesperado. Tente novamente.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Se o usuário já estiver autenticado (status 'authenticated'), redireciona
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  // Se estiver verificando a sessão, pode mostrar um loader para evitar piscar a tela de login
  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
      {/* Lado esquerdo - imagem */}
      <Box
        sx={{
          width: '50%',
          height: '100%',
          position: 'relative',
          backgroundColor: '#00C3A5',
          display: { xs: 'none', md: 'block' } // Esconde a imagem em telas pequenas
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

      {/* Lado direito - logo + formulário */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
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
            style={{ objectFit: 'contain', margin: '0 auto 24px auto' }}
          />

          <Box component="form" onSubmit={handleSubmit(onSubmit)} width="100%">
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              {...register('email', { required: true })}
            />
            <TextField
              label="Senha"
              type="password"
              fullWidth
              margin="normal"
              {...register('password', { required: true })}
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
              sx={{ mt: 3, bgcolor: '#007AFF', py: 1.5 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'LOGAR'}
            </Button>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, bgcolor: '#00C3A5', py: 1.5 }}
              onClick={() => router.push('/register')}
            >
              CRIAR CONTA
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
