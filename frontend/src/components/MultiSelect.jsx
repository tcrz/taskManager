import React from 'react';

import Select from 'react-select';

export const options = [
    { value: 'Mr. Andersen', label: 'Mr. Andersen' },
    { value: 'Peter Robinson', label: 'Peter Robinson' },
    { value: 'James Annorh', label: 'James Annorh' },
    { value: 'Belinda Davies', label: 'Belinda Davies' },
    { value: 'Bea Davies', label: 'inda Davies' },
  ]
  
const MultiSelect = () => (
  <Select
    // defaultValue={[]}
    isMulti
    name="participants"
    options={options}
    // isSearchable={false}
    className="basic-multi-select"
    classNamePrefix="select"
    allowSelectAll={true}
    closeMenuOnSelect={false}
    blurInputOnSelect={false}
    placeholder="Add Participants"
    maxMenuHeight={100}
  />
);

export default MultiSelect