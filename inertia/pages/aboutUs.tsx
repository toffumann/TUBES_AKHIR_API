import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../css/about.css'

const AboutUsPage = () => {
  return (
    <div className="about-us-container">
      <Navbar />
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">AnoCode</h1>
          <h2 className="hero-subtitle">Sistem Layanan Professional untuk Digitalisasi Bisnis</h2>
          <p className="hero-description">
            Kami menghadirkan solusi lengkap untuk kebutuhan digital bisnis Anda, dari desain hingga
            pengembangan web dan maintenance server.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Dapatkan Akses Gratis</button>
            <button className="btn btn-secondary">Jelajahi Layanan</button>
          </div>
        </div>
      </section>

      {/* About Anocode Section */}
      <section className="about-section">
        <div className="about-content">
          <h2 className="section-title">Tentang AnoCode</h2>
          <div className="about-paragraphs">
            <p>
              AnoCode didirikan dengan visi untuk membantu bisnis UMKM hingga perusahaan besar dalam
              menghadapi era digitalisasi. Kami memahami bahwa setiap bisnis memiliki kebutuhan yang
              unik, oleh karena itu kami menawarkan solusi yang disesuaikan dengan tujuan dan
              anggaran Anda.
            </p>

            <p>
              Dengan tim yang terdiri dari developer, designer, dan IT specialist yang
              berpengalaman, kami telah menyelesaikan ratusan proyek digital dengan sukses. Fokus
              kami adalah memberikan hasil yang tidak hanya estetik tetapi juga fungsional dan
              berdampak positif bagi pertumbuhan bisnis klien.
            </p>

            <p>
              Kami percaya bahwa teknologi yang tepat dapat mengoptimalkan operasional bisnis,
              meningkatkan engagement dengan pelanggan, dan membuka peluang pasar baru. Melalui
              layanan kami, kami berkomitmen untuk menjadi mitra jangka panjang dalam perjalanan
              digital bisnis Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Completed Projects Section */}
      <section className="projects-section">
        <div className="projects-container">
          <h2 className="section-title">Project yang Sudah Selesai</h2>
          <p className="section-subtitle">
            Hasil kolaborasi desainer dan klien melalui platform kami
          </p>

          {/* Project Categories */}
          <div className="categories-row">
            <div className="category active">Branding</div>
            <div className="category">UI/UX Design</div>
            <div className="category">Web Design</div>
            <div className="category">Social Media</div>
            <div className="category">Packaging</div>
            <div className="category">Illustration</div>
          </div>

          {/* Projects Grid */}
          <div className="projects-grid">
            {/* Project 1 */}
            <div className="project-card">
              <div className="project-badge">Brand Identity</div>
              <h3 className="project-title">Kopi Kenangan</h3>
              <p className="project-description">
                Logo, packaging, dan brand guideline untuk kedai kopi lokal
              </p>

              <div className="project-info">
                <div className="info-item">
                  <span className="info-label">Desainer</span>
                  <span className="info-value">Aceng</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Proses</span>
                  <span className="info-value">2 minggu</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Revisi</span>
                  <span className="info-value">3x</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Selesai</span>
                  <span className="info-value">Jan 2024</span>
                </div>
              </div>

              <div className="project-tags">
                <span className="tag">Logo Design</span>
                <span className="tag">Packaging</span>
                <span className="tag">Brand Guidelines</span>
              </div>
            </div>

            {/* Project 2 */}
            <div className="project-card">
              <div className="project-badge">UI/UX Design</div>
              <h3 className="project-title">Mobile App - Fintech</h3>
              <p className="project-description">
                Dashboard mobile banking dengan user experience yang intuitif
              </p>

              <div className="project-info">
                <div className="info-item">
                  <span className="info-label">Desainer</span>
                  <span className="info-value">Muhammad</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Proses</span>
                  <span className="info-value">2 minggu</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Revisi</span>
                  <span className="info-value">3x</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Selesai</span>
                  <span className="info-value">Des 2023</span>
                </div>
              </div>

              <div className="project-tags">
                <span className="tag">Mobile App</span>
                <span className="tag">Dashboard</span>
                <span className="tag">Fintech</span>
              </div>
            </div>

            {/* Project 3 */}
            <div className="project-card">
              <div className="project-badge">Social Media</div>
              <h3 className="project-title">Beauty Brand Kit</h3>
              <p className="project-description">
                Template Instagram feed, story, dan campaign visual
              </p>

              <div className="project-info">
                <div className="info-item">
                  <span className="info-label">Desainer</span>
                  <span className="info-value">Alfin Pratama</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Proses</span>
                  <span className="info-value">2 minggu</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Revisi</span>
                  <span className="info-value">3x</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Selesai</span>
                  <span className="info-value">Nov 2023</span>
                </div>
              </div>

              <div className="project-tags">
                <span className="tag">Instagram</span>
                <span className="tag">Social Media</span>
                <span className="tag">Brand Kit</span>
              </div>
            </div>

            {/* Project 4 */}
            <div className="project-card">
              <div className="project-badge">Web Design</div>
              <h3 className="project-title">E-commerce Fashion</h3>
              <p className="project-description">
                Website e-commerce fashion lokal dengan UI modern dan responsif
              </p>

              <div className="project-info">
                <div className="info-item">
                  <span className="info-label">Desainer</span>
                  <span className="info-value">Jahes Haikal</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Proses</span>
                  <span className="info-value">3 minggu</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Revisi</span>
                  <span className="info-value">4x</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Selesai</span>
                  <span className="info-value">Feb 2024</span>
                </div>
              </div>

              <div className="project-tags">
                <span className="tag">E-commerce</span>
                <span className="tag">Responsive</span>
                <span className="tag">UI Design</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Siap Mengubah Proses Digital Bisnis Anda?</h2>
          <p>
            Bergabung dengan ratusan klien yang telah mempercayakan proyek digital mereka kepada
            kami.
          </p>
          <button className="btn btn-primary btn-large">Mulai Sekarang</button>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default AboutUsPage
