import { StudentsRepository } from "../models/students/StudentsRepository.js";
import Student from "../models/students/Student.js";

const studentsRepository = new StudentsRepository();

export const getStudents = async (req, res) => {
  const students = await studentsRepository.getStudents();
  if (students.length) {
    return res.status(200).json(students);
  }
  return res.status(200).json({ message: "Não há estudantes cadastrados" });
};

export const getStudent = async (req, res) => {
  const { id } = req.params;
  const student = await studentsRepository.getStudentById(id);

  if (!student) res.status(404).send({ message: "Estudante não encontrado!" });

  return res.send(student);
};

export const createStudent = async (req, res) => {
  const { name, age, email, code, grade } = req.body;
  const student = new Student(name, age, email, code, grade);

  studentsRepository.addStudent(student);

  return res.status(201).send(student);
};

export const updateStudent = async (req, res) => {
  
  try {
    const { id } = req.params;
const { name, age, email, code, grade } = req.body;

const studentById = await studentsRepository.getStudentById(id);
const studentByEmail = await studentsRepository.getStudentByEmail(email);

if (!studentById) {
  return res.status(404).send({ message: "Estudante não encontrado" });
}

if (studentByEmail && studentByEmail.id !== id) {
  return res.status(409).send({ message: "Email já cadastrado" });
}

const student = await studentsRepository.updateStudent(id, name,age, email, code, grade);

return res
  .status(200)
  .send({ message: "Estudante atualizado com sucesso", user });
  } catch (error) {
    return res.status(500).send({message: "Erro ao editar Estudante!", error: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  const student = await studentsRepository.getStudentById(id);

  if (!student) res.status(404).send({ message: "Estudante não encontrado!" });

  studentsRepository.deleteStudent(id);

  return res.send(student);
};