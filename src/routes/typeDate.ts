import { Application } from 'express';
import { checkJwt } from '../auth/authConfig';
import {
  createTypeDate,
  getTypeDates,
  getTypeDateById,
  updateTypeDate,
  deleteTypeDate,
} from '../controllers/typeDate/index';

module.exports = (app: Application, appConfig: any) => {
  const { context } = appConfig['server'];
  app.post(encodeURI(`${context}/typedate`), checkJwt, createTypeDate);
  app.get(encodeURI(`${context}/typedate`), checkJwt, getTypeDates);
  app.get(encodeURI(`${context}/typedate/:id`), checkJwt, getTypeDateById);
  app.put(encodeURI(`${context}/typedate/:id`), checkJwt, updateTypeDate);
  app.delete(encodeURI(`${context}/typedate/:id`), checkJwt, deleteTypeDate);
};
