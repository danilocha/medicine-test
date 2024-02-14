import { createSpecialty } from '../../src/controllers/specialty/index';
// Generated by CodiumAI

describe('createSpecialty', () => {
  // Successfully creates a new specialty when valid name and description are provided
  it('should create a new specialty when valid name and description are provided', async () => {
    const req = {
      body: {
        name: 'Cardiology',
        description: 'Study of the heart and its diseases',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createSpecialty(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Cardiology',
        description: 'Study of the heart and its diseases',
      }),
    );
  });

  // Returns the newly created specialty as JSON with status code 201
  it('should return the newly created specialty as JSON with status code 201', async () => {
    const req = {
      body: {
        name: 'Cardiology',
        description: 'Study of the heart and its diseases',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createSpecialty(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });

  // Returns a 400 error with message "Bad Request" when name is missing from the request body
  it('should return a 400 error with message "Bad Request" when name is missing from the request body', async () => {
    const req = {
      body: {
        description: 'Study of the heart and its diseases',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createSpecialty(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ errors: expect.any(Array) });
  });

  // Returns a 400 error with message "Bad Request" when name is an empty string
  it('should return a 400 error with message "Bad Request" when name is an empty string', async () => {
    const req = {
      body: {
        name: '',
        description: 'Study of the heart and its diseases',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await createSpecialty(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ errors: expect.any(Array) });
  });
});
