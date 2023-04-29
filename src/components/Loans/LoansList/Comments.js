import React from 'react';

function Comments({comments}) {
  return (
    <div className="miniLoanDetails-container">
      <table className="table">
        <thead>
          <tr className="journal-details schedule__tables">
            <th>Date</th>
            <th>User</th>
            <th>Comment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {comments.map(comment => (
            <tr key={comment.id}>
              <td className="schedule__table">{comment.cdate_created}</td>
              <td className="schedule__table">{comment.user_name}</td>
              <td className="schedule__table">{comment.comments}</td>
              <td className="schedule__table">Action</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Comments;