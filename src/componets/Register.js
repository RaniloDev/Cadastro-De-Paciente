import React, { useEffect, useState } from "react";
import RegisterForm from "./RegisterForm";
import { database } from "../database/firebase";
import { ref, onValue, set, update, remove } from "firebase/database";

const Register = () => {
  const [patientData, setPatientData] = useState({});

  const [idCurrent, setIdCurrent] = useState("");

  useEffect(() => {
    const databaseRef = ref(database, "pacientes");
    onValue(databaseRef, (snapshot) => {
      if (snapshot.val() != null) {
        const data = snapshot.val();
        console.log("Dados recebidos do Firebase:", data);
        setPatientData(data);
      } else {
        console.log("Nenhum dado encontrado.");
      }
    });
  }, []);

  const addEdit = (values) => {
    if (idCurrent === "") {
      let newPatientRef = ref(database, `pacientes/${values.fullName}`);
      set(newPatientRef, values)
        .then(() => {
          console.log("Dados salvos com sucesso.");
        })
        .catch((error) => {
          console.error("Erro ao salvar os dados: ", error);
        });
    } else {
      let existingPatientRef = ref(database, `pacientes/${idCurrent}`);
      update(existingPatientRef, values)
        .then(() => {
          console.log("Dados atualizados com sucesso.");
        })
        .catch((error) => {
          console.error("Erro ao atualizar os dados: ", error);
        });
    }
  };

const delet = (key) => {
  if (window.confirm('Excluir cadastro?')) {
    let patientRef = ref(database, `pacientes/${key}`);
    remove(patientRef)
      .then(() => {
        console.log("Cadastro excluído com sucesso.");
      })
      .catch((error) => {
        console.error("Erro ao excluir o cadastro: ", error);
      });
  }
};

  return (
    <div>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">Cadastro de Pacientes</h1>
          <p className="lead">Hospital Dom Malan</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5">
          <RegisterForm {...{ addEdit, idCurrent, patientData, setIdCurrent }} />
        </div>
        <div className="col-md-7">
          <table className="table table-borderless table-striped">
            <thead className="thead-light">
              <tr>
                <th>Nome Completo</th>
                <th>Telefone</th>
                <th>E-mail</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(patientData).length > 0 ? (
                Object.keys(patientData).map((id) => (
                  <tr key={id}>
                    <td>{patientData[id].fullName}</td>
                    <td>{patientData[id].phoneNumber}</td>
                    <td>{patientData[id].email}</td>

                    <td>
                      <a
                        className="btn btn-outline-primary"
                        onClick={() => {
                          setIdCurrent(id);
                        }}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </a>

                      <span> </span>

                      <a className="btn btn-outline-danger" onClick={ () => delet(id)}>
                        <i className="fa-solid fa-trash"></i>
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Nenhum paciente encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div>
      <img className="gov" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhSJnrXbjnxhtsswfQUB-4577oIzic_UxYUQ&s"></img>
      </div>
    </div>
  );
};

export default Register;
