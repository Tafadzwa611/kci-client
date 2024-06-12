import React from 'react';
import { Modal } from '../../common';

function UserStream({open, setOpen}) {
 
    return (
        <Modal open={open} setOpen={setOpen} title='User Stream'>
            <div style={{overflowX: 'auto'}}>
                <div style={{height:'100vh'}}>
                    <div style={{position:'sticky', top:0}}>
                        <div className='timeline__section'>
                            <span>
                            <span style={{cursor:'pointer'}}>Tafadzwa Kuno</span> logged in at 10:45am.
                            </span>
                        </div>
                        <div className='timeline__section'>
                            <span>
                            <span style={{cursor:'pointer'}}>Tafadzwa Kuno</span> logged in at 10:45am.
                            </span>
                        </div>
                        <div className='timeline__section'>
                            <span>
                            <span style={{cursor:'pointer'}}>Tafadzwa Kuno</span> logged in at 10:45am.
                            </span>
                        </div>
                        <div className='timeline__section'>
                            <span>
                            <span style={{cursor:'pointer'}}>Tafadzwa Kuno</span> logged in at 10:45am.
                            </span>
                        </div>
                        <div className='timeline__section'>
                            <span>
                            <span style={{cursor:'pointer'}}>Tafadzwa Kuno</span> logged in at 10:45am.
                            </span>
                        </div>
                        <div className='timeline__section'>
                            <span>
                            <span style={{cursor:'pointer'}}>Tafadzwa Kuno</span> logged in at 10:45am.
                            </span>
                        </div>
                        <div className='timeline__section'>
                            <span>
                            <span style={{cursor:'pointer'}}>Tafadzwa Kuno</span> logged in at 10:45am.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default UserStream;