
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import {useEffect, useState } from "react";
import "./App.css";

const jobs = [
  {
    id: 1,
    company: "Stripe",
    role: "Frontend Developer",
    location: "Bengaluru, India",
    type: "Full-time",
    salary: "₹12–18 LPA",
    posted: "2 hours ago",
    color: "#635bff",
    logo: "S",
    tags: ["React", "TypeScript", "CSS"],
  },
  {
    id: 2,
    company: "Razorpay",
    role: "React.js Developer",
    location: "Remote, India",
    type: "Remote",
    salary: "₹10–16 LPA",
    posted: "5 hours ago",
    color: "#1686ff",
    logo: "R",
    tags: ["React", "JavaScript", "REST API"],
  },
  {
    id: 3,
    company: "Postman",
    role: "Associate Software Engineer",
    location: "Bengaluru, India",
    type: "Full-time",
    salary: "₹8–14 LPA",
    posted: "1 day ago",
    color: "#ff6c37",
    logo: "P",
    tags: ["JavaScript", "React", "Git"],
  },
  {
    id: 4,
    company: "Freshworks",
    role: "Frontend Engineer Intern",
    location: "Chennai, India",
    type: "Internship",
    salary: "₹25k–40k/month",
    posted: "1 day ago",
    color: "#16a085",
    logo: "F",
    tags: ["HTML", "CSS", "React"],
  },
];

