import React from 'react';

const AddComment = () => {

    return (
        <div className="card text-light slide">
            <div className="card-body">
                <form>
                    <div className="row">
                        <label className="form-label"></label>
                        <label className="form-title">[ Add Comment ]</label>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Comment</b></label>
                        <textarea style={{width:"50%", height:"5rem"}} className='custom-select-form'></textarea>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Files (Optional)</b></label>
                        <input type="file" />
                    </div>
                    <div className="form-submit-btn">
                        <label className="form-label"></label>
                        <button className="btn btn-info">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddComment;