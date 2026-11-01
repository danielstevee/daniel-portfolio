import { useState } from "react";

const WHATSAPP_NUMBER = "6282139419010";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [note, setNote] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const buildText = () =>
    `Nama: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildText())}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setNote("Membuka WhatsApp...");
  };

  return (
    <section id="contact" className="bg-white py-24 md:py-32">
      <div className="site-container">
        <div className="mb-12 text-center md:mb-16">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-[#c4a882]">
            Hubungi Saya
          </span>
          <h1 className="mb-4 font-heading text-4xl font-bold md:text-5xl">Mari Bekerja Sama</h1>
          <p className="mx-auto max-w-xl text-base text-[#888888]">
            Punya proyek dalam pikiran? Mari ciptakan sesuatu yang luar biasa bersama.
          </p>
        </div>

        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-[#e5e5e5]">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
            <div className="bg-white p-6 md:p-10 lg:p-12">
              <h2 className="mb-8 font-heading text-2xl font-bold md:text-3xl">Kirim Pesan</h2>
              <form className="space-y-6" onSubmit={handleWhatsApp}>
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm text-[#888888]">
                    Nama
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#e5e5e5] px-4 py-3 text-sm transition-all focus:border-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/5"
                    placeholder="Nama Depan & Nama Belakang"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm text-[#888888]">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#e5e5e5] px-4 py-3 text-sm transition-all focus:border-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/5"
                    placeholder="Email Anda"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-2 block text-sm text-[#888888]">
                    Pesan
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#e5e5e5] px-4 py-3 text-sm transition-all focus:border-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/5"
                    placeholder="Ada yang bisa saya bantu?"
                  ></textarea>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="rounded-full bg-[#1a1a1a] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-transparent hover:text-[#1a1a1a] hover:ring-1 hover:ring-[#1a1a1a]"
                  >
                    Kirim via WhatsApp
                  </button>
                </div>
                {note && <p className="text-xs text-[#888888]">{note}</p>}
              </form>
            </div>
            <div className="bg-[#1a1a1a] p-6 text-white md:p-10 lg:p-12">
              <h4 className="mb-6 font-heading text-xl font-bold">Info Kontak</h4>
              <p className="mb-2 flex items-center gap-2 text-sm text-white/80">
                <i className="bi bi-telephone-fill"></i> +62 (821) 3941-9010
              </p>
              <p className="mb-6 flex items-center gap-2 text-sm text-white/80">
                <i className="bi bi-envelope-fill"></i> danielstevee1208@gmail.com
              </p>
              <div className="flex gap-4 text-xl">
                <a href="#" className="text-white/50 transition-colors hover:text-white">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="text-white/50 transition-colors hover:text-white">
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a href="#" className="text-white/50 transition-colors hover:text-white">
                  <i className="bi bi-youtube"></i>
                </a>
                <a href="#" className="text-white/50 transition-colors hover:text-white">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="text-white/50 transition-colors hover:text-white">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
