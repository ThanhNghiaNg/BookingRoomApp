"use client";
import React, { useEffect } from "react";
import MenuItem from "../components/navbar/MenuItem";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";

import { useCallback, useState } from "react";
import { BiMedal } from "react-icons/bi";
import { BsHeadset } from "react-icons/bs";
import { GiReceiveMoney } from "react-icons/gi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { Tab } from "@headlessui/react";
import { Tooltip } from "@mui/material";
import dayjs from "dayjs";

import Calendar from "./Calendar";
import HistoryChart from "./HistoryChart";
import HistoryTable from "./HistoryTable";
import HelpClient from "./HelpClient";
import { SafeAccommodation, SafeReservation, SafeUser } from "../types";
import axios from "axios";
import Heading from "../components/Heading";
import NavHistory from "./NavHistory";
import ReservationsClient from "./ReservationsClient";
import FavoritesClient from "./FavoritesClient";
import ListingCard from "../components/listings/ListingCard";
import MyOwnClient from "./MyOwnClient";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
const today = new Date();

const tabList = ["Host", "History", "Notification"];

// const reservationListDataTest = [
//   {
//     id: "64d6ff13b22bf9a2b1e249b0",
//     userId: "64ecd940cab4fa0e8fa8852a",
//     startDate: "2023-08-11T17:00:00.000Z",
//     endDate: "2023-08-13T17:00:00.000Z",
//     createdAt: "2023-08-27T12:05:58.698Z",
//     accommodationId: "64da00c6c068e84d00c4f031",
//     stripeSessionId:
//       "cs_test_a1MdYCCQqVVYBeyOw8FafW5EdjZMtE0C0cKmanLMMCP6Dg5Qitfwv39Gta",
//     totalPrice: 15,
//     email: "ibuhuy105@gmail.com",
//     name: "Huy Nguyen",
//     phone: "+84937095767",
//     status: "pending",
//     accommodation: {
//       id: "64da00c6c068e84d00c4f031",
//       properties: "Villa",
//       accommodationType: "Place of residence",
//       address: "36 Tô Hiến Thành",
//       area: "Đà Lạt, Việt Nam",
//       beds: 4,
//       rooms: 3,
//       guest: 8,
//       bathrooms: 2,
//       convenient: ["Wifi", "TV", "Kitchen", "Air Conditioner", "Working Space"],
//       featured: ["Large yard", "BBQ", "Seaside", "Downtown"],
//       image:
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008516/erwdd8ppm5pe48fjgswb.jpg",
//       detailPictures: [
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008524/kb5qbfql6flsva4aprhl.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008527/anmqnzmvnvstxrdffhf0.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008530/xqcfncismrf9vqavqj8n.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008534/pmc365kqdvkvzn5lbhsz.jpg",
//       ],
//       title: "Bazan Hotel Dalat",
//       detailDescription:
//         "Bạn đủ điều kiện nhận giảm giá Genius tại Bazan Hotel Dalat! Để tiết kiệm tại chỗ nghỉ này, bạn chỉ cần đăng nhập.  Tọa lạc tại thành phố Đà Lạt, cách Công viên Yersin 1,6 km, Bazan Hotel Dalat cung cấp chỗ nghỉ với khu vườn, chỗ đỗ xe riêng miễn phí và sảnh khách chung. Khách sạn 3 sao này có dịch vụ phòng, dịch vụ tiền sảnh, lễ tân 24 giờ, dịch vụ đưa đón sân bay, bếp chung và WiFi miễn phí trong toàn bộ khuôn viên.  Phòng nghỉ tại Bazan Hotel Dalat được trang bị TV màn hình phẳng, ga trải giường và khăn tắm. Một số phòng còn có tầm nhìn ra quang cảnh thành phố và phòng tắm riêng đi kèm vòi xịt/chậu rửa vệ sinh cùng đồ vệ sinh cá nhân miễn phí.   Hồ Xuân Hương và Quảng trường Lâm Viên đều nằm trong bán kính 1,8 km từ Bazan Hotel Dalat. Sân bay gần nhất là sân bay Liên Khương, cách khách sạn 25 km.",
//       pricesPerDate: 15,
//       createdAt: "2023-08-14T10:24:06.529Z",
//       userId: "64ce6cd94ed2281390f36b66",
//     },
//   },
//   {
//     id: "64d6ff13b22bf9a2b1e249b6",
//     userId: "64ecd940cab4fa0e8fa8852a",
//     startDate: "2023-08-16T17:00:00.000Z",
//     endDate: "2023-08-20T17:00:00.000Z",
//     createdAt: "2023-08-27T12:05:58.698Z",
//     accommodationId: "64da00c6c068e84d00c4f031",
//     stripeSessionId:
//       "cs_test_a1MdYCCQqVVYBeyOw8FafW5EdjZMtE0C0cKmanLMMCP6Dg5Qitfwv39Gta",
//     totalPrice: 15,
//     email: "ibuhuy105@gmail.com",
//     name: "Huy Nguyen",
//     phone: "+84937095767",
//     status: "pending",
//     accommodation: {
//       id: "64da00c6c068e84d00c4f031",
//       properties: "Villa",
//       accommodationType: "Place of residence",
//       address: "36 Tô Hiến Thành",
//       area: "Đà Lạt, Việt Nam",
//       beds: 4,
//       rooms: 3,
//       guest: 8,
//       bathrooms: 2,
//       convenient: ["Wifi", "TV", "Kitchen", "Air Conditioner", "Working Space"],
//       featured: ["Large yard", "BBQ", "Seaside", "Downtown"],
//       image:
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008516/erwdd8ppm5pe48fjgswb.jpg",
//       detailPictures: [
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008524/kb5qbfql6flsva4aprhl.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008527/anmqnzmvnvstxrdffhf0.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008530/xqcfncismrf9vqavqj8n.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008534/pmc365kqdvkvzn5lbhsz.jpg",
//       ],
//       title: "Bazan Hotel Dalat",
//       detailDescription:
//         "Bạn đủ điều kiện nhận giảm giá Genius tại Bazan Hotel Dalat! Để tiết kiệm tại chỗ nghỉ này, bạn chỉ cần đăng nhập.  Tọa lạc tại thành phố Đà Lạt, cách Công viên Yersin 1,6 km, Bazan Hotel Dalat cung cấp chỗ nghỉ với khu vườn, chỗ đỗ xe riêng miễn phí và sảnh khách chung. Khách sạn 3 sao này có dịch vụ phòng, dịch vụ tiền sảnh, lễ tân 24 giờ, dịch vụ đưa đón sân bay, bếp chung và WiFi miễn phí trong toàn bộ khuôn viên.  Phòng nghỉ tại Bazan Hotel Dalat được trang bị TV màn hình phẳng, ga trải giường và khăn tắm. Một số phòng còn có tầm nhìn ra quang cảnh thành phố và phòng tắm riêng đi kèm vòi xịt/chậu rửa vệ sinh cùng đồ vệ sinh cá nhân miễn phí.   Hồ Xuân Hương và Quảng trường Lâm Viên đều nằm trong bán kính 1,8 km từ Bazan Hotel Dalat. Sân bay gần nhất là sân bay Liên Khương, cách khách sạn 25 km.",
//       pricesPerDate: 15,
//       createdAt: "2023-08-14T10:24:06.529Z",
//       userId: "64ce6cd94ed2281390f36b66",
//     },
//   },
//   {
//     id: "64d6ff13b22bf9a2b1e249b1",
//     userId: "64ecd940cab4fa0e8fa8852a",
//     startDate: "2023-08-04T17:00:00.000Z",
//     endDate: "2023-08-05T17:00:00.000Z",
//     createdAt: "2023-08-27T12:05:58.698Z",
//     accommodationId: "64da00c6c068e84d00c4f031",
//     stripeSessionId:
//       "cs_test_a1MdYCCQqVVYBeyOw8FafW5EdjZMtE0C0cKmanLMMCP6Dg5Qitfwv39Gta",
//     totalPrice: 15,
//     email: "ibuhuy105@gmail.com",
//     name: "Huy Nguyen",
//     phone: "+84937095767",
//     status: "pending",
//     accommodation: {
//       id: "64da00c6c068e84d00c4f031",
//       properties: "Villa",
//       accommodationType: "Place of residence",
//       address: "36 Tô Hiến Thành",
//       area: "Đà Lạt, Việt Nam",
//       beds: 4,
//       rooms: 3,
//       guest: 8,
//       bathrooms: 2,
//       convenient: ["Wifi", "TV", "Kitchen", "Air Conditioner", "Working Space"],
//       featured: ["Large yard", "BBQ", "Seaside", "Downtown"],
//       image:
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008516/erwdd8ppm5pe48fjgswb.jpg",
//       detailPictures: [
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008524/kb5qbfql6flsva4aprhl.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008527/anmqnzmvnvstxrdffhf0.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008530/xqcfncismrf9vqavqj8n.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008534/pmc365kqdvkvzn5lbhsz.jpg",
//       ],
//       title: "Bazan Hotel Dalat",
//       detailDescription:
//         "Bạn đủ điều kiện nhận giảm giá Genius tại Bazan Hotel Dalat! Để tiết kiệm tại chỗ nghỉ này, bạn chỉ cần đăng nhập.  Tọa lạc tại thành phố Đà Lạt, cách Công viên Yersin 1,6 km, Bazan Hotel Dalat cung cấp chỗ nghỉ với khu vườn, chỗ đỗ xe riêng miễn phí và sảnh khách chung. Khách sạn 3 sao này có dịch vụ phòng, dịch vụ tiền sảnh, lễ tân 24 giờ, dịch vụ đưa đón sân bay, bếp chung và WiFi miễn phí trong toàn bộ khuôn viên.  Phòng nghỉ tại Bazan Hotel Dalat được trang bị TV màn hình phẳng, ga trải giường và khăn tắm. Một số phòng còn có tầm nhìn ra quang cảnh thành phố và phòng tắm riêng đi kèm vòi xịt/chậu rửa vệ sinh cùng đồ vệ sinh cá nhân miễn phí.   Hồ Xuân Hương và Quảng trường Lâm Viên đều nằm trong bán kính 1,8 km từ Bazan Hotel Dalat. Sân bay gần nhất là sân bay Liên Khương, cách khách sạn 25 km.",
//       pricesPerDate: 15,
//       createdAt: "2023-08-14T10:24:06.529Z",
//       userId: "64ce6cd94ed2281390f36b66",
//     },
//   },
//   {
//     id: "64d6ff13b22bf9a2b1e249b2",
//     userId: "64ecd940cab4fa0e8fa8852a",
//     startDate: "2023-08-22T17:00:00.000Z",
//     endDate: "2023-08-24T17:00:00.000Z",
//     createdAt: "2023-08-27T12:05:58.698Z",
//     accommodationId: "64da00c6c068e84d00c4f031",
//     stripeSessionId:
//       "cs_test_a1MdYCCQqVVYBeyOw8FafW5EdjZMtE0C0cKmanLMMCP6Dg5Qitfwv39Gta",
//     totalPrice: 15,
//     email: "ibuhuy105@gmail.com",
//     name: "Huy Nguyen",
//     phone: "+84937095767",
//     status: "pending",
//     accommodation: {
//       id: "64da00c6c068e84d00c4f031",
//       properties: "Villa",
//       accommodationType: "Place of residence",
//       address: "36 Tô Hiến Thành",
//       area: "Đà Lạt, Việt Nam",
//       beds: 4,
//       rooms: 3,
//       guest: 8,
//       bathrooms: 2,
//       convenient: ["Wifi", "TV", "Kitchen", "Air Conditioner", "Working Space"],
//       featured: ["Large yard", "BBQ", "Seaside", "Downtown"],
//       image:
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008516/erwdd8ppm5pe48fjgswb.jpg",
//       detailPictures: [
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008524/kb5qbfql6flsva4aprhl.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008527/anmqnzmvnvstxrdffhf0.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008530/xqcfncismrf9vqavqj8n.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008534/pmc365kqdvkvzn5lbhsz.jpg",
//       ],
//       title: "Bazan Hotel Dalat",
//       detailDescription:
//         "Bạn đủ điều kiện nhận giảm giá Genius tại Bazan Hotel Dalat! Để tiết kiệm tại chỗ nghỉ này, bạn chỉ cần đăng nhập.  Tọa lạc tại thành phố Đà Lạt, cách Công viên Yersin 1,6 km, Bazan Hotel Dalat cung cấp chỗ nghỉ với khu vườn, chỗ đỗ xe riêng miễn phí và sảnh khách chung. Khách sạn 3 sao này có dịch vụ phòng, dịch vụ tiền sảnh, lễ tân 24 giờ, dịch vụ đưa đón sân bay, bếp chung và WiFi miễn phí trong toàn bộ khuôn viên.  Phòng nghỉ tại Bazan Hotel Dalat được trang bị TV màn hình phẳng, ga trải giường và khăn tắm. Một số phòng còn có tầm nhìn ra quang cảnh thành phố và phòng tắm riêng đi kèm vòi xịt/chậu rửa vệ sinh cùng đồ vệ sinh cá nhân miễn phí.   Hồ Xuân Hương và Quảng trường Lâm Viên đều nằm trong bán kính 1,8 km từ Bazan Hotel Dalat. Sân bay gần nhất là sân bay Liên Khương, cách khách sạn 25 km.",
//       pricesPerDate: 15,
//       createdAt: "2023-08-14T10:24:06.529Z",
//       userId: "64ce6cd94ed2281390f36b66",
//     },
//   },
//   {
//     id: "64d6ff13b22bf9a2b1e249b4",
//     userId: "64ecd940cab4fa0e8fa8852a",
//     startDate: "2023-08-31T17:00:00.000Z",
//     endDate: "2023-08-31T17:00:00.000Z",
//     createdAt: "2023-08-27T12:05:58.698Z",
//     accommodationId: "64da00c6c068e84d00c4f031",
//     stripeSessionId:
//       "cs_test_a1MdYCCQqVVYBeyOw8FafW5EdjZMtE0C0cKmanLMMCP6Dg5Qitfwv39Gta",
//     totalPrice: 15,
//     email: "ibuhuy105@gmail.com",
//     name: "Huy Nguyen",
//     phone: "+84937095767",
//     status: "pending",
//     accommodation: {
//       id: "64da00c6c068e84d00c4f031",
//       properties: "Villa",
//       accommodationType: "Place of residence",
//       address: "36 Tô Hiến Thành",
//       area: "Đà Lạt, Việt Nam",
//       beds: 4,
//       rooms: 3,
//       guest: 8,
//       bathrooms: 2,
//       convenient: ["Wifi", "TV", "Kitchen", "Air Conditioner", "Working Space"],
//       featured: ["Large yard", "BBQ", "Seaside", "Downtown"],
//       image:
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008516/erwdd8ppm5pe48fjgswb.jpg",
//       detailPictures: [
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008524/kb5qbfql6flsva4aprhl.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008527/anmqnzmvnvstxrdffhf0.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008530/xqcfncismrf9vqavqj8n.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008534/pmc365kqdvkvzn5lbhsz.jpg",
//       ],
//       title: "Bazan Hotel Dalat",
//       detailDescription:
//         "Bạn đủ điều kiện nhận giảm giá Genius tại Bazan Hotel Dalat! Để tiết kiệm tại chỗ nghỉ này, bạn chỉ cần đăng nhập.  Tọa lạc tại thành phố Đà Lạt, cách Công viên Yersin 1,6 km, Bazan Hotel Dalat cung cấp chỗ nghỉ với khu vườn, chỗ đỗ xe riêng miễn phí và sảnh khách chung. Khách sạn 3 sao này có dịch vụ phòng, dịch vụ tiền sảnh, lễ tân 24 giờ, dịch vụ đưa đón sân bay, bếp chung và WiFi miễn phí trong toàn bộ khuôn viên.  Phòng nghỉ tại Bazan Hotel Dalat được trang bị TV màn hình phẳng, ga trải giường và khăn tắm. Một số phòng còn có tầm nhìn ra quang cảnh thành phố và phòng tắm riêng đi kèm vòi xịt/chậu rửa vệ sinh cùng đồ vệ sinh cá nhân miễn phí.   Hồ Xuân Hương và Quảng trường Lâm Viên đều nằm trong bán kính 1,8 km từ Bazan Hotel Dalat. Sân bay gần nhất là sân bay Liên Khương, cách khách sạn 25 km.",
//       pricesPerDate: 15,
//       createdAt: "2023-08-14T10:24:06.529Z",
//       userId: "64ce6cd94ed2281390f36b66",
//     },
//   },
//   {
//     id: "64d6ff13b22bf9a2b1e249b5",
//     userId: "64ecd940cab4fa0e8fa8852a",
//     startDate: "2023-08-27T17:00:00.000Z",
//     endDate: "2023-08-28T17:00:00.000Z",
//     createdAt: "2023-08-27T12:05:58.698Z",
//     accommodationId: "64da00c6c068e84d00c4f031",
//     stripeSessionId:
//       "cs_test_a1MdYCCQqVVYBeyOw8FafW5EdjZMtE0C0cKmanLMMCP6Dg5Qitfwv39Gta",
//     totalPrice: 15,
//     email: "ibuhuy105@gmail.com",
//     name: "Huy Nguyen",
//     phone: "+84937095767",
//     status: "pending",
//     accommodation: {
//       id: "64da00c6c068e84d00c4f031",
//       properties: "Villa",
//       accommodationType: "Place of residence",
//       address: "36 Tô Hiến Thành",
//       area: "Đà Lạt, Việt Nam",
//       beds: 4,
//       rooms: 3,
//       guest: 8,
//       bathrooms: 2,
//       convenient: ["Wifi", "TV", "Kitchen", "Air Conditioner", "Working Space"],
//       featured: ["Large yard", "BBQ", "Seaside", "Downtown"],
//       image:
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008516/erwdd8ppm5pe48fjgswb.jpg",
//       detailPictures: [
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008524/kb5qbfql6flsva4aprhl.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008527/anmqnzmvnvstxrdffhf0.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008530/xqcfncismrf9vqavqj8n.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008534/pmc365kqdvkvzn5lbhsz.jpg",
//       ],
//       title: "Bazan Hotel Dalat",
//       detailDescription:
//         "Bạn đủ điều kiện nhận giảm giá Genius tại Bazan Hotel Dalat! Để tiết kiệm tại chỗ nghỉ này, bạn chỉ cần đăng nhập.  Tọa lạc tại thành phố Đà Lạt, cách Công viên Yersin 1,6 km, Bazan Hotel Dalat cung cấp chỗ nghỉ với khu vườn, chỗ đỗ xe riêng miễn phí và sảnh khách chung. Khách sạn 3 sao này có dịch vụ phòng, dịch vụ tiền sảnh, lễ tân 24 giờ, dịch vụ đưa đón sân bay, bếp chung và WiFi miễn phí trong toàn bộ khuôn viên.  Phòng nghỉ tại Bazan Hotel Dalat được trang bị TV màn hình phẳng, ga trải giường và khăn tắm. Một số phòng còn có tầm nhìn ra quang cảnh thành phố và phòng tắm riêng đi kèm vòi xịt/chậu rửa vệ sinh cùng đồ vệ sinh cá nhân miễn phí.   Hồ Xuân Hương và Quảng trường Lâm Viên đều nằm trong bán kính 1,8 km từ Bazan Hotel Dalat. Sân bay gần nhất là sân bay Liên Khương, cách khách sạn 25 km.",
//       pricesPerDate: 15,
//       createdAt: "2023-08-14T10:24:06.529Z",
//       userId: "64ce6cd94ed2281390f36b66",
//     },
//   },
//   {
//     id: "64d7863432ca3f3167f1bb7e",
//     userId: "64ecd940cab4fa0e8fa8852a",
//     startDate: "2023-08-02T17:00:00.000Z",
//     endDate: "2023-08-02T17:00:00.000Z",
//     createdAt: "2023-08-27T12:05:58.698Z",
//     accommodationId: "64da00c6c068e84d00c4f031",
//     stripeSessionId:
//       "cs_test_a1MdYCCQqVVYBeyOw8FafW5EdjZMtE0C0cKmanLMMCP6Dg5Qitfwv39Gta",
//     totalPrice: 15,
//     email: "ibuhuy105@gmail.com",
//     name: "Huy Nguyen",
//     phone: "+84937095767",
//     status: "pending",
//     accommodation: {
//       id: "64da00c6c068e84d00c4f031",
//       properties: "Villa",
//       accommodationType: "Place of residence",
//       address: "36 Tô Hiến Thành",
//       area: "Đà Lạt, Việt Nam",
//       beds: 4,
//       rooms: 3,
//       guest: 8,
//       bathrooms: 2,
//       convenient: ["Wifi", "TV", "Kitchen", "Air Conditioner", "Working Space"],
//       featured: ["Large yard", "BBQ", "Seaside", "Downtown"],
//       image:
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008516/erwdd8ppm5pe48fjgswb.jpg",
//       detailPictures: [
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008524/kb5qbfql6flsva4aprhl.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008527/anmqnzmvnvstxrdffhf0.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008530/xqcfncismrf9vqavqj8n.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008534/pmc365kqdvkvzn5lbhsz.jpg",
//       ],
//       title: "Bazan Hotel Dalat",
//       detailDescription:
//         "Bạn đủ điều kiện nhận giảm giá Genius tại Bazan Hotel Dalat! Để tiết kiệm tại chỗ nghỉ này, bạn chỉ cần đăng nhập.  Tọa lạc tại thành phố Đà Lạt, cách Công viên Yersin 1,6 km, Bazan Hotel Dalat cung cấp chỗ nghỉ với khu vườn, chỗ đỗ xe riêng miễn phí và sảnh khách chung. Khách sạn 3 sao này có dịch vụ phòng, dịch vụ tiền sảnh, lễ tân 24 giờ, dịch vụ đưa đón sân bay, bếp chung và WiFi miễn phí trong toàn bộ khuôn viên.  Phòng nghỉ tại Bazan Hotel Dalat được trang bị TV màn hình phẳng, ga trải giường và khăn tắm. Một số phòng còn có tầm nhìn ra quang cảnh thành phố và phòng tắm riêng đi kèm vòi xịt/chậu rửa vệ sinh cùng đồ vệ sinh cá nhân miễn phí.   Hồ Xuân Hương và Quảng trường Lâm Viên đều nằm trong bán kính 1,8 km từ Bazan Hotel Dalat. Sân bay gần nhất là sân bay Liên Khương, cách khách sạn 25 km.",
//       pricesPerDate: 15,
//       createdAt: "2023-08-14T10:24:06.529Z",
//       userId: "64ce6cd94ed2281390f36b66",
//     },
//   },
//   {
//     id: "64d7aa9d846874b7b7c736ee",
//     userId: "64ecd940cab4fa0e8fa8852a",
//     startDate: "2023-08-01T17:00:00.000Z",
//     endDate: "2023-08-01T17:00:00.000Z",
//     createdAt: "2023-08-27T12:05:58.698Z",
//     accommodationId: "64da00c6c068e84d00c4f031",
//     stripeSessionId:
//       "cs_test_a1MdYCCQqVVYBeyOw8FafW5EdjZMtE0C0cKmanLMMCP6Dg5Qitfwv39Gta",
//     totalPrice: 15,
//     email: "ibuhuy105@gmail.com",
//     name: "Huy Nguyen",
//     phone: "+84937095767",
//     status: "pending",
//     accommodation: {
//       id: "64da00c6c068e84d00c4f031",
//       properties: "Villa",
//       accommodationType: "Place of residence",
//       address: "36 Tô Hiến Thành",
//       area: "Đà Lạt, Việt Nam",
//       beds: 4,
//       rooms: 3,
//       guest: 8,
//       bathrooms: 2,
//       convenient: ["Wifi", "TV", "Kitchen", "Air Conditioner", "Working Space"],
//       featured: ["Large yard", "BBQ", "Seaside", "Downtown"],
//       image:
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008516/erwdd8ppm5pe48fjgswb.jpg",
//       detailPictures: [
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008524/kb5qbfql6flsva4aprhl.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008527/anmqnzmvnvstxrdffhf0.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008530/xqcfncismrf9vqavqj8n.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008534/pmc365kqdvkvzn5lbhsz.jpg",
//       ],
//       title: "Bazan Hotel Dalat",
//       detailDescription:
//         "Bạn đủ điều kiện nhận giảm giá Genius tại Bazan Hotel Dalat! Để tiết kiệm tại chỗ nghỉ này, bạn chỉ cần đăng nhập.  Tọa lạc tại thành phố Đà Lạt, cách Công viên Yersin 1,6 km, Bazan Hotel Dalat cung cấp chỗ nghỉ với khu vườn, chỗ đỗ xe riêng miễn phí và sảnh khách chung. Khách sạn 3 sao này có dịch vụ phòng, dịch vụ tiền sảnh, lễ tân 24 giờ, dịch vụ đưa đón sân bay, bếp chung và WiFi miễn phí trong toàn bộ khuôn viên.  Phòng nghỉ tại Bazan Hotel Dalat được trang bị TV màn hình phẳng, ga trải giường và khăn tắm. Một số phòng còn có tầm nhìn ra quang cảnh thành phố và phòng tắm riêng đi kèm vòi xịt/chậu rửa vệ sinh cùng đồ vệ sinh cá nhân miễn phí.   Hồ Xuân Hương và Quảng trường Lâm Viên đều nằm trong bán kính 1,8 km từ Bazan Hotel Dalat. Sân bay gần nhất là sân bay Liên Khương, cách khách sạn 25 km.",
//       pricesPerDate: 15,
//       createdAt: "2023-08-14T10:24:06.529Z",
//       userId: "64ce6cd94ed2281390f36b66",
//     },
//   },
//   {
//     id: "64d8f4842b9d70723bb202db",
//     userId: "64ecd940cab4fa0e8fa8852a",
//     startDate: "2023-08-25T17:00:00.000Z",
//     endDate: "2023-08-25T17:00:00.000Z",
//     createdAt: "2023-08-27T12:05:58.698Z",
//     accommodationId: "64da00c6c068e84d00c4f031",
//     stripeSessionId:
//       "cs_test_a1MdYCCQqVVYBeyOw8FafW5EdjZMtE0C0cKmanLMMCP6Dg5Qitfwv39Gta",
//     totalPrice: 15,
//     email: "ibuhuy105@gmail.com",
//     name: "Huy Nguyen",
//     phone: "+84937095767",
//     status: "pending",
//     accommodation: {
//       id: "64da00c6c068e84d00c4f031",
//       properties: "Villa",
//       accommodationType: "Place of residence",
//       address: "36 Tô Hiến Thành",
//       area: "Đà Lạt, Việt Nam",
//       beds: 4,
//       rooms: 3,
//       guest: 8,
//       bathrooms: 2,
//       convenient: ["Wifi", "TV", "Kitchen", "Air Conditioner", "Working Space"],
//       featured: ["Large yard", "BBQ", "Seaside", "Downtown"],
//       image:
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008516/erwdd8ppm5pe48fjgswb.jpg",
//       detailPictures: [
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008524/kb5qbfql6flsva4aprhl.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008527/anmqnzmvnvstxrdffhf0.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008530/xqcfncismrf9vqavqj8n.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008534/pmc365kqdvkvzn5lbhsz.jpg",
//       ],
//       title: "Bazan Hotel Dalat",
//       detailDescription:
//         "Bạn đủ điều kiện nhận giảm giá Genius tại Bazan Hotel Dalat! Để tiết kiệm tại chỗ nghỉ này, bạn chỉ cần đăng nhập.  Tọa lạc tại thành phố Đà Lạt, cách Công viên Yersin 1,6 km, Bazan Hotel Dalat cung cấp chỗ nghỉ với khu vườn, chỗ đỗ xe riêng miễn phí và sảnh khách chung. Khách sạn 3 sao này có dịch vụ phòng, dịch vụ tiền sảnh, lễ tân 24 giờ, dịch vụ đưa đón sân bay, bếp chung và WiFi miễn phí trong toàn bộ khuôn viên.  Phòng nghỉ tại Bazan Hotel Dalat được trang bị TV màn hình phẳng, ga trải giường và khăn tắm. Một số phòng còn có tầm nhìn ra quang cảnh thành phố và phòng tắm riêng đi kèm vòi xịt/chậu rửa vệ sinh cùng đồ vệ sinh cá nhân miễn phí.   Hồ Xuân Hương và Quảng trường Lâm Viên đều nằm trong bán kính 1,8 km từ Bazan Hotel Dalat. Sân bay gần nhất là sân bay Liên Khương, cách khách sạn 25 km.",
//       pricesPerDate: 15,
//       createdAt: "2023-08-14T10:24:06.529Z",
//       userId: "64ce6cd94ed2281390f36b66",
//     },
//   },
//   {
//     id: "64d9fecdc068e84d00c4f02f",
//     userId: "64ecd940cab4fa0e8fa8852a",
//     startDate: "2023-08-26T17:00:00.000Z",
//     endDate: "2023-08-26T17:00:00.000Z",
//     createdAt: "2023-08-27T12:05:58.698Z",
//     accommodationId: "64da00c6c068e84d00c4f031",
//     stripeSessionId:
//       "cs_test_a1MdYCCQqVVYBeyOw8FafW5EdjZMtE0C0cKmanLMMCP6Dg5Qitfwv39Gta",
//     totalPrice: 15,
//     email: "ibuhuy105@gmail.com",
//     name: "Huy Nguyen",
//     phone: "+84937095767",
//     status: "pending",
//     accommodation: {
//       id: "64da00c6c068e84d00c4f031",
//       properties: "Villa",
//       accommodationType: "Place of residence",
//       address: "36 Tô Hiến Thành",
//       area: "Đà Lạt, Việt Nam",
//       beds: 4,
//       rooms: 3,
//       guest: 8,
//       bathrooms: 2,
//       convenient: ["Wifi", "TV", "Kitchen", "Air Conditioner", "Working Space"],
//       featured: ["Large yard", "BBQ", "Seaside", "Downtown"],
//       image:
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008516/erwdd8ppm5pe48fjgswb.jpg",
//       detailPictures: [
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008524/kb5qbfql6flsva4aprhl.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008527/anmqnzmvnvstxrdffhf0.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008530/xqcfncismrf9vqavqj8n.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008534/pmc365kqdvkvzn5lbhsz.jpg",
//       ],
//       title: "Bazan Hotel Dalat",
//       detailDescription:
//         "Bạn đủ điều kiện nhận giảm giá Genius tại Bazan Hotel Dalat! Để tiết kiệm tại chỗ nghỉ này, bạn chỉ cần đăng nhập.  Tọa lạc tại thành phố Đà Lạt, cách Công viên Yersin 1,6 km, Bazan Hotel Dalat cung cấp chỗ nghỉ với khu vườn, chỗ đỗ xe riêng miễn phí và sảnh khách chung. Khách sạn 3 sao này có dịch vụ phòng, dịch vụ tiền sảnh, lễ tân 24 giờ, dịch vụ đưa đón sân bay, bếp chung và WiFi miễn phí trong toàn bộ khuôn viên.  Phòng nghỉ tại Bazan Hotel Dalat được trang bị TV màn hình phẳng, ga trải giường và khăn tắm. Một số phòng còn có tầm nhìn ra quang cảnh thành phố và phòng tắm riêng đi kèm vòi xịt/chậu rửa vệ sinh cùng đồ vệ sinh cá nhân miễn phí.   Hồ Xuân Hương và Quảng trường Lâm Viên đều nằm trong bán kính 1,8 km từ Bazan Hotel Dalat. Sân bay gần nhất là sân bay Liên Khương, cách khách sạn 25 km.",
//       pricesPerDate: 15,
//       createdAt: "2023-08-14T10:24:06.529Z",
//       userId: "64ce6cd94ed2281390f36b66",
//     },
//   },
//   {
//     id: "64da010f963ab91e6508e2e3",
//     userId: "64ecd940cab4fa0e8fa8852a",
//     startDate: "2023-08-13T17:00:00.000Z",
//     endDate: "2023-08-17T17:00:00.000Z",
//     createdAt: "2023-08-27T12:05:58.698Z",
//     accommodationId: "64da00c6c068e84d00c4f031",
//     stripeSessionId:
//       "cs_test_a1MdYCCQqVVYBeyOw8FafW5EdjZMtE0C0cKmanLMMCP6Dg5Qitfwv39Gta",
//     totalPrice: 15,
//     email: "ibuhuy105@gmail.com",
//     name: "Huy Nguyen",
//     phone: "+84937095767",
//     status: "pending",
//     accommodation: {
//       id: "64da00c6c068e84d00c4f031",
//       properties: "Villa",
//       accommodationType: "Place of residence",
//       address: "36 Tô Hiến Thành",
//       area: "Đà Lạt, Việt Nam",
//       beds: 4,
//       rooms: 3,
//       guest: 8,
//       bathrooms: 2,
//       convenient: ["Wifi", "TV", "Kitchen", "Air Conditioner", "Working Space"],
//       featured: ["Large yard", "BBQ", "Seaside", "Downtown"],
//       image:
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008516/erwdd8ppm5pe48fjgswb.jpg",
//       detailPictures: [
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008524/kb5qbfql6flsva4aprhl.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008527/anmqnzmvnvstxrdffhf0.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008530/xqcfncismrf9vqavqj8n.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008534/pmc365kqdvkvzn5lbhsz.jpg",
//       ],
//       title: "Bazan Hotel Dalat",
//       detailDescription:
//         "Bạn đủ điều kiện nhận giảm giá Genius tại Bazan Hotel Dalat! Để tiết kiệm tại chỗ nghỉ này, bạn chỉ cần đăng nhập.  Tọa lạc tại thành phố Đà Lạt, cách Công viên Yersin 1,6 km, Bazan Hotel Dalat cung cấp chỗ nghỉ với khu vườn, chỗ đỗ xe riêng miễn phí và sảnh khách chung. Khách sạn 3 sao này có dịch vụ phòng, dịch vụ tiền sảnh, lễ tân 24 giờ, dịch vụ đưa đón sân bay, bếp chung và WiFi miễn phí trong toàn bộ khuôn viên.  Phòng nghỉ tại Bazan Hotel Dalat được trang bị TV màn hình phẳng, ga trải giường và khăn tắm. Một số phòng còn có tầm nhìn ra quang cảnh thành phố và phòng tắm riêng đi kèm vòi xịt/chậu rửa vệ sinh cùng đồ vệ sinh cá nhân miễn phí.   Hồ Xuân Hương và Quảng trường Lâm Viên đều nằm trong bán kính 1,8 km từ Bazan Hotel Dalat. Sân bay gần nhất là sân bay Liên Khương, cách khách sạn 25 km.",
//       pricesPerDate: 15,
//       createdAt: "2023-08-14T10:24:06.529Z",
//       userId: "64ce6cd94ed2281390f36b66",
//     },
//   },
//   {
//     id: "64da249c33f4af3b73208650",
//     userId: "64ecd940cab4fa0e8fa8852a",
//     startDate: "2023-08-23T17:00:00.000Z",
//     endDate: "2023-08-24T17:00:00.000Z",
//     createdAt: "2023-08-27T12:05:58.698Z",
//     accommodationId: "64da00c6c068e84d00c4f031",
//     stripeSessionId:
//       "cs_test_a1MdYCCQqVVYBeyOw8FafW5EdjZMtE0C0cKmanLMMCP6Dg5Qitfwv39Gta",
//     totalPrice: 15,
//     email: "ibuhuy105@gmail.com",
//     name: "Huy Nguyen",
//     phone: "+84937095767",
//     status: "pending",
//     accommodation: {
//       id: "64da00c6c068e84d00c4f031",
//       properties: "Villa",
//       accommodationType: "Place of residence",
//       address: "36 Tô Hiến Thành",
//       area: "Đà Lạt, Việt Nam",
//       beds: 4,
//       rooms: 3,
//       guest: 8,
//       bathrooms: 2,
//       convenient: ["Wifi", "TV", "Kitchen", "Air Conditioner", "Working Space"],
//       featured: ["Large yard", "BBQ", "Seaside", "Downtown"],
//       image:
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008516/erwdd8ppm5pe48fjgswb.jpg",
//       detailPictures: [
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008524/kb5qbfql6flsva4aprhl.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008527/anmqnzmvnvstxrdffhf0.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008530/xqcfncismrf9vqavqj8n.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008534/pmc365kqdvkvzn5lbhsz.jpg",
//       ],
//       title: "Bazan Hotel Dalat",
//       detailDescription:
//         "Bạn đủ điều kiện nhận giảm giá Genius tại Bazan Hotel Dalat! Để tiết kiệm tại chỗ nghỉ này, bạn chỉ cần đăng nhập.  Tọa lạc tại thành phố Đà Lạt, cách Công viên Yersin 1,6 km, Bazan Hotel Dalat cung cấp chỗ nghỉ với khu vườn, chỗ đỗ xe riêng miễn phí và sảnh khách chung. Khách sạn 3 sao này có dịch vụ phòng, dịch vụ tiền sảnh, lễ tân 24 giờ, dịch vụ đưa đón sân bay, bếp chung và WiFi miễn phí trong toàn bộ khuôn viên.  Phòng nghỉ tại Bazan Hotel Dalat được trang bị TV màn hình phẳng, ga trải giường và khăn tắm. Một số phòng còn có tầm nhìn ra quang cảnh thành phố và phòng tắm riêng đi kèm vòi xịt/chậu rửa vệ sinh cùng đồ vệ sinh cá nhân miễn phí.   Hồ Xuân Hương và Quảng trường Lâm Viên đều nằm trong bán kính 1,8 km từ Bazan Hotel Dalat. Sân bay gần nhất là sân bay Liên Khương, cách khách sạn 25 km.",
//       pricesPerDate: 15,
//       createdAt: "2023-08-14T10:24:06.529Z",
//       userId: "64ce6cd94ed2281390f36b66",
//     },
//   },
//   {
//     id: "64dc92642a98f49f364f672c",
//     userId: "64ecd940cab4fa0e8fa8852a",
//     startDate: "2023-08-25T17:00:00.000Z",
//     endDate: "2023-08-28T17:00:00.000Z",
//     createdAt: "2023-08-27T12:05:58.698Z",
//     accommodationId: "64da00c6c068e84d00c4f031",
//     stripeSessionId:
//       "cs_test_a1MdYCCQqVVYBeyOw8FafW5EdjZMtE0C0cKmanLMMCP6Dg5Qitfwv39Gta",
//     totalPrice: 15,
//     email: "ibuhuy105@gmail.com",
//     name: "Huy Nguyen",
//     phone: "+84937095767",
//     status: "pending",
//     accommodation: {
//       id: "64da00c6c068e84d00c4f031",
//       properties: "Villa",
//       accommodationType: "Place of residence",
//       address: "36 Tô Hiến Thành",
//       area: "Đà Lạt, Việt Nam",
//       beds: 4,
//       rooms: 3,
//       guest: 8,
//       bathrooms: 2,
//       convenient: ["Wifi", "TV", "Kitchen", "Air Conditioner", "Working Space"],
//       featured: ["Large yard", "BBQ", "Seaside", "Downtown"],
//       image:
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008516/erwdd8ppm5pe48fjgswb.jpg",
//       detailPictures: [
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008524/kb5qbfql6flsva4aprhl.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008527/anmqnzmvnvstxrdffhf0.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008530/xqcfncismrf9vqavqj8n.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008534/pmc365kqdvkvzn5lbhsz.jpg",
//       ],
//       title: "Bazan Hotel Dalat",
//       detailDescription:
//         "Bạn đủ điều kiện nhận giảm giá Genius tại Bazan Hotel Dalat! Để tiết kiệm tại chỗ nghỉ này, bạn chỉ cần đăng nhập.  Tọa lạc tại thành phố Đà Lạt, cách Công viên Yersin 1,6 km, Bazan Hotel Dalat cung cấp chỗ nghỉ với khu vườn, chỗ đỗ xe riêng miễn phí và sảnh khách chung. Khách sạn 3 sao này có dịch vụ phòng, dịch vụ tiền sảnh, lễ tân 24 giờ, dịch vụ đưa đón sân bay, bếp chung và WiFi miễn phí trong toàn bộ khuôn viên.  Phòng nghỉ tại Bazan Hotel Dalat được trang bị TV màn hình phẳng, ga trải giường và khăn tắm. Một số phòng còn có tầm nhìn ra quang cảnh thành phố và phòng tắm riêng đi kèm vòi xịt/chậu rửa vệ sinh cùng đồ vệ sinh cá nhân miễn phí.   Hồ Xuân Hương và Quảng trường Lâm Viên đều nằm trong bán kính 1,8 km từ Bazan Hotel Dalat. Sân bay gần nhất là sân bay Liên Khương, cách khách sạn 25 km.",
//       pricesPerDate: 15,
//       createdAt: "2023-08-14T10:24:06.529Z",
//       userId: "64ce6cd94ed2281390f36b66",
//     },
//   },
//   {
//     id: "64dd992a4388bdb4d68864dd",
//     userId: "64ecd940cab4fa0e8fa8852a",
//     startDate: "2023-08-01T17:00:00.000Z",
//     endDate: "2023-08-02T17:00:00.000Z",
//     createdAt: "2023-08-27T12:05:58.698Z",
//     accommodationId: "64da00c6c068e84d00c4f031",
//     stripeSessionId:
//       "cs_test_a1MdYCCQqVVYBeyOw8FafW5EdjZMtE0C0cKmanLMMCP6Dg5Qitfwv39Gta",
//     totalPrice: 15,
//     email: "ibuhuy105@gmail.com",
//     name: "Huy Nguyen",
//     phone: "+84937095767",
//     status: "pending",
//     accommodation: {
//       id: "64da00c6c068e84d00c4f031",
//       properties: "Villa",
//       accommodationType: "Place of residence",
//       address: "36 Tô Hiến Thành",
//       area: "Đà Lạt, Việt Nam",
//       beds: 4,
//       rooms: 3,
//       guest: 8,
//       bathrooms: 2,
//       convenient: ["Wifi", "TV", "Kitchen", "Air Conditioner", "Working Space"],
//       featured: ["Large yard", "BBQ", "Seaside", "Downtown"],
//       image:
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008516/erwdd8ppm5pe48fjgswb.jpg",
//       detailPictures: [
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008524/kb5qbfql6flsva4aprhl.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008527/anmqnzmvnvstxrdffhf0.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008530/xqcfncismrf9vqavqj8n.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008534/pmc365kqdvkvzn5lbhsz.jpg",
//       ],
//       title: "Bazan Hotel Dalat",
//       detailDescription:
//         "Bạn đủ điều kiện nhận giảm giá Genius tại Bazan Hotel Dalat! Để tiết kiệm tại chỗ nghỉ này, bạn chỉ cần đăng nhập.  Tọa lạc tại thành phố Đà Lạt, cách Công viên Yersin 1,6 km, Bazan Hotel Dalat cung cấp chỗ nghỉ với khu vườn, chỗ đỗ xe riêng miễn phí và sảnh khách chung. Khách sạn 3 sao này có dịch vụ phòng, dịch vụ tiền sảnh, lễ tân 24 giờ, dịch vụ đưa đón sân bay, bếp chung và WiFi miễn phí trong toàn bộ khuôn viên.  Phòng nghỉ tại Bazan Hotel Dalat được trang bị TV màn hình phẳng, ga trải giường và khăn tắm. Một số phòng còn có tầm nhìn ra quang cảnh thành phố và phòng tắm riêng đi kèm vòi xịt/chậu rửa vệ sinh cùng đồ vệ sinh cá nhân miễn phí.   Hồ Xuân Hương và Quảng trường Lâm Viên đều nằm trong bán kính 1,8 km từ Bazan Hotel Dalat. Sân bay gần nhất là sân bay Liên Khương, cách khách sạn 25 km.",
//       pricesPerDate: 15,
//       createdAt: "2023-08-14T10:24:06.529Z",
//       userId: "64ce6cd94ed2281390f36b66",
//     },
//   },
//   {
//     id: "64d6ff13b22bf9a2b1e24zzz",
//     userId: "64ecd940cab4fa0e8fa8852a",
//     startDate: "2023-08-30T17:00:00.000Z",
//     endDate: "2023-08-30T17:00:00.000Z",
//     createdAt: "2023-08-27T12:05:58.698Z",
//     accommodationId: "64da00c6c068e84d00c4f031",
//     stripeSessionId:
//       "cs_test_a1MdYCCQqVVYBeyOw8FafW5EdjZMtE0C0cKmanLMMCP6Dg5Qitfwv39Gta",
//     totalPrice: 15,
//     email: "ibuhuy105@gmail.com",
//     name: "Huy Nguyen",
//     phone: "+84937095767",
//     status: "pending",
//     accommodation: {
//       id: "64da00c6c068e84d00c4f031",
//       properties: "Villa",
//       accommodationType: "Place of residence",
//       address: "36 Tô Hiến Thành",
//       area: "Đà Lạt, Việt Nam",
//       beds: 4,
//       rooms: 3,
//       guest: 8,
//       bathrooms: 2,
//       convenient: ["Wifi", "TV", "Kitchen", "Air Conditioner", "Working Space"],
//       featured: ["Large yard", "BBQ", "Seaside", "Downtown"],
//       image:
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008516/erwdd8ppm5pe48fjgswb.jpg",
//       detailPictures: [
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008524/kb5qbfql6flsva4aprhl.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008527/anmqnzmvnvstxrdffhf0.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008530/xqcfncismrf9vqavqj8n.jpg",
//         "https://res.cloudinary.com/dqrm0sqsu/image/upload/v1692008534/pmc365kqdvkvzn5lbhsz.jpg",
//       ],
//       title: "Bazan Hotel Dalat",
//       detailDescription:
//         "Bạn đủ điều kiện nhận giảm giá Genius tại Bazan Hotel Dalat! Để tiết kiệm tại chỗ nghỉ này, bạn chỉ cần đăng nhập.  Tọa lạc tại thành phố Đà Lạt, cách Công viên Yersin 1,6 km, Bazan Hotel Dalat cung cấp chỗ nghỉ với khu vườn, chỗ đỗ xe riêng miễn phí và sảnh khách chung. Khách sạn 3 sao này có dịch vụ phòng, dịch vụ tiền sảnh, lễ tân 24 giờ, dịch vụ đưa đón sân bay, bếp chung và WiFi miễn phí trong toàn bộ khuôn viên.  Phòng nghỉ tại Bazan Hotel Dalat được trang bị TV màn hình phẳng, ga trải giường và khăn tắm. Một số phòng còn có tầm nhìn ra quang cảnh thành phố và phòng tắm riêng đi kèm vòi xịt/chậu rửa vệ sinh cùng đồ vệ sinh cá nhân miễn phí.   Hồ Xuân Hương và Quảng trường Lâm Viên đều nằm trong bán kính 1,8 km từ Bazan Hotel Dalat. Sân bay gần nhất là sân bay Liên Khương, cách khách sạn 25 km.",
//       pricesPerDate: 15,
//       createdAt: "2023-08-14T10:24:06.529Z",
//       userId: "64ce6cd94ed2281390f36b66",
//     },
//   },
// ];

