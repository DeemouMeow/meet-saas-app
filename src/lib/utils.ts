import { type ServerActionResult } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const success = <T = void>(message: string, data?: T) : ServerActionResult<T> => {
  return {
    success: true,
    message,
    data
  };
};

export const error = <T = void>(message: string, data?: T) : ServerActionResult<T> => {
  return {
    success: false,
    message,
    data
  };
};