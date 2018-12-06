const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
app.use(bodyParser.json());
app.use(express.static('public'));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'devjobs_test';

app.get('/', (request, response) => {
  response.status(200).send('everything is ok');
});

//Companies
//get all companies
app.get('/api/v1/companies', (request, response) => {
  database('companies')
    .select()
    .then(company => {
      response.status(200).json(company);
    })
    .catch(error => {
      response
        .status(500)
        .json({message: `Error fetching companies: ${error.message}`})
    });
});

//post a new company
app.post('/api/v1/companies', (request, response) => {
  const company = request.body;
  for (let requiredParameter of [
      'company_name',
      'url',
      'company_size',
      'job_openings',
    ]) {
    if (requiredParameter === undefined) {
      response.status(422).send({error: 'Missing required parameter'});
    }
  }
  database('companies')
    .returning(['id', 'company_name', 'url', 'company_size', 'job_openings'])
    .insert(company)
    .then(company => {
      response.status(201).json(company);
    })
    .catch(error => {
      response
        .status(500)
        .json({error: error.message});
    });
});

//Get a specific company
app.get('/api/v1/companies/:id', (request, response) => {
  const { id } = request.params

  database('companies')
    .where('id', id)
    .select()
    .then(company => {
      response.status(200).json(company)
    })
    .catch(error => { 
      response
        .status(500)
        .json({message: `Error finding company ${id}: ${error.message}`})
    });
});

//update company information- put
app.put('/api/v1/companies/:id', (request, response) => {
  const { id } = request.params
  const company = request.body

  database('companies')
    .where('id', id)
    .update(company)
    .returning(['id', 'company_name', 'url', 'company_size', 'job_openings'])
    .then(company => {
      response.status(200).json(company);
    })
    .catch(error => {
      response
        .status(500)
        .json({error: error.message});
    });
});

//Jobs
//get all jobs
app.get('/api/v1/jobs', (request, response) => {
  database('jobs')
    .select()
    .then(jobs => {
      response.status(200).json(jobs);
    })
    .catch(error => {
      response
        .status(500)
        .json({message: `Error fetching jobs: ${error.message}`});
    });
});

//post a new job
app.post('/api/v1/jobs', (request, response) => {
  const job = request.body

  for (let requiredParameter of [
      'title',
      'company_id',
      'location',
    ]) {
    if (requiredParameter === undefined) {
      response.status(422).send({error: 'Missing required parameter'});
    }
  }
  database('jobs')
    .returning(['id', 'title', 'company_id', 'location'])
    .insert(job)
    .then(job => {
      response.status(201).json(job);
    })
    .catch(error => {
      response
        .status(500)
        .json({error: error.message});
    });
})

//get jobs at a company
app.get('/api/v1/jobs/:company_id/positions', (request, response) => {
  const companyId = request.params.company_id;
  database('jobs')
    .where('company_id', companyId)
    .select()
    .then(jobs => {
      response.status(200).json(jobs);
    })
    .catch(error => {
      response
        .status(500)
        .json({message: `Error fetching jobs at company ${companyId}: ${error.message}`});
    });
});

//update a job
app.put('/api/v1/jobs/:id', (request, response) => {
  const { id } = request.params
  const job = request.body

  database('jobs')
    .where('id', id)
    .update(job)
    .returning(['id', 'title', 'company_id', 'company_name'])
    .then(job => {
      response.status(200).json(job);
    })
    .catch(error => {
      response
        .status(500)
        .json({error: error.message});
    });
});

//delete a job
app.delete('/api/v1/jobs/:id', (request, response) => {
  const { id } = request.params

  database('jobs')
    .where('id', id)
    .del()
    .then(jobs => {
      response.status(202).json({success: 'job deleted'});
    })
    .catch(error => {
      response
        .status(500)
        .json({error: error.message});
    });
});


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;
