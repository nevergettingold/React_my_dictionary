import React, { useEffect } from "react";
import logo from "./logo.png";

import styled from "styled-components";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./App.css";
import VocabList from "./VocabList";
import AddWord from "./AddWord";
import Update from "./Update";
import NotFound from "./NotFound";

import { loadVocabFB } from "./redux/modules/vocab";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // DOM 업데이트 (첫 렌더링) 후에 firebase에 있는 data를 한 번 불러온다.
  useEffect(() => {
    dispatch(loadVocabFB());
  }, []);

  return (
    <div className="App">
      <img
        src={logo}
        alt="Logo"
        className="logo"
        onClick={() => navigate("/")}
      />

      <Container>
        <Routes>
          <Route path="/" element={<VocabList />} />
          <Route path="/word/add" element={<AddWord />} />
          <Route path="/word/:vocab_id/edit" element={<Update />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  );
}

const Container = styled.div`
  margin-top: 5px;
  padding: 15px 40px;
`;

export default App;
