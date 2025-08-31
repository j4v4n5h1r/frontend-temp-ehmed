"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "../../context/TranslationContext";

const BlogPage = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", name: t("blog.categories.all", "All Posts") },
    { id: "announcements", name: t("blog.categories.announcements", "Announcements") },
    { id: "technology", name: t("blog.categories.technology", "Technology") },
    { id: "sustainability", name: t("blog.categories.sustainability", "Sustainability") },
    { id: "tips", name: t("blog.categories.tips", "Tips & Guides") },
    { id: "company", name: t("blog.categories.company", "Company News") },
  ];

  const blogPosts = [
    {
      id: 1,
      title: t("blog.posts.1.title", "Introducing Power Bank Sharing 2.0"),
      excerpt: t("blog.posts.1.excerpt", "Experience our next-generation power bank sharing technology with faster charging and improved user experience."),
      category: "announcements",
      author: "Pobi Team",
      date: "2024-03-15",
      readTime: "3 min",
      image: "/api/placeholder/600/300",
      featured: true,
    },
    {
      id: 2,
      title: t("blog.posts.2.title", "How Fast Charging Technology Works"),
      excerpt: t("blog.posts.2.excerpt", "Learn about the science behind fast charging and how our power banks deliver rapid charging to your devices."),
      category: "technology",
      author: "Ahmet Yılmaz",
      date: "2024-03-12",
      readTime: "5 min",
      image: "/api/placeholder/600/300",
    },
    {
      id: 3,
      title: t("blog.posts.3.title", "Sustainable Charging Solutions for a Greener Future"),
      excerpt: t("blog.posts.3.excerpt", "Discover how shared power banks contribute to environmental sustainability and reduce electronic waste."),
      category: "sustainability",
      author: "Elif Demir",
      date: "2024-03-10",
      readTime: "4 min",
      image: "/api/placeholder/600/300",
    },
    {
      id: 4,
      title: t("blog.posts.4.title", "5 Tips to Maximize Your Phone's Battery Life"),
      excerpt: t("blog.posts.4.excerpt", "Simple strategies to extend your smartphone's battery life and reduce the need for frequent charging."),
      category: "tips",
      author: "Mehmet Kaya",
      date: "2024-03-08",
      readTime: "6 min",
      image: "/api/placeholder/600/300",
    },
    {
      id: 5,
      title: t("blog.posts.5.title", "Expanding to 50+ Cities Nationwide"),
      excerpt: t("blog.posts.5.excerpt", "Our rapid expansion plan brings power bank sharing to major cities across Turkey and beyond."),
      category: "company",
      author: "Pobi Team",
      date: "2024-03-05",
      readTime: "3 min",
      image: "/api/placeholder/600/300",
    },
    {
      id: 6,
      title: t("blog.posts.6.title", "The Future of Mobile Charging Infrastructure"),
      excerpt: t("blog.posts.6.excerpt", "Exploring emerging trends in mobile charging technology and what they mean for the future."),
      category: "technology",
      author: "Dr. Can Özkan",
      date: "2024-03-03",
      readTime: "7 min",
      image: "/api/placeholder/600/300",
    },
    {
      id: 7,
      title: t("blog.posts.7.title", "Travel Smart: Never Run Out of Battery Again"),
      excerpt: t("blog.posts.7.excerpt", "Essential tips for keeping your devices charged while traveling, with our station network guide."),
      category: "tips",
      author: "Seda Acar",
      date: "2024-03-01",
      readTime: "5 min",
      image: "/api/placeholder/600/300",
    },
    {
      id: 8,
      title: t("blog.posts.8.title", "Partnership with Major Retail Chains"),
      excerpt: t("blog.posts.8.excerpt", "New partnerships bring Pobi stations to shopping malls, airports, and retail locations nationwide."),
      category: "company",
      author: "Pobi Team",
      date: "2024-02-28",
      readTime: "4 min",
      image: "/api/placeholder/600/300",
    },
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
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
            {t("blog.title", "Pobi Blog")}
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
            {t("blog.subtitle", "Stay updated with the latest news, tips, and insights about power bank sharing")}
          </p>
        </div>

        {/* Search and Categories */}
        <div style={{ marginBottom: "3rem" }}>
          {/* Search Bar */}
          <div style={{ marginBottom: "2rem" }}>
            <div
              style={{
                maxWidth: "500px",
                margin: "0 auto",
                position: "relative",
              }}
            >
              <input
                type="text"
                placeholder={t("blog.searchPlaceholder", "Search articles...")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.875rem 1rem 0.875rem 3rem",
                  fontSize: "1rem",
                  border: "2px solid #e5e7eb",
                  borderRadius: "1rem",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 4px -1px rgba(0, 0, 0, 0.1)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#22c55e";
                  e.target.style.boxShadow = "0 0 0 3px rgba(34, 197, 94, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "0 2px 4px -1px rgba(0, 0, 0, 0.1)";
                }}
              />
              <svg
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "1.25rem",
                  height: "1.25rem",
                  color: "#9ca3af",
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Categories */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  padding: "0.5rem 1rem",
                  border: "2px solid",
                  borderColor: selectedCategory === category.id ? "#22c55e" : "#e5e7eb",
                  background: selectedCategory === category.id ? "#22c55e" : "white",
                  color: selectedCategory === category.id ? "white" : "#6b7280",
                  borderRadius: "2rem",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.id) {
                    e.target.style.borderColor = "#22c55e";
                    e.target.style.color = "#22c55e";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.id) {
                    e.target.style.borderColor = "#e5e7eb";
                    e.target.style.color = "#6b7280";
                  }
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && selectedCategory === "all" && !searchTerm && (
          <div style={{ marginBottom: "4rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#171717",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              {t("blog.featured", "Featured Article")}
            </h2>
            <div
              style={{
                background: "white",
                borderRadius: "1.5rem",
                boxShadow: "0 10px 25px -3px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 20px 40px -3px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 10px 25px -3px rgba(0, 0, 0, 0.1)";
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  minHeight: "400px",
                }}
              >
                <div
                  style={{
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
                        margin: "0 auto 1rem",
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
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <div>{t("blog.featuredImage", "Featured Image")}</div>
                  </div>
                </div>
                <div style={{ padding: "3rem" }}>
                  <div
                    style={{
                      background: "#fef3c7",
                      color: "#92400e",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      display: "inline-block",
                      marginBottom: "1rem",
                      textTransform: "uppercase",
                    }}
                  >
                    {t("blog.featured", "Featured")}
                  </div>
                  <h3
                    style={{
                      fontSize: "1.75rem",
                      fontWeight: "700",
                      color: "#171717",
                      marginBottom: "1rem",
                      lineHeight: "1.3",
                    }}
                  >
                    {featuredPost.title}
                  </h3>
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "1rem",
                      lineHeight: "1.6",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {featuredPost.excerpt}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: "1.5rem",
                      fontSize: "0.875rem",
                      color: "#9ca3af",
                    }}
                  >
                    <div>{featuredPost.author}</div>
                    <div>•</div>
                    <div>{formatDate(featuredPost.date)}</div>
                    <div>•</div>
                    <div>{featuredPost.readTime} {t("blog.read", "read")}</div>
                  </div>
                  <Link
                    href={`/blog/${featuredPost.id}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                      color: "white",
                      padding: "0.75rem 1.5rem",
                      borderRadius: "0.5rem",
                      textDecoration: "none",
                      fontWeight: "600",
                      fontSize: "0.875rem",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-1px)";
                      e.target.style.boxShadow = "0 4px 12px rgba(34, 197, 94, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    {t("blog.readMore", "Read Article")}
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div>
          {filteredPosts.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                gap: "2rem",
              }}
            >
              {regularPosts.map((post) => (
                <article
                  key={post.id}
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
                          width: "3rem",
                          height: "3rem",
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
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <div style={{ fontSize: "0.875rem" }}>
                        {t("blog.postImage", "Article Image")}
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "1.5rem" }}>
                    <div
                      style={{
                        background: "#eff6ff",
                        color: "#2563eb",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "9999px",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        display: "inline-block",
                        marginBottom: "1rem",
                        textTransform: "capitalize",
                      }}
                    >
                      {categories.find(cat => cat.id === post.category)?.name || post.category}
                    </div>
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "700",
                        color: "#171717",
                        marginBottom: "0.75rem",
                        lineHeight: "1.3",
                      }}
                    >
                      {post.title}
                    </h3>
                    <p
                      style={{
                        color: "#6b7280",
                        fontSize: "0.875rem",
                        lineHeight: "1.6",
                        marginBottom: "1rem",
                      }}
                    >
                      {post.excerpt}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: "0.75rem",
                        color: "#9ca3af",
                        marginBottom: "1rem",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div>{post.author}</div>
                        <div>•</div>
                        <div>{formatDate(post.date)}</div>
                      </div>
                      <div>{post.readTime} {t("blog.read", "read")}</div>
                    </div>
                    <Link
                      href={`/blog/${post.id}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "#22c55e",
                        textDecoration: "none",
                        fontWeight: "600",
                        fontSize: "0.875rem",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "#16a34a";
                        e.target.style.transform = "translateX(2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "#22c55e";
                        e.target.style.transform = "translateX(0)";
                      }}
                    >
                      {t("blog.readMore", "Read Article")}
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
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "4rem",
                background: "white",
                borderRadius: "1rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
              <svg
                style={{
                  width: "4rem",
                  height: "4rem",
                  color: "#d1d5db",
                  margin: "0 auto 1rem",
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "0.5rem",
                }}
              >
                {t("blog.noResults", "No articles found")}
              </h3>
              <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                {t("blog.noResultsDesc", "Try adjusting your search or category filter")}
              </p>
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <div
          style={{
            background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
            borderRadius: "1.5rem",
            padding: "3rem",
            textAlign: "center",
            color: "white",
            marginTop: "4rem",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              marginBottom: "1rem",
            }}
          >
            {t("blog.newsletter.title", "Stay Updated")}
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              marginBottom: "2rem",
              opacity: 0.9,
            }}
          >
            {t("blog.newsletter.subtitle", "Subscribe to our newsletter for the latest updates and insights")}
          </p>
          <div
            style={{
              maxWidth: "400px",
              margin: "0 auto",
              display: "flex",
              gap: "0.5rem",
            }}
          >
            <input
              type="email"
              placeholder={t("blog.newsletter.placeholder", "Enter your email")}
              style={{
                flex: 1,
                padding: "0.875rem",
                border: "none",
                borderRadius: "0.5rem",
                fontSize: "1rem",
                outline: "none",
              }}
            />
            <button
              style={{
                background: "white",
                color: "#22c55e",
                border: "none",
                padding: "0.875rem 1.5rem",
                borderRadius: "0.5rem",
                fontWeight: "600",
                cursor: "pointer",
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
              {t("blog.newsletter.subscribe", "Subscribe")}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
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
            {t("blog.backToHome", "Back to Home")}
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
        @media (max-width: 768px) {
          .grid-cols-2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BlogPage;
