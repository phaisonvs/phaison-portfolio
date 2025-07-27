import { useLocation } from "wouter";

export class NavigationController {
  static useNavigationController() {
    const [location, navigate] = useLocation();

    const scrollToSection = (sectionId: string) => {
      if (location === '/') {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(`/?scrollTo=${sectionId}`);
      }
    };

    const isActivePage = (path: string): boolean => {
      return location === path;
    };

    const navigateToPage = (path: string) => {
      navigate(path);
    };

    return {
      location,
      navigate: navigateToPage,
      scrollToSection,
      isActivePage,
      goToHome: () => navigate('/'),
      goToProjects: () => navigate('/projects'),
      goToAuth: () => navigate('/auth'),
      goToDashboard: () => navigate('/dashboard'),
      goToContact: () => scrollToSection('contact'),
      goToAbout: () => scrollToSection('about'),
    };
  }
}