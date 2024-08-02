import axios from "axios";

export const getBoardInfo = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/users/getUser`);
    const { data } = response;
    const boardIdArr = data.boardIds;
    const boardNameArr = await Promise.all(
      boardIdArr.map(async (id) => await getBoardName(id))
    );
    return { boardIdArr, boardNameArr };
  } catch (err) {
    console.log("error fetching board information", err);
  }
};

const getBoardName = async (boardId) => {
  try {
    const result = await axios.get(
      `http://localhost:3000/api/boards/${boardId}`
    );
    const { data } = result;
    return data.boardName;
  } catch (err) {
    console.log("Error fetching board name", err);
  }
};

export const addBoard = async (board, boardIdArr, boardNameArr) => {
  try {
    const result = await axios.post(`http://localhost:3000/api/boards`, board);
    const { data } = result;
    boardIdArr.push(data._id);
    boardNameArr.push(data.boardName);
    return { boardIdArr, boardNameArr };
  } catch (err) {
    console.log("error posting board", err);
  }
};

export const removeBoard = async (boardId) => {
  try {
    return await axios.delete(`http://localhost:3000/api/boards/${boardId}`);
  } catch (err) {
    console.log("error deleting board", err);
  }
};

export const putBoard = async (boardId, newTitle) => {
  try {
    await axios.put(`http://localhost:3000/api/boards/${boardId}`, {
      boardName: newTitle,
    });
  } catch (err) {
    console.log("error changing board title", err);
  }
};
