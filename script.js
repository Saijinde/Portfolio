// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
    // 1. Hero Animations
    const heroTl = gsap.timeline();

    heroTl.from(".hero-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    })
        .from(".hero-title", {
            y: 40,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out"
        }, "-=0.8")
        .from(".hero-tagline", {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8")
        .from(".hero-scroll-indicator", {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut"
        }, "-=0.5");

    // 2. About Section: Text Reveal (Scrubbing)
    const revealText = document.querySelector(".reveal-text");
    if (revealText) {
        const text = revealText.innerText;
        revealText.innerHTML = text.split(' ').map(word =>
            `<span class="word">${word}</span>`
        ).join(' ');

        gsap.to(".reveal-text .word", {
            color: "white",
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            scrollTrigger: {
                trigger: ".reveal-text",
                start: "top 80%",
                end: "bottom 30%",
                scrub: true,
            }
        });
    }

    // 3. Section Reveal: Fade and Slide Up
    const fadeUpElements = gsap.utils.toArray('.section-title, .skill-card, .project-item, .timeline-item');

    fadeUpElements.forEach((el) => {
        gsap.from(el, {
            y: 60,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // 4. Project Image Parallax
    const projectVisuals = gsap.utils.toArray('.project-visual');
    projectVisuals.forEach((visual) => {
        gsap.to(visual, {
            y: -30,
            scrollTrigger: {
                trigger: visual,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // 5. Navbar Color Change on Scroll
    ScrollTrigger.create({
        start: "top -50",
        onUpdate: (self) => {
            if (self.direction === 1) {
                gsap.to("#navbar", { backgroundColor: "rgba(0,0,0,0.9)", duration: 0.3 });
            } else {
                gsap.to("#navbar", { backgroundColor: "rgba(0,0,0,0.8)", duration: 0.3 });
            }
        }
    });

    // 6. Smooth Scroll for Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: target.offsetTop - 50,
                    ease: "power4.inOut"
                });
            }
        });
    });
});
