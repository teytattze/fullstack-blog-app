import * as React from 'react';
import { AuthContext } from 'src/modules/auth/auth.provider';

export const useAuth = () => React.useContext(AuthContext);
