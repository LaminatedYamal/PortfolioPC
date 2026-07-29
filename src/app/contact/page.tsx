'use client';

import { useLanguage } from '@/components/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-24 min-h-[calc(100vh-80px)]">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">{t.contact.title}</h1>
        <p className="text-foreground/70 max-w-xl text-lg">
          {t.contact.description}
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-12">
        {/* Contact Form */}
        <div className="md:col-span-3">
          <form 
            className="space-y-6 bg-surface/30 p-8 rounded-3xl border border-white/5" 
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const nameInput = form.querySelector('#name') as HTMLInputElement;
              const emailInput = form.querySelector('#email') as HTMLInputElement;
              const messageInput = form.querySelector('#message') as HTMLTextAreaElement;

              const name = nameInput?.value || '';
              const email = emailInput?.value || '';
              const message = messageInput?.value || '';

              const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
              const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

              if (typeof window !== 'undefined' && (window as any).dataLayer) {
                (window as any).dataLayer.push({ event: 'contact_form_submitted' });
              }

              // Open default email client (e.g. Outlook / Mail / Gmail) directly to Pedro's email
              window.location.href = `mailto:pedro.coias.m@gmail.com?subject=${subject}&body=${body}`;

              alert(t.contact.alertSent);
            }}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2">{t.contact.labelName}</label>
              <input type="text" id="name" required className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-sky transition-colors" placeholder={t.contact.placeholderName} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">{t.contact.labelEmail}</label>
              <input type="email" id="email" required className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-sky transition-colors" placeholder={t.contact.placeholderEmail} />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2">{t.contact.labelMessage}</label>
              <textarea id="message" required rows={5} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-sky transition-colors resize-none" placeholder={t.contact.placeholderMessage}></textarea>
            </div>
            <button type="submit" className="w-full py-4 rounded-xl bg-accent-indigo text-white font-medium hover:bg-accent-indigo/90 transition-all cursor-pointer">
              {t.contact.btnSend}
            </button>
          </form>
        </div>

        {/* Direct Links & Socials */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-surface/50 p-8 rounded-3xl border border-white/10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#0077b5]/20 rounded-full flex items-center justify-center mb-4 border border-[#0077b5]/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#0077b5]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </div>
            <h3 className="font-heading font-semibold text-white text-xl mb-2">{t.contact.linkTitle}</h3>
            <p className="text-foreground/60 text-sm mb-6">{t.contact.linkDesc}</p>
            <a href="https://www.linkedin.com/in/pedro-c%C3%B3ias-3b669b359" target="_blank" rel="noreferrer" onClick={() => { if (typeof window !== 'undefined' && (window as any).dataLayer) (window as any).dataLayer.push({ event: 'click_linkedin', label: 'LinkedIn_Button' }); }} className="px-6 py-2.5 rounded-full bg-[#0077b5] text-white font-medium hover:bg-[#0077b5]/80 transition-colors w-full block">{t.contact.btnLink}</a>
          </div>

          <div className="bg-surface/50 p-8 rounded-3xl border border-white/10 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-accent-sky/20 rounded-full flex items-center justify-center mb-4 border border-accent-sky/50">
              <span className="text-2xl">📄</span>
            </div>
            <h3 className="font-heading font-semibold text-white text-xl mb-2">{t.contact.cvTitle}</h3>
            <p className="text-foreground/60 text-sm mb-6">{t.contact.cvDesc}</p>
            <a href="/PortfolioPC/Pedro_Coias_CV.pdf" download="Pedro_Coias_CV.pdf" target="_blank" rel="noreferrer" onClick={() => { if (typeof window !== 'undefined' && (window as any).dataLayer) (window as any).dataLayer.push({ event: 'download_cv', label: 'Pedro_Coias_CV' }); }} className="px-6 py-2.5 rounded-full border border-accent-sky text-accent-sky font-medium hover:bg-accent-sky hover:text-background transition-colors w-full block">{t.contact.btnCv}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
