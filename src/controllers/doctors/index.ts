import { Request, Response } from 'express';
import db from '../../db/postgres';
import { DoctorDTO } from './doctor.dto';
import { validate } from 'class-validator';

async function createDoctor(req: Request, res: Response) {
  try {
    const { name, specialty_id, bio } = req.body as DoctorDTO;
    const doctorDto = new DoctorDTO();
    doctorDto.name = name;
    doctorDto.specialty_id = specialty_id;
    doctorDto.bio = bio;

    const errors = await validate(doctorDto);

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const newDoctor = await db.one(
      'INSERT INTO doctors(name, specialty_id, bio) VALUES($1, $2, $3) RETURNING *',
      [name, specialty_id, bio],
    );

    res.status(201).json(newDoctor);
  } catch (error) {
    console.error('Error creating doctor:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getDoctors(req: Request, res: Response) {
  try {
    const doctors = await db.any('SELECT * FROM doctors');
    res.status(200).json(doctors);
  } catch (error) {
    console.error('Error getting doctors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getDoctorById(req: Request, res: Response) {
  try {
    const doctorId = parseInt(req.params.id, 10);
    const doctor = await db.oneOrNone('SELECT * FROM doctors WHERE id = $1', [doctorId]);

    if (doctor) {
      res.status(200).json(doctor);
    } else {
      res.status(404).json({ error: 'Doctor not found' });
    }
  } catch (error) {
    console.error('Error getting doctor by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateDoctor(req: Request, res: Response) {
  try {
    const doctorId = parseInt(req.params.id, 10);
    const { name, specialty_id, bio } = req.body as DoctorDTO;
    const doctorDto = new DoctorDTO();
    doctorDto.name = name;
    doctorDto.specialty_id = specialty_id;
    doctorDto.bio = bio;

    const errors = await validate(doctorDto);

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const updatedDoctor = await db.one(
      'UPDATE doctors SET name = $1, specialty_id = $2, bio = $3 WHERE id = $4 RETURNING *',
      [name, specialty_id, bio, doctorId],
    );

    res.status(200).json(updatedDoctor);
  } catch (error) {
    console.error('Error updating doctor:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteDoctor(req: Request, res: Response) {
  try {
    const doctorId = parseInt(req.params.id, 10);

    await db.none('DELETE FROM doctors WHERE id = $1', [doctorId]);

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export { createDoctor, getDoctors, getDoctorById, updateDoctor, deleteDoctor };
