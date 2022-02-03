import React from "react";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoAddCircle } from "react-icons/io5";
import { RiCloseCircleLine } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { ImCheckmark2 } from "react-icons/im";
import { deleteVocabFB, completeVocabFB } from "./redux/modules/vocab";

// *Infinite Scroll*
// import { useInView } from "react-intersection-observer";

import "./App.css";

const VocabList = (props) => {
  // *Infinite Scroll*
  // const [ref, inView] = useInView();
  // const [item, setItems] = useState(24);

  // useEffect(() => {
  //   if (inView) {
  //     setItems((prevState) => prevState + 4);
  //     dispatch(loadVocabFB(item));
  //   }
  // }, [inView]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const vocab_lists = useSelector((state) => state.vocab.array);

  const completeVocab = (vocab_index, vocab_completed) => {
    dispatch(completeVocabFB(vocab_lists[vocab_index].id, vocab_completed));
  };

  return (
    <>
      <VocabWrap>
        {vocab_lists.map((array, index) => {
          return (
            <ItemStyle
              key={index}
              style={{
                backgroundColor: array.completed ? "#f3d592" : "#fff",
                transition: "200ms",
                border: array.completed
                  ? "1px solid #f3d592"
                  : "1px solid #f3d592",
              }}
            >
              <Vocab
                style={{
                  textDecoration: array.completed ? "line-through" : null, //취소선
                }}
              >
                {array.단어}
              </Vocab>
              <Pro
                style={{
                  textDecoration: array.completed ? "line-through" : null,
                }}
              >
                [{array.병음}]
              </Pro>
              <Def
                style={{
                  textDecoration: array.completed ? "line-through" : null,
                }}
              >
                {array.의미}
              </Def>
              <Ex
                style={{
                  textDecoration: array.completed ? "line-through" : null,
                }}
              >
                {array.예문}
              </Ex>
              <Tran
                style={{
                  textDecoration: array.completed ? "line-through" : null,
                }}
              >
                {array.해석}
              </Tran>
              <ButtonWrap>
                <ImCheckmark2
                  onClick={() => {
                    completeVocab(index, array.completed);
                  }}
                />
                <BiEdit
                  onClick={() => {
                    navigate("/word/" + array.id + "/edit");
                  }}
                />
                <RiCloseCircleLine
                  onClick={() => {
                    dispatch(deleteVocabFB(vocab_lists[index].id));
                    alert("단어가 삭제되었습니다!");
                  }}
                />
              </ButtonWrap>
            </ItemStyle>
          );
        })}
        {/* Infinite Scroll 
        <AddView ref={ref}></AddView> */}
      </VocabWrap>
      <IoAddCircle
        className="addButton"
        onClick={() => navigate("/word/add")}
      />
    </>
  );
};

// const AddView = styled.div``; (Infinite Scroll)

const VocabWrap = styled.div`
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 20px;
`;

const ItemStyle = styled.div`
  font-family: "NEXON Lv1 Gothic OTF";
  position: relative;
  text-align: left;
  border-radius: 10px;
  width: calc((100% - 188px) / 4);
  padding: 15px;
`;

const Vocab = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-weight: 700;
  font-size: 20px;
  color: #d94545;
  margin: 10px 0;
`;

const Pro = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-size: 13px;
  color: #424141;
  margin-bottom: 3px;
`;

const Def = styled(Pro)``;
const Tran = styled(Pro)``;

const Ex = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  color: blue;
  font-style: italic;
  font-size: 13px;
  margin-bottom: 3px;
`;

const ButtonWrap = styled.div`
  cursor: pointer;
  position: absolute;
  top: 7px;
  right: 7px;
  display: flex;
  color: #21682e;
`;

export default VocabList;
