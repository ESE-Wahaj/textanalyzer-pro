export interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: 'educator' | 'content-creator' | 'business-professional' | '';
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
}

export interface ValidationErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  userType?: string;
  agreeToTerms?: string;
  agreeToPrivacy?: string;
}

export interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  requirements: {
    minLength: boolean;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
  };
}

export interface UserTypeOption {
  value: 'educator' | 'content-creator' | 'business-professional';
  label: string;
  description: string;
  icon: string;
}

export interface SocialProvider {
  name: string;
  icon: string;
  color: string;
}