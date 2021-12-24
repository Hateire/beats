const findBlockByAlias = (alias) => {
    return $(".rewiews__item").filter((ndx, item) => {
        return $(item).attr("data-link") == alias;
    });
};

$(".interactive-avatar").click((e) => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const current = $this.attr("data-open");
    const itemToShow = findBlockByAlias(current);
    const curItem = $this.closest(".rewiews__switcher-item");

    itemToShow.addClass("rewiews__item--active").siblings().removeClass("rewiews__item--active");
    curItem.addClass("interactive-avatar--active").siblings().removeClass("interactive-avatar--active");
})