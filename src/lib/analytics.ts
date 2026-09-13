import ReactGA from 'react-ga4';

const MEASUREMENT_ID = 'G-D9CN98Y2P1';

let isInitialized = false;

export const initGA = () => {
  if (!isInitialized) {
    ReactGA.initialize(MEASUREMENT_ID);
    isInitialized = true;
  }
};

export const trackPageView = (path: string) => {
  try {
    ReactGA.send({
      hitType: 'pageview',
      page: path,
    });
  } catch (err) {
    console.debug('GA PageView Error:', err);
  }
};

export const trackEvent = (
  action: string,
  category: string,
  label?: string
) => {
  try {
    ReactGA.event({
      action,
      category,
      label,
    });
  } catch (err) {
    console.debug('GA Event Error:', err);
  }
};

// --- Specialized Event Tracking Helpers ---

export const trackResumeDownload = (role: string = 'General') => {
  trackEvent('Resume Download', 'Resume', role);
};

export const trackResumePreview = (role: string = 'General') => {
  trackEvent('Resume Preview', 'Resume', role);
};

export const trackGithubClick = (context: string = 'Global Nav') => {
  trackEvent('GitHub Click', 'Social', context);
};

export const trackLinkedInClick = (context: string = 'Global Nav') => {
  trackEvent('LinkedIn Click', 'Social', context);
};

export const trackEmailClick = (context: string = 'Global Nav') => {
  trackEvent('Email Click', 'Contact', context);
};

export const trackWhatsappClick = (context: string = 'Global Nav') => {
  trackEvent('WhatsApp Click', 'Contact', context);
};

export const trackProjectDemo = (projectName: string) => {
  trackEvent('Demo Click', 'Project', projectName);
};

export const trackProjectRepo = (projectName: string) => {
  trackEvent('GitHub Repo', 'Project', projectName);
};

export const trackCertificateView = (certTitle: string) => {
  trackEvent('Certificate View', 'Certification', certTitle);
};

export const trackContactFormSubmit = () => {
  trackEvent('Form Submit', 'Contact', 'Contact Form Submission');
};
