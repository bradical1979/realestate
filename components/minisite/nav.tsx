'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '#neighborhood-and-community-overview', label: 'Overview' },
  { href: '#lifestyle-fit-and-buyer-profile', label: 'Lifestyle' },
  { href: '#schools-and-family-resources', label: 'Schools' },
  { href: '#safety-and-accessibility', label: 'Safety' },
  { href: '#local-amenities-and-daily-living-resources', label: 'Amenities' },
  { href: '#recreation-arts-and-lifestyle', label: 'Recreation' },
  { href: '#economic-and-employment-landscape', label: 'Employment' },
  { href: '#transportation-and-commute-information', label: 'Transportation' },
  { href: '#climate-environment-and-seasonal-living', label: 'Climate' },
  { href: '#health-wellness-and-nearby-medical-facilities', label: 'Health' },
  { href: '#real-estate-market-and-financial-insights', label: 'Real Estate' },
  { href: '#property-listings', label: 'Listings' }
];

export function MiniSiteNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
          
          <div className={`${isOpen ? 'block' : 'hidden'} absolute top-16 left-0 right-0 bg-background border-b md:block md:static md:border-none`}>
            <div className="flex overflow-x-auto hide-scrollbar">
              <ul className="flex flex-col md:flex-row md:items-center md:space-x-6 p-4 md:p-0">
                {navItems.map((item) => (
                  <li key={item.href} className="min-w-max">
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className={`block py-2 text-sm font-medium transition-colors md:py-0 ${
                        activeSection === item.href.substring(1)
                          ? 'text-primary'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}