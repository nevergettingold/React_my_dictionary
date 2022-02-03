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
    e.preventDefault(); //submit 눌렀을 때 form이 바로 제출되는 방지한다
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };
  const validate = (values) => {
    const errors = {};
    const regexp = /\S/;
    //input에 value가 없거나, 문자가 없을 때 검사
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
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      alert("단어가 추가되었습니다! :)");
      addVocabList();
      navigate("/");
    }
  });

  return (
    <div>
      <AddForm onSubmit={handleSubmit}>
        <Title>단어 추가하기</Title>
        <AddCategory>단어</AddCategory>
        <AddInput
          type="text"
          name="단어"
          ref={wordRef}
          onChange={handleChange}
        />
        <p>{formErrors.단어}</p>
        <AddCategory>병음</AddCategory>
        <AddInput
          type="text"
          name="병음"
          ref={proRef}
          onChange={handleChange}
        />
        <p>{formErrors.병음}</p>
        <AddCategory>의미</AddCategory>
        <AddInput
          type="text"
          name="의미"
          ref={defRef}
          onChange={handleChange}
        />
        <p>{formErrors.의미}</p>
        <AddCategory>예문</AddCategory>
        <AddInput
          type="text"
          name="예문"
          ref={examRef}
          onChange={handleChange}
        />
        <p>{formErrors.예문}</p>
        <AddCategory>해석</AddCategory>
        <AddInput
          type="text"
          name="해석"
          ref={transRef}
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
