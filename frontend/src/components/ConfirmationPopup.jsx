// src/components/OrderConfirmationPopup.jsx
import { Dialog } from "@headlessui/react";

export default function OrderConfirmationPopup({
  open,
  onClose,
  orderNo,
  status = "Pending",
}) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-xl p-6 max-w-sm mx-auto text-center shadow-lg">
          {/* Confirmation Image */}
          <img
            src="/images/order-confirmed.png" // put your PNG in public/images folder
            alt="Order Confirmed"
            className="w-24 h-24 mx-auto mb-4"
          />

          {/* Title */}
          <Dialog.Title className="text-xl font-bold mb-2">
            Order Placed Successfully 🎉
          </Dialog.Title>

          {/* Order Number */}
          <p className="text-gray-600 mb-1">
            <span className="font-semibold">Order No:</span> {orderNo}
          </p>

          {/* Status */}
          <p className="text-gray-600 mb-4">
            <span className="font-semibold">Status:</span> {status}
          </p>

          {/* Message */}
          <p className="text-gray-500 mb-6">
            Thank you for your purchase! You will receive updates soon.
          </p>

          {/* OK Button */}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            OK
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
