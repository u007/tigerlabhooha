import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

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
        as={(
          <Select labelId={labelId} label={label}>
            {children}
          </Select>
        )}
        rules={{ required }}
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};

ReactHookFormSelect.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  control: PropTypes.shape({}).isRequired,
  required: PropTypes.bool,
  defaultValue: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element),
};

ReactHookFormSelect.defaultProps = {
  name: '',
  required: false,
  label: '',
  defaultValue: null,
  children: null,
};

export default ReactHookFormSelect;
