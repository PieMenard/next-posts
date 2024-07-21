'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '../prisma';

export async function deletePost(formatData: FormData) {
  const postId = formatData.get('postId') as string;

  if (postId) {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    revalidatePath('/');
  }
}
