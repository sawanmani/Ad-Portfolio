import React, { useState } from "react";

const servicesData = [
  {
    title: "UI/UX",
    desc: "Creating intuitive and visually appealing designs that enhance user experience.",
  },
  {
    title: "Web Design",
    desc: "Designing responsive and engaging websites tailored to user needs.",
  },
  {
    title: "Web Developer",
    desc: "Crafting seamless and user-friendly web interfaces.",
  },
  {
    title: "Prompt Engineering",
    desc: "Have certifications from Google & LinkedIn with hands-on-experience",
  },
];

const projectsData = [
  {
    title: "Alumni Data Control",
    desc: "Creating intuitive and visually appealing designs that enhance user experience.",
    label: "App Design",
    img: "Screenshot 2025-11-10 184602.png",
  },
  {
    title: "Alumni Data Control",
    desc: "Creating intuitive and visually appealing designs that enhance user experience.",
    label: "App Design",
    img: "Screenshot 2025-11-10 184624.png",
  },
  {
    title: "Alumni Data Control",
    desc: "Designing intuitive and visually engaging websites that elevate user experiences.",
    label: "Web Design",
    img: "Screenshot 2025-11-10 184652.png",
  },
];

const testimonialsData = [
  {
    text: "Adarsh did an amazing job designing a user-friendly and intuitive experience for our project. Her attention to detail and creativity made a huge difference!",
    author: "Feku",
    role: "CEO",
    img: "c7c06be1-1cc4-4619-97df-a1fe561ba4cc.jpg",
  },
  {
    text: "Adarsh did an amazing job designing a user-friendly and intuitive experience for our project. Her attention to detail and creativity made a huge difference!",
    author: "Joker",
    role: "CEO",
    img: "image (10).jpg",
  },
];

