import React from 'react';
import { Fetcher } from '../../../common';

function ReportList() {
  const isMobile = window.innerWidth <= 900;

  return (
    <Fetcher urls={['/loansapi/approval_reports/']}>
      {({ data }) => (
        <div
          style={{
            display: 'block',
            width: '100%',
          }}
        >
          <div
            style={{
              padding: '0',
              border: 'none',
              width: '100%',
            }}
          >
            <div
              style={{
                width: '100%',
                overflowX: 'auto',
                overflowY: 'hidden',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              <div
                className='table__height'
                style={{
                  width: '100%',
                  minWidth: 0,
                }}
              >
                <table
                  className='table'
                  id='clients'
                  style={{
                    width: '100%',
                    minWidth: isMobile ? '760px' : '100%',
                  }}
                >
                  <thead>
                    <tr
                      className='journal-details header'
                      style={{
                        position: 'sticky',
                        top: '0',
                      }}
                    >
                      <th style={{ textAlign: 'start', whiteSpace: 'nowrap' }}>Status</th>
                      <th style={{ textAlign: 'start', whiteSpace: 'nowrap' }}>Uploaded_By</th>
                      <th style={{ textAlign: 'start', whiteSpace: 'nowrap' }}>Excel_Reference_Col</th>
                      <th style={{ textAlign: 'start', whiteSpace: 'nowrap' }}>Started_At</th>
                      <th style={{ textAlign: 'start', whiteSpace: 'nowrap' }}>Completed_At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data[0].length > 0 ? (
                      data[0].map(report => {
                        return (
                          <tr key={report.id}>
                            <td style={{ verticalAlign: 'middle', wordBreak: 'break-word' }}>
                              <a href={`/app/#/loans/viewloans/approval-report/${report.id}`}>
                                {report.status}
                              </a>
                            </td>
                            <td style={{ verticalAlign: 'middle', wordBreak: 'break-word' }}>
                              {report.uploader_fullname}
                            </td>
                            <td style={{ verticalAlign: 'middle', wordBreak: 'break-word' }}>
                              {report.ref_col}
                            </td>
                            <td style={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                              {report.start_time}
                            </td>
                            <td style={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                              {report.complete_time}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} style={{ textAlign: 'center' }}>
                          No Excel Approvals Reports could be found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fetcher>
  );
}

export default ReportList;