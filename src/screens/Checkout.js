import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Images from "../constants";
import { getStorageData, storeStorageData } from "../storage";
import { getTotalSum } from "../utils";

export default function Checkout() {
  const [Cart, setCart] = React.useState([]);
  const [sum, setSum] = React.useState(0);

  useEffect(() => {
    getStorageData("Cart").then((data) => {
      setCart(data || []);
    });
  }, []);

  useEffect(() => {
    let price = 0;
    for (let i = 0; i < Cart.length; i++) {
      if (Cart) {
        price += Cart[i].price;
        setSum(price);
      } else {
        setSum(0);
      }
    }
  }, [Cart]);

  const handleRemoveFromCart = (id) => {
    const updatedCart = Cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    storeStorageData("Cart", updatedCart);
  };

  const renderItem = ({ item }) => (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Image
          resizeMode="contain"
          style={{ width: 120, height: 180, marginRight: 10 }}
          source={item.image}
        />
        <View
          style={{
            flexDirection: "column",
            width: 135,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.name}</Text>
          <Text style={{ fontSize: 16 }}>{item.description}</Text>
          <Text style={{ fontSize: 18, color: "#BAB02C" }}>${item.price}</Text>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Pressable onPress={() => handleRemoveFromCart(item.id)}>
              <Image style={{ width: 24, height: 24 }} source={Images.remove} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", padding: 20, paddingBottom: 80 }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View></View>
        <Image source={Images.Logo} />
        <Image source={Images.Search} />
      </View>
      <View
        style={{
          marginTop: 20,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 28, fontWeight: 300 }}>CHECKOUT</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }}></View>
          <View
            style={{
              transform: [{ rotate: "45deg" }],
              width: 11,
              height: 11,
              borderColor: "black",
              borderWidth: 1,
              borderStyle: "solid",
            }}
          ></View>
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }}></View>
        </View>
      </View>
      <FlatList
        style={{ flex: 1, paddingTop: 10 }}
        data={Cart}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: Dimensions.get("screen").width,
          height: 100,
          backgroundColor: "#000",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            backgroundColor: "#fff",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 5,
          }}
        >
          <Text style={{ fontSize: 18 }}>EST. TOTAL</Text>
          <Text style={{ fontSize: 20, color: "orange" }}>${sum}</Text>
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: 300 }}>
            CHECKOUT
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
