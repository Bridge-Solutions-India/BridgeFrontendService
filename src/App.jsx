import { useState } from "react";
import CardNav from './components/landing/CardNav.jsx';
import Hero from './components/landing/Hero.jsx';

function App() {
    // Sample items for your CardNav (ensure these are passed so the menu isn't empty)
    const navItems = [
        { label: "Services", bgColor: "#1e3a8a", textColor: "#ffffff", links: [{label: "Consulting", href: "#"}, {label: "Tech", href: "#"}] },
        { label: "Products", bgColor: "#1e40af", textColor: "#ffffff", links: [{label: "SaaS", href: "#"}, {label: "Mobile", href: "#"}] },
        { label: "Contact", bgColor: "#1d4ed8", textColor: "#ffffff", links: [{label: "Team", href: "#"}, {label: "Story", href: "#"}] },
    ];

    return (
        <div className="relative min-h-screen bg-[#F8FBFF]">
            <CardNav items={navItems} />
            <main>
                <Hero />
            </main>
        </div>
    );
}

export default App;