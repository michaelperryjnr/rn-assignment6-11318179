import AsyncStorage from "@react-native-async-storage/async-storage";

export const getTotalSum = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("Cart");
    const data = JSON.parse(jsonValue);
    console.log(
      data[
        (a) => {
          a.price;
        }
      ]
    );
  } catch (e) {
    console.log(e);
  }
};
