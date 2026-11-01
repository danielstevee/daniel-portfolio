import experiences from "../data/journey.json";

function About() {

  return (
    <section id="about" className="bg-[#f5f0eb] py-24 md:py-32">
      <div className="site-container">
        <div className="mb-12 text-center md:mb-16">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-[#c4a882]">
            Tentang Saya
          </span>
          <h2 className="mb-4 font-heading text-4xl font-bold md:text-5xl">Daniel Steven Setyawan</h2>
          <p className="text-base text-[#888888] md:text-lg">Mengubah Ide Menjadi Desain Interaktif</p>
        </div>

        <div className="mx-auto mb-16 max-w-4xl text-center md:mb-20">
          <div className="space-y-5 text-[15px] leading-relaxed md:text-base">
            <p>
              Saya <strong className="font-semibold text-[#1a1a1a]">Daniel Steven Setyawan</strong> (21), mahasiswa program studi S1 Teknik
              Informatika, Fakultas Teknik, Universitas Negeri Surabaya. Saya memiliki minat yang mendalam pada teknologi dan informatika,
              khususnya dalam pengembangan perangkat lunak dan keamanan siber.
            </p>
            <p>
              Sejak SMA, saya juga tertarik pada desain grafis, UI/UX, dan pengembangan front-end, yang
              membantu saya menggabungkan kreativitas dan fungsionalitas dalam setiap proyek. Semangat saya terhadap teknologi dan desain
              mendorong saya untuk terus belajar, berinovasi, dan menciptakan solusi yang praktis dan kreatif melalui setiap
              proyek yang saya kerjakan.
            </p>
            <p>
              Saya berfokus pada pengubahan ide kreatif menjadi desain yang interaktif dan menarik secara visual. Dengan menggabungkan
              kemampuan saya di bidang pengembangan front-end, UI/UX, dan desain grafis, saya ingin membangun pengalaman digital yang
              tidak hanya fungsional dan responsif, tetapi juga bermakna secara estetika dan menyenangkan bagi pengguna.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-[#c4a882]">
              Perjalanan
            </span>
            <h2 className="font-heading text-4xl font-bold md:text-5xl">Pengalaman</h2>
          </div>
          <div className="experience-list max-h-[600px] overflow-y-auto pr-2">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 gap-2 border-b border-[#e5e5e5] py-7 transition-all hover:pl-2.5 md:grid-cols-[140px_1fr] md:gap-8"
              >
                <div className="text-xs font-semibold uppercase tracking-wide text-[#c4a882]">{exp.year}</div>
                <div>
                  <h5 className="mb-1 font-heading text-lg font-semibold">{exp.title}</h5>
                  <p className="mb-2 flex items-center gap-1.5 text-sm text-[#888888]">
                    <i className="bi bi-geo-alt-fill text-xs text-[#c4a882]"></i>
                    {exp.location}
                  </p>
                  <p className="text-sm leading-relaxed text-[#888888]">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
