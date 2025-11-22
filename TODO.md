# Tasks for Updating User Purchase Flow

- [ ] Add new API method "updateUserPurchase" in frontend/src/api.js for `update-user-purchase` resource.
- [ ] Modify frontend/src/pages/Success.jsx:
  - Extract plan duration info from cart or define a default if missing.
  - For each purchased cart item, call updateUserPurchase API with email, serviceName, price, hours, date, day, and plan.
  - Clear session cart and local cart after update.
  - Preserve existing success message and UI.

- [ ] Test purchase flow by making a checkout and verifying user data updates in backend and local storage.

Next steps after TODO:
- Implement the above changes step by step, starting with api.js modification.
