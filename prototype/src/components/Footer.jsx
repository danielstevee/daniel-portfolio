import logo from "../assets/images/Group.png";

function Footer() {
  return (
    <footer className="bg-[#1a1a1a] py-12 text-center">
      <div className="site-container">
        <div className="mb-5 flex items-center justify-center gap-3">
          <img src={logo} alt="Logo" width="30" height="30" />
          <span className="font-heading text-lg font-semibold text-white">Daniel Steven Setyawan</span>
        </div>
        <p className="mb-6 text-sm text-white/50">Menciptakan pengalaman digital dengan semangat dan ketelitian.</p>
        <div className="mb-8 flex justify-center gap-4">
          <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:border-white hover:bg-white hover:text-[#1a1a1a]">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:border-white hover:bg-white hover:text-[#1a1a1a]">
            <i className="bi bi-twitter-x"></i>
          </a>
          <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:border-white hover:bg-white hover:text-[#1a1a1a]">
            <i className="bi bi-youtube"></i>
          </a>
          <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:border-white hover:bg-white hover:text-[#1a1a1a]">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:border-white hover:bg-white hover:text-[#1a1a1a]">
            <i className="bi bi-linkedin"></i>
          </a>
        </div>
        <p className="text-xs tracking-wide text-white/30">&copy; 2024 Daniel Steven Setyawan. Hak cipta dilindungi.</p>
      </div>
    </footer>
  );
}

export default Footer;
