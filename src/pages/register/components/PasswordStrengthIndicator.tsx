import { PasswordStrength } from '../types';

interface PasswordStrengthIndicatorProps {
  strength: PasswordStrength;
}

const PasswordStrengthIndicator = ({ strength }: PasswordStrengthIndicatorProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Password Strength</span>
        <span className={`text-sm font-semibold ${strength.color}`}>
          {strength.label}
        </span>
      </div>
      
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              level <= strength.score
                ? strength.color.replace('text-', 'bg-')
                : 'bg-muted'
            }`}
          />
        ))}
      </div>

      <div className="space-y-1 mt-3">
        <p className="text-xs text-muted-foreground mb-2">Password must contain:</p>
        {Object.entries(strength.requirements).map(([key, met]) => (
          <div key={key} className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded-full flex items-center justify-center ${
                met ? 'bg-success' : 'bg-muted'
              }`}
            >
              {met && (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L4 7L8 3"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span className={`text-xs ${met ? 'text-success' : 'text-muted-foreground'}`}>
              {key === 'minLength' && 'At least 8 characters'}
              {key === 'hasUpperCase' && 'One uppercase letter'}
              {key === 'hasLowerCase' && 'One lowercase letter'}
              {key === 'hasNumber' && 'One number'}
              {key === 'hasSpecialChar' && 'One special character'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;