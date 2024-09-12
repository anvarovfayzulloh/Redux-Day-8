import { api } from "./index";

const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        signInUser: build.mutation({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body
            })
        }),
        updateProduct: build.mutation({
            query: (product) => ({
                url: `/products/${product.id}`,
                method: "PUT",
                body: product
            })
        })
    })
})

export const { useSignInUserMutation, useUpdateProductMutation } = authApi;
