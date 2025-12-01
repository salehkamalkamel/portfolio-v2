"use client";

import type React from "react";
import { useState } from "react";
import {
  Mail,
  Linkedin,
  Instagram,
  Github,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      alert("Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    {
      label: "Email",
      icon: Mail,
      href: "mailto:salehkamal412003@gmail.com",
      color: "hover:text-red-400 hover:bg-red-900/20",
    },
    {
      label: "WhatsApp",
      icon: MessageCircle,
      href: "https://wa.me/1011966931",
      color: "hover:text-green-400 hover:bg-green-900/20",
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/saleh-kamal-60b96931a",
      color: "hover:text-blue-400 hover:bg-blue-900/20",
    },
    {
      label: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/saleh_kamal_tsx/",
      color: "hover:text-pink-400 hover:bg-pink-900/20",
    },
    {
      label: "GitHub",
      icon: Github,
      href: "https://github.com/salehkamalkamel",
      color: "hover:text-neutral-300 hover:bg-neutral-700/30",
    },
    {
      label: "Phone",
      icon: Phone,
      href: "tel:+201011966931",
      color: "hover:text-purple-400 hover:bg-purple-900/20",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-16 sm:py-24">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs text-neutral-500 uppercase tracking-widest mb-4">
              Get In Touch
            </p>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
              Let's Work Together
            </h1>
            <p className="text-neutral-400 text-lg leading-relaxed">
              Have a question or want to collaborate? I'd love to hear from you.
              Drop me a message and I'll get back to you as soon as possible.
            </p>
          </div>

          {/* Contact Form */}
          <div className="border border-dashed border-neutral-700/50 rounded-lg p-6 sm:p-8 md:p-12 bg-linear-to-br from-neutral-900/30 to-black/50 mb-8 sm:mb-12">
            {submitted && (
              <div className="mb-6 p-4 bg-emerald-900/20 border border-emerald-700/50 rounded-lg">
                <p className="text-emerald-300 text-sm">
                  ✓ Thanks for reaching out! I'll get back to you within 24
                  hours.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-neutral-300 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-800/40 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700/80 focus:bg-neutral-900/80 transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-neutral-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-800/40 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700/80 focus:bg-neutral-900/80 transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                  className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-800/40 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700/80 focus:bg-neutral-900/80 transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me more about your project or inquiry..."
                  rows={6}
                  className="w-full px-4 py-3 bg-neutral-900/50 border border-neutral-800/40 rounded-lg text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700/80 focus:bg-neutral-900/80 transition-all resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer bg-white text-black hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed py-3 font-medium"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8 sm:my-12">
            <div className="flex-1 h-px bg-neutral-800/40"></div>
            <p className="text-neutral-600 text-sm uppercase tracking-widest">
              Or connect directly
            </p>
            <div className="flex-1 h-px bg-neutral-800/40"></div>
          </div>

          {/* Social Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col items-center justify-center p-6 border border-neutral-800/40 rounded-lg bg-neutral-900/20 hover:border-neutral-700/60 transition-all ${social.color}`}
                >
                  <Icon className="w-8 h-8 mb-3 text-neutral-400 group-hover:text-white transition-colors" />
                  <p className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">
                    {social.label}
                  </p>
                </a>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="mt-8 sm:mt-12 text-center text-neutral-500 text-xs sm:text-sm">
            <p>
              I typically respond within 24 hours. For urgent matters, please
              reach out via WhatsApp or call directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
