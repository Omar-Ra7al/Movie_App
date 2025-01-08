import { auth, db } from "@/app/firebase/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
interface WishListState {
  items: string[];
  loaded: boolean;
}

const initialState: WishListState = {
  items: [],
  loaded: false,
};

export const addToWishList = createAsyncThunk(
  "wishlist/add",
  async (item: string, authApi) => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      console.log("add to wishlist");
      const addToWishlist = async () => {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
          wishlist: arrayUnion(item),
        });
      };
      return addToWishlist();
    } else {
      console.log("u are not logged in");
    }
  }
);

export const reomveFromWishList = createAsyncThunk(
  "wishlist/remove",
  async (item: string, authAPI) => {
    const userId = auth.currentUser?.uid;

    if (userId) {
      const addToWishlist = async () => {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
          wishlist: arrayRemove(item),
        });
      };
      return addToWishlist();
    } else {
      return "U are not logged in!";
    }
  }
);

export const fetchWishList = createAsyncThunk(
  "wishList/get",
  async (_, authAPI) => {
    const userId = auth.currentUser?.uid;

    if (userId) {
      const getData = async () => {
        const userDoc = await getDoc(doc(db, "users", userId));
        const currentWishlist = (await userDoc.data()?.wishlist) || [];
        return currentWishlist;
      };
      return getData();
    } else {
      return "U are not logged in!";
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToWishList.pending, (state) => {
        state.loaded = false;
      })
      .addCase(addToWishList.fulfilled, (state, action) => {
        // state.items = [...state.items, action.payload as string]; // No need to add the item to the state here as it will be added in the fulfilled state of the fetchWishList action
        state.loaded = true;
      })
      //
      .addCase(fetchWishList.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loaded = true;
      });
  },
});

export default wishlistSlice.reducer;
