import { Application } from 'express';
import { checkJwt } from '../auth/authConfig';
import {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} from '../controllers/doctors/index';

module.exports = (app: Application, appConfig: any) => {
  const { context } = appConfig['server'];
  app.post(encodeURI(`${context}/doctor`), checkJwt, createDoctor);
  app.get(encodeURI(`${context}/doctor`), checkJwt, getDoctors);
  app.get(encodeURI(`${context}/doctor/:id`), checkJwt, getDoctorById);
  app.put(encodeURI(`${context}/doctor/:id`), checkJwt, updateDoctor);
  app.delete(encodeURI(`${context}/doctor/:id`), checkJwt, deleteDoctor);
};
