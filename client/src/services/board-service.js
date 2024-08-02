import axios from "./axios-config";

export const getBoardInfo = async () => {
  try {
    const response = await axios.get(`/users/getUser`);
    const { data } = response;
    const boardIdArr = data.user.boardIds;
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
    const result = await axios.get(`/boards/${boardId}`);
    const { data } = result;
    return data.boardName;
  } catch (err) {
    console.log("Error fetching board name", err);
  }
};

export const addBoard = async (boardName, boardIdArr, boardNameArr) => {
  try {
    const userRes = await axios.get(`/users/getUser`);
    const userData = userRes.data;
    const board = {
      userId: userData.id,
      boardName,
    };
    const boardRes = await axios.post(`/boards`, board);
    const { data } = boardRes;
    boardIdArr.push(data._id);
    boardNameArr.push(data.boardName);
    return { boardIdArr, boardNameArr };
  } catch (err) {
    console.log("error posting board", err);
  }
};

export const removeBoard = async (boardId) => {
  try {
    return await axios.delete(`/boards/${boardId}`);
  } catch (err) {
    console.log("error deleting board", err);
  }
};

export const putBoard = async (boardId, newTitle) => {
  try {
    await axios.put(`/boards/${boardId}`, {
      boardName: newTitle,
    });
  } catch (err) {
    console.log("error changing board title", err);
  }
};
