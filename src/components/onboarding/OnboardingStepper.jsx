import { useState } from "react";

export default function OnboardingStepper({steps=[], currentStep=0}) {
  return (
    <div
      style={{
        background:
          " linear-gradient(234.85deg, #27A8E2 -20.45%, #00034A 124.53%)",
      }}
      className="col-span-3 flex justify-center px-10 items-center h-screen rounded-[28px] border"
    >
      <div className="w-full max-w-sm">
        {steps?.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === steps?.length - 1;

          return (
            <div key={index} className="relative">
              <div className="flex items-center mb-8">
                <div
                  className={`
                  w-12 h-12 rounded-xl flex items-center justify-center mr-4 transition-all duration-300
                  ${
                    step.completed || step.active
                      ? "bg-white shadow-lg"
                      : "bg-white/20 backdrop-blur-sm border border-white/30"
                  }
                `}
                >
                  <Icon
                    size={20}
                    className={`
                      ${
                        step.completed || step.active
                          ? "text-blue-600"
                          : "text-white/70"
                      }
                    `}
                  />
                </div>

                <div
                  className={`
                  text-lg font-medium transition-all duration-300
                  ${
                    step.completed || step.active
                      ? "text-white"
                      : "text-white/60"
                  }
                `}
                >
                  {step.title}
                </div>
              </div>
              {!isLast && (
                <div
                  className={`
                  absolute left-6 top-12 w-px h-16 transition-all duration-500
                  ${index < currentStep ? "bg-white" : "bg-white/20"}
                `}
                ></div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-between items-center">
        {/* <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`
              flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300
              ${
                currentStep === 0
                  ? "bg-white/10 text-white/40 cursor-not-allowed"
                  : "bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 active:scale-95"
              }
            `}
        >
          <FaChevronLeft size={16} />
        </button> */}
        {/* <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
          className={`
              flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300
              ${
                currentStep === steps.length - 1
                  ? "bg-white/10 text-white/40 cursor-not-allowed"
                  : "bg-white shadow-lg text-blue-600 hover:shadow-xl active:scale-95"
              }
            `}
        >
          <FaChevronRight size={16} />
        </button> */}
      </div>
    </div>
  );
}
