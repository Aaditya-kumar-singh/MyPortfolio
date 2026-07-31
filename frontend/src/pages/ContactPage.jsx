import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Send,
  MapPin,
  Phone,
  MessageCircle,
  ExternalLink,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { gsap } from "gsap";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactRef = useRef(null);
  const formRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(contactRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  useEffect(() => {
    // GSAP animations for contact cards
    gsap.fromTo(
      ".contact-card",
      {
        y: 50,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        delay: 0.3,
      }
    );

    // Form animation
    gsap.fromTo(
      ".form-field",
      {
        x: 30,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.1,
        delay: 0.5,
      }
    );
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setFormData({ email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus(""), 5000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "kumaraaditya324@gmail.com",
      link: "mailto:kumaraaditya324@gmail.com",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "aadityakumar1",
      link: "https://www.linkedin.com/in/aadityakumar1",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Github,
      title: "GitHub",
      value: "Aaditya-kumar-singh",
      link: "https://github.com/Aaditya-kumar-singh",
      color: "from-gray-600 to-gray-800",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "India",
      link: null,
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div
      ref={contactRef}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-sm font-medium backdrop-blur-sm mb-6"
          >
            <MessageCircle size={16} className="mr-2" />
            Let's start a conversation
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Get In <span className="gradient-text">Touch</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Ready to bring your ideas to life? Let's discuss your next project
            and create something amazing together.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold text-white mb-6">
                Let's Connect
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                I'm always excited to discuss new opportunities, innovative
                projects, or simply chat about the latest in technology and
                development. Whether you have a project in mind or just want to
                say hello, I'd love to hear from you!
              </p>
            </motion.div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map(
                ({ icon: Icon, title, value, link, color }, index) => (
                  <motion.div
                    key={title}
                    className="contact-card group"
                    variants={itemVariants}
                  >
                    {link ? (
                      <motion.a
                        href={link}
                        target={link.startsWith("http") ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className="flex items-center p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl hover:border-orange-500/50 transition-all duration-300 group"
                        whileHover={{ scale: 1.02, x: 5 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <div
                          className={`w-14 h-14 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center mr-4 group-hover:shadow-glow transition-all duration-300`}
                        >
                          <Icon size={24} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-semibold mb-1">
                            {title}
                          </p>
                          <p className="text-gray-400 group-hover:text-orange-400 transition-colors">
                            {value}
                          </p>
                        </div>
                        <ExternalLink
                          size={16}
                          className="text-gray-500 group-hover:text-orange-400 transition-colors"
                        />
                      </motion.a>
                    ) : (
                      <div className="flex items-center p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl">
                        <div
                          className={`w-14 h-14 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center mr-4`}
                        >
                          <Icon size={24} className="text-white" />
                        </div>
                        <div>
                          <p className="text-white font-semibold mb-1">
                            {title}
                          </p>
                          <p className="text-gray-400">{value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )
              )}
            </div>

            {/* Quick Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 pt-8"
            >
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-orange-400 mb-1">
                  24h
                </div>
                <div className="text-sm text-gray-400">Response Time</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-orange-400 mb-1">
                  100%
                </div>
                <div className="text-sm text-gray-400">Client Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            ref={formRef}
            variants={itemVariants}
            initial="hidden"
            animate={controls}
            className="relative"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 pointer-events-none" />

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="form-field">
                  <label className="block text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                    Email Address
                  </label>
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                    placeholder="your.email@example.com"
                    required
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  />
                </div>

                <div className="form-field">
                  <label className="block text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                    Subject
                  </label>
                  <motion.input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                    placeholder="What's this about?"
                    required
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  />
                </div>

                <div className="form-field">
                  <label className="block text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                    Message
                  </label>
                  <motion.textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project, ideas, or just say hello..."
                    required
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 rounded-xl font-semibold shadow-glow hover:shadow-glow-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>

                {/* Status Messages */}
                {status && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center space-x-2 p-4 rounded-xl ${
                      status === "success"
                        ? "bg-green-500/10 border border-green-500/20 text-green-400"
                        : "bg-red-500/10 border border-red-500/20 text-red-400"
                    }`}
                  >
                    {status === "success" ? (
                      <>
                        <CheckCircle size={20} />
                        <span>
                          Message sent successfully! I'll get back to you soon.
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertCircle size={20} />
                        <span>
                          Failed to send message. Please try again or contact me
                          directly.
                        </span>
                      </>
                    )}
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={controls}
          className="text-center mt-16"
        >
          <motion.p className="text-gray-400 mb-6" variants={itemVariants}>
            Prefer a different way to connect? Find me on social media or check
            out my work.
          </motion.p>

          <motion.div
            className="flex justify-center space-x-4"
            variants={itemVariants}
          >
            {[
              {
                icon: Github,
                href: "https://github.com/Aaditya-kumar-singh",
                label: "GitHub",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/aadityakumar1",
                label: "LinkedIn",
              },
              {
                icon: Mail,
                href: "mailto:kumaraaditya324@gmail.com",
                label: "Email",
              },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? "_self" : "_blank"}
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full flex items-center justify-center text-gray-400 hover:text-orange-400 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={20} />
                <span className="sr-only">{label}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
