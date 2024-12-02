import gsap from "~/gsap.js";

export const animOpeningEye = () => {
  gsap
    .timeline()
    .set("#openEyeLine", { scaleY: 1 })
    .to("#closeEye", {
      duration: 0.4,
      transformOrigin: "center",
      scaleY: -1,
    })
    .to("#closeEye", {
      autoAlpha: 0,
      duration: 0.4,
    })
    .to("#openEyeLine", {
      autoAlpha: 1,
      duration: 0.4,
    })
    .to("#openEyeCircle", {
      transformOrigin: "center",
      autoAlpha: 1,
      duration: 0.4,
    })
    .to("#closeEye", {
      scaleY: 1,
      transformOrigin: "center",
      duration: 0.4,
    });
};

export const animClosingEye = () => {
  gsap
    .timeline()
    .to("#openEyeCircle", {
      autoAlpha: 0,
      duration: 0.4,
    })
    .to("#openEyeLine", {
      scaleY: -1,
      transformOrigin: "center 60%",
      duration: 0.4,
    })
    .to("#openEyeLine", {
      autoAlpha: 0,
      duration: 0.4,
    })
    .to("#closeEye", {
      autoAlpha: 1,
      duration: 0.4,
    });
};
