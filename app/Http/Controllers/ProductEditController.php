<?php
namespace App\Http\Controllers;
use App\Models\Product;
use App\Models\Category; 
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductEditController extends Controller
{
    public function edit($id)
    {
        
        $product = Product::with(['media', 'categories'])->find($id);
        return Inertia::render('Product/ProductEdit', [
            'product' => $product,
        ]);
    }

    
public function update(Request $request, $id)
{
    dd($request->all());
    $product = Product::find($id);

    $validated = $request->validate([
        'name' => 'sometimes|string',
        'sku' => 'sometimes|string',
        'price' => 'sometimes|numeric',
        'stock' => 'sometimes|integer',
        'fragile' => 'sometimes|string',
        'category_id' => 'sometimes|integer',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'weight' => 'sometimes|numeric|min:0',
        'width' => 'sometimes|numeric|min:0',
        'length' => 'sometimes|numeric|min:0',
        'height' => 'sometimes|numeric|min:0',
        'status' => 'sometimes|string',
    ]);

    $product->update($validated);

    if ($request->hasFile('image')) {
        $product->clearMediaCollection('product_images'); 
        $product->addMedia($request->file('image'))->toMediaCollection('product_images');

    }

    return redirect()->route('product.listing')->with('success', 'Product updated successfully!');
}

}




