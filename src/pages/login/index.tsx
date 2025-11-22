import { useState } from 'react';
import AuthenticationLayout from '../../components/ui/AuthenticationLayout';
import LoginForm from './components/LoginForm';
import SocialLoginButtons from './components/SocialLoginButtons';
import SecurityBadge from './components/SecurityBadge';
import { LoginFormData, SocialProvider, MockCredentials } from './types';

const Login = () => {
  const mockCredentials: MockCredentials[] = [
    {
      email: "user@textanalyzer.com",
      password: "user123",
      role: "user"
    },
    {
      email: "admin@textanalyzer.com",
      password: "admin123",
      role: "admin"
    },
    {
      email: "john.doe@example.com",
      password: "password123",
      role: "user"
    }
  ];

  const socialProviders: SocialProvider[] = [
    {
      id: "google",
      name: "Google",
      icon: "Mail",
      color: "var(--color-error)"
    },
    {
      id: "microsoft",
      name: "Microsoft",
      icon: "Box",
      color: "var(--color-primary)"
    }
  ];

  const [showCredentials] = useState(true);

  const handleLogin = (data: LoginFormData) => {
    console.log('Login submitted:', data);
  };

  const handleSocialLogin = (providerId: string) => {
    console.log('Social login with:', providerId);
  };

  return (
    <AuthenticationLayout
      title="Welcome Back"
      subtitle="Sign in to access your text analysis workspace"
    >
      {showCredentials && (
        <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <p className="text-sm font-medium text-foreground mb-2">Demo Credentials:</p>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div>
              <span className="font-medium">User:</span> user@textanalyzer.com / user123
            </div>
            <div>
              <span className="font-medium">Admin:</span> admin@textanalyzer.com / admin123
            </div>
          </div>
        </div>
      )}

      <LoginForm 
        mockCredentials={mockCredentials}
        onSubmit={handleLogin}
      />

      <div className="mt-6">
        <SocialLoginButtons
          providers={socialProviders}
          onProviderClick={handleSocialLogin}
        />
      </div>

      <SecurityBadge />
    </AuthenticationLayout>
  );
};

export default Login;