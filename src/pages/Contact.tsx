import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import {Footer} from "@/components/footer.tsx";
import {Navbar} from "@/components/navbar.tsx";

export default function ContactPage() {
    // const {t} = useTranslation();
    const [formStatus, setFormStatus] = useState<
        "idle" | "sending" | "success" | "error"
    >("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus("sending");
        // Simulate API call
        setTimeout(() => {
            setFormStatus("success");
        }, 1200);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
                    {/* Header */}
                    <div className="text-center mb-10 md:mb-14">
                        <h1 className="text-4xl md:text-5xl font-bold mb-3">
                            Get in Touch
                        </h1>
                        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                            Have questions? Feedback? Want to become an instructor? We'd love
                            to hear from you.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-5 gap-10 lg:gap-12">
                        {/* Contact Info */}
                        <div className="md:col-span-2 space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                                <div className="space-y-5">
                                    <div className="flex items-start gap-4">
                                        <Mail className="w-6 h-6 text-primary mt-1" />
                                        <div>
                                            <p className="font-medium">Email</p>
                                            <a
                                                href="mailto:hello@yourplatform.com"
                                                className="text-primary hover:underline"
                                            >
                                                moeurkkimsour@gmail.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <Phone className="w-6 h-6 text-primary mt-1" />
                                        <div>
                                            <p className="font-medium">Phone</p>
                                            <p>+855 16 43 91 44 </p>
                                            <p className="text-sm text-foreground/60 mt-1">
                                                Mon - Sunday 8:00 - 21:00 (GMT+7)
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <MapPin className="w-6 h-6 text-primary mt-1" />
                                        <div>
                                            <p className="font-medium">Office</p>
                                            <p>Cambodia, Battambang City</p>
                                            <p className="text-sm text-foreground/60">
                                                We're a remote-first team
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-4">Response Time</h3>
                                <div className="flex items-center gap-3 text-foreground/80">
                                    <Clock className="w-5 h-5" />
                                    <span>Usually within 24–48 hours</span>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="md:col-span-3">
                            <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input id="name" placeholder="Your name" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="your@email.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input
                                            id="subject"
                                            placeholder="How can we help you?"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Please tell us more about your question or feedback..."
                                            rows={6}
                                            required
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full sm:w-auto gap-2"
                                        disabled={formStatus === "sending"}
                                    >
                                        {formStatus === "sending" ? (
                                            "Sending..."
                                        ) : (
                                            <>
                                                Send Message <Send className="w-4 h-4" />
                                            </>
                                        )}
                                    </Button>

                                    {formStatus === "success" && (
                                        <p className="text-green-600 text-center mt-4">
                                            Thank you! We'll get back to you soon.
                                        </p>
                                    )}
                                    {formStatus === "error" && (
                                        <p className="text-destructive text-center mt-4">
                                            Something went wrong. Please try again.
                                        </p>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
