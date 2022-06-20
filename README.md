# Mortgage Payment Calculator

![App Screenshot](/docs/loancalc-multi-device.png "App screenshot")

This calculator allows a user to create a mortgage repayment schedule. It is based on the Amount, Tenure, and Rate, which can be manipulated and changed to produce payment projections. This allows the user to make adjustments to determine a suitable repayment plan for their individual needs.

# Planning

## Initial Wireframe

![Wireframe](/docs/loancalc.png "Wireframe")
I used www.wireframe.cc for the initial mockup. The sketch can be viewed at https://wireframe.cc/pro/pp/66fca1165540994

A chart component was also added to the project.

## Purpose of the project

The app's goal is to facilitate the estimation of mortgage repayments for those wishing to purchase a home. It can be beneficial to know these figures before approaching a financial institution.

## User Stories

An individual or couple are considering home ownership and wish to compare a mortgage repayment to their current rent.

A Mortgage Broker wishes to discuss mortgage options with a client, showing them different payment scenarios.

An individual or couple wish to see how beneficial a mortgage re-financing may be.

An individual or couple may wish to estimate tax implications in having a mortgage.


## Features

### Calculation Input Area
![Input Area](/docs/loancalc-input-area.png "Input Area")
### Summary Section
![Summary Section](/docs/loancalc-summary-section.png "Summary Section")
### Bar-chart repayment visualization.
![Payment Chart](/docs/loancalc-payment-chart.png "Payment Chart")
### Full monthly breakdown of interest paid, balances and running totals.
![Payments Table](/docs/loancalc-payments-table.png "Payments Table")
### Easy to perform what-if scenarios.
### Non-scrolling header row on HTML table.
The top row containing the column headings for the HTML table remains visible when
there are more rows than displayed on the viewport.
![Fixed HTML Headers](/docs/loancalc-fixed-HTML-headers.png "Fixed HTML Headers")


## Future Features

- Output to PDF
- Include a downpayment in calculations
- Factor in occasional additional payments
- Floating rate tracker
- Export to CSV


# Testing

- HTML
    - The HTML pointed out some errors in the table formatting which I then rectified.
- ![W3Validation](/docs/loancalc-w3-valid.png "W3 Validation")

- CSS
    - The CSS validates without error at w3.org 

![CSSValidation](/docs/loancalc-css-valid.png "W3 CSS Validation")

- JSHint
    - Missing terminators were found and fixed. It flaged certain variables as undefined, 
    however, these are used with the JS Chart library and are out of scope for the checker. They have 
    been investigated and found to be valid.
    - In addition a cyclomatic complexity value of 12 was flagged, 2 above the recommmended value. This is 
    due to the input validation occuring in one function, which will need to be sepearated out if further input 
    fields are added. But in this instance I don't think it's excessive.

![JS Validation](/docs/loancalc-jshint.png "JS Hint Validation")


- Lighthouse
    - The MOBILE scores on Lighthouse are 

![LighthouseMobile](/docs/loancalc-lighthouse-mobile.png "Lightouse Mobile")

    - while on DESKTOP, the Lighthouse scores are

![LighthouseDesktop](/docs/loancalc-lighthouse-desktop.png "Lightouse Desktop")



- Browser Developer Tools
    - No erros in debug logs.
    - Site displayed correctly when using "Toggle Device Toolbar" and resizing the page.

- Techsini
    - Page layouts displayed correctly on mobile, tablet and desktop (See top image).

- Unfixed Bugs
    - None

# Supported Screens and Browsers

- Desktop: Recent versions of Chrome (or Chromium-based), Safari , Firefox , Edge.
- Tablet: Tested on Chrome, Firefox and Edge. (Android)
- Mobile: Tested on Chrome, Firefox and Edge. (Android) as well as Safari (IOS).

# Deployment

- All assets were stored and manipulated in Gitpod.
- As sections were completed GIT was used to store the code in a Github repository
- From the Github repository I used the repository settings item to scroll down to the Github Pages section and completed the publish procedure as shown in the image below.

![github-pages](/docs/loancalc-github-pages.png "Github Pages")

The full URL to the site is https://tomf247.github.io/loancalculator/index.html

# Credits

- Inspiration from Code Institute LRM, Stack Exchange and YouTube.
- Code snippets and how to's from w3schools.org, MTN, Google search, Stack Overflow.
- The payment calculations are well known and freely available on the web.
- Gertting columns to stack on screen resize was learned by the videos I saw from Kevin Powell, I didn't copy code, I just observed how he approached it.

# Content

- Unsplash.com for royalty-free stock images.
- Fontawsome.com for iconography.

# Typography and Color Scheme

- The primary font face is Open Sans.

- Royalty-free web fonts available from https://fonts.google.com
