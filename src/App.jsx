import React, { useState } from "react";

function App() {
  const [keyWord, setKeyWord] = useState("");
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTrack = async (event) => {
    event.preventDefault(); // Prevent page reload

    if (!keyWord.trim()) {
      alert("Please enter a keyword to search.");
      return;
    }

    setLoading(true);
    try {
      let response = await fetch(
        `https://v1.nocodeapi.com/nuonthanith/spotify/KuNEMBylPIUoFNIY/search?q=${encodeURIComponent(
          keyWord
        )}&type=track`
      );
      let data = await response.json();

      if (data.tracks && data.tracks.items) {
        setTracks(data.tracks.items);
      } else {
        setTracks([]); // No results found
      }
    } catch (error) {
      console.error("Error fetching tracks:", error);
      alert("Failed to fetch tracks. Please check your API key or network.");
    }
    setLoading(false);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow fixed-top top-0">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#">
            Music App
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex ms-auto mt-2 lg:mt-0" role="search" onSubmit={getTrack}>
              <input
                value={keyWord}
                onChange={(event) => setKeyWord(event.target.value)}
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button type="submit" className="btn btn-success">
                {loading ? "Loading..." : "Search"}
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container p-4">
        <div className="d-flex justify-content-center"></div>

        {/* Displaying Tracks */}
        <div className="row mt-4 g-4">
          {tracks.length > 0 ? (
            tracks.map((item, index) => (
              <div key={index} className="col-lg-3 col-md-6">
                <div className="card shadow-sm h-100">
                  <img
                    src={item.album.images[0]?.url}
                    className="card-img-top"
                    alt="Album Cover"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">🎤 Artist: {item.album.artists[0]?.name}</p>
                    <p className="card-text">📅 Release: {item.album.release_date}</p>
                    {item.preview_url ? (
                      <audio src={item.preview_url} controls className="w-100"></audio>
                    ) : (
                      <p className="text-muted">No preview available</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center mt-4 text-muted">No tracks found. Please search.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
