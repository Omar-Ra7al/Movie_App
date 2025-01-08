import { StringOrNull } from "../../models/types";
// Redux Toolkit >>
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";

// Firebase >>
import { auth } from "@/app/firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  updatePassword,
} from "firebase/auth";
import { deleteDoc, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
// Models Types TS>>
import {
  ArguThunk,
  UserState,
  SignupMsgType,
  AuthStatus,
  Collections,
} from "@/app/models/types";

// SignUp >>
export const userSingup = createAsyncThunk(
  "user/singup",
  async ({ email, password, firstName, lastName }: ArguThunk, thunkAPI) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // If user is created
      const user = auth.currentUser;
      if (user) {
        try {
          //set doc using user uid
          const docRef = await setDoc(doc(db, Collections.users, user.uid), {
            email: email,
            first: firstName,
            last: lastName,
            wishlist: [],
          });
        } catch (e) {
          thunkAPI.rejectWithValue("Error adding document: " + e);
        }
      }
      return {
        uid: response.user.uid,
        email: response.user.email,
        name: { frist: firstName, last: lastName },
      };
    } catch (e) {
      return thunkAPI.rejectWithValue(
        "Could not create user try another email"
      );
    }
  }
);

// Login >>
export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }: ArguThunk, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      };
    } catch {
      return thunkAPI.rejectWithValue("Could not login");
    }
  }
);

// Logout >>
export const userLogout = createAsyncThunk(
  "user/logout",
  async (arg, thunkAPI) => {
    try {
      await signOut(auth);
      console.log("user loged out");
    } catch {
      console.log("cannot loged out");
      return thunkAPI.rejectWithValue("Could not logout");
    }
  }
);

// Get additionla user Data >>
export const fetchAdditionalUserData = createAsyncThunk(
  "user/get",
  async () => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      const getData = async () => {
        const userDoc = await getDoc(doc(db, "users", userId));
        const docData = await userDoc.data();
        console.log(docData);
        const name = {
          first: docData?.first,
          last: docData?.last,
        };
        return name;
      };
      return getData();
    } else {
      return "U are not logged in!";
    }
  }
);

interface UpdateUser {
  first?: StringOrNull;
  last?: StringOrNull;
  password?: any;
}
// Update UserData >>
export const updateUserData = createAsyncThunk(
  "profile/update",
  async ({ first, last, password }: UpdateUser, thunkAPI) => {
    const userId = auth.currentUser?.uid;

    if (userId) {
      const docRef = doc(db, "users", userId);

      if (first) {
        return await updateDoc(docRef, {
          first: first,
        });
      }

      if (last) {
        return await updateDoc(docRef, {
          last: last,
        });
      }

      if (password) {
        const user = auth.currentUser;
        if (user) {
          return await updatePassword(user, password);
        }
      }
    } else {
      return thunkAPI.rejectWithValue("You are not logged in");
    }
  }
);

// Delete Acc >>
export const deleteAccount = createAsyncThunk(
  "account/delete",
  async (_, thunkAPI) => {
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, Collections.users, user.uid);
      await deleteDoc(docRef);
      // If Document deleted >>
      try {
        await deleteUser(user);
      } catch (e) {
        return thunkAPI.rejectWithValue("Cann't Delete User" + e);
      }
    }
  }
);

// actions.js
export const alertTimeout = () => (dispatch: AppDispatch) => {
  // Set loading to true
  dispatch(openAlert());

  // Reset loading to false after 3 seconds
  setTimeout(() => {
    dispatch(closeAlert());
  }, 3000);
};

const initialState: UserState = {
  uid: null,
  name: { first: null, last: null },
  email: null,
  loading: false,
  authStatus: AuthStatus.loggedOut, // intial >> is loggedOut
  status: { type: null, message: null },
  alert: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  // Reducers >>
  reducers: {
    rsetMsg(state, action: PayloadAction<UserState["status"]>) {
      state.status = {
        type: action.payload.type,
        message: action.payload.message,
      };
    },

    openAlert(state) {
      state.alert = true;
    },
    closeAlert(state) {
      state.alert = false;
    },
    setUserAfterLoad(state, action) {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
    },
    changeAuthStatus(state, action) {
      state.authStatus = action.payload;
    },
  },

  // Extra Reducers >>
  extraReducers: (builder) => {
    builder
      // SignUp >>
      .addCase(userSingup.pending, (state) => {
        state.loading = true;
      })
      .addCase(userSingup.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.payload.email;
        state.uid = action.payload.uid;
        state.name = {
          frist: action.payload.name.frist || null,
          last: action.payload.name.last || null,
        };
        state.status = {
          type: SignupMsgType.sucsses,
          message: "Account created successfully",
        };
        state.alert = true;
      })
      .addCase(userSingup.rejected, (state, action) => {
        state.loading = false;
        state.status = {
          type: SignupMsgType.error,
          message: action.payload as string,
        };
        state.alert = true;
      })

      // Login >>
      .addCase(userLogin.pending, (state, action) => {
        state.loading = true;
        state.authStatus = AuthStatus.loading;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.payload.email;
        state.uid = action.payload.uid;

        state.authStatus = AuthStatus.loggedIn;
        state.status = {
          type: SignupMsgType.sucsses,
          message: "Loggedin successfully",
        };
        state.alert = true;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.status = {
          type: SignupMsgType.error,
          message: action.payload as string,
        };
        state.alert = true;
      })

      // Additional user Data >>
      .addCase(fetchAdditionalUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdditionalUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.name = action.payload;
      })
      .addCase(fetchAdditionalUserData.rejected, (state) => {
        state.loading = false;
      })

      // Logout >>
      .addCase(userLogout.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.authStatus = AuthStatus.loggedOut;
        state.status = {
          type: SignupMsgType.sucsses,
          message: "Loged out successfully",
        };
        state.alert = true;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.loading = false;
        state.status = {
          type: SignupMsgType.error,
          message: action.payload as string,
        };
        state.alert = true;
      })

      // Revoke User >>
      .addCase(deleteAccount.pending, (state, action) => {
        state.loading = true;
        state.status = { type: null, message: null };
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.loading = false;
        state.status = {
          type: SignupMsgType.sucsses,
          message: "Account deleted successfully",
        };

        state.alert = true;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.status = {
          type: SignupMsgType.error,
          message: action.payload as string,
        };
        state.alert = true;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.alert = true;
        state.status = {
          type: SignupMsgType.sucsses,
          message: "Updated Sucssesfully",
        };
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.alert = true;
        state.status = {
          type: SignupMsgType.error,
          message: action.payload as string,
        };
      });
  },
});

export const {
  rsetMsg,
  changeAuthStatus,
  openAlert,
  closeAlert,
  setUserAfterLoad,
} = userSlice.actions;
export default userSlice.reducer;
