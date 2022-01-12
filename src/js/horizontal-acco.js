(function () {
    const closeEveryItemInContainer = (container) => {
        const items = container.find(".assortment-menu__item");
        const content = container.find(".assortment-menu__content");

        items.removeClass("active");
        content.width(0);
    };

    const measureWidth = (block) => {
        let itemWidth = 0;

        const screenWidth = $(window).width();
        const titlesWidth = block.find(".assortment-menu__title").width() * 3;
        const textContainer = block.find(".assortment-menu__container");
        const paddingLeft = parseInt(textContainer.css("padding-left"));
        const paddingRight = parseInt(textContainer.css("padding-right"));

        const isMobile = window.matchMedia("(max-width: 768px)");

        if (isMobile.matches) {
            itemWidth = screenWidth - titlesWidth
        } else {
            itemWidth = 500
        }

        return {
            container: itemWidth,
            textContainer: itemWidth - paddingLeft - paddingRight
        }
    };


    (function () {
        const menuBtn = $('assortment-menu__title');

        $(document).ready(() => {
            for (let i = 0; i < menuBtn.length; i++) {
                const element = menuBtn[i];

                element.addEventListener('click', e => {
                    e.preventDefault();

                    for (let index = 0; index < menuBtn.length; index++) {
                        const element = menuBtn[index];

                        if (element !== e.currentTarget) {
                            element.closest('.assortment-menu__item').classList.remove('assortment-menu__item--active');
                        }
                    }
                    element.closest('.assortment-menu__item').classList.toggle('assortment-menu__item--active');
                });
            }
        });
    })();

    const openItem = (item) => {
        const hiddenBlock = item.find(".assortment-menu__content");
        const reqWidth = measureWidth(item).container;
        const textBlock = item.find(".assortment-menu__container");
        const textBlockWidth = measureWidth(item).textContainer;

        item.addClass("--active");
        hiddenBlock.width(reqWidth);
        textBlock.width(textBlockWidth)
    };

    $(".assortment-menu__title").click((e) => {
        e.preventDefault();

        const $this = $(e.currentTarget);
        const item = $this.closest(".assortment-menu__item");
        const itemOpened = item.hasClass("active");
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