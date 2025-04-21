"use client";

import { useFormContext } from "react-hook-form";
import { GroupBookingFormData } from "@/types/form";
import CheckboxField from "@/components/common/CheckboxField";
import QuantitySelector from "@/components/common/QuantitySelector";
import TextArea from "@/components/common/TextArea";
import { useTranslations } from "next-intl";

export default function RoomRequirementsSection() {
  const { watch, setValue } = useFormContext<GroupBookingFormData>();
  const t = useTranslations("form.roomRequirements");

  const rooms = watch("roomRequirements.rooms") || {};

  const totalRooms = Object.values(rooms).reduce((sum, count) => sum + count, 0);

  return (
    <div className="space-y-6" role="region" aria-labelledby="room-requirements-title">
      <div>
        <p
          id="room-requirements-title"
          className="text-base font-medium text-gray-700 mb-3"
        >
          {t("title")}
        </p>
        <p className="text-sm text-gray-600 mb-4">{t("description")}</p>
        <a
          href="#"
          className="text-purple-700 text-sm hover:underline mb-4 inline-block"
          aria-label={t("seeRoomTypes")}
        >
          {t("seeRoomTypes")}
        </a>
      </div>

      <div className="space-y-2">
        <CheckboxField
          name="roomRequirements.isTravellingWithChild"
          label={t("travellingWithChildren")}
          aria-describedby="travelling-with-children-description"
        />
        <CheckboxField
          name="roomRequirements.isAccessibleRoom"
          label={t("accessibleRoom")}
          aria-describedby="accessible-room-description"
        />
      </div>

      <div
        className="space-y-4 border-b border-gray-200 pb-6"
        role="group"
        aria-labelledby="room-types-title"
      >
        <h3 id="room-types-title" className="text-base font-medium text-gray-700">
          {t("roomTypes.title")}
        </h3>
        <QuantitySelector
          label={t("roomTypes.singleOccupancy.label")}
          id="singleRooms"
          sublabel={t("roomTypes.singleOccupancy.description")}
          value={rooms.singleOccupancy || 0}
          onChange={(value) =>
            setValue("roomRequirements.rooms.singleOccupancy", value)
          }
          aria-labelledby="singleRooms-label"
        />
        <QuantitySelector
          label={t("roomTypes.doubleOccupancy.label")}
          id="doubleRooms"
          sublabel={t("roomTypes.doubleOccupancy.description")}
          value={rooms.doubleOccupancy || 0}
          onChange={(value) =>
            setValue("roomRequirements.rooms.doubleOccupancy", value)
          }
          aria-labelledby="doubleRooms-label"
        />
        <QuantitySelector
          label={t("roomTypes.twin.label")}
          id="twinRooms"
          sublabel={t("roomTypes.twin.description")}
          value={rooms.twinRooms || 0}
          onChange={(value) =>
            setValue("roomRequirements.rooms.twinRooms", value)
          }
          aria-labelledby="twinRooms-label"
        />

        <div className="flex justify-end py-2">
          <span
            className="font-medium text-gray-800"
            aria-live="polite"
            aria-atomic="true"
          >
            {t("totalRooms", { count: totalRooms })}
          </span>
        </div>
      </div>

      <div>
        <h4
          id="additional-information-title"
          className="text-base font-medium text-gray-700 mb-2"
        >
          {t("additionalInformation.label")}
        </h4>
        <p className="text-sm text-gray-600 mb-4">
          {t("additionalInformation.placeholder")}
        </p>
        <p className="text-sm text-gray-600 mb-4">{t("additionalInformation.note")}</p>
        <TextArea
          name="additionalInformation.comments"
          rows={5}
          placeholder={t("additionalInformation.placeholder")}
          aria-labelledby="additional-information-title"
        />
      </div>
    </div>
  );
}
