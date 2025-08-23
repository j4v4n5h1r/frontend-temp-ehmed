"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "../../context/TranslationContext";

const AboutPage = () => {
  const { t } = useTranslation();

  const stats = [
    {
      number: "500,000+",
      label: t("about.stats.users", "Happy Users"),
      icon: "👥",
    },
    {
      number: "1,000+",
      label: t("about.stats.stations", "Charging Stations"),
      icon: "⚡",
    },
    {
      number: "50+",
      label: t("about.stats.cities", "Cities"),
      icon: "🏙️",
    },
    {
      number: "99.9%",
      label: t("about.stats.uptime", "Uptime"),
      icon: "📈",
    },
  ];

  const teamMembers = [
    {
      name: "Ahmet Yılmaz",
      position: t("about.team.ceo", "CEO & Founder"),
      image: "/api/placeholder/300/300",
      bio: t("about.team.ceoBio", "Visionary entrepreneur with 15+ years in tech and sustainability"),
    },
    {
      name: "Elif Demir",
      position: t("about.team.cto", "CTO & Co-Founder"),
      image: "/api/placeholder/300/300",
      bio: t("about.team.ctoBio", "Technology expert leading our innovative charging solutions"),
    },
    {
      name: "Mehmet Kaya",
      position: t("about.team.cmo", "Marketing Director"),
      image: "/api/placeholder/300/300",
      bio: t("about.team.cmoBio", "Marketing strategist driving our growth and brand development"),
    },
    {
      name: "Seda Acar",
      position: t("about.team.coo", "COO"),
      image: "/api/placeholder/300/300",
      bio: t("about.team.cooBio", "Operations leader ensuring seamless user experiences"),
    },
  ];

  const milestones = [
    {
      year: "2020",
      title: t("about.milestones.2020.title", "Company Founded"),
      description: t("about.milestones.2020.desc", "Started with a vision to solve dead battery problems"),
    },
    {
      year: "2021",
      title: t("about.milestones.2021.title", "First 50 Stations"),
      description: t("about.milestones.2021.desc", "Launched pilot program in major metropolitan areas"),
    },
    {
      year: "2022",
      title: t("about.milestones.2022.title", "100K Users"),
      description: t("about.milestones.2022.desc", "Reached first major user milestone across 5 cities"),
    },
    {
      year: "2023",
      title: t("about.milestones.2023.title", "500+ Stations"),
      description: t("about.milestones.2023.desc", "Expanded to 50+ cities with advanced technology"),
    },
    {
      year: "2024",
      title: t("about.milestones.2024.title", "Global Expansion"),
      description: t("about.milestones.2024.desc", "International launch and partnership programs"),
    },
  ];

  const values = [
    {
      icon: "🌱",
      title: t("about.values.sustainability.title", "Sustainability"),
      description: t("about.values.sustainability.desc", "Reducing electronic waste through shared charging solutions"),
    },
    {
      icon: "⚡",
      title: t("about.values.innovation.title", "Innovation"),
      description: t("about.values.innovation.desc", "Pioneering cutting-edge technology for better experiences"),
    },
    {
      icon: "🤝",
      title: t("about.values.community.title", "Community"),
      description: t("about.values.community.desc", "Building connections and supporting local communities"),
    },
    {
      icon: "🔒",
      title: t("about.values.reliability.title", "Reliability"),
      description: t("about.values.reliability.desc", "Ensuring consistent, dependable service you can trust"),
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0fdf4 0%, white 50%, #ecfdf5 100%)",
        padding: "2rem 1rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "4rem",
              height: "4rem",
              background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
              borderRadius: "1rem",
              marginBottom: "1.5rem",
              animation: "float 6s ease-in-out infinite",
            }}
          >
            <svg
              style={{ width: "2rem", height: "2rem", color: "white" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
          </div>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "800",
              color: "#171717",
              marginBottom: "1rem",
              letterSpacing: "-0.025em",
            }}
          >
            {t("about.title", "About Pobi")}
          </h1>
          <p
            style={{
              color: "#525252",
              fontSize: "1.25rem",
              fontWeight: "500",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            {t("about.subtitle", "Revolutionizing mobile charging with shared power bank solutions")}
          </p>
        </div>

        {/* Mission Statement */}
        <div
          style={{
            background: "white",
            borderRadius: "1.5rem",
            padding: "3rem",
            marginBottom: "4rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#171717",
              marginBottom: "1.5rem",
            }}
          >
            {t("about.mission.title", "Our Mission")}
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              color: "#6b7280",
              lineHeight: "1.8",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            {t("about.mission.description", "At Pobi, we believe no one should ever be limited by a dead battery. Our mission is to create a world where power is always within reach through our innovative shared charging network. We're not just providing power banks; we're enabling connections, productivity, and peace of mind for millions of users across the globe.")}
          </p>
        </div>

        {/* Stats */}
        <div style={{ marginBottom: "4rem" }}>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#171717",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            {t("about.statsTitle", "Our Impact")}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                style={{
                  background: "white",
                  padding: "2rem",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 10px 25px -3px rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>
                  {stat.icon}
                </div>
                <div
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: "800",
                    color: "#22c55e",
                    marginBottom: "0.5rem",
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    color: "#6b7280",
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div style={{ marginBottom: "4rem" }}>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#171717",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            {t("about.valuesTitle", "Our Values")}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
            }}
          >
            {values.map((value, index) => (
              <div
                key={index}
                style={{
                  background: "white",
                  padding: "2rem",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
                  {value.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#171717",
                    marginBottom: "1rem",
                  }}
                >
                  {value.title}
                </h3>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "0.875rem",
                    lineHeight: "1.6",
                  }}
                >
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        {/*<div style={{ marginBottom: "4rem" }}>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#171717",
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            {t("about.timelineTitle", "Our Journey")}
          </h2>
          <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto" }}>
            {milestones.map((milestone, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  marginBottom: "2rem",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    background: "#22c55e",
                    color: "white",
                    padding: "1rem",
                    borderRadius: "1rem",
                    fontWeight: "700",
                    fontSize: "1.125rem",
                    minWidth: "80px",
                    textAlign: "center",
                    marginRight: "2rem",
                  }}
                >
                  {milestone.year}
                </div>
                <div
                  style={{
                    background: "white",
                    padding: "1.5rem",
                    borderRadius: "0.75rem",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    flex: 1,
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: "600",
                      color: "#171717",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {milestone.title}
                  </h3>
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "0.875rem",
                      lineHeight: "1.5",
                    }}
                  >
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>*/}

        {/* Team */}
        {/*<div style={{ marginBottom: "4rem" }}>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#171717",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            {t("about.teamTitle", "Meet Our Team")}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
            }}
          >
            {teamMembers.map((member, index) => (
              <div
                key={index}
                style={{
                  background: "white",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 10px 25px -3px rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                }}
              >
                <div
                  style={{
                    height: "200px",
                    background: "#f3f4f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#9ca3af",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <svg
                      style={{
                        width: "4rem",
                        height: "4rem",
                        margin: "0 auto 0.5rem",
                        display: "block",
                      }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <div style={{ fontSize: "0.875rem" }}>
                      {t("about.teamPhoto", "Team Photo")}
                    </div>
                  </div>
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: "700",
                      color: "#171717",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {member.name}
                  </h3>
                  <div
                    style={{
                      color: "#22c55e",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      marginBottom: "1rem",
                    }}
                  >
                    {member.position}
                  </div>
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "0.875rem",
                      lineHeight: "1.5",
                    }}
                  >
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>*/}

        {/* CTA Section */}
        <div
          style={{
            background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
            borderRadius: "1.5rem",
            padding: "3rem",
            textAlign: "center",
            color: "white",
            marginBottom: "3rem",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              marginBottom: "1rem",
            }}
          >
            {t("about.cta.title", "Join the Charging Revolution")}
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              marginBottom: "2rem",
              opacity: 0.9,
            }}
          >
            {t("about.cta.subtitle", "Be part of the solution. Rent a power bank today and never worry about dead batteries again.")}
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/rental"
              style={{
                background: "white",
                color: "#22c55e",
                padding: "0.875rem 1.5rem",
                borderRadius: "0.5rem",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-1px)";
                e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              <svg
                style={{ width: "1rem", height: "1rem" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              {t("about.cta.rentNow", "Rent Power Bank")}
            </Link>
            <Link
              href="/contact"
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                color: "white",
                border: "2px solid white",
                padding: "0.875rem 1.5rem",
                borderRadius: "0.5rem",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "white";
                e.target.style.color = "#22c55e";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
                e.target.style.color = "white";
              }}
            >
              <svg
                style={{ width: "1rem", height: "1rem" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {t("about.cta.contact", "Get in Touch")}
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ textAlign: "center" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#6b7280",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: "500",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#22c55e")}
            onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
          >
            <svg
              style={{ width: "1rem", height: "1rem" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            {t("about.backToHome", "Back to Home")}
          </Link>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
