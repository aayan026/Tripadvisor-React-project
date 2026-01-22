import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const initialState = {
    places: [],
    loading: false,
    error: null,

}

export const adminPlacesFetch = createAsyncThunk('fetch/adminPlaces', async () => {
    const res = await fetch("http://localhost:5000/api/admin/places", {
        headers: {
            'admin-password': 'admin123'
        }
    });
    const data = await res.json();
    return data;
})

export const adminCreatePlaceFetch = createAsyncThunk(
    "admin/createPlace",
    async (formData) => {
        const res = await fetch("http://localhost:5000/api/admin/places", {
            method: "POST",
            headers: {
                "admin-password": "admin123"
            },
            body: formData
        });
        return await res.json();
    }
);


export const adminUpdatePlaceFetch = createAsyncThunk('admin/updatePlace', async ({ id, formData }) => {
    const res = await fetch(`http://localhost:5000/api/admin/places/${id}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json',
            'admin-password': 'admin123'
        },
    });
    const data = await res.json();
    return data;
}
);
export const adminDeletePlaceFetch = createAsyncThunk('admin/deletePlace', async (id) => {
    const res = await fetch(`http://localhost:5000/api/admin/places/${id}`, {
        method: 'DELETE',
        headers: {
            'admin-password': 'admin123'
        }
    });
    return id;
}
);

export const adminPlacesSlice = createSlice({
    name: 'adminPlaces',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(adminPlacesFetch.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(adminPlacesFetch.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.places = action.payload
        })

        builder.addCase(adminPlacesFetch.rejected, (state, action) => {
            state.loading = false
            state.error = true
        })

        //
        builder.addCase(adminCreatePlaceFetch.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(adminCreatePlaceFetch.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.places.push(action.payload);
        });


        builder.addCase(adminCreatePlaceFetch.rejected, (state, action) => {
            state.loading = false
            state.error = true
        })
        //

        builder.addCase(adminUpdatePlaceFetch.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(adminUpdatePlaceFetch.fulfilled, (state, action) => {
            const updated = action.payload;

            const index = state.places.findIndex(p => p.id === updated.id);
            if (index !== -1) {
                state.places[index] = updated;
            }
        });

        builder.addCase(adminUpdatePlaceFetch.rejected, (state, action) => {
            state.loading = false
            state.error = true
        })
        //

        builder.addCase(adminDeletePlaceFetch.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(adminDeletePlaceFetch.fulfilled, (state, action) => {
            state.places = state.places.filter(p => p.id !== action.payload);
        });

        builder.addCase(adminDeletePlaceFetch.rejected, (state, action) => {
            state.loading = false
            state.error = true
        })

    }
})
export default adminPlacesSlice.reducer