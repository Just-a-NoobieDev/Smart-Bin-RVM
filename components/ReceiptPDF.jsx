import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Poppins",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDD4V1tvFP-KUEg.ttf",
      fontWeight: "extrabold",
    },
    {
      src: "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6V1tvFP-KUEg.ttf",
      fontWeight: "medium",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: "0.7in",
    paddingRight: "0.7in",
  },
  info: {
    fontSize: "5mm",
    marginLeft: "7mm",
    fontFamily: "Poppins",
    fontWeight: "medium",
  },
  header: {
    textAlign: "center",
    fontSize: "4mm",
    fontFamily: "Poppins",
    fontWeight: "medium",
  },
  title: {
    fontSize: "15mm",
    textAlign: "center",
    marginTop: "7mm",
    fontFamily: "Poppins",
    fontWeight: "extrabold",
  },
  dots: { fontSize: "15mm", marginTop: "2mm", marginBottom: "2mm" },
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: "5mm",
    marginTop: "4mm",
    fontFamily: "Poppins",
    fontWeight: "medium",
  },
  image: {
    width: "60px",
    height: "50px",
    marginLeft: "76mm",
    marginBottom: "2mm",
    marginTop: "-3mm",
  },
});

const Receipt = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image
        src="https://yzppmncmjybezxhcekir.supabase.co/storage/v1/object/public/smart_bin_images/admin_users/909ed22d-87ea-483a-afcb-edfaef65ff57/logo-shadow.png"
        style={styles.image}
        alt="logo"
      />
      <View style={styles.header}>
        <Text>Smart Plastic Bottle Bin:</Text>
        <Text>A Reverse Vending Machine</Text>
      </View>
      <View style={[styles.title, { marginBottom: "-7mm" }]}>
        <Text>Points Receipt</Text>
      </View>
      <View style={styles.dots}>
        <Text>..........................................</Text>
      </View>
      <View style={styles.info}>
        <Text>Student Information</Text>
      </View>
      <View style={[styles.dots, { marginTop: "-7.5mm" }]}>
        <Text>..........................................</Text>
      </View>
      <View style={styles.data}>
        <Text>Account Id:</Text>
        <Text>{data.tbl_student_users.id}</Text>
      </View>
      <View style={styles.data}>
        <Text>Name:</Text>
        <Text>{data.tbl_student_users.name}</Text>
      </View>
      <View style={styles.data}>
        <Text>Student Number:</Text>
        <Text>{data.student_number}</Text>
      </View>

      <View style={styles.data}>
        <Text>Remaining Points:</Text>
        <Text>{data.tbl_student_users.available_points}</Text>
      </View>
      <View style={styles.dots}>
        <Text>..........................................</Text>
      </View>
      <View style={styles.info}>
        <Text>Point Allocation Details</Text>
      </View>
      <View style={[styles.dots, { marginTop: "-7.5mm" }]}>
        <Text>..........................................</Text>
      </View>
      <View style={styles.data}>
        <Text>Transaction Id:</Text>
        <Text>{data.id}</Text>
      </View>

      <View style={styles.data}>
        <Text>Point/s:</Text>
        <Text>{data.number_points}</Text>
      </View>
      <View style={styles.data}>
        <Text>Course Code and Name:</Text>
        <Text>
          {data.tbl_subjects.subject_code} {data.tbl_subjects.subject_name}
        </Text>
      </View>
      <View style={styles.data}>
        <Text>Code Instructor:</Text>
        <Text>{data.tbl_subjects.subject_instructor}</Text>
      </View>
      <View style={styles.data}>
        <Text>Created At:</Text>
        <Text>{new Date(data.date).toLocaleString()}</Text>
      </View>
      <View style={[styles.dots, { marginTop: "-1.5mm" }]}>
        <Text>..........................................</Text>
      </View>
      <View style={[styles.header, { fontSize: "7mm", marginTop: "0mm" }]}>
        <Text>REMINDER</Text>
      </View>
      <View style={[styles.header, { fontSize: "4mm", marginTop: "1mm" }]}>
        <Text>
          This receipt can only be used to the subject and specific professor
          that is stated above.
        </Text>
        <Text>
          If you have any concerns, contact us though our email,
          sumbrerongb@gmail.com
        </Text>
      </View>
    </Page>
  </Document>
);

export default Receipt;
