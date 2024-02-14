import { Application } from 'express';
import { checkJwt } from '../auth/authConfig';
import {
  createSpecialty,
  getSpecialties,
  getSpecialtyById,
  updateSpecialty,
  deleteSpecialty,
} from '../controllers/specialty/index';

module.exports = (app: Application, appConfig: any) => {
  const { context } = appConfig['server'];
  app.post(encodeURI(`${context}/specialty`), checkJwt, createSpecialty);
  app.get(encodeURI(`${context}/specialty`), checkJwt, getSpecialties);
  app.get(encodeURI(`${context}/specialty/:id`), checkJwt, getSpecialtyById);
  app.put(encodeURI(`${context}/specialty/:id`), checkJwt, updateSpecialty);
  app.delete(encodeURI(`${context}/specialty/:id`), checkJwt, deleteSpecialty);
};
