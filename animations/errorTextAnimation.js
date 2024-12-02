import gsap from "~/gsap.js";

export const startShowAnimation = (errorTextRef) => {
  const tl = gsap.timeline();
  tl.to(errorTextRef.value, {
    y: 5,
    repeat: 3,
    yoyo: true,
    duration: 0.5,
    ease: "power1.inOut",
  });
};
