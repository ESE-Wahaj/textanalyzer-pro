export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export interface SocialProvider {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface MockCredentials {
  email: string;
  password: string;
  role: 'user' | 'admin';
}