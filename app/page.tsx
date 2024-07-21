import { auth, signIn } from '@/auth';
import NavBar from '@/components/navbar';
import PostForm from '@/components/post-form';
import { Button } from '@/components/ui/button';

export default async function Home() {
  const session = await auth();
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <NavBar />
      <PostForm />
    </main>
  );
}
