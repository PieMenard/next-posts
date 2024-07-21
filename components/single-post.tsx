import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { getUserById } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { formatDistance } from 'date-fns';
import { auth } from '@/auth';
import { Button } from './ui/button';
import { Trash } from 'lucide-react';
import { deletePost } from '@/app/actions/deletePost';

type PostProps = {
  id: string;
  userId: string;
  description: string;
  createdAt: Date;
};

const SinglePost = async ({ postData }: { postData: PostProps }) => {
  const userData = await getUserById(postData.userId);
  const session = await auth();

  return (
    <Card className="w-[600px] my-4">
      <CardHeader></CardHeader>
      <CardContent className="flex items-center">
        <p className="font-bold">{postData.description}</p>
        {session?.user && (
          <form action={deletePost} className="ml-auto">
            <Button type="submit" variant="link">
              <input
                type="text"
                hidden
                defaultValue={postData.id}
                name="postId"
              />
              <Trash color="red" size={24} />
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter>
        <Avatar>
          <AvatarImage src={userData?.image || ''} alt="user avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-sm font-light ml-auto">
          {formatDistance(new Date(postData.createdAt), new Date())}
        </p>
      </CardFooter>
    </Card>
  );
};

export default SinglePost;
