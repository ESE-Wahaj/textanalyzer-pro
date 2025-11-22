import { SocialProvider } from '../types';
import Icon from '../../../components/AppIcon';

interface SocialRegistrationProps {
  providers: SocialProvider[];
  onProviderClick: (provider: string) => void;
}

const SocialRegistration = ({ providers, onProviderClick }: SocialRegistrationProps) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {providers.map((provider) => (
          <button
            key={provider.name}
            type="button"
            onClick={() => onProviderClick(provider.name)}
            className="
              flex items-center justify-center gap-2 px-4 py-3
              border border-border rounded-lg
              hover:bg-muted hover:border-primary/50
              transition-all duration-200
            "
          >
            <Icon name={provider.icon} size={20} color={provider.color} />
            <span className="text-sm font-medium text-foreground hidden sm:inline">
              {provider.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SocialRegistration;