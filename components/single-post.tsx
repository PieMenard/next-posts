import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { getUserById } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { formatDistance } from 'date-fns';

type PostProps = {
  id: string;
  userId: string;
  description: string;
  createdAt: Date;
};

const SinglePost = async ({ postData }: { postData: PostProps }) => {
  const userData = await getUserById(postData.userId);

  return (
    <Card className="w-[600px] my-4">
      <CardHeader></CardHeader>
      <CardContent>
        <p className="font-bold">{postData.description}</p>
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
