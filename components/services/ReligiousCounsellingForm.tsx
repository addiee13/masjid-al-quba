"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { Send, CheckCircle } from "lucide-react";
import Link from "next/link";

interface FormData {
  name: string;
  email: string;
  phone: string;
  contactMethod: "email" | "phone";
  topic: string;
  message: string;
}

export default function ReligiousCounsellingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    contactMethod: "email",
    topic: "",
    message: "",
  });

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.topic.trim()) {
      newErrors.topic = "Topic is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    if (formData.contactMethod === "phone" && !formData.phone.trim()) {
      newErrors.phone = "Phone is required when preferred contact method is phone";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/religious-counselling", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.ok) {
        setIsSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          contactMethod: "email",
          topic: "",
          message: "",
        });
        setErrors({});
      } else {
        setError(data.error || "Failed to submit request. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    if (error) {
      setError(null);
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-3xl bg-white/70 backdrop-blur-sm border border-black/5 shadow-lg p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-emerald-600" strokeWidth={2} />
        </div>
        
        <h2 className="font-heading text-2xl font-bold text-primary-dark mb-4">
          Your request has been received.
        </h2>
        
        <p className="font-body text-muted-foreground mb-2 leading-relaxed">
          We will reach out soon to arrange a private discussion.
        </p>
        <p className="font-body text-muted-foreground mb-8 leading-relaxed">
          May Allah grant you ease and clarity.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-primary-green text-white font-body font-semibold hover:shadow-lg hover:shadow-primary-green/30 hover:-translate-y-0.5 transition-all duration-300"
        >
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white/70 backdrop-blur-sm border border-black/5 shadow-lg p-8">
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-dark mb-2">
        Request Religious Counselling
      </h2>
      <p className="font-body text-muted-foreground mb-6">
        Submit the form below and we will contact you to arrange a private session.
      </p>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="font-body text-sm text-red-700 font-medium text-center">
            {error}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Full Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
            aria-invalid={!!errors.name}
            className={`w-full h-12 rounded-xl border ${
              errors.name ? "border-red-500" : "border-black/10"
            } px-4 font-body text-primary-dark focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed`}
            placeholder="Your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            aria-invalid={!!errors.email}
            className={`w-full h-12 rounded-xl border ${
              errors.email ? "border-red-500" : "border-black/10"
            } px-4 font-body text-primary-dark focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed`}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Phone Number (Optional) */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Phone Number <span className="text-slate-400">(optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={isLoading}
            aria-invalid={!!errors.phone}
            className="w-full h-12 rounded-xl border border-black/10 px-4 font-body text-primary-dark focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
            placeholder="(555) 123-4567"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        {/* Preferred Contact Method */}
        <div>
          <label
            htmlFor="contactMethod"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Preferred Contact Method
          </label>
          <select
            id="contactMethod"
            name="contactMethod"
            value={formData.contactMethod}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full h-12 rounded-xl border border-black/10 px-4 font-body text-primary-dark focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
          >
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
        </div>

        {/* Topic of Concern */}
        <div>
          <label
            htmlFor="topic"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Topic of Concern <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="topic"
            name="topic"
            required
            value={formData.topic}
            onChange={handleChange}
            disabled={isLoading}
            aria-invalid={!!errors.topic}
            className={`w-full h-12 rounded-xl border ${
              errors.topic ? "border-red-500" : "border-black/10"
            } px-4 font-body text-primary-dark focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed`}
            placeholder="Brief description of what you'd like to discuss"
          />
          {errors.topic && (
            <p className="mt-1 text-sm text-red-600">{errors.topic}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={handleChange}
            disabled={isLoading}
            aria-invalid={!!errors.message}
            className={`w-full rounded-xl border ${
              errors.message ? "border-red-500" : "border-black/10"
            } px-4 py-3 font-body text-primary-dark focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-none transition-all resize-none disabled:bg-gray-50 disabled:cursor-not-allowed`}
            placeholder="Please share what you're facing and how we can help..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 rounded-xl bg-emerald-600 text-white font-body font-semibold hover:shadow-lg hover:shadow-emerald-600/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" strokeWidth={2} />
              Submit Request
            </>
          )}
        </button>
      </form>
    </div>
  );
}
