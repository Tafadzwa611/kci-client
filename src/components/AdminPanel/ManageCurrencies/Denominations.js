import React from 'react';
import {
  NonFieldErrors,
  SubmitButtonFilter,
  CustomInput,
  CustomSelect,
  ModalSubmit,
  SuccessBtn,
  CustomSelectFilter,
  CustomCheckbox,
  Modal
} from '../../../common';
import { Form, Formik } from 'formik';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import { getParams, removeEmptyValues } from '../../../utils/utils';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


const MODAL_STATES = {
  add: 'add',
  edit: 'edit',
  del: 'del',
  none: false,
};


function Denominations() {
  const [modal, setModal] = React.useState(MODAL_STATES.none);
  const [denominations, setDenominations] = React.useState([]);

  return (
    <div>
      <SuccessBtn handler={() => setModal(MODAL_STATES.add)} value='Add Denomination'/>
      <Filter setDenominations={setDenominations} />
      {modal == MODAL_STATES.add && (
        <AddDenomination
          setOpen={setModal}
          setDenominations={setDenominations}
        />
      )}
      <div style={{ paddingTop: '2rem' }}></div>
      <Table
        modal={modal}
        denominations={denominations}
        setModal={setModal}
        setDenominations={setDenominations}
      />
    </div>
  )
}


