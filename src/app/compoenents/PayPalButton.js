import { PayPalButtons } from "@paypal/react-paypal-js";
import { saveOrder } from "@/actions"; // Correctly import from actions, not from api

export default function PayPalButton({
  price,
  wordId,
  onPaymentSuccess,
  closeModal,
}) {
  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order
          .create({
            purchase_units: [
              {
                amount: {
                  value: price,
                },
              },
            ],
          })
          .catch((error) => {
            console.error("Error creating order:", error);
          });
      }}
      onApprove={async (data, actions) => {
        try {
          const details = await actions.order.capture(); // Capture the payment
          console.log("Transaction details:", details);

          // Save the order using the server action
          await saveOrder({
            userId: details.payer.payer_id,
            payerName:
              details.payer.name.given_name + " " + details.payer.name.surname,
            wordId,
            amount: price,
          });

          // Trigger success callback if provided
          if (onPaymentSuccess) {
            onPaymentSuccess(details);
          }

          // Close modal if function is passed
          if (closeModal) {
            closeModal();
          }

          // Reload the page after 1 second
          setTimeout(() => {
            window.location.reload(); // Refresh page to reflect updated data
          }, 1000); // Wait 1 second before refresh
        } catch (error) {
          console.error("Error capturing PayPal order:", error);
        }
      }}
      onError={(err) => {
        console.error("PayPal Button Error:", err);
      }}
    />
  );
}
