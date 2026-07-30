import { Shield, BarChart3, Settings, Users } from 'lucide-react';

export const cookieCategories = [
  {
    id: 'essential',
    name: 'Essential Cookies',
    icon: Shield,
    description: 'Required for basic website functionality and security',
    necessary: true,
    cookies: [
      { name: 'auth_token', purpose: 'Maintains your login session', duration: 'Session' },
      { name: 'csrf_token', purpose: 'Protects against cross-site request forgery', duration: 'Session' },
      { name: 'consent_status', purpose: 'Remembers your cookie preferences', duration: '1 year' }
    ]
  },
  {
    id: 'performance',
    name: 'Performance Cookies',
    icon: BarChart3,
    description: 'Help us understand how visitors interact with our platform',
    necessary: false,
    cookies: [
      { name: 'google_analytics', purpose: 'Tracks website usage and performance', duration: '2 years' },
      { name: 'hotjar_session', purpose: 'Analyzes user behavior and interactions', duration: '1 year' },
      { name: 'performance_metrics', purpose: 'Monitors page load times and errors', duration: '30 days' }
    ]
  },
  {
    id: 'functional',
    name: 'Functional Cookies',
    icon: Settings,
    description: 'Remember your preferences and enhance user experience',
    necessary: false,
    cookies: [
      { name: 'language_pref', purpose: 'Remembers your preferred language', duration: '1 year' },
      { name: 'theme_preference', purpose: 'Saves your theme selection (light/dark)', duration: '1 year' },
      { name: 'recent_courses', purpose: 'Remembers your recently viewed courses', duration: '30 days' }
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing Cookies',
    icon: Users,
    description: 'Used to deliver relevant educational content and offers',
    necessary: false,
    cookies: [
      { name: 'facebook_pixel', purpose: 'Enables Facebook advertising campaigns', duration: '90 days' },
      { name: 'google_ads', purpose: 'Tracks conversions for Google Ads', duration: '90 days' },
      { name: 'affiliate_tracking', purpose: 'Tracks referrals from partner sites', duration: '60 days' }
    ]
  }
];
