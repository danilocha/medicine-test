import { Application } from 'express';
import { checkJwt } from '../auth/authConfig';
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getFullDates,
} from '../controllers/appointment/index';

module.exports = (app: Application, appConfig: any) => {
  const { context } = appConfig['server'];
  app.post(encodeURI(`${context}/appointment`), checkJwt, createAppointment);
  app.get(encodeURI(`${context}/appointment`), checkJwt, getAppointments);
  app.get(encodeURI(`${context}/appointment/:id`), checkJwt, getAppointmentById);
  app.post(encodeURI(`${context}/appointment/detail/`), checkJwt, getFullDates);
  app.put(encodeURI(`${context}/appointment/:id`), checkJwt, updateAppointment);
  app.delete(encodeURI(`${context}/appointment/:id`), checkJwt, deleteAppointment);
};
