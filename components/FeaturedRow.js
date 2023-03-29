import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import ResturantCards from "./ResturantCard";
import ResturantCard from "./ResturantCard";
import sanityClient from "../sanity";

const FeaturedRow = ({ id, title, description }) => {
  const [resturants, setResturants] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
  *[_type == "featured" && _id == $id] {
    ..., resturants[]->{
      ..., dishes[]->
        }
      }[0]`,
        { id }
      )
      .then((data) => {
        setResturants(data?.resturants);
      });
  }, [id]);


  return (
    <View>
      <View className="mt-4 flex-row justify-between items-center px-4 ">
        <Text className="font-bold text-lg">{title}</Text>
        <AntDesign name="arrowright" color="#00CCDD" size={30} />
      </View>

      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        className="pt-4"
      >
        {resturants.map((resturant) => (
          <ResturantCard
            key={resturant._id}
            id={resturant._id}
            imgUrl={resturant.image}
            title={resturant.name}
            rating={resturant.rating}
            genre={resturant.type?.name}
            address={resturant.address}
            short_description={resturant.short_description}
            dishes={resturant.dishes}
            long={resturant.long}
            lat={resturant.lat}
          />
        ))}
        {/* Resturant Cards */}
        {/* <ResturantCard
          id="321"
          imgUrl="https://links.papareact.com/gn7"
          title="Yo! Sushi"
          rating={4.5}
          genre="Japanese"
          address="0376 Jaqueline Route"
          short_description="This is Test description"
          dishes={[]}
          long={20}
          lat={0}
        />
        <ResturantCard
          id="321"
          imgUrl="https://links.papareact.com/gn7"
          title="Yo! Sushi"
          rating={4.5}
          genre="Japanese"
          address="0376 Jaqueline Route"
          short_description="This is Test description"
          dishes={[]}
          long={20}
          lat={0}
        />
        <ResturantCard
          id="321"
          imgUrl="https://links.papareact.com/gn7"
          title="Yo! Sushi"
          rating={4.5}
          genre="Japanese"
          address="0376 Jaqueline Route"
          short_description="This is Test description"
          dishes={[]}
          long={20}
          lat={0}
        /> */}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
