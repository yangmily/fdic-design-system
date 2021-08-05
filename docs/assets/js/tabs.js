const BASE_CLASS = 'm-tabs';

function Tabs() {
  let tabsContainerDom;
  let tabsListDom;
  let tabs;
  let panels;
  
  function init() {
    const tabsContainerDom = document.querySelector( `.${ BASE_CLASS }` );
    const tabsListDom = tabsContainerDom.querySelectorAll( `.${ BASE_CLASS }_list` );
    _generateArrays();
  
    function _generateArrays () {
      tabs = document.querySelectorAll('[role="m-tabs_tab"]');
      panels = document.querySelectorAll('[role="m-tabs_panel"]');
    };
  
    // For easy reference
    const keys = {
      end: 35,
      home: 36,
      left: 37,
      up: 38,
      right: 39,
      down: 40
    };
  
    // Add or substract depending on key pressed
    const direction = {
      37: -1,
      38: -1,
      39: 1,
      40: 1
    };
  
    // Bind listeners
    for (let i = 0; i < tabs.length; ++i) {
      addListeners(i);
    };
    
    return this;
  }

  function _addListeners (index) {
    tabs[index].addEventListener('click', _clickEventListener);
    tabs[index].addEventListener('keydown', _keydownEventListener);
    tabs[index].addEventListener('keyup', _keyupEventListener);

    // Build an array with all tabs (<button>s) in it
    tabs[index].index = index;
  };

  // When a tab is clicked, _activateTab is fired to activate it
  function __clickEventListener (event) {
    const tab = event.target;
    _activateTab(tab, false);
  };

  // Handle keydown on tabs
  function __keydownEventListener (event) {
    const key = event.keyCode;

    switch (key) {
      case keys.end:
        event.preventDefault();
        // Activate last tab
        _activateTab(tabs[tabs.length - 1]);
        break;
      case keys.home:
        event.preventDefault();
        // Activate first tab
        _activateTab(tabs[0]);
        break;

      // Up and down are in keydown
      // because we need to prevent page scroll >:)
      case keys.up:
      case keys.down:
        _determineOrientation(event);
        break;
    };
  };

  // Handle keyup on tabs
  function __keyupEventListener (event) {
    const key = event.keyCode;

    switch (key) {
      case keys.left:
      case keys.right:
        _determineOrientation(event);
        break;
    };
  };

  // When a m-tabs_list aria-orientation is set to vertical,
  // only up and down arrow should function.
  // In all other cases only left and right arrow function.
  function _determineOrientation (event) {
    const key = event.keyCode;
    const vertical = tablist.getAttribute('aria-orientation') == 'vertical';
    const proceed = false;

    if (vertical) {
      if (key === keys.up || key === keys.down) {
        event.preventDefault();
        proceed = true;
      };
    }
    else {
      if (key === keys.left || key === keys.right) {
        proceed = true;
      };
    };

    if (proceed) {
      _switchTabOnArrowPress(event);
    };
  };

  // Either focus the next, previous, first, or last tab
  // depening on key pressed
  function _switchTabOnArrowPress (event) {
    const pressed = event.keyCode;

    for (x = 0; x < tabs.length; x++) {
      tabs[x].addEventListener('focus', focusEventHandler);
    };

    if (direction[pressed]) {
      const target = event.target;
      if (target.index !== undefined) {
        if (tabs[target.index + direction[pressed]]) {
          tabs[target.index + direction[pressed]].focus();
        }
        else if (pressed === keys.left || pressed === keys.up) {
          _focusLastTab();
        }
        else if (pressed === keys.right || pressed == keys.down) {
          _focusFirstTab();
        };
      };
    };
  };

  // Activates any given tab panel
  function _activateTab (tab, setFocus) {
    setFocus = setFocus || true;
    // Deactivate all other tabs
    deactivateTabs();

    // Remove tabindex attribute
    tab.removeAttribute('tabindex');

    // Set the tab as selected
    tab.setAttribute('aria-selected', 'true');

    // Get the value of aria-controls (which is an ID)
    const controls = tab.getAttribute('aria-controls');

    // Remove hidden attribute from tab panel to make it visible
    document.getElementById(controls).removeAttribute('hidden');

    // Set focus when required
    if (setFocus) {
      tab.focus();
    };
  };

  // Make a guess
  function _focusFirstTab () {
    tabs[0].focus();
  };

  // Make a guess
  function _focusLastTab () {
    tabs[tabs.length - 1].focus();
  };

  // Attach public events.
  this.init = init;

  return this;
}



export default Tabs;
