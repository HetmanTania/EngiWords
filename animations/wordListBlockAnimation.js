import gsap from "~/gsap.js";

export const mouseOverAnimation = (refReviewBlock) => {
  const tl = gsap.timeline();
  tl.to(refReviewBlock, {
    y: "-10px",
    duration: 0.2,
    ease: "power1.inOut",
  });
};

export const mouseOutAnimation = (refReviewBlock) => {
  const tl = gsap.timeline();
  tl.to(refReviewBlock, {
    y: "0",
    duration: 0.2,
    ease: "power1.inOut",
  });
};

export const btnOverAnimation = (ref) => {
  const tl = gsap.timeline();
  tl.to(ref, {
    y: "-5px",
    duration: 0.2,
    ease: "power1.inOut",
  });
};

export const btnOutAnimation = (ref) => {
  const tl = gsap.timeline();
  tl.to(ref, {
    y: "0",
    duration: 0.2,
    ease: "power1.inOut",
  });
};
