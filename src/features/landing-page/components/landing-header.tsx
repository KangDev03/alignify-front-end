import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";

import { ThemeToggle } from "@/components/theme/theme-toggle";

export function LandingHeader() {
  const navigate = useNavigate();

  const handleScrollToTop = () => {
    if (location.pathname === '/landing-page') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/landing-page');
    }
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
            Tính năng
          </a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Bảng giá
          </a>
          <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
            Đánh giá
          </a>
        </nav>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button variant="ghost" onClick={() => { navigate('/auth/login'); }}>
            Đăng nhập
          </Button>
          <Button
            onClick={() => { navigate('/auth/select-role'); }}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 dark:from-blue-600 dark:to-purple-600 dark:hover:from-blue-700 dark:hover:to-purple-700"
          >
            Đăng ký
          </Button>
        </div>
      </div>
    </header>
  );
}