export default function Portfolio() {
  const [serviceIndex, setServiceIndex] = useState(1); // Default active service: Web Design
  const [projectIndex, setProjectIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Handlers for service selection
  const selectService = (i) => setServiceIndex(i);
  const prevService = () =>
    setServiceIndex((prev) => (prev === 0 ? servicesData.length - 1 : prev - 1));
  const nextService = () =>
    setServiceIndex((prev) => (prev === servicesData.length - 1 ? 0 : prev + 1));

  // Handlers for project carousel
  const prevProject = () =>
    setProjectIndex((prev) => (prev === 0 ? projectsData.length - 1 : prev - 1));
  const nextProject = () =>
    setProjectIndex((prev) => (prev === projectsData.length - 1 ? 0 : prev + 1));

  // Handlers for testimonial carousel
  const prevTestimonial = () =>
    setTestimonialIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  const nextTestimonial = () =>
    setTestimonialIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! Thank you!");
    e.target.reset();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Pacifico&display=swap');

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #1a0029;
          color: #eee;
          font-family: 'Poppins', sans-serif;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        main {
          width: 100%;
          max-width: 1080px;
          padding: 2rem 1rem 6rem;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        h1,h2,h3 {
          margin: 0 0 0.6rem 0;
        }

        h1 {
          font-size: 2.8rem;
          font-weight: 700;
          color: #ff67fa;
          text-align: center;
          font-family: 'Pacifico', cursive;
          text-shadow: 0 0 10px #d81ef7;
        }

        h2 {
          font-family: 'Pacifico', cursive;
          font-size: 2.2rem;
          color: #d81ef7;
          margin-top: 4rem;
          margin-bottom: 1rem;
          text-align: center;
          text-shadow: 0 0 8px #d81ef7;
        }

        p, small {
          color: #ccc;
          text-align: center;
          max-width: 680px;
          line-height: 1.5;
        }

        /* Hero Section */
        .hero {
          width: 100%;
          background: linear-gradient(135deg, #2e003e 0%, #49006f 100%);
          border-radius: 24px;
          box-shadow: 0 0 50px #d81ef7aa;
          padding: 3rem 2rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .hero-text {
          flex: 1 1 320px;
          max-width: 420px;
          color: #fff;
        }

        .hero-text small {
          color: #ff58f0;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .hero-text strong {
          font-size: 2rem;
          color: #ff67fa;
          display: block;
          margin-top: 0.5rem;
        }

        .hero-text p {
          margin-top: 1rem;
          font-size: 1.05rem;
        }

        .btn-group {
          margin-top: 2rem;
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .btn-primary, .btn-secondary {
          cursor: pointer;
          border: none;
          outline: none;
          padding: 0.6rem 1.8rem;
          border-radius: 30px;
          font-weight: 700;
          font-size: 1rem;
          user-select: none;
          transition: background-color 0.3s ease;
        }

        .btn-primary {
          background: #d81ef7;
          color: white;
          box-shadow: 0 0 14px #d81ef7;
        }

        .btn-primary:hover {
          background: #a214b2;
        }

        .btn-secondary {
          background: transparent;
          border: 2px solid #d81ef7;
          color: #d81ef7;
        }

        .btn-secondary:hover {
          background: #d81ef7;
          color: white;
        }

        /* Hero Avatar */
        .hero-avatar {
          flex: 0 0 320px;
          border-radius: 30px;
          padding: 0.6rem;
          background: linear-gradient(135deg, #52008a, #a614d1);
          box-shadow: 0 0 25px #d81ef7;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-avatar img {
          width: 280px;
          border-radius: 25px;
          user-select: none;
          pointer-events: none;
          filter: drop-shadow(0 0 12px #d81ef7);
        }

        /* About Me */
        .about {
          background: #31004b;
          border-radius: 30px;
          padding: 2.5rem 2rem;
          box-shadow: 0 0 35px #d81ef7;
          max-width: 900px;
          margin-bottom: 4rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2.5rem;
          color: #ccc;
        }

        .about-text {
          flex: 1 1 450px;
          max-width: 460px;
        }

        .about-text p {
          text-align: justify;
          line-height: 1.5;
        }

        .about-avatar {
          flex: 0 0 210px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 0 30px #d81ef7;
          user-select: none;
        }

        .about-avatar img {
          width: 100%;
          display: block;
          border-radius: 50%;
        }

        .skills {
          display: flex;
          gap: 0.8rem;
          margin-top: 1rem;
          justify-content: flex-start;
          flex-wrap: wrap;
        }

        .skill {
          background: #52008a;
          padding: 0.4rem 1rem;
          border-radius: 22px;
          font-weight: 700;
          color: #d81ef7;
          box-shadow: 0 0 15px #d81ef7;
          user-select: none;
          font-size: 0.9rem;
        }

        /* Services */
        .services {
          width: 100%;
          margin-bottom: 4rem;
          text-align: center;
        }

        .service-list {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          max-width: 900px;
          margin: 1.5rem auto 0;
        }

        .service-card {
          background: #31004b;
          padding: 1.4rem 1.6rem;
          border-radius: 22px;
          width: 210px;
          box-shadow: 0 0 12px #9200b8;
          cursor: pointer;
          transition: background 0.3s ease, box-shadow 0.3s ease;
          color: #a99bd9;
          display: flex;
          flex-direction: column;
          font-weight: 600;
        }

        .service-card.active,
        .service-card:hover,
        .service-card:focus-visible {
          background: #d81ef7;
          color: #fff;
          box-shadow: 0 0 22px #d81ef7;
          outline: none;
        }

        /* Projects */
        .projects {
          width: 100%;
          margin-bottom: 5rem;
          text-align: center;
        }

        .projects-desc {
          margin-bottom: 2rem;
          color: #bda9ea;
        }

        .project-carousel {
          display: flex;
          gap: 1rem;
          justify-content: center;
          overflow-x: auto;
          padding-bottom: 1rem;
          scroll-behavior: smooth;
        }

        .project-card {
          background: #32004a;
          border-radius: 22px;
          width: 40rem;
          box-shadow: 0 0 20px #b895ed;
          flex-shrink: 0;
          cursor: pointer;
          color: #ddd;
          user-select: none;
          display: flex;
          flex-direction: column;
          transition: transform 0.4s ease;
        }

        .project-card.active,
        .project-card:hover {
          box-shadow: 0 0 30px #d81ef7;
          transform: scale(1.05);
        }

        .project-card img {
          width: 100%;
          border-radius: 22px 22px 0 0;
          // aspect-ratio: 12;
          object-fit: cover;
        }

        .project-info {
          padding: 1rem 1.3rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .project-info h3 {
          margin-bottom: 0.3rem;
          color: #d81ef7;
          font-weight: 700;
        }

        .project-info p {
          color: #c7a1ea;
          font-size: 0.9rem;
          flex-grow: 1;
        }

        .project-tag {
          background: #d81ef7;
          color: white;
          border-radius: 20px;
          padding: 0.3rem 1rem;
          font-size: 0.8rem;
          margin-top: 0.9rem;
          user-select: none;
          align-self: flex-start;
          box-shadow: 0 0 12px #d81ef7;
        }

        .carousel-btn {
          background: transparent;
          border: 2px solid #d81ef7;
          color: #d81ef7;
          font-weight: 700;
          font-size: 1.6rem;
          padding: 0.2rem 0.7rem;
          border-radius: 50%;
          cursor: pointer;
          transition: background-color 0.3s ease;
          user-select: none;
          align-self: center;
        }

        .carousel-btn:hover,
        .carousel-btn:focus-visible {
          background: #d81ef7;
          color: #42006e;
          outline: none;
        }

        /* Testimonials */
        .testimonials {
          width: 100%;
          margin-bottom: 6rem;
          text-align: center;
          max-width: 640px;
        }

        .testimonial-card {
          background: #31004b;
          padding: 2rem 1.8rem;
          border-radius: 30px;
          box-shadow: 0 0 35px #d81ef7;
          color: #ddd;
          user-select: none;
          position: relative;
        }

        .testimonial-text {
          font-style: italic;
          font-size: 1.15rem;
          margin-bottom: 1.5rem;
          line-height: 1.6;
          position: relative;
          padding-left: 30px;
          color: #caadf2;
        }

        .testimonial-text::before {
          content: "“";
          font-size: 4rem;
          position: absolute;
          left: 0;
          top: -15px;
          color: #d81ef7;
          opacity: 0.6;
        }

        .testimonial-author {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .testimonial-author img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          box-shadow: 0 0 20px #d81ef7;
          object-fit: cover;
          user-select: none;
        }

        .testimonial-author .name {
          color: #ffb1fa;
          font-weight: 700;
          font-size: 1.1rem;
        }

        .testimonial-author .role {
          color: #b993e5;
          font-size: 0.85rem;
          user-select: none;
        }

        .testi-controls {
          margin-top: 1.5rem;
          display: flex;
          justify-content: center;
          gap: 1.2rem;
        }

        /* Contact Section */
        .contact {
          width: 100%;
          max-width: 600px;
          background: #320054;
          padding: 3rem 2rem 4rem;
          border-radius: 30px;
          box-shadow: 0 0 45px #d81ef7;
          color: #e4cdf7;
          user-select: none;
          text-align: center;
        }

        .contact h2 {
          font-family: 'Pacifico', cursive;
          font-size: 2.6rem;
          margin-bottom: 2.4rem;
          color: #ff67fa;
          letter-spacing: 0.4px;
          filter: drop-shadow(0 0 15px #d81ef7);
        }

        .contact form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          text-align: left;
        }

        .contact label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.4rem;
          color: #efa9fa;
          user-select: none;
          font-size: 0.9rem;
        }

        .contact input,
        .contact textarea {
          padding: 0.8rem 1.2rem;
          border-radius: 24px;
          border: 1px solid #6139ae;
          background: transparent;
          color: #f0d1fe;
          font-size: 1rem;
          font-family: 'Poppins', sans-serif;
          resize: none;
          transition: border-color 0.3s ease;
        }

        .contact input::placeholder,
        .contact textarea::placeholder {
          color: #b494d9;
        }

        .contact input:focus,
        .contact textarea:focus {
          outline: none;
          border-color: #ff67fa;
          background: #48117f;
          box-shadow: 0 0 15px #d81ef7;
        }

        .contact button {
          margin-top: 1rem;
          cursor: pointer;
          background: #d81ef7;
          color: white;
          font-weight: 700;
          padding: 0.8rem 2rem;
          font-size: 1.1rem;
          border-radius: 40px;
          border: none;
          box-shadow: 0 0 20px #d81ef7;
          transition: background-color 0.3s ease;
          user-select: none;
        }

        .contact button:hover,
        .contact button:focus-visible {
          background: #a217b2;
          outline: none;
        }

        /* Footer */
        footer {
          font-family: 'Pacifico', cursive;
          font-size: 1.6rem;
          color: #d81ef7;
          margin: 3rem 0 2rem;
          text-align: center;
          user-select: none;
          filter: drop-shadow(0 0 15px #d81ef7);
        }

        /* Responsive */
        @media (max-width: 900px) {
          .hero {
            flex-direction: column;
          }
          .hero-text, .hero-avatar {
            max-width: 100%;
            flex: none;
          }
          .about {
            flex-direction: column;
          }
          .about-text {
            max-width: 100%;
          }
          .about-avatar {
            margin-bottom: 1.6rem;
            align-self: center;
          }
          .service-list {
            justify-content: center;
          }
          .project-carousel {
            overflow-x: auto;
            padding: 0 1rem;
          }
        }

        @media (max-width: 450px) {
          h1 {
            font-size: 2rem;
          }
          .contact h2 {
            font-size: 2rem;
          }
          .btn-group {
            justify-content: center;
          }
        }
      `}</style>

      <main>
        {/* Hero Section */}
        <section className="hero" aria-label="Introduction Section">
          <div className="hero-text">
            <small>WELCOME TO MY WORLD <span>🌟</span></small>
            <h1>
              Hi, I'm <br /><span>Adarsh Mani Tripathi</span>
              <strong>Web Developer</strong>
            </h1>
            <p>
              Passionate UI/UX designer. I create intuitive and visually appealing digital experiences.
            </p>
            <div className="btn-group" role="group" aria-label="Call to actions">
              <button className="btn-primary" onClick={() => alert("My Projects clicked")}>My Projects</button>
              <button className="btn-secondary" onClick={() => alert("Download CV clicked")}>Download CV</button>
            </div>
          </div>
          <div className="hero-avatar" aria-label="Sara Howari avatar">
            <img src="Me.jpg" alt="Adarsh 3D avatar" />
          </div>
        </section>

        {/* About Me */}
        <section className="about" aria-labelledby="about-title">
          <div className="about-text">
            <h2 id="about-title">About Me</h2>
            <p>
              Welcome to my portfolio! I'm Adarsh Mani Tripathi, a passionate UI/UX designer dedicated to creating seamless and visually engaging digital experiences. I specialize in designing intuitive interfaces that drive user satisfaction.
            </p>
            <p>
              My skills include "Figma", "Web Development", "Gen-AI", "Tableau", "Prompt-Engineering", ensuring each design is both aesthetically pleasing and functionally efficient.
            </p>
            <div className="skills" aria-label="Skills list">
              {["Figma", "Web Development", "Gen-AI", "Tableau", "Prompt-Engineering"].map((skill) => (
                <span className="skill" key={skill}>{skill}</span>
              ))}
            </div>
          </div>
          <div className="about-avatar" aria-hidden="true">
            <img height={460} src="Me.jpg" alt="Adarsh Mani Tripathi" />
          </div>
        </section>

        {/* Services */}
        <section className="services" aria-labelledby="services-title">
          <h2 id="services-title">Services</h2>
          <p>Transforming ideas into intuitive digital experiences</p>
          <div className="service-list" role="list">
            {servicesData.map((service, i) => (
              <div
                key={service.title}
                className={`service-card ${i === serviceIndex ? "active" : ""}`}
                tabIndex={0}
                role="listitem"
                aria-selected={i === serviceIndex}
                onClick={() => selectService(i)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectService(i); } }}
              >
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="projects" aria-labelledby="projects-title">
          <h2 id="projects-title">My Projects</h2>
          <p className="projects-desc">
            Discover the projects that showcase my passion for design and innovation.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: '1rem' }}>
            <button aria-label="Previous Project" className="carousel-btn" onClick={prevProject}>&#8249;</button>
            <div className="project-carousel" aria-label="Project carousel" role="list" style={{flex:1, display:"flex", overflow:"hidden"}}>
              {projectsData.map((project, i) => (
                <div
                  key={project.title}
                  className={`project-card ${i === projectIndex ? "active" : ""}`}
                  tabIndex={i === projectIndex ? 0 : -1}
                  role="listitem"
                  aria-hidden={i !== projectIndex}
                  aria-label={`${project.title} project`}
                  style={{ display: i === projectIndex ? "flex" : "none" }}
                  onClick={() => setProjectIndex(i)}
                >
                  <img src={project.img} alt={project.title} loading="lazy" />
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>{project.desc}</p>
                    <span className="project-tag">{project.label}</span>
                  </div>
                </div>
              ))}
            </div>
            <button aria-label="Next Project" className="carousel-btn" onClick={nextProject}>&#8250;</button>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials" aria-labelledby="testimonials-title">
          <h2 id="testimonials-title">Testimonials</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "center" }}>
            <button aria-label="Previous Testimonial" className="carousel-btn" onClick={prevTestimonial}>&#8249;</button>
            {testimonialsData.map((testi, i) =>
              i === testimonialIndex ? (
                <article
                  key={i}
                  className="testimonial-card"
                  role="listitem"
                  tabIndex={0}
                  aria-label={`Testimonial by ${testi.author}, ${testi.role}`}
                >
                  <p className="testimonial-text">"{testi.text}"</p>
                  <div className="testimonial-author">
                    <img src={testi.img} alt={`${testi.author} avatar`} loading="lazy" />
                    <div>
                      <p className="name">{testi.author}</p>
                      <p className="role">{testi.role}</p>
                    </div>
                  </div>
                </article>
              ) : null
            )}
            <button aria-label="Next Testimonial" className="carousel-btn" onClick={nextTestimonial}>&#8250;</button>
          </div>
        </section>

        {/* Contact */}
        <section className="contact" aria-labelledby="contact-title">
          <h2 id="contact-title">Let's Create Something Amazing Together</h2>
          <form onSubmit={handleFormSubmit} aria-label="Contact form">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" placeholder="Name" required aria-required="true" />
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" placeholder="Enter your email" required aria-required="true" />
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Enter message" rows={4} required aria-required="true" />
            <button type="submit" className="btn-primary">Send Message</button>
          </form>
        </section>

        {/* Footer */}
        <footer>Thanks for watching ✨</footer>
      </main>
    </>
  );
}