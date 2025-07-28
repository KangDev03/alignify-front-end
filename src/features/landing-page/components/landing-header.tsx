import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";

import { LanguageSelect } from "@/components/language-select";
import { UserDropdown } from "@/components/layouts/app/user-dropdown";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { logout } from "@/features/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";


export function LandingHeader() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  const handleScrollToTop = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1 cursor-pointer" onClick={handleScrollToTop}>
            <img src="/Alignify_logo.png" alt="Alignify logo" className="h-16 object-contain" />
            <span className="font-extrabold text-3xl text-primary">Alignify</span>
          </div>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            {t('features')}
          </a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            {t('pricing')}
          </a>
          <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
            {t('testimonials')}
          </a>
        </nav>
        <div className="flex items-center space-x-2">
          <LanguageSelect variant="default" />
          <ThemeToggle />
          {token ? (
            <>
              <Button
                onClick={() => navigate('/home')}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 dark:from-blue-600 dark:to-purple-600 dark:hover:from-blue-700 dark:hover:to-purple-700"
              >
                {t('moveToHome')}
              </Button>
              <UserDropdown onLogout={handleLogout} />
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => { navigate('/auth/login'); }}>
                {t('login')}
              </Button>
              <Button
                onClick={() => { navigate('/auth/select-role'); }}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 dark:from-blue-600 dark:to-purple-600 dark:hover:from-blue-700 dark:hover:to-purple-700"
              >
                {t('register')}
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
