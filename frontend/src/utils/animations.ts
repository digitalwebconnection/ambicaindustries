export const transition = {
  fast: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  normal: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  slow: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transition.normal
  }
};

export const fadeUpFast = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transition.fast
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

export const imageRevealContainer = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      when: "beforeChildren"
    }
  }
};

export const imageRevealScale = {
  hidden: { scale: 1.08 },
  visible: { 
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

// Use this for floating/parallax subtle effects
export const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};
