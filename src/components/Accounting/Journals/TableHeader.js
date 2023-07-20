import React from 'react'
import Pager from './Pager';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


export default function TableHeader({journals, params, setJournals}) {
  return (
    <div className='table-header'>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <Pager
          nextPageNumber={journals.next_page_num}
          params={params}
          loadMoreJournals={() => console.log('loadMoreJournals')}
          loadingMore={false}
          prevPageNumber={journals.prev_page_num}
          setJournals={setJournals}
        />
        <div style={{marginTop:'6px'}}>Showing {journals.journals.length} of {journals.count} journals.</div>
      </div>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <div style={{marginTop:'6px'}}>Page {journals.number} of {journals.num_of_pages}</div>
        <div>
          <ReactHTMLTableToExcel
            id='test-table-xls-button'
            className='download-table-xls-button btn btn-default'
            table='journals'
            filename='Journals'
            sheet='tablexls'
            buttonText='Download as XLS'
          />
        </div>
      </div>
    </div>
  )
}
