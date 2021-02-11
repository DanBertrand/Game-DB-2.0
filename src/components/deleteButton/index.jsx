import React from 'react';

const DeleteButton = ({ updateSearch }) => (
  <button type="button" onClick={(e) => updateSearch('remove')}>Clear history</button>
);

export default DeleteButton;
