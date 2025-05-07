const socialLinks = [
    { label: 'Instagram', icon: 'instagram', href: '#' },
    { label: 'Twitter', icon: 'twitter', href: '#' },
    { label: 'Facebook', icon: 'facebook', href: '#' },
    { label: 'LinkedIn', icon: 'linkedin', href: '#' },
  ];
  
  const footerLinks = [
    {
      title: 'Pelatihan',
      items: ['Semua Kelas', 'Kelas Private', 'Kelas Grup', 'Jadwal Kelas'],
    },
    {
      title: 'Perusahaan',
      items: ['Tentang Kami', 'Karir', 'Blog', 'Kontak'],
    },
    {
      title: 'Bantuan',
      items: ['FAQ', 'Syarat & Ketentuan', 'Kebijakan Privasi', 'Pusat Bantuan'],
    },
  ];
  
  const Footer = () => {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="border-t bg-white dark:bg-zinc-900 dark:border-zinc-800">
        <div className="container flex flex-col gap-8 py-12 md:py-16">
          <div className="flex flex-col gap-10 md:flex-row md:justify-between">
            <div className="space-y-4 max-w-sm">
              <div className="flex items-center gap-2">
                <span className="bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-2xl font-extrabold text-transparent dark:from-zinc-100 dark:to-zinc-400">
                  Slang<span className="text-zinc-500 dark:text-zinc-400">Tech</span>
                </span>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Platform pelatihan profesional terkemuka di Indonesia. Kami menyediakan kelas-kelas berkualitas tinggi
                untuk membantu Anda meningkatkan keterampilan dan karir.
              </p>
              <div className="flex gap-4">
                {socialLinks.map(({ label, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    aria-label={label}
                    className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
                  >
                    {/* Replace with SVG components or icons */}
                    <span className="h-5 w-5">{label[0]}</span>
                  </a>
                ))}
              </div>
            </div>
  
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:gap-16">
              {footerLinks.map(({ title, items }, i) => (
                <div key={i} className="space-y-4">
                  <h3 className="text-base font-medium text-zinc-900 dark:text-zinc-50">{title}</h3>
                  <ul className="space-y-3">
                    {items.map((item, idx) => (
                      <li key={idx}>
                        <a
                          href="#"
                          className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
  
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              © {currentYear} SlangTech. Hak Cipta Dilindungi.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
              >
                Syarat & Ketentuan
              </a>
              <a
                href="#"
                className="text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
              >
                Kebijakan Privasi
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  