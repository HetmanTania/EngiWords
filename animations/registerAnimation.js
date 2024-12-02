import gsap from "~/gsap.js";

export const startFormInputsAnimation = () => {
  const tl = gsap.timeline();
  tl.to("input", {
    scale: 1.1,
    duration: 0.3,
    delay: 2,
    stagger: 0.1,
  }).to("input", {
    scale: 1,
    delay: 0.1,
    stagger: 0.1,
  });
};
