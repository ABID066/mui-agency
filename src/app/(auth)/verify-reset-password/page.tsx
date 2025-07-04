"use client";
import { verifyResetPasswordAction } from "@/actions/auth/verifyResetPasswordAction";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setStatus("");

    // Validation checks (unchanged)
    if (!code || !password || !confirm) {
      setStatus("All fields are required.");
      return;
    }
    if (password !== confirm) {
      setStatus("Passwords do not match.");
      return;
    }
    if (password?.length < 8) {
      setStatus("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);
      const res = await verifyResetPasswordAction(code, email, password);

      if (res.success) {
        // 1. First update state
        setStatus(res.message);
        setCode("");
        setPassword("");
        setConfirm("");

        // 2. Show toast
        toast.success(res.message);

        // 3. Use setTimeout to ensure React completes its cycle
        setTimeout(() => {
          router.push("/login");
            // Optional: Force scroll to top if needed
            window.scrollTo(0, 0);
        }, 0);
      } else {
        setStatus(res.message);
        toast.error(res.message);
      }
    } catch (error) {
      setStatus("An unexpected error occurred");
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white rounded shadow p-8 w-full max-w-md'>
        <h1 className='text-2xl font-semibold mb-4 text-center text-orange-600'>
          Reset Password
        </h1>
        <p className='text-sm text-gray-600 mb-4 text-center'>
          Enter the code sent to your email along with a new password.
        </p>
        <input
          type='text'
          maxLength={6}
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setStatus("");
          }}
          placeholder='Enter 6-digit code'
          className='w-full border border-gray-300 px-4 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setStatus("");
          }}
          placeholder='New password'
          className='w-full border border-gray-300 px-4 py-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400'
        />
        <input
          type='password'
          value={confirm}
          onChange={(e) => {
            setConfirm(e.target.value);
            setStatus("");
          }}
          placeholder='Confirm new password'
          className='w-full border border-gray-300 px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400'
        />
        <button
          onClick={handleReset}
          disabled={loading}
          className='w-full bg-orange-600 text-white font-medium py-2 rounded hover:bg-orange-700 transition'>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
        {status && (
          <p className='text-center text-sm mt-4 text-red-600'>{status}</p>
        )}
      </div>
    </div>
  );
}
