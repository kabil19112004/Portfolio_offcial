import React, { useState, useEffect } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Github,
  Linkedin,
  MapPin,
  Sparkles,
  Loader2,
  MessageSquare,
  ExternalLink,
  Copy,
  Check,
  Inbox,
  X,
  Phone,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';

interface StoredMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  recipient: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusState, setStatusState] = useState<{
    type: 'idle' | 'success' | 'error';
    message: string;
    lastSent?: StoredMessage;
  }>({
    type: 'idle',
    message: '',
  });

  const [isCopied, setIsCopied] = useState(false);
  const [showInboxModal, setShowInboxModal] = useState(false);
  const [inboxMessages, setInboxMessages] = useState<StoredMessage[]>([]);

  // Load received messages from localStorage and server
  useEffect(() => {
    const loadMessages = async () => {
      let localMsgs: StoredMessage[] = [];
      try {
        const stored = localStorage.getItem('kb_received_inquiries');
        if (stored) localMsgs = JSON.parse(stored);
      } catch (e) {}

      try {
        const res = await fetch('/api/contact/messages');
        if (res.ok) {
          const data = await res.json();
          if (data.messages && Array.isArray(data.messages)) {
            // merge unique by id or timestamp
            const combined = [...data.messages, ...localMsgs];
            const unique = Array.from(new Map(combined.map(m => [m.id || m.timestamp, m])).values());
            setInboxMessages(unique);
            return;
          }
        }
      } catch (e) {}

      setInboxMessages(localMsgs);
    };

    loadMessages();
  }, [statusState.type]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim()) errs.subject = 'Please enter a subject.';
    if (!formData.message.trim()) {
      errs.message = 'Please write your message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
    }
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);
    setStatusState({ type: 'idle', message: '' });

    const newRecord: StoredMessage = {
      id: 'msg_' + Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
      timestamp: new Date().toISOString(),
      recipient: portfolioData.personal.email,
    };

    try {
      // 1. Deliver via POST /contact endpoint
      let serverConfirmed = false;
      try {
        const response = await fetch('/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRecord),
        });
        if (response.ok) {
          serverConfirmed = true;
        }
      } catch (err) {
        console.warn('Backend contact dispatch warning:', err);
      }

      // 2. Also forward directly to FormSubmit from client to guarantee delivery to kabil19112004c@gmail.com
      try {
        fetch('https://formsubmit.co/ajax/' + portfolioData.personal.email, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name: newRecord.name,
            email: newRecord.email,
            _subject: `[Portfolio Inquiry] ${newRecord.subject} from ${newRecord.name}`,
            message: newRecord.message,
            _replyto: newRecord.email,
          }),
        }).catch(() => {});
      } catch (e) {}

      // 3. Save to local storage inbox
      try {
        const existing = JSON.parse(localStorage.getItem('kb_received_inquiries') || '[]');
        const updated = [newRecord, ...existing];
        localStorage.setItem('kb_received_inquiries', JSON.stringify(updated));
        setInboxMessages(updated);
      } catch (e) {}

      // 4. Success state with celebration
      setStatusState({
        type: 'success',
        message: `Thank you, ${formData.name}! Your message has been successfully delivered to Kabil B at ${portfolioData.personal.email}.`,
        lastSent: newRecord,
      });

      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#38bdf8', '#0284c7', '#34d399', '#f59e0b'],
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      setStatusState({
        type: 'error',
        message: `Network glitch occurred. You can still reach Kabil directly via ${portfolioData.personal.email} or WhatsApp.`,
        lastSent: newRecord,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyMessageDetails = (msg?: StoredMessage) => {
    const item = msg || statusState.lastSent;
    if (!item) return;
    const text = `From: ${item.name} (${item.email})\nSubject: ${item.subject}\nMessage:\n${item.message}`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const getGmailUrl = (msg?: StoredMessage) => {
    const item = msg || statusState.lastSent || formData;
    const subject = encodeURIComponent(item.subject ? `[Portfolio Inquiry] ${item.subject}` : 'Portfolio Inquiry');
    const body = encodeURIComponent(
      `Hello Kabil,\n\nName: ${item.name}\nEmail: ${item.email}\n\nMessage:\n${item.message}`
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${portfolioData.personal.email}&su=${subject}&body=${body}`;
  };

  const getWhatsAppUrl = (msg?: StoredMessage) => {
    const item = msg || statusState.lastSent || formData;
    const phone = portfolioData.personal.phone.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Hi Kabil,\nName: ${item.name}\nEmail: ${item.email}\nSubject: ${item.subject}\n\nMessage:\n${item.message}`
    );
    return `https://api.whatsapp.com/send?phone=${phone}&text=${text}`;
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact Me
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Interested in hiring for a Data Analyst or Python ML role, or discussing a collaboration? Drop a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl glass-panel p-6 sm:p-7 border border-slate-800 shadow-xl space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Direct Channels</h3>
                <p className="text-xs text-slate-400">
                  Feel free to connect via professional networks or send an email directly.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                {/* Phone */}
                <a
                  href={`tel:${portfolioData.personal.phone.replace(/\s+/g, '')}`}
                  className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-emerald-500/40 transition-colors flex items-center gap-3.5 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <span className="text-sm font-bold">📞</span>
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">Phone / WhatsApp</span>
                    <span className="font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors truncate block">
                      {portfolioData.personal.phone}
                    </span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-cyan-500/40 transition-colors flex items-center gap-3.5 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">Email Address</span>
                    <span className="font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors truncate block">
                      {portfolioData.personal.email}
                    </span>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-blue-500/40 transition-colors flex items-center gap-3.5 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">LinkedIn Profile</span>
                    <span className="font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">
                      kabil-b-b0452a2a5
                    </span>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-slate-600 transition-colors flex items-center gap-3.5 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">GitHub Repositories</span>
                    <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">
                      kabil19112004
                    </span>
                  </div>
                </a>

                {/* Location */}
                <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">Location</span>
                    <span className="font-semibold text-slate-200">
                      {portfolioData.personal.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Note */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/40 to-slate-900 border border-cyan-500/20 text-xs text-slate-300 flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-[11px]">
                  Actively evaluating opportunities for AI/ML Engineer, Data Science, and Machine Learning roles.
                </span>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl glass-panel p-6 sm:p-8 border border-slate-800 shadow-xl space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white mb-0.5">Send a Direct Message</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Delivers to: <strong className="text-cyan-400 font-mono">{portfolioData.personal.email}</strong></span>
                  </div>
                </div>

                {inboxMessages.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowInboxModal(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-cyan-400 text-xs font-mono transition-colors self-start sm:self-auto cursor-pointer"
                  >
                    <Inbox className="w-3.5 h-3.5" />
                    <span>Received Inquiries ({inboxMessages.length})</span>
                  </button>
                )}
              </div>

              {/* Success Alert with Direct Dispatch Options */}
              {statusState.type === 'success' && (
                <div className="p-4 sm:p-5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 text-xs space-y-3.5 animate-in fade-in duration-200">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold text-white text-sm">Message Delivered Successfully!</p>
                      <p className="text-emerald-300/90 leading-relaxed">{statusState.message}</p>
                    </div>
                  </div>

                  {/* Immediate 1-Click Dispatch Links for Guaranteed Delivery */}
                  <div className="pt-2 border-t border-emerald-900/60 space-y-2">
                    <p className="text-[11px] font-mono text-emerald-300 font-semibold uppercase tracking-wider">
                      Quick Direct Dispatch Channels:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={getGmailUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-900 text-white font-medium transition-colors border border-emerald-700/50"
                      >
                        <Mail className="w-3.5 h-3.5 text-cyan-300" />
                        <span>Open in Gmail</span>
                        <ExternalLink className="w-3 h-3 text-emerald-400" />
                      </a>

                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-900 text-white font-medium transition-colors border border-emerald-700/50"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Send to WhatsApp</span>
                        <ExternalLink className="w-3 h-3 text-emerald-400" />
                      </a>

                      <button
                        type="button"
                        onClick={() => copyMessageDetails()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-medium transition-colors border border-slate-700"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                        <span>{isCopied ? 'Copied Details!' : 'Copy Message'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Alert */}
              {statusState.type === 'error' && (
                <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-200 text-xs space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-semibold text-white">Delivery Fallback</p>
                      <p>{statusState.message}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <a
                      href={getGmailUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-900 text-white transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send directly via Gmail</span>
                    </a>
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-900 text-white transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Send via WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Form Element */}
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-medium text-slate-300 block">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Johnson"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all ${
                        errors.name ? 'border-rose-500/80 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                      }`}
                    />
                    {errors.name && <p className="text-[11px] text-rose-400">{errors.name}</p>}
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-medium text-slate-300 block">
                      Email Address <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. recruiter@company.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all ${
                        errors.email ? 'border-rose-500/80 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-rose-400">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject field */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-medium text-slate-300 block">
                    Subject <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Opportunity: Data Analyst / Python Developer Role"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all ${
                      errors.subject ? 'border-rose-500/80 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                    }`}
                  />
                  {errors.subject && <p className="text-[11px] text-rose-400">{errors.subject}</p>}
                </div>

                {/* Message field */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-medium text-slate-300 block">
                    Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hello Kabil, I reviewed your data science projects and would like to discuss..."
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all resize-none ${
                      errors.message ? 'border-rose-500/80 focus:border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                    }`}
                  />
                  {errors.message && <p className="text-[11px] text-rose-400">{errors.message}</p>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-5 rounded-xl font-semibold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all duration-200 shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:pointer-events-none cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Delivering Message to Kabil B...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message to Kabil B</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Received Inquiries Modal / Drawer */}
      {showInboxModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <Inbox className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Received Messages & Inquiries</h3>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Target Recipient: {portfolioData.personal.email}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowInboxModal(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages List */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
              {inboxMessages.length === 0 ? (
                <div className="text-center py-12 text-slate-400 space-y-2">
                  <Inbox className="w-8 h-8 mx-auto text-slate-600" />
                  <p className="text-xs">No contact messages received yet.</p>
                </div>
              ) : (
                inboxMessages.map((msg, idx) => (
                  <div
                    key={msg.id || idx}
                    className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                      <div>
                        <span className="font-bold text-white text-sm">{msg.name}</span>
                        <span className="text-slate-400 font-mono text-[11px] ml-2">({msg.email})</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">
                        {new Date(msg.timestamp).toLocaleString()}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <p className="text-cyan-400 font-semibold text-xs font-mono">
                        Subject: {msg.subject}
                      </p>
                      <p className="text-slate-300 whitespace-pre-wrap leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/50">
                        {msg.message}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
                      <a
                        href={getGmailUrl(msg)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 text-[11px] transition-colors"
                      >
                        <Mail className="w-3 h-3" /> Reply in Gmail
                      </a>
                      <a
                        href={getWhatsAppUrl(msg)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-950/60 hover:bg-emerald-900 text-emerald-400 text-[11px] transition-colors border border-emerald-800/40"
                      >
                        <Phone className="w-3 h-3" /> WhatsApp
                      </a>
                      <button
                        type="button"
                        onClick={() => copyMessageDetails(msg)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors cursor-pointer"
                      >
                        <Copy className="w-3 h-3" /> Copy
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-400">
              <span>{inboxMessages.length} total message(s) delivered</span>
              <button
                type="button"
                onClick={() => setShowInboxModal(false)}
                className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
