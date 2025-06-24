import { expect } from 'chai';
import request from 'supertest';
import app from '../src/app';

describe('API STUDENT', () => {
    it('GET /students debe mostar todos los estudiantes', async () => {
        const res = await request(app).get('/students')
        expect(res.status).equal(200)
        expect(res.body).to.have.property('students').that.is.an('array')
        expect(res.body.students.length).to.be.greaterThan(0)})

    it('POST/ students debe crear un estudiante', async () => {
    const nuevoEstudiante = {
      id: 4,
      name: 'Melissa Solorzano',
      age: 20,
      email: 'melissa.solorzano@gmail.com',
    }

    const res = await request(app).post('/students').send(nuevoEstudiante)
    expect(res.status).to.equal(201)
    expect(res.body).to.have.property('message', 'Student created successfully')
    expect(res.body).to.have.property('student')
    expect(res.body.student).to.include(nuevoEstudiante)
    })


  it('POST /students debe fallar si falta el nombre', async () => {
    const res = await request(app).post('/students').send({
      id: 5,
      age: 20,
      email: 'solorzano@gmail.com',
    })

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('errors').that.includes('Name is required');
  });

  it('POST /students debe fallar si la edad es 0 o inválida', async () => {
    const res = await request(app).post('/students').send({
      id: 6,
      name: 'Melissa Solorzano',
      age: 0,
      email: 'melissa.solorzano@example.com',
    })

    expect(res.status).to.equal(400);
    expect(res.body.errors).to.include('Age must be a number greater than 0');
  });

  it('POST /students debe fallar si el email es inválido', async () => {
    const res = await request(app).post('/students').send({
      id: 7,
      name: 'Melissa Solorzano',
      age: 20,
      email: 'melissa.solorzano',
    });

    expect(res.status).to.equal(400);
    expect(res.body.errors).to.include('Email format is invalid');
  });
})