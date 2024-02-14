import { Application } from 'express';
import { checkJwt } from '../auth/authConfig';
import {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} from '../controllers/patient/index';

module.exports = (app: Application, appConfig: any) => {
  const { context } = appConfig['server'];
  app.post(encodeURI(`${context}/patient`), checkJwt, createPatient);
  app.get(encodeURI(`${context}/patient`), checkJwt, getPatients);
  app.get(encodeURI(`${context}/patient/:id`), checkJwt, getPatientById);
  app.put(encodeURI(`${context}/patient/:id`), checkJwt, updatePatient);
  app.delete(encodeURI(`${context}/patient/:id`), checkJwt, deletePatient);
};
