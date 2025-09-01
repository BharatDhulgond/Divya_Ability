document.addEventListener("DOMContentLoaded", function() {

const slides = document.querySelectorAll(".slide");
const slidesContainer = document.getElementById("slides");
let index = 0;
let startX = 0;
let autoSlide;

function updateImages() {
  const isMobile = window.innerWidth <= 768;
  slides.forEach((slide) => {
    const img = slide.querySelector("img");
    const src = isMobile ? slide.dataset.imgMobile : slide.dataset.imgDesktop;
    img.src = src;
  });
}

function showSlide(i) {
  index = (i + slides.length) % slides.length; // wrap-around index
  slidesContainer.style.transform = `translateX(-${index * 100}%)`;
}


function startAutoSlide() {
  autoSlide = setInterval(() => {
    showSlide(index + 1); // always go to next slide, wraps via modulo in showSlide
  }, 2000);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

function resetAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}


// Initialize images and show first slide
updateImages();
showSlide(0);
startAutoSlide();

document.getElementById("next").addEventListener("click", () => {
  showSlide(index + 1);
  resetAutoSlide();
});

document.getElementById("prev").addEventListener("click", () => {
  showSlide(index - 1);
  resetAutoSlide();
});


// Touch events for swipe
slidesContainer.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

slidesContainer.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50 && index < slides.length - 1) {
    showSlide(index + 1);
    resetAutoSlide();
  } else if (endX - startX > 50 && index > 0) {
    showSlide(index - 1);
    resetAutoSlide();
  }
});

// Read more / card open-close with auto-slide pause/resume
slides.forEach((slide) => {
  const readMore = slide.querySelector(".read-more");
  const card = slide.querySelector(".card");
  const closeBtn = slide.querySelector(".close-card");

  readMore.addEventListener("click", (e) => {
    e.preventDefault();
    card.style.display = "flex"; // show overlay
    stopAutoSlide(); // pause slideshow
  });

  closeBtn.addEventListener("click", () => {
    card.style.display = "none"; // hide overlay
    resetAutoSlide(); // resume slideshow
  });
});

// Update images on window resize
window.addEventListener("resize", () => {
  updateImages();
});


});
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

