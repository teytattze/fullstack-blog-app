import { PageContainer } from 'src/components';
import { ProtectedRouted } from 'src/modules/auth';
import { UserPostsListing } from 'src/modules/users';

function UserPosts() {
  return (
    <ProtectedRouted>
      <PageContainer title="My Post">
        <UserPostsListing />
      </PageContainer>
    </ProtectedRouted>
  );
}

export default UserPosts;
