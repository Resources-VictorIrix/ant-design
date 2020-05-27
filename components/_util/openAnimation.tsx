/**
 * Deprecated. We should replace the animation with pure react motion instead of modify style directly.
 * If you are creating new component with animation, please use `./motion`.
 */
import cssAnimation from '@ant-design/css-animation';

function animate(node: HTMLElement, show: boolean, done: () => void) {
  let height: number;
  let requestAnimationFrameId: number;
  return cssAnimation(node, 'ant-motion-collapse-legacy', {
    start() {
      if (!show) {
        node.style.height = `${node.offsetHeight}px`;
        node.style.opacity = '1';
      } else {
        height = node.offsetHeight;
        node.style.height = '0px';
        node.style.opacity = '0';
      }
    },
    active() {
      if (requestAnimationFrameId) {
        cancelAnimationFrame(requestAnimationFrameId);
      }
      requestAnimationFrameId = requestAnimationFrame(() => {
        node.style.height = `${show ? height : 0}px`;
        node.style.opacity = show ? '1' : '0';
      });
    },
    end() {
      if (requestAnimationFrameId) {
        cancelAnimationFrame(requestAnimationFrameId);
      }
      node.style.height = '';
      node.style.opacity = '';
      done();
    },
  });
}

const animation = {
  enter(node: HTMLElement, done: () => void) {
    return animate(node, true, done);
  },
  leave(node: HTMLElement, done: () => void) {
    return animate(node, false, done);
  },
  appear(node: HTMLElement, done: () => void) {
    return animate(node, true, done);
  },
};

export default animation;
