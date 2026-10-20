import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useInView, useReducedMotion } from "framer-motion";
import { Github, Linkedin, Mail, Send, MapPin, MessageCircle, ExternalLink, CheckCircle, AlertCircle } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({ email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contactRef = useRef(null);
  const formRef = useRef(null);
  const controls = useAnimation();
  const reduceMotion = useReducedMotion();
  const isInView = useInView(contactRef, { once: true, margin: "-100px" });
  useEffect(() => { if (isInView || reduceMotion) controls.start("visible"); }, [controls, isInView, reduceMotion]);
  const containerVariants = { hidden: { opacity: reduceMotion ? 1 : 0 }, visible: { opacity: 1, transition: { delayChildren: reduceMotion ? 0 : 0.2, staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { y: reduceMotion ? 0 : 24, opacity: reduceMotion ? 1 : 0 }, visible: { y: 0, opacity: 1, transition: { duration: reduceMotion ? 0 : 0.55, ease: "easeOut" } } };
  const handleChange = (event) => setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true); setStatus("");
    try {
      const configuredApiUrl = import.meta.env.VITE_API_URL;
      if (import.meta.env.PROD && !configuredApiUrl) {
        throw new Error("Contact form API is not configured.");
      }
      const baseApiUrl = configuredApiUrl || "http://localhost:5000";
      const apiUrl = baseApiUrl.endsWith("/") ? baseApiUrl.slice(0, -1) : baseApiUrl;
      const response = await fetch(`${apiUrl}/send`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: formData.email.trim(), subject: formData.subject.trim(), message: formData.message.trim() }) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) throw new Error(result.message || "Unable to send your message.");
      setStatus("success"); setFormData({ email: "", subject: "", message: "" });
    } catch (error) { console.error("Contact form submission failed:", error); setStatus("error"); }
    finally { setIsSubmitting(false); }
  };
  const contactInfo = [
    { icon: Mail, title: "Email", value: "kumaraaditya324@gmail.com", link: "mailto:kumaraaditya324@gmail.com", color: "from-cyan-500 to-violet-500" },
    { icon: Linkedin, title: "LinkedIn", value: "aadityakumar1", link: "https://www.linkedin.com/in/aadityakumar1", color: "from-cyan-500 to-blue-500" },
    { icon: Github, title: "GitHub", value: "Aaditya-kumar-singh", link: "https://github.com/Aaditya-kumar-singh", color: "from-slate-600 to-slate-800" },
    { icon: MapPin, title: "Location", value: "India", link: null, color: "from-violet-500 to-indigo-500" },
  ];

  return <div ref={contactRef} className="contact-page-redesign min-h-screen py-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div variants={containerVariants} initial="hidden" animate={controls} className="text-center mb-16">
        <motion.div variants={itemVariants} className="inline-flex items-center px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-300 text-sm font-medium backdrop-blur-sm mb-6"><MessageCircle size={16} className="mr-2" />Let's start a conversation</motion.div>
        <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl font-bold mb-6">Get In <span className="gradient-text">Touch</span></motion.h2>
        <motion.p variants={itemVariants} className="text-xl text-gray-400 max-w-3xl mx-auto">Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.</motion.p>
      </motion.div>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <motion.div variants={containerVariants} initial="hidden" animate={controls} className="space-y-8">
          <motion.div variants={itemVariants}><h3 className="text-3xl font-bold text-white mb-6">Let's Connect</h3><p className="text-gray-300 text-lg leading-relaxed mb-8">I'm always excited to discuss new opportunities, innovative projects, or simply chat about technology and development. Whether you have a project in mind or just want to say hello, I'd love to hear from you.</p></motion.div>
          <div className="space-y-4">{contactInfo.map(({ icon: Icon, title, value, link, color }) => <motion.div key={title} className="contact-card group" variants={itemVariants}>{link ? <motion.a href={link} target={link.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer" className="flex items-center p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl hover:border-cyan-500/50 transition-colors duration-300 group" whileHover={{ y: -2 }}><div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center mr-4 shrink-0`}><Icon size={22} className="text-white" /></div><div className="min-w-0 flex-1"><p className="text-white font-semibold mb-1">{title}</p><p className="text-gray-400 group-hover:text-cyan-300 transition-colors break-words">{value}</p></div><ExternalLink size={16} className="ml-3 shrink-0 text-gray-500 group-hover:text-cyan-300 transition-colors" /></motion.a> : <div className="flex items-center p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl"><div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center mr-4 shrink-0`}><Icon size={22} className="text-white" /></div><div><p className="text-white font-semibold mb-1">{title}</p><p className="text-gray-400">{value}</p></div></div>}</motion.div>)}</div>
        </motion.div>
        <motion.div ref={formRef} variants={itemVariants} initial="hidden" animate={controls} className="relative">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5 sm:p-8 relative overflow-hidden"><div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-violet-500/5 pointer-events-none" />
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10" aria-describedby={status ? "contact-form-status" : undefined}>
              <div className="form-field"><label htmlFor="contact-email" className="block text-white font-semibold mb-3 text-sm uppercase tracking-wide">Email Address</label><input id="contact-email" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} maxLength={254} className="w-full px-4 py-4 bg-gray-900/70 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-colors duration-200" placeholder="your.email@example.com" required /></div>
              <div className="form-field"><label htmlFor="contact-subject" className="block text-white font-semibold mb-3 text-sm uppercase tracking-wide">Subject</label><input id="contact-subject" type="text" name="subject" value={formData.subject} onChange={handleChange} maxLength={120} className="w-full px-4 py-4 bg-gray-900/70 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-colors duration-200" placeholder="What's this about?" required /></div>
              <div className="form-field"><label htmlFor="contact-message" className="block text-white font-semibold mb-3 text-sm uppercase tracking-wide">Message</label><textarea id="contact-message" name="message" rows={6} value={formData.message} onChange={handleChange} maxLength={5000} className="w-full px-4 py-4 bg-gray-900/70 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-colors duration-200 resize-y" placeholder="Tell me about your project, ideas, or just say hello..." required /></div>
              <motion.button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white py-4 rounded-xl font-semibold shadow-glow transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed" whileHover={{ y: isSubmitting ? 0 : -1 }} whileTap={{ scale: isSubmitting ? 1 : 0.99 }}>{isSubmitting ? <><motion.div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} /><span>Sending...</span></> : <><Send size={20} /><span>Send Message</span></>}</motion.button>
              {status && <motion.div id="contact-form-status" role="status" aria-live="polite" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex items-start space-x-2 p-4 rounded-xl ${status === "success" ? "bg-green-500/10 border border-green-500/20 text-green-400" : "bg-red-500/10 border border-red-500/20 text-red-400"}`}>{status === "success" ? <><CheckCircle size={20} className="shrink-0" /><span>Message sent successfully. I'll get back to you soon.</span></> : <><AlertCircle size={20} className="shrink-0" /><span>Failed to send message. Please try again or contact me directly by email.</span></>}</motion.div>}
            </form>
          </div>
        </motion.div>
      </div>
      <motion.div variants={itemVariants} initial="hidden" animate={controls} className="text-center mt-16"><motion.p className="text-gray-400 mb-6" variants={itemVariants}>Prefer a different way to connect? Find me on social media or check out my work.</motion.p><motion.div className="flex justify-center gap-4" variants={itemVariants}>{[{ icon: Github, href: "https://github.com/Aaditya-kumar-singh", label: "GitHub" }, { icon: Linkedin, href: "https://www.linkedin.com/in/aadityakumar1", label: "LinkedIn" }, { icon: Mail, href: "mailto:kumaraaditya324@gmail.com", label: "Email" }].map(({ icon: Icon, href, label }) => <motion.a key={label} href={href} target={href.startsWith("mailto:") ? "_self" : "_blank"} rel="noopener noreferrer" aria-label={label} className="w-12 h-12 bg-gray-800/50 border border-gray-700/50 rounded-full flex items-center justify-center text-gray-400 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-colors duration-300" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}><Icon size={20} /></motion.a>)}</motion.div></motion.div>
    </div>
  </div>;
};
export default ContactPage;
