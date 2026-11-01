import { useState, useEffect } from "react";
import certificatesData from "../data/certificates.json";
import { resolveImg } from "../utils/media";

const certificates = certificatesData.map((cert) => ({
  ...cert,
  img: resolveImg(cert.img),
}));

const langColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  PHP: "#4F5D95",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Go: "#00ADD8",
  Rust: "#dea584",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Dart: "#00B4AB",
  Ruby: "#701516",
  Vue: "#41b883",
  Svelte: "#ff3e00",
};

const getLangColor = (lang) => {
  if (!lang) return "#cccccc";
  return langColors[lang] || "#cccccc";
};

const techs = ["html5", "css3-alt", "js", "bootstrap", "figma", "python", "cuttlefish", "php", "git-alt", "react"];

function Stats() {
  const [activeStat, setActiveStat] = useState(null);
  const [repos, setRepos] = useState([]);
  const [projectCount, setProjectCount] = useState(0);
  const [loadingRepos, setLoadingRepos] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch("https://api.github.com/users/danielstevee/repos?per_page=100&sort=updated");
        if (res.ok) {
          const data = await res.json();
          setRepos(data);
          setProjectCount(data.length);
        }
      } catch (error) {
        console.error("Failed to fetch GitHub repos:", error);
        setRepos([]);
        setProjectCount(0);
      } finally {
        setLoadingRepos(false);
      }
    };

    fetchRepos();
  }, []);

  useEffect(() => {
    const counters = document.querySelectorAll(".counter");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute("data-target");
            if (target === 0) {
              counter.innerText = "0";
              observer.unobserve(counter);
              return;
            }
            let count = 0;
            const increment = target / 60;
            const updateCount = () => {
              if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(updateCount);
              } else {
                counter.innerText = target.toLocaleString();
              }
            };
            updateCount();
            observer.unobserve(counter);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => observer.observe(c));
  }, [projectCount]);

  const toggleStat = (stat) => {
    setActiveStat((prev) => (prev === stat ? null : stat));
  };

  return (
    <section id="stats" className="border-y border-[#e5e5e5] bg-white py-20">
      <div className="site-container">
        <div
          className="stats-wrapper overflow-hidden rounded-2xl border border-[#e5e5e5] max-md:rounded-none max-md:border-0"
          onPointerLeave={(e) => {
            if (e.pointerType === "mouse") setActiveStat(null);
          }}
        >
          {/* Stats Headers */}
          <div className="stats-grid grid grid-cols-1 md:grid-cols-3">
            {[
              { key: "projects", target: projectCount, label: "Total Proyek" },
              { key: "certificates", target: certificates.length, label: "Sertifikat" },
              { key: "techstack", target: 20, label: "Teknologi" },
            ].map((stat) => (
              <button
                key={stat.key}
                onClick={() => toggleStat(stat.key)}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") setActiveStat(stat.key);
                }}
                data-stat={stat.key}
                className={`stat-header px-4 py-8 transition-colors ${
                  activeStat === stat.key ? "active bg-[#f5f0eb]" : "bg-white"
                } border-b border-[#e5e5e5] md:border-b-0 md:border-r last:border-r-0`}
              >
                <div className={`flex items-center justify-center gap-1 ${activeStat === stat.key ? "" : ""}`}>
                  <span className="counter font-heading text-5xl font-bold md:text-6xl" data-target={stat.target}>
                    0
                  </span>
                  <span className="text-3xl font-medium text-[#c4a882] md:text-4xl">+</span>
                </div>
                <div className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-[#888888]">
                  {stat.label}
                </div>
              </button>
            ))}
          </div>

          {/* Details */}
          <div className="stat-details bg-[#f5f0eb]">
            <div
              className={`stat-detail ${activeStat === "projects" ? "active" : ""} px-6 py-0 md:px-10`}
              data-stat="projects"
              style={{
                maxHeight: activeStat === "projects" ? "600px" : "0",
                opacity: activeStat === "projects" ? 1 : 0,
                paddingTop: activeStat === "projects" ? "30px" : "0",
                paddingBottom: activeStat === "projects" ? "30px" : "0",
                overflow: activeStat === "projects" ? "hidden" : "hidden",
                pointerEvents: activeStat === "projects" ? "auto" : "none",
                transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <div className="repo-list flex max-h-[320px] flex-col gap-2.5 overflow-y-auto pr-2">
                {loadingRepos ? (
                  <div className="rounded-lg bg-white px-3.5 py-2.5 text-sm text-[#888888]">Memuat...</div>
                ) : repos.length === 0 ? (
                  <div className="rounded-lg bg-white px-3.5 py-2.5 text-sm text-[#888888]">Repositori tidak ditemukan</div>
                ) : (
                  repos.map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2.5 rounded-lg bg-white px-3.5 py-2.5 text-sm transition-transform hover:translate-x-1"
                    >
                      <i className="bi bi-github text-base"></i>
                      <span className="flex-1 font-medium">{repo.name}</span>
                      {repo.language && (
                        <span className="flex items-center gap-1 text-xs text-[#888888]">
                          <i className="bi bi-circle-fill text-[6px]" style={{ color: getLangColor(repo.language) }}></i>
                          {repo.language}
                        </span>
                      )}
                    </a>
                  ))
                )}
              </div>
              <a
                href="https://github.com/danielstevee"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-2.5"
              >
                Lihat di GitHub <i className="bi bi-arrow-up-right"></i>
              </a>
            </div>

            <div
              className={`stat-detail ${activeStat === "certificates" ? "active" : ""} px-6 py-0 md:px-10`}
              data-stat="certificates"
              style={{
                maxHeight: activeStat === "certificates" ? "600px" : "0",
                opacity: activeStat === "certificates" ? 1 : 0,
                paddingTop: activeStat === "certificates" ? "30px" : "0",
                paddingBottom: activeStat === "certificates" ? "30px" : "0",
                overflow: activeStat === "certificates" ? "auto" : "hidden",
                pointerEvents: activeStat === "certificates" ? "auto" : "none",
                transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <div className="flex flex-col gap-4">
                {certificates.length === 0 ? (
                  <div className="rounded-lg bg-white px-3.5 py-2.5 text-sm text-[#888888]">
                    Tambahkan sertifikat ke src/data/certificates.json
                  </div>
                ) : (
                  certificates.map((cert, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 rounded-lg bg-white p-3 transition-all hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="h-[60px] w-20 flex-shrink-0 overflow-hidden rounded-md">
                        <img src={cert.img} alt={cert.title} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-heading text-sm font-semibold">{cert.title}</h4>
                        <p className="text-xs text-[#888888]">{cert.desc}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div
              className={`stat-detail ${activeStat === "techstack" ? "active" : ""} px-6 py-0 md:px-10`}
              data-stat="techstack"
              style={{
                maxHeight: activeStat === "techstack" ? "600px" : "0",
                opacity: activeStat === "techstack" ? 1 : 0,
                paddingTop: activeStat === "techstack" ? "30px" : "0",
                paddingBottom: activeStat === "techstack" ? "30px" : "0",
                overflow: activeStat === "techstack" ? "hidden" : "hidden",
                pointerEvents: activeStat === "techstack" ? "auto" : "none",
                transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <div className="tech-marquee-container overflow-hidden py-2">
                <div className="tech-marquee flex w-max gap-8">
                  {[...Array(2)].map((_, dup) =>
                    techs.map((tech, idx) => (
                      <div
                        key={`${dup}-${idx}`}
                        className="flex min-w-[80px] flex-col items-center gap-1.5 rounded-lg bg-white px-5 py-3 transition-all hover:-translate-y-1 hover:shadow-md"
                      >
                        <i className={`fab fa-${tech} text-2xl`}></i>
                        <span className="text-[11px] font-medium text-[#888888]">
                          {tech === "html5" && "HTML"}
                          {tech === "css3-alt" && "CSS"}
                          {tech === "js" && "JavaScript"}
                          {tech === "bootstrap" && "Bootstrap"}
                          {tech === "figma" && "Figma"}
                          {tech === "python" && "Python"}
                          {tech === "cuttlefish" && "C++"}
                          {tech === "php" && "PHP"}
                          {tech === "git-alt" && "Git"}
                          {tech === "react" && "React"}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;
