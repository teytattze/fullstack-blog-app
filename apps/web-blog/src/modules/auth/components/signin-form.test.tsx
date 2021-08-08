import { renderWithProviders, screen } from 'src/lib/test-utils';
import { SignInForm } from './signin-form';

describe('<SignInForm />', () => {
  it('render basic form components', async () => {
    renderWithProviders(<SignInForm />);

    expect(screen.getByLabelText(/Username/)).toBeVisible;
    expect(screen.getByLabelText(/Password/)).toBeVisible;
    expect(screen.getByRole('link', { name: 'Forgot Password?' })).toBeVisible;
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeVisible;
    expect(
      screen.getByRole('button', { name: 'Google logo Sign In with Google' }),
    ).toBeVisible;
    expect(screen.getByRole('link', { name: 'Sign Up Now' })).toBeVisible;
  });
});
