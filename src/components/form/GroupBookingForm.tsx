"use client";

import { useState, useEffect, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import {
  groupBookingSchema,
  GroupBookingFormData,
} from "@/lib/validation/groupBookingSchema";
import Accordion from "@/components/common/Accodion";
import ContactDetailsSection from "./sections/ContactDetailsSection";
import BookingDetailsSection from "./sections/BookingDetailsSection";
import RoomRequirementsSection from "./sections/RoomRequirementsSection";


function getReadableFieldLabel(fieldPath: string[]): string {
  const fieldLabels: Record<string, string> = {
    'firstName': 'First name',
    'lastName': 'Last name',
    'email': 'Email address',
    'phoneNumber': 'Phone number',
    'title': 'Title',
    
    'preferredHotel': 'Preferred hotel',
    'checkIn': 'Check-in date',
    'checkOut': 'Check-out date',
    'bookerType': 'Booker type',
    'purposeOfStay': 'Purpose of stay',
    'dates': 'Dates',
    
    'rooms': 'Room selection',
    'isAccessibleRoom': 'Accessible room',
    'isTravellingWithChild': 'Travelling with children'
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
          accessibleTwin: 0
        },
      },
      additionalInformation: {  
        comments: ""
      }
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
      setFocus(firstErrorField as any);
    }
  }, [errors, setFocus]);

  const onSubmit = async (data: GroupBookingFormData) => {
    console.log('onSubmit called with data:', data);
    
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
      console.log('API response received:', response.status);

      const result = await response.json();

      if (response.ok) {
        if (result.success) {
          setSubmissionSuccess(true);
          setReferenceNumber(result.referenceNumber);
          setSubmittedAt(result.submittedAt);
          methods.reset();
          
          setTimeout(() => {
            if (successMessageRef.current) {
              const elementRect = successMessageRef.current.getBoundingClientRect();
              const absoluteElementTop = elementRect.top + window.pageYOffset;
              
              const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);
              
              window.scrollTo({
                top: middle,
                behavior: 'smooth'
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
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              methods.setError(field as any, {
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
      setSubmissionError(error instanceof Error ? error.message : "Failed to submit enquiry");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      {submissionSuccess && (
        <div 
          ref={successMessageRef}
          className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded"
        >
          <p className="font-bold">Thank you for your enquiry!</p>
          <p>Your enquiry has been submitted successfully.</p>
          {referenceNumber && (
            <p className="mt-2">
              Your reference number is: <span className="font-bold">{referenceNumber}</span>
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
          className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6"
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
          className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-4 mb-6"
        >
          <div className="flex">
            <svg
              className="w-5 h-5 mr-2 mt-1 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="font-medium mb-2">Please fix the following errors:</p>
              <ul className="list-disc pl-5 space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log('Form values:', methods.getValues());
          handleSubmit(
            (data) => {
              setValidationErrors([]);
              onSubmit(data);
            },
            (errors) => {
              console.error('Form validation failed:', errors);
              const errorMessages: string[] = [];
              Object.entries(errors).forEach(([field, error]) => {
                if (error?.message) {
                  const fieldPath = field.split('.');
                  const fieldName = getReadableFieldLabel(fieldPath);
                  errorMessages.push(`${fieldName}: ${error.message}`);
                }
              });
              setValidationErrors(errorMessages);
              setTimeout(() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
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
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={() => {
                        setValidationErrors([]);
                        setActiveSection(1);
                      }}
                    >
                      Continue to Booking Details
                    </button>
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
                    <button
                      type="button"
                      className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      onClick={() => setActiveSection(0)}
                    >
                      Back to Contact Details
                    </button>
                    <button
                      type="button"
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={() => {
                        setValidationErrors([]);
                        setActiveSection(2);
                      }}
                    >
                      Continue to Room Requirements
                    </button>
                  </div>
                </div>
              ),
            },
            {
              title: t("roomRequirements.title"),
              children: (
                <div>
                  <RoomRequirementsSection />
                  <div className="mt-6 flex justify-start">
                    <button
                      type="button"
                      className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      onClick={() => setActiveSection(1)}
                    >
                      Back to Booking Details
                    </button>
                  </div>
                </div>
              ),
            },
          ]}
          openIndex={activeSection}
          onOpenIndexChange={setActiveSection}
        />



        <div className="mt-6 text-right">
          <button
            type="button"
            id="submit-button"
            data-cy="submit-button"
            className={`px-6 py-3 text-white font-semibold rounded-lg flex items-center justify-center min-w-[150px] ${isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
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
                "bookingDetails.dates.checkOut"
              ];
              
              let hasErrors = false;
              const errorMessages: string[] = [];
              
              allRequiredFields.forEach(field => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (!methods.getValues(field as any)) {
                  const fieldPath = field.split('.');
                  const fieldName = getReadableFieldLabel(fieldPath);
  
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  methods.setError(field as any, { type: "required", message: "This field is required" });
                  errorMessages.push(`${fieldName}: This field is required`);
                  hasErrors = true;
                }
              });
              
              const rooms = methods.getValues("roomRequirements.rooms");
              const totalRooms = Object.values(rooms || {}).reduce((sum, count) => sum + (typeof count === 'number' ? count : 0), 0);
              if (totalRooms <= 0) {
                methods.setError("roomRequirements.rooms", { 
                  type: "required", 
                  message: "At least one room must be selected" 
                });
                errorMessages.push("Room selection: At least one room must be selected");
                hasErrors = true;
              }
              
              if (hasErrors) {
                setValidationErrors(errorMessages);

                setTimeout(() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
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
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t("submitting")}
              </>
            ) : (
              t("submit")
            )}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
