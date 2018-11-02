/*********************
 *	Helpers Code
 ********************/
/**
 *  @function   DOMReady
 *
 *  @param callback
 *  @param element
 *  @param listener
 *  @returns {*}
 *  @constructor
 */
const DOMReady = ((
  callback  = () => {},
  element   = document,
  listener  = 'addEventListener'
) => {
  return (element[listener]) ? element[listener]('DOMContentLoaded', callback) : window.attachEvent('onload', callback);
});


/*********************
 *	Application Code
 ********************/
/**
 *  @class  PureSlider
 */
class PureSlider {
  /**
   *  @constructor
   *
   *  @param element
   *  @param options
   */
  constructor (element, options = {}) {
    this.el       = document.querySelector(element);
    this.options  = Object.assign({
      'links':          '.js-slider__nav .js-slider__slide-nav-link',
      'wrapper':        '.js-slider__slide-wrapper',
      'prev':           '.js-slider__prev',
      'next':           '.js-slider__next',
      'slide':          '.js-slider__slide',
      'slide-caption':  '.js-slider__slide-caption',
      'slide-nav':      '.js-slider__slide-nav',
      'slide-nav-link': '.js-slider__slide-nav-link'
    }, options);

    this.init();
  }
  /**
   *  @function init
   *
   *  @public
   */
  init () {
    this.links    = this.el.querySelectorAll(this.options.links);
    this.wrapper  = this.el.querySelector(this.options.wrapper);

    this.prev     = this.el.querySelector(this.options.prev);
    this.next     = this.el.querySelector(this.options.next);

    /**
     *  Init Default state
     */
    this._moveSlide(
      this.links[0]
    );
    /**
     *  Init Navigation
     */
    this._navigate();
  }
  /**
   *  @function _navigate
   *
   *  @private
   */
  _navigate () {
    for (let i = 0, link; i < this.links.length; ++i) {
      link = this.links[i];

      this._slideByNav(link);
    }

    this._slideByButton(
      this.prev,
      -1
    );
    this._slideByButton(
      this.next,
      1
    );
  }
  /**
   *  @function _slideByNav
   *
   *  @param element
   *  @private
   */
  _slideByNav (element) {
    let self        = this,
        currentLink;

    /**
     *  It is magic of BabelJS
     */
    element.addEventListener('click', function (e) {
      currentLink   = this;

      e.preventDefault();

      self._moveSlide(
        currentLink
      );
    }, false);
  }
  /**
   *  @function _slideByButton
   *
   *  @param element
   *  @param arg
   *  @private
   */
  _slideByButton (element, arg = null) {
    let self        = this,
        currentSlide;

    element.addEventListener('click', (e) => {
      currentSlide  = self.el.querySelector(
        this.options.slide + ' ' + this.options['slide-caption'] + '--current'
      ).parentNode;

      e.preventDefault();

      self._moveSlide(
        currentSlide,
        arg
      );
    }, false);
  }
  /**
   *  @function _moveSlide
   *
   *  @param element
   *  @param arg
   *  @private
   */
  _moveSlide (element, arg = null) {
    let self      = this,
        currentIndex,
        currentLink,
        currentSlide;

    currentIndex  = parseInt(element.getAttribute('data-slide'), 10);
    currentLink   = self.el.querySelector(
      this.options['slide-nav'] + ':nth-child(' + parseInt(currentIndex + arg, 10) + ')'
    );
    currentSlide  = self.el.querySelector(
      this.options.slide + ':nth-child(' + parseInt(currentIndex + arg, 10) + ')'
    );

    if (!currentSlide) {
      return;
    }

    self._setCurrentLink(currentLink);

    self.wrapper.style.left = '-' + currentSlide.offsetLeft + 'px';
    self._animateOfCaption(currentSlide);
  }
  /**
   *  @function _animateOfCaption
   *
   *  @param slide
   *  @private
   */
  _animateOfCaption (slide) {
    let captionOfSlide      = slide.querySelector(this.options['slide-caption']),
        captions            = slide.parentNode.querySelectorAll(this.options['slide-caption']),
        captionToggleClass  = this.options['slide-caption'].substring(1) + '--current';

    this._toggleClass(
      captionOfSlide,
      captions,
      captionToggleClass
    );
  }
  /**
   *  @function _setCurrentLink
   *
   *  @param link
   *  @private
   */
  _setCurrentLink (link) {
    let childrenOfNav   = link.querySelector(this.options['slide-nav-link']),
        links           = this.links,
        linkToggleClass = this.options['slide-nav'].substring(1) + '--current';

    this._toggleClass(
      childrenOfNav,
      links,
      linkToggleClass
    );
  }
  /**
   *  @function _toggleClass
   *
   *  @param currentElement
   *  @param allElements
   *  @param toggleOfClass
   *  @private
   */
  _toggleClass (currentElement, allElements, toggleOfClass) {
    for (let i = 0, currentItem; i < allElements.length; ++i) {
      currentItem = allElements[i];

      if (currentItem !== currentElement) {
        currentItem.classList.remove(toggleOfClass);
      }
    }

    currentElement.classList.add(toggleOfClass);
  }
}


/**
 *  @function   readyFunction
 *
 *  @type {Function}
 */
const readyFunction = (() => {
  return new PureSlider('.pure-slider');
});


/**
 *  Launcher
 */
DOMReady(readyFunction);
