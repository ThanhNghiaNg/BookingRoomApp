import React, { useState } from "react";
import Select from "react-select";

interface Location {
  id: number;
  name: string;
}

interface MultiSelectComboboxProps {
  locations: Location[];
  onChange: (selectedLocations: Location[]) => void;
}

const MultiSelectCombobox: React.FC<MultiSelectComboboxProps> = ({
  locations,
  onChange,
}) => {
  const [selectedLocations, setSelectedLocations] = useState<Location[]>([
    locations[0],
  ]);
  const [newLocation, setNewLocation] = useState("");

  const handleSelectChange = (selectedOptions: any) => {
    setSelectedLocations(selectedOptions);
    onChange(selectedOptions.map((option: any) => option.value));
  };

  const handleInputChange = (inputValue: string) => {
    setNewLocation(inputValue);
  };

  const handleInputBlur = () => {
    if (newLocation.trim() !== "") {
      const isNewLocation = !locations.some((location) =>
        location.name.toLowerCase().includes(newLocation.toLowerCase())
      );

      if (isNewLocation) {
        const newLocationOption: Location = {
          id: locations.length + 1,
          name: newLocation.trim(),
        };

        setSelectedLocations((prevSelectedLocations) => [
          ...prevSelectedLocations,
          newLocationOption,
        ]);
        onChange([...selectedLocations, newLocationOption]);
      }
    }

    setNewLocation("");
  };

  const customOptions = locations.map((location) => ({
    value: location,
    label: location.name,
    key: location.id,
  }));

  const customValue = selectedLocations.map((location) => ({
    value: location,
    label: location.name,
    key: location.id,
  }));

  return (
    <Select
      options={customOptions}
      value={customValue}
      isMulti
      onChange={handleSelectChange}
      onInputChange={handleInputChange}
      onBlur={handleInputBlur}
      inputValue={newLocation}
      noOptionsMessage={() => "No location found"}
    />
  );
};

export default MultiSelectCombobox;
