// Trending Items Example Content
const trendingItems = [
  "Assistive technology – new solutions for everyday learning",
  "Inclusion in action: stories from our webinars",
  "Young leaders making change in their communities",
  "Accessible exams: Book a Scribe – now open across India"
];

// Testimonials Example Content (top 3)
const testimonials = [
  {
    quote: "DivyaAbility helped me find confidence and community. I can now approach every challenge with a new mindset.",
    author: "Shivani, Student — Uttar Pradesh"
  },
  {
    quote: "I found the scribe booking service very reliable. It made my entrance exams so much easier.",
    author: "Anil, Learner — Tamil Nadu"
  },
  {
    quote: "The webinars opened doors. Hearing real stories gave me courage to become a mentor for others.",
    author: "Neha, Volunteer — Mumbai"
  }
];

// Populate Trending
const trendingDiv = document.getElementById('trending-items');
trendingItems.forEach(item => {
  const div = document.createElement('div');
  div.className = 'trending-item';
  div.textContent = item;
  trendingDiv.appendChild(div);
});

// Populate Testimonials
const testimonialDiv = document.getElementById('testimonial-list');
testimonials.forEach(t => {
  const div = document.createElement('div');
  div.className = 'testimonial-card';
  div.innerHTML = `<div class="testimonial-quote">“${t.quote}”</div>
                   <div class="testimonial-author">— ${t.author}</div>`;
  testimonialDiv.appendChild(div);
});

//for search bar to make it working
document.addEventListener("DOMContentLoaded", function () {
  var searchForm = document.getElementById("site-search-form");
  var searchInput = document.getElementById("site-search");

  // Map keywords to corresponding section ids
  var sectionMap = {
    about: "#about",
    impact: "#impact",
    scholarship: "#scholarships",
    scholarships: "#scholarships",
    webinar: "#webinars",
    webinars: "#webinars",
    service: "#services",
    services: "#services",
    contact: "#contact",
    testimonial: "#testimonials",
    testimonials: "#testimonials",
    trending: "#trending"
  };

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var query = searchInput.value.trim().toLowerCase();

      // Try exact match first
      if (sectionMap[query]) {
        document.querySelector(sectionMap[query]).scrollIntoView({ behavior: "smooth" });
        return;
      }
      // Try to match any keyword contained in the query
      for (var keyword in sectionMap) {
        if (query.includes(keyword)) {
          document.querySelector(sectionMap[keyword]).scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
      alert("Section not found, please try another keyword.");
    });
  }
});
