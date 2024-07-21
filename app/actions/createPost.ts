'use server';

import { auth } from '@/auth';
import { PostSchema } from '@/schema/schema';
import { z } from 'zod';
import { prisma } from '../prisma';
import { revalidatePath } from 'next/cache';

export async function createPost(values: z.infer<typeof PostSchema>) {
  const validatedPost = PostSchema.safeParse(values);

  if (!validatedPost.success) {
    return { error: 'invalid post' };
  }

  const session = await auth();
  if (session?.user) {
    const newPost = await prisma.post.create({
      data: {
        description: validatedPost.data.post as string,
        userId: session.user.id as string,
      },
    });
    revalidatePath('/');
  }

  return {
    success: 'Post created!',
  };
}
