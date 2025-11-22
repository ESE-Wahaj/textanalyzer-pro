
import Button from '../../../components/ui/Button';
import { SocialProvider } from '../types';

interface SocialLoginButtonsProps {
  providers: SocialProvider[];
  onProviderClick: (providerId: string) => void;
}

const SocialLoginButtons = ({ providers, onProviderClick }: SocialLoginButtonsProps) => {
  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {providers.map((provider) => (
          <Button
            key={provider.id}
            variant="outline"
            fullWidth
            onClick={() => onProviderClick(provider.id)}
            iconName={provider.icon as any}
            iconPosition="left"
            iconSize={20}
            className="justify-center"
          >
            <span className="ml-2">Continue with {provider.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialLoginButtons;