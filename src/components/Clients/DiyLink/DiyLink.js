import React from 'react';

function DiyLink() {
  function copyFunc() {
    const copyText = document.getElementById('diy-link');
    navigator.clipboard.writeText(copyText.value);
  }

  return (
    <div className='row custom-background'>
      <label className='form-label'>Link</label>
      <div className='col-9' style={{display:'flex', alignItems:'center'}}>
        <input type='text' value={`${window.location.origin}/self_reg/`} className='custom-select-form' id='diy-link' readOnly/>
        <div className='diy__link'>
          <span onClick={copyFunc}>Copy Link</span>
        </div>
      </div>
    </div>
  )
}

export default DiyLink;