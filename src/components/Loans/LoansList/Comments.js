import React from 'react';

const thStyle2 = {border: 'none', borderBottom: '1px solid #c1d0d7'};
function Comments({comments}) {
  return (
    <table>
      <thead>
        <tr>
          <th style={thStyle2}><b>Date</b></th>
          <th style={thStyle2}><b>User</b></th>
          <th style={thStyle2}><b>Comment</b></th>
          <th style={thStyle2}><b>Action</b></th>
        </tr>
      </thead>
      <tbody>
        {comments.map(comment => (
          <tr key={comment.id}>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{comment.cdate_created}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{comment.user_name}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{comment.comments}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>Action</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Comments;