"use client";

import { useRef, useState } from "react";
import { Mail, MessageCircle, MapPin, Send, Check, Loader2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { LinkedInIcon } from "@/components/ui/brand-icons";
import { contactMethods } from "@/lib/portfolio";

const iconMap = { mail: Mail, linkedin: LinkedInIcon, message: MessageCircle, pin: MapPin } as const;

type FormStatus = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to send message");
      formRef.current?.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  // text-base on mobile is deliberate: iOS Safari zooms the viewport when a
  // focused field's font-size is under 16px. Drop back to text-sm from sm: up.
  const inputClass =
    "w-full rounded-xl border border-border bg-input px-4 py-3 text-base text-foreground placeholder:text-muted-foreground transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-50 sm:text-sm";

  return (
    <section id="contact" className="section-anchor relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something"
          accent="together"
          description="Have a project, research collaboration, or opportunity in mind? My inbox is always open."
          align="center"
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-5">
          {/* Contact methods */}
          <Reveal className="lg:col-span-2">
            <div className="grid gap-3">
              {contactMethods.map((m) => {
                const Icon = iconMap[m.icon as keyof typeof iconMap];
                return (
                  <a
                    key={m.label}
                    href={m.href}
                    target={m.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-card/50 p-4 backdrop-blur-sm transition-colors hover:border-accent/40"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                        {m.label}
                      </p>
                      <p className="truncate text-sm font-medium text-foreground">{m.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm sm:p-8">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-14 text-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-accent/15 text-accent">
                    <Check className="h-8 w-8" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold">Message sent!</h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-accent hover:text-accent-bright"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  {status === "error" && (
                    <div className="rounded-xl border border-accent/40 bg-accent/10 p-3 text-sm text-accent">
                      {errorMessage}
                    </div>
                  )}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                        Name *
                      </label>
                      <input name="name" required disabled={status === "loading"} placeholder="Your name" className={inputClass} />
                    </div>
                    <div>
                      <label className="mb-1.5 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                        Email *
                      </label>
                      <input type="email" name="email" required disabled={status === "loading"} placeholder="you@email.com" className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                      Subject
                    </label>
                    <input name="subject" disabled={status === "loading"} placeholder="Collaboration opportunity" className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-1.5 block font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                      Message *
                    </label>
                    <textarea name="message" rows={5} required disabled={status === "loading"} placeholder="Tell me about it..." className={`${inputClass} resize-none`} />
                  </div>
                  <Button type="submit" variant="primary" size="lg" disabled={status === "loading"} className="w-full sm:w-auto">
                    {status === "loading" ? (
                      <>
                        <Loader2 className="animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send /> Send message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
