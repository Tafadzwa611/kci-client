import React from 'react'
import EntityForm from './EntityForm';
import {addSchema} from './schema';

function Entity({setTab}) {
    const initialValues = {data_export_name: '', data_export_file_format: '', base_entity: '', base_entity_fields: []};

    const onSubmit = async (values, actions) => {
      console.log(values)
        // try {
        //   const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
        //   const response = await axios.post('/reportsapi/create_export/', values, CONFIG);
        // } catch (error) {
        //   console.log(error);
        //   if (error.message === "Network Error") {
        //     actions.setErrors({responseStatus: "Network Error"});
        //   } else if (error.response.status >= 400 && error.response.status < 500) {
        //     actions.setErrors({responseStatus: error.response.status, ...error.response.data});
        //   } else {
        //     actions.setErrors({responseStatus: error.response.status});
        //   }
        // }
    }

    return (
        <div className='data__export'>
            <div className='data__export__fields j-details-container'>
                <EntityForm 
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={addSchema}
                  setTab={setTab}
                />
            </div>
            <div className='data__export__selected__fields j-details-container'>
                ffffffffff
            </div>
        </div>
    )
}

export default Entity;
