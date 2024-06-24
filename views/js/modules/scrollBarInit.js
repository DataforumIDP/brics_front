
export function scrollbarInit() {
    const d = calculateVerticalDistance($('.inputs')[0], $('.content__btns')[0])
    if (d == 0) {
        $('.inputs').css({maxHeight: '350px', marginBottom: 10}).overlayScrollbars({
            className: "os-theme-dark",
        });    
    } 
} 

export function calculateVerticalDistance(node1, node2) {
    const rect1 = node1.getBoundingClientRect();
    const rect2 = node2.getBoundingClientRect();

    const bottom1 = rect1.bottom;
    const top2 = rect2.top;

    const distance = Math.abs(top2 - bottom1);
    return distance;
}