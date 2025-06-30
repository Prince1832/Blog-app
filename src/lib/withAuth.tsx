import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent: React.FC<any>) => {
  const AuthComponent = (props: any) => {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
      const isAdmin = localStorage.getItem('isAdmin');
      const token = localStorage.getItem('token');

      if (!isAdmin || !token) {
        router.replace('/login');
      } else {
        setAuthorized(true);
      }
    }, []);

   
    if (!authorized) {
      return (
        <div className="h-screen w-full flex items-center justify-center text-gray-500 text-lg">
          Checking authentication...
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
