import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";
// import Currency from "react-currency-formatter";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const navigation = useNavigation();

  // If there is no item in the basket then show nothing
  if (items.length === 0 ) return null;

  return (
    <View className="absolute bottom-10 w-full z-50 ">
      <TouchableOpacity onPress={()=>navigation.navigate('Basket')} className="mx-5 p-4 bg-[#00CCBB] rounded-lg flex-row items-center space-x-1">
        <Text className="text-lg text-white font-extrabold bg-[#01A296] py-1 px-2">{items.length}</Text>
        <Text className="flex-1 text-lg text-white font-extrabold text-center ">View Basket</Text>
        <Text className="text-lg text-white font-extrabold">
          {basketTotal}$
          {/* <Currency quantity={basketTotal} currency="GBP" /> */}
        </Text>
      </TouchableOpacity>
      {/* <FontAwesome name="shopping-basket" /> */}
    </View>
  );
};

export default BasketIcon;
