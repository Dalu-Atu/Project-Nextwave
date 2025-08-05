import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Moon,
  Sun,
  ArrowRight,
  Code,
  Smartphone,
  Brain,
  Palette,
  Cloud,
  Users,
  Award,
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  MessageCircle,
  ArrowUp,
  Play,
  CheckCircle,
  Target,
  TrendingUp,
  Zap,
  Shield,
  Globe,
  Database,
} from "lucide-react";

const NextGenTechSolutions = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");
  const [jobFilters, setJobFilters] = useState({
    role: "all",
    location: "all",
  });

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const industriesRef = useRef(null);
  const caseStudiesRef = useRef(null);
  const testimonialsRef = useRef(null);
  const careersRef = useRef(null);
  const blogRef = useRef(null);
  const contactRef = useRef(null);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      // Update active section
      const sections = [
        { name: "home", ref: heroRef },
        { name: "about", ref: aboutRef },
        { name: "services", ref: servicesRef },
        { name: "industries", ref: industriesRef },
        { name: "case-studies", ref: caseStudiesRef },
        { name: "careers", ref: careersRef },
        { name: "blog", ref: blogRef },
        { name: "contact", ref: contactRef },
      ];

      const currentScroll = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (
          sections[i].ref.current &&
          sections[i].ref.current.offsetTop <= currentScroll
        ) {
          setCurrentSection(sections[i].name);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Web & Mobile App Development",
      description:
        "Custom web applications and mobile apps built with cutting-edge technologies for maximum performance and user experience.",
      technologies: ["React", "React Native", "Node.js", "Flutter"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "SaaS Products",
      description:
        "Scalable Software-as-a-Service solutions designed to grow with your business and deliver consistent value to users.",
      technologies: ["AWS", "Microservices", "Docker", "Kubernetes"],
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI/ML Solutions",
      description:
        "Intelligent automation and machine learning solutions that transform data into actionable insights and competitive advantages.",
      technologies: ["TensorFlow", "PyTorch", "Python", "OpenAI"],
      color: "from-green-500 to-teal-500",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "UI/UX Design",
      description:
        "User-centered design that creates intuitive interfaces and exceptional user experiences across all touchpoints.",
      technologies: ["Figma", "Adobe XD", "Sketch", "Framer"],
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "DevOps & Cloud Infrastructure",
      description:
        "Robust cloud infrastructure and DevOps practices that ensure scalability, security, and continuous deployment.",
      technologies: ["AWS", "Azure", "GCP", "Terraform"],
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Cybersecurity Solutions",
      description:
        "Comprehensive security frameworks and protocols to protect your digital assets and ensure compliance.",
      technologies: ["OWASP", "Penetration Testing", "SOC", "GDPR"],
      color: "from-gray-700 to-gray-900",
    },
  ];

  const industries = [
    {
      name: "Healthcare",
      icon: "🏥",
      description:
        "HIPAA-compliant solutions for medical practices and health tech startups",
      image: "bg-gradient-to-br from-red-100 to-pink-100",
    },
    {
      name: "FinTech",
      icon: "💰",
      description:
        "Secure financial applications with advanced encryption and compliance",
      image: "bg-gradient-to-br from-green-100 to-emerald-100",
    },
    {
      name: "E-Commerce",
      icon: "🛒",
      description: "Scalable online marketplaces and retail management systems",
      image: "bg-gradient-to-br from-blue-100 to-cyan-100",
    },
    {
      name: "Real Estate",
      icon: "🏠",
      description: "Property management and real estate marketplace solutions",
      image: "bg-gradient-to-br from-orange-100 to-yellow-100",
    },
    {
      name: "Education",
      icon: "📚",
      description:
        "Learning management systems and educational technology platforms",
      image: "bg-gradient-to-br from-purple-100 to-indigo-100",
    },
    {
      name: "Logistics",
      icon: "🚚",
      description: "Supply chain optimization and fleet management solutions",
      image: "bg-gradient-to-br from-gray-100 to-slate-100",
    },
  ];

  const caseStudies = [
    {
      title: "HealthConnect Pro",
      client: "MedTech Innovations",
      problem:
        "Fragmented patient data across multiple systems leading to inefficient care coordination",
      solution:
        "Developed a unified patient management platform with real-time data synchronization and AI-powered insights",
      result:
        "40% reduction in patient wait times, 60% improvement in care coordination efficiency",
      technologies: ["React", "Node.js", "MongoDB", "AWS", "Machine Learning"],
      metrics: { users: "10K+", uptime: "99.9%", satisfaction: "4.8/5" },
      image: "bg-gradient-to-br from-red-500 to-pink-500",
    },
    {
      title: "FinanceFlow Suite",
      client: "NextGen Banking",
      problem:
        "Legacy banking systems unable to handle modern digital banking requirements",
      solution:
        "Built a complete digital banking platform with mobile-first approach and advanced security",
      result:
        "300% increase in digital transactions, 50% reduction in operational costs",
      technologies: [
        "React Native",
        "Python",
        "PostgreSQL",
        "Kubernetes",
        "Blockchain",
      ],
      metrics: { transactions: "1M+", security: "Bank-grade", growth: "300%" },
      image: "bg-gradient-to-br from-green-500 to-emerald-500",
    },
    {
      title: "EduLearn Platform",
      client: "Global Education Corp",
      problem:
        "Traditional learning methods failing to engage remote students effectively",
      solution:
        "Created an interactive learning platform with gamification and adaptive learning algorithms",
      result:
        "85% improvement in student engagement, 70% better completion rates",
      technologies: ["Vue.js", "Django", "Redis", "WebRTC", "TensorFlow"],
      metrics: { students: "50K+", engagement: "85%", completion: "92%" },
      image: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO, HealthTech Solutions",
      company: "HealthTech Solutions",
      quote:
        "NextGen Tech Solutions transformed our healthcare platform completely. Their expertise in both technology and healthcare compliance is unmatched.",
      rating: 5,
      avatar: "bg-gradient-to-br from-pink-400 to-red-400",
    },
    {
      name: "Michael Chen",
      role: "Founder, FinanceFlow",
      company: "FinanceFlow",
      quote:
        "The team delivered beyond our expectations. The platform they built handles millions of transactions flawlessly with bank-grade security.",
      rating: 5,
      avatar: "bg-gradient-to-br from-blue-400 to-cyan-400",
    },
    {
      name: "Emily Rodriguez",
      role: "VP Engineering, EduCorp",
      company: "EduCorp",
      quote:
        "Working with NextGen was a game-changer. They understood our vision and delivered a platform that our students absolutely love.",
      rating: 5,
      avatar: "bg-gradient-to-br from-green-400 to-teal-400",
    },
  ];

  const jobs = [
    {
      title: "Senior Full Stack Developer",
      location: "Remote",
      type: "Full-time",
      role: "engineering",
      department: "Engineering",
    },
    {
      title: "UI/UX Designer",
      location: "New York",
      type: "Full-time",
      role: "design",
      department: "Design",
    },
    {
      title: "DevOps Engineer",
      location: "San Francisco",
      type: "Full-time",
      role: "engineering",
      department: "Infrastructure",
    },
    {
      title: "Product Manager",
      location: "Remote",
      type: "Full-time",
      role: "product",
      department: "Product",
    },
    {
      title: "Data Scientist",
      location: "Boston",
      type: "Full-time",
      role: "data",
      department: "AI/ML",
    },
    {
      title: "Frontend Developer",
      location: "Austin",
      type: "Contract",
      role: "engineering",
      department: "Engineering",
    },
  ];

  const blogPosts = [
    {
      title: "The Future of AI in Software Development",
      excerpt:
        "Exploring how artificial intelligence is revolutionizing the way we build software and what it means for developers.",
      category: "AI",
      readTime: "5 min read",
      date: "May 15, 2025",
      image: "bg-gradient-to-br from-purple-500 to-pink-500",
    },
    {
      title: "Building Scalable Microservices Architecture",
      excerpt:
        "Best practices for designing and implementing microservices that can handle enterprise-level traffic and complexity.",
      category: "Architecture",
      readTime: "8 min read",
      date: "May 10, 2025",
      image: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
    {
      title: "Modern React Patterns for 2025",
      excerpt:
        "Latest React patterns and practices that every developer should know to build better applications.",
      category: "Web Dev",
      readTime: "6 min read",
      date: "May 8, 2025",
      image: "bg-gradient-to-br from-green-500 to-teal-500",
    },
  ];

  const filteredJobs = jobs.filter((job) => {
    const roleMatch = jobFilters.role === "all" || job.role === jobFilters.role;
    const locationMatch =
      jobFilters.location === "all" ||
      job.location.toLowerCase().includes(jobFilters.location.toLowerCase());
    return roleMatch && locationMatch;
  });

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isDarkMode ? "bg-gray-900/90" : "bg-white/90"
        } backdrop-blur-md border-b ${
          isDarkMode ? "border-gray-800" : "border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  NextGen Tech
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {[
                { name: "Home", ref: heroRef, key: "home" },
                { name: "About", ref: aboutRef, key: "about" },
                { name: "Services", ref: servicesRef, key: "services" },
                { name: "Industries", ref: industriesRef, key: "industries" },
                {
                  name: "Case Studies",
                  ref: caseStudiesRef,
                  key: "case-studies",
                },
                { name: "Careers", ref: careersRef, key: "careers" },
                { name: "Blog", ref: blogRef, key: "blog" },
                { name: "Contact", ref: contactRef, key: "contact" },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.ref)}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-blue-600 ${
                    currentSection === item.key
                      ? "text-blue-600"
                      : isDarkMode
                      ? "text-gray-300"
                      : "text-gray-700"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              {/* Dark mode toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isDarkMode
                    ? "bg-gray-800 text-yellow-400"
                    : "bg-gray-100 text-gray-600"
                } hover:scale-110 transform`}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {/* CTA Button */}
              <button className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
                <span>Request Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden transition-all duration-300 overflow-hidden ${
              isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="py-4 space-y-4">
              {[
                { name: "Home", ref: heroRef },
                { name: "About", ref: aboutRef },
                { name: "Services", ref: servicesRef },
                { name: "Industries", ref: industriesRef },
                { name: "Case Studies", ref: caseStudiesRef },
                { name: "Careers", ref: careersRef },
                { name: "Blog", ref: blogRef },
                { name: "Contact", ref: contactRef },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.ref)}
                  className="block w-full text-left px-4 py-2 text-sm font-medium hover:text-blue-600 transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
              <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 mt-4">
                <span>Request Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-16 min-h-screen flex items-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/20"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="block">We Build</span>
                  <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Scalable Software
                  </span>
                  <span className="block">That Drives Growth</span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                  Transform your business with cutting-edge technology
                  solutions. We create digital experiences that engage users,
                  drive conversions, and scale with your ambitions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection(contactRef)}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  <span>Lets Talk</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollToSection(caseStudiesRef)}
                  className="flex items-center justify-center space-x-2 border-2 border-gray-300 dark:border-gray-600 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
                >
                  <Play className="w-5 h-5" />
                  <span>Our Work</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                {[
                  { number: "100+", label: "Projects Delivered" },
                  { number: "50+", label: "Happy Clients" },
                  { number: "5+", label: "Years Experience" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl transform rotate-6 opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-8 p-8">
                    {[Code, Smartphone, Brain, Cloud].map((Icon, index) => (
                      <div
                        key={index}
                        className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300"
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                About NextGen Tech Solutions
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Were a team of passionate developers, designers, and strategists
              dedicated to transforming businesses through innovative technology
              solutions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold">Our Mission</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                To empower businesses with cutting-edge technology solutions
                that drive growth, enhance user experiences, and create lasting
                competitive advantages in the digital landscape.
              </p>

              <div className="space-y-4">
                {[
                  "Innovation-first approach to problem solving",
                  "Agile development with transparent communication",
                  "Focus on scalable and maintainable solutions",
                  "Commitment to quality and continuous improvement",
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                <h4 className="text-2xl font-bold mb-4">Our Values</h4>
                <div className="space-y-4">
                  {[
                    {
                      icon: <Target className="w-6 h-6" />,
                      title: "Excellence",
                      desc: "Delivering exceptional quality in every project",
                    },
                    {
                      icon: <Users className="w-6 h-6" />,
                      title: "Collaboration",
                      desc: "Working closely with clients as partners",
                    },
                    {
                      icon: <TrendingUp className="w-6 h-6" />,
                      title: "Growth",
                      desc: "Continuously learning and evolving",
                    },
                  ].map((value, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="bg-white/20 p-2 rounded-lg">
                        {value.icon}
                      </div>
                      <div>
                        <h5 className="font-semibold">{value.title}</h5>
                        <p className="text-sm opacity-90">{value.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-12">
              Meet Our Leadership Team
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Alex Johnson",
                  role: "CEO & Founder",
                  avatar: "bg-gradient-to-br from-blue-400 to-purple-500",
                },
                {
                  name: "Sarah Chen",
                  role: "CTO",
                  avatar: "bg-gradient-to-br from-green-400 to-teal-500",
                },
                {
                  name: "Michael Rodriguez",
                  role: "VP of Engineering",
                  avatar: "bg-gradient-to-br from-orange-400 to-red-500",
                },
              ].map((member, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div
                    className={`w-20 h-20 ${member.avatar} rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold`}
                  >
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h4 className="text-xl font-semibold">{member.name}</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Our Services
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive technology solutions tailored to your business
              needs, from concept to deployment and beyond.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 hover:border-transparent"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm rounded-full text-gray-700 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section
        ref={industriesRef}
        className="py-20 bg-gray-50 dark:bg-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Industries We Serve
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Deep expertise across diverse industries, bringing specialized
              knowledge and proven solutions to your unique challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div
                  className={`w-full h-32 ${industry.image} dark:bg-gradient-to-br dark:from-gray-700 dark:to-gray-800 rounded-lg mb-6 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-300`}
                >
                  {industry.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{industry.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {industry.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section ref={caseStudiesRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Success Stories
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Real results from real projects. See how weve helped businesses
              transform their operations and achieve their goals.
            </p>
          </div>

          <div className="relative">
            <div className="flex items-center justify-between mb-8">
              <div className="flex space-x-2">
                {caseStudies.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCaseStudy(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeCaseStudy === index
                        ? "bg-blue-600 w-8"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                ))}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    setActiveCaseStudy((prev) =>
                      prev === 0 ? caseStudies.length - 1 : prev - 1
                    )
                  }
                  className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setActiveCaseStudy(
                      (prev) => (prev + 1) % caseStudies.length
                    )
                  }
                  className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div
                  className={`${caseStudies[activeCaseStudy].image} h-64 lg:h-auto flex items-center justify-center text-white`}
                >
                  <div className="text-center">
                    <Globe className="w-16 h-16 mx-auto mb-4 opacity-80" />
                    <h3 className="text-2xl font-bold">
                      {caseStudies[activeCaseStudy].title}
                    </h3>
                  </div>
                </div>

                <div className="p-8 lg:p-12">
                  <div className="mb-6">
                    <span className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Client
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {caseStudies[activeCaseStudy].client}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-red-600 mb-2">
                        Problem
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {caseStudies[activeCaseStudy].problem}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-blue-600 mb-2">
                        Solution
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {caseStudies[activeCaseStudy].solution}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-green-600 mb-2">
                        Result
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {caseStudies[activeCaseStudy].result}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h5 className="font-semibold mb-3">Technologies Used</h5>
                    <div className="flex flex-wrap gap-2">
                      {caseStudies[activeCaseStudy].technologies.map(
                        (tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-4">
                    {Object.entries(caseStudies[activeCaseStudy].metrics).map(
                      ([key, value], index) => (
                        <div key={index} className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {value}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                            {key}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        ref={testimonialsRef}
        className="py-20 bg-gray-50 dark:bg-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                What Our Clients Say
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Dont just take our word for it. Heres what our clients have to say
              about working with NextGen Tech Solutions.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 md:p-12">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[activeTestimonial].rating)].map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="w-6 h-6 text-yellow-400 fill-current"
                      />
                    )
                  )}
                </div>

                <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 italic leading-relaxed">
                  {testimonials[activeTestimonial].quote}
                </blockquote>

                <div className="flex items-center justify-center space-x-4">
                  <div
                    className={`w-16 h-16 ${testimonials[activeTestimonial].avatar} rounded-full flex items-center justify-center text-white font-bold text-lg`}
                  >
                    {testimonials[activeTestimonial].name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-lg">
                      {testimonials[activeTestimonial].name}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {testimonials[activeTestimonial].role}
                    </div>
                    <div className="text-blue-600 text-sm">
                      {testimonials[activeTestimonial].company}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeTestimonial === index
                      ? "bg-blue-600 w-8"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section ref={careersRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Join Our Team
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Be part of a dynamic team thats shaping the future of technology.
              Were always looking for talented individuals who share our passion
              for innovation.
            </p>
          </div>

          {/* Job Filters */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <select
              value={jobFilters.role}
              onChange={(e) =>
                setJobFilters((prev) => ({ ...prev, role: e.target.value }))
              }
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300"
            >
              <option value="all">All Roles</option>
              <option value="engineering">Engineering</option>
              <option value="design">Design</option>
              <option value="product">Product</option>
              <option value="data">Data Science</option>
            </select>

            <select
              value={jobFilters.location}
              onChange={(e) =>
                setJobFilters((prev) => ({ ...prev, location: e.target.value }))
              }
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300"
            >
              <option value="all">All Locations</option>
              <option value="remote">Remote</option>
              <option value="new york">New York</option>
              <option value="san francisco">San Francisco</option>
              <option value="austin">Austin</option>
              <option value="boston">Boston</option>
            </select>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map((job, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{job.department}</span>
                      </div>
                    </div>
                  </div>
                  <button className="mt-4 md:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                No jobs found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Blog Section */}
      <section ref={blogRef} className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Latest Insights
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Stay updated with the latest trends, best practices, and insights
              from our team of experts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                <div
                  className={`h-48 ${post.image} flex items-center justify-center`}
                >
                  <div className="text-white text-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
                      <ExternalLink className="w-8 h-8" />
                    </div>
                    <span className="text-sm opacity-80">{post.category}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200 flex items-center space-x-1">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
              View All Posts
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Lets Build Something Amazing
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Ready to transform your business with cutting-edge technology? Get
              in touch and lets discuss your project.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="opacity-90">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="opacity-90">hello@nextgentech.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold">Office</p>
                      <p className="opacity-90">
                        123 Tech Street
                        <br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl h-64 flex items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p>Interactive Map</p>
                  <p className="text-sm">San Francisco Office</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">NextGen Tech</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Transforming businesses through innovative technology solutions.
                We build scalable software that drives growth and creates
                lasting impact.
              </p>
              <div className="flex space-x-4">
                <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                  <Linkedin className="w-5 h-5" />
                </button>
                <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                  <Github className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button className="hover:text-white transition-colors duration-200">
                    Web Development
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors duration-200">
                    Mobile Apps
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors duration-200">
                    AI/ML Solutions
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors duration-200">
                    UI/UX Design
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors duration-200">
                    Cloud Services
                  </button>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={() => scrollToSection(aboutRef)}
                    className="hover:text-white transition-colors duration-200"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection(careersRef)}
                    className="hover:text-white transition-colors duration-200"
                  >
                    Careers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection(blogRef)}
                    className="hover:text-white transition-colors duration-200"
                  >
                    Blog
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection(contactRef)}
                    className="hover:text-white transition-colors duration-200"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <button className="hover:text-white transition-colors duration-200">
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter for the latest tech insights and
                company updates.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                />
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 NextGen Tech Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform ${
          showBackToTop
            ? "translate-y-0 opacity-100"
            : "translate-y-16 opacity-0"
        } hover:scale-110 z-40`}
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
};
export default NextGenTechSolutions;
