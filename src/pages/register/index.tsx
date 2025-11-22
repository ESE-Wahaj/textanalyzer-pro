import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthenticationLayout from '../../components/ui/AuthenticationLayout';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import Icon from '../../components/AppIcon';
import PasswordStrengthIndicator from './components/PasswordStrengthIndicator';
import UserTypeSelector from './components/UserTypeSelector';
import SocialRegistration from './components/SocialRegistration';
import SecurityIndicators from './components/SecurityIndicators';
import {
  RegisterFormData,
  ValidationErrors,
  PasswordStrength,
  UserTypeOption,
  SocialProvider,
} from './types';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    agreeToTerms: false,
    agreeToPrivacy: false,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    label: 'Weak',
    color: 'text-error',
    requirements: {
      minLength: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasNumber: false,
      hasSpecialChar: false,
    },
  });

  const userTypeOptions: UserTypeOption[] = [
    {
      value: 'educator',
      label: 'Educator',
      description: 'Teachers & professors',
      icon: 'GraduationCap',
    },
    {
      value: 'content-creator',
      label: 'Content Creator',
      description: 'Writers & bloggers',
      icon: 'PenTool',
    },
    {
      value: 'business-professional',
      label: 'Business Pro',
      description: 'Corporate teams',
      icon: 'Briefcase',
    },
  ];

  const socialProviders: SocialProvider[] = [
    { name: 'Google', icon: 'Chrome', color: '#4285F4' },
    { name: 'Microsoft', icon: 'Box', color: '#00A4EF' },
    { name: 'Apple', icon: 'Apple', color: '#000000' },
  ];

  useEffect(() => {
    calculatePasswordStrength(formData.password);
  }, [formData.password]);

  const calculatePasswordStrength = (password: string) => {
    const requirements = {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const metRequirements = Object.values(requirements).filter(Boolean).length;
    let score = 0;
    let label = 'Weak';
    let color = 'text-error';

    if (metRequirements >= 5) {
      score = 4;
      label = 'Very Strong';
      color = 'text-success';
    } else if (metRequirements >= 4) {
      score = 3;
      label = 'Strong';
      color = 'text-success';
    } else if (metRequirements >= 3) {
      score = 2;
      label = 'Medium';
      color = 'text-warning';
    } else if (metRequirements >= 1) {
      score = 1;
      label = 'Weak';
      color = 'text-error';
    }

    setPasswordStrength({ score, label, color, requirements });
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (passwordStrength.score < 3) {
      newErrors.password = 'Please create a stronger password';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.userType) {
      newErrors.userType = 'Please select your user type';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms of service';
    }

    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof RegisterFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log('Registration successful:', {
        fullName: formData.fullName,
        email: formData.email,
        userType: formData.userType,
      });

      navigate('/dashboard');
    } catch (error) {
      setErrors({
        email: 'Registration failed. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = (provider: string) => {
    console.log(`Registering with ${provider}`);
  };

  return (
    <AuthenticationLayout
      title="Create Your Account"
      subtitle="Start analyzing and improving your content today"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          error={errors.fullName}
          required
          disabled={isLoading}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="john.doe@example.com"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email}
          description="We'll send a verification email to this address"
          required
          disabled={isLoading}
        />

        <div className="space-y-2">
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              error={errors.password}
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
            </button>
          </div>

          {formData.password && <PasswordStrengthIndicator strength={passwordStrength} />}
        </div>

        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            error={errors.confirmPassword}
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>

        <UserTypeSelector
          options={userTypeOptions}
          selectedType={formData.userType}
          onSelect={(type) => handleInputChange('userType', type)}
          error={errors.userType}
        />

        <div className="space-y-3">
          <Checkbox
            label={
              <span className="text-sm">
                I agree to the{' '}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>
              </span>
            }
            checked={formData.agreeToTerms}
            onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
            error={errors.agreeToTerms}
            disabled={isLoading}
          />

          <Checkbox
            label={
              <span className="text-sm">
                I agree to the{' '}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </span>
            }
            checked={formData.agreeToPrivacy}
            onChange={(e) => handleInputChange('agreeToPrivacy', e.target.checked)}
            error={errors.agreeToPrivacy}
            disabled={isLoading}
          />
        </div>

        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
          iconName="UserPlus"
          iconPosition="left"
        >
          Create Account
        </Button>

        <SocialRegistration providers={socialProviders} onProviderClick={handleSocialRegister} />

        <SecurityIndicators />

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary font-medium hover:underline transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </AuthenticationLayout>
  );
};

export default Register;