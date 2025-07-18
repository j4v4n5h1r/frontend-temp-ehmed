"use client";

import Link from "next/link";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b95b615c?w=300&h=300&fit=crop&crop=center",
      bio: "Former tech executive with 15+ years in mobile technology and sustainable energy solutions.",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=center",
      bio: "Software engineering leader who previously built charging infrastructure for major tech companies.",
    },
    {
      name: "Emma Rodriguez",
      role: "Head of Operations",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=center",
      bio: "Operations expert with a background in logistics and urban planning for smart city initiatives.",
    },
    {
      name: "David Kim",
      role: "Head of Design",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=center",
      bio: "Award-winning product designer focused on creating intuitive user experiences for everyday technology.",
    },
  ];

  const values = [
    {
      icon: (
        <svg
          className="w-6 sm:w-8 h-6 sm:h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      title: "User-Centric",
      description:
        "Every decision we make puts our users first. We're building the charging solution we'd want to use ourselves.",
    },
    {
      icon: (
        <svg
          className="w-6 sm:w-8 h-6 sm:h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Reliability",
      description:
        "We believe charging your device should be as reliable as turning on a light switch. Always available when you need it.",
    },
    {
      icon: (
        <svg
          className="w-6 sm:w-8 h-6 sm:h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z"
          />
        </svg>
      ),
      title: "Innovation",
      description:
        "We're constantly improving our technology and expanding our network to serve you better.",
    },
    {
      icon: (
        <svg
          className="w-6 sm:w-8 h-6 sm:h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
          />
        </svg>
      ),
      title: "Sustainability",
      description:
        "Reducing electronic waste by providing shared charging solutions that benefit everyone and the planet.",
    },
  ];

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Started with a vision to solve dead battery problems",
    },
    {
      year: "2021",
      title: "First 50 Stations",
      description: "Launched our pilot program in major metropolitan areas",
    },
    {
      year: "2022",
      title: "100K Users",
      description: "Reached our first major user milestone across 5 cities",
    },
    {
      year: "2023",
      title: "500+ Stations",
      description: "Expanded to 50+ cities with improved technology",
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "International rollout and partnership programs",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative pt-16 sm:pt-20 pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-emerald-600/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                About
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                PowerShare
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-4">
              We're on a mission to eliminate dead battery anxiety forever.
              <br className="hidden sm:block" />
              Power when you need it, where you need it.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 text-center lg:text-left">
                Our Story
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-gray-600 leading-relaxed">
                <p>
                  PowerShare was born from a simple frustration: being stranded
                  with a dead phone battery when you need it most. Our founders
                  experienced this countless times during business trips, at
                  airports, and while exploring new cities.
                </p>
                <p>
                  We realized that in our hyper-connected world, access to power
                  shouldn't be a luxury or a source of anxiety. That's why we
                  created PowerShare - a reliable, convenient network of power
                  bank stations that ensures you're never without power again.
                </p>
                <p>
                  Today, we're proud to serve thousands of users across multiple
                  countries, with a network that's growing every day. But we're
                  just getting started in our mission to make dead batteries a
                  thing of the past.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2 bg-white rounded-2xl shadow-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&crop=center"
                alt="PowerShare team"
                className="w-full h-60 sm:h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-14 sm:w-16 h-14 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  {value.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base px-2">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Key milestones in the PowerShare story
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-emerald-500"></div>

              <div className="space-y-8 sm:space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-start">
                    <div className="flex-shrink-0 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg text-sm sm:text-base">
                      {milestone.year.slice(-2)}
                    </div>
                    <div className="ml-6 sm:ml-8 bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <span className="text-xs sm:text-sm font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded w-fit">
                          {milestone.year}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                          {milestone.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm sm:text-base">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              The passionate people behind PowerShare
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="mb-4 sm:mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 sm:w-32 h-24 sm:h-32 rounded-full mx-auto object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3 text-sm sm:text-base">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed px-2">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-600 to-emerald-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              PowerShare by the Numbers
            </h2>
            <p className="text-base sm:text-lg opacity-90 px-4">
              The impact we're making together
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center text-white">
            {[
              { number: "500+", label: "Active Stations" },
              { number: "100K+", label: "Happy Users" },
              { number: "50+", label: "Cities Served" },
              { number: "1M+", label: "Charges Delivered" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-lg opacity-90">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Join the PowerShare Community
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 px-4">
              Be part of the charging revolution. Together, we're building a
              world where dead batteries are a thing of the past.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/locations">
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                  Find Stations
                </button>
              </Link>
              <Link href="/register">
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
