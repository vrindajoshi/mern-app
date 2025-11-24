import {create} from "zustand"

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({products}),
    createProduct: async (newProduct) => { 
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return {success:false, message:"Please fill out all of the fields."}
        } 

    const res = await fetch('/api/products', {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(newProduct)
    })

    const data = await res.json();
    set((state) => ({products: [...state.products, data.data]}));
    return {success:true, message:"Product Created Successfully."};

 },
 fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
 },
 deleteProduct: async (pid) => {
  try {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };

    // remove product from state, update immediately without needed a re render
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));

    return { success: true, message: data.message || "Product deleted successfully." };
  } catch (error) {
    return { success: false, message: error.message || "Something went wrong." };
  }
},

updateProduct: async (pid, updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };

      // update the UI without re-render
      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));

      return { success: true, message: data.message || "Product updated successfully." };
    } catch (error) {
      return { success: false, message: error.message || "Something went wrong." };
    }
  },
}));