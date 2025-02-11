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
        />
      </div>

      <div className="row">
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fa-solid fa-mobile-screen"></i>
            </div>
          </div>

          <input
            className="form-control"
            placeholder="Telefone"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fa-solid fa-envelope"></i>
            </div>
          </div>

          <input
            className="form-control"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <textarea
          className="form-control"
          placeholder="Endereço"
          name="address"
          value={values.address}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <input
          type="submit"
          value={props.idCurrent === '' ? 'Salvar' : 'Atualizar'}
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

export default RegisterForm;
