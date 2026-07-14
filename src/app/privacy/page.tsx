export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 min-h-[calc(100vh-80px)]">
      <h1 className="text-4xl font-heading font-bold text-white mb-8">Privacy Policy</h1>
      
      <div className="space-y-8 text-foreground/80 leading-relaxed">
        <section>
          <h2 className="text-2xl font-heading font-semibold text-white mb-4">1. Introduction</h2>
          <p>
            Welcome to the digital portfolio of Pedro Henrique Martins Cóias. This privacy policy outlines how personal data is collected, used, and protected when you visit this website. I am committed to ensuring that your privacy is protected and compliant with the General Data Protection Regulation (GDPR).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-semibold text-white mb-4">2. Data Collection</h2>
          <p>
            This website collects standard analytics data (such as page views, clicks, and device types) to help me understand how visitors interact with my portfolio. This is facilitated through Google Tag Manager (GTM). When you submit a message via the Contact form, I collect the name, email address, and message you provide solely for the purpose of responding to your inquiry.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-semibold text-white mb-4">3. Cookies</h2>
          <p>
            This website uses cookies for basic analytics. You have the right to accept or decline non-essential cookies via the cookie consent banner that appears upon your first visit. Declining cookies will disable Google Tag Manager tracking.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-semibold text-white mb-4">4. Your Rights</h2>
          <p>
            Under the GDPR, you have the right to access, rectify, or erase any personal data you have provided to me (e.g., via the contact form). If you wish to exercise these rights, please contact me directly via the Contact page.
          </p>
        </section>
      </div>
    </div>
  );
}
