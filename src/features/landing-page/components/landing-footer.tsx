import { useNavigate } from "react-router";

export function LandingFooter() {
  const navigate = useNavigate();

  const handleScrollToTop = () => {
    if (location.pathname === '/landing-page') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/landing-page');
    }
  };

  return (
    <footer className="border-t bg-muted/50 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 cursor-pointer" onClick={handleScrollToTop}>
                <img src="/Alignify_logo.png" alt="Alignify logo" className="h-14 object-contain" />
                <span className="font-extrabold text-2xl text-primary">Alignify</span>
              </div>
            </div>
            <p className="text-muted-foreground">Nền tảng kết nối brands và influencers hàng đầu Việt Nam</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Sản phẩm</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/home" className="hover:text-foreground transition-colors">Dành cho Brands</a></li>
              <li><a href="/home" className="hover:text-foreground transition-colors">Dành cho Influencers</a></li>
              <li><a href="/home" className="hover:text-foreground transition-colors">Analytics</a></li>
              <li><a href="/home" className="hover:text-foreground transition-colors">API</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Hỗ trợ</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/home" className="hover:text-foreground transition-colors">Trung tâm trợ giúp</a></li>
              <li><a href="/home" className="hover:text-foreground transition-colors">Liên hệ</a></li>
              <li><a href="/home" className="hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="/home" className="hover:text-foreground transition-colors">Community</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Công ty</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/home" className="hover:text-foreground transition-colors">Về chúng tôi</a></li>
              <li><a href="/home" className="hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="/home" className="hover:text-foreground transition-colors">Privacy</a></li>
              <li><a href="/home" className="hover:text-foreground transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 InfluenceHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
