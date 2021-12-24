const slider = $(".slider__list").bxSlider({
    pager: false,
    controls: false,
});

$(".slider__button--prev").click((e) => {
    e.preventDefault();
    slider.goToPrevSlide();
});


$(".slider__button--next").click((e) => {
    e.preventDefault();
    slider.goToNextSlide();
})