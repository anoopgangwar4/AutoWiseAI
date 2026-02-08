export default function Home() {
  return (
    <div style={styles.container}>
      <h1>Vehicle Price Prediction System</h1>
      <p>Select a vehicle type to predict resale price.</p>
    </div>
  );
}

const styles = {
  container: {
    marginTop: 80,
    textAlign: "center",
  },
};
