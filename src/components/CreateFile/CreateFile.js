import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer';
import { useLoggedInUser } from '../../contexts/LoggedInUserContext';

const styles = StyleSheet.create({
  page: {
    color: 'black',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  table: { 
    display: 'table', 
    width: 'auto', 
    borderStyle: 'solid', 
    borderWidth: 1, 
    borderRightWidth: 0, 
    borderBottomWidth: 0 
  }, 
  tableRow: { 
    margin: 'auto', 
    flexDirection: 'row' 
  }, 
  tableCol: { 
    width: '20%', 
    borderStyle: 'solid', 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  }, 
  tableCell: { 
    margin: 'auto', 
    marginTop: 5, 
    fontSize: 10 
  }
});

function CreateFile() {
  let location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const entries = urlParams.entries();
  const params = paramsToObject(entries);
  const {loggedInUser} = useLoggedInUser();

  return (
    <PDFViewer style={styles.viewer}>
      <Document title={`${params.clientName} Payment.pdf`}>
        <Page size='A4' style={styles.page}>
          <View style={styles.section}>
            <Text>{loggedInUser.company_name}</Text>
            <Text>From: {params.clientName}</Text>
            <Text>Loan Number: {params.accountId}</Text>
            <Text>Branch: {params.branchName}</Text>
          </View>
          <View style={styles.table}>
            <View style={styles.tableRow}> 
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Date Recorded</Text> 
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Collection Date</Text> 
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Loan #</Text> 
              </View> 
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>Currency</Text> 
              </View> 
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>Amount</Text>
              </View>
            </View>
            <View style={styles.tableRow}> 
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{params.dateRecorded}</Text> 
              </View> 
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{params.paymentDate}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{params.accountId}</Text> 
              </View>
              <View style={styles.tableCol}> 
                <Text style={styles.tableCell}>{params.currencyName}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{params.amountPaid}</Text> 
              </View>
            </View> 
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

function paramsToObject(entries) {
  const result = {}
  for(const [key, value] of entries) {
    result[key] = value;
  }
  return result;
}

export default CreateFile;