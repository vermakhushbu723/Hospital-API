# Hospital-API
I have design an API using Node.js and MongoDB for the doctors of a Hospital which has been allocated by the govt for testing and quarantine + well being of COVID-19 patients.
Features
There can be 2 types of Users

Doctors & Patients
Doctors can log in
Each time a patient visits, the doctor will follow 2 steps:
Register the patient in the app (using phone number, if the patient already exists, just return the patient info in the API)
After the checkup, create a Report.
Patient Report will have the following fields
Created by doctor
Status: Can be either of: [0 :Negative, 1:Travelled-Quarantine, 2:Symptoms-Quarantine, 3:Positive-Admit]
Date

How to INSTALL and RUN?
Clone the project.
Navigate to the folder cd Hospital-API  where the project has been Stored.
Open Terminal and type npm install to install required files.
Run following command: Nodemon .\index.js 

Folder Structure
Entry point : index.js.
config : Contains configuration files of Mongoose,Passport JWT Strategies and Status.
controllers : The controllers for various urls like Doctor API or Patient API or Report API.
models : Mongoose Schemas for the Doctors, Patients and reports.
routes : Different routes for different request urls.
test : Test files for testing different routes.
