import { styled } from '@mui/material'
import { useState } from 'react'
import { AiOutlineCloud } from 'react-icons/ai'
import { BsSnow2, BsWater } from 'react-icons/bs'
import { FaMountain, FaSwimmingPool, FaUmbrellaBeach } from 'react-icons/fa'
import {
  GiCampingTent,
  GiForest,
  GiModernCity,
  GiNightSky,
  GiPaperWindmill,
  GiRiver,
} from 'react-icons/gi'
import { TbSwimming } from 'react-icons/tb'

const CheckBoxWrapper = styled('div')<{ index?: number; isChecked: boolean }>(
  ({ index, isChecked }) => ({
    width: '150px',
    height: '150px',
    marginLeft: index === 0 ? '1px' : undefined,
    position: 'relative',
    background: 'white',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '0.5rem',
    border: '2px solid #b5bfd9',
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
    transition: '0.15s ease',
    cursor: 'pointer',

    '&:hover input[type="checkbox"]': {
      opacity: 1,
      backgroundColor: '#faa298',
    },

    '&:not(:hover) input[type="checkbox"]': {
      opacity: isChecked ? 1 : 0,
    },
    '& input[type=checkbox]:checked': {
      backgroundColor: 'red',
    },

    '& input[type="checkbox"]:checked + label': {
      opacity: '1 !important',
    },
  }),
)

const CheckBox = styled('input')(() => ({
  position: 'absolute',
  top: '10px',
  left: '10px',
  zIndex: 10,
  width: '1.3em',
  height: '1.3em',
  borderRadius: '50%',
  border: '1.5px solid #ddd',
  appearance: 'none',
  '-webkit-appearance': 'none',
}))

const CheckBoxLabel = styled('label')(() => ({
  position: 'absolute',
  top: '10px',
  left: '10px',
  zIndex: 100,
  width: '1.3em',
  height: '1.3em',
  borderRadius: '50%',
  opacity: 0,
  color: '#fff',
  fontSize: '16px',
  textAlign: 'center',
}))

enum HOBBY_LIST {
  SEA = 0,
  WATER = 1,
  WIND = 2,
  MOUNTAIN = 3,
  FRESH_AIR = 4,
  SKY = 5,
  NATURE = 6,
  FOREST = 7,
  SWIMMING = 8,
  OUTDOOR = 9,
  FACILITY = 10,
  CROWED = 11,
  CLOUD = 12,
  QUIET = 13,
  PEACEFUL = 14,
  BEACH = 15,
  SNOW = 16,
}

const detailHobby = {
  [HOBBY_LIST.SEA]: 'love sea',
  [HOBBY_LIST.WATER]: 'love water and water activity',
  [HOBBY_LIST.CLOUD]: 'love cloud',
  [HOBBY_LIST.CROWED]: 'love somewhere crowed',
  [HOBBY_LIST.FACILITY]:
    'love the modern facility of the house or room or hotel',
  [HOBBY_LIST.FOREST]: 'love tree and the forest',
  [HOBBY_LIST.FRESH_AIR]: 'love the fresh air',
  [HOBBY_LIST.MOUNTAIN]: 'love mountain, the height',
  [HOBBY_LIST.NATURE]: 'love nature',
  [HOBBY_LIST.OUTDOOR]: 'love outdoor activity, outdoor environment',
  [HOBBY_LIST.PEACEFUL]: 'love somewhere peaceful',
  [HOBBY_LIST.QUIET]: 'love somewhere is have a little people',
  [HOBBY_LIST.SKY]: 'love the sky',
  [HOBBY_LIST.SWIMMING]: 'love swimming',
  [HOBBY_LIST.WIND]: 'love somewhere have a cool wind',
  [HOBBY_LIST.BEACH]: 'love beach, walking',
  [HOBBY_LIST.SNOW]: 'love somewhere has cold weather',
}

