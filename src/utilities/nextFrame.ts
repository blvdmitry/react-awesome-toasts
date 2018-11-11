export default (fn: FrameRequestCallback) => {
  window.requestAnimationFrame(() => window.requestAnimationFrame(fn));
};