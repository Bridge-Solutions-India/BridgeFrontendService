import { useState } from "react";
import { submitContactForm } from "../services/contactForm.api";
import { Button, Snackbar, Alert, Tooltip } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        "description": ""
    });

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [toast, setToast] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const showToast = (message, severity = "success") => {
        setToast({ open: true, message, severity });
    };

    const handleToastClose = (_, reason) => {
        if (reason === "clickaway") return;
        setToast((prev) => ({ ...prev, open: false }));
    };

    const validateForm = () => {
        const name = formData.name.trim();
        const email = formData.email.trim();
        const phone = formData.phone.trim();

        if (!name) {
            return false;
        }

        if (!email && !phone) {
            return false;
        }

        return true;
    };

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

    const isSubmitDisabled = loading;

    const getFieldError = (field) => {
        if(field === "name" && !formData.name.trim()) {
            return "Name is required";
        }

        if((field === "email" || field === "phone") && formData.name.trim() && !formData.email.trim() && !formData.phone.trim()) {
            return "Provide Email or Phone";
        }
        return "";
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitted(true);

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const res = await submitContactForm(formData);
            showToast("Contact form Submitted Successfully", "success");
            setFormData({ name: "", email: "", phone: "", description: "" });
            setSubmitted(false);
        } catch (error) {
            showToast(error?.response?.data?.message || "Something went wrong. Please try again.", "error");
            setFormData({ name: "", email: "", phone: "", description: "" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

                {/* LEFT COLUMN */}
                <div>
                    <h2 className="text-4xl font-extrabold text-gray-900">
                        What Happens After <span className="text-sky-400">You Contact Us?</span>
                    </h2>

                    <p className="mt-4 text-gray-600 max-w-lg">
                        We believe in transparency. Here's exactly what to expect when you reach out.
                    </p>

                    <div className="mt-8 space-y-6">
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
                <div className="relative w-full max-w-md mx-auto">

                    {/* MAIN CARD */}
                    <div className="relative bg-[#06283D] text-white px-6 pt-8 pb-10 rounded-2xl rounded-tr-none overflow-hidden shadow-xl z-10">
                        {/* FOLDED CORNER */}
                        <div
                            className="absolute top-0 right-0 w-8 h-8 bg-cyan-400"
                            style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                        />

                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* NAME */}
                            <Tooltip
                                title={getFieldError("name")}
                                open={submitted && !!getFieldError("name")}
                                arrow
                                placement="top-start"
                            >
                                <div>
                                    <label className="block text-sm mb-1">
                                        Name <span className="text-red-400">*</span>
                                    </label>

                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        className="w-full rounded-md px-4 py-2.5 text-gray-900 bg-white focus:outline-none"
                                    />
                                </div>
                            </Tooltip>

                            {/* EMAIL */}
                            <Tooltip
                                title={getFieldError("email")}
                                open={submitted && !!getFieldError("email")}
                                arrow
                                placement="top-start"
                            >
                                <div>
                                    <label className="block text-sm mb-1">
                                        Email <span className="text-red-400">*</span>
                                    </label>

                                    <input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        className="w-full rounded-md px-4 py-2.5 text-gray-900 bg-white focus:outline-none"
                                    />
                                </div>
                            </Tooltip>

                            {/* PHONE */}
                            <Tooltip
                                title={getFieldError("phone")}
                                open={submitted && !!getFieldError("phone")}
                                arrow
                                placement="top-start"
                            >
                                <div>
                                    <label className="block text-sm mb-1">
                                        Phone <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Enter your phone number"
                                        className="w-full rounded-md px-4 py-2.5 text-gray-900 bg-white focus:outline-none"
                                    />
                                </div>
                            </Tooltip>
                            {/* MESSAGE */}
                            <div>
                                <label className="block text-sm mb-1">Leave us a few words</label>
                                <textarea
                                    rows={4}
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Anything in your mind..."
                                    className="w-full rounded-md px-4 py-2.5 text-gray-900 bg-white focus:outline-none resize-none"
                                />
                            </div>

                            {/* BUTTON */}
                            <Tooltip
                                title={ submitted &&
                                    (!formData.name.trim() ? "Name is required" :
                                    !formData.email.trim() && !formData.phone.trim() ? "Provide Email or Phone" : "")
                                }
                                arrow
                                placement="top"
                            >
                                <span style={{ width: "100%", display: "block" }}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        disabled={isSubmitDisabled}
                                        sx={{
                                            backgroundColor: "#22d3ee",
                                            color: "#06283D",
                                            fontWeight: "bold",
                                            py: 1.4,
                                            textTransform: "none",
                                            "&:hover": { backgroundColor: "#38e8ff" },
                                            "&.Mui-disabled": {
                                                backgroundColor: "#7dd3fc",
                                                color: "#0369a1"
                                            },
                                        }}
                                    >
                                        {loading ? "Submitting..." : "SUBMIT"}
                                    </Button>
                                </span>
                            </Tooltip>
                            <p className="text-xs text-gray-300 text-center mt-2">
                                ⏱ We usually respond within 12 hours.
                            </p>
                        </form>
                    </div>
                </div>

                <Snackbar
                    open={toast.open}
                    autoHideDuration={4000}
                    onClose={handleToastClose}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                    <Alert
                        onClose={handleToastClose}
                        severity={toast.severity}
                        variant="filled"
                        sx={{ width: "100%" }}
                    >
                        {toast.message}
                    </Alert>
                </Snackbar>
            </div>
        </section >
    );
};

function Feature({ Icon, title, desc }) {
    return (
        <div className="flex gap-4 items-start">
            <Icon sx={{ fontSize: 32, color: "#38bdf8" }} />
            <div>
                <h4 className="font-semibold text-gray-900">{title}</h4>
                <p className="text-gray-600 text-sm">{desc}</p>
            </div>
        </div>
    );
}

export default ContactSection;