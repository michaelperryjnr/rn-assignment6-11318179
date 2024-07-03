import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Items from "../../Data";
import { useNavigation } from "@react-navigation/native";
import { storeStorageData } from "../storage";
import Images from "../constants";

export default function Home() {
  const navigation = useNavigation();
  const [Cart, setCart] = React.useState([]);

  useEffect(() => {
    storeStorageData("Cart", Cart);
  });

  const handleAddToCart = (item) => {
    const itemExists = Cart.some((cartItem) => cartItem.id === item.id);
    if (!itemExists) {
      setCart([...Cart, item]);
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ width: "50%", padding: 3 }}>
      <View style={{ width: "100%", height: 200 }}>
        <ImageBackground
          resizeMode="contain"
          source={item.image}
          style={{
            justifyContent: "flex-end",
            alignItems: "flex-end",
            width: "100%",
            height: "100%",
          }}
        >
          <Pressable onPress={() => handleAddToCart(item)}>
            <Image style={{ margin: 5 }} source={Images.add_circle} />
          </Pressable>
        </ImageBackground>
      </View>
      <View>
        <Text style={{ fontSize: 16 }}>{item.name}</Text>
        <Text>{item.description}</Text>
        <Text style={{ fontSize: 18, color: "orange" }}>${item.price}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "100%", flex: 1 }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Image source={Images.Menu} />
          <Image source={Images.Logo} />
          <View style={{ flexDirection: "row", gap: 15 }}>
            <Image source={Images.Search} />
            <Pressable onPress={() => navigation.navigate("Checkout")}>
              <ImageBackground
                style={{
                  width: 24,
                  height: 24,
                }}
                source={Images.shoppingBag}
              >
                <View
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: "red",
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    top: -4,
                    right: -10,
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: 13 }}>
                    {Cart.length}
                  </Text>
                </View>
              </ImageBackground>
            </Pressable>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20 }}>OUR STORY</Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View
              style={{
                padding: 10,
                backgroundColor: "#F9F9F9",
                borderRadius: 50,
              }}
            >
              <Image source={Images.Listview} />
            </View>
            <View
              style={{
                padding: 10,
                backgroundColor: "#F9F9F9",
                borderRadius: 50,
              }}
            >
              <Image source={Images.Filter} />
            </View>
          </View>
        </View>
        <FlatList
          data={Items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
