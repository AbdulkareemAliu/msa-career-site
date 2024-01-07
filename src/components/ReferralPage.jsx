import db from '../utils/referrals-base'
import { onValue, ref } from 'firebase/database'
import { AgGridReact } from 'ag-grid-react';
import React, {useState, useEffect} from 'react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "../styles.css";


export default function ReferralPage() {
    const [rowData, setRowData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);

    const colDefs =  [
        {headerName: "Name", field: 'Name', flex: 1, filter: true, floatingFilter: true},
        {headerName: 'Company Name', field: 'Company Name', flex: 1, filter: true, floatingFilter: true}
    ]

    useEffect(() => {
        const referralDB = ref(db);
    
        const handleSnapshot = (snapshot) => {
          var data = snapshot.val();
          data = data.filter(elements => (elements !== null));
          setRowData(data);
        };
    
        const unsubscribe = onValue(referralDB, handleSnapshot);
    
        return () => {
          unsubscribe();
        };
      }, []);

      const handleRowSelected = (event) => {
        setSelectedRow(event.api.getSelectedRows()[0]);
      };
    
      const closeOverlay = () => {
        setSelectedRow(null);
      };
    
    return (<>
        <div className="more-info-screen" style={{ visibility: selectedRow ? "visible" : "hidden", zIndex: 1000 }}>
          {selectedRow && (
            <>
              <h1>{selectedRow["Company Name"]} - {selectedRow["Name"]}</h1>
              {Object.entries(selectedRow).map(([key, value]) => {
                if (value !== null && !["Name", "Company Name", "Timestamp"].includes(key)) {
                    return <p key={key}><strong>{key}:</strong> {value}</p>;
                }
                return null;
                })}
              <button className='return-button' onClick={closeOverlay}>Close</button>
            </>
          )}
        </div>
        <div className='ag-theme-quartz' style={{ height: 500, zIndex: 1 }}>
          <AgGridReact rowData={rowData} columnDefs={colDefs} rowSelection='single' onRowClicked={handleRowSelected}/>
        </div>
      </>
      
        )

}