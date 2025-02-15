import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { useToast } from '@chakra-ui/react';

const PrivateRoute = ({ children, requiredRoles = [] }) => {
  const { user } = useAuthStore();
  const toast = useToast();

  // If user is not logged in, redirect to login
  if (!user) {
    toast({
      title: 'Authentication Required',
      description: 'Please log in to access this page.',
      status: 'warning',
      duration: 3000,
      isClosable: true,
    });
    return <Navigate to="/login" />;
  }

  // If requiredRoles is provided, check if user has required role
  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    toast({
      title: 'Access Denied',
      description: `This page requires ${requiredRoles.join(' or ')} role.`,
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute; 