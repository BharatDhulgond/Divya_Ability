// courses_script.js -- robust, DOM-ready, and safe

// Course data
const courses = [
  {
    id: 'c1',
    title: "Fundamental Analysis in Stock Marketing",
    description: "Learn the core principles of fundamental analysis in stocks.",
    price: 999,
    img: "./assets/fundamental.jpg",
  },
  {
    id: 'c2',
    title: "Technical Analysis in Stock Marketing",
    description: "Master technical analysis tools and charts to strategize trades.",
    price: 1499,
    img: "./assets/tech_analysisjpg.jpg",
  },
  {
    id: 'c3',
    title: "Fundamental and Technical Analysis in Stock Marketing",
    description: "Integrated course covering both fundamental and technical analysis.",
    price: 2299,
    img: "./assets/combo.jpg",
  },
  {
    id: 'c4',
    title: "Accessible Maths with LaTeX",
    description: "Learn accessible math typesetting using LaTeX for better academic writing.",
    price: 500,
    img: "./assets/latex.png",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  // read state from localStorage each time (keeps in sync if user logs in/out)
  function isLoggedIn() {
    return localStorage.getItem('loggedIn') === 'true';
  }

  function getPurchasedCourses() {
    try {
      return JSON.parse(localStorage.getItem('purchasedCourses') || '[]');
    } catch (e) {
      return [];
    }
  }

  function savePurchasedCourses(arr) {
    localStorage.setItem('purchasedCourses', JSON.stringify(arr));
  }

  const coursesListElem = document.querySelector(".courses-list");
  if (!coursesListElem) {
    // No place to render courses — fail gracefully
    console.warn("No .courses-list element found. Courses will not be rendered.");
    return;
  }

  // Render function
  function renderCourses() {
    const loggedIn = isLoggedIn();
    const purchasedCourses = getPurchasedCourses();

    coursesListElem.innerHTML = ''; // clear

    courses.forEach(course => {
      const hasPurchased = purchasedCourses.includes(course.id);
      const btnLabel = loggedIn ? (hasPurchased ? "Watch Now" : "Buy Now") : "Buy Now";
      const btnClass = hasPurchased ? 'watch-btn' : 'buy-btn';

      const card = document.createElement('article');
      card.className = 'course-card';
      card.innerHTML = `
        <div class="course-image" style="background-image:url('${course.img}');"></div>
        <div class="course-content">
          <h3 class="course-title">${course.title}</h3>
          <p class="course-description">${course.description}</p>
          <div class="course-price-buy">
            <span class="course-price">Rs. ${course.price}</span>
            <button class="course-btn ${btnClass}" data-id="${course.id}">${btnLabel}</button>
          </div>
        </div>
      `;

      coursesListElem.appendChild(card);
    });
  }
  // Helper to purchase a course
  function buyCourse(id) {
    if (!isLoggedIn()) {
      alert("Please login first to buy.");
      window.location.href = './login.html';
      return;
    }
    const purchasedCourses = getPurchasedCourses();
    if (purchasedCourses.includes(id)) {
      alert("You already purchased this course.");
      return;
    }
    purchasedCourses.push(id);
    savePurchasedCourses(purchasedCourses);
    alert("Course purchased successfully!");
    renderCourses();
  }
  function watchCourse(id) {
    alert(`Redirect to course content for ${id}`); // placeholder
  }
  // Delegate clicks from courses list
  coursesListElem.addEventListener("click", function (e) {
    const btn = e.target.closest("button.course-btn");
    if (!btn) return;

    const id = btn.dataset.id;
    if (!id) return;

    if (btn.classList.contains("buy-btn")) {
      buyCourse(id);
    } else if (btn.classList.contains("watch-btn")) {
      watchCourse(id);
    }
  });
  // Logout button handler (only attach if there's an element)
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('purchasedCourses'); // optional
      alert("Logged out successfully.");
      window.location.href = './login.html';
    });
  }
  // Initial render (always run)
  renderCourses();
});
