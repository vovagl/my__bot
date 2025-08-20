import axios from "axios";

export const getDog=async()=>{
   try {  
const { data } = await axios.get("https://dog.ceo/api/breeds/image/random");
    return data?.message || "🐶 Не удалось найти собаку";
  } catch (err) {
    console.error("Ошибка загрузки собаки:", err.message);
    return "🐶 Ошибка при получении собаки";
  }
};