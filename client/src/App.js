import "./App.css";

function App() {
  const download = () => {
    fetch(
      "https://res.cloudinary.com/dmj1ekjt9/image/upload/v1699194593/qc7m1indath1i2fa5y2e.png",
    )
      .then((response) => {
        console.log(response);
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "compressed";
        a.click();
        window.URL.revokeObjectURL(url);
      });
  };
  return (
    <div className="App">
      <button onClick={() => download()}>download</button>
    </div>
  );
}

export default App;
