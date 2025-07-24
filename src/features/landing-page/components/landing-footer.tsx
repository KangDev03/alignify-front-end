import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export function LandingFooter() {
  const navigate = useNavigate();
  const { t } = useTranslation()

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
            <p className="text-muted-foreground">{t("landingFooter.description")}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("landingFooter.product")}</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/home" className="hover:text-foreground transition-colors">{t("landingFooter.forBrands")}</a></li>
              <li><a href="/home" className="hover:text-foreground transition-colors">{t("landingFooter.forInfluencers")}</a></li>
              <li><a href="/home" className="hover:text-foreground transition-colors">{t("landingFooter.analytics")}</a></li>
              <li><a href="/home" className="hover:text-foreground transition-colors">{t("landingFooter.api")}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("landingFooter.support")}</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/home" className="hover:text-foreground transition-colors">{t("landingFooter.helpCenter")}</a></li>
              <li><a href="/home" className="hover:text-foreground transition-colors">{t("landingFooter.contact")}</a></li>
              <li><a href="/home" className="hover:text-foreground transition-colors">{t("landingFooter.blog")}</a></li>
              <li><a href="/home" className="hover:text-foreground transition-colors">{t("landingFooter.community")}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("landingFooter.company")}</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/home" className="hover:text-foreground transition-colors">{t("landingFooter.aboutUs")}</a></li>
              <li><a href="/home" className="hover:text-foreground transition-colors">{t("landingFooter.careers")}</a></li>
              <li><a href="/home" className="hover:text-foreground transition-colors">{t("landingFooter.privacy")}</a></li>
              <li><a href="/home" className="hover:text-foreground transition-colors">{t("landingFooter.terms")}</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>{t("landingFooter.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
