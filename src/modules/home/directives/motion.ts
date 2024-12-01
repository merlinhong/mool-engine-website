const weakmap = new WeakMap();
const ob = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const animation = weakmap.get(entry.target);
      animation.value && animation.value.play();
      animation.once && ob.unobserve(entry.target);
    }
  }
});
function isBelowViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return rect.top > window.innerHeight;
}
const map: Record<string, string[]> = {
  y: ["translateY", "px"],
  x: ["translateX", "px"],
  rotate: ["rotate", "deg"],
  scale: ["scale", ""],
  skew: ["skew", "deg"],
  z: ["translateZ", "px"],
};
const motionMap = function (obj: any) {
  const result: Record<string, string> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (Object.keys(map).includes(key)) {
        const animate = map[key][0] ?? "";
        result.transform = (result.transform ?? "") + " " + animate + "(" + obj[key] + "" + map[key][1] + ")";
      }
    }
  }
  return result;
};
function getAnimation(el: HTMLElement, keyframe: Record<string, any>[], option: any) {
  return el.animate(keyframe, option);
}
export default {
  name: "motion",
  mounted(el: HTMLElement, binding: any) {
    if (!isBelowViewport(el)) return;
    const { init, visible, visibleOnce, duration, delay, easing, hover } = binding.value || {};
    // visibleOnce && ob.observe(el);
    if (hover) {
      const kerframe = [
        {
          transform: "scale(1)",
        },
        {
          ...motionMap({ ...hover }),
        },
      ];
      let ani: Animation;
      el.addEventListener("mouseenter", () => {
        el.style.zIndex = '10';
        // ani.play();
        ani = getAnimation(el, kerframe, {
          duration: duration ?? 1000,
          easing: easing ?? "ease-out",
          delay: delay ?? 0,
          fill: "forwards", // 让动画结束后保持最终状态
          iterations: 1,
        });
      });
      el.addEventListener("mouseleave", () => {
        el.style.zIndex = '0';
        ani.reverse();
      });
    }
    const animation = el.animate(
      [
        {
          ...init,
          ...motionMap(init),
        },
        {
          ...visibleOnce,
          ...motionMap(visibleOnce),
        },
      ],
      {
        duration: duration ?? 1000,
        easing: easing ?? "ease-out",
        delay: delay ?? 0,
      },
    );
    animation.pause();
    weakmap.set(el, { value: animation, once: !!visibleOnce });
    ob.observe(el);
  },
  unmounted(el: HTMLElement) {
    ob.unobserve(el);
  },
};
