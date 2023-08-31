import { styled } from "@mui/material";
import { useState } from "react";

const ParentDiv = styled("div")(() => ({
  position: "relative",
  display: "inline-block",
  backgroundColor: "#9fdfeb",
  border: "1px solid #fee",
  borderRadius: "6px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  minWidth: "250px",
  minHeight: "40px",

  "&:hover .options": {
    display: "block",
    animation: "fadeIn 0.3s ease-in-out",
  },
}));

const OptionsDiv = styled("div")(() => ({
  display: "none",
  position: "absolute",
  zIndex: 10,
  top: "100%",
  left: 0,
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "0px",
  maxHeight: "300px",
  overflowY: "scroll",
  backgroundColor: "#fff",
  borderBottomLeftRadius: "4px",
  borderBottomRightRadius: "4px",
}));

const OptionItem = styled("button")(() => ({
  textAlign: "center",
  minHeight: "30px",
  marginBottom: "5px",
  backgroundColor: "#f7dede",
  border: "0.5px solid #ccc",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  borderRadius: "4px",
  alignItems: "center",
  width: "100%",
  height: "100%",
  justifyContent: "center",
  display: "flex",
  padding: "10px 10px",
  animation: "fadeIn 0.3s ease-in-out",
  zIndex: 12,
  "@keyframes fadeIn": {
    from: { opacity: 0, transform: "translateY(-10px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
  },
}));
const AgeSelection = ({
  onSelect,
  optionData,
}: {
  optionData: { label: string; value: string | number }[];
  onSelect: (value: string | number) => void;
}) => {
  const [currentData, setCurrentData] = useState<string>("");
  return (
    <ParentDiv>
      <input
        name="age"
        value={"Your Age: " + currentData}
        className="w-full h-full mb-4 text-xl font-semibold text-center text-white translate-y-2 bg-transparent"
        readOnly
      />
      <OptionsDiv className="options">
        {optionData.map((item, index) => (
          <OptionItem
            key={index}
            onClick={() => {
              onSelect(item.value);
              setCurrentData(item.label.toString());
            }}
          >
            {item.label}
          </OptionItem>
        ))}
      </OptionsDiv>
    </ParentDiv>
  );
};

export default AgeSelection;
