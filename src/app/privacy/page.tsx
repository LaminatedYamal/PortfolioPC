'use client';

import { useLanguage } from '@/components/LanguageContext';

export default function PrivacyPage() {
  const { language } = useLanguage();

  if (language === 'pt') {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 min-h-[calc(100vh-80px)]">
        <h1 className="text-4xl font-heading font-bold text-white mb-8">Política de Privacidade</h1>
        
        <div className="space-y-8 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-heading font-semibold text-white mb-4">1. Introdução</h2>
            <p>
              Bem-vindo ao portfólio digital de Pedro Henrique Martins Cóias. Esta política de privacidade descreve como os dados pessoais são recolhidos, utilizados e protegidos quando visita este website. Estou empenhado em garantir que a sua privacidade é protegida e em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-white mb-4">2. Recolha de Dados</h2>
            <p>
              Este website recolhe dados analíticos padrão (como visualizações de página, cliques e tipos de dispositivo) para me ajudar a compreender como os visitantes interagem com o meu portfólio. Isto é facilitado através do Google Tag Manager (GTM). Quando envia uma mensagem através do formulário de Contacto, recolho o nome, endereço de email e mensagem que fornece exclusivamente com o propósito de responder à sua questão.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-white mb-4">3. Cookies</h2>
            <p>
              Este website utiliza cookies para análises básicas. Tem o direito de aceitar ou recusar cookies não essenciais através da barra de consentimento de cookies que aparece na sua primeira visita. Recusar cookies desativará o rastreamento do Google Tag Manager.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-white mb-4">4. Os Seus Direitos</h2>
            <p>
              Ao abrigo do RGPD, tem o direito de aceder, retificar ou apagar quaisquer dados pessoais que me tenha fornecido (por exemplo, através do formulário de contacto). Se pretender exercer estes direitos, por favor contacte-me diretamente através da página de Contacto.
            </p>
          </section>
        </div>
      </div>
    );
  }

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
