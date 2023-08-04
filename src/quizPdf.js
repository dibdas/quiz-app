// QuizPDF.js
import React from "react";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  questionContainer: {
    border: "1px solid #000",
    padding: 10,
    marginBottom: 10,
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
  },
  answerContainer: {
    border: "1px solid #000",
    padding: 5,
    width: 80,
    height: 20,
    top: 5,
  },
  answer: {
    fontSize: 14,
    color: "black", // Set the color to black explicitly
    top: 5,
  },
});

const QuizPDF = ({ quizData }) => {
  return (
    <PDFViewer width="100%" height="500px">
      <Document>
        <Page size="A4" style={styles.page}>
          {quizData.map((item, index) => (
            <View key={index} style={styles.questionContainer}>
              <Text style={styles.question}>{item.question}</Text>
              {item.options.map((option, optionIndex) => (
                <Text key={optionIndex}>{option}</Text>
              ))}

              <Text style={styles.answer}>Your Answer:</Text>
              <View style={styles.answerContainer}></View>
            </View>
          ))}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default QuizPDF;
