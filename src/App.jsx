import { useState } from "react";
import CardNav from './components/landing/CardNav.jsx';
import Hero from './components/landing/Hero.jsx';
import ContactSection from "./components/ContactSection.jsx";
import Footer from './components/landing/Footer.jsx';

function App() {
    // Sample items for your CardNav (ensure these are passed so the menu isn't empty)
    const navItems = [
        { label: "Digital Marketing Services", bgColor: "#1e3a8a", textColor: "#F8FBFF", links: [
            {label: "Search Engine Marketing", href: "#searchEngineMarketing"}, 
            {label: "Social Media Marketing", href: "#socialMediaMarketing"}, 
            {label: "Paid Marketing", href: "#paidMarketing"}
        ] },
        { label: "Software Services", bgColor: "#1e40af", textColor: "#F8FBFF", links: [
            {label: "Web Development Solutions", href: "#webDev"}, 
            {label: "Digital Transformation Solutions", href: "#digtialTransform"},
            {label: "Data Analytics Solutions", href: "#dataAnalytics"}
        ] },
        { label: "Company", bgColor: "#1d4ed8", textColor: "#F8FBFF", links: [
            {label: "Who are We", href: "#teamBrdige"}, 
            {label: "Our Mission", href: "#mission"},
            {label: "Our Vision", href: "#vision"}
        ] }
    ];

    return (
        <div className="relative min-h-screen bg-[#F8FBFF]">
            <CardNav items={navItems} />
            <main>
                <Hero />
                <ContactSection />
            </main>
            <Footer />
        </div>
    );
}

export default App;