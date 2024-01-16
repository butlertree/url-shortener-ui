
//ON MOUNT
describe('network requests', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
      statusCode: 200,
      fixture: 'data.json'
    }).as("getUrls");

    cy.visit('localhost:3000');
    cy.wait('@getUrls');
  });

  it('should show error messaging to a user', () => {
    cy.intercept('GET', "http://localhost:3001/api/v1/urls", { forceNetworkError: true }).as('error');
    cy.visit('localhost:3000');
    cy.wait('@error');
    cy.get('h2').should('contain.text', 'Something went wrong.');
  });

  it('should GET all the urls on page load', () => {
    cy.get('.url-cards').children().should('have.length', 4); // fixture data
    
    cy.get('.url-cards').first().should('contain', 'Awesome photo')
    .and('contain', "http://localhost:3001/useshorturl/1")
    .and('contain', "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80")
    
    cy.get('.url-cards').last().should('contain', 'hello')
    .and('contain', "http://localhost:3001/useshorturl/4")
    .and('contain', "https://www.google.com/search?q=golf+courses+denver&oq=golf+cours&gs_lcrp=EgZjaHJvbWUqCggBEAAYkgMYgAQyDQgAEAAYsQMY")
  });

  it('should display all main page information', () => {
    cy.get('h1').should('contain', 'URL Shortener');
  
    
  // Check input fields 
  cy.get('input[name="title"]').should('exist').and('have.attr', 'placeholder', 'Title...');
   
  cy.get('input[name="urlToShorten"]').should('exist').and('have.attr', 'placeholder', 'URL to Shorten...');
    
    // Check submit button is displayed
    cy.get('form').find('button').should('contain', 'Shorten Please!');
  });
});


// TEST INPUT FIELDS
describe('Form Input Reflection', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
      statusCode: 200,
      fixture: 'data.json'
    }).as("getUrls");

    cy.visit('localhost:3000');
    cy.wait('@getUrls');
  });

  it('should reflect the input values in the form fields', () => {
    cy.get('input[name="title"]').type('getting close').should('have.value', 'getting close');
    
    cy.get('input[name="urlToShorten"]').type('https://disneyworld.disney.go.com/admission/tickets/?ef_id=CjwKCAiA75itBhA6EiwAkho9eyeosMzke0QoIoqsLtlLrK3i1UKFj4qOKuXS3ALgPnOK8D1hMGXzaRoCP9kQAvD_BwE:G:s&s_kwcid=AL!5060!3!592047292683!e!!g!!disney%20world%20tickets&CMP=KNC-FY24_WDW_TRA_DOME_W365_TKT_TCKC_Tickets_Rack_Gold|G|5241213.RR.AM.01.01|MCRJIOW|BR|592047292683&keyword_id=kwd-98099335|dc|disney%20world%20tickets|592047292683|e|5060:3|&gad_source=1&gclid=CjwKCAiA75itBhA6EiwAkho9eyeosMzke0QoIoqsLtlLrK3i1UKFj4qOKuXS3ALgPnOK8D1hMGXzaRoCP9kQAvD_BwE').should('have.value', 'https://disneyworld.disney.go.com/admission/tickets/?ef_id=CjwKCAiA75itBhA6EiwAkho9eyeosMzke0QoIoqsLtlLrK3i1UKFj4qOKuXS3ALgPnOK8D1hMGXzaRoCP9kQAvD_BwE:G:s&s_kwcid=AL!5060!3!592047292683!e!!g!!disney%20world%20tickets&CMP=KNC-FY24_WDW_TRA_DOME_W365_TKT_TCKC_Tickets_Rack_Gold|G|5241213.RR.AM.01.01|MCRJIOW|BR|592047292683&keyword_id=kwd-98099335|dc|disney%20world%20tickets|592047292683|e|5060:3|&gad_source=1&gclid=CjwKCAiA75itBhA6EiwAkho9eyeosMzke0QoIoqsLtlLrK3i1UKFj4qOKuXS3ALgPnOK8D1hMGXzaRoCP9kQAvD_BwE');

    });
  });

//POST REQUEST
describe('Post New URL', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
      fixture: 'data.json'
    }).as("getUrls");

    cy.intercept("POST", "http://localhost:3001/api/v1/urls", {
      statusCode: 201,
      body: {
        id: 5, // Next sequential ID
        title: 'getting closer',
        long_url: 'https://www.golfpass.com/travel-advisor/articles/top-10-golf-courses-in-denver',
        short_url: 'http://localhost:3001/useshorturl/5'
        
      }
    }).as("postUrl");

    cy.visit('localhost:3000');
    cy.wait('@getUrls');
  });

  it('should allow a user to add url and post it', () => {
    // Fill out the form
    cy.get('input[name="title"]').type('getting closer');
    
    cy.get('input[name="urlToShorten"]').type('https://www.golfpass.com/travel-advisor/articles/top-10-golf-courses-in-denver')
   
    cy.get('.form-button').click(); // Click the submit button

    cy.wait("@postUrl");

    // Verify url appears
    cy.get('.url-cards').children().should('have.length', 5); // new length
    
    cy.get('.url-cards').first().should('contain', 'Awesome photo')
    .and('contain', "http://localhost:3001/useshorturl/1")
    .and('contain', "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80")
    
    cy.get('.url-cards').last().should('contain', 'getting closer')
    .and('contain', "http://localhost:3001/useshorturl/5")
    .and('contain', "https://www.golfpass.com/travel-advisor/articles/top-10-golf-courses-in-denver")
    
  });
});


