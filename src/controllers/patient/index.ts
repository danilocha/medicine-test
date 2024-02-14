import { Request, Response } from 'express';
import db from '../../db/postgres';
import { PatientDTO } from './patient.dto';
import { validate } from 'class-validator';

async function createPatient(req: Request, res: Response) {
  try {
    const { name, bio } = req.body as PatientDTO;
    const patientDto = new PatientDTO();
    patientDto.name = name;
    patientDto.bio = bio;

    const errors = await validate(patientDto);

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const newPatient = await db.one('INSERT INTO patients(name, bio) VALUES($1, $2) RETURNING *', [
      name,
      bio,
    ]);

    res.status(201).json(newPatient);
  } catch (error) {
    console.error('Error creating patient:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getPatients(req: Request, res: Response) {
  try {
    const patients = await db.any('SELECT * FROM patients');
    res.status(200).json(patients);
  } catch (error) {
    console.error('Error getting patients:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getPatientById(req: Request, res: Response) {
  try {
    const patientId = parseInt(req.params.id, 10);
    const patient = await db.oneOrNone('SELECT * FROM patients WHERE id = $1', [patientId]);

    if (patient) {
      res.status(200).json(patient);
    } else {
      res.status(404).json({ error: 'Patient not found' });
    }
  } catch (error) {
    console.error('Error getting patient by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updatePatient(req: Request, res: Response) {
  try {
    const patientId = parseInt(req.params.id, 10);
    const { name, bio } = req.body as PatientDTO;
    const patientDto = new PatientDTO();
    patientDto.name = name;
    patientDto.bio = bio;

    const errors = await validate(patientDto);

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const updatedPatient = await db.one(
      'UPDATE patients SET name = $1, bio = $2 WHERE id = $3 RETURNING *',
      [name, bio, patientId],
    );

    res.status(200).json(updatedPatient);
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deletePatient(req: Request, res: Response) {
  try {
    const patientId = parseInt(req.params.id, 10);

    await db.none('DELETE FROM patients WHERE id = $1', [patientId]);

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export { createPatient, getPatients, getPatientById, updatePatient, deletePatient };
