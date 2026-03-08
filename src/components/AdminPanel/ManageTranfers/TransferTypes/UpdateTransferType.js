import React, { useEffect, useMemo, useState } from 'react';
import TransferTypeForm from './TransferTypeForm';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { removeEmptyValues } from '../../../../utils/utils';
import { useBranches } from '../../../../contexts/BranchesContext';

function UpdateTransferType() {
  const { branches } = useBranches();
  const navigate = useNavigate();
  const { transfertype_id } = useParams();

  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const branch_ids = useMemo(
    () => (Array.isArray(branches) ? branches.map(b => b.id) : []),
    [branches]
  );

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);

        // ✅ Use list endpoint and normalize shape to a real array
        const res = await axios.get('/acc-api/transfer-types/');
        const raw = res.data;

        let list = [];

        // Case A: { tranfertypes: [...] }
        if (raw && Array.isArray(raw.tranfertypes)) {
          list = raw.tranfertypes;

          // Case B: [ [ ... ] ] or [ ... ]
        } else if (Array.isArray(raw)) {
          list = Array.isArray(raw[0]) ? raw[0] : raw;
        }

        if (!Array.isArray(list)) {
          throw new Error('TransferTypes response is not an array (unexpected API shape).');
        }

        const tt = list.find(x => String(x.id) === String(transfertype_id));
        if (!tt) {
          throw new Error(`TransferType id=${transfertype_id} not found.`);
        }

        const init = {
          currency_id: tt.currency ? String(tt.currency) : '',
          name: tt.name || '',
          branch_ids: tt.receiving_accounts_branches || [],
          receiving_accounts_ids: (tt.receiving_accounts || []).map(a => a.id),
          sending_accounts_ids: (tt.sending_accounts || []).map(a => a.id),
        };

        if (mounted) setInitialValues(init);
      } catch (error) {
        console.error('Failed to load transfer type for edit:', error);
        if (mounted) navigate('/users/admin/managetransfers');
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [transfertype_id, navigate]);

  const onSubmit = async (values, actions) => {
    try {
      const payload = {
        name: values.name,
        currency_id: Number(values.currency_id),
        receiving_accounts_ids: (values.receiving_accounts_ids || []).map(x => x.value ?? x),
        sending_accounts_ids: (values.sending_accounts_ids || []).map(x => x.value ?? x),
      };

      const data = removeEmptyValues(payload);

      const CONFIG = {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      };

      await axios.put(`/acc-api/update_transfertype/${transfertype_id}/`, data, CONFIG);

      navigate('/users/admin/managetransfers');
    } catch (error) {
      if (error.message === 'Network Error') {
        actions.setErrors({ responseStatus: 'Network Error' });
      } else if (error.response && error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({ responseStatus: error.response.status, ...error.response.data });
      } else {
        actions.setErrors({ responseStatus: error.response?.status });
      }
    }
  };

  if (loading) return <div style={{ padding: 16 }}>Loading...</div>;
  if (!initialValues) return <div style={{ padding: 16 }}>Transfer Type not found.</div>;

  return (
    <TransferTypeForm
      branch_ids={branch_ids}
      branches={branches}
      initialValues={initialValues}
      onSubmit={onSubmit}
    />
  );
}

export default UpdateTransferType;
