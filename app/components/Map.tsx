"use client";

import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { searchAddress } from "../hooks/useSearchMap";
import { useEffect, useState } from "react";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  center?: number[];
  address?: string;
  area?: string;
  location?: string;
}

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const Map: React.FC<MapProps> = ({ address, area, location, center }) => {
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const coordinates = await searchAddress(
        address as string,
        area as string
      );
      if (coordinates) {
        const { latitude, longitude } = coordinates;
        setMapCenter([latitude, longitude]);
      } else {
        setMapCenter(null);
      }

      console.log("coordinates", coordinates);
    };

    fetchCoordinates();
  }, [address, area]);

  return mapCenter ? (
    <MapContainer
      center={mapCenter}
      zoom={mapCenter ? 10 : 2}
      scrollWheelZoom={true}
      className="h-[50vh] rounded-lg"
    >
      <TileLayer url={url} attribution={attribution} />
      {mapCenter && <Marker position={mapCenter} />}
    </MapContainer>
  ) : (
    <div className="w-full h-[500px] bg-slate-50 flex justify-center items-center shadow-md">
      <text className="text-xl text-black">Address not found on map</text>
    </div>
  );
};

export default Map;
