'use client';

import { PostSchema } from '@/schema/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from './ui/textarea';
import { z } from 'zod';
import { createPost } from '@/app/actions/createPost';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';

const PostForm = () => {
  const { toast } = useToast();
  const [success, setSuccess] = useState<string | undefined>('');
  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      post: '',
    },
  });

  function onSubmit(values: z.infer<typeof PostSchema>) {
    createPost(values).then((data) => {
      setSuccess(data?.success);
    });

    toast({
      title: 'Posted',
      description: `${success}`,
    });

    form.reset();
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-6/12 mt-8"
      >
        <FormField
          control={form.control}
          name="post"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Write your post..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="float-right">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default PostForm;
