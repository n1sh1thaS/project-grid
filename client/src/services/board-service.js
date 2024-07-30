import axios from "axios";

const getBoardInfo = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/users/${"669f0aa3646ee27c6499110a"}`
    );
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

export default getBoardInfo;
