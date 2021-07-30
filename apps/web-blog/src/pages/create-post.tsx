import { ProtectedRouted } from 'src/modules/auth/components/protected-routed';
import { PageContainer } from '../components';
import { PostCreate } from '../modules/posts';

function CreatePost() {
  return (
    <ProtectedRouted>
      <PageContainer title="Create New Post">
        <PostCreate />
      </PageContainer>
    </ProtectedRouted>
  );
}

export default CreatePost;
