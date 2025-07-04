"use client";
import { requestResetPasswordAction } from "@/actions/auth/requestResetPasswordAction";
import Modal from "@/components/reusable/ui/Modal";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import Swal from "sweetalert2";

interface ResetPasswordModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const response = await requestResetPasswordAction(email);

      if (response.success) {
        setEmail("");
        setIsOpen(false);
        router.push(
          `${process.env.NEXT_PUBLIC_BASE_URL}/verify-reset-password/?email=${response?.emailHash}`
        );
      } else {
        Swal.fire({
          title: "Error!",
          text: response.message,
          icon: "error",
          confirmButtonText: "Close",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred!",
        icon: "error",
        confirmButtonText: "Close",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title='Try to Reset Your Password'>
      <form onSubmit={handleResetPassForm} className='space-y-4 mt-6'>
        <div className='flex flex-col'>
          <label
            htmlFor='email'
            className='text-sm font-medium text-gray-800 mb-2'>
            Enter Your Email
          </label>
          <input
            name='email'
            type='email'
            value={email}
            required
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition'
            placeholder='example@email.com'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type='submit'
          disabled={isLoading}
          className={`w-full bg-black text-white py-2 rounded-lg transition font-semibold text-center ${
            isLoading && "bg-gray-400 cursor-not-allowed"
          }`}>
          {isLoading ? "Request Sending!!" : "Send Request"}
        </button>
      </form>
    </Modal>
  );
};

export default ResetPasswordModal;
