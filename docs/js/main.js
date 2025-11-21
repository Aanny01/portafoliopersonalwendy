(function ($) {
  "use strict";

  // ========== PreLoader ==========
  $(window).on("load", function () {
    $(".spinner").fadeOut();
    $(".preloader").delay(350).fadeOut("slow");
  });

  // ========== Is In Viewport ==========
  $.fn.isInViewport = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop + 500 < viewportBottom;
  };

  // ========== Window Scroll ==========
  function onScroll() {
    $("header").toggleClass("sticky", $(window).scrollTop() >= 100);
    $(".scroll-top").toggleClass("active", $(window).scrollTop() >= 100);
    $("section").each(function () {
      var sect = $(this);
      if (sect.isInViewport()) {
        $(".nav-link").removeClass("active");
        $(".nav-link[href='#" + $(sect).attr("id") + "']").addClass("active");
      }
    });
  }
  $(window).on("scroll", onScroll);
  onScroll();

  // ========== Mobile Menu ==========
  $(".menu-toggler, .nav-list").click(function (e) {
    $(".nav-list").toggleClass("active");
  });

  // ========== Nav Link ==========
  $(".nav-link").on("click", function (e) {
    var hash = $(this).attr("href");
    $("html, body")
      .stop()
      .animate({ scrollTop: $(hash).offset().top - 100 });
    window.location.hash = hash;
    e.preventDefault();
  });

  // ========== Scroll Top ==========
  $(".scroll-top").click(function (e) {
    $("html, body").animate({ scrollTop: 0 }, 0);
  });

  // ========== Counter Up ==========
  $(".count").countUp({
    delay: 10,
    time: 2000,
  });

  // ========== Wow Js ==========
  new WOW().init();

  // ========== Typed Js ==========
  new Typed(".profession span", {
    strings: $(".profession span").data("strings").split("|"),
    typeSpeed: 60,
    backSpeed: 60,
    backDelay: 2000,
    loop: true,
    smartBackspace: false,
  });

  // ========== Skill Bars ==========
  $(".skills").waypoint(
    function () {
      $(".skills .percentage").each(function (i, el) {
        var width = $(el).text();
        $(el).parent().next().animate({ width: width }, 3000);
      });
    },
    { offset: "100%", triggerOnce: true }
  );

  // ========== Isotope ==========
  var $container = $(".portfolio-container");
  $container.isotope({
    itemSelector: ".portfolio-item",
    transitionDuration: "0.8s",
  });

  $(".filter-list li").on("click", function (e) {
    e.preventDefault();
    $(".filter-list li.active").removeClass("active");
    $(this).addClass("active");
    var filter = $(this).attr("data-filter");
    var selector = filter == "*" ? filter : `[data-filter="${filter}"]`;
    $container.isotope({
      filter: selector,
    });
  });

  // ========== Slider ==========
  $(".testimonial-slider").owlCarousel({
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 5000,
    dots: true,
    responsiveClass: true,
    responsive: {
      0: { items: 1 },
      992: { items: 2 },
    },
  });
})(jQuery);

// Ajax mail js
$(function () {
  // Get the form.
  var form = $("#contact-form");

  // Get the messages div.
  var formMessages = $(".form-message");

  // Set up an event listener for the contact form.
  $(form).submit(function (e) {
    // Stop the browser from submitting the form.
    e.preventDefault();

    // Serialize the form data.
    var formData = $(form).serialize();

    // Submit the form using AJAX.
    $.ajax({
      type: "POST",
      url: $(form).attr("action"),
      data: formData,
    })
      .done(function (response) {
        // Make sure that the formMessages div has the 'success' class.
        $(formMessages).removeClass("error");
        $(formMessages).addClass("success");

        // Set the message text.
        $(formMessages).text(response);

        // Clear the form.
        $("#contact-form input,#contact-form textarea").val("");
      })
      .fail(function (data) {
        // Make sure that the formMessages div has the 'error' class.
        $(formMessages).removeClass("success");
        $(formMessages).addClass("error");

        // Set the message text.
        if (data.responseText !== "") {
          $(formMessages).text(data.responseText);
        } else {
          $(formMessages).text("Oops! An error occured and your message could not be sent.");
        }
      });
  });
});
