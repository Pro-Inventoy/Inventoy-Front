import { Navigate, Outlet } from 'react-router-dom';
import { useStatus } from '../../state/hooks/userAuth.js';

export default function ProtectedRoutes() {
  const { user } = useStatus();
  return user ? <Outlet /> : <Navigate to="auth" />;
}