import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  saved: JSON.parse(localStorage.getItem("saved")) || [],
  reviews: JSON.parse(localStorage.getItem("reviews")) || [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSave(state, action) {
      const { item, userEmail } = action.payload;

      const isExists = state.saved.find(
        p => p.id === item.id && p.userEmail === userEmail
      );

      if (isExists) {
        state.saved = state.saved.filter(
          p => !(p.id === item.id && p.userEmail === userEmail)
        );
      } else {
        state.saved.push({ ...item, userEmail });
      }
      localStorage.setItem("saved", JSON.stringify(state.saved));
    },
    addReview(state, action) {
      const { review, userEmail } = action.payload;

      state.reviews.push({
        ...review,
        userEmail,
      });

      localStorage.setItem("reviews", JSON.stringify(state.reviews));
    },
    deleteSavedPlace(state, action) {
      const placeId = action.payload;
      state.saved = state.saved.filter(place => place.id !== placeId);
      localStorage.setItem("saved", JSON.stringify(state.saved));
    },
    deleteReview(state, action) {
      const reviewId = action.payload;
      state.reviews = state.reviews.filter(review => review.id !== reviewId);
      localStorage.setItem("reviews", JSON.stringify(state.reviews));
    }
  },
});

export const { toggleSave, addReview, deleteSavedPlace, deleteReview } = userSlice.actions;
export default userSlice.reducer;
