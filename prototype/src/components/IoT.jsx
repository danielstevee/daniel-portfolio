import { useState, useEffect, useRef } from "react";
import iotData from "../data/iot.json";
import { resolveImg, resolveReport, getVideoSource } from "../utils/media";

function IoT() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const galleryRef = useRef(null);

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
    <section id="iot" className="bg-[#f5f0eb] py-24 md:py-32">
      <div className="site-container">
        <div className="mb-12 text-center md:mb-16">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-[#c4a882]">
            Proyek
          </span>
          <h1 className="mb-4 font-heading text-4xl font-bold md:text-5xl">Proyek IoT</h1>
          <p className="mx-auto max-w-xl text-base text-[#888888]">
            Kumpulan sistem IoT yang saya bangun, mulai dari sensor dan mikrokontroler hingga dashboard dan laporan.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {iotData.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-xl border border-[#e5e5e5] bg-white transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
            >
              <button
                onClick={() => openModal(item)}
                className="blog-img-wrap aspect-[16/10] w-full overflow-hidden"
              >
                <img
                  src={resolveImg(item.cover || item.images?.[0])}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
              </button>
              <div className="p-[25px]">
                <span className="mb-[10px] block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c4a882]">
                  Proyek IoT
                </span>
                <h3 className="mb-3 font-heading text-lg font-semibold leading-snug text-[#1a1a1a]">
                  {item.title}
                </h3>
                <p className="mb-5 text-sm leading-[1.7] text-[#888888]">{item.desc}</p>
                <button
                  onClick={() => openModal(item)}
                  className="read-more inline-flex items-center gap-2 text-[13px] font-semibold text-[#1a1a1a] transition-all duration-300 hover:gap-3 hover:text-[#c4a882]"
                >
                  Selengkapnya <i className="bi bi-arrow-right text-xs"></i>
                </button>
              </div>
            </div>
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
              <div>
                {selectedProject.video && showVideo ? (
                  <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
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
                  <div className="aspect-video w-full overflow-hidden rounded-xl">
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
                          className={`relative aspect-video w-[calc((100%-2rem)/5)] flex-shrink-0 overflow-hidden rounded-lg border transition ${
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
                            className={`aspect-video w-[calc((100%-2rem)/5)] flex-shrink-0 overflow-hidden rounded-lg border transition ${
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
                  Proyek IoT
                </span>
                <h3 className="mb-4 font-heading text-2xl font-bold md:text-3xl">
                  {selectedProject.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-[#666666] md:text-base">
                  {selectedProject.longDesc || selectedProject.desc}
                </p>
                {selectedProject.tech && selectedProject.tech.length > 0 && (
                  <div className="mb-6">
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#888888]">
                      Alat / Teknologi
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="rounded-full border border-[#e5e5e5] px-3 py-1 text-xs text-[#1a1a1a]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap gap-3">
                  {selectedProject.repo && (
                    <a
                      href={selectedProject.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] px-5 py-2 text-sm text-white transition hover:opacity-90"
                    >
                      Selengkapnya <i className="bi bi-arrow-up-right"></i>
                    </a>
                  )}
                  {selectedProject.report && (
                    <a
                      href={resolveReport(selectedProject.report)}
                      download
                      className="inline-flex items-center gap-2 rounded-full border border-[#e5e5e5] px-5 py-2 text-sm text-[#1a1a1a] transition hover:bg-[#f5f5f5]"
                    >
                      Unduh Laporan <i className="bi bi-file-earmark-pdf"></i>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default IoT;
