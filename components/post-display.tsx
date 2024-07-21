import { prisma } from '@/app/prisma';
import SinglePost from './single-post';

async function getPosts() {
  const data = await prisma.post.findMany();
  return data;
}

const PostDisplay = async () => {
  const data = await getPosts();
  return (
    <div>
      {data.length > 0 &&
        data.map((post) => (
          <div key={post.id}>
            <SinglePost postData={post} />
          </div>
        ))}
    </div>
  );
};

export default PostDisplay;
