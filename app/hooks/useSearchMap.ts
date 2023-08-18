import axios from 'axios';

interface SearchResult {
  lat: string;
  lon: string;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

export const searchAddress = async (address: string, area: string): Promise<Coordinates | null> => {
    // console.log(address, area)
  try {
    const query = `${address}, ${area}`;
    const response = await axios.get<SearchResult[]>(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`);
    if (response.data.length > 0) {
      const result = response.data[0];
      const latitude = parseFloat(result.lat);
      const longitude = parseFloat(result.lon);
      const coordinates: Coordinates = {
        latitude,
        longitude,
      };
      return coordinates;
    } else {
      console.log('Không tìm thấy địa chỉ.');
      return null;
    }
  } catch (error) {
    console.error('Lỗi khi tìm kiếm địa chỉ:', error);
    return null;
  }
};
