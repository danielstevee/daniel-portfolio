import { useState, useEffect, useRef } from "react";
import webdevProjects from "../data/portfolio-webdev.json";
import uiuxProjects from "../data/portfolio-uiux.json";
import graphicProjects from "../data/portfolio-graphic.json";
import { resolveImg, getVideoSource } from "../utils/media";

const portfolioData = [
  ...webdevProjects.map((item) => ({ ...item, category: "webdev" })),
  ...uiuxProjects.map((item) => ({ ...item, category: "uiux" })),
  ...graphicProjects.map((item) => ({ ...item, category: "graphic" })),
];

function Portfolio() {
  const [activeTab, setActiveTab] = useState("webdev");
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const galleryRef = useRef(null);

  const tabs = [
    { key: "webdev", num: "01", label: "Pengembangan Web" },
    { key: "uiux", num: "02", label: "Desain UI/UX" },
    { key: "graphic", num: "03", label: "Desain Grafis" },
  ];

  const getItems = () => {
    return portfolioData.filter((item) => item.category === activeTab);
  };

  const aspectClass = selectedProject?.category === "graphic" ? "aspect-[4/5]" : "aspect-video";

  const openModal = (item) => {
    setSelectedProject(item);
    setActiveImage(0);
    setShowVideo(!!item.video);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setActiveImage(0);
    setShowVideo(false);
  };

  const updateScrollArrows = () => {
    const el = galleryRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const scrollGallery = (direction) => {
    const el = galleryRef.current;
    if (el) el.scrollBy({ left: direction * el.clientWidth, behavior: "smooth" });
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [selectedProject]);

  useEffect(() => {
    updateScrollArrows();
    const el = galleryRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollArrows);
    window.addEventListener("resize", updateScrollArrows);
    return () => {
      el.removeEventListener("scroll", updateScrollArrows);
      window.removeEventListener("resize", updateScrollArrows);
    };
  }, [selectedProject, showVideo, activeImage]);

  return (
    <section id="portfolio" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center md:mb-16">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-[#c4a882]">
            Karya Pilihan
          </span>
          <h1 className="mb-4 font-heading text-4xl font-bold md:text-5xl">Portofolio Saya</h1>
          <p className="mx-auto max-w-xl text-base text-[#888888]">
            Kumpulan karya pilihan dari perjalanan kreatif saya di bidang pengembangan web, desain UI/UX, dan desain grafis.
          </p>
        </div>

        <div className="mb-12 flex flex-col gap-[10px] border-b-0 md:mb-16 md:flex-row md:justify-center md:gap-0 md:border-b md:border-[#e5e5e5]">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex w-full items-center justify-between rounded-lg border border-[#e5e5e5] px-5 py-[15px] md:w-auto md:flex-col md:items-center md:rounded-none md:border-0 md:px-10 md:py-5 ${
                activeTab === tab.key
                  ? "bg-[#1a1a1a] text-white md:bg-transparent md:text-[#1a1a1a]"
                  : "bg-white"
              }`}
            >
              <span className={`text-[11px] font-semibold tracking-[1px] ${activeTab === tab.key ? "text-white md:text-[#1a1a1a]" : "text-[#888888]"}`}>{tab.num}</span>
              <span className={`text-[15px] font-semibold ${activeTab === tab.key ? "text-white md:text-[#1a1a1a]" : "text-[#888888]"}`}>{tab.label}</span>
              {activeTab === tab.key && (
                <span className="absolute bottom-[-1px] left-0 hidden h-[2px] w-full bg-[#1a1a1a] md:block"></span>
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {getItems().map((item) => (
            <button
              key={item.id}
              onClick={() => openModal(item)}
              className="portfolio-card group flex flex-col overflow-hidden rounded-xl border border-[#e5e5e5] bg-white text-left transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
            >
              <div
                className={`portfolio-img-wrap relative mb-6 shrink-0 overflow-hidden ${
                  activeTab === "webdev" ? "aspect-video grow" : "aspect-[4/3]"
                }`}
              >
                <img src={resolveImg(item.cover || item.images?.[0])} alt={item.title} className="h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
                <div className="portfolio-overlay absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                  <div className="portfolio-arrow flex h-[50px] w-[50px] translate-y-5 items-center justify-center rounded-full bg-white transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
                    <i className="bi bi-arrow-up-right text-lg text-[#1a1a1a]"></i>
                  </div>
                </div>
              </div>
              <div className="px-5 pb-5">
                <span className="mb-[14px] block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c4a882]">
                  {activeTab === "webdev" && "Pengembangan Web"}
                  {activeTab === "uiux" && "Desain UI/UX"}
                  {activeTab === "graphic" && "Desain Grafis"}
                </span>
                <h3 className="mb-[14px] font-heading text-xl font-semibold leading-snug text-[#1a1a1a] transition-colors duration-300 group-hover:text-[#c4a882]">{item.title}</h3>
                <p className="text-sm leading-[1.8] text-[#888888]">{item.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70" onClick={closeModal}></div>
          <div className="relative z-10 max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#1a1a1a] shadow-md transition hover:bg-white"
              aria-label="Tutup"
            >
              <i className="bi bi-x-lg"></i>
            </button>
            <div className="grid gap-8 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-10">
              <div
                className={
                  selectedProject.category === "graphic" ? "md:mx-auto md:max-w-[440px]" : ""
                }
              >
                {selectedProject.video && showVideo ? (
                  <div className={`${aspectClass} w-full overflow-hidden rounded-xl bg-black`}>
                    {getVideoSource(selectedProject.video)?.type === "video" ? (
                      <video
                        src={getVideoSource(selectedProject.video).src}
                        poster={resolveImg(selectedProject.cover || selectedProject.images?.[0])}
                        preload="metadata"
                        controls
                        className="h-full w-full"
                      />
                    ) : (
                      <iframe
                        src={getVideoSource(selectedProject.video)?.src}
                        title={selectedProject.title}
                        className="h-full w-full"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    )}
                  </div>
                ) : (
                  <div className={`${aspectClass} w-full overflow-hidden rounded-xl`}>
                    <img
                      src={resolveImg(selectedProject.images?.[activeImage] || selectedProject.cover)}
                      alt={selectedProject.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                {(selectedProject.video ||
                  (selectedProject.images && selectedProject.images.length > 1)) && (
                  <div className="relative mt-3">
                    <div ref={galleryRef} className="flex w-full gap-2 overflow-x-auto pb-1">
                      {selectedProject.video && (
                        <button
                          onClick={() => setShowVideo(true)}
                          title="Putar video"
                          className={`relative ${aspectClass} w-[calc((100%-2rem)/5)] flex-shrink-0 overflow-hidden rounded-lg border transition ${
                            showVideo ? "border-[#c4a882]" : "border-[#e5e5e5] hover:border-[#c4a882]"
                          }`}
                        >
                          <img
                            src={resolveImg(selectedProject.cover || selectedProject.images?.[0])}
                            alt="Video"
                            className="h-full w-full object-cover"
                          />
                          <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-white">
                            <i className="bi bi-play-fill text-2xl"></i>
                          </span>
                          <span className="absolute inset-x-0 bottom-0 bg-black/55 py-0.5 text-center text-[9px] font-semibold uppercase tracking-wider text-white">
                            Video
                          </span>
                        </button>
                      )}
                      {selectedProject.images &&
                        selectedProject.images.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setActiveImage(idx);
                              setShowVideo(false);
                            }}
                            className={`${aspectClass} w-[calc((100%-2rem)/5)] flex-shrink-0 overflow-hidden rounded-lg border transition ${
                              !showVideo && activeImage === idx
                                ? "border-[#c4a882]"
                                : "border-[#e5e5e5] hover:border-[#c4a882]"
                            }`}
                          >
                            <img src={resolveImg(img)} alt="" className="h-full w-full object-cover" />
                          </button>
                        ))}
                    </div>
                    {canScrollLeft && (
                      <button
                        onClick={() => scrollGallery(-1)}
                        aria-label="Geser ke kiri"
                        className="absolute left-1 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5e5e5] bg-white/95 text-[#1a1a1a] shadow-md transition hover:bg-white"
                      >
                        <i className="bi bi-chevron-left text-xs"></i>
                      </button>
                    )}
                    {canScrollRight && (
                      <button
                        onClick={() => scrollGallery(1)}
                        aria-label="Geser ke kanan"
                        className="absolute right-1 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[#e5e5e5] bg-white/95 text-[#1a1a1a] shadow-md transition hover:bg-white"
                      >
                        <i className="bi bi-chevron-right text-xs"></i>
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div>
                <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[#c4a882]">
                  {selectedProject.category === "webdev" && "Pengembangan Web"}
                  {selectedProject.category === "uiux" && "Desain UI/UX"}
                  {selectedProject.category === "graphic" && "Desain Grafis"}
                </span>
                <h3 className="mb-4 font-heading text-2xl font-bold md:text-3xl">{selectedProject.title}</h3>
                <p className="mb-6 text-sm leading-relaxed text-[#666666] md:text-base">
                  {selectedProject.longDesc || selectedProject.desc}
                </p>
                {selectedProject.tech && selectedProject.tech.length > 0 && (
                  <div className="mb-6">
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#888888]">Alat / Teknologi</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((t, idx) => (
                        <span key={idx} className="rounded-full border border-[#e5e5e5] px-3 py-1 text-xs text-[#1a1a1a]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {selectedProject.category === "webdev" && (
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={selectedProject.links?.github || "https://github.com/danielstevee"}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] px-5 py-2 text-sm text-white transition hover:opacity-90"
                    >
                      Selengkapnya <i className="bi bi-arrow-up-right"></i>
                    </a>
                    {selectedProject.links?.demo && (
                      <a
                        href={selectedProject.links.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-[#e5e5e5] px-5 py-2 text-sm text-[#1a1a1a] transition hover:bg-[#f5f5f5]"
                      >
                        Lihat Website <i className="bi bi-box-arrow-up-right"></i>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Portfolio;
