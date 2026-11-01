
import danielImage from "../assets/images/daniel.png";
import cvFile from "../assets/reports/CV ATS-Daniel Steven Setyawan.pdf?url";

function Hero() {
  return (
    <section
      id="Home"
      className="main flex min-h-screen w-full items-center bg-white bg-no-repeat
      bg-[length:50%] bg-[position:95%_110%]
      max-[991px]:items-start max-[991px]:justify-center max-[991px]:bg-[length:90%] max-[991px]:bg-[position:center_bottom] max-[991px]:pt-[110px] max-[991px]:pb-[70px] max-[991px]:text-center"
      style={{ backgroundImage: `url(${danielImage})` }}
    >
      <div className="site-container">
        <div className="py-5">
          <div className="w-full py-5 lg:mr-auto lg:w-1/2 lg:text-left">
            <h1 className="font-heading text-4xl font-bold leading-tight text-stone-900 md:text-5xl max-[991px]:text-[36px] max-[991px]:[text-shadow:0_2px_10px_rgba(255,255,255,0.95)]">
              <small className="text-xl font-normal text-gray-500">
                Halo, saya 👋🏻
              </small>
              <br />
              Daniel Steven S.
            </h1>

            <h6 className="mt-3 text-base text-gray-500 max-[991px]:text-[15px] max-[991px]:[text-shadow:0_2px_10px_rgba(255,255,255,0.95)]">
            Full-Stack Developer | Desainer UI/UX 
            </h6>

            <div className="mt-4 flex flex-wrap gap-3 max-[991px]:flex-col">
              <a
                href="#contact"
                className="mt-4 inline-block rounded-full bg-stone-900 px-8 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-white hover:border-[#1a1a1a] hover:border hover:text-[#1a1a1a] max-[991px]:mt-3 max-[991px]:w-full"
              >
                Rekrut Saya
              </a>

              <a
                href={cvFile}
                download="CV ATS-Daniel Steven Setyawan.pdf"
                className="mt-4 inline-block rounded-full border border-[#1a1a1a] px-8 py-3 text-center text-sm font-medium text-[#1a1a1a] transition-colors hover:bg-[#1a1a1a] hover:text-white max-[991px]:mt-3 max-[991px]:w-full"
              >
                Unduh CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
