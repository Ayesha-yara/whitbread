"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm, FormProvider, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import {
  groupBookingSchema,
  GroupBookingFormData,
} from "@/lib/validation/groupBookingSchema";
import Accordion from "@/components/common/Accordion";
import ContactDetailsSection from "./sections/ContactDetailsSection";
import BookingDetailsSection from "./sections/BookingDetailsSection";
import RoomRequirementsSection from "./sections/RoomRequirementsSection";

function getReadableFieldLabel(fieldPath: string[]): string {
  const fieldLabels: Record<string, string> = {
    firstName: "First name",
    lastName: "Last name",
    email: "Email address",
    phoneNumber: "Phone number",
    title: "Title",

    preferredHotel: "Preferred hotel",
    checkIn: "Check-in date",
    checkOut: "Check-out date",
    bookerType: "Booker type",
    purposeOfStay: "Purpose of stay",
    dates: "Dates",

    rooms: "Room selection",
    isAccessibleRoom: "Accessible room",
    isTravellingWithChild: "Travelling with children",
  };

  const lastPart = fieldPath[fieldPath.length - 1];
  return fieldLabels[lastPart] || lastPart;
}

export default function GroupBookingForm() {
  const t = useTranslations("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const successMessageRef = useRef<HTMLDivElement>(null);

  const methods = useForm<GroupBookingFormData>({
    resolver: zodResolver(groupBookingSchema),
    mode: "onBlur",
    defaultValues: {
      contactDetails: {
        title: "Mr",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
      },
      bookingDetails: {
        bookerType: "personal",
        purposeOfStay: "leisure",
        isSchoolOrYouth: false,
        reasonForVisit: "charity-event",
        preferredHotel: "",
        dates: {
          checkIn: "",
          checkOut: "",
        },
        packageType: "breakfast",
      },
      roomRequirements: {
        isTravellingWithChild: false,
        isAccessibleRoom: false,
        rooms: {
          singleOccupancy: 0,
          doubleOccupancy: 0,
          twinRooms: 0,
          familyOf21A1C: 0,
          familyOf32A1C: 0,
          familyOf31A2C: 0,
          familyOf42A2C: 0,
          accessibleSingle: 0,
          accessibleDouble: 0,
          accessibleTwin: 0,
        },
      },
      additionalInformation: {
        comments: "",
      },
    },
  });

  const {
    handleSubmit,
    setFocus,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstErrorField = Object.keys(errors)[0];
      setFocus(firstErrorField as Path<GroupBookingFormData>);
    }
  }, [errors, setFocus]);

  useEffect(() => {
    const root = window.document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      root.classList.add('dark');
    } else {
      setIsDarkMode(false);
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const onSubmit = async (data: GroupBookingFormData) => {
    console.log("onSubmit called with data:", data);

    setIsSubmitting(true);
    setSubmissionError(null);
    setSubmissionSuccess(false);
    setReferenceNumber(null);
    setSubmittedAt(null);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("API response received:", response.status);

      const result = await response.json();

      if (response.ok) {
        if (result.success) {
          setSubmissionSuccess(true);
          setReferenceNumber(result.referenceNumber);
          setSubmittedAt(result.submittedAt);
          methods.reset();

          setTimeout(() => {
            if (successMessageRef.current) {
              const elementRect =
                successMessageRef.current.getBoundingClientRect();
              const absoluteElementTop =
                elementRect.top + window.pageYOffset;

              const middle =
                absoluteElementTop -
                window.innerHeight / 2 +
                elementRect.height / 2;

              window.scrollTo({
                top: middle,
                behavior: "smooth",
              });
            }
          }, 100);
        } else {
          setSubmissionError(result.message || "Failed to submit enquiry");
        }
      } else {
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, messages]) => {
            if (Array.isArray(messages) && messages.length > 0) {
              methods.setError(field as Path<GroupBookingFormData>, {
                type: "server",
                message: messages[0],
              });
            }
          });
        }
        throw new Error(result.message || "Failed to submit enquiry");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionError(
        error instanceof Error ? error.message : "Failed to submit enquiry"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-gray-900 dark:text-gray-100" style={{ color: 'var(--text-primary)' }}>
      <FormProvider {...methods}>
        {submissionSuccess && (
          <div
            ref={successMessageRef}
            className="mb-6 p-4 bg-green-100 dark:bg-green-800 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 rounded"
          >
            <p className="font-bold">Thank you for your enquiry!</p>
            <p>Your enquiry has been submitted successfully.</p>
            {referenceNumber && (
              <p className="mt-2">
                Your reference number is:{" "}
                <span className="font-bold">{referenceNumber}</span>
              </p>
            )}
            {submittedAt && (
              <p className="mt-1 text-sm">
                Submitted on: {new Date(submittedAt).toLocaleString()}
              </p>
            )}
          </div>
        )}

        {submissionError && (
          <div
            id="submission-error"
            role="alert"
            className="bg-red-50 dark:bg-red-800 border border-red-200 dark:border-red-600 text-red-800 dark:text-red-300 rounded-lg p-4 mb-6"
          >
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="font-medium">{submissionError}</p>
            </div>
          </div>
        )}

        {validationErrors.length > 0 && (
          <div
            id="validation-errors"
            role="alert"
            className="rounded-lg p-5 mb-6 shadow-md"
            style={{ 
              backgroundColor: 'var(--error-bg)', 
              borderLeft: '4px solid var(--error-color)',
              color: 'var(--error-text)'
            }}
          >
            <div className="flex">
              <svg
                className="w-6 h-6 mr-3 flex-shrink-0"
                fill="var(--error-color)"
                viewBox="0 0 20 20"
                style={{ color: 'var(--error-color)' }}
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-semibold text-lg mb-3" style={{ color: 'var(--error-color)' }}>
                  Please fix the following errors:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  {validationErrors.map((error, index) => (
                    <li key={index} className="text-sm">{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Form values:", methods.getValues());
            handleSubmit(
              (data) => {
                setValidationErrors([]);
                onSubmit(data);
              },
              (errors) => {
                console.error("Form validation failed:", errors);
                const errorMessages: string[] = [];
                Object.entries(errors).forEach(([field, error]) => {
                  if (error?.message) {
                    const fieldPath = field.split(".");
                    const fieldName = getReadableFieldLabel(fieldPath);
                    errorMessages.push(`${fieldName}: ${error.message}`);
                  }
                });
                setValidationErrors(errorMessages);
                setTimeout(() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }, 100);
              }
            )(e);
          }}
          className="space-y-6"
          noValidate
          aria-describedby={submissionError ? "submission-error" : undefined}
        >
          <Accordion
            items={[
              {
                title: t("contactDetails.title"),
                children: (
                  <div>
                    <ContactDetailsSection />
                    <div className="mt-6 flex justify-between">
                      {activeSection > 0 && (
                        <button
                          type="button"
                          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                          onClick={() => setActiveSection(activeSection - 1)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                          </svg>
                          Back
                        </button>
                      )}
                      {activeSection < 2 ? (
                        <button
                          type="button"
                          className="primary flex items-center px-4 py-2 text-sm font-medium text-white rounded focus:outline-none focus:ring-2"
                          style={{ backgroundColor: 'var(--primary)' }}
                          onClick={() => setActiveSection(activeSection + 1)}
                        >
                          Continue
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 ml-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </button>
                      ) : (
                        <button
                          type="button"
                          id="submit-button"
                          data-cy="submit-button"
                          className={`flex justify-end px-4 py-2 text-sm font-medium text-white rounded ${
                            isSubmitting
                              ? "bg-blue-400 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                          }`}
                          disabled={isSubmitting}
                          aria-disabled={isSubmitting}
                          onClick={() => {
                            const allRequiredFields = [
                              "contactDetails.firstName",
                              "contactDetails.lastName",
                              "contactDetails.email",
                              "contactDetails.phoneNumber",
                              "bookingDetails.preferredHotel",
                              "bookingDetails.dates.checkIn",
                              "bookingDetails.dates.checkOut",
                            ];

                            let hasErrors = false;
                            const errorMessages: string[] = [];

                            allRequiredFields.forEach((field) => {
                              if (!methods.getValues(field as Path<GroupBookingFormData>)) {
                                const fieldPath = field.split(".");
                                const fieldName = getReadableFieldLabel(
                                  fieldPath
                                );

                                methods.setError(field as Path<GroupBookingFormData>, {
                                  type: "required",
                                  message: "This field is required",
                                });
                                errorMessages.push(
                                  `${fieldName}: This field is required`
                                );
                                hasErrors = true;
                              }
                            });

                            const rooms =
                              methods.getValues("roomRequirements.rooms");
                            const totalRooms = Object.values(
                              rooms || {}
                            ).reduce(
                              (sum, count) =>
                                sum + (typeof count === "number" ? count : 0),
                              0
                            );
                            if (totalRooms <= 0) {
                              methods.setError("roomRequirements.rooms", {
                                type: "required",
                                message: "At least one room must be selected",
                              });
                              errorMessages.push(
                                "Room selection: At least one room must be selected"
                              );
                              hasErrors = true;
                            }

                            if (hasErrors) {
                              setValidationErrors(errorMessages);

                              setTimeout(() => {
                                window.scrollTo({
                                  top: 0,
                                  behavior: "smooth",
                                });
                              }, 100);
                            } else {
                              setValidationErrors([]);
                              handleSubmit(onSubmit)();
                            }
                          }}
                        >
                          {isSubmitting ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              {t("submitting")}
                            </>
                          ) : (
                            t("submit")
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ),
              },
              {
                title: t("bookingDetails.title"),
                children: (
                  <div>
                    <BookingDetailsSection />
                    <div className="mt-6 flex justify-between">
                      {activeSection > 0 && (
                        <button
                          type="button"
                          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                          onClick={() => setActiveSection(activeSection - 1)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                          </svg>
                          Back
                        </button>
                      )}
                      {activeSection < 2 ? (
                        <button
                          type="button"
                          className="primary flex items-center px-4 py-2 text-sm font-medium text-white rounded focus:outline-none focus:ring-2"
                          style={{ backgroundColor: 'var(--primary)' }}
                          onClick={() => setActiveSection(activeSection + 1)}
                        >
                          Continue
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 ml-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </button>
                      ) : (
                        <button
                          type="button"
                          id="submit-button"
                          data-cy="submit-button"
                          className={`flex items-center px-4 py-2 text-sm font-medium text-white rounded ${
                            isSubmitting
                              ? "bg-blue-400 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                          }`}
                          disabled={isSubmitting}
                          aria-disabled={isSubmitting}
                          onClick={() => {
                            const allRequiredFields = [
                              "contactDetails.firstName",
                              "contactDetails.lastName",
                              "contactDetails.email",
                              "contactDetails.phoneNumber",
                              "bookingDetails.preferredHotel",
                              "bookingDetails.dates.checkIn",
                              "bookingDetails.dates.checkOut",
                            ];

                            let hasErrors = false;
                            const errorMessages: string[] = [];

                            allRequiredFields.forEach((field) => {
                              if (!methods.getValues(field as Path<GroupBookingFormData>)) {
                                const fieldPath = field.split(".");
                                const fieldName = getReadableFieldLabel(
                                  fieldPath
                                );

                                methods.setError(field as Path<GroupBookingFormData>, {
                                  type: "required",
                                  message: "This field is required",
                                });
                                errorMessages.push(
                                  `${fieldName}: This field is required`
                                );
                                hasErrors = true;
                              }
                            });

                            const rooms =
                              methods.getValues("roomRequirements.rooms");
                            const totalRooms = Object.values(
                              rooms || {}
                            ).reduce(
                              (sum, count) =>
                                sum + (typeof count === "number" ? count : 0),
                              0
                            );
                            if (totalRooms <= 0) {
                              methods.setError("roomRequirements.rooms", {
                                type: "required",
                                message: "At least one room must be selected",
                              });
                              errorMessages.push(
                                "Room selection: At least one room must be selected"
                              );
                              hasErrors = true;
                            }

                            if (hasErrors) {
                              setValidationErrors(errorMessages);

                              setTimeout(() => {
                                window.scrollTo({
                                  top: 0,
                                  behavior: "smooth",
                                });
                              }, 100);
                            } else {
                              setValidationErrors([]);
                              handleSubmit(onSubmit)();
                            }
                          }}
                        >
                          {isSubmitting ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              {t("submitting")}
                            </>
                          ) : (
                            t("submit")
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ),
              },
              {
                title: t("roomRequirements.title"),
                children: (
                  <div>
                    <RoomRequirementsSection />
                    <div className="mt-6 flex justify-between">
                      {activeSection > 0 && (
                        <button
                          type="button"
                          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                          onClick={() => setActiveSection(activeSection - 1)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                          </svg>
                          Back
                        </button>
                      )}
                      {activeSection < 2 ? (
                        <button
                          type="button"
                          className="primary flex items-center px-4 py-2 text-sm font-medium text-white rounded focus:outline-none focus:ring-2"
                          style={{ backgroundColor: 'var(--primary)' }}
                          onClick={() => setActiveSection(activeSection + 1)}
                        >
                          Continue
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 ml-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </button>
                      ) : (
                        <button
                          type="button"
                          id="submit-button"
                          data-cy="submit-button"
                          className={`flex items-center px-4 py-2 text-sm font-medium text-white rounded ${
                            isSubmitting
                              ? "bg-blue-400 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                          }`}
                          disabled={isSubmitting}
                          aria-disabled={isSubmitting}
                          onClick={() => {
                            const allRequiredFields = [
                              "contactDetails.firstName",
                              "contactDetails.lastName",
                              "contactDetails.email",
                              "contactDetails.phoneNumber",
                              "bookingDetails.preferredHotel",
                              "bookingDetails.dates.checkIn",
                              "bookingDetails.dates.checkOut",
                            ];

                            let hasErrors = false;
                            const errorMessages: string[] = [];

                            allRequiredFields.forEach((field) => {
                              if (!methods.getValues(field as Path<GroupBookingFormData>)) {
                                const fieldPath = field.split(".");
                                const fieldName = getReadableFieldLabel(
                                  fieldPath
                                );

                                methods.setError(field as Path<GroupBookingFormData>, {
                                  type: "required",
                                  message: "This field is required",
                                });
                                errorMessages.push(
                                  `${fieldName}: This field is required`
                                );
                                hasErrors = true;
                              }
                            });

                            const rooms =
                              methods.getValues("roomRequirements.rooms");
                            const totalRooms = Object.values(
                              rooms || {}
                            ).reduce(
                              (sum, count) =>
                                sum + (typeof count === "number" ? count : 0),
                              0
                            );
                            if (totalRooms <= 0) {
                              methods.setError("roomRequirements.rooms", {
                                type: "required",
                                message: "At least one room must be selected",
                              });
                              errorMessages.push(
                                "Room selection: At least one room must be selected"
                              );
                              hasErrors = true;
                            }

                            if (hasErrors) {
                              setValidationErrors(errorMessages);

                              setTimeout(() => {
                                window.scrollTo({
                                  top: 0,
                                  behavior: "smooth",
                                });
                              }, 100);
                            } else {
                              setValidationErrors([]);
                              handleSubmit(onSubmit)();
                            }
                          }}
                        >
                          {isSubmitting ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              {t("submitting")}
                            </>
                          ) : (
                            t("submit")
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ),
              },
            ]}
            openIndex={activeSection}
            onOpenIndexChange={setActiveSection}
          />
        </form>
      </FormProvider>
    </div>
  );
}
