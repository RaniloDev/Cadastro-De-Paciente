import React, { useEffect, useState } from "react";

const RegisterForm = (props) => {
  const initialValueFields = {
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
  };

  const [values, setValues] = useState(initialValueFields);

  useEffect(() => {
    if (props.idCurrent === "") {
      setValues({
        ...RegisterForm,
      });
    } else {
      setValues({
        ...props.patientData[props.idCurrent],
      });
    }
  }, [props.idCurrent, props.patientData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const manipulateForm = (e) => {
    e.preventDefault();
    if (!values.fullName) {
      alert("Por favor, preencha o campo Nome Completo antes de enviar.");
      return;
    }
    props.addEdit(values);
    setValues(initialValueFields);
    props.setIdCurrent("");
  };

  return (
    <form autoComplete="off" onSubmit={manipulateForm}>
      <div className="form-group input-group input-group mb-3">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fa-solid fa-user"></i>
          </div>
        </div>

        <input
          className="form-control input-group-prepend"
          placeholder="Nome Completo"
          name="fullName"
          value={values.fullName}
          onChange={handleChange}
          required
        />
      </div>

      <div
