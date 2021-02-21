import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { Controller } from "react-hook-form";

const ReactHookFormSelect = ({
  name,
  label,
  control,
  required,
  defaultValue,
  children,
  ...props
}) => {
  const labelId = `${name}-label`;
  return (
    <FormControl {...props}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        as={
          <Select labelId={labelId} label={label} >
            {children}
          </Select>
        }
        rules={{ required: required }}
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};


ReactHookFormSelect.defaultProps = {
  required: false
};

export default ReactHookFormSelect;
