import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface LessonPageState {
  pageNumber: number;
  buttonText: string;
  direction: string;
}

const initialState: LessonPageState = {
  pageNumber: 0,
  buttonText: "Let's Go!",
  direction: "forward",
};

const lessonPageSlice = createSlice({
  name: 'lessonPage',
  initialState,
  reducers: {
    setPageNumber: (state, action: PayloadAction<number>) => {
      if (action.payload > state.pageNumber) {
        state.direction = "forward";
      } else {
        state.direction = "backwards";
      }
      state.pageNumber = action.payload;
    },
    setButtonText: (state, action: PayloadAction<string>) => {
      state.buttonText = action.payload;
    },
    resetLessonState(state) {
      state.pageNumber = 0;
      state.buttonText = 'Start';
    },
  },
});

export const { setPageNumber, setButtonText, resetLessonState } = lessonPageSlice.actions;

// Selectors
export const selectPageNumber = (state: RootState) => state.lessonPage.pageNumber;
export const selectButtonText = (state: RootState) => state.lessonPage.buttonText;
export const selectDirection = (state: RootState) => state.lessonPage.direction;

export default lessonPageSlice.reducer;
