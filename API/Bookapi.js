import React, { useState, useEffect } from "react";
 
export default function Bookapi() {
  const [data, setData] = useState([]);

  const apiGet = () => {
    fetch("https://openlibrary.org/people/mekBot/books/currently-reading.json")
      .then((res) => res.json())
      .then((result) => {
      //console.log(result);
      let books = result.reading_log_entries;
      books = books.map((book) => ({ ...book, votes: 0 }));
      // console.log(books);
        setData(books);
      });
  };
  useEffect(() => {
    apiGet();
  }, []);

  useEffect(() => {
    setData((prevData) => prevData.slice().sort((a, b) => a.votes - b.votes));
  }, [data]);

  const onVoteUp = (bookId) => {
    setData((prevData) =>
      prevData.map((book) =>
        book.work.key === bookId ? { ...book, votes: book.votes + 1 } : book
      )
    );
  };

  const handleVoteDown = (bookId) => {
    setData((prevData) =>
      prevData.map((book) =>
        book.work.key === bookId ? { ...book, votes: book.votes - 1 } : book
      )
    );
  };

  const handleDelete = (bookId) => {
    setData((prevData) => prevData.filter((book) => book.work.key !== bookId));
  };



  return (
    <div>
      {/* <button onClick={apiGet}>fetch api</button> */}
      <h1 className="text-center">My Library</h1>
      <div className="container mt-4">
        <div className="row">
        {data.map((book) => (
          <div className="col-md-4 mb-4" id={book.work.key}>
            <div className="card">
              <div className="card-body">
                <h2 className="text-primary">{book.work.title}</h2>
                {/* <img src={book.work.cover_id} className="img-thumbnail" /> */}
                <p className="text-warning">Author: {book.work.author_names }</p>
                 <p className="text-warning">Publishing Year: {book.work.first_publish_year}</p>
                <p className="text-info"> Votes: {book.votes}</p>
                <button type="button" class="btn btn-success btn-md mr-2"  onClick={() => onVoteUp(book.work.key)}>
                  Vote Up
                </button>
                <button type="button" className="btn btn-warning btn-md"  onClick={() => handleVoteDown(book.work.key)} >
                  Vote Down
                </button>
                <button type="button" className="btn btn-danger btn-md mx-2" onClick={() => handleDelete(book.work.key)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
           ))}
        </div>
      </div>
      
    </div>
  );
}
