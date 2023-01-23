import axios from "axios";
import styles from './admin.module.scss';
import { FormEvent, useEffect, useState } from "react"

type Student = {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  link: string;
}

export default function Admin() {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');

  const [students, setStudents] = useState<Student[]>([])

  async function getStudents() {
    const studentsResponse = await axios.get('/api/list/students')

    setStudents(studentsResponse.data)
  }

  useEffect(() => {
    getStudents()
  }, [])

  async function handleSubmitForm(e: FormEvent) {
    e.preventDefault();

    const body = {
      name, cpf, phone
    }

    try {
      axios.post('/api/create/student', body)
    } catch (err) {
      return;
    }

    setCpf('')
    setPhone('')
    setName('')

    await getStudents()
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmitForm(e)}>
        <label id="name">Name:</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <br />

        <label id="cpf">CPF:</label>
        <input id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} />
        <br />

        <label id="phone">Phone:</label>
        <input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <br />

        <input type="submit" value="Enviar" />
      </form>
      {students.map(student => {
        return (
          <div className={styles.studentList} key={student.id}>
            <p>Nome: {student.name}</p>
            <p>CPF: {student.name}</p>
            <p>Telefone: {student.phone}</p>
            <p>Link: {student.link}</p>
          </div>
        )
      })}
    </>
  )
}