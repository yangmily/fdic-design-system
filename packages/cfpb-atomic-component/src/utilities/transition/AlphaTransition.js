// Required modules.
import BaseTransition from './BaseTransition.js';
import EventObserver from '@cfpb/cfpb-atomic-component/src/mixins/EventObserver.js';

// Exported constants.
const CLASSES = {
  CSS_PROPERTY: 'opacity',
  BASE_CLASS: 'u-alpha-transition',
  ALPHA_100: 'u-alpha-100',
  ALPHA_0: 'u-alpha-0',
};

/**
 * AlphaTransition
 *
 * @class
 * @classdesc Initializes new AlphaTransition behavior.
 * @param {HTMLElement} element - DOM element to apply opacity transition to.
 * @returns {AlphaTransition} An instance.
 */
function AlphaTransition(element) {
  const _baseTransition = new BaseTransition(element, CLASSES);

  /**
   * Handle the end of a transition.
   */
  function _transitionComplete() {
    this.dispatchEvent(BaseTransition.END_EVENT, { target: this });
  }

  /**
   * @returns {AlphaTransition} An instance.
   */
  function init() {
    _baseTransition.init();
    const _transitionCompleteBinded = _transitionComplete.bind(this);
    _baseTransition.addEventListener(
      BaseTransition.END_EVENT,
      _transitionCompleteBinded
    );
    return this;
  }

  /**
   * Fade to 100% by applying a utility alpha class.
   *
   * @returns {AlphaTransition} An instance.
   */
  function fadeIn() {
    _baseTransition.applyClass(CLASSES.ALPHA_100);

    return this;
  }

  /**
   * Fade to nothing by applying a utility alpha class.
   *
   * @returns {AlphaTransition} An instance.
   */
  function fadeOut() {
    _baseTransition.applyClass(CLASSES.ALPHA_0);

    return this;
  }

  // Attach public events.
  const eventObserver = new EventObserver();
  this.addEventListener = eventObserver.addEventListener;
  this.dispatchEvent = eventObserver.dispatchEvent;
  this.removeEventListener = eventObserver.removeEventListener;

  this.animateOff = _baseTransition.animateOff;
  this.animateOn = _baseTransition.animateOn;
  this.halt = _baseTransition.halt;
  this.isAnimated = _baseTransition.isAnimated;
  this.remove = _baseTransition.remove;
  this.setElement = _baseTransition.setElement;

  this.fadeIn = fadeIn;
  this.fadeOut = fadeOut;
  this.init = init;

  return this;
}

// Public static properties.
AlphaTransition.CLASSES = CLASSES;

export default AlphaTransition;
