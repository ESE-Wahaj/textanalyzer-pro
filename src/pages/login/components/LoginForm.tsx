import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import { LoginFormData, LoginFormErrors, MockCredentials } from '../types';

interface LoginFormProps {
  mockCredentials: MockCredentials[];
  onSubmit: (data: LoginFormData) => void;
}

const LoginForm = ({ mockCredentials, onSubmit }: LoginFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    setTimeout(() => {
      const matchedCredential = mockCredentials.find(
        (cred) => cred.email === formData.email && cred.password === formData.password
      );

      if (matchedCredential) {
        onSubmit(formData);
        if (matchedCredential.role === 'admin') {
          navigate('/admin-panel');
        } else {
          navigate('/dashboard');
        }
      } else {
        setErrors({
          general: 'Invalid email or password. Please check your credentials and try again.',
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (field: keyof LoginFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === 'rememberMe' ? e.target.checked : e.target.value,
    }));
    if (errors[field as keyof LoginFormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className="p-4 bg-error/10 border border-error rounded-lg flex items-start gap-3">
          <Icon name="AlertCircle" size={20} color="var(--color-error)" className="flex-shrink-0 mt-0.5" />
          <p className="text-sm text-error">{errors.general}</p>
        </div>
      )}

      <Input
        type="email"
        label="Email Address"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleInputChange('email')}
        error={errors.email}
        required
        disabled={isLoading}
        className="w-full"
      />

      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange('password')}
          error={errors.password}
          required
          disabled={isLoading}
          className="w-full"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[38px] text-muted-foreground hover:text-foreground transition-colors"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          checked={formData.rememberMe}
          onChange={handleInputChange('rememberMe')}
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => navigate('/register')}
          className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
        >
          Forgot Password?
        </button>
      </div>

      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        size="lg"
      >
        Sign In
      </Button>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Create Account
          </button>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;