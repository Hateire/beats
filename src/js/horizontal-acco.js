(function() {
    const closeEveryItemInContainer = (container) => {
        const items = container.find(".assortment-menu__item");
        const content = container.find(".assortment-menu__content");

        items.removeClass("assortment-menu__item--active");
        content.width(0);
    };

    const measureWidth = (block) => {
        let itemWidth = 0;

        const screenWidth = $(window).width();
        const titlesWidth = block.find(".assortment-menu__title").width() * 3;
        const textContainer = block.find(".assortment-menu__container");
        const paddingLeft = parseInt(textContainer.css("padding-left"));
        const paddingRight = parseInt(textContainer.css("padding-right"));

        const isTablet = window.matchMedia("(max-width: 768px)").matches;
        const isMobile = window.matchMedia("(max-width: 480px)").matches;
        
        if (isTablet) {
            itemWidth = screenWidth - titlesWidth;
        }
        if (isMobile) {
            itemWidth = screenWidth - block.find(".assortment-menu__title").width();
        }
        if (!isTablet && !isMobile) {
            itemWidth = 500;
        }

        return {
            container: itemWidth,
            textContainer: itemWidth - paddingLeft - paddingRight
        }
    };

    const openItem = (item) => {
        const hiddenBlock = item.find(".assortment-menu__content");
        const reqWidth = measureWidth(item).container;
        const textBlock = item.find(".assortment-menu__container");
        const textBlockWidth = measureWidth(item).textContainer;

        item.addClass("assortment-menu__item--active");
        hiddenBlock.width(reqWidth);
        textBlock.width(textBlockWidth)
    };

    $(".assortment-menu__title").click((e) => {
        e.preventDefault();

        const $this = $(e.currentTarget);
        const item = $this.closest(".assortment-menu__item");
        const itemOpened = item.hasClass("assortment-menu__item--active");
        const container = $this.closest(".assortment-menu");

        if (itemOpened) {
            closeEveryItemInContainer(container);
        } else {
            closeEveryItemInContainer(container);
            openItem(item);
        }
    });

    $(".assortment-menu__close").click((e) => {
        e.preventDefault();

        closeEveryItemInContainer($('.assortment-menu'));
    });
}());