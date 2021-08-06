import { renderWithProviders, screen } from 'src/lib/test-utils';
import { SignInForm } from './signin-form';

describe('<SignInForm />', () => {
  it('render basic form components', async () => {
    renderWithProviders(<SignInForm />);
    expect(screen.getByTestId(/username-input-field/)).toBeVisible;
    expect(screen.getByTestId(/password-input-field/)).toBeVisible;
    expect(screen.getByTestId(/forgot-password-button/)).toBeVisible;
    expect(screen.getByTestId(/signin-submit-button/)).toBeVisible;
    expect(screen.getByTestId(/google-signin-button/)).toBeVisible;
    expect(screen.getByTestId(/signup-button/)).toBeVisible;
  });
});
