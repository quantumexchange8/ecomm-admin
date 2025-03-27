<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function product()
    {
        return Inertia::render('Product/Product');
    }
   
   
    
    public function storeProduct(Request $request)
{//dd($request->all());
    $request->validate([
        'name' => 'required|string|max:255',
        'sku' => 'required|string',
        'price' => 'required|numeric|min:0',
        'stock' => 'required|integer|min:0',
        'category_id' => 'required|exists:categorys,id', // Fixed table name
        'weight' => 'required|numeric|min:0',
        'width' => 'required|numeric|min:0',
        'length' => 'required|numeric|min:0',
        'height' => 'required|numeric|min:0',
        'fragile' => 'required|string',
        'status' => 'required|string',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    // Create a new product
    $product = Product::create([
        'name' => $request->name,
        'sku' => $request->sku,
        'description' => $request->description,
        'price' => $request->price,
        'stock' => $request->stock,
        'category_id' => $request->category_id,
        'weight' => $request->weight,
        'width' => $request->width,
        'length' => $request->length,
        'height' => $request->height,
        'fragile' => $request->fragile,
        'status' => 'Active',
    ]);

    // Handle image upload using Spatie Media Library
    foreach($request->images as $image){
        if ($image) {
            $product->addMedia($image)->toMediaCollection('product_images');
    }
    
    }

   
}
    public function getCategory()
    {
        $categorys = Category::select('id', 'name')->get();
        return response()->json($categorys);
    }

    public function edit()
    {
        return Inertia::render('Product/ProductEdit');
    }

    public function update(Request $request)
    {

        // dd($request->all());
        $product = Product::find($request->id);
        $product->update([
            'name' => $request->name,
            'sku' => $request->sku,
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'category_id' => $request->category_id,
            'weight' => $request->weight,
            'width' => $request->width,
            'length' => $request->length,
            'height' => $request->height,
            'fragile' => $request->fragile,

        ]);
       
        // if ($request->hasFile('image')) {
        //     $product->clearMediaCollection('product_images'); 
        //     $product->addMedia($request->file('image'))->toMediaCollection('product_images');
        // }
    
        // $updatedProduct = Product::with('category')->findOrFail($id);

        return redirect()->back()->with('success', 'Product updated successfully');
    }
    
    // public function update(Request $request, $id)
    // {
    //     $product = Product::findOrFail($id);
    
    //     $validatedData = $request->validate([
    //         'name' => 'required|string|max:255',
    //         'sku' => 'required|string|max:50',
    //         'description' => 'nullable|string',
    //         'price' => 'required|numeric|min:0',
    //         'stock' => 'required|integer|min:0',
    //         'fragile' => 'required|string|in:yes,no',
    //         'weight' => 'required|numeric|min:0',
    //         'width' => 'required|numeric|min:0',
    //         'length' => 'required|numeric|min:0',
    //         'height' => 'required|numeric|min:0',
    //         'category_id' => 'required|exists:categorys,id', // Ensure category exists
    //         'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validate image
    //     ]);
    
    //     // Handle Image Upload
    //     if ($request->hasFile('image')) {
    //         // Delete old image if it exists
    //         if ($product->image) {
    //             Storage::delete($product->image);
    //         }
    
    //         // Store new image and save path
    //         $validatedData['image'] = $request->file('image')->store('products');
    //     }
    
    //     $product->update($validatedData);
    
    //     return redirect()->back()->with('success', 'Product updated successfully');
    // }
    
    
    // public function index()
    // {
    //     $products = Product::with('categorys')->latest()->get();
    //     return response()->json($products);
    // }

    public function index()
    {
       $products = Product::with('media', 'category')->get();
        return response()->json($products);

    }

    public function deleteProduct($id)
    {
        $product = Product::find($id);
    
        if (!$product) {
            return back()->withErrors(['message' => 'Product not found']);
        }
    
        $product->delete();
    
        return back()->with('success', 'Product deleted successfully');
    }
    

    // public function show($id)
    // {
    //     $product = Product::with('categorys')->findOrFail($id);
    //     return response()->json($product);
    // }

    // public function update(Request $request, $id)
    // {
    //     $product = Product::findOrFail($id);

    //     $request->validate([
    //         'name' => 'required|string|max:255',
    //         'sku' => 'required|string|unique:products,sku,' . $id,
    //         'description' => 'nullable|string',
    //         'price' => 'required|numeric|min:0',
    //         'stock' => 'required|integer|min:0',
    //         'category_id' => 'required|exists:categorys,id',
    //         'weight' => 'required|numeric|min:0',
    //         'width' => 'required|numeric|min:0',
    //         'length' => 'required|numeric|min:0',
    //         'height' => 'required|numeric|min:0',
    //         'fragile' => 'required|in:yes,no',
    //         'status' => 'required|in:active,inactive',
    //     ]);

    //     $product->update($request->all());

    //     return redirect()->back()->with('success', 'Product updated successfully.');
    // }

    // public function destroy($id)
    // {
    //     $product = Product::findOrFail($id);
    //     $product->delete();

    //     return redirect()->back()->with('success', 'Product deleted successfully.');
    // }
}

