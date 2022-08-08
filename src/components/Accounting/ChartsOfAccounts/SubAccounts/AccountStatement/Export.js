import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import './Export.css';

const Export = ({csvData, fileName}) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = () => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    const handleClick = (evt) => {
        evt.preventDefault();
        exportToCSV();
    }

    return (
        // <a href="#" className="btn btn-tool btn-sm" onClick={handleClick}><i className="fas fa-download"></i></a>
        <label className="dropdown">
            <div className="dd-button">
                Export Data
            </div>
            <input type="checkbox" className="dd-input" id="test"/>
            <ul className="dd-menu">
                <li onClick={handleClick}>Excel</li>
            </ul>
        </label>
    )
}

export default Export;