import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PublicRoute = ({ children }) => {
  const token = Cookies.get('accessToken'); 
  if (token) {
   
    return <Navigate to="/dashboard" replace />;
  }
  return children; 
};

export default PublicRoute;
