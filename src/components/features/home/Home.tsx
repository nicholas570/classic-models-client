import { useActor } from '@xstate/react';
import React, { useContext, useEffect, useState } from 'react';
import { getEmployees } from '../../../services/api/getEmployees';

import { AuthenticationContext } from '../../contexts/authentication/AuthenticationProvider';

export const Home = () => {
  const { authService } = useContext(AuthenticationContext);
  const [authState, sendToAuthService] = useActor(authService);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    // (async () => {
    //   const result = await getEmployees();
    //   setUser(result);
    // })();
  }, []);

  return <div>Welcome home nicolas</div>;
};
