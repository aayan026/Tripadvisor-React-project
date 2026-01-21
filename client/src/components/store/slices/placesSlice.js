
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const initialState = {
    featured: [],
    places: [],
    loading: false,
    categories: [],
    cities: [],
    amenities:[],
    singlePlace: null,
    searchValue: "",
    activeTab: "all",
    error: null
}

export const placesFetch = createAsyncThunk('fetch/places/featured', async () => {
    const res = await fetch("http://localhost:5000/api/places/featured")
    const data = await res.json()
    return data
})
export const allPlacesFetch = createAsyncThunk('fetch/allplaces', async () => {
    const res = await fetch("http://localhost:5000/api/places")
    const data = await res.json()
    return data
})
export const categoriesFetch = createAsyncThunk("categories/fetch", async () => {
    const res = await fetch("http://localhost:5000/api/categories");
    const data = await res.json()
    return data
}
);
export const singlePlaceFetch = createAsyncThunk("fetch/singleplace", async (id) => {
    const res = await fetch(`http://localhost:5000/api/places/${id}`)
    const data = await res.json()
    return data
})

export const citiesFetch = createAsyncThunk("cities/fetch", async () => {
    const res = await fetch("http://localhost:5000/api/cities");
    const data = await res.json();
    return data

});

export const featuredFetch = createAsyncThunk("featured/fetch", async () => {
    const res = await fetch("http://localhost:5000/api/places/featured");
    const data = await res.json();
    return data
})

export const amenitiesFetch=createAsyncThunk("amenities/fetch" ,async()=>{
     const res = await fetch("http://localhost:5000/api/amenities");
    const data = await res.json();
    return data
})


export const placesSlice = createSlice({
    name: 'places',
    initialState,
    reducers: {
        getSearchValue: (state, action) => {
            state.searchValue = action.payload
        },
        setActiveTab: (state, action) => {
            state.activeTab = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(placesFetch.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(placesFetch.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.featured = action.payload
        })

        builder.addCase(placesFetch.rejected, (state, action) => {
            state.loading = false
            state.error = true
        })

        //all places

        builder.addCase(allPlacesFetch.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(allPlacesFetch.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.places = action.payload.data
        })

        builder.addCase(allPlacesFetch.rejected, (state, action) => {
            state.loading = false
            state.error = true
        })

        //amenities
         builder.addCase(amenitiesFetch.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(amenitiesFetch.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.amenities = action.payload
        })

        builder.addCase(amenitiesFetch.rejected, (state, action) => {
            state.loading = false
            state.error = true
        })
        
        ///categories
        builder.addCase(categoriesFetch.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(categoriesFetch.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.categories = action.payload
        })

        builder.addCase(categoriesFetch.rejected, (state, action) => {
            state.loading = false
            state.error = true
        })

        ////cities
        builder.addCase(citiesFetch.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(citiesFetch.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.cities = action.payload
        })

        builder.addCase(citiesFetch.rejected, (state, action) => {
            state.loading = false
            state.error = true
        })
        //single place
        builder.addCase(singlePlaceFetch.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(singlePlaceFetch.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.singlePlace = action.payload
        })

        builder.addCase(singlePlaceFetch.rejected, (state, action) => {
            state.loading = false
            state.error = true
        })
        //featured
        builder.addCase(featuredFetch.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(featuredFetch.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.featured = action.payload
        })

        builder.addCase(featuredFetch.rejected, (state, action) => {
            state.loading = false
            state.error = true
        })

    }
})
export const { getSearchValue, setActiveTab } = placesSlice.actions
export default placesSlice.reducer