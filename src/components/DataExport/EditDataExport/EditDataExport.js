import React from 'react';
import { Fetcher } from '../../../common';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import {getFields} from '../../DataExport/CreateDataExport/Fields';
import {getOperators, getAdvOpts, processBackEndSearch} from '../../DataExport/CreateDataExport/utils';
import AdvancedFilter from '../../AdvancedFilter/AdvancedFilter';

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
        fields: []
    });
    const initFieldNames = dataexport.fields.map(field => field.field_name);
    const initFields = fields[dataexport.base_entity].filter(
        field => initFieldNames.includes(field.field_name)
    ).map(field => ({label: field.display_name, value: field.field_name}));
    const [optionSelected, setOptionSelected] = React.useState(initFields);
    const [errors, setErrors] = React.useState({});
    const initQuery = processBackEndSearch(dataexport.search);
    const [search, setSearch] = React.useState(initQuery);
    const [basicSearchFields, setBasicSearchFields] = React.useState([]);

    const onChange = (evt) => {
        const {name, value} = evt.target;
        setValues(curr => ({...curr, [name]: value}));
    }

    const handleMultiSelect = selected => {
        setOptionSelected(selected);
        const selectedFields = [];
        selected.forEach(opt => {
            const field = fields[dataexport.base_entity].find(field => field.field_name === opt.value);
            selectedFields.push(field);
        });
        setValues(curr => ({...curr, fields: selectedFields}));
    }

    return (
        <>
            <div className='divider divider-info' style={{marginTop:'0'}}><span>Fields</span></div>
            {errors.detail && (
                <div className='col-12' style={{color:"red", padding:"1.75rem 1rem", border:"1px solid red", backgroundColor: "#ffe5e5"}}>
                    {JSON.stringify(errors.detail)}
                </div>
            )}
            <div className='row custom-background'>
                <label className='form-label'>Data Export Name<span style={{color: 'red'}}>&#42;</span></label>
                <div className='col-9'>
                    <input name='data_export_name' value={values.data_export_name} type='text' className='custom-select-form' onChange={onChange}/>
                    {errors.data_export_name && <div className='error'>{JSON.stringify(errors.data_export_name)}</div>}
                </div>
            </div>
            <div className='row custom-background'>
                <label className='form-label'>File Format<span style={{color: 'red'}}>&#42;</span></label>
                <div className='col-9'>
                    <select name='data_export_file_format' value={values.data_export_file_format} className='custom-select-form' onChange={onChange}>
                        <option value=''>------</option>
                        <option value='xlsx'>XLXS</option>
                        <option value='csv'>CSV</option>
                    </select>
                    {errors.data_export_file_format && <div className='error'>{JSON.stringify(errors.data_export_file_format)}</div>}
                </div>
            </div>
            <div className='row custom-background'>
                <label className='form-label'>Fields<span style={{color: 'red'}}>&#42;</span></label>
                <div className='col-9'>
                    <Select
                        isMulti
                        name='multi-select'
                        options={[{label: 'Select all', value: '*'}, ...fields[dataexport.base_entity].map(field => ({label: field.display_name, value: field.field_name}))]}
                        value={optionSelected}
                        className='basic-multi-select'
                        classNamePrefix='select'
                        onChange={selected => {
                            if (selected !== null && selected.length > 0 && selected[selected.length - 1].value === '*') {
                                return handleMultiSelect(fields[dataexport.base_entity].map(field => ({label: field.display_name, value: field.field_name})));
                            }
                            handleMultiSelect(selected);
                        }}
                    />
                </div>
            </div>
            <div className='row custom-background'>
                <label className='form-label'>Filters</label>
                <AdvancedFilter
                    key={dataexport.base_entity}
                    fields={[...basicSearchFields, ...getFields(dataexport.base_entity)]}
                    getAdvOpts={getAdvOpts(dataexport.base_entity)}
                    getOperators={getOperators}
                    onQueryChange={q => setSearch(q)}
                    initQuery={search}
                />
            </div>
        </>
    )
}

const a = {
    "id": "root",
    "combinator": "and",
    "rules": [
        {
            "id": "r-0.19030902309660325",
            "field": "date_of_birth",
            "operator": "=",
            "valueSource": "value",
            "value": "09/06/2025"
        }
    ]
}

const b = {
    "combinator": "AND",
    "date_of_birth": [{"date_of_birth": "09/06/2025"}],
    "status": [],
    "full_name": [],
    "first_name": [],
    "last_name": [],
    "gender": [],
    "client_id": [],
    "client_type": [],
    "reg_date": [],
    "branch_ids": [],
    "email": [],
    "phone_number": [],
    "phone_number_secondary": [],
    "whatsapp_number": [],
    "home_phone": [],
    "address": [],
    "ownership": [],
    "city": [],
    "country": [],
    "nok_first_name": [],
    "nok_last_name": [],
    "nok_phone_number": [],
    "nok_address": [],
    "nok_city": [],
    "nok_country": [],
    "nok_gender": []
}

const search = {
    "combinator": "AND",
    "gender": [{"gender__iexact": "FEMALE"}, {"not_gender__iexact": "MALE"}],
    "branch_ids": [{"branch_id": 111}, {"not_branch_id": "112"}],
    "first_name": [
        {"first_name__iexact": "Tanaka"},
        {"not_first_name__iexact": "Tanaka"},
        {"first_name__icontains": "Tanaka"},
        {"not_first_name__icontains": "Tanaka"},
        {"first_name__istartswith": "Tanaka"},
        {"not_first_name__istartswith": "Tanaka"},
        {"first_name__iendswith": "Tanaka"},
        {"not_first_name__iendswith": "Tanaka"}
    ],
    "date_of_birth": [
        {
            "date_of_birth": "07/06/2022"
        },
        {
            "not_date_of_birth": "09/06/2025"
        },
        {
            "date_of_birth__lt": "01/06/2025"
        },
        {
            "date_of_birth__gt": "09/06/2025"
        },
        {
            "date_of_birth__lte": "01/04/2025"
        },
        {
            "date_of_birth__gte": "01/06/2021"
        },
        {
            "date_of_birth__range": [
                "09/06/2025",
                "27/06/2025"
            ]
        },
        {
            "not_date_of_birth__range": [
                "09/06/2025",
                "30/06/2025"
            ]
        }
    ]
}

export default EditDataExport;