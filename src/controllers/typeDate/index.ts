import { Request, Response } from 'express';
import db from '../../db/postgres';
import { TypeDateDTO } from './typeDate.dto';
import { validate } from 'class-validator';

async function createTypeDate(req: Request, res: Response) {
  try {
    const { name, description, specialty_id } = req.body as TypeDateDTO;
    const typeDateDto = new TypeDateDTO();
    typeDateDto.name = name;
    typeDateDto.description = description;
    typeDateDto.specialty_id = specialty_id;

    const errors = await validate(typeDateDto);

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const newTypeDate = await db.one(
      'INSERT INTO type_dates(name, description, specialty_id) VALUES($1, $2, $3) RETURNING *',
      [name, description, specialty_id],
    );

    res.status(201).json(newTypeDate);
  } catch (error) {
    console.error('Error creating type_date:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getTypeDates(req: Request, res: Response) {
  try {
    const typeDates = await db.any('SELECT * FROM type_dates');
    res.status(200).json(typeDates);
  } catch (error) {
    console.error('Error getting type_dates:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getTypeDateById(req: Request, res: Response) {
  try {
    const typeDateId = parseInt(req.params.id, 10);
    const typeDate = await db.oneOrNone('SELECT * FROM type_dates WHERE id = $1', [typeDateId]);

    if (typeDate) {
      res.status(200).json(typeDate);
    } else {
      res.status(404).json({ error: 'Type Date not found' });
    }
  } catch (error) {
    console.error('Error getting type_date by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateTypeDate(req: Request, res: Response) {
  try {
    const typeDateId = parseInt(req.params.id, 10);
    const { name, description, specialty_id } = req.body as TypeDateDTO;
    const typeDateDto = new TypeDateDTO();
    typeDateDto.name = name;
    typeDateDto.description = description;
    typeDateDto.specialty_id = specialty_id;

    const errors = await validate(typeDateDto);

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const updatedTypeDate = await db.one(
      'UPDATE type_dates SET name = $1, description = $2, specialty_id = $3 WHERE id = $4 RETURNING *',
      [name, description, specialty_id, typeDateId],
    );

    res.status(200).json(updatedTypeDate);
  } catch (error) {
    console.error('Error updating type_date:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteTypeDate(req: Request, res: Response) {
  try {
    const typeDateId = parseInt(req.params.id, 10);

    await db.none('DELETE FROM type_dates WHERE id = $1', [typeDateId]);

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting type_date:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export { createTypeDate, getTypeDates, getTypeDateById, updateTypeDate, deleteTypeDate };
