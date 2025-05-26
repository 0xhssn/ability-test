import { AxiosError } from "axios";
import { toast } from "sonner";

interface ApiErrorResponse {
  message: string | string[];
  error: string;
  statusCode: number;
}

export function handleApiError(error: unknown, fallbackMessage?: string) {
  const axiosError = error as AxiosError<ApiErrorResponse>;
  
  console.error("API Error:", axiosError);
  
  const errorMessage = axiosError.response?.data?.message;
  const errorType = axiosError.response?.data?.error;
  
  if (Array.isArray(errorMessage)) {
    const formattedErrors = errorMessage.map(msg => `• ${msg}`).join('\n');
    toast.error(formattedErrors);
  } else if (errorMessage) {
    toast.error(errorMessage);
  } else if (errorType) {
    toast.error(errorType);
  } else {
    toast.error(fallbackMessage || "An unexpected error occurred. Please try again.");
  }
} 