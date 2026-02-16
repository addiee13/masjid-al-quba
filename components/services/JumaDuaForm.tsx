"use client";

import { useState, FormEvent } from "react";

interface JumaDuaFormProps {
  onSuccess?: () => void;
}

export default function JumaDuaForm({ onSuccess }: JumaDuaFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/juma-dua-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.ok) {
        // Success state
        setIsSuccess(true);
        setFormData({ name: "", phone: "", email: "", message: "" });

        if (onSuccess) {
          onSuccess();
        }

        // Hide success message after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
        // Handle error from API
        setError(data.error || "Failed to submit request. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="relative">
      {/* Form Card */}
      <div className="rounded-3xl bg-white/70 backdrop-blur-sm border border-black/5 shadow-lg p-8">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-dark mb-6">
          Juma Dua Request Form
        </h2>

        {/* Success Banner */}
        {isSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-primary-green/10 border border-primary-green/20 animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="font-body text-sm text-primary-green font-medium text-center">
              JazakAllahu Khairan — your request has been received. May Allah accept it.
            </p>
          </div>
        )}

        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="font-body text-sm text-red-700 font-medium text-center">
              {error}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full h-12 rounded-xl border border-black/10 px-4 font-body text-primary-dark focus:ring-2 focus:ring-primary-green/30 focus:border-primary-green focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
              placeholder="Your full name"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full h-12 rounded-xl border border-black/10 px-4 font-body text-primary-dark focus:ring-2 focus:ring-primary-green/30 focus:border-primary-green focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
              placeholder="(555) 123-4567"
            />
          </div>

          {/* Email Field */}
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
              className="w-full h-12 rounded-xl border border-black/10 px-4 font-body text-primary-dark focus:ring-2 focus:ring-primary-green/30 focus:border-primary-green focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Your Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full rounded-xl border border-black/10 px-4 py-3 font-body text-primary-dark focus:ring-2 focus:ring-primary-green/30 focus:border-primary-green focus:outline-none transition-all resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
              placeholder="Share your dua request here..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-primary-green text-white font-body font-semibold hover:shadow-lg hover:shadow-primary-green/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
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
              "Send Request"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
