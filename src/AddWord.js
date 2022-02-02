import styled from "styled-components";
import "./App.css";

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createVocabFB } from "./redux/modules/vocab";

const AddWord = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wordRef = useRef("");
  const proRef = useRef("");
  const defRef = useRef("");
  const examRef = useRef("");
  const transRef = useRef("");
  const initialValues = {
    단어: "",
    병음: "",
    의미: "",
    예문: "",
    해석: "",
    completed: false,
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value }); //[]로 key값을 주어 input의 name 값을 불러온다
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };
  const validate = (values) => {
    const errors = {};
    const regexp = /\S/;
    if (!values.단어 || !regexp.test(values.단어)) {
      errors.단어 = "단어가 입력되지 않았습니다 :(";
    }
    if (!values.병음 || !regexp.test(values.병음)) {
      errors.병음 = "병음이 입력되지 않았습니다 :(";
    }
    if (!values.의미 || !regexp.test(values.의미)) {
      errors.의미 = "의미가 입력되지 않았습니다 :(";
    }
    if (!values.예문 || !regexp.test(values.예문)) {
      errors.예문 = "예문이 입력되지 않았습니다 :(";
    }
    if (!values.해석 || !regexp.test(values.해석)) {
      errors.해석 = "해석이 입력되지 않았습니다 :(";
    }

    return errors;
  };

  const addVocabList = () => {
    dispatch(
      createVocabFB({
        단어: wordRef.current.value,
        병음: proRef.current.value,
        의미: defRef.current.value,
        예문: examRef.current.value,
        해석: transRef.current.value,
        completed: false,
      })
    );
    // dispatch(createVocab(formValues));
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      alert("단어가 추가되었습니다! :)");
      navigate("/");
      addVocabList();
    }
  });

  return (
    <div>
      {/* {Object.keys(formErrors).length === 0 && isSubmit
        ? (alert("단어가 추가되었습니다! :)"),
          console.log(formValues),
          navigate("/")) ---> 바뀐 state 값을 전달하고 다시 렌더링하기 전에 빠져나가서, useEffect 로 구현 필요
        : null} */}

      <AddForm onSubmit={handleSubmit}>
        <Title>단어 추가하기</Title>
        <AddCategory>단어</AddCategory>
        <AddInput
          type="text"
          name="단어"
          ref={wordRef}
          // value={formValues.단어}
          onChange={handleChange}
        />
        <p>{formErrors.단어}</p>
        <AddCategory>병음</AddCategory>
        <AddInput
          type="text"
          name="병음"
          ref={proRef}
          // value={formValues.병음}
          onChange={handleChange}
        />
        <p>{formErrors.병음}</p>
        <AddCategory>의미</AddCategory>
        <AddInput
          type="text"
          name="의미"
          ref={defRef}
          // value={formValues.의미}
          onChange={handleChange}
        />
        <p>{formErrors.의미}</p>
        <AddCategory>예문</AddCategory>
        <AddInput
          type="text"
          name="예문"
          ref={examRef}
          // value={formValues.예문}
          onChange={handleChange}
        />
        <p>{formErrors.예문}</p>
        <AddCategory>해석</AddCategory>
        <AddInput
          type="text"
          name="해석"
          ref={transRef}
          // value={formValues.해석}
          onChange={handleChange}
        />
        <p>{formErrors.해석}</p>
        <SaveButton type="submit">저장하기</SaveButton>
      </AddForm>
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

export default AddWord;
