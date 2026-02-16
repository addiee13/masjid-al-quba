"use client";

import { useState, FormEvent } from "react";

interface AskImamFormProps {
  onSuccess?: () => void;
}

export default function AskImamForm({ onSuccess }: AskImamFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    question: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ask-imam", {
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
        setFormData({ name: "", email: "", subject: "", question: "" });

        if (onSuccess) {
          onSuccess();
        }

        // Hide success message after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
        // Handle error from API
        setError(data.error || "Failed to submit question. Please try again.");
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
          Ask the Imam Form
        </h2>

        {/* Success Banner */}
        {isSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="font-body text-sm text-emerald-700 font-medium text-center">
              Your question has been submitted. The Imam will respond soon, inshaAllah.
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
          {/* Name Field (Optional) */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Name <span className="text-slate-400">(optional)</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full h-12 rounded-xl border border-black/10 px-4 font-body text-primary-dark focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
              placeholder="Your name (or leave blank for anonymous)"
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
              className="w-full h-12 rounded-xl border border-black/10 px-4 font-body text-primary-dark focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Subject Field */}
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full h-12 rounded-xl border border-black/10 px-4 font-body text-primary-dark focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
              placeholder="Brief topic of your question"
            />
          </div>

          {/* Question Field */}
          <div>
            <label
              htmlFor="question"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Your Question <span className="text-red-500">*</span>
            </label>
            <textarea
              id="question"
              name="question"
              required
              rows={6}
              value={formData.question}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full rounded-xl border border-black/10 px-4 py-3 font-body text-primary-dark focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 focus:outline-none transition-all resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
              placeholder="Please provide enough context for a helpful answer..."
            />
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
              "Send Question"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
