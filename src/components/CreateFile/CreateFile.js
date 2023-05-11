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
    padding: 20,
  },
  section: {
    paddingBottom: 20,
    fontSize: 12,
  },
  sectionBottom: {
    paddingTop: 20,
    fontSize: 12,
  },
  sectionText: {
    paddingBottom: 5,
  },
  sectionTextR: {
    paddingBottom: 10,
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
            <Text style={styles.sectionTextR}>Payment Invoice</Text>
            <Text style={styles.sectionText}>From: {loggedInUser.company_name}</Text>
            <Text style={styles.sectionText}>To: {params.clientName}</Text>
            <Text style={styles.sectionText}>Loan Number: {params.accountId}</Text>
            <Text style={styles.sectionText}>Branch: {params.branchName}</Text>
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
          <View style={styles.sectionBottom}>
            <Text style={styles.sectionText}>Collected By: {params.collectedBy}</Text>
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