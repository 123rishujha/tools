import "./App.css";

function App() {
  const download = () => {
    fetch(
      "https://res.cloudinary.com/dmj1ekjt9/image/upload/v1699188457/kfek2sosswcmwriskqa4.jpg",
    )
      .then((response) => {
        console.log(response);
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "compressed.jpg";
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