export default function ContentComponent({
  currentUser,
  favoriteAccommodations = [],
  accommodation = [],
  tabName = "",
}: {
  currentUser: SafeUser | null;
  favoriteAccommodations: SafeAccommodation[];
  accommodation: SafeAccommodation[];
  tabName?: string;
}) {
  const [reservationListData, setReservationListData] = useState<
    SafeReservation[]
  >([]);

  const router = useRouter();

  const historyReservation: SafeReservation[] = [];
  const currentReservations: SafeReservation[] = [];
  const myRoom: SafeReservation[] = [];

  reservationListData?.forEach((item: SafeReservation) => {
    if (item.userId === currentUser?.id) {
      if (new Date(item.endDate).getTime() < today.getTime()) {
        historyReservation.push(item);
      } else {
        currentReservations.push(item);
      }
    }
    if (item.roomOwnId === currentUser?.id) {
      myRoom.push(item);
    }
  });

  const [page, setPage] = useState<number>(0);

  const totalPage = 0;

  const [tab, setTab] = useState(tabName ? tabName : "current");

  const onChangeTab = (data: string) => {
    setTab(data);
  };

  useEffect(() => {
    axios
      .post("/api/reversation-list", {})
      .then((res) => {
        if (res?.data?.safeReservations) {
          setReservationListData(res?.data?.safeReservations);
        } else {
          setReservationListData([]);
        }
      })
      .catch((err) => {
        // console.log("err", err);
      });
  }, []);

  useEffect(() => {
    if (!currentUser) {
      router.refresh();
    } else if (tabName === "host" && !accommodation?.length && currentUser) {
      router.push("/createroom/about");
    }
  }, [accommodation, currentUser, router, tabName]);

  useEffect(() => {
    setTab(accommodation?.length ? "host" : "current");
  }, [accommodation]);

  useEffect(() => {
    setTab(tabName);
  }, [tabName]);

  let tabContent;
  if (tab === "host") {
    tabContent = (
      <MyOwnClient
        currentUser={currentUser}
        room={accommodation}
        ReservationListData={myRoom}
      />
    );
  } else if (tab === "current") {
    tabContent = (
      <ReservationsClient
        reservations={currentReservations}
        useAction={true}
        currentUser={currentUser}
        editMode={false}
        actionPosition={"price"}
      />
    );
  } else if (tab === "history") {
    tabContent = (
      <ReservationsClient
        reservations={historyReservation}
        useAction={false}
        currentUser={currentUser}
        editMode={false}
      />
    );
  } else if (tab === "favorites") {
    tabContent = (
      <FavoritesClient
        accommodations={favoriteAccommodations}
        currentUser={currentUser}
      />
    );
  }

  return (
    <div className="w-full min-h-full">
      <div>
        <Tab.Group>
          <Tab.List
            className={
              "self-center p-1 space-x-1 rounded-xl  w-1/3 max-w-[400px] absolute top-4 left-1/3 z-50" +
              (!!accommodation.length ? " flex" : " hidden")
            }
          >
            {/* <Tab.List className="flex self-center p-1 space-x-1 rounded-xl  w-1/3 max-w-[400px] z-50"> */}
            {tabList.map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-black",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-red-100 focus:outline-none",
                    selected
                      ? "text-red-600 shadow ring-1"
                      : "text-black hover:bg-white/[0.12] hover:text-red-400"
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="flex flex-1 w-full h-full bg-custom-gray">
            <Tab.Panel key={0} className="flex flex-col w-full h-full">
              <div className="w-full h-full">
                <div className="mb-10">
                  <Heading title="Welcome" />
                </div>
                <h1 className="text-xl font-bold mb-5">Your reservations</h1>
                <NavHistory
                  onClick={onChangeTab}
                  current={tab}
                  isHost={!!accommodation.length}
                />
                <div className="my-5">{tabContent}</div>

                {/* help view */}
                <HelpClient currentUser={currentUser} />
              </div>
            </Tab.Panel>

            <Tab.Panel key={1} className="flex flex-col w-full h-full">
              <div className="flex flex-wrap w-full flex-row justify-between gap-x-5">
                {/* <div className="flex w-full gap-x-5"> */}
                {/* left content view */}
                <div
                  className={
                    "flex flex-1 w-[clamp(800px,50%,1500px)] bg-white shadow-lg p-5 flex-col rounded-lg"
                  }
                  // className={
                  //   "w-full bg-white shadow-lg p-5 flex-col rounded-lg flex"
                  // }
                >
                  {/* history view */}
                  <HistoryChart data={myRoom} />

                  <div className="my-5">
                    <HistoryTable data={myRoom} />
                  </div>
                </div>

                {/* notification */}
                <div
                  className={
                    "w-[clamp(300px,30%,500px)] flex flex-col p-3 shadow-lg rounded-xl bg-white"
                  }
                >
                  <p className="text-xl text-black">
                    Notification (comming soon)
                  </p>
                  <div className="w-full h-px mb-3 bg-slate-500" />

                  <div className="flex flex-col">
                    <>
                      {Array.from({ length: 10 }).map((_, index) => (
                        <div
                          className="flex flex-row justify-between w-full mt-3 bg-gray-200 animate-pulse"
                          key={index}
                        >
                          <div className="flex flex-row items-center justify-start">
                            <div className="w-[50px] h-[50px] rounded-full mr-4 bg-gray-300" />
                            <div className="w-1/4 h-4 bg-gray-300" />
                          </div>
                          <div className="w-3/4 h-4 bg-gray-300" />
                        </div>
                      ))}
                    </>
                  </div>

                  <div className="flex items-center justify-between mt-8">
                    <div>show all</div>

                    <div className="flex items-center justify-center">
                      <button
                        className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md"
                        onClick={() => {
                          setPage((prev) => {
                            if (prev > 0) {
                              return prev - 1;
                            }
                            return prev;
                          });
                        }}
                      >
                        <IoIosArrowBack />
                      </button>
                      <div className="flex flex-row mx-4">
                        <p>{`${page + 1} / ${totalPage}`}</p>
                      </div>
                      <button
                        className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md"
                        onClick={() => {
                          setPage((prev) => {
                            if (prev + 1 < totalPage) {
                              return prev + 1;
                            }
                            return prev;
                          });
                        }}
                      >
                        <IoIosArrowForward />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Tab.Panel>

            <Tab.Panel key={3}>
              <div className="w-screen h-screen bg-white-300 text-6xl">
                Coming soon
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
