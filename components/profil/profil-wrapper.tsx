'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProfileInfo from './profile-info';
import ProfileArticles from './profile-articles';
import { ProfileData } from '@/ts/profile';

export default function ProfileWrapper() {
  const router = useRouter();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedAuth = localStorage.getItem('auth');
        if (!storedAuth) {
          router.push('/login');
          return;
        }

        const token = JSON.parse(storedAuth).accessToken;
        const response = await fetch('http://localhost:3000/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (response.status === 401) {
          router.push('/login');
          return;
        }

        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${await response.text()}`);
        }

        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        console.error('Erreur:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        if (err instanceof Error && err.message.includes('Non authentifié')) {
          router.push('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;
  if (!profileData) return null;

  return (
    <div className="space-y-8">
      <ProfileInfo data={profileData} />
      <ProfileArticles articles={profileData.articles} />
    </div>
  );
}