function JobDetails({ jobs }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const job = jobs.find((item) => item.id === Number(id));

  if (!job) {
    return (
      <main className="job-details-page">
        <h2>Job not found</h2>
        <p>This job may no longer be available.</p>
        <button onClick={() => navigate("/")}>
          Back to jobs
        </button>
      </main>
    );
  }

  return (
    <main className="job-details-page">
      <button
        className="back-button"
        onClick={() => navigate("/")}
      >
        ← Back to jobs
      </button>

      <section className="details-card">
        <div
          className="company-logo"
          style={{ 
            "--logo-color": job.color,
            backgroundColor: "#e8e9ff"
          }}
        >
          {job.logo}
        </div>

        <p className="company-name">{job.company}</p>

        <h1>{job.role}</h1>

        <div className="job-meta">
          <span>⌖ {job.location}</span>
          <span>◷ {job.type}</span>
          <span>₹ {job.salary}</span>
        </div>

        <div className="job-tags">
          {job.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <hr />

        <h2>About this role</h2>
        <p>
          Join {job.company} as a {job.role}. This opportunity is
          suited to candidates interested in building reliable,
          user-focused software and collaborating with an
          engineering team.
        </p>

        <h2>Skills</h2>
        <ul>
          {job.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <h2>Role information</h2>
        <p>
          <strong>Location:</strong> {job.location}
        </p>
        <p>
          <strong>Employment type:</strong> {job.type}
        </p>
        <p>
          <strong>Listed salary:</strong> {job.salary}
        </p>

        <p className="demo-notice">
          Portfolio demonstration: this listing is sample data,
          not a verified vacancy.
        </p>
      </section>
    </main>
  );
}

function HomePage() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("All");
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem("freshhire-bookmarks");
      return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
        }
      });
    useEffect(() => {
      localStorage.setItem(
        "freshhire-bookmarks",
        JSON.stringify(bookmarks)
      );
    }, [bookmarks]);
  const [showSaved, setShowSaved] = useState(false);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
    `${job.role} ${job.company} ${job.location} ${job.type} ${job.tags.join(" ")}`
    .toLowerCase()
    .includes(search.toLowerCase());

    const normalizedLocation = location.trim().toLowerCase();
    const matchesLocation =
    !normalizedLocation ||
    job.location.toLowerCase().includes(normalizedLocation) ||
    (normalizedLocation === "remote" && `${job.type} ${job.tags.join(" ")}`.toLowerCase().includes("remote"));

    const matchesType =
      jobType === "All" || job.type === jobType;

    const matchesSaved =
      !showSaved || bookmarks.includes(job.id);

    return (
      matchesSearch &&
      matchesLocation &&
      matchesType &&
      matchesSaved
    );
  });

  function toggleBookmark(id) {
    setBookmarks((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-icon">f</span>
          freshhire<span className="brand-dot">.</span>
        </a>

        <nav className="nav-links">
          <a href="#jobs">Find jobs</a>
          <a href="#about">About</a>
        </nav>

        <button
          className={`saved-button ${showSaved ? "active" : ""}`}
          onClick={() => setShowSaved(!showSaved)}
        >
          ♡ Saved ({bookmarks.length})
        </button>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-badge">
            <span className="live-dot"></span>
            YOUR NEXT OPPORTUNITY STARTS HERE
          </div>

          <h1>
            Find work that
            <br />
            <span>moves you forward.</span>
          </h1>

          <p className="hero-description">
            Discover opportunities that match your skills,
            ambitions, and the future you want to build.
          </p>

          <div className="search-panel">
            <label className="search-field">
              <span>⌕</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Job title, company, or skill"
              />
            </label>

            <div className="search-divider"></div>

            <label className="search-field location-field">
              <span>⌖</span>
              <input
                value={location}
                onChange={(event) =>
                  setLocation(event.target.value)
                }
                placeholder="Location"
              />
            </label>

            <button
              className="search-button"
              onClick={() =>
                document
                  .getElementById("jobs")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Search jobs →
            </button>
          </div>

          <div className="popular-searches">
            <span>Popular:</span>
            {["React", "Frontend", "JavaScript", "Remote"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => {
                    setSearch(item);
                    setShowSaved(false);
                  }}
                >
                  {item}
                </button>
              )
            )}
          </div>

          <div className="hero-stats">
            <div>
              <strong>Find your fit</strong>
              <span>Search by skills</span>
            </div>
            <div>
              <strong>Stay organized</strong>
              <span>Save your favourites</span>
            </div>
            <div>
              <strong>Move faster</strong>
              <span>Explore opportunities</span>
            </div>
          </div>
        </section>

        <section className="jobs-section" id="jobs">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">
                OPPORTUNITIES FOR YOU
              </span>
              <h2>
                {showSaved ? "Your saved jobs" : "Explore open roles"}
              </h2>
              <p>
                {filteredJobs.length} opportunities matching your
                search
              </p>
            </div>

            <select
              className="job-filter"
              value={jobType}
              onChange={(event) => setJobType(event.target.value)}
              aria-label="Filter by job type"
            >
              <option value="All">All job types</option>
              <option value="Full-time">Full-time</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div className="job-list">
            {filteredJobs.map((job) => (
              <article className="job-card" key={job.id}>
                <div
                  className="company-logo"
                 style={{
                  "--logo-color": job.color,
                  background: "#e8e9ff",
                  color: job.color}}
                >
                  {job.logo}
                </div>

                <div className="job-details">
                  <div className="company-name">
                    {job.company}
                    <span className="verified">✓</span>
                    <span className="posted">{job.posted}</span>
                  </div>

                  <h3>{job.role}</h3>

                  <div className="job-meta">
                    <span>⌖ {job.location}</span>
                    <span>◷ {job.type}</span>
                    <span>₹ {job.salary}</span>
                  </div>

                  <div className="job-tags">
                    {job.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="job-actions">
                  <button
                    className={`bookmark-button ${
                      bookmarks.includes(job.id) ? "bookmarked" : ""
                    }`}
                    onClick={() => toggleBookmark(job.id)}
                    aria-label={`${
                      bookmarks.includes(job.id) ? "Remove" : "Save"
                    } ${job.role}`}
                  >
                    {bookmarks.includes(job.id) ? "♥" : "♡"}
                  </button>

                  <button
                    className="apply-button"
                    onClick={() =>
                      navigate(`/jobs/${job.id}`)
                    }
                  >
                    View role ↗
                  </button>
                </div>
              </article>
            ))}

            {filteredJobs.length === 0 && (
              <div className="empty-state">
                <span>⌕</span>
                <h3>No matching jobs found</h3>
                <p>
                  Try another keyword, location, or job type.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setLocation("");
                    setJobType("All");
                    setShowSaved(false);
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="bottom-cta" id="about">
          <div>
            <span>YOUR CAREER, YOUR NEXT CHAPTER</span>
            <h2>Good things start with a search.</h2>
            <p>
              Find a role where your skills can make a difference.
            </p>
          </div>
          <a href="#home">Back to top ↑</a>
        </section>
      </main>

      <footer className="footer">
        <a className="brand" href="#home">
          <span className="brand-icon">f</span>
          freshhire<span className="brand-dot">.</span>
        </a>
        <span>A portfolio project built with React.</span>
        <span>© 2026 FreshHire Demo</span>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/jobs/:id"
        element={<JobDetails jobs={jobs} />}
      />
    </Routes>
  );
}

export default App;