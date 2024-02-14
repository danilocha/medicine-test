import { Request, Response } from 'express';
import db from '../../db/postgres';
import { SpecialtyDTO } from './specialty.dto';
import { validate } from 'class-validator';

interface RequestBody {
  body: {
    name?: string;
    description?: string;
  };
}

interface ResponseObject {
  status: (code: number) => ResponseObject;
  json: (data?: any) => ResponseObject;
}

async function createSpecialty(req: Request | RequestBody, res: Response | ResponseObject) {
  try {
    const { name, description } = req.body as SpecialtyDTO;
    const specialtyDto = new SpecialtyDTO();
    specialtyDto.name = name;
    specialtyDto.description = description;

    const errors = await validate(specialtyDto);

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const newSpecialty = await db.one(
      'INSERT INTO specialties(name, description) VALUES($1, $2) RETURNING *',
      [name, description],
    );

    res.status(201).json(newSpecialty);
  } catch (error) {
    console.error('Error creating specialty:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getSpecialties(req: Request, res: Response) {
  try {
    const specialties = await db.any('SELECT * FROM specialties');
    res.status(200).json(specialties);
  } catch (error) {
    console.error('Error getting specialties:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getSpecialtyById(req: Request, res: Response) {
  try {
    const specialtyId = parseInt(req.params.id, 10);
    const specialty = await db.oneOrNone('SELECT * FROM specialties WHERE id = $1', [specialtyId]);

    if (specialty) {
      res.status(200).json(specialty);
    } else {
      res.status(404).json({ error: 'Specialty not found' });
    }
  } catch (error) {
    console.error('Error getting specialty by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateSpecialty(req: Request, res: Response) {
  try {
    const specialtyId = parseInt(req.params.id, 10);
    const { name, description } = req.body as SpecialtyDTO;
    const specialtyDto = new SpecialtyDTO();
    specialtyDto.name = name;
    specialtyDto.description = description;

    const errors = await validate(specialtyDto);

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const updatedSpecialty = await db.one(
      'UPDATE specialties SET name = $1, description = $2 WHERE id = $3 RETURNING *',
      [name, description, specialtyId],
    );

    res.status(200).json(updatedSpecialty);
  } catch (error) {
    console.error('Error updating specialty:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteSpecialty(req: Request, res: Response) {
  try {
    const specialtyId = parseInt(req.params.id, 10);

    await db.none('DELETE FROM specialties WHERE id = $1', [specialtyId]);

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting specialty:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export { createSpecialty, getSpecialties, getSpecialtyById, updateSpecialty, deleteSpecialty };
