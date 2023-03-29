import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      // headerTitle: 'Testing',
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "featured"] {..., resturants[]->{..., dishes[]->}}`)
      .then((data) => {
        // console.log("data:", [...data]);
        setFeaturedCategories(data);
      })
      .catch((err) => {
        console.log("Err at Home Page:", err);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container} className=" bg-white flex-1">
      {/* Header */}
      <View className="flex-row pb-4 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 px-4 rounded-full "
        />

        <View className="flex-1">
          <Text className="text-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <AntDesign name="down" size={20} color="#00CCBB" />{" "}
          </Text>
        </View>

        <AntDesign name="user" size={35} color="#00CCBB" />
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3 ">
          <AntDesign name="search1" color="gray" size={20} />
          <TextInput
            placeholder="Resturants and Cuisines"
            keyboardType="default"
          />
        </View>
        <Entypo name="sound-mix" color="#00CCBB" size={20} />
      </View>

      {/* Body */}
      <ScrollView className="bg-gray-100 flex: 1">
        {/* Categories */}
        <Categories />

        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
            featuredCategory="featured"
          />
        ))}

        {/* Featured  */}
        {/* <FeaturedRow
          id="123"
          title="Featured"
          description="Paid placement from our partners"
          featuredCategory="featured"
        /> */}

        {/* Tasty Discounts */}
        {/* <FeaturedRow
          id="1234"
          title="Tasty Discounts"
          description="Everyone's been enjoying these juicy discounts!"
          featuredCategory="discounts"
        /> */}

        {/* Offers near you */}
        {/* <FeaturedRow
          id="12345"
          title="Offers near you"
          description="why not support your local restaurant tonight!"
          featuredCategory="offers"
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});

export default HomeScreen;
