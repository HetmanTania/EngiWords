import gsap from "~/gsap.js";


export const startFormInputsAnimation = () => {
    const tl = gsap.timeline();
    tl.to('input', {
        scale: 1.1,
        duration: .3,
        delay: 2,
        stagger: .1,
    }).to('input', {
        scale: 1,
        delay: .1,
        stagger: .1,
    });
}