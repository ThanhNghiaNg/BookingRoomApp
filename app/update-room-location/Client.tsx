"use client";

import axios from "axios";
import { sampleAcommodation } from "@/data/sampleAcommodation";
import { feature_list } from "@/data/Featured";
import { convenient_list } from "@/data/convenient";
import { accommodation_type } from "@/data/AccommodationType";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { categories } from "../components/navbar/Categories";

const initValue = {
  properties: "",
  accommodationType: "",
  // location: null,
  area: "",
  address: "",
  beds: 1,
  rooms: 1,
  guest: 1,
  bathrooms: 1,
  convenient: [""],
  featured: [""],
  image: "",
  detailImage: [""],
  title: "",
  detailDescription: "",
  pricesPerDate: 0,
  user: undefined,
};

const CreateClient = ({ fetchUser }: any) => {
  const [users, setUsers] = useState(fetchUser);
  function generateUniqueRandomArray(n: number, bound: number) {
    const allNumbers = Array.from({ length: bound }, (_, index) => index);
    const shuffledNumbers = allNumbers.sort(() => Math.random() - 0.5);
    return [...shuffledNumbers.slice(0, n)];
  }
  useEffect(() => {
    setUsers(fetchUser);
  }, [fetchUser]);
  const data = { ...initValue };
  const listData =
    sampleAcommodation.data.presentation.explore.sections.sectionIndependentData
      .staysMapSearch.mapSearchResults;
  const semiCreateRoom = async () => {
    listData.forEach(async (item, idx) => {
    //   if (idx === 1) return;
      const coordinate = item.listing.coordinate;
      const title = item.listing.name;
      const locationData = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${coordinate.latitude}&lon=${coordinate.longitude}&apiKey=9874873c27024a50893695a74c6c994a`
      );
      const address = locationData.data.features[0].properties.address_line1;
      console.log({
        title,
        address,
      });
      const result = await axios.post("api/update-room-location", {
        title,
        address,
      });
      console.log({ result });
      //   const rdPropertiesNum = Math.ceil(
      //     Math.random() * (categories.length - 1)
      //   );
      //   const rdType = Math.ceil(Math.random() * (accommodation_type.length - 1));
      //   const rdFeaturesNum = Math.ceil(
      //     Math.random() * (feature_list.length - 1)
      //   );
      //   const rdConvenientNum = Math.ceil(Math.random() * convenient_list.length);
      //   const rdFeatureIdxs = generateUniqueRandomArray(
      //     rdFeaturesNum,
      //     feature_list.length
      //   );
      //   const rdConvenientIdxs = generateUniqueRandomArray(
      //     rdConvenientNum,
      //     convenient_list.length
      //   );
      //   const rdUserNum = Math.trunc(Math.random() * (users ? users.length : 0));
      //   data.properties = categories[Math.trunc(Math.random() * categories.length)].label;
      //   data.accommodationType = accommodation_type[rdType].label;
      //   data.address = "25 Hà Huy Giáp";
      //   data.area = item.listing.city + ", Việt Nam";
      //   data.beds = Math.trunc(Math.random() * 10);
      //   data.rooms = Math.trunc(Math.random() * 10);
      //   data.guest = Math.trunc(Math.random() * 10);
      //   data.bathrooms = Math.trunc(Math.random() * 4);

      //   data.convenient = convenient_list
      //     .slice(rdConvenientNum, convenient_list.length - 1)
      //     .map((i) => i.label);
      //   data.featured = feature_list
      //     .slice(rdFeaturesNum, feature_list.length - 1)
      //     .map((i) => {
      //       console.log("label : ", i);
      //       return i.label;
      //     });
      //   data.image = item.listing.contextualPictures[0].picture;
      //   data.detailImage = item.listing.contextualPictures
      //     .slice(1, 5)
      //     .map((i) => i.picture);
      //   data.title = item.listing.name;
      //   data.detailDescription = " ";
      //   data.pricesPerDate = Math.trunc(Math.random() * 500);

      //   data.user = users[rdUserNum];
      //   console.log(data);
      //   // await axios.post("/api/accommodation", data);
    });
  };

  return (
    <Container>
      <button onClick={semiCreateRoom}>Create</button>
    </Container>
  );
};

export default CreateClient;
