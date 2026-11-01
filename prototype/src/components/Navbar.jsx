import { useState, useEffect } from "react";
import logo from "../assets/images/Group.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  const navLinks = [
    { label: "Beranda", href: "#Home" },
    { label: "Tentang", href: "#about" },
    { label: "Portofolio", href: "#portfolio" },
    { label: "Proyek IoT", href: "#iot" },
  ];

  useEffect(() => {
    const sections = navLinks.map((link) => link.href.slice(1));

    const handleScroll = () => {
      const offset = 120;
      let current = sections[0];
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= window.scrollY + offset) current = id;
      });
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm">
      <div className="site-container relative flex items-center justify-between py-4">
        {/* BRAND / LOGO */}
        <a href="#Home" className="flex shrink-0 items-center gap-2 font-bold">
          <img
            src={logo}
            alt="Logo"
            width="30"
            height="30"
            className="inline-block object-contain"
          />
          <span className="text-xl">Niell.</span>
        </a>

        {/* TOMBOL HAMBURGER MOBILE */}
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 border-0 bg-transparent lg:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-controls="navbar-menu"
          aria-expanded={isMenuOpen}
          aria-label="Buka atau tutup navigasi"
        >
          <span className="h-0.5 w-6 bg-black" />
          <span className="h-0.5 w-6 bg-black" />
          <span className="h-0.5 w-6 bg-black" />
        </button>

        {/* MENU NAVIGASI */}
        <div
          id="navbar-menu"
          className={`
            ${isMenuOpen ? "flex" : "hidden"}
            absolute left-0 top-full max-h-[calc(100dvh-72px)] w-full
            flex-col overflow-y-auto overscroll-contain
            border-t border-stone-100 bg-white px-4 pb-5 pt-4
            shadow-md
            lg:static lg:ml-8 lg:flex lg:max-h-none lg:flex-1
            lg:flex-row lg:items-center lg:justify-between
            lg:overflow-visible lg:border-0 lg:bg-transparent
            lg:p-0 lg:shadow-none
          `}
        >
          {/* LINK NAVIGASI */}
          <div className="flex flex-col items-center gap-1 lg:mx-auto lg:flex-row lg:gap-0">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="relative block w-full rounded-md px-4 py-3 text-center text-sm font-medium transition-colors hover:bg-stone-100 hover:text-[#888888] lg:w-auto lg:py-2 lg:hover:bg-transparent"
              >
                {link.label}
                <span
                  className={`pointer-events-none absolute bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-[#c4a882] transition-all duration-300 lg:bottom-0 ${
                    activeSection === link.href.slice(1)
                      ? "w-6 opacity-100"
                      : "w-0 opacity-0"
                  }`}
                />
              </a>
            ))}
          </div>

        {/* TOMBOL CONTACT */}
        <div className="w-full lg:mt-0 lg:w-auto">
          <a
            href="#contact"
            onClick={() => setIsMenuOpen(false)}
            className="block w-full rounded-full border-2 border-transparent bg-stone-900 px-6 py-3 text-center text-sm font-semibold text-white transition-colors duration-300 hover:border-stone-900 hover:bg-white hover:text-stone-900 sm:py-2.5 lg:inline-block lg:w-auto"
          >
            Mari Bicara
          </a>
        </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
