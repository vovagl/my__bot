import axios from "axios";

export const getCat=async()=>{
   try {
    const { data } = await axios.get("https://api.thecatapi.com/v1/images/search", {
      params: { limit: 1 },
    });
    return data[0]?.url || "😿 Не удалось найти кота";
  } catch (err) {
    console.error("Ошибка загрузки кота:", err.message);
    return "😿 Ошибка при получении кота";
  }
}; 