import React, { useRef, useState } from 'react';
import {
  SuccessBtn
} from '../../../common';
import AddComment from './AddComment';
import DeleteComment from './DeleteComment';

const MODAL_STATES = {
  reverse: 'reverse',
  add: 'add',
  none: false
};

function Comments({setLoan, comments, loanId}) {
  const {reverse, add, none } = MODAL_STATES;
  const [modal, setModal] = useState(none);
  const commentIdRef = useRef(null);

  return (
    <>
      <SuccessBtn handler={() => setModal(add)} value={'Add Comment'}/>
      {modal === add && <AddComment setOpen={setModal} setLoan={setLoan} loanId={loanId}/>}
      {modal === reverse && <DeleteComment setOpen={setModal} setLoan={setLoan} commentId={commentIdRef.current}/>}
      <div style={{padding:"1.5rem"}} className='miniLoanDetails-container'>
        <table className='table'>
          <thead>
            <tr className='journal-details header'>
              <th className='schedule__table'>Date</th>
              <th className='schedule__table'>User</th>
              <th className='schedule__table'>Comment</th>
              <th className='schedule__table'>Action</th>
            </tr>
          </thead>
          <tbody>
            {comments.map(comment => (
              <tr key={comment.id}>
                <td className='schedule__table'>{comment.cdate_created}</td>
                <td className='schedule__table'>{comment.user_name}</td>
                <td className='schedule__table'>{comment.comments}</td>
                <td className='schedule__table'>
                  <span
                    style={{cursor:'pointer'}}
                    className='badge badge-danger'
                    onClick={() => {
                      setModal(reverse);
                      commentIdRef.current = comment.id;
                    }}
                  >
                    Remove
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Comments;