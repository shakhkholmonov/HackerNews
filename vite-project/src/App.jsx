import { Button, List, ListItem, ListItemText, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [news, setNews] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);

  const fetchData = async () => {
    const api = `https://hn.algolia.com/api/v1/search?query=${query}&page=${page}`;

    try {
      const response = await axios.get(api);
      setNews(response.data.hits);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query, page]);

  const handleSearch = () => {
    setPage(0);
    fetchData();
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div
      style={{ maxWidth: "1300px", margin: "auto", textAlign: "center", backgroundColor: "#f6f6ef", padding: "20px" }}
    >
      <TextField
        variant="outlined"
        placeholder="Search"
        fullWidth
        value={query}
        onChange={handleInputChange}
        style={{ marginBottom: "16px" }}
      />
      <Button variant="contained" onClick={handleSearch} fullWidth>
        Search
      </Button>
      <List>
        {news.map((item, index) => (
          <ListItem key={index} style={{ padding: 0 }}>
            <ListItemText primary={item.title} secondary={<a href={item.url}>{item.url}</a>} />
          </ListItem>
        ))}
      </List>
      <div style={{ marginTop: "16px" }}>
        <Button variant="contained" onClick={handlePrevPage} disabled={page === 0}>
          Previous Page
        </Button>
        <Button variant="contained" onClick={handleNextPage} style={{ marginLeft: "8px" }}>
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default App;
