# Build Your Own Backend
[![Build Status](https://travis-ci.org/Tobin-jn/BYOB.svg?branch=master)](https://travis-ci.org/Tobin-jn/BYOB)

[![Waffle.io - Columns and their card count](https://badge.waffle.io/Tobin-jn/BYOB.svg?columns=all)](https://waffle.io/Tobin-jn/BYOB)

This API was created to provide job information for current positions in web development. 

### See it Live

[Job Database API](https://byob-test.herokuapp.com/) on Heroku

### Tech Stack

* Express.js
* Knex.js
* Nightmare.js for web scraping
* PostgreSQL database
* Mocha and Chai
* Travis CI
* Heroku

## Screenshots
### Landing Page

![landingpage](https://user-images.githubusercontent.com/32209705/51063706-59b9e980-15b9-11e9-8a23-f718a8c6319f.png)

## API - Endpoints

#### Receive all Companies and Add a Company

```/api/v1/companies```

Adding a company must have parameters included (company_name, url, company_size, job_openings). Users should expect to see the company returned.

#### Search for specific companies

```/api/v1/companies?companyName=WRITE_NAME_HERE```

Using the search query will return all companies where the name includes the text in the query.

#### See a Specific Company, Update a Company, and Delete a Job

```/api/v1/companies/:id```

To see a specific company, the id is required. Users will get the company returned. 
To delete a company and all its job postings the id is required. Users will get a success message returned.
To update a company the updated property or properties must be included (company_name, url, company_size, job_openings). The updated company will be returned to the user.

#### Receive all Jobs and Add a Job

```/api/v1/jobs```

Adding a job must have parameters included (title, company_id, location). Users should expect to see the job returned.

#### Receive all positions at a specific company

```/api/v1/jobs/:company_id/positions```

Getting all the positions at a specific compay requires the company id. The positions are returned to the user.

#### Find jobs based on location

```'/api/v1/jobs/find_by_location'```

To search by location requires a query paramater in the URL. An example URL may look like ```/api/v1/jobs/find_by_location?location=GREATER+BOULDER+AREA```

#### Update a Job and Delete a Job

```/api/v1/jobs/:id```

To update a job the updated property or properties must be included (title, location, company_id). The updated job will be returned to the user.
To delete a job and all its job postings the id is required. Users will get a success message returned.

### Test Driven Development

Mocha and Chai for backend testing.

Run with ```npm test``` from the root directory

## Contribute 
Please follow our guide here: [CONTRIBUTING](CONTRIBUTING.md)

### Original Assignment

[BYOB](http://frontend.turing.io/projects/build-your-own-backend.html) from the [Turing School of Software & Design](https://turing.io/)

### Contributors

* Aaron Weissman: [Github Profile](https://github.com/aweissman11)
* Graham Munro: [Github Profile](https://github.com/gmasterofnone)
* Mark Pearyer: [Github Profile](https://github.com/marcusp619)
* Tobin Nelson: [Github Profile](https://github.com/Tobin-jn)
