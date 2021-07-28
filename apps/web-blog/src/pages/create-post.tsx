import { PageContainer } from '../components';
import { PostCreate } from '../modules/posts';

function CreatePost() {
  return (
    <PageContainer title="Create New Post">
      <PostCreate />
    </PageContainer>
  );
}

export default CreatePost;
