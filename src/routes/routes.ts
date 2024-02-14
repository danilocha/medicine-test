import { Application, Request, Response } from 'express';

const appRouter = (app: Application, appConfig: any, version: string) => {
  // Routes
  require('./specialty')(app, appConfig);
  require('./doctor')(app, appConfig);
  require('./patient')(app, appConfig);
  require('./typeDate')(app, appConfig);
  require('./appointment')(app, appConfig);

  app.get(encodeURI('/'), (req: Request, res: Response) => {
    res.status(200).send(`Welcome to server express - v${encodeURI(version)}`);
  });
};

module.exports = appRouter;
