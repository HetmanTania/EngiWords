import gsap from "~/gsap.js";

export const startImgAnimation = () => {
    const tl = gsap.timeline();

    tl.fromTo('.img-animation', {
        opacity: 0,
    }, {
        opacity: 1,
        scale: 1.2,
        duration: 1,
    }).to('.img-animation', {
        scale: 1,
    })
}

export const startAnimation = () => {
    const tl = gsap.timeline();

    tl.fromTo('.formPart', {
        opacity: 0,
        y: '-100vh'
    }, {
        opacity: 1,
        y: '0px',
        duration: `1.5`,
        delay: 1,
    })
}
