import React from 'react';
import { Fetcher } from '../../../common';
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import {getFields} from '../../DataExport/CreateDataExport/Fields';
import {getOperators, getAdvOpts, processBackEndSearch} from '../../DataExport/CreateDataExport/utils';
import AdvancedFilter from '../../AdvancedFilter/AdvancedFilter';
import { removeEmptyValues } from '../../../utils/utils';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useBranches } from '../../../contexts/BranchesContext';
import { useCurrencies } from '../../../contexts/CurrenciesContext';

const branchFieldNames = {
  CLIENT: 'branch_id',
  PAYMENT: 'branch_id',
  GROUP: 'branch_id',
  LOAN: 'branch_id',
  JOURNAL: 'branch_id',
  INSTALLMENT: 'loan__branch_id',
  TXN: 'loan__branch_id',
  NOK: 'client__branch_id',
  ADDRESS: 'client__branch_id',
  MEMBER: 'group__branch_id',
  COLLATERAL: 'loan__branch_id',
};

const currencyFieldNames = {
  LOAN: 'currency_id',
  PAYMENT: 'currency_id',
  JOURNAL: 'currency_id',
  INSTALLMENT: 'loan__currency_id',
  TXN: 'loan__currency_id',
  COLLATERAL: 'currency_id',
};

function EditDataExport() {
    const params = useParams();

    return (
        <Fetcher urls={[`/reportsapi/get_export/${params.dataexportId}/`, '/reportsapi/get_entity_fields/']}>
            {({data}) => {
                const dataexport = data[0];
                const fields = data[1];
                if (!fields[dataexport.base_entity]) {
                    return (
                        <div>This report cannot be edited.</div>
                    )
                }
                return (
                    <EntityForm
                        dataexport={dataexport}
                        fields={fields}
                    />
                )
            }}
        </Fetcher>
    )
}

function EntityForm({ dataexport, fields }) {
    const initFieldNames = dataexport.fields.map(field => field.field_name);
    const initFields = fields[dataexport.base_entity].filter(
        field => initFieldNames.includes(field.field_name)
    ).map(field => ({label: field.display_name, value: field.field_name}));
    const [values, setValues] = React.useState({
        data_export_name: dataexport.data_export_name,
        data_export_file_format: dataexport.data_export_file_format,
        fields: dataexport.fields
    });
    const [optionSelected, setOptionSelected] = React.useState(initFields);
    const [errors, setErrors] = React.useState({});
    const initQuery = processBackEndSearch(dataexport.search);
    const [search, setSearch] = React.useState(initQuery);
    const [basicSearchFields, setBasicSearchFields] = React.useState([]);

    const {branches} = useBranches();
    const {currencies} = useCurrencies();

    React.useEffect(() => {
        const basicSearchFields = [];
        const branchName = branchFieldNames[dataexport.base_entity];
        const currencyName = currencyFieldNames[dataexport.base_entity];
        if (dataexport.base_entity === 'JOURNAL') {
            basicSearchFields.push({name: 'branch_debited_id', label: 'Branch Debited', datatype: 'select', values: branches.map(branch => ({name: branch.id, label: branch.name}))});
            basicSearchFields.push({name: 'branch_credited_id', label: 'Branch Credited', datatype: 'select', values: branches.map(branch => ({name: branch.id, label: branch.name}))});
        }
        if (branchName) {
            basicSearchFields.push({name: branchName, label: 'Branch', datatype: 'select', values: branches.map(branch => ({name: branch.id, label: branch.name}))});
        }
        if (currencyName) {
            basicSearchFields.push({name: currencyName, label: 'Currency', datatype: 'select', values: currencies.map(currency => ({name: currency.id, label: currency.shortname}))});
        }
        setBasicSearchFields(basicSearchFields);
    }, []);

    const navigate = useNavigate();

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

    const onSubmit = async () => {
        const fields = processFields(values.fields);
        let data = {
            data_export_name: values.data_export_name,
            data_export_file_format: values.data_export_file_format,
            search,
            ...fields
        };
        data = removeEmptyValues(data);
        try {
            const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
            const response = await axios.post(`/reportsapi/update_export/${dataexport.id}/`, data, CONFIG);
            navigate({pathname: `/data/viewdata/dataexport/${response.data.report_pk}`});
        } catch (error) {
            console.log(error);
            if (error.message === 'Network Error') {
            setErrors({detail: 'Network Error'});
            } else if (error.response.status >= 400 && error.response.status < 500) {
            setErrors(error.response.data);
            } else {
            setErrors({detail: 'Server Error'});
            }
        }
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
                        <option value='pdf'>PDF</option>
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
            <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
            <div style={{display:'flex', justifyContent: 'flex-end'}}>
                <button className='btn btn-info' type='submit' onClick={onSubmit}>
                    Submit
                </button>
            </div>
        </>
    )
}

const processFields = (fields) => {
  const native_fields = fields.filter(field => field.type === 'native').map(field => field.field_name);
  const custom_fields = fields.filter(field => field.type === 'custom').map(field => {
    const startIndex = 7;
    const endIndex = field.field_name.lastIndexOf('_');
    let field_name = field.field_name.slice(startIndex, endIndex);
    return {field_set_id: field.custom_field_set_id, field_name: field_name};
  })
  const annotated_fields = fields.filter(field => field.type === 'annotation').map(field => field.field_name);
  return {native_fields, custom_fields, annotated_fields}
}

export default EditDataExport;