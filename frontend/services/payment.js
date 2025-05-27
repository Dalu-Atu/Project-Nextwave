import { CardElement } from "@stripe/react-stripe-js";
import axiosInstance from "../axiosConfig";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const handleStripePayment = async (data) => {
  const { plan, stripe, elements } = data;
  const cardElement = elements.getElement(CardElement);
  const { token, error } = await stripe.createToken(cardElement);

  if (error) throw error.message;

  try {
    const res = await axiosInstance.post("/subscription/stripe/subscribe", {
      token: token.id,
      plan,
    });

    if (res.data.status === "success") {
      const user = res.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      //sends a custom event to be recieved by any auth context to update the user state
      window.dispatchEvent(new Event("userUpdated"));
    }
  } catch (error) {
    const message = error.response.data.message || error.message;
    if (message) throw message;
  }
};

const handleFreeSubcription = async () => {
  try {
    const res = await axiosInstance.get("/subscription/free-plan");
    if (res.data.status === "success") {
      const user = res.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      //sends a custom event to be recieved by any auth context to update the user state
      window.dispatchEvent(new Event("userUpdated"));
    }
  } catch (error) {
    const message = error.response.data.message || error.message;
    if (message) throw message;
  }
};

export function useFreeSubscription() {
  const navigate = useNavigate();
  const { mutateAsync: activateFreePlan, isPending: isactivatingFreePlan } =
    useMutation({
      mutationFn: handleFreeSubcription,
      onSuccess: (data) => {
        toast.success("Free Plan successfull");
        navigate("/watch-now");
      },
      onError: (error) => {
        toast.error(error);
      },
    });
  return { activateFreePlan, isactivatingFreePlan };
}

export function useStripePaymentMethod() {
  const navigate = useNavigate();
  const { mutateAsync: payWithStripe, isPending: isPayingWithStripe } =
    useMutation({
      mutationFn: (data) => handleStripePayment(data),
      onSuccess: () => {
        toast.success("Payment successfull");
        navigate("/watch-now");
      },
      onError: (error) => {
        toast.error(error);
      },
    });

  return { payWithStripe, isPayingWithStripe };
}
