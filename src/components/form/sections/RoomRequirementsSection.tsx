"use client";

import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { GroupBookingFormData } from "@/lib/validation/groupBookingSchema";
import CheckboxField from "@/components/common/CheckboxField";
import NumberInputField from "@/components/common/NumberInputField";
import QuantitySelector from "@/components/common/QuantitySelector";
import TextArea from '@/components/common/TextArea';

type RoomOption = {
  id: keyof GroupBookingFormData["roomRequirements"]["rooms"];
  label: string;
  description: string;
};

const roomOptions: RoomOption[] = [
  { id: "singleOccupancy", label: "Single Occupancy", description: "1 adult" },
  { id: "doubleOccupancy", label: "Double Occupancy", description: "2 adults" },
  { id: "twinRooms", label: "Twin", description: "2 adults" },
];

export default function RoomRequirementsSection() {
  const t = useTranslations("form");
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<GroupBookingFormData>();

  const rooms = watch("roomRequirements.rooms") || {};
  
  const totalRooms = Object.values(rooms).reduce(
    (sum, count) => sum + count,
    0
  );

  const handleIncrement = (
    roomType: keyof GroupBookingFormData["roomRequirements"]["rooms"]
  ) => {
    setValue(`roomRequirements.rooms.${roomType}`, (rooms[roomType] || 0) + 1);
  };

  const handleDecrement = (
    roomType: keyof GroupBookingFormData["roomRequirements"]["rooms"]
  ) => {
    if (rooms[roomType] > 0) {
      setValue(`roomRequirements.rooms.${roomType}`, rooms[roomType] - 1);
    }
  };

  return (
    <div className='space-y-6'>
      <div>
        <p className='text-base font-medium text-gray-700 mb-3'>Rooms</p>
        <p className='text-sm text-gray-600 mb-4'>
          Select the maximum number of rooms required by room type and
          occupancy.
        </p>
        <a
          href='#'
          className='text-purple-700 text-sm hover:underline mb-4 inline-block'>
          See room types
        </a>
      </div>

      <div className='space-y-2'>
        <CheckboxField
          name='withChildren'
          label='Travelling/staying with children (2-15 years).'
        />
        <CheckboxField name='accessibleRoom' label='Accessible room is needed.' />
      </div>

      <div className='space-y-4 border-b border-gray-200 pb-6'>
        <QuantitySelector
          label="Single Occupancy"
          id="singleRooms"
          sublabel="1 adult"
          value={rooms.singleOccupancy || 0}
          onChange={(value) => setValue('roomRequirements.rooms.singleOccupancy', value)}
        />
        <QuantitySelector
          label="Double Occupancy"
          id="doubleRooms"
          sublabel="2 adults"
          value={rooms.doubleOccupancy || 0}
          onChange={(value) => setValue('roomRequirements.rooms.doubleOccupancy', value)}
        />
        <QuantitySelector
          label="Twin"
          id="twinRooms"
          sublabel="2 adults"
          value={rooms.twinRooms || 0}
          onChange={(value) => setValue('roomRequirements.rooms.twinRooms', value)}
        />

        <div className='flex justify-between items-center py-2'>
          <span className='font-medium text-gray-800'>Total:</span>
          <span className='font-medium text-gray-800'>{totalRooms} rooms</span>
        </div>
      </div>

      <div>
        <h4 className='text-base font-medium text-gray-700 mb-2'>
          Additional information (optional)
        </h4>
        <p className='text-sm text-gray-600 mb-4'>
          Let us know if you have any additional information or special requests
        </p>
        <p className='text-sm text-gray-600 mb-4'>
          If you do not require the same number of rooms on each night of your
          stay, please state below the number and type of rooms required each
          night.
        </p>
        <TextArea
          name="additionalInfo"
          rows={5}
          placeholder="Enter additional information or special requests here"
        />
      </div>
    </div>
  );
}
