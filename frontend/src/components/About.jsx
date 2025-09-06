import React, { useEffect } from "react";

const AboutPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Monkey D. Luffy",
      role: "Founder & CEO",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQudROvgjmvrmVQQQrlA8EnuStqT6Y5dK815_EPkzWS-Gk-hJ5CB0yXUnjUjcHXncQ3Cao&usqp=CAU"
    },
    {
      id: 2,
      name: "Naruto Uzumaki",
      role: "Head of Marketing",
      image: "/NarutoUzumaki.png"
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Lead Designer",
      image: "/EmilyDavis.png"
    }
  ];

  // Fade-in animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-section").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div id="about" className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white text-center py-24 px-6 overflow-hidden">
        {/* Floating shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-300/30 rounded-full blur-2xl animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-28 h-28 bg-orange-200/30 rounded-full blur-2xl animate-spin-slow"></div>
        </div>

        <h1 className="relative text-4xl md:text-5xl font-bold drop-shadow-lg">
          About Us
        </h1>
        <p className="relative mt-4 text-lg max-w-2xl mx-auto">
          Learn more about our story, mission, and the people who make it happen.
        </p>
      </section>

      {/* Our Story */}
      <section className="fade-section opacity-0 translate-y-6 max-w-5xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold mb-4 text-center">Our Story</h2>
        <p className="text-gray-600 text-lg leading-relaxed text-center">
          Founded in 2025, MyShop was born from a passion for providing high-quality, 
          stylish, and affordable products. We believe in making online shopping 
          seamless, exciting, and accessible for everyone. Our journey started with 
          just a few handpicked items and has now grown into a full-scale e-commerce 
          brand trusted by thousands of happy customers.
        </p>
      </section>

      {/* Mission & Values */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-12 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {[
            {
              icon: "🌍",
              title: "Our Mission",
              text: "To bring you the best products at unbeatable prices while ensuring top-notch customer service."
            },
            {
              icon: "💡",
              title: "Innovation",
              text: "Constantly evolving with trends and technology to keep our store fresh and relevant."
            },
            {
              icon: "🤝",
              title: "Commitment",
              text: "Dedicated to ethical sourcing, eco-friendly packaging, and secure shopping for all customers."
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="fade-section opacity-0 translate-y-6 bg-white/70 backdrop-blur-md shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 rounded-xl p-6 border border-transparent"
            >
              <h3 className="text-4xl">{item.icon}</h3>
              <h4 className="mt-3 text-xl font-semibold">{item.title}</h4>
              <p className="mt-2 text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Meet the Team</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="fade-section opacity-0 translate-y-6 bg-white/70 backdrop-blur-md rounded-xl border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full object-cover mt-6 border-4 border-gradient-to-tr from-purple-500 via-pink-500 to-orange-400"
              />
              <div className="p-4 text-center">
                <h4 className="text-xl font-semibold">{member.name}</h4>
                <p className="text-gray-600">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
