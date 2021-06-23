import React from "react";
import { useForm, useController } from "react-hook-form";
import { Form, InputGroup } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
});

const getError = ({ isTouched, invalid, error }) => {
  const errorMessage = (isTouched && invalid && error?.message) || "";
  return {
    errorMessage,
    hasError: !!errorMessage,
  };
};

export const InputField = ({ label, type = "text", ...rest }) => {
  const { field, fieldState } = useController(rest);
  const { errorMessage, hasError } = getError(fieldState);
  return (
    <Form.Group {...rest}>
      {label && <Form.Label>{label}</Form.Label>}
      <InputGroup hasValidation>
        <Form.Control {...field} type={type} isInvalid={hasError} />
        <Form.Control.Feedback type="invalid">
          {errorMessage}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
};

export const TestForm = () => {
  const { handleSubmit, control } = useForm({
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = () => console.log("Submitted: ", { values });

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      style={{ width: "700px", padding: "1rem" }}
    >
      <InputField name="first_name" label="First Name" control={control} />
      <InputField name="last_name" label="Last Name" control={control} />
    </Form>
  );
};
