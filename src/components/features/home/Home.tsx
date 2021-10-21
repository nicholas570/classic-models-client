import { useActor } from '@xstate/react';
import React, { useContext, useEffect, useState } from 'react';
import { getUser } from '../../../services/api/getUser';
import { ApiClient } from '../../../services/api/utils/apiClient';
import { AuthenticationContext } from '../../contexts/authentication/AuthenticationProvider';

export const Home = () => {
  const { authService } = useContext(AuthenticationContext);
  const [authState, sendToAuthService] = useActor(authService);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    (async () => {
      const result = await getUser();
      setUser(result);
    })();
  }, []);

  return <div>Welcome home {user.name}</div>;
};
