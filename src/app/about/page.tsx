'use client';

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-start min-h-[calc(100vh-80px)] pb-20">
      <section className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-24 flex flex-col md:flex-row gap-12 lg:gap-24 items-start">
        <div className="flex-1 space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-surface border border-white/10 text-accent-cyan text-sm font-semibold tracking-wide mb-2">
            Pedro Coias
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight text-white leading-tight">
            Digital Strategist & <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-cobalt">Web3 Builder</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl leading-relaxed">
            I specialize in merging technical strategy (SEO, Web3, Automations) with creative marketing to drive measurable growth.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
            <div className="p-4 rounded-2xl bg-surface border border-white/5">
              <div className="text-3xl font-bold text-white font-heading">18.77</div>
              <div className="text-sm text-foreground/60 mt-1">Academic Average</div>
            </div>
            <div className="p-4 rounded-2xl bg-surface border border-white/5">
              <div className="text-3xl font-bold text-accent-cyan font-heading">SEO & SEM</div>
              <div className="text-sm text-foreground/60 mt-1">Specialization</div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 w-full bg-surface/30 rounded-3xl p-8 border border-white/5 flex flex-col max-h-[600px]">
          <h2 className="text-2xl font-heading font-bold text-white mb-6 shrink-0">Experience & Certifications</h2>
          <div className="overflow-y-auto pr-3 pb-4 flex-1 space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-accent-cyan/20 before:to-transparent">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-accent-cyan bg-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-[0_0_10px_rgba(0,180,216,0.5)]"></div>
              <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] bg-surface p-5 rounded-2xl border border-white/5">
                <h4 className="font-heading font-semibold text-white">Digital Marketing Lead</h4>
                <div className="text-sm text-accent-cyan font-medium mb-2">2023 - Present</div>
                <p className="text-foreground/70 text-sm">Spearheading SEO architecture, Web3 integrations, and automated CRM workflows.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white/20 bg-surface shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
              <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.25rem)] bg-surface p-5 rounded-2xl border border-white/5">
                <h4 className="font-heading font-semibold text-white">Google Analytics Certified</h4>
                <div className="text-sm text-foreground/50 font-medium mb-2">2022</div>
                <p className="text-foreground/70 text-sm">Advanced dataLayer implementation and tracking infrastructure.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bio / The Story Section */}
      <section className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-12">
        <div className="bg-surface/30 rounded-3xl p-8 md:p-16 lg:p-24 border border-white/5 relative overflow-hidden">
          {/* Decorative quote mark */}
          <div className="absolute top-0 left-8 text-[12rem] text-white/[0.03] font-serif leading-none select-none">"</div>
          
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-10 relative z-10 text-center">The Story So Far</h2>
          
          <div className="md:columns-2 gap-12 space-y-6 text-lg text-foreground/80 leading-relaxed relative z-10">
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-accent-cyan first-letter:mr-3 first-letter:float-left">
              This is where you can write your full, unabridged bio! You can use this expansive space to talk about your background, your passions, and exactly how you bridge the gap between creative marketing and technical architecture. The two-column editorial layout makes it easy to read even the longest stories.
            </p>
            <p>
              I started my journey with a deep curiosity for how digital ecosystems function. After mastering the technical intricacies of SEO and search engine algorithms, I realized that traffic is meaningless without engaging, high-quality content and brand identity to support it.
            </p>
            <p>
              <strong>Now, about that resume gap...</strong>
            </p>
            <p>
              <em>(Insert your high-levity explanation here! Whether you were scaling a mountain in Tibet, building a decentralized autonomous organization from a basement, or simply taking a much-needed mental health sabbatical to master the ancient art of sourdough bread, this is the perfect block to address it with massive humor and personality. Own the narrative!)</em>
            </p>
            <p>
              It turns out, stepping away from the keyboard was exactly what I needed to re-evaluate my approach to digital marketing. I returned with a renewed focus on building hybrid digital experiences that don't just capture attention, but retain it. 
            </p>
            <p>
              Ultimately, that time shaped my perspective and fueled my drive to build the immersive, Web3-integrated digital environments you see today. I am constantly exploring the bleeding edge of tech, whether that involves smart contracts, spatial 3D builds, or automating complex CRM workflows.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
