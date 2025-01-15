import 'server-only';
import { cookies } from 'next/headers';

// Interface pour définir la structure des données de session
interface SessionData {
  id?: string;
  email?: string;
  name?: string;
  [key: string]: unknown; // Pour permettre d'autres propriétés si nécessaire
}

// Interface pour la session complète
interface Session extends SessionData {
  isAuth: string;
}

export async function createSession(data: SessionData) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const session: Session = { ...data, isAuth: 'true' };

  (await cookies()).set('session', JSON.stringify(session), {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/'
  });
}
