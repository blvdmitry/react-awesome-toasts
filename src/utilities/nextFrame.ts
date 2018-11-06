const raf = requestAnimationFrame;
export default (fn: FrameRequestCallback) => {
  raf(() => raf(fn));
};