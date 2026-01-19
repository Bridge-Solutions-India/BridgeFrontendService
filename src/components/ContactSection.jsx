import { useState } from "react";
import { submitContactForm } from "../services/contactForm.api";
import { Button, Snackbar, Alert, Tooltip } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9]{10}$/;

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        description: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const showToast = (message, severity = "success") => {
        setToast({ open: true, message, severity });
    };

    const handleToastClose = (_, reason) => {
        if (reason === "clickaway") return;
        setToast((prev) => ({ ...prev, open: false }));
    };

    const hasError = (field) => submitted && !!getFieldError(field);

    const validateContact = (value) => {
        const contact = value.trim();
        if(!contact) {
            return {valid: false, reason: "EMPTY"};
        }

        const isEmail = EMAIL_REGEX.test(contact);
        const isPhone = PHONE_REGEX.test(contact);

        if(!isEmail && !isPhone) {
            return { valid: false, reason: "INVALID_FORMAT" };
        }

        return { valid: true, reason: null };
    };

    const getFieldError = (field) => {
        if (!submitted) return "";

        if (field === "name") {
            if (!formData.name.trim()) return "Name is required";
        }

        if (field === "contact") {
            const { _, reason } = validateContact(formData.contact);

            if(reason == "EMPTY") {
                return "Email or Phone is required";
            }

            if(reason == "INVALID_FORMAT") {
                return "Enter a valid Email or Phone number";
            }
        }

        return "";
    };


    const getSubmitHint = () => {
        const name = formData.name.trim();

        if(!name) {
            return "Please enter your name";
        }

        const { _, reason } = validateContact(formData.contact);
        if(reason == "EMPTY") {
            return "Email or Phone is required";
        }

        if(reason == "INVALID_FORMAT") {
            return "Enter a valid Email or Phone number";
        }

        return "";
    };

    const validateForm = () => {
        return (
            !getFieldError("name") &&
            !getFieldError("contact")
        );
    };

    const isFormValid = formData.name.trim() && validateContact(formData.contact).valid;        

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (submitted) {
            setSubmitted(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (!validateForm()) return;

        setLoading(true);

        try {
            const payload = {
                name: formData.name.trim(),
                email_or_phone: formData.contact.trim(),
                description: formData.description.trim(),
            };

            await submitContactForm(payload);

            showToast("Contact form submitted successfully", "success");
            setFormData({ name: "", contact: "", description: "" });
            setSubmitted(false);
        } catch (error) {
            showToast(error.message || "Something went wrong", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-2 bg-white">
            <div
                id="contact"
                className="max-w-5xl mx-auto py-6 px-3 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start"
            >
                {/* LEFT COLUMN */}
                <div>
                    <h2 className="text-[2.5rem] leading-tight font-extrabold text-gray-900">
                        What Happens After{" "}
                        <span className="text-sky-400">You Contact Us?</span>
                    </h2>

                    <p className="mt-2 text-[1.05rem] leading-snug text-gray-600 max-w-lg">
                        We believe in transparency. Here's exactly what to expect when you
                        reach out.
                    </p>

                    <div className="mt-5 space-y-3">
                        <Feature
                            Icon={ChatBubbleOutlineIcon}
                            title="We understand your business & goals"
                            desc="Deep dive into your vision and objectives"
                        />
                        <Feature
                            Icon={TrendingUpIcon}
                            title="We analyze opportunities for growth"
                            desc="Identify key areas to maximize your ROI"
                        />
                        <Feature
                            Icon={LightbulbOutlinedIcon}
                            title="We propose a clear, actionable plan"
                            desc="Custom strategy tailored to your needs"
                        />
                    </div>
                </div>

                {/* RIGHT COLUMN (FORM) */}
                <div className="relative w-full max-w-md mx-auto lg:mt-0 mt-10">
                    <div className="relative shadow-2xl">
                        {/* MAIN CARD */}
                        <div
                            className="relative bg-[#06283D] text-white px-8 pt-8 pb-32 z-10"
                            style={{
                                clipPath:
                                    "polygon(0 0, 100% 0, 100% 100%, 50% 95%, 0 100%)",
                                marginBottom: "-120px",
                            }}
                        >
                            {/* Fold */}
                            <div
                                className="absolute top-0 right-0 w-10 h-10 bg-cyan-400"
                                style={{
                                    clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                                }}
                            />

                            <form onSubmit={handleSubmit} className="space-y-3">
                                {/* NAME */}
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">
                                        Name <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full rounded-md px-4 py-2.5 bg-white text-gray-900 placeholder:text-sm focus:outline-none ${hasError("name") ? "border border-red-500" : ""}`}
                                        placeholder="Enter your name with (Business name in Bracket)"
                                    />
                                    {hasError("name") && (
                                        <p className="text-xs text-red-400 mt-1">
                                            {getFieldError("name")}
                                        </p>
                                    )}
                                </div>

                                {/* CONTACT */}
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">
                                        Contact Information{" "}
                                        <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        name="contact"
                                        value={formData.contact}
                                        onChange={handleChange}
                                        className={`w-full rounded-md px-4 py-2.5 bg-white placeholder:text-sm text-gray-900 focus:outline-none ${hasError("contact") ? "border border-red-500" : ""}`}
                                        placeholder="Provide either Email or Phone Number"
                                    />
                                    {hasError("contact") && (
                                        <p className="text-xs text-red-400 mt-1">
                                            {getFieldError("contact")}
                                        </p>
                                    )}
                                </div>

                                {/* MESSAGE */}
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">
                                        Leave us a few words
                                    </label>
                                    <textarea
                                        rows={4}
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="w-full rounded-md px-4 py-2.5 bg-white placeholder:text-sm text-gray-900 focus:outline-none resize-none"
                                        placeholder="Enter the service you required"
                                    />
                                </div>
                            </form>
                        </div>

                        {/* ENVELOPE FRONT */}
                        <div className="relative z-20">
                            <div
                                className="bg-[#0369a1] h-48 w-full absolute top-0"
                                style={{
                                    clipPath:
                                        "polygon(0 30%, 50% 0%, 100% 30%, 100% 100%, 50% 100%, 0 100%)",
                                }}
                            />
                            <div
                                className="bg-[#22d3ee] h-48 w-full relative flex flex-col items-center justify-end pb-8"
                                style={{
                                    clipPath:
                                        "polygon(0 55%, 50% 25%, 100% 55%, 100% 100%, 50% 100%, 0 100%)",
                                }}
                            >
                            <Tooltip 
                                title={!isFormValid ? getSubmitHint() : ""}
                                arrow
                                placement="top"
                            >
                                <span>
                                    <Button
                                        type="submit"
                                        onClick={handleSubmit}
                                        disabled={loading || !isFormValid}
                                        sx={{
                                            backgroundColor: "#06283D",
                                            color: "white",
                                            fontWeight: "bold",
                                            px: 5,
                                            py: 1.2,
                                            minWidth: "160px",
                                            borderRadius: "6px",
                                            textTransform: "none",
                                            cursor: loading || !isFormValid ? "not-allowed" : "pointer",
                                            "&:hover": { backgroundColor: "#0a3a57" },
                                            "&.Mui-disabled": {
                                                backgroundColor: "#06283D",
                                                color: "white",
                                                opacity: 1,
                                                cursor: "not-allowed",
                                            },
                                        }}
                                    >
                                        {loading ? "Submitting..." : "SUBMIT"}
                                    </Button>
                                </span>
                            </Tooltip>
                                <p className="text-[11px] text-[#06283D] font-bold mt-2">
                                    ⏱ We usually respond within 12 hours.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TOAST */}
                <Snackbar
                    open={toast.open}
                    autoHideDuration={4000}
                    onClose={handleToastClose}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                    <Alert severity={toast.severity} variant="filled">
                        {toast.message}
                    </Alert>
                </Snackbar>
            </div>
        </section>
    );
};

function Feature({ Icon, title, desc }) {
    return (
        <div className="flex gap-4 items-start">
            <Icon sx={{ fontSize: 32, color: "#38bdf8" }} />
            <div>
                <h4 className="font-semibold text-[1rem] leading-tight text-gray-900">
                    {title}
                </h4>
                <p className="text-gray-600 text-[0.95rem] leading-snug">{desc}</p>
            </div>
        </div>
    );
}

export default ContactSection;