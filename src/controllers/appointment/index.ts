import { Request, Response } from 'express';
import db from '../../db/postgres';
import { AppointmentDTO } from './appointment.dto';
import { validate } from 'class-validator';

async function createAppointment(req: Request, res: Response) {
  try {
    const { doctorid, patientid, duedate, description, typedateid } = req.body as AppointmentDTO;
    const appointmentDto = new AppointmentDTO();
    appointmentDto.doctorid = doctorid;
    appointmentDto.patientid = patientid;
    appointmentDto.duedate = duedate;
    appointmentDto.description = description;
    appointmentDto.typedateid = typedateid;

    const errors = await validate(appointmentDto);

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const newAppointment = await db.one(
      'INSERT INTO appointments(doctorid, patientid, duedate, description, typedateid) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [doctorid, patientid, duedate, description, typedateid],
    );

    res.status(201).json(newAppointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getAppointments(req: Request, res: Response) {
  try {
    const appointments = await db.any('SELECT * FROM appointments');
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error getting appointments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getAppointmentById(req: Request, res: Response) {
  try {
    const appointmentId = parseInt(req.params.id, 10);
    const appointment = await db.oneOrNone('SELECT * FROM appointments WHERE id = $1', [
      appointmentId,
    ]);

    if (appointment) {
      res.status(200).json(appointment);
    } else {
      res.status(404).json({ error: 'Appointment not found' });
    }
  } catch (error) {
    console.error('Error getting appointment by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
async function getFullDates(req: Request, res: Response) {
  try {
    const appointmentIds: number[] = req.body;

    let query = `
      SELECT
        a.id AS appointment_id,
        p.name AS patient_name,
        d.name AS doctor_name,
        a.dueDate AS appointment_date,
        td.name AS type_date_name,
        s.name AS specialty_name
      FROM
        appointments a
      JOIN
        patients p ON a.patientId = p.id
      JOIN
        doctors d ON a.doctorid = d.id
      JOIN
        type_dates td ON a.typeDateId = td.id
      JOIN
        specialties s ON d.specialty_id = s.id
    `;

    if (appointmentIds.length > 0) {
      query += 'WHERE p.id IN ($1:csv)';
    }

    const fullDates = await db.any(query, [appointmentIds]);

    res.status(200).json(fullDates);
  } catch (error) {
    console.error('Error getting full dates:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateAppointment(req: Request, res: Response) {
  try {
    const appointmentId = parseInt(req.params.id, 10);
    const { doctorid, patientid, duedate, description, typedateid } = req.body as AppointmentDTO;
    const appointmentDto = new AppointmentDTO();
    appointmentDto.doctorid = doctorid;
    appointmentDto.patientid = patientid;
    appointmentDto.duedate = duedate;
    appointmentDto.description = description;
    appointmentDto.typedateid = typedateid;

    const errors = await validate(appointmentDto);

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const updatedAppointment = await db.one(
      'UPDATE appointments SET doctorid = $1, patientid = $2, duedate = $3, description = $4, typedateid = $5 WHERE id = $6 RETURNING *',
      [doctorid, patientid, duedate, description, typedateid, appointmentId],
    );

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteAppointment(req: Request, res: Response) {
  try {
    const appointmentId = parseInt(req.params.id, 10);

    await db.none('DELETE FROM appointments WHERE id = $1', [appointmentId]);

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getFullDates,
};
