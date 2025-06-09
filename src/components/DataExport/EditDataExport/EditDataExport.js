import React from 'react';
import { Fetcher } from '../../../common';
import { useParams } from 'react-router-dom';

function EditDataExport() {
    const params = useParams();

    return (
        <Fetcher urls={[`/reportsapi/get_export/${params.dataexportId}/`, '/reportsapi/get_entity_fields/']}>
            {({data}) => <EntityForm dataexport={data[0]} fields={data[1]} />}
        </Fetcher>
    )
}

function EntityForm({ dataexport, fields }) {
    const [values, setValues] = React.useState({
        data_export_name: dataexport.data_export_name,
        data_export_file_format: dataexport.data_export_file_format,
        base_entity: dataexport.base_entity,
        fields: []
    });
}

export default EditDataExport;