// Trending Items Example Content
const trendingItems = [
  "Assistive technology – new solutions for everyday learning",
  "Inclusion in action: stories from our webinars",
  "Young leaders making change in their communities",
  "Accessible exams: Book a Scribe – now open across India"
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

// parallax
$(document).ready(function() {
	const $cont = $('.cont');
	const $slider = $('.slider');
	const $nav = $('.nav');
	const winW = $(window).width();
	const animSpd = 750; // Change also in CSS
	const distOfLetGo = winW * 0.2;
	let curSlide = 1;
	let animation = false;
	let autoScrollVar = true;
	let diff = 0;
	
	// Generating slides
	let arrCities = ['Amsterdam', 'Rome', 'New—York', 'Singapore', 'Prague']; // Change number of slides in CSS also
	let numOfCities = arrCities.length;
	let arrCitiesDivided = [];

	arrCities.map((city) => {
		let length = city.length;
		let letters = Math.floor(length / 4);
		let exp = new RegExp(".{1," + letters + "}", "g");
		
		arrCitiesDivided.push(city.match(exp));
	});
	
	let generateSlide = function(city) {
		let frag1 = $(document.createDocumentFragment());
		let frag2 = $(document.createDocumentFragment());
		const numSlide = arrCities.indexOf(arrCities[city]) + 1;
		const firstLetter = arrCitiesDivided[city][0].charAt(0);

		const $slide =
					$(`<div data-target="${numSlide}" class="slide slide--${numSlide}">
							<div class="slide__darkbg slide--${numSlide}__darkbg"></div>
							<div class="slide__text-wrapper slide--${numSlide}__text-wrapper"></div>
						</div>`);

		const letter = 
					$(`<div class="slide__letter slide--${numSlide}__letter">
							${firstLetter}
						</div>`);

		for (let i = 0, length = arrCitiesDivided[city].length; i < length; i++) {
			const text = 
						$(`<div class="slide__text slide__text--${i + 1}">
								${arrCitiesDivided[city][i]}
							</div>`);
			frag1.append(text);
		}

		const navSlide = $(`<li data-target="${numSlide}" class="nav__slide nav__slide--${numSlide}"></li>`);
		frag2.append(navSlide);
		$nav.append(frag2);

		$slide.find(`.slide--${numSlide}__text-wrapper`).append(letter).append(frag1);
		$slider.append($slide);

		if (arrCities[city].length <= 4) {
			$('.slide--'+ numSlide).find('.slide__text').css("font-size", "12vw");
		}
	};

	for (let i = 0, length = numOfCities; i < length; i++) {
		generateSlide(i);
	}

	$('.nav__slide--1').addClass('nav-active');

	// Navigation
	function bullets(dir) {
		$('.nav__slide--' + curSlide).removeClass('nav-active');
		$('.nav__slide--' + dir).addClass('nav-active');
	}
	
	function timeout() {
		animation = false;
	}
	
	function pagination(direction) {
		animation = true;
		diff = 0;
		$slider.addClass('animation');
		$slider.css({
			'transform': 'translate3d(-' + ((curSlide - direction) * 100) + '%, 0, 0)'
		});
		
		$slider.find('.slide__darkbg').css({
				'transform': 'translate3d(' + ((curSlide - direction) * 50) + '%, 0, 0)'
		});
		
		$slider.find('.slide__letter').css({
				'transform': 'translate3d(0, 0, 0)',
		});
		
		$slider.find('.slide__text').css({
			'transform': 'translate3d(0, 0, 0)'
		});
	}
	
	function navigateRight() {
		if (!autoScrollVar) return;
		if (curSlide >= numOfCities) return;
		pagination(0);
		setTimeout(timeout, animSpd);
		bullets(curSlide + 1);
		curSlide++;
	}
	
	function navigateLeft() {
		if (curSlide <= 1) return;
		pagination(2);
		setTimeout(timeout, animSpd);
		bullets(curSlide - 1);
		curSlide--;
	}

	function toDefault() {
		pagination(1);
		setTimeout(timeout, animSpd);
	}
	
	// Events
	$(document).on('mousedown touchstart', '.slide', function(e) {
		if (animation) return;
		let target = +$(this).attr('data-target');
		let startX = e.pageX || e.originalEvent.touches[0].pageX;
		$slider.removeClass('animation');
		
		$(document).on('mousemove touchmove', function(e) {
			let x = e.pageX || e.originalEvent.touches[0].pageX;
			diff = startX - x;
			if (target === 1 && diff < 0 || target === numOfCities && diff > 0) return;
			
			$slider.css({
				'transform': 'translate3d(-' + ((curSlide - 1) * 100 + (diff / 30)) + '%, 0, 0)'
			});
			
			$slider.find('.slide__darkbg').css({
				'transform': 'translate3d(' + ((curSlide - 1) * 50 + (diff / 60)) + '%, 0, 0)'
			});
			
			$slider.find('.slide__letter').css({
				'transform': 'translate3d(' +  (diff / 60) + 'vw, 0, 0)',
			});
			
			$slider.find('.slide__text').css({
				'transform': 'translate3d(' + (diff / 15) + 'px, 0, 0)'
			});
		})	
	})
	
	$(document).on('mouseup touchend', function(e) {
		$(document).off('mousemove touchmove');
		
		if (animation) return;
		
		if (diff >= distOfLetGo) {
			navigateRight();
		} else if (diff <= -distOfLetGo) {
			navigateLeft();
		} else {
			toDefault();
		}
	});
	
	$(document).on('click', '.nav__slide:not(.nav-active)', function() {
		let target = +$(this).attr('data-target');
		bullets(target);
		curSlide = target;
		pagination(1);
	});	
	
	$(document).on('click', '.side-nav', function() {
		let target = $(this).attr('data-target');
		
		if (target === 'right') navigateRight();
		if (target === 'left') navigateLeft();
	});
	
	$(document).on('keydown', function(e) {
		if (e.which === 39) navigateRight();
		if (e.which === 37) navigateLeft();
	});
	
	$(document).on('mousewheel DOMMouseScroll', function(e) {
		if (animation) return;
    let delta = e.originalEvent.wheelDelta;
		
    if (delta > 0 || e.originalEvent.detail < 0) navigateLeft();
	 	if (delta < 0 || e.originalEvent.detail > 0) navigateRight();
  });
});

// parallax
