import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStorageData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("Cart");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.log(e);
  }
};
