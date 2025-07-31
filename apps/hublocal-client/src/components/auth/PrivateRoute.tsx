"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { Box, CircularProgress } from "@mui/material";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Se a verificação da sessão terminou e o usuário NÃO está autenticado,
    // redireciona para a página de login.
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Enquanto o NextAuth está verificando a sessão, exibe um loader.
  // Isso é crucial para evitar o loop.
  if (status === "loading") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Se a verificação terminou e o usuário ESTÁ autenticado,
  // renderiza o conteúdo da página (o dashboard).
  if (status === "authenticated") {
    return <>{children}</>;
  }

  // Por padrão, não renderiza nada enquanto espera o redirecionamento ou o loader.
  return null;
}
