(() => {

  "use strict";


  /* ================= HELPERS ================= */

  const $ = (
    selector,
    root = document
  ) => root.querySelector(selector);


  const $$ = (
    selector,
    root = document
  ) => [
    ...root.querySelectorAll(selector)
  ];



  /* ================= ELEMENTS ================= */

  const progress = $("#progress");

  const header = $("#header");

  const mobileMenu = $("#mobileMenu");

  const menuToggle = $("#menuToggle");



  /* ================= SCROLL PROGRESS ================= */

  function onScroll() {

    const doc =
      document.documentElement;

    const max =
      doc.scrollHeight -
      doc.clientHeight;


    const percentage =
      max > 0
        ? (window.scrollY / max) * 100
        : 0;


    if (progress) {

      progress.style.width =
        percentage + "%";

    }


    if (header) {

      header.classList.toggle(
        "scrolled",
        window.scrollY > 20
      );

    }

  }


  window.addEventListener(
    "scroll",
    onScroll,
    {
      passive: true
    }
  );


  onScroll();



  /* ================= MOBILE MENU ================= */

  menuToggle?.addEventListener(
    "click",
    () => {

      const open =
        mobileMenu.classList.toggle(
          "open"
        );


      menuToggle.setAttribute(
        "aria-expanded",
        String(open)
      );

    }
  );


  $$("#mobileMenu a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          mobileMenu.classList.remove(
            "open"
          );


          menuToggle?.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    });



  /* ================= REVEAL ANIMATION ================= */

  const revealElements =
    $$(".reveal");


  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );


              revealObserver.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12
        }
      );


    revealElements.forEach(
      element =>
        revealObserver.observe(element)
    );

  } else {

    revealElements.forEach(
      element =>
        element.classList.add("visible")
    );

  }



  /* ================= NAV ACTIVE STATE ================= */

  const sections =
    $$("main section[id]");


  const navLinks =
    $$(".desktop-nav a");


  if (
    "IntersectionObserver" in window
  ) {

    const navObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              entry.isIntersecting
            ) {

              navLinks.forEach(link => {

                const active =
                  link.getAttribute("href") ===
                  "#" + entry.target.id;


                link.classList.toggle(
                  "active",
                  active
                );

              });

            }

          });

        },
        {
          rootMargin:
            "-35% 0px -55% 0px"
        }
      );


    sections.forEach(section =>
      navObserver.observe(section)
    );

  }



  /* ================= INCIDENT MODAL ================= */

  const modal =
    $("#incidentModal");


  const openModal = () => {

    if (!modal) return;

    modal.classList.add(
      "open"
    );

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow =
      "hidden";

  };


  const closeModal = () => {

    if (!modal) return;

    modal.classList.remove(
      "open"
    );

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.style.overflow =
      "";

  };


  $("#demoIncident")
    ?.addEventListener(
      "click",
      openModal
    );


  $("#modalClose")
    ?.addEventListener(
      "click",
      closeModal
    );


  $("#modalOk")
    ?.addEventListener(
      "click",
      closeModal
    );


  modal?.addEventListener(
    "click",
    event => {

      if (
        event.target === modal
      ) {

        closeModal();

      }

    }
  );


  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        closeModal();

      }

    }
  );



  /* ================= TOAST ================= */

  const toast =
    $("#toast");


  let toastTimer;


  function showToast(message) {

    if (!toast) return;


    clearTimeout(toastTimer);


    toast.textContent =
      message;


    toast.classList.add(
      "show"
    );


    toastTimer =
      setTimeout(
        () => {

          toast.classList.remove(
            "show"
          );

        },
        4200
      );

  }



  /* ================= DEMO FORM ================= */

  const form =
    $("#demoForm");


  const formNote =
    $("#formNote");


  /*
    FormSubmit sends the form to:

    cybersoulalerteye@gmail.com

    The browser is allowed to submit normally.
    This JavaScript only gives the visitor feedback.
  */

  form?.addEventListener(
    "submit",
    () => {

      if (formNote) {

        formNote.textContent =
          "Submitting securely… Your request is being routed to CyberSoul.";

      }


      showToast(
        "Your private demonstration request is being submitted."
      );

    }
  );



  /* ================= SUCCESS REDIRECT ================= */

  const params =
    new URLSearchParams(
      window.location.search
    );


  if (
    params.get("submitted") === "1"
  ) {

    showToast(
      "Request received. Thank you — CyberSoul will review your inquiry."
    );


    history.replaceState(
      {},
      document.title,
      window.location.pathname +
      window.location.hash
    );

  }



  /* ================= SMOOTH ANCHORS ================= */

  $$('a[href^="#"]')
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const href =
            link.getAttribute("href");


          if (
            !href ||
            href === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(href);


          if (!target) {
            return;
          }


          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });



  /* ================= FORM VALIDATION FEEDBACK ================= */

  form?.addEventListener(
    "invalid",
    () => {

      showToast(
        "Please complete the required fields."
      );

    },
    true
  );


})();
