import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AuthenticationLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const AuthenticationLayout = ({ children, title, subtitle }: AuthenticationLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow-elevation-2">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="var(--color-primary-foreground)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle
                  cx="8"
                  cy="6"
                  r="1.5"
                  fill="var(--color-accent)"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="1.5"
                  fill="var(--color-accent)"
                />
                <circle
                  cx="16"
                  cy="18"
                  r="1.5"
                  fill="var(--color-accent)"
                />
              </svg>
            </div>
            <span className="font-heading font-semibold text-2xl text-foreground">
              TextAnalyzer Pro
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-lg shadow-elevation-3 p-8">
            {(title || subtitle) && (
              <div className="mb-8 text-center">
                {title && (
                  <h1 className="font-heading font-semibold text-3xl text-foreground mb-2">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="text-muted-foreground">
                    {subtitle}
                  </p>
                )}
              </div>
            )}
            {children}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 TextAnalyzer Pro. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthenticationLayout;