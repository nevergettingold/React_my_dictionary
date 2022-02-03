import { db } from "../../utils/firebase";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  // * Infinite Scroll*
  // limit,
  // query,
} from "firebase/firestore";

// Actions (type 지정)
const LOAD = "vocab/LOAD";
const CREATE = "vocab/CREATE";
const DELETE = "vocab/DELETE";
const UPDATE = "vocab/UPDATE";
const COMPLETE = "vocab/COMPLETE";

const initialState = {
  array: [],
};

// Action Creators
export function loadVocab(vocab_list) {
  return { type: LOAD, vocab_list };
}

export function createVocab(vocab) {
  //액션 생성 함수를 만들어준다
  return { type: CREATE, vocab: vocab };
}

export function deleteVocab(vocab_index) {
  return { type: DELETE, vocab_index };
}

export function updateVocab(vocab_index, vocab) {
  return { type: UPDATE, vocab_index, vocab };
}

export function completeVocab(vocab_index) {
  return { type: COMPLETE, vocab_index };
}

// middlewares
export const loadVocabFB = () => {
  return async function (dispatch) {
    const vocab_data = await getDocs(collection(db, "vocabs"));

    let vocab_list = [];

    vocab_data.forEach((v) => {
      vocab_list.push({ id: v.id, ...v.data() });
    });
    dispatch(loadVocab(vocab_list));
  };
};

// *Infinite Scroll loadVocabFB*
// export const loadVocabFB = (item_num) => {
//   return async function (dispatch) {
//     console.log("load");
//     const q = query(collection(db, "vocabs"), limit(item_num));
//     const vocab_data = await getDocs(q);
//     let vocab_list = [];

//     vocab_data.forEach((v) => {
//       vocab_list.push({ id: v.id, ...v.data() });
//     });

//     dispatch(loadVocab(vocab_list));
//   };
// };

export const createVocabFB = (vocab) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "vocabs"), vocab);
    const vocab_data = { id: docRef.id, ...vocab };

    dispatch(createVocab(vocab_data));
  };
};

export const deleteVocabFB = (vocab_id) => {
  return async function (dispatch, getState) {
    if (!vocab_id) {
      window.alert("아이디가 없네요!");
      return;
    }
    const docRef = doc(db, "vocabs", vocab_id);
    await deleteDoc(docRef);

    const _vocab_list = getState().vocab.array;
    const vocab_index = _vocab_list.findIndex((v) => {
      return v.id === vocab_id;
    });

    dispatch(deleteVocab(vocab_index));
  };
};

export const updateVocabFB = (vocab_id, vocab) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "vocabs", vocab_id.vocab_id);
    await updateDoc(docRef, vocab);

    const _vocab_list = getState().vocab.array;
    const vocab_index = _vocab_list.findIndex((v) => {
      return v.id === vocab_id.vocab_id;
    });
    dispatch(updateVocab(vocab_index, vocab));
  };
};

export const completeVocabFB = (vocab_id, vocab_completed) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "vocabs", vocab_id);
    if (vocab_completed === false) {
      await updateDoc(docRef, { completed: true });
    } else if (vocab_completed === true) {
      await updateDoc(docRef, { completed: false });
    }

    const _vocab_list = getState().vocab.array;
    const vocab_index = _vocab_list.findIndex((v) => {
      return v.id === vocab_id;
    });
    dispatch(completeVocab(vocab_index));
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "vocab/LOAD": {
      return { array: action.vocab_list };
    }

    case "vocab/CREATE": {
      const new_vocab = [...state.array, action.vocab];
      return { ...state, array: new_vocab };
    }

    case "vocab/DELETE": {
      const new_vocab = state.array.filter((v, idx) => {
        return parseInt(action.vocab_index) !== idx;
      });

      return { ...state, array: new_vocab }; //그냥 new_vocab를 보내주면 안에 key 값이 없는 array만 보내주게 된다
    }

    case "vocab/UPDATE": {
      const new_vocab = state.array.map((v, i) => {
        if (parseInt(action.vocab_index) === i) {
          return {
            ...v,
            단어: action.vocab.단어,
            병음: action.vocab.병음,
            의미: action.vocab.의미,
            예문: action.vocab.예문,
            해석: action.vocab.해석,
          };
        } else {
          return v;
        }
      });
      return { ...state, array: new_vocab };
    }

    case "vocab/COMPLETE": {
      const new_vocab = state.array.map((v, i) => {
        if (parseInt(action.vocab_index) === i) {
          if (v.completed === true) {
            return { ...v, completed: false };
          } else {
            return { ...v, completed: true };
          }
        } else {
          return v;
        }
      });
      return { ...state, array: new_vocab };
    }

    default:
      return state;
  }
}
