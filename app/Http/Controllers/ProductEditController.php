<?php
// ProductEditController.php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category; // Import the Category model
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductEditController extends Controller
{
    // Method to show the edit form with the current product data and categories
    public function edit($id)
    {
        $product = Product::find($id); // Fetch the product by ID
        $categorys = Category::all(); // Fetch all categories

        return Inertia::render('Product/ProductEdit', [
            'product' => $product,
            'categorys' => $categorys, // Pass the categories to the front-end
        ]);
    }
    
    // Method to handle the update of the product
    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        $validated = $request->validate([
            'name' => 'required|string',
            'sku' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'fragile' => 'required|string',
            'category_id' => 'required|integer',
           'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'weight' => 'required|numeric|min:0',
            'width' => 'required|numeric|min:0',
            'length' => 'required|numeric|min:0',
            'height' => 'required|numeric|min:0',
            'fragile' => 'required|string',
            'status' => 'required|string',

        ]);

        // Find the product by ID and update it
        $product = Product::find($id);
        $product->update($validated);

        return redirect()->route('product.listing')->with('success', 'Product updated successfully!');
    }
}




