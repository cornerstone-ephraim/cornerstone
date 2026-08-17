"use client";

import { motion } from "motion/react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { validateContactForm } from "@/lib/contact-validation";
import { sendContactEmail } from "@/lib/send-email";
import type { FormState } from "@/lib/types";

export default function ContactForm({
  submitLabel = "Send message",
}: {
  submitLabel?: string;
}) {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState<null | "ok" | "err">(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    setErrors((eObj) => ({ ...eObj, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSent(null);

    const v = validateContactForm(form);
    setErrors(v);
    if (Object.keys(v).length) {
      const firstInvalidField = Object.keys(v)[0] as keyof FormState;
      const fields = {
        firstName: firstNameRef,
        lastName: lastNameRef,
        email: emailRef,
        message: messageRef,
      };

      fields[firstInvalidField]?.current?.focus();
      return;
    }

    try {
      setSubmitting(true);
      await sendContactEmail(form); // ← single call to your helper
      setSent("ok");
      setForm({ firstName: "", lastName: "", email: "", message: "" });
    } catch (err) {
      console.error("sendContactEmail error:", err);
      setSent("err");
    } finally {
      setSubmitting(false);
    }
  };

  const baseField =
    "h-14 rounded-xl border-0 bg-surface-muted px-4 text-ink-primary shadow-none placeholder:text-ink-secondary focus-visible:ring-2 focus-visible:ring-brand-accent";

  const textAreaField =
    "min-h-44 rounded-xl border-0 bg-surface-muted p-4 text-ink-primary shadow-none placeholder:text-ink-secondary focus-visible:ring-2 focus-visible:ring-brand-accent";

  return (
    <motion.div
      className="mt-10 w-full"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {sent === "ok" && (
        <div className="mb-6 rounded-xl bg-green-50 p-4" role="status">
          <p className="text-sm text-green-700">
            Thanks! Your message has been sent successfully.
          </p>
        </div>
      )}
      {sent === "err" && (
        <div className="mb-6 rounded-xl bg-red-50 p-4" role="alert">
          <p className="text-sm text-red-700">
            I could not send your message. Please try again in a moment.
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
        noValidate
        aria-busy={submitting}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="firstName"
              className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted"
            >
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              ref={firstNameRef}
              type="text"
              autoComplete="given-name"
              placeholder="First name"
              value={form.firstName}
              onChange={handleChange}
              required
              className={baseField}
              aria-invalid={!!errors.firstName}
              aria-describedby={
                errors.firstName ? "firstName-error" : undefined
              }
            />
            {errors.firstName && (
              <p
                id="firstName-error"
                className="text-xs text-red-600"
              >
                {errors.firstName}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="lastName"
              className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted"
            >
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              ref={lastNameRef}
              type="text"
              autoComplete="family-name"
              placeholder="Last name"
              value={form.lastName}
              onChange={handleChange}
              required
              className={baseField}
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
            />
            {errors.lastName && (
              <p
                id="lastName-error"
                className="text-xs text-red-600"
              >
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            ref={emailRef}
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
            className={baseField}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p
              id="email-error"
              className="text-xs text-red-600"
            >
              {errors.email}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="message" className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">
            Message
          </Label>
          <Textarea
            id="message"
            name="message"
            ref={messageRef}
            placeholder="Tell me about your project"
            value={form.message}
            onChange={handleChange}
            required
            className={textAreaField}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p
              id="message-error"
              className="text-xs text-red-600"
            >
              {errors.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={submitting}
          className="h-13 rounded-xl bg-canvas-dark px-7 text-ink-inverse hover:bg-border-dark"
        >
          {submitting ? "Sending..." : submitLabel}
        </Button>
      </form>
    </motion.div>
  );
}
