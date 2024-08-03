import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function RequiresAuth({ children }) {
  const token = localStorage.getItem('token');
  return token.length > 0 ? children : <Navigate to="/login" />;
}
