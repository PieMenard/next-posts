import { auth, signIn } from '@/auth';
import { Button } from '@/components/ui/button';

export default async function Home() {
  const session = await auth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        action={async () => {
          'use server';
          await signIn('github');
        }}
      >
        <Button variant={'outline'}>Sign in</Button>
      </form>
    </main>
  );
}
