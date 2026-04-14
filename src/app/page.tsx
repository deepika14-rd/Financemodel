'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import { paths } from '@/paths';
import { useUser } from '@/hooks/use-user';

export default function Page(): React.JSX.Element {
  const router = useRouter();
  const { user, isLoading } = useUser();

  React.useEffect(() => {
    if (isLoading) {
      return;
    }

    if (user) {
      router.replace(paths.dashboard.overview);
    } else {
      router.replace(paths.auth.signIn);
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>Redirecting...</div>;
}
