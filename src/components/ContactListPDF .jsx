import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    margin: 10,
  },
  contact: {
    marginBottom: 10,
  },
});

const ContactListPDF = ({ contacts }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {contacts.map((contact) => (
        <View key={contact._id} style={styles.contact}>
          <Text>Name: {contact.name}</Text>
          <Text>Phone Number: {contact.phoneNumber}</Text>
          <Text>Email: {contact.email}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default ContactListPDF;