function Table({ denominations, modal, setModal, setDenominations }) {
  const denomRef = React.useRef(null);

  const openEditModal = (evt) => {
    const request = denominations.find(request => request.id == evt.target.id);
    denomRef.current = request;
    setModal(MODAL_STATES.edit);
  };

  const openDeleteModal = (evt) => {
    const request = denominations.find(request => request.id == evt.target.id);
    denomRef.current = request;
    setModal(MODAL_STATES.del);
  };

  return (
    <div style={{ display: 'block' }}>
      {modal === MODAL_STATES.edit && (
        <EditDenomination
          denomination={denomRef.current}
          setOpen={setModal}
          setDenominations={setDenominations}
        />
      )}
      <TableHeader denominations={denominations} />
      <div style={{ padding: '0', border: 'none' }}>
        <div style={{ width: '50%', overflowX: 'auto' }}>
          <div className='table__height'>
            <table className='table' id='requests'>
              <thead>
                <tr className='journal-details header' style={{ position: 'sticky', top: '0' }}>
                  <th style={{ textAlign: 'start' }}>Label</th>
                  <th style={{ textAlign: 'start' }}>Value</th>
                  <th style={{ textAlign: 'start' }}>Currency</th>
                  <th style={{ textAlign: 'start' }}>Created_By</th>
                  <th style={{ textAlign: 'start' }}>Is_Active</th>
                  <th style={{ textAlign: 'start' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {denominations.map(denomination => {
                  return (
                    <tr key={denomination.id}>
                      <td style={{ verticalAlign: 'middle' }}>
                        {denomination.label}
                      </td>
                      <td style={{ verticalAlign: 'middle' }}>
                        {denomination.value}
                      </td>
                      <td style={{ verticalAlign: 'middle' }}>
                        {denomination.currency.name}
                      </td>
                      <td style={{ verticalAlign: 'middle' }}>
                        {denomination.created_by.name}
                      </td>
                      <td style={{ verticalAlign: 'middle' }}>
                        {denomination.is_active}
                      </td>
                      <td style={{ verticalAlign: 'middle' }}>
                        <button
                          id={denomination.id}
                          onClick={openEditModal}
                          style={{
                            background: '#1bbf5f',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '.15rem',
                            cursor: 'pointer',
                            padding: '.2rem .25rem',
                            fontSize: '0.75rem',
                            marginLeft: '5px',
                          }}
                        >
                          Edit
                        </button>
                        <button
                          id={denomination.id}
                          onClick={openDeleteModal}
                          style={{
                            background: '#f5424b',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '.15rem',
                            cursor: 'pointer',
                            padding: '.2rem .25rem',
                            marginLeft: '5px',
                            fontSize: '0.75rem',
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}


const TableHeader = ({ denominations }) => {
  return (
    <div className='table-header'>
      <div style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
        <div style={{ marginTop: '6px' }}>Showing {denominations.length} denominations.</div>
      </div>
      <div style={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
        <div style={{ marginTop: '6px' }}>Page 1 of 1</div>
        <div>
          <ReactHTMLTableToExcel
            id='test-table-xls-button'
            className='btn btn-default'
            table='requests'
            filename='Payment Requests'
            sheet='tablexls'
            buttonText='Download as XLS'
          />
        </div>
      </div>
    </div>
  );
};


function Filter({ setDenominations }) {
  const onSubmit = async (values, actions) => {
    try {
      const data = removeEmptyValues(values);
      const params = getParams(data);
      const response = await axios.get('/acc-api/list_denomination/', { params: params });
      setDenominations(response.data);
    } catch (error) {
      if (error.message === 'Network Error') {
        actions.setErrors({ responseStatus: 'Network Error' });
      } else if (error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({ responseStatus: error.response.status, ...error.response.data });
      } else {
        actions.setErrors({ responseStatus: error.response.status });
      }
    }
  };

  const { currencies } = useCurrencies();

  return (
    <Formik initialValues={{currency_id: '', status: ''}} onSubmit={onSubmit}>
      {({ isSubmitting, errors }) => (
        <div className='search_background'>
          <div className='row-containers sf-shellwrap'>
            <Form>
              <NonFieldErrors errors={errors}>
                <div className='row row-payments row-loans sf-card'>
                  <div className='sf-row sf-row-2'>
                    <div className='row-payments-container sf-w-49'>
                      <CustomSelectFilter label='Currency' name='currency_id' required>
                        <option value=''>------</option>
                        {currencies.map(currency => (
                          <option key={currency.id} value={currency.id}>
                            {currency.fullname}
                          </option>
                        ))}
                      </CustomSelectFilter>
                    </div>
                    <div className='row-payments-container sf-w-49'>
                      <CustomSelectFilter label='Status' name='status'>
                        <option value=''>------</option>
                        <option value='active'>Active</option>
                        <option value='inactive'>Inactive</option>
                      </CustomSelectFilter>
                    </div>
                  </div>
                </div>
                <div className='sf-submit'>
                  <SubmitButtonFilter isSubmitting={isSubmitting} />
                </div>
              </NonFieldErrors>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
}


const AddDenomination = ({setOpen, setDenominations}) => {
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };
      const response = await axios.post(`/acc-api/create_denomination/`, values, CONFIG);
      setDenominations(curr => ([response.data, ...curr]));
      setOpen(MODAL_STATES.none);
    } catch (error) {
      if (error.message === 'Network Error') {
        actions.setErrors({responseStatus: 'Network Error'});
      } else if (error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({responseStatus: error.response.status, ...error.response.data});
      } else {
        actions.setErrors({responseStatus: error.response.status});
      }
    }
  }

  const initialValues = {
    label: '',
    currency_id: '',
    value: ''
  };

  const { currencies } = useCurrencies();

  return (
    <Modal open={true} setOpen={setOpen} title='Add Denomination'>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <div className='create_modal_container'>
              <div>
                <CustomInput label='Label' name='label' type='text' required/>
                <CustomSelect label='Currency' name='currency_id' required>
                  <option value=''>------</option>
                  {currencies.map(currency => (
                    <option key={currency.id} value={currency.id}>
                      {currency.fullname}
                    </option>
                  ))}
                </CustomSelect>
                <CustomInput label='Value' name='value' type='number' required/>
                <NonFieldErrors errors={errors}/>
              </div>
              <ModalSubmit isSubmitting={isSubmitting} setOpen={setOpen}/>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}


const EditDenomination = ({denomination, setOpen, setDenominations}) => {
  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };
      const response = await axios.put(`/acc-api/update_denomination/${denomination.id}/`, values, CONFIG);
      setDenominations(curr => curr.map(d => d.id === denomination.id ? response.data : d));
      setOpen(MODAL_STATES.none);
    } catch (error) {
      if (error.message === 'Network Error') {
        actions.setErrors({responseStatus: 'Network Error'});
      } else if (error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({responseStatus: error.response.status, ...error.response.data});
      } else {
        actions.setErrors({responseStatus: error.response.status});
      }
    }
  }

  const initialValues = {
    label: denomination.label,
    value: denomination.value,
    is_active: denomination.is_active,
    currency_id: denomination.currency.id,
  };

  return (
    <Modal open={true} setOpen={setOpen} title='Add Denomination'>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => (
          <Form>
            <div className='create_modal_container'>
              <div>
                <CustomInput label='Label' name='label' type='text' required/>
                <CustomInput label='Value' name='value' type='number' required/>
                <CustomCheckbox label='Is Active' name='is_active'/>
                <NonFieldErrors errors={errors}/>
              </div>
              <ModalSubmit isSubmitting={isSubmitting} setOpen={setOpen}/>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default Denominations;
