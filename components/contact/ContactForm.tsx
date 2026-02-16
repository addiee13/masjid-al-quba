"use client";

import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Send, AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import type { ContactFormData, ContactTopic } from "@/types/contact";

const MAX_MESSAGE_LENGTH = 3000;

const topicOptions: { value: ContactTopic; label: string }[] = [
  { value: "general", label: "General Question" },
  { value: "volunteering", label: "Volunteering" },
  { value: "donations", label: "Donations" },
  { value: "education", label: "Youth / Education" },
  { value: "facility", label: "Facility / Maintenance" },
  { value: "other", label: "Other" },
];

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    topic: "general",
    message: "",
    preferredContact: undefined,
    consent: false,
    company: "", // Honeypot field
  });

  useEffect(() => {
    const topic = searchParams.get("topic");
    if (!topic) return;

    const validTopic = topicOptions.find((option) => option.value === topic);
    if (!validTopic) return;

    setFormData((prev) => ({ ...prev, topic: validTopic.value }));
  }, [searchParams]);

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

    if (!formData.topic) {
      newErrors.topic = "Please select a topic";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    } else if (formData.message.trim().length > MAX_MESSAGE_LENGTH) {
      newErrors.message = `Message is too long (max ${MAX_MESSAGE_LENGTH} characters)`;
    }

    if (!formData.consent) {
      newErrors.consent = "You must acknowledge this is not for emergencies";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setErrors({});

    if (!validateForm()) {
      setError("Please fix the errors below");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
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
          topic: "general",
          message: "",
          preferredContact: undefined,
          consent: false,
          company: "",
        });

        // Hide success message after 8 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 8000);
      } else {
        setError(data.error || "Failed to submit. Please try again.");
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
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const messageLength = formData.message.length;
  const isNearLimit = messageLength > MAX_MESSAGE_LENGTH * 0.8;

  return (
    <div className="rounded-3xl bg-white/70 backdrop-blur-sm border border-black/5 shadow-lg p-8">
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-dark mb-6">
        Send Us a Message
      </h2>

      {/* Success Banner */}
      {isSuccess && (
        <div className="mb-6 p-4 rounded-xl bg-primary-green/10 border border-primary-green/20 animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="font-body text-sm text-primary-green font-medium text-center">
            JazakAllahu Khairan—your message has been received. We&apos;ll respond soon, inshaAllah.
          </p>
        </div>
      )}

      {/* Error Summary */}
      {error && (
        <div
          className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 animate-in fade-in slide-in-from-top-2 duration-300 flex items-start gap-3"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="font-body text-sm text-red-700 font-medium">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Honeypot field (hidden) */}
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          className="absolute left-[-9999px] w-1 h-1 opacity-0"
          aria-hidden="true"
        />

        {/* Name */}
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
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`w-full h-12 rounded-xl border ${
              errors.name ? "border-red-500" : "border-black/10"
            } px-4 font-body text-primary-dark focus:ring-2 focus:ring-primary-green/30 focus:border-primary-green focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed`}
            placeholder="Your full name"
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600">
              {errors.name}
            </p>
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
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full h-12 rounded-xl border ${
              errors.email ? "border-red-500" : "border-black/10"
            } px-4 font-body text-primary-dark focus:ring-2 focus:ring-primary-green/30 focus:border-primary-green focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed`}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone (Optional) */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Phone <span className="text-slate-400">(optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full h-12 rounded-xl border border-black/10 px-4 font-body text-primary-dark focus:ring-2 focus:ring-primary-green/30 focus:border-primary-green focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
            placeholder="(555) 123-4567"
          />
        </div>

        {/* Topic */}
        <div>
          <label
            htmlFor="topic"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Reason / Topic <span className="text-red-500">*</span>
          </label>
          <select
            id="topic"
            name="topic"
            required
            value={formData.topic}
            onChange={handleChange}
            disabled={isLoading}
            aria-invalid={!!errors.topic}
            aria-describedby={errors.topic ? "topic-error" : undefined}
            className={`w-full h-12 rounded-xl border ${
              errors.topic ? "border-red-500" : "border-black/10"
            } px-4 font-body text-primary-dark focus:ring-2 focus:ring-primary-green/30 focus:border-primary-green focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed`}
          >
            {topicOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.topic && (
            <p id="topic-error" className="mt-1 text-sm text-red-600">
              {errors.topic}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-slate-700"
            >
              Your Message <span className="text-red-500">*</span>
            </label>
            <span
              className={`text-xs ${
                isNearLimit ? "text-amber-600 font-medium" : "text-slate-500"
              }`}
            >
              {messageLength} / {MAX_MESSAGE_LENGTH}
            </span>
          </div>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={handleChange}
            disabled={isLoading}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`w-full rounded-xl border ${
              errors.message ? "border-red-500" : "border-black/10"
            } px-4 py-3 font-body text-primary-dark focus:ring-2 focus:ring-primary-green/30 focus:border-primary-green focus:outline-none transition-all resize-none disabled:bg-gray-50 disabled:cursor-not-allowed`}
            placeholder="Please provide enough context for a helpful response..."
          />
          {errors.message && (
            <p id="message-error" className="mt-1 text-sm text-red-600">
              {errors.message}
            </p>
          )}
        </div>

        {/* Preferred Contact (Optional) */}
        <div>
          <fieldset>
            <legend className="block text-sm font-medium text-slate-700 mb-3">
              Preferred Contact Method{" "}
              <span className="text-slate-400">(optional)</span>
            </legend>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="preferredContact"
                  value="email"
                  checked={formData.preferredContact === "email"}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-4 h-4 text-primary-green focus:ring-2 focus:ring-primary-green/30 disabled:cursor-not-allowed"
                />
                <span className="font-body text-sm text-slate-700">Email</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="preferredContact"
                  value="phone"
                  checked={formData.preferredContact === "phone"}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-4 h-4 text-primary-green focus:ring-2 focus:ring-primary-green/30 disabled:cursor-not-allowed"
                />
                <span className="font-body text-sm text-slate-700">Phone</span>
              </label>
            </div>
          </fieldset>
        </div>

        {/* Consent Checkbox */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              disabled={isLoading}
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "consent-error" : undefined}
              className={`mt-1 w-4 h-4 rounded border ${
                errors.consent ? "border-red-500" : "border-black/20"
              } text-primary-green focus:ring-2 focus:ring-primary-green/30 disabled:cursor-not-allowed`}
            />
            <span className="font-body text-sm text-slate-700">
              I understand this form is not for emergencies. For emergencies,
              please contact local emergency services first.{" "}
              <span className="text-red-500">*</span>
            </span>
          </label>
          {errors.consent && (
            <p id="consent-error" className="mt-1 text-sm text-red-600">
              {errors.consent}
            </p>
          )}
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
            <>
              <Send className="w-5 h-5" strokeWidth={2} />
              Send Message
            </>
          )}
        </button>

        {/* Info Note */}
        <div className="pt-4 border-t border-black/5">
          <p className="font-body text-xs text-muted-foreground leading-relaxed">
            <strong className="text-primary-dark">What to expect:</strong> We
            typically respond within 1-2 business days. Your information is kept
            private and used only to respond to your inquiry. If this is urgent,
            please call during office hours.
          </p>
        </div>
      </form>
    </div>
  );
}
