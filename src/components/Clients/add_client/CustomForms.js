import React from 'react'

function CustomForms({client_type_id, customForms}) {
  const applicableForms = customForms.filter(form => form.client_type_id == client_type_id);
  return (
    <div>
      
    </div>
  )
}

function  CustomForm(customForms) {
  
}

export default CustomForms
