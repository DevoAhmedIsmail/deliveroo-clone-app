import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectResturant } from "../features/resturantSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
// import Currency from "react-currency-formatter";
import AntDesign from "react-native-vector-icons/AntDesign";
import { urlFor } from "../sanity";

const BasketScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

  const resturant = useSelector(selectResturant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);
  // console.log(groupedItemsInBasket);
  return (
    <SafeAreaView style={styles.container} className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">{resturant.title}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <AntDesign
              name="closecircle"
              color="#00CCBB"
              //   height={50}
              //   width={50}
              size={40}
            />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 px-5 py-2 bg-white "
            >
              <Text className="text-[#00CCBB]">{items.length} x </Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">
                {items[0]?.price}$
                {/* <Currency quantity={items[0]?.price} currency="GBP" /> */}
              </Text>

              <TouchableOpacity
                onPress={() => dispatch(removeFromBasket({ id: key }))}
              >
                <Text className="text-[#00CCBB] text-xs">Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
            {basketTotal}$
              {/* <Currency quantity={basketTotal} currency="GBP" /> */}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">
            5.99$
              {/* <Currency quantity={5.99} currency="GBP" /> */}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="">Order Total</Text>
            <Text className="font-extrabold">
              {(basketTotal + 5.99).toFixed(2)}$
              {/* <Currency quantity={basketTotal + 5.99} currency="GBP" /> */}
            </Text>
          </View>

          <TouchableOpacity
            className="rounded-lg bg-[#00CCBB] p-4"
            onPress={() => navigation.navigate("PreparingOrderScreen")}
          >
            <Text className="text-center text-white text-lg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
export default BasketScreen;
