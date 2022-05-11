import $ from "jquery";
import "slick-carousel";

$(function () {
  $(".gallery-slider__inner").slick({
    slidesToShow: 4,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1919,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: false,
          nextArrow: false,
        },
      },
    ],
    prevArrow:
      '<button type="button" class="gallery-slider__arrow gallery-slider__arrow--prev"><picture><source srcset="img/gallery-slider-arrow-left.svg"><img src="../img/gallery-slider-arrow-left.svg" alt="arrow-prev" /></picture></button>',
    nextArrow:
      '<button type="button" class="gallery-slider__arrow gallery-slider__arrow--next"><picture><source srcset="img/gallery-slider-arrow-right.svg"><img src="../img/gallery-slider-arrow-right.svg" alt="arrow-prev" /></picture>></button>',
  });
});
