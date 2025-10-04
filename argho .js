import React, { useState } from "react";

function App() {
  const [thermal, setThermal] = useState("");
  const [acoustic, setAcoustic] = useState("");
  const [seismic, setSeismic] = useState("");
  const [image, setImage] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);

  // Handle file input for image
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to send to backend API
    const formData = new FormData();
    formData.append("thermal", thermal);
    formData.append("acoustic", acoustic);
    formData.append("seismic", seismic);
    if (image) formData.append("image", image);

    // Make API call to backend detection endpoint
    try {
      const response = await fetch("/api/detect", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setDetectionResult(data);
    } catch (err) {
      setDetectionResult({ error: "Failed to detect" });
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Elephant Detection System</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>
          Thermal Data:
          <input
            type="text"
            value={thermal}
            onChange={(e) => setThermal(e.target.value)}
            placeholder="Enter thermal sensor data"
            style={styles.input}
          />
        </label>
        <label>
          Acoustic Data:
          <input
            type="text"
            value={acoustic}
            onChange={(e) => setAcoustic(e.target.value)}
            placeholder="Enter acoustic sensor data"
            style={styles.input}
          />
        </label>
        <label>
          Seismic Data:
          <input
            type="text"
            value={seismic}
            onChange={(e) => setSeismic(e.target.value)}
            placeholder="Enter seismic sensor data"
            style={styles.input}
          />
        </label>
        <label>
          Visual Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <button type="submit" style={styles.button}>
          Detect Elephant
        </button>
      </form>

      {detectionResult && (
        <div style={styles.result}>
          {detectionResult.error ? (
            <p>Error: {detectionResult.error}</p>
          ) : (
            <>
              <p>
                Elephant Detected:{" "}
                {detectionResult.elephant_detected ? "Yes" : "No"}
              </p>
              <p>Confidence: {detectionResult.confidence}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: "auto",
    padding: 20,
    fontFamily: "'Arial', sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  input: {
    width: "100%",
    padding: 8,
    fontSize: 16,
    marginTop: 4,
  },
  button: {
    padding: 10,
    fontSize: 18,
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
  result: {
    marginTop: 30,
    padding: 15,
    border: "1px solid #ccc",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
};

export default App;
