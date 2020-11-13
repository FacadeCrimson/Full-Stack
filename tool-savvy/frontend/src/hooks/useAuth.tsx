
import { useContext } from 'react';
import Auth0Context, { Auth0ContextInterface } from '../reducers/authContext';

const useAuth0 = (): Auth0ContextInterface => useContext(Auth0Context);

export default useAuth0;