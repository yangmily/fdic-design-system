/* eslint-disable max-nested-callbacks */
/* eslint-disable no-undef */

describe( 'The "show details" toggling feature', function() {

  let showDetailsButton;
  let hideDetailsButton;
  let detailsTabs;
  let areDetailsTabsVisible;
  let componentPages;

  before( function() {
    browser.url( '/design-system/components/' );
    browser.setWindowSize( 1024, 768 );
    componentPages = $$( '.nav-secondary .m-list_link' ).map( el => ( {
      name: el.getText(),
      url: el.getAttribute( 'href' )
    } ) );
  } );

  it( 'should show/hide details across all component pages', function() {

    componentPages.forEach( componentPage => {

      describe( `The ${ componentPage.name } component page`, function() {

        before( function() {
          browser.url( componentPage.url );
          browser.setWindowSize( 1024, 768 );
          showDetailsButton = $( 'button=Show details' );
          hideDetailsButton = $( 'button=Hide details' );
          detailsTabs = [ ...$$( '.govuk-tabs' ) ];
          areDetailsTabsVisible = () => detailsTabs.some( snippet => snippet.isDisplayed() );
        } );

        it( 'should hide snippet tabs by default', function() {
          if ( !showDetailsButton.isExisting() || !hideDetailsButton.isExisting() ) {
            this.skip();
          }
          expect( showDetailsButton.isDisplayed() ).toBeTruthy();
          expect( hideDetailsButton.isDisplayed() ).toBeFalsy();
          expect( areDetailsTabsVisible() ).toBeFalsy();
        } );

        it( 'should show code snippets when toggle button is clicked', function() {
          if ( !showDetailsButton.isExisting() || !hideDetailsButton.isExisting() ) {
            this.skip();
          }
          showDetailsButton.click();
          expect( showDetailsButton.isDisplayed() ).toBeFalsy();
          expect( hideDetailsButton.isDisplayed() ).toBeTruthy();
          expect( areDetailsTabsVisible() ).toBeTruthy();
        } );

        it( 'should re-hide code snippets when toggle button is clicked again', function() {
          if ( !showDetailsButton.isExisting() || !hideDetailsButton.isExisting() ) {
            this.skip();
          }
          hideDetailsButton.click();
          expect( showDetailsButton.isDisplayed() ).toBeTruthy();
          expect( hideDetailsButton.isDisplayed() ).toBeFalsy();
          expect( areDetailsTabsVisible() ).toBeFalsy();
        } );
      } );

    } );

  } );

} );
