import React, { useRef } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ContactListPDF from "./ContactListPDF ";
const DownloadContactsButton = ({ contacts }) => {
  const pdfRef = useRef();

  return (
    <PDFDownloadLink
      document={<ContactListPDF contacts={contacts} />} // Pass your contacts to the PDF component
      fileName="contacts.pdf" // Set the file name
      onClick={() => pdfRef.current.updateContainer()}
    >
      {({ blob, url, loading, error }) =>
        loading ? "Generating PDF..." : "Download PDF"
      }
    </PDFDownloadLink>
  );
};

export default DownloadContactsButton;
