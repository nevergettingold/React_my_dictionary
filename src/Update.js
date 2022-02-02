import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { updateVocabFB } from "./redux/modules/vocab";

const Update = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const vocab_lists = useSelector((state) => state.vocab.array);
  const [updates, setUpdate] = useState([]);

  const vocab_id = useParams();
  const wordRef = useRef("");
  const proRef = useRef("");
  const defRef = useRef("");
  const examRef = useRef("");
  const transRef = useRef("");

  const updateVocabList = (vocab_id) => {
    dispatch(
      updateVocabFB(vocab_id, {
        단어: wordRef.current.value,
        병음: proRef.current.value,
        의미: defRef.current.value,
        예문: examRef.current.value,
        해석: transRef.current.value,
      })
    );
    alert("수정이 완료되었습니다! :)");
    navigate("/");
  };

  useEffect(async () => {
    const update_data = [];
    await vocab_lists.forEach((doc) => {
      if (doc.id === vocab_id.vocab_id) {
        update_data.push(doc);
      }
      setUpdate(update_data);
    });
  }, [vocab_lists]); //empty array [] 넣어주면 reload시 렌더링 되지 않는다.

  // useEffect(async () => {
  //   const query = await getDocs(collection(db, "vocabs"));
  //   const update_data = [];
  //   query.forEach((doc) => {
  //     if (doc.id === vocab_id.vocab_id) {
  //       update_data.push({ ...doc.data() });
  //     }
  //     setUpdate(update_data);
  //   });
  // }, []);

  // -> firestore에서 해당 data를 불러오는 코드 -> firestore data 중 첫 번째 data만 렌더링된다.

  return (
    <div>
      {updates.map((update, i) => {
        return (
          <AddForm key={i}>
            <Title>단어 수정하기</Title>

            <AddCategory>단어</AddCategory>
            <AddInput
              tpe="text"
              name="단어"
              ref={wordRef}
              defaultValue={update.단어}
            />

            <AddCategory>병음</AddCategory>
            <AddInput
              type="text"
              name="병음"
              ref={proRef}
              defaultValue={update.병음}
            />

            <AddCategory>의미</AddCategory>
            <AddInput
              type="text"
              name="의미"
              ref={defRef}
              defaultValue={update.의미}
            />

            <AddCategory>예문</AddCategory>
            <AddInput
              type="text"
              name="예문"
              ref={examRef}
              defaultValue={update.예문}
            />

            <AddCategory>해석</AddCategory>
            <AddInput
              type="text"
              name="해석"
              ref={transRef}
              defaultValue={update.해석}
            />
            <SaveButton type="button" onClick={() => updateVocabList(vocab_id)}>
              {/* type을 submit으로 하면 form의 default action 으로 인해 'Form submission canceled because the form is not connected' 가 발생하기 때문에 button으로 수정 */}
              수정하기
            </SaveButton>
          </AddForm>
        );
      })}
    </div>
  );
};

const AddForm = styled.form`
  font-family: "BMDOHYEON";
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 500px;
`;

const Title = styled.h3`
  font-size: 30px;
  font-weight: 300;
`;

const AddCategory = styled.label`
  margin-top: 15px;
  font-size: 18px;
  text-align: left;
`;

const AddInput = styled.input`
  padding: 3px 0;
  height: 28px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-bottom: 2px solid #c1bee7;
  transition: border-color 350ms ease-in-out 0s;
  margin-bottom: 5px;
  outline: none;
  &:focus {
    border-bottom: solid 2px #7a2fb9;
  }
`;

const SaveButton = styled.button`
  font-family: "BMDOHYEON";
  margin: 25px auto 0 auto;
  background-color: #b0ddd0;
  cursor: pointer;
  border: none;
  transition: background-color 350ms ease-in-out 0s;
  width: 200px;
  height: 50px;
  &:hover {
    background-color: #03d598;
  }
`;

export default Update;