export const HOBBY_OPTION_DATA = [
  {
    title: 'Sea',
    icon: <BsWater size={40} />,
    isChecked: false,
    detail: [detailHobby[HOBBY_LIST.SEA], detailHobby[HOBBY_LIST.WATER]],
  },
  {
    title: 'Beach',
    icon: <FaUmbrellaBeach size={40} />,
    isChecked: false,
    detail: [detailHobby[HOBBY_LIST.BEACH], detailHobby[HOBBY_LIST.WIND]],
  },
  {
    title: 'Mountain',
    icon: <FaMountain size={40} />,
    isChecked: false,
    detail: [
      detailHobby[HOBBY_LIST.MOUNTAIN],
      detailHobby[HOBBY_LIST.FRESH_AIR],
      detailHobby[HOBBY_LIST.SKY],
      detailHobby[HOBBY_LIST.WIND],
    ],
  },
  {
    title: 'Forest',
    icon: <GiForest size={40} />,
    isChecked: false,
    detail: [
      detailHobby[HOBBY_LIST.FOREST],
      detailHobby[HOBBY_LIST.FRESH_AIR],
      detailHobby[HOBBY_LIST.WIND],
    ],
  },

  {
    title: 'Swimming',
    icon: <TbSwimming size={40} />,
    isChecked: false,
    detail: [
      detailHobby[HOBBY_LIST.SWIMMING],
      detailHobby[HOBBY_LIST.NATURE],
      detailHobby[HOBBY_LIST.WATER],
    ],
  },
  {
    title: 'Camping',
    icon: <GiCampingTent size={40} />,
    isChecked: false,
    detail: [detailHobby[HOBBY_LIST.NATURE]],
  },
  {
    title: 'River',
    icon: <GiRiver size={40} />,
    isChecked: false,
    detail: [detailHobby[HOBBY_LIST.WATER]],
  },

  {
    title: 'Pool',
    icon: <FaSwimmingPool size={40} />,
    isChecked: false,
    detail: [
      detailHobby[HOBBY_LIST.SWIMMING],
      detailHobby[HOBBY_LIST.FACILITY],
    ],
  },
  {
    title: 'Snow',
    icon: <BsSnow2 size={40} />,
    isChecked: false,
    detail: [detailHobby[HOBBY_LIST.SNOW]],
  },

  {
    title: 'Night Sky',
    icon: <GiNightSky size={40} />,
    isChecked: false,
    detail: [
      detailHobby[HOBBY_LIST.SKY],
      detailHobby[HOBBY_LIST.QUIET],
      detailHobby[HOBBY_LIST.PEACEFUL],
    ],
  },
  {
    title: 'Cloud',
    icon: <AiOutlineCloud size={40} />,
    isChecked: false,
    detail: [
      detailHobby[HOBBY_LIST.SKY],
      detailHobby[HOBBY_LIST.WIND],
      detailHobby[HOBBY_LIST.QUIET],
      detailHobby[HOBBY_LIST.PEACEFUL],
    ],
  },
  {
    title: 'Windy',
    icon: <GiPaperWindmill size={40} />,
    isChecked: false,
    detail: [
      detailHobby[HOBBY_LIST.SKY],
      detailHobby[HOBBY_LIST.WIND],
      detailHobby[HOBBY_LIST.QUIET],
      detailHobby[HOBBY_LIST.PEACEFUL],
      detailHobby[HOBBY_LIST.NATURE],
    ],
  },
  {
    title: 'Other Facility',
    icon: <GiModernCity size={40} />,
    isChecked: false,
    detail: [detailHobby[HOBBY_LIST.FACILITY]],
  },
]

const HobbyCheckbox = ({
  label,
  isChecked,
  onChange,
  icon,
  index,
}: {
  label: string
  isChecked: boolean
  icon: React.ReactNode
  index: number
  onChange: () => void
}) => {
  const Icon = icon

  return (
    <CheckBoxWrapper index={index} isChecked={isChecked}>
      <div
        onClick={onChange}
        className="absolute top-0 left-0 w-full h-full z-500"
      ></div>
      <CheckBox type="checkbox" onChange={onChange} checked={isChecked} />
      <CheckBoxLabel>✔</CheckBoxLabel>
      <div className="flex flex-col items-center justify-center flex-1">
        {icon}
        <p style={{ fontSize: '18px', fontWeight: '500', marginTop: '10px' }}>
          {label}
        </p>
      </div>
    </CheckBoxWrapper>
  )
}

export default HobbyCheckbox
