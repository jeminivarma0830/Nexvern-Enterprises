import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Code,
  Cloud,
  Smartphone,
  Shield,
  Brain,
  Zap,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  Cpu,
  Wifi,
  Camera,
  Navigation as NavIcon,
  Users,
  Lightbulb,
  Briefcase
} from 'lucide-react'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const PREMIUM_EASING = [0.16, 1, 0.3, 1]

// Mask Reveal Component
const MaskReveal = ({ children, delay = 0, duration = 1.2 }) => (
  <div style={{ overflow: 'hidden', position: 'relative' }}>
    <motion.div
      initial={{ y: '100%' }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay, duration, ease: PREMIUM_EASING }}
    >
      {children}
    </motion.div>
  </div>
)

// Logo Component
const Logo = ({ size = 60, className = '' }) => (
  <img
    src="/NVlogo.png"
    alt="Nexvern Enterprise Logo"
    className={className}
    style={{
      width: size,
      height: size,
      maxWidth: '100%',
      objectFit: 'contain',
      display: 'inline-block',
      verticalAlign: 'middle'
    }}
  />
)

// Navigation Component
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = ['Home', 'Services', 'About', 'Technologies', 'Contact']

  return (
    <div className="nav-wrapper">
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="nav-logo">
          <Logo size={40} />
          <span className="gradient-text">NEXVERN TECHNOLOGIES PVT. LTD.</span>
        </a>

        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`}>{item}</a>
            </li>
          ))}
        </ul>

        <button className="mobile-menu-btn" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              position: 'fixed',
              top: '80px',
              left: 0,
              right: 0,
              background: 'rgba(255, 255, 255, 0.98)',
              padding: '2rem',
              zIndex: 999,
              borderBottom: '1px solid var(--border-light)'
            }}
          >
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileOpen(false)}
                    style={{ color: 'var(--text-main)', textDecoration: 'none', fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '2px' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className="btn btn-primary" style={{ display: 'inline-flex' }}>
                  Get Started
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Hero Section
const Hero = () => {
  const { scrollY } = useScroll()
  const y2 = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section id="home" className="hero">
      <motion.div
        className="hero-content"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: PREMIUM_EASING }}
          className="hero-badge"
        >
          <span className="pulse-dot" />
          <span>Smart Solutions. Real Impact</span>
          <span className="pulse-dot" />
        </motion.div>

        <motion.div 
          className="hero-main-logo"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 1, ease: PREMIUM_EASING }}
        >
          <Logo size={250} className="hero-center-logo" />
        </motion.div>

        <div className="hero-title-container">
          <MaskReveal delay={0.2}>
            <h1 style={{ marginBottom: 0 }}>Nexvern Technologies Pvt. Ltd.</h1>
          </MaskReveal>
          {/* <MaskReveal delay={0.2}> */}
            <span className="hero-subtitle-top">
              Multidisciplinary Technology & Innovation
            </span>
          {/* </MaskReveal> */}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: PREMIUM_EASING }}
          className="hero-subtitle"
        >
          Delivering end-to-end digital and hardware solutions tailored for industry, government, and institutional clients.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, ease: PREMIUM_EASING }}
          className="hero-buttons"
        >
          <a href="#contact" className="btn btn-primary">
            Start Your Project
            <ChevronRight size={20} />
          </a>
          <a href="#services" className="btn btn-outline">
            Explore Services
          </a>
        </motion.div>
      </motion.div>

    </section>
  )
}

// Services Section
const Services = () => {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const cards = sectionRef.current.querySelectorAll('.service-card')
    gsap.from(cards, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    })
  }, { scope: sectionRef })

  const services = [
    {
      icon: <Code size={32} />,
      title: 'Software & Web Development',
      description: 'Custom websites, enterprise software, mobile applications, ERP/CRM systems, and automation platforms.'
    },
    {
      icon: <Cpu size={32} />,
      title: 'Hardware & Embedded Systems',
      description: 'Design and development of electronic systems, PCB prototyping, and embedded solutions.'
    },
    {
      icon: <Wifi size={32} />,
      title: 'IoT & Smart Technologies',
      description: 'Smart sensors, real-time monitoring systems, industrial automation, and smart city solutions.'
    },
    {
      icon: <Camera size={32} />,
      title: 'CCTV & Surveillance Systems',
      description: 'Professional installation, maintenance, and AI-enabled intelligent security systems for complete safety.'
    },
    {
      icon: <NavIcon size={32} />,
      title: 'Road Safety & Smart Infrastructure',
      description: 'Intelligent traffic systems, accident detection technologies, and innovative public safety solutions.'
    },
    {
      icon: <Users size={32} />,
      title: 'Technical Manpower & Services',
      description: 'Skilled workforce deployment, IT support services, and specialized project-based technical staffing.'
    },
    {
      icon: <Lightbulb size={32} />,
      title: 'Innovation & Research',
      description: 'End-to-end product development, academic collaboration, and R&D in emerging technologies.'
    },
    {
      icon: <Briefcase size={32} />,
      title: 'Consultancy & Digital Transformation',
      description: 'Strategic IT consulting, system architecture, and seamless implementation of technology-driven solutions.'
    },
    {
      icon: <Shield size={32} />,
      title: 'Cybersecurity Solutions',
      description: 'Advanced protection for your digital assets, ensuring data integrity and robust security layers.'
    }
  ]

  return (
    <section id="services" className="section section-light-alt" ref={sectionRef}>
      <div className="section-header">
        <MaskReveal>
          <span className="section-tag">Our Services</span>
        </MaskReveal>
        <MaskReveal delay={0.2}>
          <h2 className="section-title">
            <span className="gradient-text">Multidisciplinary</span> Solutions
          </h2>
        </MaskReveal>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="service-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 1,
              ease: PREMIUM_EASING
            }}
            viewport={{ once: true }}
          >
            <div className="service-card-content">
              <div className="service-icon">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// About Section
const About = () => {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.from('.about-image', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
      x: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    })

    gsap.from('.about-content', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
      x: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    })
  }, { scope: sectionRef })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const opacityText = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scaleImage = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])

  return (
    <section id="about" className="section" ref={sectionRef}>
      <div className="about">
        <motion.div
          className="about-image"
          style={{ scale: scaleImage }}
        >
          <motion.div
            className="about-curtain"
            initial={{ width: '100%' }}
            whileInView={{ width: 0 }}
            transition={{ duration: 1.2, ease: PREMIUM_EASING }}
            viewport={{ once: true }}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              height: '100%',
              background: 'var(--bg-lighter)',
              zIndex: 2
            }}
          />
          <div className="about-image-inner">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: PREMIUM_EASING }}
              viewport={{ once: true }}
            >
              <Logo size={1000} className="about-center-logo" />
            </motion.div>
          </div>
        </motion.div>

        <div
          className="about-content"
          style={{ opacity: opacityText }}
        >
          <MaskReveal>
            <span className="section-tag">About Us</span>
          </MaskReveal>
          <MaskReveal delay={0.2}>
            <h3>
              Pioneering <span className="gradient-text">Technology Excellence</span>
            </h3>
          </MaskReveal>
          <p>
            Nexvern Technologies Pvt. Ltd. is a multidisciplinary technology and innovation-driven firm specializing in the development, integration, and deployment of advanced digital and hardware solutions.
          </p>
          <p>
            The company operates at the intersection of software, hardware, IoT, and smart infrastructure, delivering end-to-end solutions tailored for industry, government, and institutional clients.
          </p>
        </div>
      </div>
    </section>
  )
}

// Technologies Marquee
const Technologies = () => {
  const technologies = [
    { name: 'React', icon: '⚛️' },
    { name: 'Node.js', icon: '📦' },
    { name: 'Python', icon: '🐍' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Docker', icon: '🐳' },
    { name: 'Kubernetes', icon: '⚓' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'GraphQL', icon: '◈' },
    { name: 'TensorFlow', icon: '🧠' },
    { name: 'Flutter', icon: '📱' },
    { name: 'Next.js', icon: '▲' },
  ]

  return (
    <section id="technologies" className="section">
      <div className="section-header">
        <span className="section-tag">Technologies</span>
        <h2 className="section-title">
          Powered by <span className="gradient-text-2">Modern Stack</span>
        </h2>
      </div>

      <div className="tech-marquee">
        <div className="tech-track">
          {[...technologies, ...technologies].map((tech, index) => (
            <motion.div
              key={index}
              className="tech-item"
              whileHover={{ scale: 1.05 }}
            >
              <div className="tech-item-icon">{tech.icon}</div>
              <span>{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Section
const Contact = () => {
  const sectionRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted')
  }

  return (
    <section id="contact" className="section contact" ref={sectionRef}>
      <div className="section-header">
        <span className="section-tag">Contact Us</span>
        <h2 className="section-title">
          Let's Build <span className="gradient-text">Together</span>
        </h2>
        <p className="section-subtitle">
          Ready to start your next project? Get in touch with us today.
        </p>
      </div>

      <div className="contact-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <motion.div
            className="form-group"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <input
              type="text"
              className="form-input"
              placeholder="Your Name"
              required
            />
          </motion.div>

          <motion.div
            className="form-group"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <input
              type="email"
              className="form-input"
              placeholder="Your Email"
              required
            />
          </motion.div>

          <motion.div
            className="form-group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <input
              type="text"
              className="form-input"
              placeholder="Subject"
            />
          </motion.div>

          <motion.div
            className="form-group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <textarea
              className="form-input"
              placeholder="Your Message"
              required
            />
          </motion.div>

          <motion.button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Send Message
            <Mail size={20} />
          </motion.button>
        </form>
      </div>
    </section>
  )
}

// Footer
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <a href="#" className="nav-logo">
            <Logo size={40} />
            <span className="gradient-text">NEXVERN</span>
          </a>
          <p>
            Empowering businesses through innovative technology solutions.
            Your partner in digital transformation.
          </p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Services</h4>
          <ul>
            <li><a href="#services">Software Development</a></li>
            <li><a href="#services">Robotics</a></li>
            <li><a href="#services">IOT</a></li>
            <li><a href="#services">Cloud Solutions</a></li>
            <li><a href="#services">Mobile Apps</a></li>
            <li><a href="#services">AI & ML</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Contact</h4>
          <ul>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <Mail size={16} />
              nexverntech@gmail.com
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <Phone size={16} />
              +91 9820296320
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <MapPin size={16} />
              Kalyan, Maharashtra
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Nexvern Technologies Pvt. Ltd.. All rights reserved.</p>
      </div>
    </footer>
  )
}

// Main App Component
function App() {
  return (
    <div className="app">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        <Hero />
        <Services />
        <About />
        <Technologies />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
